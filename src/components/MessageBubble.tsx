import React from 'react';
import { Message } from '../types';

interface MessageBubbleProps {
  message: Message;
  onPreviewAttachment?: (attachment: NonNullable<Message['attachment']>) => void;
  onPlaySpeech?: (text: string) => void;
  isSpeechLoading?: boolean;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  onPreviewAttachment,
  onPlaySpeech,
  isSpeechLoading,
}) => {
  const isUser = message.sender === 'user';

  return (
    <div
      className={`flex items-end gap-2 max-w-[85%] sm:max-w-[75%] md:max-w-[70%] ${
        isUser ? 'self-end' : 'self-start'
      }`}
    >
      <div className={`flex flex-col gap-1 w-full ${isUser ? 'items-end' : 'items-start'}`}>
        <div
          className={`relative group p-3 rounded-lg text-[15px] leading-relaxed border ${
            isUser
              ? 'bg-[#240033] text-[#f8d8ff] rounded-tr-none border-[#ebb2ff]/30 neon-glow'
              : 'bg-[#2a2a2a] text-[#e2e2e2] rounded-tl-none border-[#504254]/30 shadow-[0_0_10px_rgba(255,255,255,0.02)]'
          }`}
        >
          <p className="whitespace-pre-wrap break-words font-['Plus_Jakarta_Sans']">
            {message.text}
          </p>

          {/* Attachment Preview Box */}
          {message.attachment && (
            <div
              onClick={() => onPreviewAttachment && onPreviewAttachment(message.attachment!)}
              className="mt-2.5 bg-[#1b1b1b] p-2.5 rounded border border-[#504254]/40 flex items-center gap-3 cursor-pointer hover:bg-[#1f1f1f] transition-colors"
            >
              <div className="h-10 w-10 bg-[#ebb2ff]/10 rounded flex items-center justify-center text-[#ebb2ff] shrink-0">
                <span className="material-symbols-outlined" data-icon="image">
                  {message.attachment.type === 'image' ? 'image' : 'description'}
                </span>
              </div>
              <div className="flex-1 overflow-hidden min-w-0">
                <p className="text-[13px] font-semibold truncate text-[#e2e2e2]">
                  {message.attachment.name}
                </p>
                <p className="text-[11px] text-[#d4c0d7]">
                  {message.attachment.size}
                </p>
              </div>
            </div>
          )}

          {/* Bottom Timestamp & Status Bar */}
          <div className="flex justify-between items-center gap-2 mt-1.5 pt-1 border-t border-white/5 text-[11px]">
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {onPlaySpeech && (
                <button
                  onClick={() => onPlaySpeech(message.text)}
                  className="text-[#ebb2ff] hover:text-[#00f4fe] transition-colors flex items-center gap-1"
                  title="Read aloud with Gemini Speech"
                  disabled={isSpeechLoading}
                >
                  <span className="material-symbols-outlined text-[14px]">
                    volume_up
                  </span>
                </button>
              )}
            </div>

            <div className="flex items-center gap-1 ml-auto">
              <span
                className={isUser ? 'text-[#ebb2ff]/70' : 'text-[#d4c0d7]'}
              >
                {message.timestamp}
              </span>
              {isUser && (
                <span
                  className="material-symbols-outlined text-[#63f7ff] text-[14px]"
                  data-icon="done_all"
                  title="Delivered & Read"
                >
                  done_all
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
