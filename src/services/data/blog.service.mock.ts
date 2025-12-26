export interface BlogPost {
  id: string;
  title: {
    ar: string;
    en: string;
  };
  excerpt: {
    ar: string;
    en: string;
  };
  content: {
    ar: string;
    en: string;
  };
  author: {
    name: {
      ar: string;
      en: string;
    };
    avatar: string;
    role: {
      ar: string;
      en: string;
    };
  };
  category: {
    ar: string;
    en: string;
  };
  image: string;
  publishedAt: string;
  readTime: number;
  tags: { ar: string; en: string }[];
}

const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: {
      ar: 'نصائح للنجاح في الحياة الجامعية',
      en: 'Tips for Success in University Life'
    },
    excerpt: {
      ar: 'اكتشف أهم النصائح والاستراتيجيات التي ستساعدك على التفوق في دراستك الجامعية وتحقيق أهدافك الأكاديمية.',
      en: 'Discover the top tips and strategies that will help you excel in your university studies and achieve your academic goals.'
    },
    content: {
      ar: `الحياة الجامعية هي مرحلة مهمة في حياة كل طالب، وهي فترة مليئة بالتحديات والفرص. إليك بعض النصائح التي ستساعدك على النجاح:

## 1. إدارة الوقت بفعالية
تعلم كيفية تنظيم وقتك بين الدراسة والأنشطة الاجتماعية والراحة. استخدم تقويمًا أو تطبيقًا لتتبع مواعيدك ومهامك.

## 2. المشاركة الفعالة في الفصل
لا تكتفِ بالحضور فقط، بل شارك في النقاشات واطرح الأسئلة. هذا سيساعدك على فهم المادة بشكل أفضل.

## 3. بناء علاقات مع الأساتذة
الأساتذة هم مصدر قيّم للمعرفة والإرشاد. لا تتردد في زيارتهم خلال ساعات المكتب.

## 4. الاهتمام بالصحة النفسية والجسدية
النجاح الأكاديمي يتطلب صحة جيدة. احرص على النوم الكافي والتغذية السليمة والتمارين الرياضية.`,
      en: `University life is an important phase in every student's life, filled with challenges and opportunities. Here are some tips to help you succeed:

## 1. Manage Your Time Effectively
Learn how to organize your time between studying, social activities, and rest. Use a calendar or app to track your appointments and tasks.

## 2. Active Participation in Class
Don't just attend classes, participate in discussions and ask questions. This will help you understand the material better.

## 3. Build Relationships with Professors
Professors are a valuable source of knowledge and guidance. Don't hesitate to visit them during office hours.

## 4. Take Care of Your Mental and Physical Health
Academic success requires good health. Make sure to get enough sleep, proper nutrition, and regular exercise.`
    },
    author: {
      name: { ar: 'د. أحمد الصالح', en: 'Dr. Ahmed Al-Saleh' },
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      role: { ar: 'أستاذ مشارك', en: 'Associate Professor' }
    },
    category: { ar: 'نصائح أكاديمية', en: 'Academic Tips' },
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=400&fit=crop',
    publishedAt: '2024-01-15',
    readTime: 5,
    tags: [
      { ar: 'نجاح', en: 'Success' },
      { ar: 'دراسة', en: 'Study' },
      { ar: 'نصائح', en: 'Tips' }
    ]
  },
  {
    id: '2',
    title: {
      ar: 'كيف تختار تخصصك الجامعي المناسب؟',
      en: 'How to Choose the Right University Major?'
    },
    excerpt: {
      ar: 'دليل شامل لمساعدتك في اتخاذ قرار اختيار التخصص الجامعي الذي يناسب مهاراتك وطموحاتك.',
      en: 'A comprehensive guide to help you make the decision of choosing a university major that suits your skills and ambitions.'
    },
    content: {
      ar: `اختيار التخصص الجامعي هو من أهم القرارات التي ستتخذها في حياتك. إليك بعض الخطوات لمساعدتك:

## 1. اكتشف نفسك
فكر في ما تحب فعله، وما هي نقاط قوتك وضعفك. هل تفضل العمل مع الأرقام أم الكلمات؟

## 2. ابحث عن التخصصات
تعرف على التخصصات المتاحة وما يتطلبه كل منها من مهارات ودراسة.

## 3. فكر في المستقبل المهني
ما هي الوظائف المتاحة لكل تخصص؟ وما هي فرص العمل في سوق العمل؟

## 4. استشر الآخرين
تحدث مع الطلاب والخريجين والأساتذة للحصول على نصائحهم وتجاربهم.`,
      en: `Choosing a university major is one of the most important decisions you will make in your life. Here are some steps to help you:

## 1. Discover Yourself
Think about what you like to do, and what are your strengths and weaknesses. Do you prefer working with numbers or words?

## 2. Research Majors
Learn about the available majors and what skills and studies each one requires.

## 3. Think About Career Future
What jobs are available for each major? What are the employment opportunities in the job market?

## 4. Consult Others
Talk to students, graduates, and professors to get their advice and experiences.`
    },
    author: {
      name: { ar: 'أ. سارة المحمد', en: 'Ms. Sarah Al-Mohammed' },
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      role: { ar: 'مرشدة أكاديمية', en: 'Academic Counselor' }
    },
    category: { ar: 'إرشاد مهني', en: 'Career Guidance' },
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop',
    publishedAt: '2024-01-10',
    readTime: 7,
    tags: [
      { ar: 'تخصص', en: 'Major' },
      { ar: 'مستقبل', en: 'Future' },
      { ar: 'قرار', en: 'Decision' }
    ]
  },
  {
    id: '3',
    title: {
      ar: 'أهمية الأنشطة اللاصفية في تطوير الشخصية',
      en: 'The Importance of Extracurricular Activities in Personality Development'
    },
    excerpt: {
      ar: 'تعرف على كيف يمكن للأنشطة اللاصفية أن تساهم في تطوير مهاراتك الشخصية والمهنية.',
      en: 'Learn how extracurricular activities can contribute to developing your personal and professional skills.'
    },
    content: {
      ar: `الأنشطة اللاصفية ليست مجرد ترفيه، بل هي جزء أساسي من تجربتك الجامعية. إليك بعض فوائدها:

## 1. تطوير المهارات القيادية
من خلال المشاركة في الأندية والفرق، ستتعلم كيفية قيادة الآخرين والعمل معهم.

## 2. بناء شبكة علاقات
ستتعرف على أشخاص جدد من تخصصات مختلفة، مما يوسع دائرة معارفك.

## 3. تحسين السيرة الذاتية
أصحاب العمل يقدرون الطلاب الذين لديهم تجارب متنوعة خارج الفصل الدراسي.

## 4. اكتشاف اهتمامات جديدة
قد تكتشف شغفًا جديدًا لم تكن تعرف أنه موجود!`,
      en: `Extracurricular activities are not just entertainment, they are an essential part of your university experience. Here are some of their benefits:

## 1. Developing Leadership Skills
Through participation in clubs and teams, you will learn how to lead others and work with them.

## 2. Building a Network
You will meet new people from different majors, expanding your circle of acquaintances.

## 3. Improving Your Resume
Employers value students who have diverse experiences outside the classroom.

## 4. Discovering New Interests
You might discover a new passion you didn't know existed!`
    },
    author: {
      name: { ar: 'م. خالد العمري', en: 'Eng. Khaled Al-Omari' },
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      role: { ar: 'منسق الأنشطة الطلابية', en: 'Student Activities Coordinator' }
    },
    category: { ar: 'حياة طلابية', en: 'Student Life' },
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=400&fit=crop',
    publishedAt: '2024-01-05',
    readTime: 4,
    tags: [
      { ar: 'أنشطة', en: 'Activities' },
      { ar: 'مهارات', en: 'Skills' },
      { ar: 'تطوير', en: 'Development' }
    ]
  },
  {
    id: '4',
    title: {
      ar: 'التعلم الذاتي في العصر الرقمي',
      en: 'Self-Learning in the Digital Age'
    },
    excerpt: {
      ar: 'كيف تستفيد من الموارد الرقمية المتاحة لتعزيز تعليمك وتطوير مهاراتك بشكل مستقل.',
      en: 'How to benefit from available digital resources to enhance your education and develop your skills independently.'
    },
    content: {
      ar: `العصر الرقمي يوفر فرصًا لا محدودة للتعلم. إليك كيفية الاستفادة منها:

## 1. المنصات التعليمية المجانية
هناك العديد من المنصات مثل كورسيرا وإدكس التي تقدم دورات مجانية من أفضل الجامعات.

## 2. القنوات التعليمية على يوتيوب
ستجد شروحات لكل موضوع تقريبًا، من البرمجة إلى الفلسفة.

## 3. الكتب الإلكترونية والمقالات
الإنترنت مليء بالموارد المجانية التي يمكنك قراءتها في أي وقت.

## 4. المجتمعات التعليمية عبر الإنترنت
انضم إلى منتديات ومجموعات تتناول مواضيع تهتم بها.`,
      en: `The digital age provides unlimited opportunities for learning. Here's how to benefit from them:

## 1. Free Educational Platforms
There are many platforms like Coursera and edX that offer free courses from the best universities.

## 2. Educational YouTube Channels
You will find explanations for almost every topic, from programming to philosophy.

## 3. E-books and Articles
The internet is full of free resources that you can read at any time.

## 4. Online Learning Communities
Join forums and groups that discuss topics you're interested in.`
    },
    author: {
      name: { ar: 'د. منى الخطيب', en: 'Dr. Mona Al-Khatib' },
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      role: { ar: 'أستاذة تقنية التعليم', en: 'Educational Technology Professor' }
    },
    category: { ar: 'تقنية التعليم', en: 'Educational Technology' },
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=400&fit=crop',
    publishedAt: '2024-01-01',
    readTime: 6,
    tags: [
      { ar: 'تعلم ذاتي', en: 'Self-learning' },
      { ar: 'تقنية', en: 'Technology' },
      { ar: 'إنترنت', en: 'Internet' }
    ]
  }
];

export const getBlogPosts = (): Promise<BlogPost[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockBlogPosts), 500);
  });
};

export const getBlogPostById = (id: string): Promise<BlogPost | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const post = mockBlogPosts.find(p => p.id === id);
      resolve(post || null);
    }, 300);
  });
};

export const getBlogCategories = (): Promise<{ ar: string; en: string }[]> => {
  const categories = [...new Set(mockBlogPosts.map(p => JSON.stringify(p.category)))].map(c => JSON.parse(c));
  return new Promise((resolve) => {
    setTimeout(() => resolve(categories), 200);
  });
};
