import { useEffect, useState, useCallback } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Define a type for the error state
type ErrorType = string | null;

const useGeneratePrompt = (topic: string) => {
  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorType>(null);

  // Function to handle prompt generation
  const handleGeneratePrompt = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Ensure the API key is properly set
      const apiKey = process.env.NEXT_PUBLIC_API_KEY;
      if (!apiKey) {
        throw new Error('API key is missing');
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const promptText = `Generate without using markdown a unique and creative writing or speaking prompt on the topic: ${topic}.`;

      const result = await model.generateContent(promptText);

      // Extract the prompt from the response
      if (result.response?.text) {
        setPrompt(result.response.text);
      } else {
        setPrompt('Prompt not available.');
      }
    } catch (error) {
      console.error('Error generating prompt:', error);
      setError('Failed to generate prompt.');
    } finally {
      setIsLoading(false);
    }
  }, [topic]);

  // Use useEffect to trigger prompt generation when the topic changes
  useEffect(() => {
    if (topic.trim()) {
      handleGeneratePrompt();
    }
  }, [topic, handleGeneratePrompt]);

  // Return the prompt, loading state, error, and the regenerate function
  return { prompt, isLoading, error, regeneratePrompt: handleGeneratePrompt };
};

export default useGeneratePrompt;
