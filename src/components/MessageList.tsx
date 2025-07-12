
import React, { useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import ThinkingIndicator from './ThinkingIndicator';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
  isThinking: boolean;
}

const MessageList: React.FC<MessageListProps> = ({ messages, isLoading, isThinking }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <ChatMessage key={message.id} message={message} />
      ))}
      
      {isLoading && <ThinkingIndicator isThinking={isThinking} />}
      
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
