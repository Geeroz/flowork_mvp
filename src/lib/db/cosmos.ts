import { CosmosClient, Database, Container } from '@azure/cosmos';

// Validate environment variables (allow missing during build)
const cosmosEndpoint = process.env.AZURE_COSMOS_ENDPOINT;
const cosmosKey = process.env.AZURE_COSMOS_KEY;
const cosmosDatabase = process.env.AZURE_COSMOS_DATABASE;

if (!cosmosEndpoint || !cosmosKey || !cosmosDatabase) {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('Azure Cosmos DB environment variables are not configured');
  }
  console.warn('Azure Cosmos DB environment variables are not configured - some features may not work');
}

// Initialize Cosmos Client (with fallback values for build time)
const client = new CosmosClient({
  endpoint: cosmosEndpoint || 'https://placeholder.documents.azure.com:443/',
  key: cosmosKey || 'placeholder-key',
});

// Database and container names
const databaseId = cosmosDatabase || 'placeholder-db';
const containerIds = {
  conversations: 'conversations',
  users: 'users',
  briefs: 'briefs',
};

// Database and container references
let database: Database;
let conversationsContainer: Container;
let usersContainer: Container;
let briefsContainer: Container;

// Initialize database and containers
async function initializeCosmosDB() {
  try {
    // Create database if it doesn't exist
    const { database: db } = await client.databases.createIfNotExists({
      id: databaseId,
    });
    database = db;

    // Create conversations container
    const { container: conversations } = await database.containers.createIfNotExists({
      id: containerIds.conversations,
      partitionKey: '/userId',
    });
    conversationsContainer = conversations;

    // Create users container
    const { container: users } = await database.containers.createIfNotExists({
      id: containerIds.users,
      partitionKey: '/email',
    });
    usersContainer = users;

    // Create briefs container
    const { container: briefs } = await database.containers.createIfNotExists({
      id: containerIds.briefs,
      partitionKey: '/conversationId',
    });
    briefsContainer = briefs;

    console.log('✅ Cosmos DB initialized successfully');
  } catch (error) {
    console.error('❌ Error initializing Cosmos DB:', error);
    throw error;
  }
}

// Initialize on module load
initializeCosmosDB().catch(console.error);

// Export getters to ensure containers are initialized
export async function getConversationsContainer(): Promise<Container> {
  if (!conversationsContainer) {
    await initializeCosmosDB();
  }
  return conversationsContainer;
}

export async function getUsersContainer(): Promise<Container> {
  if (!usersContainer) {
    await initializeCosmosDB();
  }
  return usersContainer;
}

export async function getBriefsContainer(): Promise<Container> {
  if (!briefsContainer) {
    await initializeCosmosDB();
  }
  return briefsContainer;
}

// Helper function to handle Cosmos DB errors
export function handleCosmosError(error: unknown): { message: string; statusCode: number } {
  const errorCode = (error as { code?: number })?.code;
  
  if (errorCode === 409) {
    return { message: 'Resource already exists', statusCode: 409 };
  } else if (errorCode === 404) {
    return { message: 'Resource not found', statusCode: 404 };
  } else if (errorCode === 429) {
    return { message: 'Too many requests, please try again later', statusCode: 429 };
  } else {
    return { message: 'Database operation failed', statusCode: 500 };
  }
}