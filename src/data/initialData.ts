import { Contact, Message, Story } from '../types';

export const CURRENT_USER = {
  id: 'user_me',
  name: 'Karan Sharma',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAVdriuYoUG6WU2xGr86SWFxbgnzWYfyqP8aif-8U9RY5rOo_9ika3FFkCu5g_l3zHkxAaXGW0HM2tuf3D5iPwI6iyBR88HR5HNDkMwraJrYj-g7P2LdUYQHbL1lHcAGr2kQHs1531uYcVRsQii3-PZh7ztuAqTKhxyU8RTcPjeZStob3FWrY_oAtp4B1UE8Kl2efNk5cgH9wxdG1Cbn7Y-uTAMlG-unWECLniKx9Z7Cw2e3zm7BRCc',
  phone: '+91 98765 43210',
  bio: 'Building the future of digital communications on Bharat Baat ⚡',
};

export const INITIAL_CONTACTS: Contact[] = [
  {
    id: 'sarah_jenkins',
    name: 'Sarah Jenkins',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAosT30TUQAGWzW4QQeE3LdqkOUEIXj4wznSWscDpBn1iqQKdnuUbIlUqX042p55IwsJW63-qfmZZSpyltcA5lmtLg77Ev6UIeiZGhgwSRLDfcWYR29e0CDCLEIlhSqwS-akznVcNbDRwSJ5ULUCxLiDLYu8lYfeIz7pY3f3oSAwkj-uhF7dKPvPWetGk3fQ_Pg4evVgMnCOy-bnzCvRc8h3SJY8uG8eDgaLAmYeVzv4dlKHH_nxqsD',
    status: 'online',
    lastMessage: 'That design system update looks incredible! 🚀',
    lastMessageTime: 'Now',
    bio: 'Lead UI/UX Architect @ CyberStudio | 8px Grid Enthusiast',
    phone: '+1 (555) 019-2834',
  },
  {
    id: 'alex_chen',
    name: 'Alex Chen',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-VyUZTXikOC38cEBtuJCPdUfTbE1l3iPBhUffkRqzjbU3IoPyqSTKro9sBJ4rO3PZ_g2o3OWmd5PCGxoUHl5Q_PUCJiMzMq7SrNrYk4vbBd0QKtTy3DQifvkRJzw78jBRphmNh50D4pbmNeEPATQBqhcX2WcBpc-s44DtZGumM6NhAi_lYEFWmcNgMvCwp0DNjhVDlPsZsOB_j7RMtkN0EbwPT6UfWASdPTZNSIZgIM8FHHHmB_xS',
    status: 'online',
    lastMessage: 'Can you review the latest PR?',
    lastMessageTime: '2h',
    bio: 'Full-Stack Developer | TypeScript & Node.js',
    phone: '+1 (555) 014-9921',
  },
  {
    id: 'design_sync_group',
    name: 'Design Sync Group',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCe11TsHy5ZfiCvZrFtwmMk8G8uyidJKh0ellEPDHN7GFpxIM8OgaiMPatJBIqcwMvQVYtPFlQrgVskZlfAC2LFXBK_BfMRM9y4gVzS2ID4UEycWmZjPFWl6bfOioPYRDwSJuBUno63bTkEfpHx3TRtkZEnr9IbqNEKc41DvcEN-8tFDgXJsMgrIiqqQfEJhrj5U6RnfYxyTcxYLZvxQF_LIie9X0A2XjtBxeSe52z2Moa7ojz_AYLZ',
    status: 'online',
    unreadCount: 3,
    lastMessage: "Mike: Let's finalize the tokens tomorrow.",
    lastMessageTime: 'Yesterday',
    bio: 'Official Bharat Baat Design System Collaboration Group',
    isGroup: true,
    membersCount: 8,
  },
  {
    id: 'bharat_ai',
    name: 'Bharat AI Assistant',
    avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80',
    status: 'online',
    lastMessage: 'How can I assist your team with AI power today?',
    lastMessageTime: '1d',
    bio: 'Powered by Gemini 3.6 Flash | Cybernetic Intelligence Companion',
    phone: 'AI Service Bot',
  },
  {
    id: 'priya_sharma',
    name: 'Priya Sharma',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    status: 'away',
    lastMessage: 'The motion graphics render is ready!',
    lastMessageTime: '2d',
    bio: 'Motion Designer & 3D Artist',
    phone: '+91 91234 56789',
  }
];

