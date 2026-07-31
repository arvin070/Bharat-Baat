import React from 'react';
import { Contact } from '../types';

interface ChatHeaderRightProps {
  contact: Contact;
  onStartVideoCall: () => void;
  onStartVoiceCall: () => void;
  onSearchInChat: () => void;
  onToggleContactInfo: () => void;
  onBackToMobileList?: () => void;
}

export const ChatHeaderRight: React.FC<ChatHeaderRightProps> = ({
  contact,
  onStartVideoCall,
  onStartVoiceCall,
  onSearchInChat,
  onToggleContactInfo,
  onBackToMobileList,
}) => {
  return (
    <div className="h-16 border-b border-[#504254] px-4 md:px-6 flex items-center justify-between bg-[#131313] shrink-0">
      <div className="flex items-center gap-3 md:gap-4">
        {onBackToMobileList && (
          <button
            onClick={onBackToMobileList}
            className="md:hidden text-[#d4c0d7] hover:text-[#ebb2ff] p-1"
            title="Back to Chats"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
        )}
        <div
          onClick={onToggleContactInfo}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="h-10 w-10 rounded-full overflow-hidden border border-[#ebb2ff] neon-glow shrink-0">
            <img
              alt={contact.name}
              className="w-full h-full object-cover"
              src={contact.avatar}
            />
          </div>
          <div className="min-w-0">
            <h2 className="text-sm md:text-base font-bold text-[#e2e2e2] truncate group-hover:text-[#ebb2ff] transition-colors">
              {contact.name}
            </h2>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#00f4fe] animate-pulse"></span>
              <span className="text-xs text-[#d4c0d7]">
                {contact.isGroup
                  ? `${contact.membersCount || 8} members`
                  : contact.status || 'online'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <button
          onClick={onStartVideoCall}
          className="p-2 text-[#d4c0d7] hover:text-[#ebb2ff] hover:bg-[#2a2a2a] rounded-full transition-colors duration-150"
          title="Start Video Call"
        >
          <span className="material-symbols-outlined" data-icon="videocam">
            videocam
          </span>
        </button>
        <button
          onClick={onStartVoiceCall}
          className="p-2 text-[#d4c0d7] hover:text-[#ebb2ff] hover:bg-[#2a2a2a] rounded-full transition-colors duration-150"
          title="Start Voice Call"
        >
          <span className="material-symbols-outlined" data-icon="call">
            call
          </span>
        </button>
        <div className="w-px h-6 bg-[#504254] mx-1 hidden sm:block"></div>
        <button
          onClick={onSearchInChat}
          className="p-2 text-[#d4c0d7] hover:text-[#ebb2ff] hover:bg-[#2a2a2a] rounded-full transition-colors duration-150"
          title="Search in Chat"
        >
          <span className="material-symbols-outlined" data-icon="search">
            search
          </span>
        </button>
        <button
          onClick={onToggleContactInfo}
          className="p-2 text-[#d4c0d7] hover:text-[#ebb2ff] hover:bg-[#2a2a2a] rounded-full transition-colors duration-150"
          title="Contact Info & Media"
        >
          <span className="material-symbols-outlined" data-icon="more_vert">
            more_vert
          </span>
        </button>
      </div>
    </div>
  );
};
