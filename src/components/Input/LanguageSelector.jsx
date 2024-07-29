import { IconLanguage } from "@tabler/icons-react";

export default function LanguageSelector({
  selectedLanguage,
  setSelectedLanguage,
  languages,
}) {
  return (
    <span className="cursor-pointer rounded-full space-x-1 pl-2 bg-black flex items-center flex-row">
      <IconLanguage size={20} />
      <select
        value={selectedLanguage}
        onChange={(e) => setSelectedLanguage(e.target.value)}
        className="bg-black text-white flex flex-row rounded-full py-1">
        {languages.map((language, index) => (
          <option key={index} value={language}>
            {language}
          </option>
        ))}
      </select>
    </span>
  );
}
