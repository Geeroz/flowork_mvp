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

    // Save conversation to database
    const conversation = await completeConversation(
      conversationId,
      brief as GeneratedBrief,
      contactInfo as ContactInfo
    );

    // Create brief document
    const briefDoc = await createBrief(
      conversation.id,
      conversation.userId!,
      brief as GeneratedBrief
    );

    // Send email with brief
    try {
      const emailResult = await sendBriefEmail(
        contactInfo as ContactInfo,
        brief as GeneratedBrief,
        conversation.id
      );

      // Update conversation with email sent status
      const { updateConversation } = await import('@/lib/db/services');
      await updateConversation(conversation.id, {
        emailSentAt: new Date().toISOString(),
      });

      return NextResponse.json({
        success: true,
        conversationId: conversation.id,
        briefId: briefDoc.id,
        emailStatus: emailResult.status,
        message: 'Brief saved and email sent successfully',
      });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Still return success but note email failure
      return NextResponse.json({
        success: true,
        conversationId: conversation.id,
        briefId: briefDoc.id,
        emailStatus: 'failed',
        message: 'Brief saved successfully, but email delivery failed. We will retry later.',
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

