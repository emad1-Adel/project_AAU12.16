// Student Portal Mock Data Service

export interface StudentProfile {
  id: string;
  academicNumber: string;
  nameAr: string;
  nameEn: string;
  emailPersonal: string;
  emailUniversity: string;
  phone: string;
  collegeAr: string;
  collegeEn: string;
  departmentAr: string;
  departmentEn: string;
  specializationAr: string;
  specializationEn: string;
  levelAr: string;
  levelEn: string;
  status: 'active' | 'suspended' | 'graduated';
  gpa: number;
  totalCredits: number;
  completedCredits: number;
  admissionDate: string;
  expectedGraduation: string;
  advisorAr: string;
  advisorEn: string;
  image?: string;
}

export interface StudentCourse {
  id: string;
  code: string;
  nameAr: string;
  nameEn: string;
  creditHours: number;
  doctorAr: string;
  doctorEn: string;
  classroom: string;
  scheduleAr: string;
  scheduleEn: string;
  semester: string;
  status: 'current' | 'completed' | 'upcoming';
}

export interface CourseFile {
  id: string;
  courseId: string;
  courseCode: string;
  titleAr: string;
  titleEn: string;
  descriptionAr?: string;
  descriptionEn?: string;
  type: 'lecture' | 'assignment' | 'resource' | 'video' | 'exam';
  fileName: string;
  fileSize: string;
  uploadDate: string;
  downloadCount: number;
}

export interface StudentScheduleItem {
  id: string;
  dayAr: string;
  dayEn: string;
  time: string;
  courseCode: string;
  courseNameAr: string;
  courseNameEn: string;
  doctorAr: string;
  doctorEn: string;
  classroom: string;
  type: 'lecture' | 'lab' | 'tutorial';
}

export interface StudentGrade {
  id: string;
  courseId: string;
  courseCode: string;
  courseNameAr: string;
  courseNameEn: string;
  creditHours: number;
  semester: string;
  semesterAr: string;
  semesterEn: string;
  attendance: number;
  coursework: number;
  midterm: number;
  final: number;
  total: number;
  grade: string;
  points: number;
  status: 'pass' | 'fail' | 'in_progress';
}

export interface StudentInstallment {
  id: string;
  installmentNumber: number;
  amountTotal: number;
  amountPaid: number;
  amountRemaining: number;
  dueDate: string;
  paidDate?: string;
  status: 'paid' | 'pending' | 'overdue' | 'partial';
  semester: string;
}

export interface StudentPayment {
  id: string;
  receiptNumber: string;
  amount: number;
  date: string;
  method: 'cash' | 'bank_transfer' | 'card' | 'check';
  methodAr: string;
  methodEn: string;
  descriptionAr: string;
  descriptionEn: string;
  installmentId?: string;
}

export interface StudentFinance {
  totalFees: number;
  totalPaid: number;
  totalRemaining: number;
  discountAmount: number;
  discountType?: string;
  installments: StudentInstallment[];
  payments: StudentPayment[];
}

export interface StudentNotification {
  id: string;
  titleAr: string;
  titleEn: string;
  messageAr: string;
  messageEn: string;
  type: 'announcement' | 'grade' | 'payment' | 'course' | 'system';
  date: string;
  isRead: boolean;
}

// Mock Data
const mockStudentProfile: StudentProfile = {
  id: '1',
  academicNumber: '202401234',
  nameAr: 'محمد أحمد علي الحسني',
  nameEn: 'Mohammed Ahmed Ali Alhusni',
  emailPersonal: 'mohammed.ali@gmail.com',
  emailUniversity: 'mohammed.alhusni@ngu.edu.ye',
  phone: '+967 771 234 567',
  collegeAr: 'كلية الهندسة وتقنية المعلومات',
  collegeEn: 'College of Engineering & IT',
  departmentAr: 'قسم علوم الحاسوب',
  departmentEn: 'Computer Science Department',
  specializationAr: 'هندسة البرمجيات',
  specializationEn: 'Software Engineering',
  levelAr: 'المستوى الثالث',
  levelEn: 'Level 3',
  status: 'active',
  gpa: 3.85,
  totalCredits: 136,
  completedCredits: 78,
  admissionDate: '2022-09-01',
  expectedGraduation: '2026-06-30',
  advisorAr: 'د. أحمد محمود الحسن',
  advisorEn: 'Dr. Ahmed Mahmoud Alhasan',
  image: '/placeholder.svg'
};

