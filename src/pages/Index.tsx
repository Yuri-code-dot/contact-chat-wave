
import React, { useState } from 'react';
import ChatBot from '@/components/ChatBot';
import ChatBotModes from '@/components/ChatBotModes';

interface ChatMode {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  examples: string[];
}

const Index = () => {
  const [selectedMode, setSelectedMode] = useState<ChatMode | null>(null);

  const handleModeSelect = (mode: ChatMode) => {
    setSelectedMode(mode);
  };

  const handleBackToModes = () => {
    setSelectedMode(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {!selectedMode ? (
          <ChatBotModes onModeSelect={handleModeSelect} />
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">{selectedMode.title}</h1>
                <p className="text-muted-foreground">{selectedMode.description}</p>
              </div>
              <button 
                onClick={handleBackToModes}
                className="text-sm text-muted-foreground hover:text-foreground underline"
              >
                Change Mode
              </button>
            </div>
            <ChatBot mode={selectedMode.id} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
