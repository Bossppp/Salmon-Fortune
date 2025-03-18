interface GeminiApiRecieverProps {
    story: string;
    tones: Array<string>;
  }
  
  interface GeminiApiResponseProps {
    prompt: string;
    advice: string;
    luckyTopics: Array<LuckyTopic>;
  }
  
  interface LuckyTopic {
    percentage: number;
    reason: string;
    topic: string;
  }