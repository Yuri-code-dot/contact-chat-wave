
// Helper functions for grammar checking
const detectGrammarIssues = (text: string): string[] => {
  const issues: string[] = [];
  
  // Basic grammar checks
  if (text.match(/\bi\b/g) && !text.match(/\bI\b/g)) {
    issues.push("'i' should be capitalized as 'I'");
  }
  
  if (text.match(/\b(your|you're)\b/)) {
    if (text.includes('your welcome') || text.includes('your here')) {
      issues.push("consider 'you're' instead of 'your' for contractions");
    }
  }
  
  return issues;
};

const correctGrammar = (text: string): string => {
  return text
    .replace(/\bi\b/g, 'I')
    .replace(/your welcome/g, "you're welcome")
    .replace(/your here/g, "you're here");
};

export const generateStudyResponse = (input: string, intent: string, sentiment: string, topics: string[]): string => {
  if (intent === 'question') {
    return `Great question! Let me help you understand this. Based on what you're asking about "${input}", I'll break this down into clear, manageable parts. What specific aspect would you like me to focus on first?`;
  }
  
  if (intent === 'help_request') {
    return `I'm here to help you learn! Whether you need explanations, study strategies, or practice questions, I can adapt to your learning style. What subject or topic are you working on?`;
  }
  
  return `I understand you're studying. Learning is a journey, and I'm here to support you every step of the way. What would you like to explore or review today?`;
};

export const generateWritingResponse = (input: string, intent: string, sentiment: string, topics: string[]): string => {
  if (intent === 'task_request') {
    return `I'd be happy to help you with your writing! Whether you need help with structure, clarity, creativity, or editing, I can provide targeted assistance. What type of writing are you working on?`;
  }
  
  if (topics.includes('writing')) {
    return `Writing is both an art and a skill that improves with practice. I can help you with brainstorming, organizing ideas, improving flow, or polishing your final draft. What's your current writing challenge?`;
  }
  
  return `Every great piece of writing starts with a single word. I'm here to help you find the right words, structure your thoughts, and express your ideas clearly. What would you like to write about?`;
};

export const generateSupportResponse = (input: string, intent: string, sentiment: string, topics: string[]): string => {
  if (intent === 'problem_report') {
    return `I understand you're experiencing an issue. I'm here to help resolve this for you. Can you provide more details about what's happening so I can offer the most relevant solution?`;
  }
  
  if (sentiment === 'negative') {
    return `I can hear that you're frustrated, and I want to help make this better. Let's work through this together step by step. What specific challenge can I help you with?`;
  }
  
  return `I'm here to provide you with the support you need. Whether it's troubleshooting, guidance, or information, I'll do my best to assist you promptly and effectively.`;
};

export const generateResumeResponse = (input: string, intent: string, sentiment: string, topics: string[]): string => {
  if (intent === 'task_request') {
    return `Let's create a compelling resume that showcases your unique strengths! I can help with formatting, content optimization, skill highlighting, and tailoring for specific roles. What's your target position or industry?`;
  }
  
  return `Your resume is your professional story - let's make it shine! I can help you highlight achievements, optimize keywords, improve formatting, and ensure it stands out to recruiters. What aspect would you like to work on?`;
};

export const generateGrammarResponse = (input: string, intent: string, sentiment: string, topics: string[]): string => {
  // Check for obvious grammar issues in the input
  const grammarIssues = detectGrammarIssues(input);
  
  if (grammarIssues.length > 0) {
    return `I noticed a few areas where we can improve the grammar: ${grammarIssues.join(', ')}. Here's a corrected version: "${correctGrammar(input)}". Would you like me to explain the changes?`;
  }
  
  return `Your grammar looks good! I'm here to help with any writing corrections, style improvements, or clarity enhancements. Feel free to share any text you'd like me to review.`;
};

export const generateTravelResponse = (input: string, intent: string, sentiment: string, topics: string[]): string => {
  if (intent === 'question') {
    return `Travel planning can be exciting! I can help you with destinations, itineraries, budgeting, local customs, weather considerations, and travel tips. What's your dream destination or travel question?`;
  }
  
  return `The world is full of amazing places to explore! Whether you're planning a weekend getaway or a month-long adventure, I can help make your trip memorable and well-organized. Where would you like to go?`;
};

export const generateGameResponse = (input: string, intent: string, sentiment: string, topics: string[]): string => {
  if (intent === 'task_request') {
    return `Let's create some epic game content! I can help you develop character backstories, write engaging dialogue, create plot twists, or design interesting NPCs. What kind of game or story element are you working on?`;
  }
  
  return `Welcome to the realm of storytelling! Whether you need character development, world-building, dialogue writing, or quest design, I'm here to help bring your game world to life. What story shall we tell?`;
};

export const generateMentalHealthResponse = (input: string, intent: string, sentiment: string, topics: string[]): string => {
  if (sentiment === 'negative') {
    return `I hear that things might be challenging right now. While I can't provide medical advice, I can offer some general wellness techniques like mindfulness exercises, stress management tips, or positive thinking strategies. How are you feeling today?`;
  }
  
  return `Taking care of your mental wellness is important. I can share some general tips for stress management, mindfulness practices, or positive habits. Remember, for serious concerns, it's always best to speak with a healthcare professional. How can I support your wellness journey today?`;
};

export const generateGeneralResponse = (
  input: string, 
  intent: string, 
  sentiment: string, 
  topics: string[],
  recentMessages: Array<{ content: string; role: 'user' | 'assistant' }>
): string => {
  if (intent === 'greeting') {
    return `Hello! I'm your V1Q-powered AI assistant, ready to help you with a wide range of tasks. Whether you need information, creative assistance, problem-solving, or just want to chat, I'm here for you. What can I help you with today?`;
  }
  
  if (intent === 'farewell') {
    return `Thank you for our conversation! I'm always here whenever you need assistance. Have a wonderful day, and feel free to return anytime you have questions or need help with anything.`;
  }
  
  if (intent === 'question') {
    return `That's an excellent question! Let me think about this carefully and provide you with a comprehensive answer. Based on what you're asking, here's what I understand and how I can help...`;
  }
  
  if (sentiment === 'positive') {
    return `I'm glad you're having a positive experience! Your enthusiasm is wonderful to see. I'm here to help maintain that momentum and assist you with whatever you need. What would you like to explore or accomplish?`;
  }
  
  // Consider conversation flow
  if (recentMessages.length > 0) {
    const lastUserMessage = recentMessages.find(msg => msg.role === 'user')?.content || '';
    if (lastUserMessage && input.length < 20) {
      return `I'd love to help you explore that further. Could you provide a bit more detail about what you're looking for? The more context you give me, the better I can assist you.`;
    }
  }
  
  return `I understand what you're saying. As your V1Q-powered assistant, I'm here to provide thoughtful, helpful responses tailored to your needs. Based on your message, I can offer insights, suggestions, or assistance. What specific aspect would you like me to focus on?`;
};
