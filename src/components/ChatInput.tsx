import React, { useState, useRef, useEffect } from 'react';

interface ChatInputProps {
  onSendMessage: (text: string, attachment?: any) => void;
  isSending?: boolean;
}

const QUICK_EMOJIS = [
  '🚀', '🎨', '✨', '⚡', '💎', '🔥', '🌌', '🤖',
  '💻', '🎯', '💬', '🎮', '🧬', '🔮', '🌟', '✅',
  '👍', '❤️', '👀', '💡', '🎉', '🤯', '📱', '🔒'
];

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  isSending = false,
}) => {
  const [text, setText] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showAttachmentModal, setShowAttachmentModal] = useState(false);
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [recordTime, setRecordTime] = useState(0);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<any>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        120
      )}px`;
    }
  }, [text]);

  // Handle voice recording simulation
  const toggleVoiceRecording = () => {
    if (!isRecordingVoice) {
      setIsRecordingVoice(true);
      setRecordTime(0);
      timerRef.current = setInterval(() => {
        setRecordTime((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
      setIsRecordingVoice(false);
      onSendMessage(`🎙️ Voice Message (${recordTime}s)`);
      setRecordTime(0);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    if (text.trim() && !isSending) {
      onSendMessage(text.trim());
      setText('');
      setShowEmojiPicker(false);
      if (textareaRef.current) {
        textareaRef.current.style.height = '44px';
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const isImg = file.type.startsWith('image/');
      const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
      const url = URL.createObjectURL(file);

      onSendMessage(`Attached asset: ${file.name}`, {
        name: file.name,
        size: `${sizeMB} MB`,
        type: isImg ? 'image' : 'file',
        url: isImg ? url : undefined,
      });

      setShowAttachmentModal(false);
      e.target.value = '';
    }
  };

  return (
    <div className="relative px-3 py-3 md:px-4 bg-[#131313] border-t border-[#504254] shrink-0">
      {/* Emoji Picker Popup */}
      {showEmojiPicker && (
        <div className="absolute bottom-16 left-4 z-50 bg-[#1f1f1f] border border-[#504254] rounded-xl p-3 shadow-2xl w-64 grid grid-cols-6 gap-2">
          {QUICK_EMOJIS.map((emoji) => (
            <button
              key={emoji}
              onClick={() => {
                setText((prev) => prev + emoji);
              }}
              className="p-1.5 hover:bg-[#353535] rounded text-lg transition-colors text-center"
            >
              {emoji}
            </button>
          ))}
        </div>
      )}

      {/* Attachment Options Modal */}
      {showAttachmentModal && (
        <div className="absolute bottom-16 left-12 z-50 bg-[#1f1f1f] border border-[#504254] rounded-xl p-3 shadow-2xl flex flex-col gap-2 min-w-[180px]">
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-3 p-2 hover:bg-[#353535] rounded text-sm text-[#e2e2e2] transition-colors"
          >
            <span className="material-symbols-outlined text-[#ebb2ff]">image</span>
            <span>Photos & Videos</span>
          </button>
          <button
            onClick={() => {
              onSendMessage('active_states_v2.png attached', {
                name: 'active_states_v2.png',
                size: '2.4 MB',
                type: 'image',
                url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
              });
              setShowAttachmentModal(false);
            }}
            className="flex items-center gap-3 p-2 hover:bg-[#353535] rounded text-sm text-[#e2e2e2] transition-colors"
          >
            <span className="material-symbols-outlined text-[#00f4fe]">description</span>
            <span>Sample UI Mockup</span>
          </button>
        </div>
      )}

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        className="hidden"
        accept="image/*,.pdf,.doc,.docx"
      />

      {/* Main Input Controls */}
      <div className="flex items-end gap-2 md:gap-3">
        <button
          onClick={() => {
            setShowEmojiPicker(!showEmojiPicker);
            setShowAttachmentModal(false);
          }}
          className={`p-2 hover:text-[#ebb2ff] transition-colors shrink-0 mb-1 rounded-full ${
            showEmojiPicker ? 'text-[#ebb2ff] bg-[#2a2a2a]' : 'text-[#d4c0d7]'
          }`}
          title="Add Emoji"
        >
          <span className="material-symbols-outlined text-[24px] md:text-[26px]">
            sentiment_satisfied
          </span>
        </button>

        <button
          onClick={() => {
            setShowAttachmentModal(!showAttachmentModal);
            setShowEmojiPicker(false);
          }}
          className={`p-2 hover:text-[#ebb2ff] transition-colors shrink-0 mb-1 rounded-full ${
            showAttachmentModal ? 'text-[#ebb2ff] bg-[#2a2a2a]' : 'text-[#d4c0d7]'
          }`}
          title="Attach File or Asset"
        >
          <span className="material-symbols-outlined text-[24px] md:text-[26px]">
            attach_file
          </span>
        </button>

        {isRecordingVoice ? (
          <div className="flex-1 bg-[#2a2a2a] rounded-lg px-4 py-3 flex items-center justify-between animate-pulse border border-[#ebb2ff]">
            <div className="flex items-center gap-2 text-[#ebb2ff] font-semibold text-sm">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500 animate-ping" />
              <span>Recording Voice Note... ({recordTime}s)</span>
            </div>
            <button
              onClick={toggleVoiceRecording}
              className="text-[#ebb2ff] hover:text-white font-bold text-xs uppercase underline"
            >
              Send Voice
            </button>
          </div>
        ) : (
          <div className="flex-1 bg-[#2a2a2a] rounded-lg flex items-center mb-1 border border-transparent focus-within:border-[#ebb2ff]/50 transition-colors">
            <textarea
              ref={textareaRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent border-none focus:ring-0 text-[#e2e2e2] font-['Plus_Jakarta_Sans'] py-2.5 px-3 md:px-4 resize-none max-h-32 min-h-[44px] text-sm md:text-base outline-none"
              placeholder="Type a message"
              rows={1}
            />
          </div>
        )}

        <button
          onClick={toggleVoiceRecording}
          className={`p-2 hover:text-[#ebb2ff] transition-colors shrink-0 mb-1 rounded-full ${
            isRecordingVoice ? 'text-red-400 bg-red-950/40' : 'text-[#d4c0d7]'
          }`}
          title={isRecordingVoice ? 'Stop Recording' : 'Record Voice Note'}
        >
          <span className="material-symbols-outlined text-[24px] md:text-[26px]">
            {isRecordingVoice ? 'graphic_eq' : 'mic'}
          </span>
        </button>

        <button
          onClick={handleSend}
          disabled={!text.trim() || isSending}
          className={`h-11 w-11 md:h-12 md:w-12 rounded-full flex items-center justify-center shrink-0 mb-1 transition-all neon-glow active:scale-95 ${
            text.trim() && !isSending
              ? 'bg-[#ebb2ff] text-[#520072] hover:bg-[#bc13fe] cursor-pointer'
              : 'bg-[#353535] text-[#787676] cursor-not-allowed'
          }`}
          title="Send Message"
        >
          <span className="material-symbols-outlined text-[20px] md:text-[22px]">
            send
          </span>
        </button>
      </div>
    </div>
  );
};
