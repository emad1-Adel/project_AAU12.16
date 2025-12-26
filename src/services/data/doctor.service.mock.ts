import { DoctorProfile, TeachingCourse, DoctorStudent, DoctorScheduleItem, DoctorFinance, PaymentRecord, DoctorNotification, DoctorMessage, CourseMaterial } from '@/types';

const mockDoctorProfile: DoctorProfile = {
  id: '1',
  nameAr: 'د. أحمد محمود الحسن',
  nameEn: 'Dr. Ahmed Mahmoud Alhasan',
  degreeAr: 'أستاذ دكتور',
  degreeEn: 'Professor',
  specializationAr: 'هندسة البرمجيات',
  specializationEn: 'Software Engineering',
  collegeAr: 'كلية الهندسة وتقنية المعلومات',
  collegeEn: 'College of Engineering & IT',
  departmentAr: 'قسم علوم الحاسوب',
  departmentEn: 'Computer Science Department',
  email: 'ahmed.alhasan@ngu.edu.ye',
  phone: '+967 777 123 456',
  officeHoursAr: 'الأحد والثلاثاء 10:00 - 12:00',
  officeHoursEn: 'Sunday & Tuesday 10:00 AM - 12:00 PM',
  bioAr: 'أستاذ متخصص في هندسة البرمجيات مع خبرة تزيد عن 15 عاماً في التدريس والبحث العلمي. حاصل على الدكتوراه من جامعة القاهرة.',
  bioEn: 'Professor specializing in Software Engineering with over 15 years of experience in teaching and research. PhD from Cairo University.',
  image: '/placeholder.svg'
};

const mockCourses: TeachingCourse[] = [
  {
    id: '1',
    code: 'CS301',
    nameAr: 'هندسة البرمجيات',
    nameEn: 'Software Engineering',
    creditHours: 3,
    semester: '2024-1',
    studentsCount: 45,
    scheduleAr: 'الأحد والثلاثاء 8:00 - 9:30',
    scheduleEn: 'Sun & Tue 8:00 - 9:30 AM',
    classroom: 'A-201'
  },
  {
    id: '2',
    code: 'CS405',
    nameAr: 'تصميم قواعد البيانات المتقدم',
    nameEn: 'Advanced Database Design',
    creditHours: 3,
    semester: '2024-1',
    studentsCount: 38,
    scheduleAr: 'الإثنين والأربعاء 10:00 - 11:30',
    scheduleEn: 'Mon & Wed 10:00 - 11:30 AM',
    classroom: 'B-105'
  },
  {
    id: '3',
    code: 'CS201',
    nameAr: 'البرمجة الكائنية',
    nameEn: 'Object Oriented Programming',
    creditHours: 4,
    semester: '2024-1',
    studentsCount: 52,
    scheduleAr: 'السبت والخميس 12:00 - 2:00',
    scheduleEn: 'Sat & Thu 12:00 - 2:00 PM',
    classroom: 'C-302'
  },
  {
    id: '4',
    code: 'CS510',
    nameAr: 'ذكاء اصطناعي',
    nameEn: 'Artificial Intelligence',
    creditHours: 3,
    semester: '2024-1',
    studentsCount: 28,
    scheduleAr: 'الأحد 2:00 - 5:00',
    scheduleEn: 'Sun 2:00 - 5:00 PM',
    classroom: 'Lab-01'
  }
];

