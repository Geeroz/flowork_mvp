import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Check if services are configured
    if (!process.env.AZURE_COSMOS_ENDPOINT || !process.env.AZURE_COSMOS_KEY) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 503 }
      );
    }

    const body = await request.json();
    const { conversationId } = body;

    if (!conversationId) {
      return NextResponse.json(
        { error: 'Conversation ID is required' },
        { status: 400 }
      );
    }

    // Dynamically import services
    const { getConversationsContainer } = await import('@/lib/db/cosmos');
    const { sendBriefEmail } = await import('@/lib/email/azure-email');

    const container = await getConversationsContainer();
    
    // Get conversation details
    const query = {
      query: 'SELECT * FROM c WHERE c.id = @id',
      parameters: [{ name: '@id', value: conversationId }],
    };
    
    const { resources } = await container.items.query(query).fetchAll();
    
    if (resources.length === 0) {
      return NextResponse.json(
        { error: 'Conversation not found' },
        { status: 404 }
      );
    }

    const conversation = resources[0];

    // Check if email was already sent successfully
    if (conversation.emailStatus === 'Succeeded' && conversation.emailSentAt) {
      return NextResponse.json({
        success: false,
        message: 'Email was already sent successfully for this conversation',
        emailStatus: 'already_sent',
      });
    }

    // Validate required data exists
    if (!conversation.contactInfo || !conversation.brief) {
      return NextResponse.json(
        { error: 'Missing contact info or brief data' },
        { status: 400 }
      );
    }

    // Attempt to send email
    try {
      console.log(`Retrying email for conversation ${conversationId} to ${conversation.contactInfo.email}`);
      
      const emailResult = await sendBriefEmail(
        conversation.contactInfo,
        conversation.brief,
        conversationId
      );

      // Update conversation with successful email send
      const updatedConversation = {
        ...conversation,
        emailSentAt: new Date().toISOString(),
        emailStatus: emailResult.status,
        emailMessageId: emailResult.messageId,
        emailAttempts: (conversation.emailAttempts || 0) + 1,
        lastEmailAttempt: new Date().toISOString(),
        emailError: null, // Clear previous error
      };
      
      await container.items.upsert(updatedConversation);

      return NextResponse.json({
        success: true,
        conversationId: conversationId,
        emailStatus: emailResult.status,
        emailMessageId: emailResult.messageId,
        message: 'Email sent successfully on retry',
      });
    } catch (emailError) {
      console.error(`Email retry failed for conversation ${conversationId}:`, emailError);
      
      // Get detailed error information
      const errorDetails = {
        message: emailError instanceof Error ? emailError.message : 'Unknown error',
        name: emailError instanceof Error ? emailError.name : 'UnknownError',
        timestamp: new Date().toISOString(),
      };
      
      // Update conversation with failed retry attempt
      const failedConversation = {
        ...conversation,
        emailStatus: 'failed',
        emailError: errorDetails,
        emailAttempts: (conversation.emailAttempts || 0) + 1,
        lastEmailAttempt: new Date().toISOString(),
      };
      
      await container.items.upsert(failedConversation);

      return NextResponse.json({
        success: false,
        conversationId: conversationId,
        emailStatus: 'failed',
        emailError: errorDetails.message,
        emailAttempts: failedConversation.emailAttempts,
        message: 'Email retry failed. Manual follow-up required.',
      });
    }
  } catch (error) {
    console.error('Retry email error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to retry email',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}