import { NextRequest, NextResponse } from 'next/server';
import { ContactInfo, GeneratedBrief } from '@/lib/db/models';

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
    const { conversationId, messages, contactInfo, brief } = body;

    // Validate required fields
    if (!conversationId || !messages || !contactInfo || !brief) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate contact info
    if (!contactInfo.email || !isValidEmail(contactInfo.email)) {
      return NextResponse.json(
        { error: 'Valid email address is required' },
        { status: 400 }
      );
    }

    // Dynamically import services to avoid build-time initialization
    const { completeConversation, createBrief } = await import('@/lib/db/services');
    const { sendBriefEmail } = await import('@/lib/email/azure-email');

    // Check if conversation already exists and email was already sent
    const { getConversationsContainer } = await import('@/lib/db/cosmos');
    const container = await getConversationsContainer();
    
    try {
      const query = {
        query: 'SELECT * FROM c WHERE c.id = @id',
        parameters: [{ name: '@id', value: conversationId }],
      };
      
      const { resources } = await container.items.query(query).fetchAll();
      
      if (resources.length > 0 && resources[0].emailSentAt) {
        // Email already sent, don't send again
        return NextResponse.json({
          success: true,
          conversationId: resources[0].id,
          briefId: resources[0].id,
          emailStatus: 'already_sent',
          message: 'Brief already exists and email was previously sent',
        });
      }
    } catch {
      // If check fails, continue with save process
      console.log('Could not check existing conversation, proceeding with save');
    }

    // Save conversation to database
    const conversation = await completeConversation(
      conversationId,
      brief as GeneratedBrief,
      contactInfo as ContactInfo,
      messages
    );

    // Create brief document
    const briefDoc = await createBrief(
      conversation.id,
      conversation.userId!,
      brief as GeneratedBrief
    );

    // Send email with brief
    let emailStatus = 'failed';
    let emailError: Error | unknown = null;
    let emailMessageId: string | null = null;
    
    try {
      console.log(`Attempting to send email for conversation ${conversation.id} to ${contactInfo.email}`);
      
      const emailResult = await sendBriefEmail(
        contactInfo as ContactInfo,
        brief as GeneratedBrief,
        conversation.id
      );

      emailStatus = emailResult.status;
      emailMessageId = emailResult.messageId;
      
      console.log(`Email sent successfully for conversation ${conversation.id}. Message ID: ${emailMessageId}, Status: ${emailStatus}`);

      // Mark email as sent in the conversation with full tracking
      const updatedConversation = {
        ...conversation,
        emailSentAt: new Date().toISOString(),
        emailStatus: emailStatus,
        emailMessageId: emailMessageId,
        emailAttempts: 1,
        lastEmailAttempt: new Date().toISOString(),
      };
      await container.items.upsert(updatedConversation);

      return NextResponse.json({
        success: true,
        conversationId: conversation.id,
        briefId: briefDoc.id,
        emailStatus: emailStatus,
        emailMessageId: emailMessageId,
        message: 'Brief saved and email sent successfully',
      });
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      emailError = error;
      console.error(`Email sending failed for conversation ${conversation.id}:`, error);
      
      // Get detailed error information
      const errorDetails = {
        message: error instanceof Error ? error.message : 'Unknown error',
        name: error instanceof Error ? error.name : 'UnknownError',
        stack: error instanceof Error ? error.stack : undefined,
        timestamp: new Date().toISOString(),
      };
      
      // Track failed email attempt in conversation
      try {
        const failedConversation = {
          ...conversation,
          emailStatus: 'failed',
          emailError: errorDetails,
          emailAttempts: 1,
          lastEmailAttempt: new Date().toISOString(),
        };
        await container.items.upsert(failedConversation);
      } catch (dbError) {
        console.error('Failed to update conversation with email failure:', dbError);
      }
      
      // Still return success but note email failure with detailed info
      return NextResponse.json({
        success: true,
        conversationId: conversation.id,
        briefId: briefDoc.id,
        emailStatus: 'failed',
        emailError: errorDetails.message,
        message: 'Brief saved successfully, but email delivery failed. Our team will follow up manually within 24 hours.',
      });
    }
  } catch (error) {
    console.error('Save conversation error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to save conversation',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Email validation helper
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