const mockStudents: DoctorStudent[] = [
  { id: '1', nameAr: 'محمد علي أحمد', nameEn: 'Mohammed Ali Ahmed', academicNumber: '202101234', courseId: '1', courseCode: 'CS301', attendance: 95, midterm: 28, final: 45, total: 88 },
  { id: '2', nameAr: 'سارة محمود عبدالله', nameEn: 'Sara Mahmoud Abdullah', academicNumber: '202101235', courseId: '1', courseCode: 'CS301', attendance: 88, midterm: 25, final: 42, total: 82 },
  { id: '3', nameAr: 'أحمد يوسف حسن', nameEn: 'Ahmed Yousef Hassan', academicNumber: '202101236', courseId: '1', courseCode: 'CS301', attendance: 92, midterm: 30, final: 48, total: 93 },
  { id: '4', nameAr: 'فاطمة عمر سالم', nameEn: 'Fatima Omar Salem', academicNumber: '202101237', courseId: '2', courseCode: 'CS405', attendance: 90, midterm: 27, final: 44, total: 86 },
  { id: '5', nameAr: 'خالد حسين محمد', nameEn: 'Khaled Hussein Mohammed', academicNumber: '202101238', courseId: '2', courseCode: 'CS405', attendance: 85, midterm: 22, final: 38, total: 75 },
  { id: '6', nameAr: 'نورة سعيد العمري', nameEn: 'Noura Saeed Alomari', academicNumber: '202101239', courseId: '3', courseCode: 'CS201', attendance: 98, midterm: 29, final: 47, total: 91 },
  { id: '7', nameAr: 'عبدالرحمن فهد الشريف', nameEn: 'Abdulrahman Fahad Alsharif', academicNumber: '202101240', courseId: '3', courseCode: 'CS201', attendance: 78, midterm: 20, final: 35, total: 70 },
  { id: '8', nameAr: 'ريم عادل القحطاني', nameEn: 'Reem Adel Alqahtani', academicNumber: '202101241', courseId: '4', courseCode: 'CS510', attendance: 100, midterm: 30, final: 50, total: 95 },
  { id: '9', nameAr: 'ياسر محمد الدوسري', nameEn: 'Yasser Mohammed Aldossari', academicNumber: '202101242', courseId: '1', courseCode: 'CS301', attendance: 82, midterm: 24, final: 40, total: 79 },
  { id: '10', nameAr: 'هند سلطان المطيري', nameEn: 'Hind Sultan Almutairi', academicNumber: '202101243', courseId: '2', courseCode: 'CS405', attendance: 94, midterm: 28, final: 46, total: 89 },
  { id: '11', nameAr: 'عمر حمد الغامدي', nameEn: 'Omar Hamad Alghamdi', academicNumber: '202101244', courseId: '3', courseCode: 'CS201', attendance: 87, midterm: 26, final: 43, total: 84 },
  { id: '12', nameAr: 'لمى ناصر الحربي', nameEn: 'Lama Nasser Alharbi', academicNumber: '202101245', courseId: '4', courseCode: 'CS510', attendance: 96, midterm: 29, final: 49, total: 93 },
];

const mockSchedule: DoctorScheduleItem[] = [
  { id: '1', dayAr: 'السبت', dayEn: 'Saturday', time: '12:00 - 14:00', courseCode: 'CS201', courseNameAr: 'البرمجة الكائنية', courseNameEn: 'OOP', classroom: 'C-302', type: 'lecture' },
  { id: '2', dayAr: 'الأحد', dayEn: 'Sunday', time: '08:00 - 09:30', courseCode: 'CS301', courseNameAr: 'هندسة البرمجيات', courseNameEn: 'Software Eng.', classroom: 'A-201', type: 'lecture' },
  { id: '3', dayAr: 'الأحد', dayEn: 'Sunday', time: '10:00 - 12:00', courseCode: '', courseNameAr: 'ساعات مكتبية', courseNameEn: 'Office Hours', classroom: 'مكتب 215', type: 'office' },
  { id: '4', dayAr: 'الأحد', dayEn: 'Sunday', time: '14:00 - 17:00', courseCode: 'CS510', courseNameAr: 'ذكاء اصطناعي', courseNameEn: 'AI', classroom: 'Lab-01', type: 'lab' },
  { id: '5', dayAr: 'الإثنين', dayEn: 'Monday', time: '10:00 - 11:30', courseCode: 'CS405', courseNameAr: 'قواعد البيانات المتقدم', courseNameEn: 'Adv. DB', classroom: 'B-105', type: 'lecture' },
  { id: '6', dayAr: 'الثلاثاء', dayEn: 'Tuesday', time: '08:00 - 09:30', courseCode: 'CS301', courseNameAr: 'هندسة البرمجيات', courseNameEn: 'Software Eng.', classroom: 'A-201', type: 'lecture' },
  { id: '7', dayAr: 'الثلاثاء', dayEn: 'Tuesday', time: '10:00 - 12:00', courseCode: '', courseNameAr: 'ساعات مكتبية', courseNameEn: 'Office Hours', classroom: 'مكتب 215', type: 'office' },
  { id: '8', dayAr: 'الأربعاء', dayEn: 'Wednesday', time: '10:00 - 11:30', courseCode: 'CS405', courseNameAr: 'قواعد البيانات المتقدم', courseNameEn: 'Adv. DB', classroom: 'B-105', type: 'lecture' },
  { id: '9', dayAr: 'الخميس', dayEn: 'Thursday', time: '12:00 - 14:00', courseCode: 'CS201', courseNameAr: 'البرمجة الكائنية', courseNameEn: 'OOP', classroom: 'C-302', type: 'lecture' },
];

