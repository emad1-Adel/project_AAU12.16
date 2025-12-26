import { OfferItem } from '@/types';

const mockOffers: OfferItem[] = [
  {
    id: '1',
    titleAr: 'منحة التفوق الأكاديمي',
    titleEn: 'Academic Excellence Scholarship',
    descAr: 'منحة كاملة للطلاب المتفوقين تغطي الرسوم الدراسية والسكن',
    descEn: 'Full scholarship for excellent students covering tuition and accommodation',
    image: '/placeholder.svg',
    category: 'scholarship',
    validUntil: '2025-06-30',
  },
  {
    id: '2',
    titleAr: 'برنامج التدريب الصيفي',
    titleEn: 'Summer Training Program',
    descAr: 'برنامج تدريبي مكثف خلال العطلة الصيفية في شركات رائدة',
    descEn: 'Intensive training program during summer break in leading companies',
    image: '/placeholder.svg',
    category: 'training',
    validUntil: '2025-04-30',
  },
  {
    id: '3',
    titleAr: 'خصم الدفع المبكر',
    titleEn: 'Early Payment Discount',
    descAr: 'خصم 20% للطلاب الذين يسددون رسوم الفصل الدراسي مبكرًا',
    descEn: '20% discount for students who pay semester fees early',
    image: '/placeholder.svg',
    category: 'academic',
    validUntil: '2025-02-15',
  },
  {
    id: '4',
    titleAr: 'برنامج التبادل الطلابي',
    titleEn: 'Student Exchange Program',
    descAr: 'فرصة الدراسة لفصل دراسي في جامعات شريكة حول العالم',
    descEn: 'Opportunity to study for a semester at partner universities worldwide',
    image: '/placeholder.svg',
    category: 'academic',
    validUntil: '2025-03-31',
  },
  {
    id: '5',
    titleAr: 'دورة الذكاء الاصطناعي المجانية',
    titleEn: 'Free AI Course',
    descAr: 'دورة تدريبية مجانية في أساسيات الذكاء الاصطناعي',
    descEn: 'Free training course in AI fundamentals',
    image: '/placeholder.svg',
    category: 'training',
    validUntil: '2025-05-31',
  },
  {
    id: '6',
    titleAr: 'منحة البحث العلمي',
    titleEn: 'Research Grant',
    descAr: 'منحة مالية لدعم مشاريع البحث العلمي للطلاب',
    descEn: 'Financial grant to support student research projects',
    image: '/placeholder.svg',
    category: 'scholarship',
    validUntil: '2025-07-31',
  },
];

export const offersService = {
  getAll: (): Promise<OfferItem[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockOffers), 300);
    });
  },

  getByCategory: (category: string): Promise<OfferItem[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (category === 'all') {
          resolve(mockOffers);
        } else {
          resolve(mockOffers.filter((o) => o.category === category));
        }
      }, 300);
    });
  },

  search: (query: string): Promise<OfferItem[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const results = mockOffers.filter(
          (o) =>
            o.titleAr.includes(query) ||
            o.titleEn.toLowerCase().includes(query.toLowerCase()) ||
            o.descAr.includes(query) ||
            o.descEn.toLowerCase().includes(query.toLowerCase())
        );
        resolve(results);
      }, 300);
    });
  },
};
