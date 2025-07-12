
import { processAdvancedThinking } from './cognitiveEngine';
import { analyzeUserIntent, analyzeSentiment, extractTopics } from './intentAnalyzer';
import { 
  generateStudyResponse, 
  generateWritingResponse, 
  generateSupportResponse, 
  generateResumeResponse, 
  generateGrammarResponse, 
  generateTravelResponse, 
  generateGameResponse, 
  generateMentalHealthResponse, 
  generateGeneralResponse 
} from './modeSpecificResponses';

interface ConversationContext {
  messages: Array<{ content: string; role: 'user' | 'assistant' }>;
  mode: string;
}

export const generateIntelligentResponse = (userInput: string, context: ConversationContext): string => {
  console.log('🧠 V1Q Advanced AI Processing:', userInput);
  
  // Use the advanced AI engine for all responses
  const { response, thoughtProcess } = processAdvancedThinking(
    userInput, 
    context.messages, 
    context.mode
  );
  
  console.log('🎯 Thought Process:', thoughtProcess);
  console.log('💡 Generated Response:', response);
  
  return response;
};

export const generateContextualResponse = (
  input: string, 
  intent: string, 
  sentiment: 'positive' | 'negative' | 'neutral',
  topics: string[],
  mode: string,
  recentMessages: Array<{ content: string; role: 'user' | 'assistant' }>
): string => {
  // Mode-specific response generation
  switch (mode) {
    case 'study':
      return generateStudyResponse(input, intent, sentiment, topics);
    case 'writing':
      return generateWritingResponse(input, intent, sentiment, topics);
    case 'support':
      return generateSupportResponse(input, intent, sentiment, topics);
    case 'resume':
      return generateResumeResponse(input, intent, sentiment, topics);
    case 'grammar':
      return generateGrammarResponse(input, intent, sentiment, topics);
    case 'travel':
      return generateTravelResponse(input, intent, sentiment, topics);
    case 'game':
      return generateGameResponse(input, intent, sentiment, topics);
    case 'mental':
      return generateMentalHealthResponse(input, intent, sentiment, topics);
    default:
      return generateGeneralResponse(input, intent, sentiment, topics, recentMessages);
  }
};
