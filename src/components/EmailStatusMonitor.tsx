"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, Mail, AlertTriangle, CheckCircle } from 'lucide-react';

interface EmailStats {
  total: number;
  successful: number;
  failed: number;
  pending: number;
  successRate: number;
  averageAttempts: number;
  recentFailures: Array<{
    conversationId: string;
    recipientEmail: string;
    error: string;
    lastAttempt: string;
    attempts: number;
  }>;
}

interface EmailStatusData {
  period: string;
  stats: EmailStats;
  timestamp: string;
}

export function EmailStatusMonitor() {
  const [data, setData] = useState<EmailStatusData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retrying, setRetrying] = useState<string | null>(null);

  const fetchEmailStatus = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/email-status?period=7');
      if (!response.ok) {
        throw new Error('Failed to fetch email status');
      }
      
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const retryEmail = async (conversationId: string) => {
    setRetrying(conversationId);
    
    try {
      const response = await fetch('/api/retry-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ conversationId }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        // Refresh the data after successful retry
        await fetchEmailStatus();
      } else {
        console.error('Retry failed:', result.message);
      }
    } catch (err) {
      console.error('Retry error:', err);
    } finally {
      setRetrying(null);
    }
  };

  useEffect(() => {
    fetchEmailStatus();
  }, []);

  if (loading && !data) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <RefreshCw className="w-5 h-5 animate-spin mr-2" />
            Loading email status...
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-red-500 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2" />
            Error: {error}
          </div>
          <Button onClick={fetchEmailStatus} className="mt-4">
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!data) return null;

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Mail className="w-5 h-5 text-sky-500 mr-2" />
              <div>
                <p className="text-sm text-gray-400">Total Emails</p>
                <p className="text-2xl font-bold text-white">{data.stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
              <div>
                <p className="text-sm text-gray-400">Success Rate</p>
                <p className="text-2xl font-bold text-white">{data.stats.successRate}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
              <div>
                <p className="text-sm text-gray-400">Failed</p>
                <p className="text-2xl font-bold text-white">{data.stats.failed}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <RefreshCw className="w-5 h-5 text-yellow-500 mr-2" />
              <div>
                <p className="text-sm text-gray-400">Avg Attempts</p>
                <p className="text-2xl font-bold text-white">{data.stats.averageAttempts}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Failures */}
      {data.stats.recentFailures.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
                Recent Failures (Last 24h)
              </span>
              <Button
                onClick={fetchEmailStatus}
                variant="outline"
                size="sm"
                disabled={loading}
              >
                {loading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <RefreshCw className="w-4 h-4" />
                )}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.stats.recentFailures.map((failure) => (
                <div
                  key={failure.conversationId}
                  className="p-4 bg-black/30 rounded-lg border border-red-500/20"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-medium text-white">
                        {failure.recipientEmail}
                      </p>
                      <p className="text-sm text-gray-400">
                        ID: {failure.conversationId}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="destructive">
                        {failure.attempts} attempt{failure.attempts !== 1 ? 's' : ''}
                      </Badge>
                      <Button
                        onClick={() => retryEmail(failure.conversationId)}
                        disabled={retrying === failure.conversationId}
                        size="sm"
                        variant="outline"
                      >
                        {retrying === failure.conversationId ? (
                          <RefreshCw className="w-4 h-4 animate-spin" />
                        ) : (
                          'Retry'
                        )}
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-red-400 mb-2">{failure.error}</p>
                  <p className="text-xs text-gray-500">
                    Last attempt: {new Date(failure.lastAttempt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* System Status */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div
                className={`w-3 h-3 rounded-full mr-2 ${
                  data.stats.successRate >= 90
                    ? 'bg-green-500'
                    : data.stats.successRate >= 70
                    ? 'bg-yellow-500'
                    : 'bg-red-500'
                }`}
              />
              <span className="text-sm text-gray-400">
                Email System Status: {' '}
                <span className={
                  data.stats.successRate >= 90
                    ? 'text-green-400'
                    : data.stats.successRate >= 70
                    ? 'text-yellow-400'
                    : 'text-red-400'
                }>
                  {data.stats.successRate >= 90
                    ? 'Healthy'
                    : data.stats.successRate >= 70
                    ? 'Degraded'
                    : 'Critical'
                  }
                </span>
              </span>
            </div>
            <p className="text-xs text-gray-500">
              Last updated: {new Date(data.timestamp).toLocaleString()}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}