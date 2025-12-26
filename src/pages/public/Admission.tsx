import { useLanguage } from '@/contexts/LanguageContext';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AdmissionSection } from '@/components/AdmissionSection';

const Admission = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const BackArrow = language === 'ar' ? ArrowRight : ArrowLeft;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb items={[{ label: { ar: 'القبول والتسجيل', en: 'Admission' } }]} />
        
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <BackArrow className="w-4 h-4 mx-2" />
          {t('رجوع', 'Back')}
        </Button>

        <div className="mb-12 text-center animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            {t('القبول والتسجيل', 'Admission & Registration')}
          </h1>
          <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t(
              'ابدأ رحلتك الأكاديمية معنا من خلال التقديم الإلكتروني السهل والسريع',
              'Start your academic journey with us through our easy and quick online application'
            )}
          </p>
        </div>

        <AdmissionSection />
      </div>
    </div>
  );
};

export default Admission;
