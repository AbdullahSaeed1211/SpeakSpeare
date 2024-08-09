import React from 'react';
import {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog'; // Adjust the import path as needed
import useGeneratePrompt from '@/hooks/useGeneratePrompt';

interface PromptModalProps {
  topic: string;
  onClose: () => void;
}

const PromptModal: React.FC<PromptModalProps> = ({ topic, onClose }) => {
  const { prompt, isLoading, error, regeneratePrompt } = useGeneratePrompt(topic);

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogPortal>
        <DialogOverlay className="fixed inset-0 bg-black/50" />
        <DialogContent className="dark:bg-[#171717] text-white rounded-lg p-6 max-w-lg w-full shadow-lg border border-neutral-700">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold">
              Your Prompt on {topic}
            </DialogTitle>
          </DialogHeader>

          <DialogDescription className="text-sm mt-4 prose prose-invert">
            {isLoading ? (
              <p>Loading prompt...</p>
            ) : error ? (
              <p className="text-red-400">{error}</p>
            ) : (
              <div className="whitespace-pre-wrap space-y-4">
                {/* You can add specific HTML tags here if the response supports it */}
                <p>{prompt}</p>

                {/* Example of adding a bold keyword */}
                <p className="font-bold text-[#0284c7]">
                  Key Idea: {topic}
                </p>
                
                {/* Example of highlighting part of the response */}
                <p className="bg-neutral-800 p-2 rounded-lg">
                  {prompt && prompt.split('.').slice(0, 2).join('. ')}...
                </p>
              </div>
            )}
          </DialogDescription>

          <DialogFooter className="mt-4">
            <button
              className="py-2 px-4 bg-gray-600 text-white rounded-lg mr-2 hover:bg-gray-500"
              onClick={regeneratePrompt}
            >
              New Prompt
            </button>
            <DialogClose asChild>
              <button className="py-2 px-4 bg-[#171717] text-white rounded-lg hover:bg-blue-500">
                Close
              </button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default PromptModal;
