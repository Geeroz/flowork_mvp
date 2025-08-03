import { generateId } from '@/lib/utils';
import { getConversationsContainer, getUsersContainer, getBriefsContainer, handleCosmosError } from './cosmos';
import { ConversationDocument, UserDocument, BriefDocument, ContactInfo, GeneratedBrief } from './models';
import { ChatMessage } from '@/types';

// Conversation Services
export async function createConversation(
  messages: ChatMessage[],
  language: 'en' | 'th' = 'en'
): Promise<ConversationDocument> {
  try {
    const container = await getConversationsContainer();
    const conversation: ConversationDocument = {
      id: generateId(),
      userId: 'anonymous', // Will be updated when user provides contact
      messages,
      status: 'active',
      language,
      createdAt: new Date().toISOString(),
    };
    
    const { resource } = await container.items.create(conversation);
    return resource!;
  } catch (error) {
    console.error('Error creating conversation:', error);
    throw handleCosmosError(error);
  }
}

export async function updateConversation(
  id: string,
  updates: Partial<ConversationDocument>
): Promise<ConversationDocument> {
  try {
    const container = await getConversationsContainer();
    const { resource } = await container.item(id, updates.userId || 'anonymous').read<ConversationDocument>();
    
    if (!resource) {
      throw { code: 404 };
    }
    
    const updated = { ...resource, ...updates };
    const { resource: updatedResource } = await container.item(id, resource.userId).replace(updated);
    return updatedResource!;
  } catch (error) {
    console.error('Error updating conversation:', error);
    throw handleCosmosError(error);
  }
}

export async function completeConversation(
  id: string,
  brief: GeneratedBrief,
  contactInfo: ContactInfo
): Promise<ConversationDocument> {
  try {
    // First, check if user exists or create new one
    const user = await findOrCreateUser(contactInfo.email, contactInfo.phone);
    
    // Update conversation with completion data
    const updates: Partial<ConversationDocument> = {
      userId: user.id,
      brief,
      contactInfo,
      status: 'completed',
      completedAt: new Date().toISOString(),
    };
    
    const conversation = await updateConversation(id, updates);
    
    // Update user's conversation list
    if (!user.conversationIds.includes(id)) {
      await updateUser(user.id, {
        conversationIds: [...user.conversationIds, id],
        totalBriefs: user.totalBriefs + 1,
        lastActiveAt: new Date().toISOString(),
      });
    }
    
    return conversation;
  } catch (error) {
    console.error('Error completing conversation:', error);
    throw error;
  }
}

// User Services
export async function findOrCreateUser(
  email: string,
  phone?: string,
  name?: string,
  company?: string
): Promise<UserDocument> {
  try {
    const container = await getUsersContainer();
    
    // Try to find existing user by email
    const query = {
      query: 'SELECT * FROM c WHERE c.email = @email',
      parameters: [{ name: '@email', value: email.toLowerCase() }],
    };
    
    const { resources } = await container.items.query<UserDocument>(query).fetchAll();
    
    if (resources.length > 0) {
      // Update existing user with new info if provided
      const existingUser = resources[0];
      if (phone || name || company) {
        return await updateUser(existingUser.id, {
          phone: phone || existingUser.phone,
          name: name || existingUser.name,
          company: company || existingUser.company,
          lastActiveAt: new Date().toISOString(),
        });
      }
      return existingUser;
    }
    
    // Create new user
    const newUser: UserDocument = {
      id: generateId(),
      email: email.toLowerCase(),
      phone,
      name,
      company,
      conversationIds: [],
      totalBriefs: 0,
      createdAt: new Date().toISOString(),
      lastActiveAt: new Date().toISOString(),
    };
    
    const { resource } = await container.items.create(newUser);
    return resource!;
  } catch (error) {
    console.error('Error finding/creating user:', error);
    throw handleCosmosError(error);
  }
}

export async function updateUser(
  id: string,
  updates: Partial<UserDocument>
): Promise<UserDocument> {
  try {
    const container = await getUsersContainer();
    const { resource } = await container.item(id, updates.email?.toLowerCase()).read<UserDocument>();
    
    if (!resource) {
      throw { code: 404 };
    }
    
    const updated = { ...resource, ...updates };
    const { resource: updatedResource } = await container.item(id, resource.email).replace(updated);
    return updatedResource!;
  } catch (error) {
    console.error('Error updating user:', error);
    throw handleCosmosError(error);
  }
}

// Brief Services
export async function createBrief(
  conversationId: string,
  userId: string,
  brief: GeneratedBrief
): Promise<BriefDocument> {
  try {
    const container = await getBriefsContainer();
    const briefDoc: BriefDocument = {
      id: generateId(),
      conversationId,
      userId,
      brief,
      version: 1,
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    const { resource } = await container.items.create(briefDoc);
    return resource!;
  } catch (error) {
    console.error('Error creating brief:', error);
    throw handleCosmosError(error);
  }
}

export async function updateBriefStatus(
  id: string,
  conversationId: string,
  status: BriefDocument['status'],
  additionalUpdates?: Partial<BriefDocument>
): Promise<BriefDocument> {
  try {
    const container = await getBriefsContainer();
    const { resource } = await container.item(id, conversationId).read<BriefDocument>();
    
    if (!resource) {
      throw { code: 404 };
    }
    
    const updates: Partial<BriefDocument> = {
      status,
      updatedAt: new Date().toISOString(),
      ...additionalUpdates,
    };
    
    if (status === 'sent') {
      updates.emailSentAt = new Date().toISOString();
    } else if (status === 'viewed') {
      updates.viewedAt = new Date().toISOString();
    } else if (status === 'accepted') {
      updates.acceptedAt = new Date().toISOString();
    }
    
    const updated = { ...resource, ...updates };
    const { resource: updatedResource } = await container.item(id, conversationId).replace(updated);
    return updatedResource!;
  } catch (error) {
    console.error('Error updating brief status:', error);
    throw handleCosmosError(error);
  }
}

// Query Services
export async function getRecentConversations(limit: number = 10): Promise<ConversationDocument[]> {
  try {
    const container = await getConversationsContainer();
    const query = {
      query: 'SELECT * FROM c WHERE c.status = @status ORDER BY c.createdAt DESC OFFSET 0 LIMIT @limit',
      parameters: [
        { name: '@status', value: 'completed' },
        { name: '@limit', value: limit },
      ],
    };
    
    const { resources } = await container.items.query<ConversationDocument>(query).fetchAll();
    return resources;
  } catch (error) {
    console.error('Error getting recent conversations:', error);
    throw handleCosmosError(error);
  }
}

export async function getUserConversations(email: string): Promise<ConversationDocument[]> {
  try {
    const container = await getConversationsContainer();
    const query = {
      query: 'SELECT * FROM c WHERE c.contactInfo.email = @email ORDER BY c.createdAt DESC',
      parameters: [{ name: '@email', value: email.toLowerCase() }],
    };
    
    const { resources } = await container.items.query<ConversationDocument>(query).fetchAll();
    return resources;
  } catch (error) {
    console.error('Error getting user conversations:', error);
    throw handleCosmosError(error);
  }
}