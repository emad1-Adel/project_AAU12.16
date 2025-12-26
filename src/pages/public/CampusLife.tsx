import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';

const galleryItems = [
  { id: 1, titleAr: 'المكتبة الرئيسية', titleEn: 'Main Library', category: 'facilities' },
  { id: 2, titleAr: 'مختبر الحاسوب', titleEn: 'Computer Lab', category: 'facilities' },
  { id: 3, titleAr: 'نشاط رياضي', titleEn: 'Sports Activity', category: 'activities' },
  { id: 4, titleAr: 'ندوة أكاديمية', titleEn: 'Academic Seminar', category: 'activities' },
  { id: 5, titleAr: 'مختبر الهندسة', titleEn: 'Engineering Lab', category: 'facilities' },
  { id: 6, titleAr: 'حفل تخرج', titleEn: 'Graduation Ceremony', category: 'events' },
  { id: 7, titleAr: 'قاعة المؤتمرات', titleEn: 'Conference Hall', category: 'facilities' },
  { id: 8, titleAr: 'نشاط ثقافي', titleEn: 'Cultural Activity', category: 'activities' },
  { id: 9, titleAr: 'الحرم الجامعي', titleEn: 'University Campus', category: 'campus' },
];

export default function CampusLife() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            {t('الحياة الجامعية', 'Campus Life')}
          </h1>
          <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t(
              'استكشف الحياة الجامعية النابضة بالحيوية والمرافق الحديثة',
              'Explore vibrant campus life and modern facilities'
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item, index) => (
            <Card
              key={item.id}
              className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="relative aspect-video bg-secondary/10 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 bg-secondary/20 rounded-full flex items-center justify-center">
                    <span className="text-3xl font-bold text-secondary">{item.id}</span>
                  </div>
                </div>
                <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <p className="text-primary-foreground font-semibold text-lg px-4 text-center">
                    {t(item.titleAr, item.titleEn)}
                  </p>
                </div>
              </div>
              <div className="p-4">
                <p className="font-medium text-center">
                  {t(item.titleAr, item.titleEn)}
                </p>
                <p className="text-sm text-muted-foreground text-center mt-1 capitalize">
                  {item.category}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
