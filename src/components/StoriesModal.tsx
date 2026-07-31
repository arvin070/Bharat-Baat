import React, { useState } from 'react';
import { Story } from '../types';

interface StoriesModalProps {
  stories: Story[];
  onClose: () => void;
  onAddStory: (mediaUrl: string, caption: string) => void;
}

export const StoriesModal: React.FC<StoriesModalProps> = ({
  stories,
  onClose,
  onAddStory,
}) => {
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCaption, setNewCaption] = useState('');

  const activeStory = stories[activeStoryIndex];

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const sampleUrls = [
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    ];
    const mediaUrl = sampleUrls[Math.floor(Math.random() * sampleUrls.length)];
    onAddStory(mediaUrl, newCaption || 'Updating Bharat Baat design system ⚡');
    setNewCaption('');
    setShowAddForm(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0e0e0e]/95 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-[#181818] border border-[#504254] rounded-2xl overflow-hidden flex flex-col shadow-2xl h-[600px]">
        {/* Header */}
        <div className="h-16 px-4 bg-[#131313] border-b border-[#504254] flex justify-between items-center z-10">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#ebb2ff]">data_usage</span>
            <h2 className="font-bold text-[#e2e2e2] text-lg">Bharat Baat Status</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#d4c0d7] hover:text-[#ebb2ff] rounded-full hover:bg-[#2a2a2a]"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Story Content / Carousel */}
        {showAddForm ? (
          <form onSubmit={handleCreate} className="flex-1 p-6 flex flex-col justify-center gap-4 bg-[#1f1f1f]">
            <h3 className="text-xl font-bold text-[#ebb2ff] mb-2">Create Status Update</h3>
            <textarea
              value={newCaption}
              onChange={(e) => setNewCaption(e.target.value)}
              placeholder="What's happening in your tech or design stack?"
              className="w-full bg-[#2a2a2a] text-[#e2e2e2] p-3 rounded-lg border border-[#504254] focus:outline-none focus:border-[#ebb2ff] min-h-[120px]"
            />
            <div className="flex gap-3 mt-4">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="flex-1 py-2.5 rounded-lg border border-[#504254] text-[#d4c0d7] hover:bg-[#2a2a2a]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-lg bg-[#ebb2ff] text-[#520072] font-bold neon-glow hover:bg-[#bc13fe]"
              >
                Post Status
              </button>
            </div>
          </form>
        ) : activeStory ? (
          <div className="relative flex-1 bg-black flex flex-col">
            {/* Progress Bars */}
            <div className="absolute top-3 inset-x-3 z-20 flex gap-1.5">
              {stories.map((s, idx) => (
                <div
                  key={s.id}
                  className={`h-1 flex-1 rounded-full transition-all ${
                    idx === activeStoryIndex
                      ? 'bg-[#ebb2ff] neon-glow'
                      : idx < activeStoryIndex
                      ? 'bg-[#ebb2ff]/50'
                      : 'bg-[#353535]'
                  }`}
                />
              ))}
            </div>

            {/* User Details Overlay */}
            <div className="absolute top-7 inset-x-3 z-20 flex justify-between items-center">
              <div className="flex items-center gap-3 bg-[#131313]/70 backdrop-blur px-3 py-1.5 rounded-full border border-[#504254]">
                <img
                  src={activeStory.avatar}
                  alt={activeStory.contactName}
                  className="h-7 w-7 rounded-full object-cover border border-[#ebb2ff]"
                />
                <span className="text-xs font-bold text-[#e2e2e2]">
                  {activeStory.contactName}
                </span>
                <span className="text-[10px] text-[#d4c0d7]">
                  {activeStory.timestamp}
                </span>
              </div>
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-[#ebb2ff] text-[#520072] px-3 py-1 rounded-full text-xs font-bold neon-glow hover:bg-[#bc13fe]"
              >
                + Add Status
              </button>
            </div>

            {/* Media Image */}
            <img
              src={activeStory.mediaUrl}
              alt={activeStory.caption || 'Status'}
              className="w-full h-full object-cover"
            />

            {/* Caption Overlay */}
            {activeStory.caption && (
              <div className="absolute bottom-6 inset-x-4 z-20 bg-[#131313]/80 backdrop-blur p-3 rounded-xl border border-[#504254]">
                <p className="text-sm text-[#e2e2e2] text-center font-medium">
                  {activeStory.caption}
                </p>
              </div>
            )}

            {/* Click Navigation Controls */}
            <button
              onClick={() =>
                setActiveStoryIndex((prev) => Math.max(0, prev - 1))
              }
              className="absolute left-0 top-0 bottom-0 w-1/3 z-10 opacity-0 hover:opacity-10 transition-opacity bg-white/20"
            />
            <button
              onClick={() =>
                setActiveStoryIndex((prev) =>
                  Math.min(stories.length - 1, prev + 1)
                )
              }
              className="absolute right-0 top-0 bottom-0 w-1/3 z-10 opacity-0 hover:opacity-10 transition-opacity bg-white/20"
            />
          </div>
        ) : (
          <div className="flex-1 p-6 flex flex-col items-center justify-center text-center">
            <p className="text-[#d4c0d7] mb-4">No statuses available right now.</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="px-4 py-2 bg-[#ebb2ff] text-[#520072] font-bold rounded-lg neon-glow"
            >
              Post First Status
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
