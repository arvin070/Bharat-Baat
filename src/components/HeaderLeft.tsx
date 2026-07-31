import React from 'react';

interface HeaderLeftProps {
  userAvatar: string;
  userName: string;
  onOpenStories: () => void;
  onOpenNewChat: () => void;
  onOpenProfile: () => void;
  onOpenSettings: () => void;
}

export const HeaderLeft: React.FC<HeaderLeftProps> = ({
  userAvatar,
  userName,
  onOpenStories,
  onOpenNewChat,
  onOpenProfile,
  onOpenSettings,
}) => {
  return (
    <div className="h-16 px-4 border-b border-[#504254] flex justify-between items-center bg-[#131313] shrink-0">
      <div
        className="flex items-center gap-3 cursor-pointer group"
        onClick={onOpenProfile}
        title="View My Profile"
      >
        <div className="h-10 w-10 rounded-full overflow-hidden border border-[#504254] group-hover:border-[#ebb2ff] transition-colors">
          <img
            alt={userName}
            className="w-full h-full object-cover"
            src={userAvatar}
          />
        </div>
        <h1 className="font-[#Plus_Jakarta_Sans] text-xl font-extrabold text-[#ebb2ff] tracking-tighter neon-text-glow">
          Bharat Baat
        </h1>
      </div>
      <div className="flex gap-1 sm:gap-2">
        <button
          onClick={onOpenStories}
          className="p-2 text-[#d4c0d7] hover:text-[#ebb2ff] hover:bg-[#2a2a2a] rounded-full transition-colors duration-150"
          title="Status / Stories"
        >
          <span className="material-symbols-outlined" data-icon="data_usage">
            data_usage
          </span>
        </button>
        <button
          onClick={onOpenNewChat}
          className="p-2 text-[#d4c0d7] hover:text-[#ebb2ff] hover:bg-[#2a2a2a] rounded-full transition-colors duration-150"
          title="New Chat"
        >
          <span className="material-symbols-outlined" data-icon="chat">
            chat
          </span>
        </button>
        <button
          onClick={onOpenSettings}
          className="p-2 text-[#d4c0d7] hover:text-[#ebb2ff] hover:bg-[#2a2a2a] rounded-full transition-colors duration-150"
          title="Settings & Menu"
        >
          <span className="material-symbols-outlined" data-icon="more_vert">
            more_vert
          </span>
        </button>
      </div>
    </div>
  );
};
