
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MessageSquare, 
  GraduationCap, 
  PenTool, 
  HeadphonesIcon,
  FileText,
  CheckCircle,
  MapPin,
  GamepadIcon,
  Heart
} from 'lucide-react';

interface ChatMode {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  examples: string[];
}

const chatModes: ChatMode[] = [
  {
    id: 'general',
    title: 'General Assistant',
    description: 'Multi-purpose AI helper for various tasks',
    icon: <MessageSquare className="h-5 w-5" />,
    color: 'bg-blue-500',
    examples: ['Answer questions', 'Explain concepts', 'Help with decisions']
  },
  {
    id: 'study',
    title: 'Study Helper',
    description: 'Educational support and learning assistance',
    icon: <GraduationCap className="h-5 w-5" />,
    color: 'bg-green-500',
    examples: ['Explain topics', 'Quiz preparation', 'Homework help']
  },
  {
    id: 'writing',
    title: 'Writing Assistant',
    description: 'Help with writing, editing, and grammar',
    icon: <PenTool className="h-5 w-5" />,
    color: 'bg-purple-500',
    examples: ['Improve text', 'Grammar check', 'Creative writing']
  },
  {
    id: 'support',
    title: 'Customer Support',
    description: 'Automated customer service helper',
    icon: <HeadphonesIcon className="h-5 w-5" />,
    color: 'bg-yellow-500',
    examples: ['Answer FAQs', 'Troubleshooting', 'Product info']
  },
  {
    id: 'resume',
    title: 'Resume Builder',
    description: 'AI-powered resume creation and optimization',
    icon: <FileText className="h-5 w-5" />,
    color: 'bg-indigo-500',
    examples: ['Resume writing', 'Format suggestions', 'Skills optimization']
  },
  {
    id: 'grammar',
    title: 'Grammar Corrector',
    description: 'Advanced grammar and style checking',
    icon: <CheckCircle className="h-5 w-5" />,
    color: 'bg-red-500',
    examples: ['Fix grammar', 'Style improvements', 'Clarity check']
  },
  {
    id: 'travel',
    title: 'Travel Planner',
    description: 'Plan trips and get travel recommendations',
    icon: <MapPin className="h-5 w-5" />,
    color: 'bg-teal-500',
    examples: ['Trip planning', 'Destination info', 'Travel tips']
  },
  {
    id: 'game',
    title: 'Game Character Generator',
    description: 'Create dialogues and characters for games',
    icon: <GamepadIcon className="h-5 w-5" />,
    color: 'bg-orange-500',
    examples: ['Character creation', 'Dialogue writing', 'Story ideas']
  },
  {
    id: 'mental',
    title: 'Mental Health Check-in',
    description: 'Non-medical wellness and mood support',
    icon: <Heart className="h-5 w-5" />,
    color: 'bg-pink-500',
    examples: ['Mood tracking', 'Wellness tips', 'Mindfulness']
  }
];

interface ChatBotModesProps {
  onModeSelect: (mode: ChatMode) => void;
}

const ChatBotModes: React.FC<ChatBotModesProps> = ({ onModeSelect }) => {
  const [selectedMode, setSelectedMode] = useState<string | null>(null);

  const handleModeSelect = (mode: ChatMode) => {
    setSelectedMode(mode.id);
    onModeSelect(mode);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Choose Your AI Assistant Mode</h2>
        <p className="text-muted-foreground">Select the type of assistance you need</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {chatModes.map((mode) => (
          <Card 
            key={mode.id}
            className={`cursor-pointer transition-all hover:shadow-lg ${
              selectedMode === mode.id ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => handleModeSelect(mode)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${mode.color} text-white`}>
                  {mode.icon}
                </div>
                <div>
                  <CardTitle className="text-lg">{mode.title}</CardTitle>
                  <Badge variant="secondary" className="text-xs">
                    V1Q Powered
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-3">
                {mode.description}
              </CardDescription>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Examples:</p>
                {mode.examples.map((example, index) => (
                  <div key={index} className="text-xs text-muted-foreground">
                    • {example}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Button 
          variant="outline" 
          onClick={() => onModeSelect(chatModes[0])}
          className="mt-4"
        >
          Start with General Assistant
        </Button>
      </div>
    </div>
  );
};

export default ChatBotModes;
