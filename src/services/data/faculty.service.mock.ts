import { FacultyMember } from '@/types';

// Extended faculty member type for details page
export interface FacultyMemberDetail extends FacultyMember {
  officeHoursAr?: string;
  officeHoursEn?: string;
  researchInterestsAr?: string[];
  researchInterestsEn?: string[];
  publications?: {
    id: string;
    titleAr: string;
    titleEn: string;
    journal: string;
    year: string;
    link?: string;
  }[];
  courses?: {
    id: string;
    code: string;
    nameAr: string;
    nameEn: string;
    semester: string;
  }[];
  education?: {
    id: string;
    degreeAr: string;
    degreeEn: string;
    institutionAr: string;
    institutionEn: string;
    year: string;
  }[];
  experience?: {
    id: string;
    positionAr: string;
    positionEn: string;
    organizationAr: string;
    organizationEn: string;
    periodAr: string;
    periodEn: string;
  }[];
}

const mockFacultyMembers: FacultyMemberDetail[] = [
  {
    id: '1',
    nameAr: 'د. أحمد محمود الحسن',
    nameEn: 'Dr. Ahmed Mahmoud Alhasan',
    degreeAr: 'أستاذ دكتور',
    degreeEn: 'Professor',
    specializationAr: 'هندسة البرمجيات',
    specializationEn: 'Software Engineering',
    collegeAr: 'كلية الهندسة المعلوماتية',
    collegeEn: 'College of Informatics Engineering',
    departmentAr: 'قسم هندسة البرمجيات',
    departmentEn: 'Software Engineering Department',
    email: 'ahmed.hasan@ngu.edu',
    phone: '+967 1 234567',
    bioAr: 'دكتور أحمد محمود الحسن هو أستاذ متميز في مجال هندسة البرمجيات والذكاء الاصطناعي. حاصل على درجة الدكتوراه من جامعة كامبريدج في المملكة المتحدة عام 2010. لديه أكثر من 15 عاماً من الخبرة في التدريس والبحث العلمي.',
    bioEn: 'Dr. Ahmed Mahmoud Alhasan is a distinguished professor in Software Engineering and Artificial Intelligence. He received his PhD from Cambridge University in the United Kingdom in 2010. He has over 15 years of experience in teaching and scientific research.',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80',
    officeHoursAr: 'الأحد والثلاثاء 10:00 - 12:00',
    officeHoursEn: 'Sunday and Tuesday 10:00 - 12:00',
    researchInterestsAr: ['الذكاء الاصطناعي وتعلم الآلة', 'هندسة البرمجيات', 'تحليل البيانات الضخمة'],
    researchInterestsEn: ['Artificial Intelligence and Machine Learning', 'Software Engineering', 'Big Data Analytics'],
    publications: [
      { id: '1', titleAr: 'نهج جديد لتحسين أداء نماذج التعلم العميق', titleEn: 'A Novel Approach for Improving Deep Learning Model Performance', journal: 'IEEE Transactions on Neural Networks', year: '2024', link: '#' },
      { id: '2', titleAr: 'تطبيقات الذكاء الاصطناعي في الرعاية الصحية', titleEn: 'AI Applications in Healthcare', journal: 'Journal of Medical Informatics', year: '2023', link: '#' },
    ],
    courses: [
      { id: '1', code: 'CS401', nameAr: 'هندسة البرمجيات المتقدمة', nameEn: 'Advanced Software Engineering', semester: '2024-1' },
      { id: '2', code: 'CS501', nameAr: 'الذكاء الاصطناعي', nameEn: 'Artificial Intelligence', semester: '2024-1' },
    ],
    education: [
      { id: '1', degreeAr: 'دكتوراه في هندسة البرمجيات', degreeEn: 'PhD in Software Engineering', institutionAr: 'جامعة كامبريدج، المملكة المتحدة', institutionEn: 'Cambridge University, UK', year: '2010' },
      { id: '2', degreeAr: 'ماجستير في علوم الحاسوب', degreeEn: 'MSc in Computer Science', institutionAr: 'جامعة القاهرة، مصر', institutionEn: 'Cairo University, Egypt', year: '2006' },
    ],
    experience: [
      { id: '1', positionAr: 'أستاذ دكتور', positionEn: 'Professor', organizationAr: 'جامعة الجيل الجديد', organizationEn: 'Al JEEL AL JADEED UNIVERSITU', periodAr: '2018 - الآن', periodEn: '2018 - Present' },
      { id: '2', positionAr: 'أستاذ مشارك', positionEn: 'Associate Professor', organizationAr: 'جامعة صنعاء', organizationEn: 'Sana\'a University', periodAr: '2014 - 2018', periodEn: '2014 - 2018' },
    ],
  },
  {
    id: '2',
    nameAr: 'د. سلمى خالد العمر',
    nameEn: 'Dr. Salma Khaled Alomar',
    degreeAr: 'أستاذ مشارك',
    degreeEn: 'Associate Professor',
    specializationAr: 'الذكاء الاصطناعي',
    specializationEn: 'Artificial Intelligence',
    collegeAr: 'كلية الهندسة المعلوماتية',
    collegeEn: 'College of Informatics Engineering',
    departmentAr: 'قسم علوم الحاسوب',
    departmentEn: 'Computer Science Department',
    email: 'salma.omar@ngu.edu',
    phone: '+967 1 234568',
    bioAr: 'خبيرة في التعلم الآلي والشبكات العصبية مع خبرة تزيد عن 10 سنوات',
    bioEn: 'Expert in machine learning and neural networks with over 10 years of experience',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80',
    officeHoursAr: 'الاثنين والأربعاء 9:00 - 11:00',
    officeHoursEn: 'Monday and Wednesday 9:00 - 11:00',
    researchInterestsAr: ['التعلم العميق', 'معالجة اللغات الطبيعية', 'الرؤية الحاسوبية'],
    researchInterestsEn: ['Deep Learning', 'Natural Language Processing', 'Computer Vision'],
    publications: [
      { id: '1', titleAr: 'تقنيات التعلم العميق في تحليل الصور الطبية', titleEn: 'Deep Learning Techniques in Medical Image Analysis', journal: 'Nature Machine Intelligence', year: '2023' },
    ],
    courses: [
      { id: '1', code: 'CS502', nameAr: 'التعلم العميق', nameEn: 'Deep Learning', semester: '2024-1' },
    ],
    education: [
      { id: '1', degreeAr: 'دكتوراه في الذكاء الاصطناعي', degreeEn: 'PhD in Artificial Intelligence', institutionAr: 'MIT، أمريكا', institutionEn: 'MIT, USA', year: '2014' },
    ],
    experience: [
      { id: '1', positionAr: 'أستاذ مشارك', positionEn: 'Associate Professor', organizationAr: 'جامعة الجيل الجديد', organizationEn: 'Al JEEL AL JADEED UNIVERSITU', periodAr: '2020 - الآن', periodEn: '2020 - Present' },
    ],
  },
  {
    id: '3',
    nameAr: 'د. يوسف عبد الله النجار',
    nameEn: 'Dr. Youssef Abdullah Alnajjar',
    degreeAr: 'أستاذ دكتور',
    degreeEn: 'Professor',
    specializationAr: 'الهندسة المدنية',
    specializationEn: 'Civil Engineering',
    collegeAr: 'كلية الهندسة المدنية',
    collegeEn: 'College of Civil Engineering',
    departmentAr: 'قسم الإنشاءات',
    departmentEn: 'Structural Engineering Department',
    email: 'youssef.najjar@ngu.edu',
    phone: '+967 1 234569',
    bioAr: 'متخصص في تصميم المنشآت والجسور',
    bioEn: 'Specialized in structural design and bridges',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&q=80',
    officeHoursAr: 'السبت والثلاثاء 11:00 - 13:00',
    officeHoursEn: 'Saturday and Tuesday 11:00 - 13:00',
    researchInterestsAr: ['تصميم الجسور', 'الهندسة الإنشائية', 'المواد المركبة'],
    researchInterestsEn: ['Bridge Design', 'Structural Engineering', 'Composite Materials'],
  },
  {
    id: '4',
    nameAr: 'د. مريم حسين الشامي',
    nameEn: 'Dr. Maryam Hussein Alshami',
    degreeAr: 'أستاذ مساعد',
    degreeEn: 'Assistant Professor',
    specializationAr: 'إدارة الأعمال',
    specializationEn: 'Business Administration',
    collegeAr: 'كلية الاقتصاد',
    collegeEn: 'College of Economics',
    departmentAr: 'قسم إدارة الأعمال',
    departmentEn: 'Business Administration Department',
    email: 'maryam.shami@ngu.edu',
    phone: '+967 1 234570',
    bioAr: 'متخصصة في الإدارة الاستراتيجية وريادة الأعمال',
    bioEn: 'Specialized in strategic management and entrepreneurship',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
  },
  {
    id: '5',
    nameAr: 'د. كريم فؤاد الخطيب',
    nameEn: 'Dr. Karim Fouad Alkhatib',
    degreeAr: 'أستاذ دكتور',
    degreeEn: 'Professor',
    specializationAr: 'الهندسة الكهربائية',
    specializationEn: 'Electrical Engineering',
    collegeAr: 'كلية الهندسة الكهربائية والإلكترونية',
    collegeEn: 'College of Electrical and Electronic Engineering',
    departmentAr: 'قسم هندسة القوى الكهربائية',
    departmentEn: 'Power Engineering Department',
    email: 'karim.khatib@ngu.edu',
    phone: '+967 1 234571',
    bioAr: 'خبير في أنظمة الطاقة المتجددة',
    bioEn: 'Expert in renewable energy systems',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
  },
  {
    id: '6',
    nameAr: 'د. نور الدين سعيد العلي',
    nameEn: 'Dr. Noureddine Saeed Alali',
    degreeAr: 'أستاذ مشارك',
    degreeEn: 'Associate Professor',
    specializationAr: 'الهندسة الميكانيكية',
    specializationEn: 'Mechanical Engineering',
    collegeAr: 'كلية الهندسة الميكانيكية والكهربائية',
    collegeEn: 'College of Mechanical and Electrical Engineering',
    departmentAr: 'قسم الهندسة الميكانيكية',
    departmentEn: 'Mechanical Engineering Department',
    email: 'noureddine.ali@ngu.edu',
    phone: '+967 1 234572',
    bioAr: 'متخصص في الديناميكا الحرارية والآلات',
    bioEn: 'Specialized in thermodynamics and machinery',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
  },
  {
    id: '7',
    nameAr: 'د. هدى محمد الأحمد',
    nameEn: 'Dr. Huda Mohammed Alahmad',
    degreeAr: 'أستاذ مساعد',
    degreeEn: 'Assistant Professor',
    specializationAr: 'الصيدلة السريرية',
    specializationEn: 'Clinical Pharmacy',
    collegeAr: 'كلية الصيدلة',
    collegeEn: 'College of Pharmacy',
    departmentAr: 'قسم الصيدلة السريرية',
    departmentEn: 'Clinical Pharmacy Department',
    email: 'huda.ahmad@ngu.edu',
    phone: '+967 1 234573',
    bioAr: 'متخصصة في العلاج الدوائي والرعاية الصيدلانية',
    bioEn: 'Specialized in drug therapy and pharmaceutical care',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&q=80',
  },
  {
    id: '8',
    nameAr: 'د. طارق إبراهيم السيد',
    nameEn: 'Dr. Tarek Ibrahim Alsayed',
    degreeAr: 'أستاذ دكتور',
    degreeEn: 'Professor',
    specializationAr: 'الهندسة المعمارية',
    specializationEn: 'Architecture',
    collegeAr: 'كلية الهندسة المعمارية',
    collegeEn: 'College of Architecture',
    departmentAr: 'قسم التصميم المعماري',
    departmentEn: 'Architectural Design Department',
    email: 'tarek.sayed@ngu.edu',
    phone: '+967 1 234574',
    bioAr: 'خبير في التصميم المعماري المستدام',
    bioEn: 'Expert in sustainable architectural design',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
  },
  // Deans added to match colleges' dean entries
  {
    id: 'd-medicine',
    nameAr: 'د. سامر الحسن',
    nameEn: 'Dr. Samer Hassan',
    degreeAr: 'عميد الكلية',
    degreeEn: 'Dean',
    specializationAr: 'الطب والقيادة الأكاديمية',
    specializationEn: 'Medicine & Academic Leadership',
    collegeAr: 'كلية الطب البشري',
    collegeEn: 'College of Human Medicine',
    departmentAr: '',
    departmentEn: '',
    email: 'samer.hassan@ngu.edu',
    phone: '+967 1 234580',
    bioAr: 'عميد كلية الطب ومسؤول عن تطوير البرامج الأكاديمية والخدمات الصحية.',
    bioEn: 'Dean of the College of Medicine, responsible for academic programs and health services.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80',
    officeHoursAr: 'بمواعيد تُحدد عبر إدارة الكلية',
    officeHoursEn: 'By appointment via college administration',
    researchInterestsAr: ['التعليم الطبي', 'البحوث السريرية'],
    researchInterestsEn: ['Medical Education', 'Clinical Research'],
  },
  {
    id: 'd-health',
    nameAr: 'د. ليلى منصور',
    nameEn: 'Dr. Laila Mansour',
    degreeAr: 'عميد الكلية',
    degreeEn: 'Dean',
    specializationAr: 'العلوم الصحية',
    specializationEn: 'Health Sciences',
    collegeAr: 'كلية العلوم الطبية والصحية',
    collegeEn: 'College of Medical and Health Sciences',
    departmentAr: '',
    departmentEn: '',
    email: 'laila.mansour@ngu.edu',
    phone: '+967 1 234581',
    bioAr: 'عميدة كلية العلوم الطبية والصحية وتقود مبادرات الصحة العامة.',
    bioEn: 'Dean of the College of Medical and Health Sciences leading public health initiatives.',
    image: 'https://images.unsplash.com/photo-1545996124-1c6a5c9b8f4a?w=400&q=80',
    officeHoursAr: 'تواصل مع سكرتارية الكلية',
    officeHoursEn: 'Contact the college secretary',
    researchInterestsAr: ['الصحة العامة', 'التغذية السريرية'],
    researchInterestsEn: ['Public Health', 'Clinical Nutrition'],
  },
  {
    id: 'd-engineering',
    nameAr: 'د. كريم فؤاد الخطيب',
    nameEn: 'Dr. Karim Fouad',
    degreeAr: 'عميد الكلية',
    degreeEn: 'Dean',
    specializationAr: 'الهندسة والتكنولوجيا',
    specializationEn: 'Engineering & Technology',
    collegeAr: 'كلية الهندسة وتكنولوجيا المعلومات',
    collegeEn: 'College of Engineering and Information Technology',
    departmentAr: '',
    departmentEn: '',
    email: 'karim.fouad@ngu.edu',
    phone: '+967 1 234582',
    bioAr: 'عميد الكلية مع خبرة واسعة في الابتكار الهندسي.',
    bioEn: 'College dean with extensive experience in engineering innovation.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    officeHoursAr: 'من خلال مكتب العميد',
    officeHoursEn: 'Via the dean office',
    researchInterestsAr: ['الطاقة المتجددة', 'التقنيات الحديثة'],
    researchInterestsEn: ['Renewable Energy', 'Modern Technologies'],
  },
];