const mockStudentCourses: StudentCourse[] = [
  {
    id: '1',
    code: 'CS301',
    nameAr: 'هندسة البرمجيات',
    nameEn: 'Software Engineering',
    creditHours: 3,
    doctorAr: 'د. أحمد محمود الحسن',
    doctorEn: 'Dr. Ahmed Alhasan',
    classroom: 'A-201',
    scheduleAr: 'الأحد والثلاثاء 8:00 - 9:30',
    scheduleEn: 'Sun & Tue 8:00 - 9:30 AM',
    semester: '2024-1',
    status: 'current'
  },
  {
    id: '2',
    code: 'CS302',
    nameAr: 'قواعد البيانات',
    nameEn: 'Database Systems',
    creditHours: 3,
    doctorAr: 'د. سارة أحمد',
    doctorEn: 'Dr. Sara Ahmed',
    classroom: 'B-105',
    scheduleAr: 'الإثنين والأربعاء 10:00 - 11:30',
    scheduleEn: 'Mon & Wed 10:00 - 11:30 AM',
    semester: '2024-1',
    status: 'current'
  },
  {
    id: '3',
    code: 'CS303',
    nameAr: 'الذكاء الاصطناعي',
    nameEn: 'Artificial Intelligence',
    creditHours: 3,
    doctorAr: 'د. محمد علي',
    doctorEn: 'Dr. Mohammed Ali',
    classroom: 'Lab-01',
    scheduleAr: 'السبت 2:00 - 5:00',
    scheduleEn: 'Sat 2:00 - 5:00 PM',
    semester: '2024-1',
    status: 'current'
  },
  {
    id: '4',
    code: 'CS304',
    nameAr: 'أمن المعلومات',
    nameEn: 'Information Security',
    creditHours: 3,
    doctorAr: 'د. خالد الشريف',
    doctorEn: 'Dr. Khaled Alsharif',
    classroom: 'C-302',
    scheduleAr: 'الخميس 12:00 - 3:00',
    scheduleEn: 'Thu 12:00 - 3:00 PM',
    semester: '2024-1',
    status: 'current'
  },
  {
    id: '5',
    code: 'GEN201',
    nameAr: 'اللغة الإنجليزية',
    nameEn: 'English Language',
    creditHours: 2,
    doctorAr: 'أ. فاطمة حسين',
    doctorEn: 'Ms. Fatima Hussein',
    classroom: 'D-101',
    scheduleAr: 'الأحد 11:00 - 1:00',
    scheduleEn: 'Sun 11:00 AM - 1:00 PM',
    semester: '2024-1',
    status: 'current'
  }
];