const mockPaymentHistory: PaymentRecord[] = [
  { id: '1', monthAr: 'نوفمبر 2024', monthEn: 'November 2024', baseSalary: 350000, allowances: 120000, deductions: 45000, netSalary: 425000, status: 'paid', paidDate: '2024-11-28' },
  { id: '2', monthAr: 'أكتوبر 2024', monthEn: 'October 2024', baseSalary: 350000, allowances: 120000, deductions: 45000, netSalary: 425000, status: 'paid', paidDate: '2024-10-28' },
  { id: '3', monthAr: 'سبتمبر 2024', monthEn: 'September 2024', baseSalary: 350000, allowances: 120000, deductions: 45000, netSalary: 425000, status: 'paid', paidDate: '2024-09-28' },
  { id: '4', monthAr: 'أغسطس 2024', monthEn: 'August 2024', baseSalary: 350000, allowances: 100000, deductions: 42000, netSalary: 408000, status: 'paid', paidDate: '2024-08-28' },
  { id: '5', monthAr: 'يوليو 2024', monthEn: 'July 2024', baseSalary: 350000, allowances: 100000, deductions: 42000, netSalary: 408000, status: 'paid', paidDate: '2024-07-28' },
  { id: '6', monthAr: 'يونيو 2024', monthEn: 'June 2024', baseSalary: 350000, allowances: 100000, deductions: 42000, netSalary: 408000, status: 'paid', paidDate: '2024-06-28' },
];

const mockFinance: DoctorFinance = {
  baseSalary: 350000,
  allowances: {
    housingAr: 'بدل سكن',
    housingEn: 'Housing',
    housingAmount: 60000,
    transportAr: 'بدل مواصلات',
    transportEn: 'Transport',
    transportAmount: 30000,
    otherAr: 'بدلات أخرى',
    otherEn: 'Other',
    otherAmount: 30000,
    total: 120000
  },
  deductions: {
    taxAr: 'ضريبة',
    taxEn: 'Tax',
    taxAmount: 25000,
    insuranceAr: 'تأمين',
    insuranceEn: 'Insurance',
    insuranceAmount: 15000,
    otherAr: 'خصومات أخرى',
    otherEn: 'Other',
    otherAmount: 5000,
    total: 45000
  },
  netSalary: 425000,
  paymentHistory: mockPaymentHistory
};

// Service functions
export const getDoctorProfile = (): Promise<DoctorProfile> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockDoctorProfile), 300);
  });
};

export const getTeachingCourses = (): Promise<TeachingCourse[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockCourses), 300);
  });
};

export const getDoctorStudents = (courseId?: string): Promise<DoctorStudent[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (courseId) {
        resolve(mockStudents.filter(s => s.courseId === courseId));
      } else {
        resolve(mockStudents);
      }
    }, 300);
  });
};

export const getDoctorSchedule = (): Promise<DoctorScheduleItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockSchedule), 300);
  });
};

export const getDoctorFinance = (): Promise<DoctorFinance> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockFinance), 300);
  });
};

export const updateStudentGrades = (studentId: string, grades: { midterm?: number; final?: number }): Promise<DoctorStudent> => {
  return new Promise((resolve) => {
    const student = mockStudents.find(s => s.id === studentId);
    if (student) {
      if (grades.midterm !== undefined) student.midterm = grades.midterm;
      if (grades.final !== undefined) student.final = grades.final;
      student.total = (student.midterm || 0) + (student.final || 0) + Math.floor((student.attendance || 0) * 0.15);
    }
    setTimeout(() => resolve(student!), 200);
  });
};

