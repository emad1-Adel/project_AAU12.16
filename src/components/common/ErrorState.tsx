import { AlertCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

interface ErrorStateProps {
  messageAr?: string;
  messageEn?: string;
  onRetry?: () => void;
}

export const ErrorState = ({ 
  messageAr = 'حدث خطأ أثناء تحميل البيانات', 
  messageEn = 'An error occurred while loading data',
  onRetry 
}: ErrorStateProps) => {
  const { t } = useLanguage();
  
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4" role="alert" aria-live="assertive">
      <AlertCircle className="w-16 h-16 text-destructive" aria-hidden="true" />
      <p className="text-muted-foreground text-lg text-center max-w-md">
        {t(messageAr, messageEn)}
      </p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline">
          {t('إعادة المحاولة', 'Retry')}
        </Button>
      )}
    </div>
  );
};
