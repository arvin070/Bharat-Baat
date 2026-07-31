export interface Attachment {
  name: string;
  size: string;
  type: 'image' | 'file' | 'audio';
  url?: string;
}

export interface Message {
  id: string;
  chatId: string;
  sender: 'user' | 'contact';
  text: string;
  timestamp: string;
  status?: 'sent' | 'delivered' | 'read';
  attachment?: Attachment;
  isAudioNote?: boolean;
}

export interface Contact {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'away';
  unreadCount?: number;
  lastSeen?: string;
  lastMessage?: string;
  lastMessageTime?: string;
  bio?: string;
  phone?: string;
  isGroup?: boolean;
  membersCount?: number;
}

export interface Story {
  id: string;
  contactId: string;
  contactName: string;
  avatar: string;
  timestamp: string;
  mediaUrl: string;
  caption?: string;
  viewed?: boolean;
}

export interface CallState {
  active: boolean;
  type?: 'video' | 'voice';
  contact?: Contact;
  isMuted?: boolean;
  isVideoOff?: boolean;
  isScreenSharing?: boolean;
  duration?: number;
}
