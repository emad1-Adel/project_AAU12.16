import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Mail, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';

export default function ForgotPassword() {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    setIsSubmitted(true);
    
    toast({
      title: t('تم الإرسال بنجاح', 'Sent Successfully'),
      description: t('تم إرسال رابط استعادة كلمة المرور إلى بريدك الإلكتروني', 'Password reset link has been sent to your email'),
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 flex items-center justify-center py-24 px-4">
        <div className="w-full max-w-md">
          <Card className="p-8 md:p-12 animate-fade-in">
            {!isSubmitted ? (
              <>
                <div className="text-center mb-8">
                  <div className="w-20 h-20 mx-auto bg-secondary/10 rounded-full flex items-center justify-center mb-6">
                    <Mail className="w-10 h-10 text-secondary" />
                  </div>
                  <h1 className="text-3xl font-display font-bold text-foreground mb-3">
                    {t('استعادة كلمة المرور', 'Reset Password')}
                  </h1>
                  <p className="text-muted-foreground">
                    {t(
                      'أدخل بريدك الإلكتروني وسنرسل لك رابطاً لإعادة تعيين كلمة المرور',
                      'Enter your email and we\'ll send you a link to reset your password'
                    )}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-right block text-foreground font-semibold">
                      {t('البريد الإلكتروني', 'Email Address')}
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t('أدخل بريدك الإلكتروني', 'Enter your email')}
                      required
                      className="text-right"
                      dir={language === 'ar' ? 'rtl' : 'ltr'}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-secondary hover:bg-secondary/90 text-primary font-bold py-6"
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                        {t('جاري الإرسال...', 'Sending...')}
                      </span>
                    ) : (
                      <>
                        {t('إرسال رابط الاستعادة', 'Send Reset Link')}
                        <ArrowRight className="w-5 h-5 mr-2" />
                      </>
                    )}
                  </Button>

                  <Link
                    to="/login"
                    className="flex items-center justify-center gap-2 text-secondary hover:text-secondary/80 transition-colors mt-4"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    {t('العودة لتسجيل الدخول', 'Back to Login')}
                  </Link>
                </form>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-20 h-20 mx-auto bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-3">
                  {t('تم الإرسال بنجاح!', 'Email Sent!')}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {t(
                    'تم إرسال رابط استعادة كلمة المرور إلى بريدك الإلكتروني. يرجى التحقق من صندوق الوارد.',
                    'A password reset link has been sent to your email. Please check your inbox.'
                  )}
                </p>
                <p className="text-sm text-muted-foreground mb-8">
                  {email}
                </p>
                
                <div className="space-y-4">
                  <Button
                    onClick={() => navigate('/login')}
                    className="w-full bg-secondary hover:bg-secondary/90 text-primary font-bold py-6"
                  >
                    {t('العودة لتسجيل الدخول', 'Back to Login')}
                  </Button>
                  
                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="text-sm text-muted-foreground hover:text-secondary transition-colors"
                  >
                    {t('لم تستلم البريد؟ أعد المحاولة', 'Didn\'t receive email? Try again')}
                  </button>
                </div>
              </div>
            )}
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
