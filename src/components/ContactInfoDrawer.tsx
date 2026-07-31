import React from 'react';
import { Contact, Message } from '../types';

interface ContactInfoDrawerProps {
  contact: Contact;
  messages: Message[];
  onClose: () => void;
  onStartCall: (type: 'video' | 'voice') => void;
}

export const ContactInfoDrawer: React.FC<ContactInfoDrawerProps> = ({
  contact,
  messages,
  onClose,
  onStartCall,
}) => {
  const attachments = messages
    .filter((m) => m.attachment)
    .map((m) => m.attachment!);

  return (
    <div className="w-full md:w-80 bg-[#1b1b1b] border-l border-[#504254] flex flex-col h-full overflow-y-auto shrink-0 z-20">
      {/* Drawer Header */}
      <div className="h-16 px-4 border-b border-[#504254] flex justify-between items-center bg-[#131313] shrink-0">
        <h3 className="font-bold text-[#e2e2e2] text-sm md:text-base">Contact Info</h3>
        <button
          onClick={onClose}
          className="p-1.5 text-[#d4c0d7] hover:text-[#ebb2ff] rounded-full hover:bg-[#2a2a2a]"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>
      </div>

      {/* Profile Details */}
      <div className="p-6 flex flex-col items-center text-center border-b border-[#504254]/40 bg-[#131313]">
        <div className="h-24 w-24 rounded-full overflow-hidden border-2 border-[#ebb2ff] neon-glow mb-4">
          <img
            src={contact.avatar}
            alt={contact.name}
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-lg font-bold text-[#e2e2e2] mb-1">{contact.name}</h2>
        <p className="text-xs text-[#00f4fe] font-medium mb-4">
          {contact.isGroup ? `${contact.membersCount} members` : contact.phone || '+1 (555) 019-2834'}
        </p>

        {/* Action Buttons */}
        <div className="flex gap-4 w-full">
          <button
            onClick={() => onStartCall('voice')}
            className="flex-1 py-2 rounded-lg bg-[#2a2a2a] hover:bg-[#353535] text-[#ebb2ff] border border-[#504254] flex items-center justify-center gap-2 text-xs font-semibold"
          >
            <span className="material-symbols-outlined text-[18px]">call</span>
            Audio
          </button>
          <button
            onClick={() => onStartCall('video')}
            className="flex-1 py-2 rounded-lg bg-[#2a2a2a] hover:bg-[#353535] text-[#ebb2ff] border border-[#504254] flex items-center justify-center gap-2 text-xs font-semibold"
          >
            <span className="material-symbols-outlined text-[18px]">videocam</span>
            Video
          </button>
        </div>
      </div>

      {/* Bio / About */}
      <div className="p-4 border-b border-[#504254]/40">
        <h4 className="text-xs uppercase font-bold text-[#d4c0d7] mb-2 tracking-wider">About</h4>
        <p className="text-sm text-[#e2e2e2] leading-relaxed">
          {contact.bio || 'Designing next-generation interfaces on Bharat Baat.'}
        </p>
      </div>

      {/* Shared Attachments Gallery */}
      <div className="p-4 border-b border-[#504254]/40 flex-1">
        <div className="flex justify-between items-center mb-3">
          <h4 className="text-xs uppercase font-bold text-[#d4c0d7] tracking-wider">
            Shared Media & Files
          </h4>
          <span className="text-xs text-[#ebb2ff]">{attachments.length} items</span>
        </div>

        {attachments.length > 0 ? (
          <div className="grid grid-cols-2 gap-2">
            {attachments.map((att, idx) => (
              <div
                key={idx}
                className="bg-[#2a2a2a] p-2 rounded border border-[#504254] flex flex-col items-center justify-center text-center overflow-hidden"
              >
                {att.url ? (
                  <img
                    src={att.url}
                    alt={att.name}
                    className="h-20 w-full object-cover rounded mb-1"
                  />
                ) : (
                  <span className="material-symbols-outlined text-[#ebb2ff] text-2xl mb-1">
                    description
                  </span>
                )}
                <span className="text-[11px] font-medium text-[#e2e2e2] truncate w-full">
                  {att.name}
                </span>
                <span className="text-[10px] text-[#d4c0d7]">{att.size}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-[#787676] italic">No shared media yet.</p>
        )}
      </div>

      {/* Security Info */}
      <div className="p-4 bg-[#131313] mt-auto border-t border-[#504254]/40">
        <div className="flex items-center gap-3 text-xs text-[#d4c0d7]">
          <span className="material-symbols-outlined text-[#00f4fe] text-[20px]">
            encrypted
          </span>
          <div>
            <p className="font-semibold text-[#e2e2e2]">End-to-End Encryption</p>
            <p className="text-[11px]">Messages and calls are secured with Bharat Baat RSA-4096 tokens.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
