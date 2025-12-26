import { College, AcademicProgram } from '@/types';

const mockColleges: College[] = [
  {
    id: 'medicine',
    slug: 'medicine',
    nameAr: 'كلية الطب البشري',
    nameEn: 'College of Human Medicine',
    descriptionAr: 'كلية الطب البشري تقدم برنامجاً أكاديمياً متميزاً لإعداد أطباء مؤهلين لخدمة المجتمع',
    descriptionEn: 'The College of Human Medicine offers an outstanding academic program to prepare qualified physicians to serve the community',
    visionAr: 'أن نكون كلية طبية رائدة في المنطقة تقدم تعليماً طبياً متميزاً',
    visionEn: 'To be a leading medical college in the region providing distinguished medical education',
    missionAr: 'إعداد أطباء أكفاء مزودين بالمعرفة والمهارات اللازمة لتقديم رعاية صحية عالية الجودة',
    missionEn: 'Preparing competent physicians equipped with the knowledge and skills to provide high-quality healthcare',
    programs: [
      {
        id: 'med-1',
        nameAr: 'برنامج طب وجراحة',
        nameEn: 'Medicine and Surgery Program',
        departmentAr: '',
        departmentEn: '',
        admissionRate: 78,
        highSchoolType: 'علمي',
        highSchoolTypeEn: 'Scientific',
        studyYears: '1 + 6',
        image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80',
        descriptionAr: 'برنامج الطب والجراحة يهدف إلى إعداد أطباء متميزين قادرين على تقديم الرعاية الصحية الشاملة',
        descriptionEn: 'The Medicine and Surgery program aims to prepare distinguished physicians capable of providing comprehensive healthcare',
        objectives: [
          { id: '1', textAr: 'إعداد أطباء مؤهلين علمياً وعملياً', textEn: 'Prepare scientifically and practically qualified physicians' },
          { id: '2', textAr: 'تطوير مهارات التشخيص والعلاج', textEn: 'Develop diagnostic and treatment skills' },
          { id: '3', textAr: 'تعزيز القيم الأخلاقية في الممارسة الطبية', textEn: 'Promote ethical values in medical practice' },
        ],
        careerProspectsAr: ['طبيب عام', 'طبيب متخصص', 'باحث طبي', 'أستاذ جامعي'],
        careerProspectsEn: ['General Physician', 'Specialist Doctor', 'Medical Researcher', 'University Professor'],
        facultyMembers: [
          { id: 'f1', nameAr: 'د. أحمد محمود الحسن', nameEn: 'Dr. Ahmed Mahmoud', titleAr: 'أستاذ دكتور', titleEn: 'Professor', image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&q=80' },
          { id: 'f2', nameAr: 'د. سلمى خالد العمر', nameEn: 'Dr. Salma Khaled', titleAr: 'أستاذ مشارك', titleEn: 'Associate Professor', image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&q=80' },
          { id: 'f3', nameAr: 'د. محمد علي الأحمد', nameEn: 'Dr. Mohammed Ali', titleAr: 'أستاذ مساعد', titleEn: 'Assistant Professor', image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&q=80' },
        ],
      },
    ],
    admissionRequirementsAr: 'شهادة الثانوية العامة الفرع العلمي بنسبة لا تقل عن 78%',
    admissionRequirementsEn: 'High school certificate scientific branch with a minimum of 78%',
    icon: 'Stethoscope',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=1200&q=80',
  },
  {
    id: 'health-sciences',
    slug: 'health-sciences',
    nameAr: 'كلية العلوم الطبية والصحية',
    nameEn: 'College of Medical and Health Sciences',
    descriptionAr: 'كلية متخصصة في العلوم الطبية والصحية تقدم برامج متنوعة في مجالات الصحة المختلفة',
    descriptionEn: 'A specialized college in medical and health sciences offering various programs in different health fields',
    visionAr: 'الريادة في التعليم الصحي وإعداد كوادر صحية متميزة',
    visionEn: 'Leadership in health education and preparing distinguished health cadres',
    missionAr: 'تخريج متخصصين في العلوم الصحية مؤهلين لسوق العمل',
    missionEn: 'Graduating health science specialists qualified for the job market',
    programs: [
      {
        id: 'hs-1',
        nameAr: 'طب وجراحة الفم والاسنان',
        nameEn: 'Oral and Dental Medicine and Surgery',
        departmentAr: 'قسم طب وجراحة الفم والاسنان',
        departmentEn: 'Department of Oral and Dental Medicine and Surgery',
        admissionRate: 75,
        highSchoolType: 'علمي',
        highSchoolTypeEn: 'Scientific',
        studyYears: '1 + 5',
        image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&q=80',
        descriptionAr: 'برنامج متخصص في طب الأسنان يؤهل الخريجين لممارسة طب الفم والأسنان بكفاءة عالية',
        descriptionEn: 'A specialized program in dentistry that qualifies graduates to practice oral and dental medicine with high efficiency',
        objectives: [
          { id: '1', textAr: 'تأهيل أطباء أسنان متميزين', textEn: 'Qualify distinguished dentists' },
          { id: '2', textAr: 'تطوير المهارات السريرية والعملية', textEn: 'Develop clinical and practical skills' },
          { id: '3', textAr: 'تعزيز البحث العلمي في طب الأسنان', textEn: 'Promote scientific research in dentistry' },
        ],
        careerProspectsAr: ['طبيب أسنان عام', 'أخصائي تقويم', 'جراح فم', 'طبيب أسنان أطفال'],
        careerProspectsEn: ['General Dentist', 'Orthodontist', 'Oral Surgeon', 'Pediatric Dentist'],
        facultyMembers: [
          { id: 'f1', nameAr: 'د. يوسف عبد الله النجار', nameEn: 'Dr. Youssef Abdullah', titleAr: 'أستاذ دكتور', titleEn: 'Professor', image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=200&q=80' },
          { id: 'f2', nameAr: 'د. هدى محمد الأحمد', nameEn: 'Dr. Huda Mohammed', titleAr: 'أستاذ مشارك', titleEn: 'Associate Professor', image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&q=80' },
        ],
      },
      {
        id: 'hs-2',
        nameAr: 'دكتور صيدلة',
        nameEn: 'Doctor of Pharmacy',
        departmentAr: 'قسم الصيدلة',
        departmentEn: 'Department of Pharmacy',
        admissionRate: 70,
        highSchoolType: 'علمي',
        highSchoolTypeEn: 'Scientific',
        studyYears: '1 + 5',
        image: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=800&q=80',
        descriptionAr: 'برنامج الصيدلة يعد الخريجين للعمل في مختلف مجالات الصيدلة والرعاية الدوائية',
        descriptionEn: 'The pharmacy program prepares graduates for various pharmacy and pharmaceutical care fields',
        objectives: [
          { id: '1', textAr: 'إعداد صيادلة مؤهلين مهنياً', textEn: 'Prepare professionally qualified pharmacists' },
          { id: '2', textAr: 'تطوير مهارات الرعاية الصيدلانية', textEn: 'Develop pharmaceutical care skills' },
        ],
        careerProspectsAr: ['صيدلي مستشفيات', 'صيدلي مجتمعي', 'باحث دوائي', 'مسؤول شؤون تنظيمية'],
        careerProspectsEn: ['Hospital Pharmacist', 'Community Pharmacist', 'Drug Researcher', 'Regulatory Affairs'],
        facultyMembers: [
          { id: 'f1', nameAr: 'د. مريم حسين الشامي', nameEn: 'Dr. Maryam Hussein', titleAr: 'أستاذ دكتور', titleEn: 'Professor', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80' },
          { id: 'f2', nameAr: 'د. طارق إبراهيم السيد', nameEn: 'Dr. Tarek Ibrahim', titleAr: 'أستاذ مساعد', titleEn: 'Assistant Professor', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80' },
        ],
      },
      {
        id: 'hs-3',
        nameAr: 'الطب المخبري',
        nameEn: 'Medical Laboratory',
        departmentAr: 'قسم الطب المخبري',
        departmentEn: 'Department of Medical Laboratory',
        admissionRate: 65,
        highSchoolType: 'علمي',
        highSchoolTypeEn: 'Scientific',
        studyYears: '1 + 4',
        image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&q=80',
        descriptionAr: 'برنامج يؤهل الخريجين للعمل في مختبرات التحاليل الطبية',
        descriptionEn: 'A program that qualifies graduates to work in medical analysis laboratories',
        objectives: [
          { id: '1', textAr: 'إتقان تقنيات التحليل المخبري', textEn: 'Master laboratory analysis techniques' },
          { id: '2', textAr: 'فهم الأمراض وتشخيصها مخبرياً', textEn: 'Understand diseases and laboratory diagnosis' },
        ],
        careerProspectsAr: ['فني مختبرات', 'أخصائي تحاليل', 'باحث مخبري'],
        careerProspectsEn: ['Lab Technician', 'Analysis Specialist', 'Laboratory Researcher'],
      },
      {
        id: 'hs-4',
        nameAr: 'طب الطوارئ',
        nameEn: 'Emergency Medicine',
        departmentAr: 'قسم طب الطوارئ',
        departmentEn: 'Department of Emergency Medicine',
        admissionRate: 65,
        highSchoolType: 'علمي',
        highSchoolTypeEn: 'Scientific',
        studyYears: '1 + 4',
        image: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&q=80',
        descriptionAr: 'برنامج متخصص في طب الطوارئ والإسعافات الأولية',
        descriptionEn: 'A specialized program in emergency medicine and first aid',
        objectives: [
          { id: '1', textAr: 'التعامل مع الحالات الطارئة بكفاءة', textEn: 'Handle emergency cases efficiently' },
          { id: '2', textAr: 'إتقان تقنيات الإنعاش والإسعاف', textEn: 'Master resuscitation and first aid techniques' },
        ],
        careerProspectsAr: ['فني طوارئ', 'مسعف', 'منسق طوارئ'],
        careerProspectsEn: ['Emergency Technician', 'Paramedic', 'Emergency Coordinator'],
      },
    ],
    admissionRequirementsAr: 'شهادة الثانوية العامة الفرع العلمي',
    admissionRequirementsEn: 'High school certificate scientific branch',
    icon: 'Heart',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1200&q=80',
  },
  {
    id: 'engineering-it',
    slug: 'engineering-it',
    nameAr: 'كلية الهندسة وتكنولوجيا المعلومات',
    nameEn: 'College of Engineering and Information Technology',
    descriptionAr: 'كلية رائدة في مجالات الهندسة والتكنولوجيا تقدم برامج حديثة تواكب سوق العمل',
    descriptionEn: 'A leading college in engineering and technology fields offering modern programs that meet market demands',
    visionAr: 'أن نكون مركزاً للتميز في التعليم الهندسي والتقني',
    visionEn: 'To be a center of excellence in engineering and technical education',
    missionAr: 'تخريج مهندسين وتقنيين مؤهلين لمواكبة التطور التكنولوجي',
    missionEn: 'Graduating engineers and technicians qualified to keep pace with technological development',
    programs: [
      {
        id: 'eng-1',
        nameAr: 'هندسة ميكاترونكس',
        nameEn: 'Mechatronics Engineering',
        departmentAr: 'قسم هندسة الميكاترونكس',
        departmentEn: 'Department of Mechatronics Engineering',
        admissionRate: 65,
        highSchoolType: 'علمي',
        highSchoolTypeEn: 'Scientific',
        studyYears: '4',
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
        descriptionAr: 'برنامج يجمع بين الهندسة الميكانيكية والإلكترونية والبرمجة',
        descriptionEn: 'A program combining mechanical, electronic engineering and programming',
        objectives: [
          { id: '1', textAr: 'تصميم وبناء الأنظمة الآلية', textEn: 'Design and build automated systems' },
          { id: '2', textAr: 'دمج التخصصات الهندسية المختلفة', textEn: 'Integrate different engineering disciplines' },
        ],
        careerProspectsAr: ['مهندس ميكاترونكس', 'مهندس أتمتة', 'مهندس روبوتات'],
        careerProspectsEn: ['Mechatronics Engineer', 'Automation Engineer', 'Robotics Engineer'],
        facultyMembers: [
          { id: 'f1', nameAr: 'د. كريم فؤاد الخطيب', nameEn: 'Dr. Karim Fouad', titleAr: 'أستاذ دكتور', titleEn: 'Professor', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80' },
          { id: 'f2', nameAr: 'د. نور الدين سعيد العلي', nameEn: 'Dr. Noureddine Saeed', titleAr: 'أستاذ مشارك', titleEn: 'Associate Professor', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80' },
        ],
      },
      {
        id: 'eng-2',
        nameAr: 'هندسة الطاقة المتجددة',
        nameEn: 'Renewable Energy Engineering',
        departmentAr: 'قسم هندسة الطاقة المتجددة',
        departmentEn: 'Department of Renewable Energy Engineering',
        admissionRate: 65,
        highSchoolType: 'علمي',
        highSchoolTypeEn: 'Scientific',
        studyYears: '4',
        image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&q=80',
        descriptionAr: 'برنامج متخصص في مصادر الطاقة المتجددة والمستدامة',
        descriptionEn: 'A specialized program in renewable and sustainable energy sources',
        objectives: [
          { id: '1', textAr: 'تصميم أنظمة الطاقة الشمسية', textEn: 'Design solar energy systems' },
          { id: '2', textAr: 'تطوير حلول الطاقة النظيفة', textEn: 'Develop clean energy solutions' },
        ],
        careerProspectsAr: ['مهندس طاقة شمسية', 'مستشار طاقة', 'مهندس بيئي'],
        careerProspectsEn: ['Solar Energy Engineer', 'Energy Consultant', 'Environmental Engineer'],
      },
      {
        id: 'eng-3',
        nameAr: 'الهندسة الطبية الحيوية',
        nameEn: 'Biomedical Engineering',
        departmentAr: 'قسم الهندسة الطبية الحيوية',
        departmentEn: 'Department of Biomedical Engineering',
        admissionRate: 65,
        highSchoolType: 'علمي',
        highSchoolTypeEn: 'Scientific',
        studyYears: '4',
        image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&q=80',
        descriptionAr: 'برنامج يجمع بين الهندسة والعلوم الطبية',
        descriptionEn: 'A program combining engineering and medical sciences',
        objectives: [
          { id: '1', textAr: 'تصميم الأجهزة الطبية', textEn: 'Design medical devices' },
          { id: '2', textAr: 'صيانة المعدات الطبية', textEn: 'Maintain medical equipment' },
        ],
        careerProspectsAr: ['مهندس أجهزة طبية', 'فني صيانة', 'باحث طبي حيوي'],
        careerProspectsEn: ['Medical Devices Engineer', 'Maintenance Technician', 'Biomedical Researcher'],
      },
      {
        id: 'eng-4',
        nameAr: 'تكنولوجيا المعلومات',
        nameEn: 'Information Technology',
        departmentAr: 'قسم تكنولوجيا المعلومات',
        departmentEn: 'Department of Information Technology',
        admissionRate: 55,
        highSchoolType: 'علمي',
        highSchoolTypeEn: 'Scientific',
        studyYears: '4',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
        descriptionAr: 'برنامج شامل في تقنية المعلومات والأنظمة',
        descriptionEn: 'A comprehensive program in information technology and systems',
        objectives: [
          { id: '1', textAr: 'تطوير البرمجيات والتطبيقات', textEn: 'Develop software and applications' },
          { id: '2', textAr: 'إدارة الشبكات والأنظمة', textEn: 'Manage networks and systems' },
        ],
        careerProspectsAr: ['مطور برمجيات', 'مدير نظم', 'محلل بيانات'],
        careerProspectsEn: ['Software Developer', 'System Administrator', 'Data Analyst'],
      },
      {
        id: 'eng-5',
        nameAr: 'الأمن السيبراني',
        nameEn: 'Cybersecurity',
        departmentAr: 'قسم الأمن السيبراني',
        departmentEn: 'Department of Cybersecurity',
        admissionRate: 60,
        highSchoolType: 'علمي',
        highSchoolTypeEn: 'Scientific',
        studyYears: '4',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80',
        descriptionAr: 'برنامج متخصص في أمن المعلومات والحماية السيبرانية',
        descriptionEn: 'A specialized program in information security and cyber protection',
        objectives: [
          { id: '1', textAr: 'حماية الأنظمة من الاختراق', textEn: 'Protect systems from hacking' },
          { id: '2', textAr: 'تحليل التهديدات الأمنية', textEn: 'Analyze security threats' },
        ],
        careerProspectsAr: ['محلل أمن سيبراني', 'مختبر اختراق', 'مستشار أمني'],
        careerProspectsEn: ['Cybersecurity Analyst', 'Penetration Tester', 'Security Consultant'],
      },
      {
        id: 'eng-6',
        nameAr: 'الذكاء الاصطناعي',
        nameEn: 'Artificial Intelligence',
        departmentAr: 'قسم الذكاء الاصطناعي',
        departmentEn: 'Department of Artificial Intelligence',
        admissionRate: 60,
        highSchoolType: 'علمي',
        highSchoolTypeEn: 'Scientific',
        studyYears: '4',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
        descriptionAr: 'برنامج متقدم في الذكاء الاصطناعي وتعلم الآلة',
        descriptionEn: 'An advanced program in artificial intelligence and machine learning',
        objectives: [
          { id: '1', textAr: 'تطوير نماذج الذكاء الاصطناعي', textEn: 'Develop AI models' },
          { id: '2', textAr: 'تطبيق تقنيات تعلم الآلة', textEn: 'Apply machine learning techniques' },
        ],
        careerProspectsAr: ['مهندس ذكاء اصطناعي', 'عالم بيانات', 'مطور تعلم آلة'],
        careerProspectsEn: ['AI Engineer', 'Data Scientist', 'ML Developer'],
        facultyMembers: [
          { id: 'f1', nameAr: 'د. سلمى خالد العمر', nameEn: 'Dr. Salma Khaled', titleAr: 'أستاذ مشارك', titleEn: 'Associate Professor', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80' },
          { id: 'f2', nameAr: 'د. أحمد محمود الحسن', nameEn: 'Dr. Ahmed Mahmoud', titleAr: 'أستاذ دكتور', titleEn: 'Professor', image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&q=80' },
          { id: 'f3', nameAr: 'د. مريم حسين الشامي', nameEn: 'Dr. Maryam Hussein', titleAr: 'أستاذ مساعد', titleEn: 'Assistant Professor', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80' },
        ],
      },
      {
        id: 'eng-7',
        nameAr: 'جرافيك وملتيميديا',
        nameEn: 'Graphics and Multimedia',
        departmentAr: 'قسم التصميم',
        departmentEn: 'Department of Design',
        admissionRate: 60,
        highSchoolType: 'علمي',
        highSchoolTypeEn: 'Scientific',
        studyYears: '4',
        image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80',
        descriptionAr: 'برنامج إبداعي في التصميم الجرافيكي والوسائط المتعددة',
        descriptionEn: 'A creative program in graphic design and multimedia',
        objectives: [
          { id: '1', textAr: 'إتقان أدوات التصميم', textEn: 'Master design tools' },
          { id: '2', textAr: 'إنتاج محتوى إبداعي', textEn: 'Produce creative content' },
        ],
        careerProspectsAr: ['مصمم جرافيك', 'مصمم UI/UX', 'منتج محتوى'],
        careerProspectsEn: ['Graphic Designer', 'UI/UX Designer', 'Content Producer'],
      },
      {
        id: 'eng-8',
        nameAr: 'التصميم الداخلي',
        nameEn: 'Interior Design',
        departmentAr: 'قسم التصميم',
        departmentEn: 'Department of Design',
        admissionRate: 63,
        highSchoolType: 'علمي',
        highSchoolTypeEn: 'Scientific',
        studyYears: '4',
        image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80',
        descriptionAr: 'برنامج متخصص في تصميم المساحات الداخلية',
        descriptionEn: 'A specialized program in interior space design',
        objectives: [
          { id: '1', textAr: 'تصميم المساحات الداخلية', textEn: 'Design interior spaces' },
          { id: '2', textAr: 'اختيار المواد والألوان', textEn: 'Select materials and colors' },
        ],
        careerProspectsAr: ['مصمم داخلي', 'مهندس ديكور', 'مستشار تصميم'],
        careerProspectsEn: ['Interior Designer', 'Decor Engineer', 'Design Consultant'],
      },
    ],
    admissionRequirementsAr: 'شهادة الثانوية العامة الفرع العلمي',
    admissionRequirementsEn: 'High school certificate scientific branch',
    icon: 'Laptop',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80',
  },
  {
    id: 'business-humanities',
    slug: 'business-humanities',
    nameAr: 'كلية العلوم الإدارية والانسانية',
    nameEn: 'College of Administrative and Humanitarian Sciences',
    descriptionAr: 'كلية تقدم برامج متنوعة في مجالات الإدارة والعلوم الإنسانية',
    descriptionEn: 'A college offering diverse programs in management and humanities fields',
    visionAr: 'الريادة في التعليم الإداري والإنساني بمعايير عالمية',
    visionEn: 'Leadership in administrative and humanitarian education with global standards',
    missionAr: 'إعداد كوادر مؤهلة في مجالات الإدارة والعلوم الإنسانية',
    missionEn: 'Preparing qualified cadres in management and humanities fields',
    programs: [
      {
        id: 'bus-1',
        nameAr: 'نظم المعلومات الادارية',
        nameEn: 'Management Information Systems',
        departmentAr: 'قسم نظم المعلومات الادارية',
        departmentEn: 'Department of Management Information Systems',
        admissionRate: 55,
        highSchoolType: 'علمي + ادبي',
        highSchoolTypeEn: 'Scientific + Literary',
        studyYears: '4',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
        descriptionAr: 'برنامج يجمع بين تقنية المعلومات والإدارة',
        descriptionEn: 'A program combining IT and management',
        objectives: [
          { id: '1', textAr: 'تطوير نظم المعلومات الإدارية', textEn: 'Develop MIS systems' },
          { id: '2', textAr: 'تحليل البيانات التجارية', textEn: 'Analyze business data' },
        ],
        careerProspectsAr: ['محلل نظم', 'مدير مشاريع IT', 'مستشار تقني'],
        careerProspectsEn: ['Systems Analyst', 'IT Project Manager', 'Technical Consultant'],
      },
      {
        id: 'bus-2',
        nameAr: 'ادارة الاعمال الدولية عربي',
        nameEn: 'International Business Administration (Arabic)',
        departmentAr: 'قسم ادارة الاعمال الدولية',
        departmentEn: 'Department of International Business Administration',
        admissionRate: 50,
        highSchoolType: 'علمي + ادبي',
        highSchoolTypeEn: 'Scientific + Literary',
        studyYears: '4',
        image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80',
        descriptionAr: 'برنامج إدارة الأعمال باللغة العربية',
        descriptionEn: 'Business administration program in Arabic',
        careerProspectsAr: ['مدير أعمال', 'رائد أعمال', 'مستشار إداري'],
        careerProspectsEn: ['Business Manager', 'Entrepreneur', 'Management Consultant'],
      },
      {
        id: 'bus-3',
        nameAr: 'ادارة الاعمال الدولية انجليزي',
        nameEn: 'International Business Administration (English)',
        departmentAr: 'قسم ادارة الاعمال الدولية',
        departmentEn: 'Department of International Business Administration',
        admissionRate: 50,
        highSchoolType: 'علمي + ادبي',
        highSchoolTypeEn: 'Scientific + Literary',
        studyYears: '4',
        image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
        descriptionAr: 'برنامج إدارة الأعمال باللغة الإنجليزية',
        descriptionEn: 'Business administration program in English',
        careerProspectsAr: ['مدير أعمال دولي', 'مدير تسويق', 'مستشار استراتيجي'],
        careerProspectsEn: ['International Business Manager', 'Marketing Manager', 'Strategy Consultant'],
      },
      {
        id: 'bus-4',
        nameAr: 'العلوم المالية والمصرفية (بنوك وتأمينات)',
        nameEn: 'Financial and Banking Sciences (Banks and Insurance)',
        departmentAr: 'قسم العلوم المالية والمصرفية',
        departmentEn: 'Department of Financial and Banking Sciences',
        admissionRate: 50,
        highSchoolType: 'علمي + ادبي',
        highSchoolTypeEn: 'Scientific + Literary',
        studyYears: '4',
        image: 'https://images.unsplash.com/photo-1601597111158-2fceff292cdc?w=800&q=80',
        descriptionAr: 'برنامج متخصص في العلوم المالية والمصرفية',
        descriptionEn: 'A specialized program in financial and banking sciences',
        careerProspectsAr: ['محلل مالي', 'موظف بنكي', 'خبير تأمين'],
        careerProspectsEn: ['Financial Analyst', 'Bank Officer', 'Insurance Expert'],
      },
      {
        id: 'bus-5',
        nameAr: 'التسويق الرقمي',
        nameEn: 'Digital Marketing',
        departmentAr: 'قسم التسويق',
        departmentEn: 'Department of Marketing',
        admissionRate: 55,
        highSchoolType: 'علمي + ادبي',
        highSchoolTypeEn: 'Scientific + Literary',
        studyYears: '4',
        image: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800&q=80',
        descriptionAr: 'برنامج متخصص في التسويق الرقمي والإلكتروني',
        descriptionEn: 'A specialized program in digital and electronic marketing',
        careerProspectsAr: ['مدير تسويق رقمي', 'أخصائي SEO', 'مدير وسائل التواصل'],
        careerProspectsEn: ['Digital Marketing Manager', 'SEO Specialist', 'Social Media Manager'],
      },
      {
        id: 'bus-6',
        nameAr: 'المحاسبة',
        nameEn: 'Accounting',
        departmentAr: 'قسم المحاسبة',
        departmentEn: 'Department of Accounting',
        admissionRate: 50,
        highSchoolType: 'علمي + ادبي',
        highSchoolTypeEn: 'Scientific + Literary',
        studyYears: '4',
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80',
        descriptionAr: 'برنامج شامل في المحاسبة والتدقيق',
        descriptionEn: 'A comprehensive program in accounting and auditing',
        careerProspectsAr: ['محاسب', 'مدقق حسابات', 'مدير مالي'],
        careerProspectsEn: ['Accountant', 'Auditor', 'Financial Manager'],
      },
      {
        id: 'bus-7',
        nameAr: 'الترجمة',
        nameEn: 'Translation',
        departmentAr: 'قسم الترجمة',
        departmentEn: 'Department of Translation',
        admissionRate: 50,
        highSchoolType: 'علمي + ادبي',
        highSchoolTypeEn: 'Scientific + Literary',
        studyYears: '4',
        image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80',
        descriptionAr: 'برنامج متخصص في الترجمة التحريرية والفورية',
        descriptionEn: 'A specialized program in written and simultaneous translation',
        careerProspectsAr: ['مترجم محترف', 'مترجم فوري', 'مدقق لغوي'],
        careerProspectsEn: ['Professional Translator', 'Interpreter', 'Proofreader'],
      },
      {
        id: 'bus-8',
        nameAr: 'الاعلام الجديد',
        nameEn: 'New Media',
        departmentAr: 'قسم الاعلام والاتصال',
        departmentEn: 'Department of Media and Communication',
        admissionRate: 55,
        highSchoolType: 'علمي + ادبي',
        highSchoolTypeEn: 'Scientific + Literary',
        studyYears: '4',
        image: 'https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?w=800&q=80',
        descriptionAr: 'برنامج متخصص في الإعلام الرقمي والاتصال',
        descriptionEn: 'A specialized program in digital media and communication',
        careerProspectsAr: ['صحفي رقمي', 'منتج محتوى', 'مدير علاقات عامة'],
        careerProspectsEn: ['Digital Journalist', 'Content Producer', 'PR Manager'],
      },
      {
        id: 'bus-9',
        nameAr: 'القانون',
        nameEn: 'Law',
        departmentAr: 'قسم القانون',
        departmentEn: 'Department of Law',
        admissionRate: 50,
        highSchoolType: 'علمي + ادبي',
        highSchoolTypeEn: 'Scientific + Literary',
        studyYears: '4',
        image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80',
        descriptionAr: 'برنامج شامل في الدراسات القانونية',
        descriptionEn: 'A comprehensive program in legal studies',
        careerProspectsAr: ['محامي', 'مستشار قانوني', 'قاضي'],
        careerProspectsEn: ['Lawyer', 'Legal Consultant', 'Judge'],
      },
    ],
    admissionRequirementsAr: 'شهادة الثانوية العامة (علمي أو أدبي)',
    admissionRequirementsEn: 'High school certificate (Scientific or Literary)',
    icon: 'Building2',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&q=80',
  },
];

export const collegesService = {
  getAllColleges: async (): Promise<College[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockColleges;
  },

  getCollegeById: async (id: string): Promise<College | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockColleges.find(college => college.id === id);
  },

  getCollegeBySlug: async (slug: string): Promise<College | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockColleges.find(
      college =>
        college.slug === slug ||
        college.nameEn.toLowerCase().replace(/\s+/g, '-') === slug ||
        college.nameAr.replace(/\s+/g, '-') === slug
    );
  },

  getProgramById: async (collegeId: string, programId: string): Promise<{ college: College; program: AcademicProgram } | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const college = mockColleges.find(c => c.id === collegeId);
    if (college) {
      const program = college.programs.find(p => p.id === programId);
      if (program) {
        return { college, program };
      }
    }
    return undefined;
  },

  // CRUD Operations for Admin
  addCollege: async (college: Omit<College, 'id' | 'slug'>): Promise<College> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const newCollege: College = {
      ...college,
      id: Date.now().toString(),
      slug: college.nameEn.toLowerCase().replace(/\s+/g, '-'),
    };
    mockColleges.push(newCollege);
    return newCollege;
  },

  updateCollege: async (id: string, updates: Partial<College>): Promise<College | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = mockColleges.findIndex(c => c.id === id);
    if (index !== -1) {
      mockColleges[index] = { ...mockColleges[index], ...updates };
      return mockColleges[index];
    }
    return undefined;
  },

  deleteCollege: async (id: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = mockColleges.findIndex(c => c.id === id);
    if (index !== -1) {
      mockColleges.splice(index, 1);
      return true;
    }
    return false;
  },

  // Program CRUD
  addProgram: async (collegeId: string, program: Omit<AcademicProgram, 'id'>): Promise<AcademicProgram | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const college = mockColleges.find(c => c.id === collegeId);
    if (college) {
      const newProgram: AcademicProgram = {
        ...program,
        id: Date.now().toString(),
      };
      college.programs.push(newProgram);
      return newProgram;
    }
    return undefined;
  },

  updateProgram: async (collegeId: string, programId: string, updates: Partial<AcademicProgram>): Promise<AcademicProgram | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const college = mockColleges.find(c => c.id === collegeId);
    if (college) {
      const programIndex = college.programs.findIndex(p => p.id === programId);
      if (programIndex !== -1) {
        college.programs[programIndex] = { ...college.programs[programIndex], ...updates };
        return college.programs[programIndex];
      }
    }
    return undefined;
  },

  deleteProgram: async (collegeId: string, programId: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const college = mockColleges.find(c => c.id === collegeId);
    if (college) {
      const programIndex = college.programs.findIndex(p => p.id === programId);
      if (programIndex !== -1) {
        college.programs.splice(programIndex, 1);
        return true;
      }
    }
    return false;
  },
};
