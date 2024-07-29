import OpenAI from "openai";
import { useEffect, useState } from "react";
const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});


const useTranslate = (sourceText, selectedLanguage) => {
    const [targetText, setTargetText] = useState("");

    useEffect(() => {
        const handleTranslate = async (sourceText) => {
            try {
                const response = await openai.chat.completions.create({
                    model: 'gpt-4o-mini',
                    messages:[
                        {role: 'user', content: `You will be provided with a sentence. Your tasks are to:
                        1. Read the sentence: ${sourceText}.
                        2. Detect what language the sentence is in.
                        3. Translate the sentence into ${selectedLanguage}.
                        Do not return anything other than the translated sentence.`},
                    ]
                })
                const data = response.data.choices[0].message.content;
                setTargetText(data);
            } catch (error) {
                console.error('Error Translating text', error);
            }
        }
        if(sourceText.trim()){
            const timeoutId = setTimeout(() => {handleTranslate(sourceText)}, 500);
            return () => clearTimeout(timeoutId);
        }
    }, [sourceText, selectedLanguage]);
    return targetText;
}

export default useTranslate;