export const INITIAL_MESSAGES: Record<string, Message[]> = {
  sarah_jenkins: [
    {
      id: 'm1',
      chatId: 'sarah_jenkins',
      sender: 'contact',
      text: 'Hey! Did you get a chance to look at the new typography scale for the dashboard?',
      timestamp: '10:42 AM',
      status: 'read',
    },
    {
      id: 'm2',
      chatId: 'sarah_jenkins',
      sender: 'user',
      text: 'Yes, I just reviewed it. The mathematical precision on the 8px grid is exactly what we needed.',
      timestamp: '10:45 AM',
      status: 'read',
    },
    {
      id: 'm3',
      chatId: 'sarah_jenkins',
      sender: 'user',
      text: 'I think we should increase the padding on the top app bar though, give it some more breathing room.',
      timestamp: '10:46 AM',
      status: 'read',
    },
    {
      id: 'm4',
      chatId: 'sarah_jenkins',
      sender: 'contact',
      text: "Agreed. I'll bump it to 64px on desktop. Also, here is a preview of the new active states we discussed.",
      timestamp: '10:50 AM',
      status: 'read',
      attachment: {
        name: 'active_states_v2.png',
        size: '2.4 MB',
        type: 'image',
        url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      },
    },
  ],
  alex_chen: [
    {
      id: 'ac1',
      chatId: 'alex_chen',
      sender: 'contact',
      text: 'Hey Karan, can you review the latest PR for the Express server integration?',
      timestamp: '8:15 AM',
      status: 'read',
    },
    {
      id: 'ac2',
      chatId: 'alex_chen',
      sender: 'user',
      text: 'Checking it out right now! Looks like all test cases are passing.',
      timestamp: '8:20 AM',
      status: 'read',
    },
  ],
  design_sync_group: [
    {
      id: 'ds1',
      chatId: 'design_sync_group',
      sender: 'contact',
      text: 'Mike: Let\'s finalize the tokens tomorrow.',
      timestamp: 'Yesterday',
      status: 'read',
    },
  ],
  bharat_ai: [
    {
      id: 'ai1',
      chatId: 'bharat_ai',
      sender: 'contact',
      text: 'Greetings Karan! I am Bharat AI, your cyber-noir intelligence assistant. Ask me anything about code, design systems, or strategy.',
      timestamp: 'Yesterday',
      status: 'read',
    },
  ],
};

export const INITIAL_STORIES: Story[] = [
  {
    id: 's1',
    contactId: 'sarah_jenkins',
    contactName: 'Sarah Jenkins',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAosT30TUQAGWzW4QQeE3LdqkOUEIXj4wznSWscDpBn1iqQKdnuUbIlUqX042p55IwsJW63-qfmZZSpyltcA5lmtLg77Ev6UIeiZGhgwSRLDfcWYR29e0CDCLEIlhSqwS-akznVcNbDRwSJ5ULUCxLiDLYu8lYfeIz7pY3f3oSAwkj-uhF7dKPvPWetGk3fQ_Pg4evVgMnCOy-bnzCvRc8h3SJY8uG8eDgaLAmYeVzv4dlKHH_nxqsD',
    timestamp: '2h ago',
    mediaUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    caption: 'New neon dark theme palette draft 🎨✨',
  },
  {
    id: 's2',
    contactId: 'alex_chen',
    contactName: 'Alex Chen',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-VyUZTXikOC38cEBtuJCPdUfTbE1l3iPBhUffkRqzjbU3IoPyqSTKro9sBJ4rO3PZ_g2o3OWmd5PCGxoUHl5Q_PUCJiMzMq7SrNrYk4vbBd0QKtTy3DQifvkRJzw78jBRphmNh50D4pbmNeEPATQBqhcX2WcBpc-s44DtZGumM6NhAi_lYEFWmcNgMvCwp0DNjhVDlPsZsOB_j7RMtkN0EbwPT6UfWASdPTZNSIZgIM8FHHHmB_xS',
    timestamp: '5h ago',
    mediaUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    caption: 'Late night coding session with Bharat Baat 💻',
  },
];
