import { useEffect, useState, useCallback } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Define types for the hook's return values
interface UseTranslateReturn {
  targetText: string;
  isLoading: boolean;
  error: string | null;
}

const useTranslate = (sourceText: string, selectedLanguage: string): UseTranslateReturn => {
  const [targetText, setTargetText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleTranslate = useCallback(async (text: string) => {
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
      const prompt = `Translate the following text to ${selectedLanguage}: ${text} \n reply only with the translated text`;

      const result = await model.generateContent(prompt);

      // Extract the translated text from the response
      if (result.response?.text) {
        setTargetText(result.response.text());
      } else {
        setTargetText('Translation not available.');
      }
    } catch (error) {
      console.error('Error Translating text:', error);
      setError('Failed to translate text.');
    } finally {
      setIsLoading(false);
    }
  }, [selectedLanguage]);

  useEffect(() => {
    if (sourceText.trim()) {
      handleTranslate(sourceText);
    }
  }, [sourceText, selectedLanguage, handleTranslate]);

  return { targetText, isLoading, error };
};

export default useTranslate;
