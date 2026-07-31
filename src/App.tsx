import React, { useState, useEffect, useRef } from 'react';
import {
  CURRENT_USER,
  INITIAL_CONTACTS,
  INITIAL_MESSAGES,
  INITIAL_STORIES,
} from './data/initialData';
import { Contact, Message, Story, CallState, Attachment } from './types';
import { HeaderLeft } from './components/HeaderLeft';
import { SearchBar } from './components/SearchBar';
import { ChatListItem } from './components/ChatListItem';
import { ChatHeaderRight } from './components/ChatHeaderRight';
import { MessageBubble } from './components/MessageBubble';
import { ChatInput } from './components/ChatInput';
import { CallModal } from './components/CallModal';
import { StoriesModal } from './components/StoriesModal';
import { ContactInfoDrawer } from './components/ContactInfoDrawer';
import { NewChatModal } from './components/NewChatModal';

export default function App() {
  const [contacts, setContacts] = useState<Contact[]>(INITIAL_CONTACTS);
  const [messages, setMessages] = useState<Record<string, Message[]>>(INITIAL_MESSAGES);
  const [stories, setStories] = useState<Story[]>(INITIAL_STORIES);

  const [activeChatId, setActiveChatId] = useState<string>('sarah_jenkins');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSending, setIsSending] = useState<boolean>(false);

  // Modals & Panels state
  const [callState, setCallState] = useState<CallState>({ active: false });
  const [showStoriesModal, setShowStoriesModal] = useState<boolean>(false);
  const [showContactInfo, setShowContactInfo] = useState<boolean>(false);
  const [showNewChatModal, setShowNewChatModal] = useState<boolean>(false);
  const [previewAttachment, setPreviewAttachment] = useState<Attachment | null>(null);
  const [mobileView, setMobileView] = useState<'list' | 'chat'>('list');

  const chatEndRef = useRef<HTMLDivElement>(null);

  const activeContact =
    contacts.find((c) => c.id === activeChatId) || contacts[0];
  const activeMessages = messages[activeChatId] || [];

  // Filter contacts by search query
  const filteredContacts = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.lastMessage && c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Scroll to bottom when messages update
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeMessages]);

  // Handle selecting a chat
  const handleSelectChat = (contactId: string) => {
    setActiveChatId(contactId);
    setMobileView('chat');

    // Clear unread count for clicked contact
    setContacts((prev) =>
      prev.map((c) => (c.id === contactId ? { ...c, unreadCount: 0 } : c))
    );
  };

  // Handle sending a message
  const handleSendMessage = async (text: string, attachment?: Attachment) => {
    const timeStr = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    const userMsg: Message = {
      id: `msg_${Date.now()}`,
      chatId: activeChatId,
      sender: 'user',
      text,
      timestamp: timeStr,
      status: 'sent',
      attachment,
    };

    // Append user message
    setMessages((prev) => ({
      ...prev,
      [activeChatId]: [...(prev[activeChatId] || []), userMsg],
    }));

    // Update last message in contacts list
    setContacts((prev) =>
      prev.map((c) =>
        c.id === activeChatId
          ? {
              ...c,
              lastMessage: text,
              lastMessageTime: 'Now',
            }
          : c
      )
    );

    setIsSending(true);

    // Call server-side Gemini API for response
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          persona: activeContact.name,
          history: (messages[activeChatId] || []).map((m) => ({
            sender: m.sender,
            text: m.text,
          })),
        }),
      });

      const data = await response.json();
      const replyText = data.text || "That sounds great! Let's follow up on this soon.";

      // Add delay for natural typing feeling
      setTimeout(() => {
        const replyMsg: Message = {
          id: `reply_${Date.now()}`,
          chatId: activeChatId,
          sender: 'contact',
          text: replyText,
          timestamp: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
          status: 'read',
        };

        setMessages((prev) => ({
          ...prev,
          [activeChatId]: [...(prev[activeChatId] || []), replyMsg],
        }));

        setContacts((prev) =>
          prev.map((c) =>
            c.id === activeChatId
              ? {
                  ...c,
                  lastMessage: replyText,
                  lastMessageTime: 'Now',
                }
              : c
          )
        );

        setIsSending(false);
      }, 1000);
    } catch (err) {
      console.error('Chat error:', err);
      setIsSending(false);
    }
  };

  // Text-To-Speech audio reader
  const handlePlaySpeech = async (text: string) => {
    try {
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      if (data.audio) {
        const audio = new Audio(`data:audio/wav;base64,${data.audio}`);
        audio.play();
        return;
      }
    } catch (err) {
      console.log('Server TTS fallback to SpeechSynthesis API:', err);
    }

    // Fallback to browser SpeechSynthesis API
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  };

  // Handle adding a status story
  const handleAddStory = (mediaUrl: string, caption: string) => {
    const newStory: Story = {
      id: `story_${Date.now()}`,
      contactId: CURRENT_USER.id,
      contactName: CURRENT_USER.name,
      avatar: CURRENT_USER.avatar,
      timestamp: 'Just now',
      mediaUrl,
      caption,
    };
    setStories([newStory, ...stories]);
  };

  // Handle creating a new contact or AI bot
  const handleCreateCustomContact = (name: string, bio: string) => {
    const newId = `contact_${Date.now()}`;
    const newContact: Contact = {
      id: newId,
      name,
      avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80`,
      status: 'online',
      bio: bio || 'Cyber-noir teammate',
      lastMessage: 'Welcome to Bharat Baat!',
      lastMessageTime: 'Now',
    };
    setContacts([newContact, ...contacts]);
    setActiveChatId(newId);
    setMessages({
      ...messages,
      [newId]: [
        {
          id: `m_welcome_${Date.now()}`,
          chatId: newId,
          sender: 'contact',
          text: `Hello Karan! I am ${name}. ${bio ? `(${bio})` : ''} How can we collaborate today?`,
          timestamp: 'Now',
          status: 'read',
        },
      ],
    });
  };

  return (
    <div className="h-screen w-full flex bg-[#131313] text-[#e2e2e2] font-['Plus_Jakarta_Sans',sans-serif] overflow-hidden select-none">
      {/* Left Navigation Pane (Chat Sidebar) */}
      <div
        className={`w-full md:w-[350px] lg:w-[400px] border-r border-[#504254] bg-[#1b1b1b] flex flex-col h-full shrink-0 ${
          mobileView === 'chat' ? 'hidden md:flex' : 'flex'
        }`}
      >
        <HeaderLeft
          userAvatar={CURRENT_USER.avatar}
          userName={CURRENT_USER.name}
          onOpenStories={() => setShowStoriesModal(true)}
          onOpenNewChat={() => setShowNewChatModal(true)}
          onOpenProfile={() => setShowContactInfo(true)}
          onOpenSettings={() => setShowNewChatModal(true)}
        />

        <SearchBar
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Contact Conversation List */}
        <div className="flex-1 overflow-y-auto bg-[#131313]">
          {filteredContacts.length > 0 ? (
            filteredContacts.map((contact) => (
              <ChatListItem
                key={contact.id}
                contact={contact}
                isActive={contact.id === activeChatId}
                onClick={() => handleSelectChat(contact.id)}
              />
            ))
          ) : (
            <div className="p-8 text-center text-[#d4c0d7] text-sm">
              No chats found. Click <span className="text-[#ebb2ff] font-bold">+</span> to start a new conversation!
            </div>
          )}
        </div>
      </div>

      {/* Right Active Chat Pane */}
      <div
        className={`flex-1 bg-[#131313] flex flex-col h-full relative ${
          mobileView === 'list' ? 'hidden md:flex' : 'flex'
        }`}
      >
        {activeContact ? (
          <>
            <ChatHeaderRight
              contact={activeContact}
              onStartVideoCall={() =>
                setCallState({ active: true, type: 'video', contact: activeContact })
              }
              onStartVoiceCall={() =>
                setCallState({ active: true, type: 'voice', contact: activeContact })
              }
              onSearchInChat={() => {}}
              onToggleContactInfo={() => setShowContactInfo(!showContactInfo)}
              onBackToMobileList={() => setMobileView('list')}
            />

            {/* Main Chat Canvas with Dark Cyber Grid */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-6 flex flex-col bg-[#0a0a0a] relative">
              {/* Date Separator */}
              <div className="flex justify-center my-2">
                <span className="bg-[#353535] text-[#d4c0d7] text-[10px] uppercase font-bold tracking-wider px-4 py-1.5 rounded-lg border border-[#504254]/40">
                  Today
                </span>
              </div>

              {/* Messages Render */}
              {activeMessages.map((msg) => (
                <MessageBubble
                  key={msg.id}
                  message={msg}
                  onPreviewAttachment={(attachment) =>
                    setPreviewAttachment(attachment)
                  }
                  onPlaySpeech={handlePlaySpeech}
                />
              ))}

              {isSending && (
                <div className="self-start bg-[#2a2a2a] text-[#ebb2ff] px-4 py-2 rounded-lg text-xs font-semibold animate-pulse border border-[#ebb2ff]/30 flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm animate-spin">
                    sync
                  </span>
                  <span>{activeContact.name} is typing...</span>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Input Footer */}
            <ChatInput onSendMessage={handleSendMessage} isSending={isSending} />
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center text-[#d4c0d7]">
            <span className="material-symbols-outlined text-6xl text-[#ebb2ff] mb-4">
              chat_bubble
            </span>
            <h2 className="text-xl font-bold text-[#e2e2e2]">
              Welcome to Bharat Baat
            </h2>
            <p className="text-sm mt-2 max-w-sm">
              Select a conversation from the left pane or start a new encrypted AI session.
            </p>
          </div>
        )}
      </div>

      {/* Right Drawer Contact Details */}
      {showContactInfo && activeContact && (
        <ContactInfoDrawer
          contact={activeContact}
          messages={activeMessages}
          onClose={() => setShowContactInfo(false)}
          onStartCall={(type) =>
            setCallState({ active: true, type, contact: activeContact })
          }
        />
      )}

      {/* Audio / Video Call Overlay */}
      {callState.active && callState.contact && (
        <CallModal
          contact={callState.contact}
          type={callState.type || 'video'}
          onEndCall={() => setCallState({ active: false })}
        />
      )}

      {/* Status / Stories Modal */}
      {showStoriesModal && (
        <StoriesModal
          stories={stories}
          onClose={() => setShowStoriesModal(false)}
          onAddStory={handleAddStory}
        />
      )}

      {/* New Chat Modal */}
      {showNewChatModal && (
        <NewChatModal
          contacts={contacts}
          onSelectContact={(c) => handleSelectChat(c.id)}
          onCreateCustomContact={handleCreateCustomContact}
          onClose={() => setShowNewChatModal(false)}
        />
      )}

      {/* Image / Attachment Preview Dialog */}
      {previewAttachment && (
        <div
          onClick={() => setPreviewAttachment(null)}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-md cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-3xl w-full bg-[#1b1b1b] border border-[#504254] rounded-2xl p-4 flex flex-col items-center shadow-2xl"
          >
            <button
              onClick={() => setPreviewAttachment(null)}
              className="absolute top-4 right-4 text-[#d4c0d7] hover:text-[#ebb2ff] bg-[#2a2a2a] p-2 rounded-full"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <h3 className="text-lg font-bold text-[#e2e2e2] mb-3">
              {previewAttachment.name}
            </h3>
            {previewAttachment.url ? (
              <img
                src={previewAttachment.url}
                alt={previewAttachment.name}
                className="max-h-[70vh] w-auto object-contain rounded-lg border border-[#504254]"
              />
            ) : (
              <div className="p-12 text-center text-[#d4c0d7]">
                <span className="material-symbols-outlined text-5xl text-[#ebb2ff] mb-2">
                  description
                </span>
                <p>Document preview for {previewAttachment.name}</p>
              </div>
            )}
            <p className="text-xs text-[#d4c0d7] mt-3">
              Size: {previewAttachment.size}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
