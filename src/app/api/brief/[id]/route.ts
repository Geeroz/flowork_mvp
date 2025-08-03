import { NextRequest, NextResponse } from 'next/server';
import { ConversationDocument } from '@/lib/db/models';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        { error: 'Brief ID is required' },
        { status: 400 }
      );
    }

    // Check if Cosmos DB is configured
    if (!process.env.AZURE_COSMOS_ENDPOINT || !process.env.AZURE_COSMOS_KEY) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 503 }
      );
    }

    // Get conversation with brief
    const { getConversationsContainer } = await import('@/lib/db/cosmos');
    const container = await getConversationsContainer();
    
    // Query by conversation ID
    const query = {
      query: 'SELECT * FROM c WHERE c.id = @id AND c.status = @status',
      parameters: [
        { name: '@id', value: id },
        { name: '@status', value: 'completed' },
      ],
    };
    
    const { resources } = await container.items.query<ConversationDocument>(query).fetchAll();
    
    if (resources.length === 0) {
      return NextResponse.json(
        { error: 'Brief not found' },
        { status: 404 }
      );
    }

    const conversation = resources[0];

    // Return brief data
    return NextResponse.json({
      brief: conversation.brief,
      projectType: conversation.projectType,
      createdAt: conversation.completedAt,
      company: conversation.brief?.company,
    });
  } catch (error) {
    console.error('Get brief error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve brief' },
      { status: 500 }
    );
  }
}