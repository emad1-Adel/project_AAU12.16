export interface NewsItem {
  id: string;
  slug: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  contentAr: string;
  contentEn: string;
  image?: string;
  date: string;
  views: number;
  tags?: string[];
}

export interface ProjectItem {
  id: string;
  slug: string;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  students: string[];
  progress?: number;
  year?: number;
  status: 'current' | 'completed';
  images?: string[];
  detailsAr?: string;
  detailsEn?: string;
  startDate?: string;
  endDate?: string;
}

export interface CenterItem {
  id: string;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  services: { ar: string; en: string }[];
  programs: { ar: string; en: string }[];
  image?: string;
  location?: string;
  phone?: string;
  email?: string;
}

export interface PartnerItem {
  id: string;
  nameAr: string;
  nameEn: string;
  logo: string;
  type: 'local' | 'international';
  website?: string;
}

export interface OfferItem {
  id: string;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  image?: string;
  category: 'academic' | 'scholarship' | 'training' | 'other';
  validUntil?: string;
}

export interface FAQItem {
  id: string;
  questionAr: string;
  questionEn: string;
  answerAr: string;
  answerEn: string;
  category?: string;
}

export interface SearchResult {
  id: string;
  type: 'news' | 'project' | 'center' | 'offer';
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  link: string;
  image?: string;
}

export interface TeamMember {
  id: string;
  nameAr: string;
  nameEn: string;
  positionAr: string;
  positionEn: string;
  email?: string;
  phone?: string;
  bioAr?: string;
  bioEn?: string;
  image?: string;
}

export interface FacultyMember {
  id: string;
  nameAr: string;
  nameEn: string;
  degreeAr: string;
  degreeEn: string;
  specializationAr: string;
  specializationEn: string;
  collegeAr: string;
  collegeEn: string;
  departmentAr?: string;
  departmentEn?: string;
  email?: string;
  phone?: string;
  bioAr?: string;
  bioEn?: string;
  image?: string;
}

// Academic Program Type
export interface ProgramObjective {
  id: string;
  textAr: string;
  textEn: string;
}

export interface StudyPlanItem {
  id: string;
  yearAr: string;
  yearEn: string;
  semesterAr: string;
  semesterEn: string;
  courses: { nameAr: string; nameEn: string; creditHours: number }[];
}

// Program Faculty Member
export interface ProgramFacultyMember {
  id: string;
  nameAr: string;
  nameEn: string;
  titleAr: string;
  titleEn: string;
  image?: string;
  email?: string;
  specializationAr?: string;
  specializationEn?: string;
}

export interface AcademicProgram {
  id: string;
  nameAr: string;
  nameEn: string;
  departmentAr: string;
  departmentEn: string;
  admissionRate: number;
  highSchoolType: 'علمي' | 'ادبي' | 'علمي + ادبي';
  highSchoolTypeEn: 'Scientific' | 'Literary' | 'Scientific + Literary';
  studyYears: string;
  image?: string;
  descriptionAr?: string;
  descriptionEn?: string;
  objectives?: ProgramObjective[];
  studyPlan?: StudyPlanItem[];
  careerProspectsAr?: string[];
  careerProspectsEn?: string[];
  facultyMembers?: ProgramFacultyMember[];
}

// College Type with Departments
export interface College {
  id: string;
  slug: string;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  visionAr: string;
  visionEn: string;
  missionAr: string;
  missionEn: string;
  programs: AcademicProgram[];
  admissionRequirementsAr: string;
  admissionRequirementsEn: string;
  icon?: string;
  image?: string;
  dean?: {
    id?: string;
    nameAr: string;
    nameEn: string;
    titleAr?: string;
    titleEn?: string;
    image?: string;
  };
}

export interface EventItem {
  id: string;
  slug: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  contentAr?: string;
  contentEn?: string;
  date: string;
  endDate?: string;
  locationAr: string;
  locationEn: string;
  organizerAr: string;
  organizerEn: string;
  category: 'academic' | 'cultural' | 'sports' | 'social' | 'other';
  status: 'upcoming' | 'ongoing' | 'completed';
  registrationRequired: boolean;
  registrationLink?: string;
  image?: string;
}

