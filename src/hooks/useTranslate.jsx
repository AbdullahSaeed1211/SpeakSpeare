import { useEffect, useState, useCallback } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const useTranslate = (sourceText, selectedLanguage) => {
  const [targetText, setTargetText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleTranslate = useCallback(async (text) => {
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
      const prompt = `Translate the following text to ${selectedLanguage}: ${text} reply only with the translated text.`;

      const result = await model.generateContent(prompt);

      // Extract the translated text from the response
      if (result.response && result.response.text) {
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
