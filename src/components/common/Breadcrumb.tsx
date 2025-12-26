import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Home } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface BreadcrumbItem {
  label: { ar: string; en: string };
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb = ({ items }: BreadcrumbProps) => {
  const { t, language } = useLanguage();
  const ChevronIcon = language === 'ar' ? ChevronLeft : ChevronRight;
  
  return (
    <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6 animate-fade-in" aria-label="Breadcrumb">
      <Link 
        to="/" 
        className="hover:text-foreground transition-colors flex items-center gap-2"
        aria-label={t('الرئيسية', 'Home')}
      >
        <Home className="w-4 h-4" />
        <span>{t('الرئيسية', 'Home')}</span>
      </Link>
      
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <ChevronIcon className="w-4 h-4" />
          {item.href ? (
            <Link to={item.href} className="hover:text-foreground transition-colors">
              {t(item.label.ar, item.label.en)}
            </Link>
          ) : (
            <span className="text-foreground font-medium">
              {t(item.label.ar, item.label.en)}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
};
