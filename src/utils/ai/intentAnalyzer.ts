
export const analyzeUserIntent = (input: string): string => {
  // Question patterns
  if (input.includes('?') || input.startsWith('what') || input.startsWith('how') || 
      input.startsWith('why') || input.startsWith('when') || input.startsWith('where') ||
      input.startsWith('who') || input.startsWith('can you')) {
    return 'question';
  }
  
  // Greeting patterns
  if (input.match(/^(hi|hello|hey|good morning|good afternoon|good evening)/)) {
    return 'greeting';
  }
  
  // Help/assistance patterns
  if (input.includes('help') || input.includes('assist') || input.includes('support')) {
    return 'help_request';
  }
  
  // Problem/issue patterns
  if (input.includes('problem') || input.includes('issue') || input.includes('error') || 
      input.includes('not working') || input.includes('broken')) {
    return 'problem_report';
  }
  
  // Farewell patterns
  if (input.match(/^(bye|goodbye|see you|thanks|thank you|that\'s all)/)) {
    return 'farewell';
  }
  
  // Task/action request
  if (input.startsWith('please') || input.includes('create') || input.includes('make') ||
      input.includes('generate') || input.includes('write')) {
    return 'task_request';
  }
  
  return 'general_statement';
};

export const analyzeSentiment = (input: string): 'positive' | 'negative' | 'neutral' => {
  const positiveWords = ['good', 'great', 'awesome', 'excellent', 'love', 'like', 'happy', 'thanks'];
  const negativeWords = ['bad', 'terrible', 'hate', 'dislike', 'sad', 'angry', 'frustrated', 'problem'];
  
  const positiveCount = positiveWords.filter(word => input.includes(word)).length;
  const negativeCount = negativeWords.filter(word => input.includes(word)).length;
  
  if (positiveCount > negativeCount) return 'positive';
  if (negativeCount > positiveCount) return 'negative';
  return 'neutral';
};

export const extractTopics = (input: string): string[] => {
  const topics: string[] = [];
  
  // Technology topics
  if (input.match(/\b(code|coding|programming|software|app|website|tech|computer)\b/)) {
    topics.push('technology');
  }
  
  // Learning topics
  if (input.match(/\b(learn|study|education|school|homework|exam|test)\b/)) {
    topics.push('education');
  }
  
  // Writing topics
  if (input.match(/\b(write|writing|essay|grammar|text|document)\b/)) {
    topics.push('writing');
  }
  
  // Work/career topics
  if (input.match(/\b(job|work|career|resume|interview|business)\b/)) {
    topics.push('career');
  }
  
  // Health/wellness topics
  if (input.match(/\b(health|wellness|stress|anxiety|mood|feeling)\b/)) {
    topics.push('wellness');
  }
  
  return topics;
};
