import React, { useEffect, useRef, useState } from 'react';
import { Contact } from '../types';

interface CallModalProps {
  contact: Contact;
  type: 'video' | 'voice';
  onEndCall: () => void;
}

export const CallModal: React.FC<CallModalProps> = ({
  contact,
  type,
  onEndCall,
}) => {
  const [seconds, setSeconds] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(type === 'voice');
  const [hasCamPermission, setHasCamPermission] = useState(false);

  const localVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    if (type === 'video') {
      navigator.mediaDevices
        ?.getUserMedia({ video: true, audio: true })
        .then((stream) => {
          setHasCamPermission(true);
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
          }
        })
        .catch((err) => {
          console.log('Media camera access info:', err);
          setHasCamPermission(false);
        });
    }

    return () => {
      clearInterval(timer);
      if (localVideoRef.current?.srcObject) {
        const stream = localVideoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [type]);

  const formatTime = (totalSec: number) => {
    const m = Math.floor(totalSec / 60)
      .toString()
      .padStart(2, '0');
    const s = (totalSec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0e0e0e]/95 backdrop-blur-md flex flex-col justify-between p-6 md:p-8 animate-in fade-in duration-200">
      {/* Call Header */}
      <div className="flex justify-between items-center text-[#e2e2e2] max-w-4xl mx-auto w-full z-10">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-[#00f4fe] animate-pulse">
            lock
          </span>
          <span className="text-xs uppercase tracking-wider text-[#d4c0d7] font-semibold">
            Bharat Baat End-to-End Encrypted Call
          </span>
        </div>
        <div className="bg-[#1f1f1f] px-3 py-1 rounded-full border border-[#504254] text-xs font-mono text-[#ebb2ff] neon-glow">
          {formatTime(seconds)}
        </div>
      </div>

      {/* Main Video / Voice Stage */}
      <div className="relative flex-1 max-w-4xl mx-auto w-full my-6 bg-[#181818] rounded-2xl border border-[#504254] overflow-hidden flex items-center justify-center shadow-2xl">
        {type === 'video' && !isVideoOff && hasCamPermission ? (
          <div className="relative w-full h-full bg-black">
            <video
              ref={localVideoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover transform -scale-x-100"
            />
            {/* Overlay Contact Badge */}
            <div className="absolute top-4 left-4 bg-[#131313]/80 backdrop-blur px-4 py-2 rounded-xl border border-[#504254] flex items-center gap-3">
              <div className="h-8 w-8 rounded-full overflow-hidden border border-[#ebb2ff]">
                <img src={contact.avatar} alt={contact.name} className="w-full h-full object-cover" />
              </div>
              <span className="text-sm font-bold text-[#e2e2e2]">{contact.name}</span>
            </div>
          </div>
        ) : (
          /* Voice Call / Camera Off Screen */
          <div className="flex flex-col items-center gap-6 text-center p-6">
            <div className="relative">
              <div className="h-28 w-28 md:h-36 md:w-36 rounded-full overflow-hidden border-2 border-[#ebb2ff] neon-glow-lg animate-pulse">
                <img
                  src={contact.avatar}
                  alt={contact.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 right-2 h-8 w-8 rounded-full bg-[#00f4fe] border-2 border-[#131313] flex items-center justify-center text-[#003739]">
                <span className="material-symbols-outlined text-[18px]">
                  {type === 'video' ? 'videocam' : 'call'}
                </span>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#e2e2e2] mb-1">
                {contact.name}
              </h2>
              <p className="text-sm text-[#00f4fe] font-medium">
                {type === 'video' ? 'Video Call Connected' : 'Voice Call Connected'}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Call Control Toolbar */}
      <div className="flex items-center justify-center gap-4 md:gap-6 max-w-4xl mx-auto w-full z-10">
        <button
          onClick={() => setIsMuted(!isMuted)}
          className={`h-14 w-14 rounded-full flex items-center justify-center border transition-all ${
            isMuted
              ? 'bg-red-500/20 text-red-400 border-red-500'
              : 'bg-[#2a2a2a] text-[#e2e2e2] border-[#504254] hover:bg-[#353535]'
          }`}
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          <span className="material-symbols-outlined text-[24px]">
            {isMuted ? 'mic_off' : 'mic'}
          </span>
        </button>

        {type === 'video' && (
          <button
            onClick={() => setIsVideoOff(!isVideoOff)}
            className={`h-14 w-14 rounded-full flex items-center justify-center border transition-all ${
              isVideoOff
                ? 'bg-red-500/20 text-red-400 border-red-500'
                : 'bg-[#2a2a2a] text-[#e2e2e2] border-[#504254] hover:bg-[#353535]'
            }`}
            title={isVideoOff ? 'Turn Camera On' : 'Turn Camera Off'}
          >
            <span className="material-symbols-outlined text-[24px]">
              {isVideoOff ? 'videocam_off' : 'videocam'}
            </span>
          </button>
        )}

        <button
          onClick={onEndCall}
          className="h-16 w-16 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center shadow-lg transition-transform active:scale-95 border border-red-400"
          title="End Call"
        >
          <span className="material-symbols-outlined text-[28px]">call_end</span>
        </button>
      </div>
    </div>
  );
};