export interface CampusLifeItem {
  id: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  category: 'facilities' | 'activities' | 'campus';
  image?: string;
}

// Doctor Dashboard Types
export interface DoctorProfile {
  id: string;
  nameAr: string;
  nameEn: string;
  degreeAr: string;
  degreeEn: string;
  specializationAr: string;
  specializationEn: string;
  collegeAr: string;
  collegeEn: string;
  departmentAr?: string;
  departmentEn?: string;
  email: string;
  phone: string;
  officeHoursAr: string;
  officeHoursEn: string;
  bioAr?: string;
  bioEn?: string;
  image?: string;
}

export interface TeachingCourse {
  id: string;
  code: string;
  nameAr: string;
  nameEn: string;
  creditHours: number;
  semester: string;
  studentsCount: number;
  scheduleAr: string;
  scheduleEn: string;
  classroom: string;
}

export interface DoctorStudent {
  id: string;
  nameAr: string;
  nameEn: string;
  academicNumber: string;
  courseId: string;
  courseCode: string;
  attendance: number;
  midterm?: number;
  final?: number;
  total?: number;
}

export interface DoctorScheduleItem {
  id: string;
  dayAr: string;
  dayEn: string;
  time: string;
  courseCode: string;
  courseNameAr: string;
  courseNameEn: string;
  classroom: string;
  type: 'lecture' | 'lab' | 'office';
}

export interface PaymentRecord {
  id: string;
  monthAr: string;
  monthEn: string;
  baseSalary: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  status: 'paid' | 'pending' | 'delayed';
  paidDate?: string;
}

export interface DoctorFinance {
  baseSalary: number;
  allowances: {
    housingAr: string;
    housingEn: string;
    housingAmount: number;
    transportAr: string;
    transportEn: string;
    transportAmount: number;
    otherAr: string;
    otherEn: string;
    otherAmount: number;
    total: number;
  };
  deductions: {
    taxAr: string;
    taxEn: string;
    taxAmount: number;
    insuranceAr: string;
    insuranceEn: string;
    insuranceAmount: number;
    otherAr: string;
    otherEn: string;
    otherAmount: number;
    total: number;
  };
  netSalary: number;
  paymentHistory: PaymentRecord[];
}

// Doctor Notifications & Messages
export interface DoctorNotification {
  id: string;
  titleAr: string;
  titleEn: string;
  messageAr: string;
  messageEn: string;
  type: 'announcement' | 'reminder' | 'alert' | 'system';
  senderAr: string;
  senderEn: string;
  senderType: 'admin' | 'system';
  date: string;
  isRead: boolean;
}

export interface DoctorMessage {
  id: string;
  studentId: string;
  studentNameAr: string;
  studentNameEn: string;
  studentAcademicNumber: string;
  subjectAr: string;
  subjectEn: string;
  messageAr: string;
  messageEn: string;
  date: string;
  isRead: boolean;
  courseCode?: string;
}

export interface CourseMaterial {
  id: string;
  courseId: string;
  titleAr: string;
  titleEn: string;
  descriptionAr?: string;
  descriptionEn?: string;
  type: 'lecture' | 'assignment' | 'resource' | 'video';
  fileName: string;
  fileSize: string;
  uploadDate: string;
  downloadCount: number;
}

// User & Role Management Types
export type AppRole = 'admin' | 'content_editor' | 'doctor' | 'student';

export interface Permission {
  id: string;
  key: string;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  category: 'users' | 'content' | 'settings' | 'reports';
}

export interface Role {
  id: string;
  key: AppRole;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  permissions: string[];
  isSystem: boolean;
  createdAt: string;
}

export interface User {
  id: string;
  nameAr: string;
  nameEn: string;
  email: string;
  phone?: string;
  avatar?: string;
  roleId: string;
  status: 'active' | 'inactive' | 'suspended';
  lastLogin?: string;
  createdAt: string;
}