const mockCourseFiles: CourseFile[] = [
  {
    id: '1',
    courseId: '1',
    courseCode: 'CS301',
    titleAr: 'المحاضرة 1 - مقدمة في هندسة البرمجيات',
    titleEn: 'Lecture 1 - Introduction to SE',
    type: 'lecture',
    fileName: 'SE_Lecture_01.pdf',
    fileSize: '2.5 MB',
    uploadDate: '2024-09-01',
    downloadCount: 42
  },
  {
    id: '2',
    courseId: '1',
    courseCode: 'CS301',
    titleAr: 'المحاضرة 2 - دورة حياة البرمجيات',
    titleEn: 'Lecture 2 - SDLC',
    type: 'lecture',
    fileName: 'SE_Lecture_02.pdf',
    fileSize: '3.1 MB',
    uploadDate: '2024-09-08',
    downloadCount: 38
  },
  {
    id: '3',
    courseId: '1',
    courseCode: 'CS301',
    titleAr: 'الواجب الأول',
    titleEn: 'Assignment 1',
    descriptionAr: 'واجب حول تحليل متطلبات النظام - تسليم قبل 20 سبتمبر',
    descriptionEn: 'Assignment on system requirements analysis - Due Sept 20',
    type: 'assignment',
    fileName: 'SE_Assignment_01.pdf',
    fileSize: '500 KB',
    uploadDate: '2024-09-15',
    downloadCount: 45
  },
  {
    id: '4',
    courseId: '2',
    courseCode: 'CS302',
    titleAr: 'المحاضرة 1 - مقدمة قواعد البيانات',
    titleEn: 'Lecture 1 - DB Introduction',
    type: 'lecture',
    fileName: 'DB_Lecture_01.pdf',
    fileSize: '2.8 MB',
    uploadDate: '2024-09-01',
    downloadCount: 35
  },
  {
    id: '5',
    courseId: '2',
    courseCode: 'CS302',
    titleAr: 'فيديو - تصميم قواعد البيانات',
    titleEn: 'Video - Database Design',
    type: 'video',
    fileName: 'DB_Design.mp4',
    fileSize: '150 MB',
    uploadDate: '2024-09-10',
    downloadCount: 28
  },
  {
    id: '6',
    courseId: '3',
    courseCode: 'CS303',
    titleAr: 'المحاضرة 1 - مقدمة الذكاء الاصطناعي',
    titleEn: 'Lecture 1 - AI Introduction',
    type: 'lecture',
    fileName: 'AI_Lecture_01.pdf',
    fileSize: '4.2 MB',
    uploadDate: '2024-09-01',
    downloadCount: 40
  },
  {
    id: '7',
    courseId: '3',
    courseCode: 'CS303',
    titleAr: 'نموذج اختبار سابق',
    titleEn: 'Previous Exam Sample',
    type: 'exam',
    fileName: 'AI_Exam_Sample.pdf',
    fileSize: '1.2 MB',
    uploadDate: '2024-10-01',
    downloadCount: 52
  },
  {
    id: '8',
    courseId: '4',
    courseCode: 'CS304',
    titleAr: 'مرجع - أساسيات التشفير',
    titleEn: 'Reference - Cryptography Basics',
    type: 'resource',
    fileName: 'Crypto_Reference.pdf',
    fileSize: '5.5 MB',
    uploadDate: '2024-09-05',
    downloadCount: 33
  }
];

const mockSchedule: StudentScheduleItem[] = [
  { id: '1', dayAr: 'السبت', dayEn: 'Saturday', time: '14:00 - 17:00', courseCode: 'CS303', courseNameAr: 'الذكاء الاصطناعي', courseNameEn: 'AI', doctorAr: 'د. محمد علي', doctorEn: 'Dr. Mohammed Ali', classroom: 'Lab-01', type: 'lab' },
  { id: '2', dayAr: 'الأحد', dayEn: 'Sunday', time: '08:00 - 09:30', courseCode: 'CS301', courseNameAr: 'هندسة البرمجيات', courseNameEn: 'Software Eng.', doctorAr: 'د. أحمد الحسن', doctorEn: 'Dr. Ahmed Alhasan', classroom: 'A-201', type: 'lecture' },
  { id: '3', dayAr: 'الأحد', dayEn: 'Sunday', time: '11:00 - 13:00', courseCode: 'GEN201', courseNameAr: 'اللغة الإنجليزية', courseNameEn: 'English', doctorAr: 'أ. فاطمة حسين', doctorEn: 'Ms. Fatima Hussein', classroom: 'D-101', type: 'lecture' },
  { id: '4', dayAr: 'الإثنين', dayEn: 'Monday', time: '10:00 - 11:30', courseCode: 'CS302', courseNameAr: 'قواعد البيانات', courseNameEn: 'Database', doctorAr: 'د. سارة أحمد', doctorEn: 'Dr. Sara Ahmed', classroom: 'B-105', type: 'lecture' },
  { id: '5', dayAr: 'الثلاثاء', dayEn: 'Tuesday', time: '08:00 - 09:30', courseCode: 'CS301', courseNameAr: 'هندسة البرمجيات', courseNameEn: 'Software Eng.', doctorAr: 'د. أحمد الحسن', doctorEn: 'Dr. Ahmed Alhasan', classroom: 'A-201', type: 'lecture' },
  { id: '6', dayAr: 'الأربعاء', dayEn: 'Wednesday', time: '10:00 - 11:30', courseCode: 'CS302', courseNameAr: 'قواعد البيانات', courseNameEn: 'Database', doctorAr: 'د. سارة أحمد', doctorEn: 'Dr. Sara Ahmed', classroom: 'B-105', type: 'lecture' },
  { id: '7', dayAr: 'الأربعاء', dayEn: 'Wednesday', time: '14:00 - 16:00', courseCode: 'CS302', courseNameAr: 'معمل قواعد البيانات', courseNameEn: 'DB Lab', doctorAr: 'م. علي حسن', doctorEn: 'Eng. Ali Hassan', classroom: 'Lab-03', type: 'lab' },
  { id: '8', dayAr: 'الخميس', dayEn: 'Thursday', time: '12:00 - 15:00', courseCode: 'CS304', courseNameAr: 'أمن المعلومات', courseNameEn: 'Info Security', doctorAr: 'د. خالد الشريف', doctorEn: 'Dr. Khaled Alsharif', classroom: 'C-302', type: 'lecture' },
];

