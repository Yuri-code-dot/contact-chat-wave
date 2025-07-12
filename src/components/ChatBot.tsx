
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain } from 'lucide-react';
import { generateIntelligentResponse } from '@/utils/aiResponseGenerator';
import MessageList from './MessageList';
import ChatInput from './ChatInput';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface ChatBotProps {
  mode?: string;
}

const ChatBot: React.FC<ChatBotProps> = ({ mode = 'general' }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your V1Q-powered AI assistant with advanced cognitive capabilities. I can engage in deep reasoning, creative problem-solving, and multi-domain analysis just like the latest AI models. I\'m designed to understand context, think through complex problems, and provide thoughtful, comprehensive responses. What would you like to explore together?',
      role: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isThinking, setIsThinking] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);
    setIsThinking(true);

    try {
      // Enhanced thinking simulation with variable duration based on complexity
      const complexity = currentInput.length > 100 ? 'high' : currentInput.length > 50 ? 'medium' : 'low';
      const thinkingTime = complexity === 'high' ? 1500 + Math.random() * 2000 : 
                          complexity === 'medium' ? 1000 + Math.random() * 1500 : 
                          600 + Math.random() * 1000;
      
      await new Promise(resolve => setTimeout(resolve, thinkingTime));
      
      setIsThinking(false);
      
      // Generate advanced intelligent response
      const conversationContext = {
        messages: [...messages, userMessage],
        mode: mode
      };
      
      const intelligentResponse = generateIntelligentResponse(currentInput, conversationContext);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: intelligentResponse,
        role: 'assistant',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error generating response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'I apologize for the momentary lapse in my cognitive processing. My advanced reasoning systems are back online and ready to assist you with any complex queries or creative challenges. Please try again.',
        role: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setIsThinking(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[600px] flex flex-col">
      <Card className="flex-1 flex flex-col">
        <CardHeader className="border-b">
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary animate-pulse" />
            V1Q Advanced AI - Multi-Domain Intelligence
            <div className="ml-auto text-xs text-muted-foreground bg-primary/10 px-2 py-1 rounded-full">
              Advanced Reasoning Active
            </div>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-0">
          <MessageList 
            messages={messages} 
            isLoading={isLoading} 
            isThinking={isThinking} 
          />
          
          <ChatInput 
            input={input}
            setInput={setInput}
            onSendMessage={sendMessage}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatBot;
