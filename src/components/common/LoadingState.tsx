import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
  messageAr?: string;
  messageEn?: string;
}

export const LoadingState = ({ message, messageAr, messageEn }: LoadingStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4" role="status" aria-live="polite">
      <Loader2 className="w-12 h-12 animate-spin text-secondary" aria-hidden="true" />
      {(message || messageAr || messageEn) && (
        <p className="text-muted-foreground text-lg">
          {message || messageAr || messageEn}
        </p>
      )}
      <span className="sr-only">Loading...</span>
    </div>
  );
};
