import { useState, FC } from 'react';

interface Tab {
  label: string;
  content: React.ReactNode;
}

interface DetailTabsProps {
  tabs: Tab[];
}

const DetailTabs: FC<DetailTabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <div className="w-full mt-20">
      <div className="flex whitespace-pre-wrap overflow-x-auto justify-center md:justify-center md:gap-10">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`py-2 px-4 focus:outline-none  md:font-semibold text-xs md:text-lg ${
              activeTab === index
                ? 'border-b-2 border-black text-black'
                : 'text-black'
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="p-4 mt-5">
        {tabs[activeTab].content}
      </div>
    </div>
  );
};

export default DetailTabs;
