import { TeamMember } from '@/types';

const mockTeamMembers: TeamMember[] = [
  {
    id: '1',
    nameAr: 'د. محمد أحمد السيد',
    nameEn: 'Dr. Mohammed Ahmed Alsayed',
    positionAr: 'رئيس الجامعة',
    positionEn: 'University President',
    email: 'president@ngu.edu',
    phone: '+963 11 1234567',
    bioAr: 'حاصل على درجة الدكتوراه في الهندسة المعمارية، خبرة أكثر من 25 عاماً في التعليم العالي',
    bioEn: 'PhD in Architecture, over 25 years of experience in higher education',
  },
  {
    id: '2',
    nameAr: 'د. فاطمة حسن الخطيب',
    nameEn: 'Dr. Fatima Hassan Alkhatib',
    positionAr: 'نائب الرئيس للشؤون الأكاديمية',
    positionEn: 'Vice President for Academic Affairs',
    email: 'vp.academic@ngu.edu',
    bioAr: 'دكتوراه في علوم الحاسوب، متخصصة في تطوير المناهج الأكاديمية',
    bioEn: 'PhD in Computer Science, specialized in curriculum development',
  },
  {
    id: '3',
    nameAr: 'أ. عمر يوسف النجار',
    nameEn: 'Mr. Omar Youssef Alnajjar',
    positionAr: 'نائب الرئيس للشؤون الإدارية',
    positionEn: 'Vice President for Administrative Affairs',
    email: 'vp.admin@ngu.edu',
    bioAr: 'ماجستير في إدارة الأعمال، خبرة 15 عاماً في الإدارة الجامعية',
    bioEn: 'MBA, 15 years of experience in university administration',
  },
  {
    id: '4',
    nameAr: 'د. ليلى محمود العطار',
    nameEn: 'Dr. Layla Mahmoud Alattar',
    positionAr: 'عميدة شؤون الطلاب',
    positionEn: 'Dean of Student Affairs',
    email: 'dean.students@ngu.edu',
    bioAr: 'دكتوراه في علم النفس التربوي، متخصصة في الإرشاد الطلابي',
    bioEn: 'PhD in Educational Psychology, specialized in student counseling',
  },
  {
    id: '5',
    nameAr: 'أ.د. خالد إبراهيم الشامي',
    nameEn: 'Prof. Khaled Ibrahim Alshami',
    positionAr: 'عميد البحث العلمي',
    positionEn: 'Dean of Scientific Research',
    email: 'dean.research@ngu.edu',
    bioAr: 'أستاذ دكتور في الكيمياء، له أكثر من 50 بحثاً منشوراً',
    bioEn: 'Professor of Chemistry, over 50 published research papers',
  },
  {
    id: '6',
    nameAr: 'أ. سارة علي المصري',
    nameEn: 'Ms. Sarah Ali Almasri',
    positionAr: 'مديرة القبول والتسجيل',
    positionEn: 'Director of Admissions and Registration',
    email: 'admissions@ngu.edu',
    bioAr: 'ماجستير في الإدارة التربوية، خبرة 10 سنوات في القبول الجامعي',
    bioEn: 'Master in Educational Administration, 10 years in university admissions',
  },
];

export const teamService = {
  getAllMembers: async (): Promise<TeamMember[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockTeamMembers;
  },

  getMemberById: async (id: string): Promise<TeamMember | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockTeamMembers.find(member => member.id === id);
  },
};