const mockGrades: StudentGrade[] = [
  // Current Semester
  { id: '1', courseId: '1', courseCode: 'CS301', courseNameAr: 'هندسة البرمجيات', courseNameEn: 'Software Engineering', creditHours: 3, semester: '2024-1', semesterAr: 'الفصل الأول 2024', semesterEn: 'Fall 2024', attendance: 95, coursework: 28, midterm: 27, final: 0, total: 55, grade: '-', points: 0, status: 'in_progress' },
  { id: '2', courseId: '2', courseCode: 'CS302', courseNameAr: 'قواعد البيانات', courseNameEn: 'Database Systems', creditHours: 3, semester: '2024-1', semesterAr: 'الفصل الأول 2024', semesterEn: 'Fall 2024', attendance: 90, coursework: 25, midterm: 24, final: 0, total: 49, grade: '-', points: 0, status: 'in_progress' },
  { id: '3', courseId: '3', courseCode: 'CS303', courseNameAr: 'الذكاء الاصطناعي', courseNameEn: 'Artificial Intelligence', creditHours: 3, semester: '2024-1', semesterAr: 'الفصل الأول 2024', semesterEn: 'Fall 2024', attendance: 100, coursework: 29, midterm: 26, final: 0, total: 55, grade: '-', points: 0, status: 'in_progress' },
  { id: '4', courseId: '4', courseCode: 'CS304', courseNameAr: 'أمن المعلومات', courseNameEn: 'Information Security', creditHours: 3, semester: '2024-1', semesterAr: 'الفصل الأول 2024', semesterEn: 'Fall 2024', attendance: 88, coursework: 27, midterm: 25, final: 0, total: 52, grade: '-', points: 0, status: 'in_progress' },
  { id: '5', courseId: '5', courseCode: 'GEN201', courseNameAr: 'اللغة الإنجليزية', courseNameEn: 'English Language', creditHours: 2, semester: '2024-1', semesterAr: 'الفصل الأول 2024', semesterEn: 'Fall 2024', attendance: 92, coursework: 24, midterm: 22, final: 0, total: 46, grade: '-', points: 0, status: 'in_progress' },
  // Previous Semester 1
  { id: '6', courseId: '6', courseCode: 'CS201', courseNameAr: 'البرمجة الكائنية', courseNameEn: 'OOP', creditHours: 4, semester: '2023-2', semesterAr: 'الفصل الثاني 2023', semesterEn: 'Spring 2023', attendance: 95, coursework: 28, midterm: 28, final: 45, total: 96, grade: 'A', points: 4.0, status: 'pass' },
  { id: '7', courseId: '7', courseCode: 'CS202', courseNameAr: 'هياكل البيانات', courseNameEn: 'Data Structures', creditHours: 3, semester: '2023-2', semesterAr: 'الفصل الثاني 2023', semesterEn: 'Spring 2023', attendance: 88, coursework: 26, midterm: 25, final: 42, total: 88, grade: 'A-', points: 3.7, status: 'pass' },
  { id: '8', courseId: '8', courseCode: 'MATH201', courseNameAr: 'الرياضيات المتقدمة', courseNameEn: 'Advanced Math', creditHours: 3, semester: '2023-2', semesterAr: 'الفصل الثاني 2023', semesterEn: 'Spring 2023', attendance: 82, coursework: 24, midterm: 23, final: 38, total: 82, grade: 'B+', points: 3.3, status: 'pass' },
  { id: '9', courseId: '9', courseCode: 'GEN101', courseNameAr: 'مهارات الاتصال', courseNameEn: 'Communication Skills', creditHours: 2, semester: '2023-2', semesterAr: 'الفصل الثاني 2023', semesterEn: 'Spring 2023', attendance: 90, coursework: 27, midterm: 26, final: 44, total: 92, grade: 'A', points: 4.0, status: 'pass' },
  // Previous Semester 2
  { id: '10', courseId: '10', courseCode: 'CS101', courseNameAr: 'مقدمة في البرمجة', courseNameEn: 'Intro to Programming', creditHours: 4, semester: '2023-1', semesterAr: 'الفصل الأول 2023', semesterEn: 'Fall 2023', attendance: 98, coursework: 29, midterm: 29, final: 48, total: 100, grade: 'A+', points: 4.0, status: 'pass' },
  { id: '11', courseId: '11', courseCode: 'CS102', courseNameAr: 'أساسيات الحاسوب', courseNameEn: 'Computer Fundamentals', creditHours: 3, semester: '2023-1', semesterAr: 'الفصل الأول 2023', semesterEn: 'Fall 2023', attendance: 95, coursework: 28, midterm: 27, final: 43, total: 93, grade: 'A', points: 4.0, status: 'pass' },
  { id: '12', courseId: '12', courseCode: 'MATH101', courseNameAr: 'الرياضيات 1', courseNameEn: 'Math 1', creditHours: 3, semester: '2023-1', semesterAr: 'الفصل الأول 2023', semesterEn: 'Fall 2023', attendance: 85, coursework: 25, midterm: 24, final: 40, total: 84, grade: 'B+', points: 3.3, status: 'pass' },
];