export const facultyService = {
  // Get all faculty members (basic info)
  getAllMembers: async (): Promise<FacultyMember[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    // TODO: Replace with Supabase call
    // const { data, error } = await supabase.from('faculty_members').select('*');
    return mockFacultyMembers;
  },

  // Get faculty member by ID with full details
  getMemberById: async (id: string): Promise<FacultyMemberDetail | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    // TODO: Replace with Supabase call
    // const { data, error } = await supabase
    //   .from('faculty_members')
    //   .select('*, publications(*), courses(*), education(*), experience(*)')
    //   .eq('id', id)
    //   .single();
    return mockFacultyMembers.find(member => member.id === id);
  },

  // Search faculty members
  searchMembers: async (query: string): Promise<FacultyMember[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const lowerQuery = query.toLowerCase();
    // TODO: Replace with Supabase full-text search
    return mockFacultyMembers.filter(
      member =>
        member.nameAr.toLowerCase().includes(lowerQuery) ||
        member.nameEn.toLowerCase().includes(lowerQuery) ||
        member.specializationAr.toLowerCase().includes(lowerQuery) ||
        member.specializationEn.toLowerCase().includes(lowerQuery)
    );
  },

  // Filter by college
  filterByCollege: async (college: string): Promise<FacultyMember[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    // TODO: Replace with Supabase filter
    return mockFacultyMembers.filter(
      member => member.collegeAr === college || member.collegeEn === college
    );
  },

  // Filter by degree
  filterByDegree: async (degree: string): Promise<FacultyMember[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockFacultyMembers.filter(
      member => member.degreeAr === degree || member.degreeEn === degree
    );
  },

  // Filter by specialization
  filterBySpecialization: async (specialization: string): Promise<FacultyMember[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockFacultyMembers.filter(
      member => member.specializationAr === specialization || member.specializationEn === specialization
    );
  },

  // Advanced filter with multiple criteria
  filterMembers: async (filters: {
    college?: string;
    degree?: string;
    specialization?: string;
    search?: string;
  }): Promise<FacultyMember[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    let filtered = [...mockFacultyMembers];

    if (filters.college && filters.college !== 'all') {
      filtered = filtered.filter(
        m => m.collegeAr === filters.college || m.collegeEn === filters.college
      );
    }

    if (filters.degree && filters.degree !== 'all') {
      filtered = filtered.filter(
        m => m.degreeAr === filters.degree || m.degreeEn === filters.degree
      );
    }

    if (filters.specialization && filters.specialization !== 'all') {
      filtered = filtered.filter(
        m => m.specializationAr === filters.specialization || m.specializationEn === filters.specialization
      );
    }

    if (filters.search) {
      const query = filters.search.toLowerCase();
      filtered = filtered.filter(
        m =>
          m.nameAr.toLowerCase().includes(query) ||
          m.nameEn.toLowerCase().includes(query) ||
          m.specializationAr.toLowerCase().includes(query) ||
          m.specializationEn.toLowerCase().includes(query)
      );
    }

    return filtered;
  },

  // Get unique colleges for filter dropdown
  getColleges: async (): Promise<{ ar: string; en: string }[]> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    const colleges = new Map<string, { ar: string; en: string }>();
    mockFacultyMembers.forEach(m => {
      colleges.set(m.collegeEn, { ar: m.collegeAr, en: m.collegeEn });
    });
    return Array.from(colleges.values());
  },

  // Get unique degrees for filter dropdown
  getDegrees: async (): Promise<{ ar: string; en: string }[]> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    const degrees = new Map<string, { ar: string; en: string }>();
    mockFacultyMembers.forEach(m => {
      degrees.set(m.degreeEn, { ar: m.degreeAr, en: m.degreeEn });
    });
    return Array.from(degrees.values());
  },

  // Get unique specializations for filter dropdown
  getSpecializations: async (): Promise<{ ar: string; en: string }[]> => {
    await new Promise(resolve => setTimeout(resolve, 100));
    const specs = new Map<string, { ar: string; en: string }>();
    mockFacultyMembers.forEach(m => {
      specs.set(m.specializationEn, { ar: m.specializationAr, en: m.specializationEn });
    });
    return Array.from(specs.values());
  },
};
