
import React from 'react';
import { Brain, Loader2 } from 'lucide-react';

interface ThinkingIndicatorProps {
  isThinking: boolean;
}

const ThinkingIndicator: React.FC<ThinkingIndicatorProps> = ({ isThinking }) => {
  return (
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
  );
};

export default ThinkingIndicator;
