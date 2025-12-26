export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderType: 'student' | 'doctor';
  senderName: string;
  text: string;
  createdAt: string;
  isRead: boolean;
}

export interface Conversation {
  id: string;
  studentId: string;
  studentName: string;
  studentAcademicNumber: string;
  doctorId: string;
  doctorName: string;
  doctorEmail: string;
  lastMessage: string;
  lastMessageDate: string;
  unreadCount: number;
}

// Mock conversations data
let mockConversations: Conversation[] = [
  {
    id: 'conv-1',
    studentId: 'student-1',
    studentName: 'أحمد محمد علي',
    studentAcademicNumber: '202312345',
    doctorId: '1',
    doctorName: 'د. أحمد محمد الحسني',
    doctorEmail: 'ahmed.hosni@ngu.edu.ye',
    lastMessage: 'شكراً دكتور على التوضيح',
    lastMessageDate: '2025-12-14T10:30:00',
    unreadCount: 0
  },
  {
    id: 'conv-2',
    studentId: 'student-1',
    studentName: 'أحمد محمد علي',
    studentAcademicNumber: '202312345',
    doctorId: '2',
    doctorName: 'د. سارة أحمد العمري',
    doctorEmail: 'sara.amri@ngu.edu.ye',
    lastMessage: 'متى موعد تسليم المشروع؟',
    lastMessageDate: '2025-12-13T15:45:00',
    unreadCount: 1
  }
];

// Mock messages data
let mockMessages: Message[] = [
  {
    id: 'msg-1',
    conversationId: 'conv-1',
    senderId: 'student-1',
    senderType: 'student',
    senderName: 'أحمد محمد علي',
    text: 'السلام عليكم دكتور، عندي استفسار عن المحاضرة الأخيرة',
    createdAt: '2025-12-14T09:00:00',
    isRead: true
  },
  {
    id: 'msg-2',
    conversationId: 'conv-1',
    senderId: '1',
    senderType: 'doctor',
    senderName: 'د. أحمد محمد الحسني',
    text: 'وعليكم السلام، تفضل بسؤالك',
    createdAt: '2025-12-14T09:15:00',
    isRead: true
  },
  {
    id: 'msg-3',
    conversationId: 'conv-1',
    senderId: 'student-1',
    senderType: 'student',
    senderName: 'أحمد محمد علي',
    text: 'هل يمكن توضيح موضوع الـ Recursion أكثر؟',
    createdAt: '2025-12-14T09:20:00',
    isRead: true
  },
  {
    id: 'msg-4',
    conversationId: 'conv-1',
    senderId: '1',
    senderType: 'doctor',
    senderName: 'د. أحمد محمد الحسني',
    text: 'بالتأكيد، الـ Recursion هو استدعاء الدالة لنفسها. سأشرحه بالتفصيل في المحاضرة القادمة',
    createdAt: '2025-12-14T10:00:00',
    isRead: true
  },
  {
    id: 'msg-5',
    conversationId: 'conv-1',
    senderId: 'student-1',
    senderType: 'student',
    senderName: 'أحمد محمد علي',
    text: 'شكراً دكتور على التوضيح',
    createdAt: '2025-12-14T10:30:00',
    isRead: true
  },
  {
    id: 'msg-6',
    conversationId: 'conv-2',
    senderId: 'student-1',
    senderType: 'student',
    senderName: 'أحمد محمد علي',
    text: 'متى موعد تسليم المشروع؟',
    createdAt: '2025-12-13T15:45:00',
    isRead: false
  }
];

// Doctor notifications for new messages
let doctorMessageNotifications: {doctorId: string; count: number}[] = [
  { doctorId: '2', count: 1 }
];

export const messagesService = {
  // Get all conversations for a student
  getStudentConversations: (): Promise<Conversation[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockConversations.filter(c => c.studentId === 'student-1'));
      }, 200);
    });
  },

  // Get all conversations for a doctor
  getDoctorConversations: (doctorId: string): Promise<Conversation[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockConversations.filter(c => c.doctorId === doctorId));
      }, 200);
    });
  },

  // Get messages for a conversation
  getConversationMessages: (conversationId: string): Promise<Message[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockMessages.filter(m => m.conversationId === conversationId));
      }, 200);
    });
  },

  // Send a message
  sendMessage: (conversationId: string, text: string, senderType: 'student' | 'doctor', senderName: string): Promise<Message> => {
    return new Promise((resolve) => {
      const newMessage: Message = {
        id: `msg-${Date.now()}`,
        conversationId,
        senderId: senderType === 'student' ? 'student-1' : 'doctor-1',
        senderType,
        senderName,
        text,
        createdAt: new Date().toISOString(),
        isRead: false
      };
      mockMessages.push(newMessage);
      
      // Update conversation last message
      const convIndex = mockConversations.findIndex(c => c.id === conversationId);
      if (convIndex !== -1) {
        mockConversations[convIndex].lastMessage = text;
        mockConversations[convIndex].lastMessageDate = newMessage.createdAt;
        
        // If student sends, increase doctor notification
        if (senderType === 'student') {
          const doctorId = mockConversations[convIndex].doctorId;
          const notifIndex = doctorMessageNotifications.findIndex(n => n.doctorId === doctorId);
          if (notifIndex !== -1) {
            doctorMessageNotifications[notifIndex].count++;
          } else {
            doctorMessageNotifications.push({ doctorId, count: 1 });
          }
        }
      }
      
      setTimeout(() => resolve(newMessage), 100);
    });
  },

  // Create or get conversation
  getOrCreateConversation: (doctorId: string, doctorName: string, doctorEmail: string): Promise<Conversation> => {
    return new Promise((resolve) => {
      let conversation = mockConversations.find(c => c.studentId === 'student-1' && c.doctorId === doctorId);
      
      if (!conversation) {
        conversation = {
          id: `conv-${Date.now()}`,
          studentId: 'student-1',
          studentName: 'أحمد محمد علي',
          studentAcademicNumber: '202312345',
          doctorId,
          doctorName,
          doctorEmail,
          lastMessage: '',
          lastMessageDate: new Date().toISOString(),
          unreadCount: 0
        };
        mockConversations.push(conversation);
      }
      
      setTimeout(() => resolve(conversation!), 100);
    });
  },

  // Get unread message count for doctor
  getDoctorUnreadCount: (doctorId: string): Promise<number> => {
    return new Promise((resolve) => {
      const notif = doctorMessageNotifications.find(n => n.doctorId === doctorId);
      setTimeout(() => resolve(notif?.count || 0), 100);
    });
  },

  // Mark messages as read
  markConversationAsRead: (conversationId: string, userType: 'student' | 'doctor'): Promise<void> => {
    return new Promise((resolve) => {
      mockMessages = mockMessages.map(m => {
        if (m.conversationId === conversationId && m.senderType !== userType) {
          return { ...m, isRead: true };
        }
        return m;
      });
      
      // Update conversation unread count
      const convIndex = mockConversations.findIndex(c => c.id === conversationId);
      if (convIndex !== -1) {
        mockConversations[convIndex].unreadCount = 0;
        
        // Clear doctor notifications if doctor is reading
        if (userType === 'doctor') {
          const doctorId = mockConversations[convIndex].doctorId;
          doctorMessageNotifications = doctorMessageNotifications.filter(n => n.doctorId !== doctorId);
        }
      }
      
      setTimeout(() => resolve(), 100);
    });
  }
};
