import { FileQuestion } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface EmptyStateProps {
  messageAr?: string;
  messageEn?: string;
  icon?: React.ReactNode;
}

export const EmptyState = ({ 
  messageAr = 'لا توجد بيانات لعرضها', 
  messageEn = 'No data to display',
  icon 
}: EmptyStateProps) => {
  const { t } = useLanguage();
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4" role="status">
      {icon || <FileQuestion className="w-16 h-16 text-muted-foreground" aria-hidden="true" />}
      <p className="text-muted-foreground text-lg text-center max-w-md">
        {t(messageAr, messageEn)}
      </p>
    </div>
  );
};