const mockInstallments: StudentInstallment[] = [
  { id: '1', installmentNumber: 1, amountTotal: 150000, amountPaid: 150000, amountRemaining: 0, dueDate: '2024-09-01', paidDate: '2024-08-28', status: 'paid', semester: '2024-1' },
  { id: '2', installmentNumber: 2, amountTotal: 150000, amountPaid: 150000, amountRemaining: 0, dueDate: '2024-10-01', paidDate: '2024-09-30', status: 'paid', semester: '2024-1' },
  { id: '3', installmentNumber: 3, amountTotal: 150000, amountPaid: 75000, amountRemaining: 75000, dueDate: '2024-11-01', status: 'partial', semester: '2024-1' },
  { id: '4', installmentNumber: 4, amountTotal: 150000, amountPaid: 0, amountRemaining: 150000, dueDate: '2024-12-01', status: 'overdue', semester: '2024-1' },
  { id: '5', installmentNumber: 5, amountTotal: 150000, amountPaid: 0, amountRemaining: 150000, dueDate: '2025-01-01', status: 'pending', semester: '2024-1' },
];

const mockPayments: StudentPayment[] = [
  { id: '1', receiptNumber: 'REC-2024-001', amount: 150000, date: '2024-08-28', method: 'bank_transfer', methodAr: 'تحويل بنكي', methodEn: 'Bank Transfer', descriptionAr: 'القسط الأول - الفصل الأول 2024', descriptionEn: 'First Installment - Fall 2024', installmentId: '1' },
  { id: '2', receiptNumber: 'REC-2024-002', amount: 150000, date: '2024-09-30', method: 'card', methodAr: 'بطاقة ائتمان', methodEn: 'Credit Card', descriptionAr: 'القسط الثاني - الفصل الأول 2024', descriptionEn: 'Second Installment - Fall 2024', installmentId: '2' },
  { id: '3', receiptNumber: 'REC-2024-003', amount: 75000, date: '2024-11-05', method: 'cash', methodAr: 'نقدي', methodEn: 'Cash', descriptionAr: 'دفعة جزئية - القسط الثالث', descriptionEn: 'Partial Payment - Third Installment', installmentId: '3' },
];

