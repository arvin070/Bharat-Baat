import React, { useState } from 'react';
import { Contact } from '../types';

interface NewChatModalProps {
  contacts: Contact[];
  onSelectContact: (contact: Contact) => void;
  onCreateCustomContact: (name: string, bio: string) => void;
  onClose: () => void;
}

export const NewChatModal: React.FC<NewChatModalProps> = ({
  contacts,
  onSelectContact,
  onCreateCustomContact,
  onClose,
}) => {
  const [filter, setFilter] = useState('');
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customBio, setCustomBio] = useState('');

  const filtered = contacts.filter((c) =>
    c.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (customName.trim()) {
      onCreateCustomContact(customName.trim(), customBio.trim());
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#0e0e0e]/95 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-[#181818] border border-[#504254] rounded-2xl overflow-hidden flex flex-col shadow-2xl max-h-[80vh]">
        {/* Header */}
        <div className="h-16 px-4 bg-[#131313] border-b border-[#504254] flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[#ebb2ff]">chat</span>
            <h2 className="font-bold text-[#e2e2e2] text-lg">New Bharat Baat Chat</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#d4c0d7] hover:text-[#ebb2ff] rounded-full hover:bg-[#2a2a2a]"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Content */}
        {showCustomForm ? (
          <form onSubmit={handleCreate} className="p-6 flex flex-col gap-4">
            <h3 className="text-base font-bold text-[#ebb2ff]">
              Create AI Bot or Custom Contact
            </h3>
            <div>
              <label className="text-xs text-[#d4c0d7] font-semibold block mb-1">
                Name
              </label>
              <input
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder="e.g. Vikram Patel (DevOps Lead)"
                className="w-full bg-[#2a2a2a] text-[#e2e2e2] px-3 py-2 rounded-lg border border-[#504254] focus:outline-none focus:border-[#ebb2ff]"
                required
              />
            </div>
            <div>
              <label className="text-xs text-[#d4c0d7] font-semibold block mb-1">
                Role / System Persona Bio
              </label>
              <textarea
                value={customBio}
                onChange={(e) => setCustomBio(e.target.value)}
                placeholder="e.g. Expert in Cloud Run, Kubernetes, and CI/CD pipelines"
                className="w-full bg-[#2a2a2a] text-[#e2e2e2] px-3 py-2 rounded-lg border border-[#504254] focus:outline-none focus:border-[#ebb2ff] min-h-[80px]"
              />
            </div>
            <div className="flex gap-3 mt-2">
              <button
                type="button"
                onClick={() => setShowCustomForm(false)}
                className="flex-1 py-2 rounded-lg border border-[#504254] text-[#d4c0d7]"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 py-2 rounded-lg bg-[#ebb2ff] text-[#520072] font-bold neon-glow"
              >
                Start Conversation
              </button>
            </div>
          </form>
        ) : (
          <div className="flex flex-col h-full overflow-hidden">
            {/* Search */}
            <div className="p-3 border-b border-[#504254]">
              <input
                type="text"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                placeholder="Search contact or team member..."
                className="w-full bg-[#2a2a2a] text-[#e2e2e2] px-3 py-2 rounded-lg border-none focus:outline-none placeholder:text-[#d4c0d7] text-sm"
              />
            </div>

            {/* Create Custom Action Button */}
            <button
              onClick={() => setShowCustomForm(true)}
              className="p-4 border-b border-[#504254]/40 flex items-center gap-3 hover:bg-[#2a2a2a] text-[#ebb2ff] font-semibold text-sm transition-colors"
            >
              <div className="h-10 w-10 rounded-full bg-[#ebb2ff]/10 flex items-center justify-center text-[#ebb2ff] border border-[#ebb2ff]/30">
                <span className="material-symbols-outlined">person_add</span>
              </div>
              <span>+ Add Custom Contact or AI Assistant</span>
            </button>

            {/* Contact List */}
            <div className="overflow-y-auto flex-1 p-2 space-y-1">
              {filtered.map((contact) => (
                <div
                  key={contact.id}
                  onClick={() => {
                    onSelectContact(contact);
                    onClose();
                  }}
                  className="p-3 rounded-lg flex items-center gap-3 hover:bg-[#2a2a2a] cursor-pointer transition-colors"
                >
                  <img
                    src={contact.avatar}
                    alt={contact.name}
                    className="h-10 w-10 rounded-full object-cover border border-[#504254]"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-[#e2e2e2]">
                      {contact.name}
                    </h4>
                    <p className="text-xs text-[#d4c0d7] truncate">
                      {contact.bio || contact.phone}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