// Notifications Mock Data
const mockNotifications: DoctorNotification[] = [
  {
    id: '1',
    titleAr: 'اجتماع مجلس الكلية',
    titleEn: 'College Council Meeting',
    messageAr: 'تم تحديد موعد اجتماع مجلس الكلية يوم الأحد القادم الساعة 10 صباحاً في قاعة الاجتماعات الرئيسية.',
    messageEn: 'College council meeting scheduled for next Sunday at 10 AM in the main conference room.',
    type: 'announcement',
    senderAr: 'عمادة الكلية',
    senderEn: 'College Dean Office',
    senderType: 'admin',
    date: '2024-12-01',
    isRead: false
  },
  {
    id: '2',
    titleAr: 'تذكير: موعد تسليم الدرجات',
    titleEn: 'Reminder: Grades Submission Deadline',
    messageAr: 'نذكركم بضرورة تسليم درجات الفصل الدراسي قبل نهاية الأسبوع الحالي.',
    messageEn: 'Reminder to submit semester grades before the end of this week.',
    type: 'reminder',
    senderAr: 'شؤون الطلاب',
    senderEn: 'Student Affairs',
    senderType: 'admin',
    date: '2024-11-28',
    isRead: true
  },
  {
    id: '3',
    titleAr: 'تحديث النظام الأكاديمي',
    titleEn: 'Academic System Update',
    messageAr: 'سيتم تحديث النظام الأكاديمي يوم الجمعة من الساعة 12 ظهراً حتى 6 مساءً.',
    messageEn: 'Academic system will be updated on Friday from 12 PM to 6 PM.',
    type: 'system',
    senderAr: 'الدعم التقني',
    senderEn: 'Technical Support',
    senderType: 'system',
    date: '2024-11-25',
    isRead: true
  },
  {
    id: '4',
    titleAr: 'ورشة عمل التعليم الإلكتروني',
    titleEn: 'E-Learning Workshop',
    messageAr: 'ندعوكم لحضور ورشة عمل حول أدوات التعليم الإلكتروني الحديثة يوم الثلاثاء.',
    messageEn: 'You are invited to attend a workshop on modern e-learning tools on Tuesday.',
    type: 'announcement',
    senderAr: 'مركز التطوير الأكاديمي',
    senderEn: 'Academic Development Center',
    senderType: 'admin',
    date: '2024-11-20',
    isRead: true
  }
];

const mockMessages: DoctorMessage[] = [
  {
    id: '1',
    studentId: '1',
    studentNameAr: 'محمد علي أحمد',
    studentNameEn: 'Mohammed Ali Ahmed',
    studentAcademicNumber: '202101234',
    subjectAr: 'استفسار عن موعد الاختبار',
    subjectEn: 'Inquiry about exam date',
    messageAr: 'السلام عليكم دكتور، أود الاستفسار عن موعد الاختبار النصفي لمقرر هندسة البرمجيات. شكراً لكم.',
    messageEn: 'Hello Dr., I would like to inquire about the midterm exam date for Software Engineering course. Thank you.',
    date: '2024-12-02',
    isRead: false,
    courseCode: 'CS301'
  },
  {
    id: '2',
    studentId: '3',
    studentNameAr: 'أحمد يوسف حسن',
    studentNameEn: 'Ahmed Yousef Hassan',
    studentAcademicNumber: '202101236',
    subjectAr: 'طلب موعد لساعات مكتبية',
    subjectEn: 'Office hours appointment request',
    messageAr: 'دكتور، هل يمكنني حجز موعد خلال ساعات المكتب لمناقشة مشروع التخرج؟',
    messageEn: 'Doctor, can I book an appointment during office hours to discuss the graduation project?',
    date: '2024-12-01',
    isRead: false,
    courseCode: 'CS301'
  },
  {
    id: '3',
    studentId: '6',
    studentNameAr: 'نورة سعيد العمري',
    studentNameEn: 'Noura Saeed Alomari',
    studentAcademicNumber: '202101239',
    subjectAr: 'شكر وتقدير',
    subjectEn: 'Thanks and appreciation',
    messageAr: 'شكراً جزيلاً دكتور على الشرح الممتاز في المحاضرة الأخيرة. استفدت كثيراً.',
    messageEn: 'Thank you very much for the excellent explanation in the last lecture. I learned a lot.',
    date: '2024-11-30',
    isRead: true,
    courseCode: 'CS201'
  },
  {
    id: '4',
    studentId: '8',
    studentNameAr: 'ريم عادل القحطاني',
    studentNameEn: 'Reem Adel Alqahtani',
    studentAcademicNumber: '202101241',
    subjectAr: 'استفسار عن الواجب',
    subjectEn: 'Assignment inquiry',
    messageAr: 'دكتور، هل يمكن تمديد موعد تسليم الواجب؟ واجهت مشكلة تقنية.',
    messageEn: 'Doctor, can the assignment deadline be extended? I faced a technical issue.',
    date: '2024-11-28',
    isRead: true,
    courseCode: 'CS510'
  }
];

