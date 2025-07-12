
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Send, Bot, User, Loader2, Brain } from 'lucide-react';
import { generateIntelligentResponse } from '@/utils/aiResponseGenerator';

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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
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
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`flex gap-3 max-w-[85%] ${
                    message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  <div className="flex-shrink-0">
                    {message.role === 'user' ? (
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-primary-foreground" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <Brain className="h-4 w-4 text-white animate-pulse" />
                      </div>
                    )}
                  </div>
                  
                  <div
                    className={`rounded-lg p-3 ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-gradient-to-r from-muted to-muted/70 text-foreground border border-border/50'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                    <p className="text-xs opacity-70 mt-2">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="flex gap-3 max-w-[85%]">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Brain className="h-4 w-4 text-white animate-pulse" />
                  </div>
                  <div className="rounded-lg p-3 bg-gradient-to-r from-muted to-muted/70 border border-border/50">
                    <div className="flex items-center gap-2">
                      {isThinking ? (
                        <>
                          <Brain className="h-4 w-4 animate-pulse text-blue-500" />
                          <div className="flex items-center gap-1">
                            <span className="text-sm text-muted-foreground">Advanced reasoning</span>
                            <div className="flex gap-1">
                              <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                              <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                              <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin text-purple-500" />
                          <span className="text-sm text-muted-foreground">Synthesizing response...</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything - I can reason, analyze, create, and solve complex problems..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button 
                onClick={sendMessage} 
                disabled={!input.trim() || isLoading}
                size="icon"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Powered by V1Q Advanced AI • Multi-domain reasoning • Creative problem solving
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatBot;
