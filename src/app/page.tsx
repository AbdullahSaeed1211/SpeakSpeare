"use client";
import "regenerator-runtime/runtime";
import React, { useState, ChangeEvent } from "react";
import {
  IconCopy,
  IconStar,
  IconThumbDown,
  IconThumbUp,
  IconVolume,
} from "@tabler/icons-react";
import SpeechRecognitionComponent from "@/components/SpeechRecognition/SpeechRecognition";
import TextArea from "@/components/Input/TextArea";
import FileUpload from "@/components/Input/FileUpload";
import LanguageSelector from "@/components/Input/LanguageSelector";
import useTranslate from "@/hooks/useTranslate";
import { rtfToText } from "@/utils/rtfToText";

import CategoryLinks from "@/components/CategoryLinks";

const Home: React.FC = () => {
  const [sourceText, setSourceText] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [favorite, setFavorite] = useState<boolean>(false);
  const [languages] = useState<string[]>([
    "English",
    "Spanish",
    "French",
    "German",
    "Chinese",
    "Japanese",
  ]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("Spanish");
  const [like, setLike] = useState<boolean>(false);
  const [dislike, setDislike] = useState<boolean>(false);

  // Usage
  const { targetText, isLoading, error } = useTranslate(
    sourceText,
    selectedLanguage
  );

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const rtfContent = reader.result as string;
        const text = rtfToText(rtfContent);
        setSourceText(text);
      };
      reader.readAsText(file);
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(targetText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLike = () => {
    setLike(true);
    setDislike(false);
    // implement logic here to save likes (e.g., to a server or local storage)
  };

  const handleDislike = () => {
    setDislike(true);
    setLike(false);
    // implement logic here to save dislikes (e.g., to a server or local storage)
  };

  const handleFavorite = () => {
    setFavorite(!favorite);
    if (!favorite) {
      localStorage.setItem("favoriteTranslation", targetText);
    } else {
      localStorage.removeItem("favoriteTranslation");
    }
  };

  const handleAudioPlayback = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="w-full bg-black dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

      <div className="relative overflow-hidden h-screen">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold  text-neutral-200">
              Speak<span className="text-[#0284c7]">Speare</span>
            </h1>

            <p className="mt-3 text-neutral-400">
              SpeakSpeare: Your language wizard.
            </p>

            <div className="mt-7 sm:mt-12 mx-auto max-w-3xl relative">
              <div className="grid gap-4 md:grid-cols-2 grid-cols-1">
                <div className="relative z-10 flex flex-col space-x-3 p-3  border rounded-lg shadow-lg  bg-neutral-900 border-neutral-700 shadow-gray-900/20">
                  <TextArea
                    id="source-language"
                    value={sourceText}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                      setSourceText(e.target.value)
                    }
                    placeholder="Source Language"
                  />
                  <div className="flex flex-row justify-between w-full">
                    <span className="cursor-pointer flex space-x-2 flex-row">
                      <SpeechRecognitionComponent
                        setSourceText={setSourceText}
                      />
                      <IconVolume
                        size={22}
                        className="text-[#ffffff]"
                        onClick={() => handleAudioPlayback(sourceText)}
                      />
                      <FileUpload handleFileUpload={handleFileUpload} />
                    </span>
                    <span className="text-sm pr-4 text-white">
                      {sourceText.length} / 2000
                    </span>
                  </div>
                </div>

                <div className="relative z-10 flex flex-col space-x-3 p-3  border rounded-lg shadow-lg  bg-neutral-900 border-neutral-700 shadow-gray-900/20">
                  <TextArea
                    id="target-language"
                    value={targetText}
                    onChange={() => {}}
                    placeholder="Target Language"
                  />
                  <div className="flex flex-row justify-between w-full">
                    <span className="cursor-pointer flex items-center space-x-2 flex-row">
                      <LanguageSelector
                        selectedLanguage={selectedLanguage}
                        setSelectedLanguage={setSelectedLanguage}
                        languages={languages}
                      />
                      <IconVolume
                        size={22}
                        className="text-[#ffffff]"
                        onClick={() => handleAudioPlayback(targetText)}
                      />
                    </span>
                    <div className="flex flex-row items-center space-x-2 pr-4 cursor-pointer">
                      <IconCopy
                        size={22}
                        className="text-[#ffffff]"
                        onClick={handleCopyToClipboard}
                      />
                      {copied && (
                        <span className="text-xs text-green-500">Copied!</span>
                      )}
                      <IconThumbUp
                        size={22}
                        onClick={handleLike}
                        className={like ? "text-blue-500" : "text-white"}
                      />
                      <IconThumbDown
                        size={22}
                        onClick={handleDislike}
                        className={dislike ? "text-red-500" : "text-white"}
                      />
                      <IconStar
                        size={22}
                        onClick={handleFavorite}
                        className={favorite ? "text-yellow-500" : "text-white"}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <h2 className="mt-12 text-2xl font-bold text-neutral-200">
            Master Speaking & Writing: Choose a Category and Start with AI-Generated Prompts
            </h2>
            <CategoryLinks />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
