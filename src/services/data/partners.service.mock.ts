import { PartnerItem } from '@/types';

const mockPartners: PartnerItem[] = [
  {
    id: '1',
    nameAr: 'جامعة كامبريدج',
    nameEn: 'Cambridge University',
    logo: '/placeholder.svg',
    type: 'international',
    website: 'https://www.cam.ac.uk',
  },
  {
    id: '2',
    nameAr: 'جامعة أكسفورد',
    nameEn: 'Oxford University',
    logo: '/placeholder.svg',
    type: 'international',
    website: 'https://www.ox.ac.uk',
  },
  {
    id: '3',
    nameAr: 'معهد ماساتشوستس للتكنولوجيا',
    nameEn: 'MIT',
    logo: '/placeholder.svg',
    type: 'international',
    website: 'https://www.mit.edu',
  },
  {
    id: '4',
    nameAr: 'جامعة هارفارد',
    nameEn: 'Harvard University',
    logo: '/placeholder.svg',
    type: 'international',
    website: 'https://www.harvard.edu',
  },
  {
    id: '5',
    nameAr: 'شركة التقنيات المتقدمة',
    nameEn: 'Advanced Technologies Corp',
    logo: '/placeholder.svg',
    type: 'local',
  },
  {
    id: '6',
    nameAr: 'مؤسسة الابتكار',
    nameEn: 'Innovation Foundation',
    logo: '/placeholder.svg',
    type: 'local',
  },
  {
    id: '7',
    nameAr: 'مركز البحوث الصناعية',
    nameEn: 'Industrial Research Center',
    logo: '/placeholder.svg',
    type: 'local',
  },
  {
    id: '8',
    nameAr: 'شركة التطوير الذكي',
    nameEn: 'Smart Development Company',
    logo: '/placeholder.svg',
    type: 'local',
  },
];

export const partnersService = {
  getAll: (): Promise<PartnerItem[]> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockPartners), 300);
    });
  },

  getByType: (type: 'local' | 'international'): Promise<PartnerItem[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockPartners.filter((p) => p.type === type));
      }, 300);
    });
  },
};