const mockFinance: StudentFinance = {
  totalFees: 750000,
  totalPaid: 375000,
  totalRemaining: 375000,
  discountAmount: 50000,
  discountType: 'منحة تفوق أكاديمي',
  installments: mockInstallments,
  payments: mockPayments
};

const mockNotifications: StudentNotification[] = [
  { id: '1', titleAr: 'درجة جديدة', titleEn: 'New Grade', messageAr: 'تم إضافة درجة النصفي لمقرر هندسة البرمجيات', messageEn: 'Midterm grade added for Software Engineering', type: 'grade', date: '2024-12-02', isRead: false },
  { id: '2', titleAr: 'تذكير بالقسط', titleEn: 'Payment Reminder', messageAr: 'القسط الرابع مستحق في 1 ديسمبر', messageEn: '4th installment due on December 1st', type: 'payment', date: '2024-11-28', isRead: false },
  { id: '3', titleAr: 'إعلان هام', titleEn: 'Important Announcement', messageAr: 'تم تحديث جدول الامتحانات النهائية', messageEn: 'Final exams schedule has been updated', type: 'announcement', date: '2024-11-25', isRead: true },
  { id: '4', titleAr: 'ملف جديد', titleEn: 'New File', messageAr: 'تم رفع محاضرة جديدة في مقرر الذكاء الاصطناعي', messageEn: 'New lecture uploaded in AI course', type: 'course', date: '2024-11-20', isRead: true },
];

// Service Functions
export const getStudentProfile = (): Promise<StudentProfile> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockStudentProfile), 300);
  });
};

export const getStudentCourses = (status?: 'current' | 'completed'): Promise<StudentCourse[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (status) {
        resolve(mockStudentCourses.filter(c => c.status === status));
      } else {
        resolve(mockStudentCourses);
      }
    }, 300);
  });
};

export const getCourseFiles = (courseId?: string): Promise<CourseFile[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (courseId) {
        resolve(mockCourseFiles.filter(f => f.courseId === courseId));
      } else {
        resolve(mockCourseFiles);
      }
    }, 300);
  });
};

export const getStudentSchedule = (): Promise<StudentScheduleItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockSchedule), 300);
  });
};

export const getStudentGrades = (semester?: string): Promise<StudentGrade[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (semester) {
        resolve(mockGrades.filter(g => g.semester === semester));
      } else {
        resolve(mockGrades);
      }
    }, 300);
  });
};

export const getStudentFinance = (): Promise<StudentFinance> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockFinance), 300);
  });
};

export const getStudentNotifications = (): Promise<StudentNotification[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockNotifications), 300);
  });
};

export const markStudentNotificationAsRead = (id: string): Promise<void> => {
  return new Promise((resolve) => {
    const notification = mockNotifications.find(n => n.id === id);
    if (notification) notification.isRead = true;
    setTimeout(resolve, 100);
  });
};

export const updateStudentProfile = (data: Partial<StudentProfile>): Promise<StudentProfile> => {
  return new Promise((resolve) => {
    Object.assign(mockStudentProfile, data);
    setTimeout(() => resolve(mockStudentProfile), 300);
  });
};
