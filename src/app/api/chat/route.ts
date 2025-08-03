import { NextRequest, NextResponse } from 'next/server';
import { ChatMessage } from '@/types';
import { SYSTEM_PROMPT } from '@/prompts/brief-generator';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  try {
    const { messages, currentStep } = await request.json();
    
    if (!process.env.AZURE_OPENAI_ENDPOINT || !process.env.AZURE_OPENAI_KEY) {
      throw new Error('Azure OpenAI configuration missing');
    }
    
    // Prepare messages for Azure OpenAI
    const systemMessage = {
      role: 'system',
      content: SYSTEM_PROMPT + `\n\nCurrent interview step: ${currentStep + 1}`
    };
    
    const apiMessages = [systemMessage, ...messages.map((msg: ChatMessage) => ({
      role: msg.role,
      content: msg.content
    }))];
    
    const response = await fetch(
      `${process.env.AZURE_OPENAI_ENDPOINT}/openai/deployments/${process.env.AZURE_OPENAI_DEPLOYMENT}/chat/completions?api-version=2024-02-01`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': process.env.AZURE_OPENAI_KEY,
        },
        body: JSON.stringify({
          messages: apiMessages,
          temperature: 0.7,
          max_tokens: 1000,
          stream: true,
        }),
      }
    );
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Azure OpenAI error:', errorText);
      
      // Check if it's a content filter false positive (common with Thai language)
      try {
        const errorData = JSON.parse(errorText);
        if (errorData.error?.innererror?.code === 'ResponsibleAIPolicyViolation') {
          // Return a helpful message for content filter issues
          const fallbackResponse = {
            choices: [{
              delta: {
                content: "I apologize, but there seems to be a technical issue processing Thai language at the moment. Please try again in English, or you can describe your project needs and I'll help you create your brief.\n\nIf you prefer to continue in Thai, please try rephrasing your message or contact our support team for assistance."
              },
              finish_reason: null
            }]
          };
          
          const encoder = new TextEncoder();
          const stream = new ReadableStream({
            start(controller) {
              controller.enqueue(encoder.encode(`data: ${JSON.stringify(fallbackResponse)}\n\n`));
              controller.enqueue(encoder.encode('data: [DONE]\n\n'));
              controller.close();
            }
          });
          
          return new Response(stream, {
            headers: {
              'Content-Type': 'text/event-stream',
              'Cache-Control': 'no-cache',
              'Connection': 'keep-alive',
            },
          });
        }
      } catch {
        // If error parsing fails, continue with original error
      }
      
      throw new Error('Failed to get AI response');
    }
    
    // Return the streaming response
    return new Response(response.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
    
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Failed to process chat request' },
      { status: 500 }
    );
  }
}