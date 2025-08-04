import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Check if services are configured
    if (!process.env.AZURE_COSMOS_ENDPOINT || !process.env.AZURE_COSMOS_KEY) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 503 }
      );
    }

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const conversationId = searchParams.get('conversationId');
    const period = searchParams.get('period') || '7'; // days
    const includeDetails = searchParams.get('details') === 'true';

    // Dynamically import services
    const { getConversationsContainer } = await import('@/lib/db/cosmos');
    const container = await getConversationsContainer();

    if (conversationId) {
      // Get specific conversation email status
      const query = {
        query: 'SELECT c.id, c.emailStatus, c.emailSentAt, c.emailMessageId, c.emailAttempts, c.lastEmailAttempt, c.emailError, c.contactInfo.email FROM c WHERE c.id = @id',
        parameters: [{ name: '@id', value: conversationId }],
      };
      
      const { resources } = await container.items.query(query).fetchAll();
      
      if (resources.length === 0) {
        return NextResponse.json(
          { error: 'Conversation not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({
        conversation: resources[0],
        timestamp: new Date().toISOString(),
      });
    } else {
      // Get email statistics for the specified period
      const periodStart = new Date();
      periodStart.setDate(periodStart.getDate() - parseInt(period));
      
      const statsQuery = {
        query: `
          SELECT 
            c.emailStatus,
            c.emailAttempts,
            c.emailError,
            c.emailSentAt,
            c.lastEmailAttempt,
            c.id,
            c.contactInfo.email as recipientEmail
          FROM c 
          WHERE c.lastEmailAttempt >= @periodStart 
          OR c.emailSentAt >= @periodStart
          ORDER BY c.lastEmailAttempt DESC
        `,
        parameters: [
          { name: '@periodStart', value: periodStart.toISOString() }
        ],
      };
      
      const { resources } = await container.items.query(statsQuery).fetchAll();
      
      // Calculate statistics
      const stats = {
        total: resources.length,
        successful: resources.filter(r => r.emailStatus === 'Succeeded').length,
        failed: resources.filter(r => r.emailStatus === 'failed').length,
        pending: resources.filter(r => !r.emailStatus || r.emailStatus === 'pending').length,
        retryAttempts: resources.reduce((sum, r) => sum + (r.emailAttempts || 0), 0),
        averageAttempts: 0,
        successRate: 0,
        commonErrors: {} as Record<string, number>,
        recentFailures: [] as Array<{
          conversationId: string;
          recipientEmail: string;
          error: string;
          lastAttempt: string;
          attempts: number;
        }>,
      };

      // Calculate success rate
      if (stats.total > 0) {
        stats.successRate = Math.round((stats.successful / stats.total) * 100);
        stats.averageAttempts = Math.round((stats.retryAttempts / stats.total) * 100) / 100;
      }

      // Analyze common errors
      const errors = resources
        .filter(r => r.emailError && r.emailError.message)
        .map(r => r.emailError.message);
      
      errors.forEach(error => {
        const key = error.substring(0, 100); // Truncate for grouping
        stats.commonErrors[key] = (stats.commonErrors[key] || 0) + 1;
      });

      // Recent failures (last 24 hours)
      const oneDayAgo = new Date();
      oneDayAgo.setDate(oneDayAgo.getDate() - 1);
      
      stats.recentFailures = resources
        .filter(r => 
          r.emailStatus === 'failed' && 
          r.lastEmailAttempt && 
          new Date(r.lastEmailAttempt) >= oneDayAgo
        )
        .slice(0, 10) // Limit to 10 most recent
        .map(r => ({
          conversationId: r.id,
          recipientEmail: r.recipientEmail,
          error: r.emailError?.message || 'Unknown error',
          lastAttempt: r.lastEmailAttempt,
          attempts: r.emailAttempts || 0,
        }));

      const response: {
        period: string;
        periodStart: string;
        stats: typeof stats;
        timestamp: string;
        details?: Array<{
          conversationId: string;
          recipientEmail: string;
          status: string;
          sentAt: string;
          attempts: number;
          lastAttempt: string;
          error?: string;
        }>;
      } = {
        period: `${period} days`,
        periodStart: periodStart.toISOString(),
        stats,
        timestamp: new Date().toISOString(),
      };

      // Include detailed records if requested
      if (includeDetails) {
        response.details = resources.map(r => ({
          conversationId: r.id,
          recipientEmail: r.recipientEmail,
          status: r.emailStatus,
          sentAt: r.emailSentAt,
          attempts: r.emailAttempts || 0,
          lastAttempt: r.lastEmailAttempt,
          error: r.emailError?.message,
        }));
      }

      return NextResponse.json(response);
    }
  } catch (error) {
    console.error('Email status query error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to retrieve email status',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}