import React, { useState } from 'react';
import {
  IconBriefcase,
  IconBulb,
  IconSchool,
  IconWriting,
  IconMoodSmile,
  IconHeart,
} from '@tabler/icons-react';
import PromptModal from '@/components/PromptModal'; // Make sure the path to PromptModal is correct

const categories = [
  { icon: IconBriefcase, label: 'Business' },
  { icon: IconSchool, label: 'Education' },
  { icon: IconBulb, label: 'Creative' },
  { icon: IconHeart, label: 'Health' },
  { icon: IconWriting, label: 'Journaling' },
  { icon: IconMoodSmile, label: 'Communication' },
];

const CategoryLinks: React.FC = () => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLinkClick = (label: string) => {
    setSelectedTopic(label);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="mt-5">
      {categories.map(({ icon: Icon, label }) => (
        <button
          key={label}
          className="m-1 py-2 px-3 inline-flex 
            items-center gap-x-2 text-sm font-medium 
            rounded-lg border  shadow-sm
            disabled:opacity-50 disabled:pointer-events-none
            bg-neutral-900 border-neutral-700
            text-white :hover:bg-neutral-800"
          onClick={() => handleLinkClick(label)}
        >
          <Icon size={18} />
          {label}
        </button>
      ))}

        {isModalOpen && selectedTopic !== null && (
          <PromptModal topic={selectedTopic} onClose={handleCloseModal} />
        )}
    </div>
  );
};

export default CategoryLinks;
