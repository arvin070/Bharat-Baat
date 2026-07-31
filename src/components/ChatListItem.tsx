import React from 'react';
import { Contact } from '../types';

interface ChatListItemProps {
  contact: Contact;
  isActive: boolean;
  onClick: () => void;
}

export const ChatListItem: React.FC<ChatListItemProps> = ({
  contact,
  isActive,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 p-4 cursor-pointer transition-colors border-t border-[#504254]/30 ${
        isActive
          ? 'bg-[#353535]'
          : 'bg-[#131313] hover:bg-[#2a2a2a]'
      }`}
    >
      <div className="relative shrink-0">
        <div
          className={`h-12 w-12 rounded-full overflow-hidden border ${
            isActive
              ? 'border-[#ebb2ff] neon-glow'
              : 'border-[#504254]'
          }`}
        >
          <img
            alt={contact.name}
            className="w-full h-full object-cover"
            src={contact.avatar}
          />
        </div>
        {contact.unreadCount ? (
          <div className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-[#ebb2ff] text-[#520072] text-[10px] flex items-center justify-center font-bold">
            {contact.unreadCount}
          </div>
        ) : contact.status === 'online' ? (
          <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-[#00f4fe] border-2 border-[#131313] cyan-glow" />
        ) : null}
      </div>

      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <div className="flex justify-between items-baseline mb-1">
          <h3
            className={`text-sm truncate ${
              isActive || contact.unreadCount
                ? 'font-bold text-[#e2e2e2]'
                : 'font-semibold text-[#e2e2e2]'
            }`}
          >
            {contact.name}
          </h3>
          <span
            className={`text-xs ${
              isActive || contact.unreadCount
                ? 'text-[#ebb2ff] font-bold'
                : 'text-[#d4c0d7]'
            }`}
          >
            {contact.lastMessageTime || 'Now'}
          </span>
        </div>
        <p
          className={`text-xs truncate ${
            contact.unreadCount
              ? 'text-[#e2e2e2] font-medium'
              : 'text-[#d4c0d7]'
          }`}
        >
          {contact.lastMessage || 'Click to open conversation'}
        </p>
      </div>
    </div>
  );
};