const mockCourseMaterials: CourseMaterial[] = [
  {
    id: '1',
    courseId: '1',
    titleAr: 'المحاضرة 1 - مقدمة في هندسة البرمجيات',
    titleEn: 'Lecture 1 - Introduction to Software Engineering',
    descriptionAr: 'مقدمة شاملة عن هندسة البرمجيات ومراحل تطوير البرمجيات',
    descriptionEn: 'Comprehensive introduction to software engineering and software development phases',
    type: 'lecture',
    fileName: 'SE_Lecture_01.pdf',
    fileSize: '2.5 MB',
    uploadDate: '2024-09-01',
    downloadCount: 42
  },
  {
    id: '2',
    courseId: '1',
    titleAr: 'المحاضرة 2 - دورة حياة البرمجيات',
    titleEn: 'Lecture 2 - Software Development Life Cycle',
    type: 'lecture',
    fileName: 'SE_Lecture_02.pdf',
    fileSize: '3.1 MB',
    uploadDate: '2024-09-08',
    downloadCount: 38
  },
  {
    id: '3',
    courseId: '1',
    titleAr: 'الواجب الأول',
    titleEn: 'Assignment 1',
    descriptionAr: 'واجب حول تحليل متطلبات النظام',
    descriptionEn: 'Assignment on system requirements analysis',
    type: 'assignment',
    fileName: 'SE_Assignment_01.pdf',
    fileSize: '500 KB',
    uploadDate: '2024-09-15',
    downloadCount: 45
  },
  {
    id: '4',
    courseId: '2',
    titleAr: 'المحاضرة 1 - قواعد البيانات المتقدمة',
    titleEn: 'Lecture 1 - Advanced Databases',
    type: 'lecture',
    fileName: 'DB_Lecture_01.pdf',
    fileSize: '2.8 MB',
    uploadDate: '2024-09-01',
    downloadCount: 35
  },
  {
    id: '5',
    courseId: '3',
    titleAr: 'فيديو - مفاهيم OOP',
    titleEn: 'Video - OOP Concepts',
    type: 'video',
    fileName: 'OOP_Concepts.mp4',
    fileSize: '150 MB',
    uploadDate: '2024-09-05',
    downloadCount: 50
  }
];

// Service functions for notifications and messages
export const getDoctorNotifications = (): Promise<DoctorNotification[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockNotifications), 300);
  });
};

export const getDoctorMessages = (): Promise<DoctorMessage[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockMessages), 300);
  });
};

export const markNotificationAsRead = (id: string): Promise<void> => {
  return new Promise((resolve) => {
    const notification = mockNotifications.find(n => n.id === id);
    if (notification) notification.isRead = true;
    setTimeout(resolve, 100);
  });
};

export const markMessageAsRead = (id: string): Promise<void> => {
  return new Promise((resolve) => {
    const message = mockMessages.find(m => m.id === id);
    if (message) message.isRead = true;
    setTimeout(resolve, 100);
  });
};

export const getCourseMaterials = (courseId?: string): Promise<CourseMaterial[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (courseId) {
        resolve(mockCourseMaterials.filter(m => m.courseId === courseId));
      } else {
        resolve(mockCourseMaterials);
      }
    }, 300);
  });
};

export const uploadCourseMaterial = (material: Omit<CourseMaterial, 'id' | 'downloadCount'>): Promise<CourseMaterial> => {
  return new Promise((resolve) => {
    const newMaterial: CourseMaterial = {
      ...material,
      id: String(mockCourseMaterials.length + 1),
      downloadCount: 0
    };
    mockCourseMaterials.push(newMaterial);
    setTimeout(() => resolve(newMaterial), 500);
  });
};

export const deleteCourseMaterial = (id: string): Promise<void> => {
  return new Promise((resolve) => {
    const index = mockCourseMaterials.findIndex(m => m.id === id);
    if (index > -1) mockCourseMaterials.splice(index, 1);
    setTimeout(resolve, 200);
  });
};

export const updateDoctorProfile = (updates: Partial<DoctorProfile>): Promise<DoctorProfile> => {
  return new Promise((resolve) => {
    Object.assign(mockDoctorProfile, updates);
    setTimeout(() => resolve(mockDoctorProfile), 300);
  });
};
