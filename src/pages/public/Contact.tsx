import { useLanguage } from '@/contexts/LanguageContext';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ContactSection } from '@/components/ContactSection';

const Contact = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const BackArrow = language === 'ar' ? ArrowRight : ArrowLeft;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb items={[{ label: { ar: 'تواصل معنا', en: 'Contact Us' } }]} />
        
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <BackArrow className="w-4 h-4 mx-2" />
          {t('رجوع', 'Back')}
        </Button>


        <ContactSection />
      </div>
    </div>
  );
};

export default Contact;
