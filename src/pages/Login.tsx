import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { GraduationCap, User, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

type UserType = 'student' | 'teacher' | null;

export default function Login() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [userType, setUserType] = useState<UserType>(null);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    academicNumber: '',
    password: '',
    phone: '',
    name: '',
    email: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login submitted:', { userType, formData });
    
    // Save user role to localStorage for mock auth
    if (userType) {
      localStorage.setItem('userRole', userType);
    }
    
    // Navigate to appropriate dashboard
    if (userType === 'student') {
      navigate('/student-dashboard');
    } else if (userType === 'teacher') {
      navigate('/doctor-dashboard');
    }
  };

  const teamMembers = [
    'البراء نشوان نعمان',
    'أسامة محمد الرجوي',
    'رياض محمد الروحاني',
    'عماد عادل الكوكباني',
    'حمزة منصور الحرازي',
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 flex items-center justify-center py-24 px-4">
        <div className="w-full max-w-4xl">
          {/* User Type Selection */}
          {!userType && (
            <div className="text-center space-y-8 animate-fade-in">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground">
                  {t('تسجيل الدخول', 'Login')}
                </h1>
                <p className="text-lg text-muted-foreground">
                  {t('اختر نوع الحساب للمتابعة', 'Select account type to continue')}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mt-12">
                <Card
                  className="p-8 cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 hover:border-secondary group"
                  onClick={() => setUserType('student')}
                >
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 mx-auto bg-secondary/10 rounded-full flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                      <GraduationCap className="w-10 h-10 text-secondary" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">
                      {t('تسجيل دخول الطالب', 'Student Login')}
                    </h3>
                    <p className="text-muted-foreground">
                      {t('للطلاب المسجلين في الجامعة', 'For registered students')}
                    </p>
                  </div>
                </Card>

                <Card
                  className="p-8 cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 hover:border-secondary group"
                  onClick={() => setUserType('teacher')}
                >
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 mx-auto bg-secondary/10 rounded-full flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                      <User className="w-10 h-10 text-secondary" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">
                      {t('تسجيل دخول الدكتور', 'Teacher Login')}
                    </h3>
                    <p className="text-muted-foreground">
                      {t('لأعضاء هيئة التدريس', 'For faculty members')}
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* Student Login Form */}
          {userType === 'student' && (
            <Card className="p-8 md:p-12 max-w-md mx-auto animate-fade-in">
              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                  <GraduationCap className="w-8 h-8 text-secondary" />
                </div>
                <h2 className="text-3xl font-bold text-foreground mb-2">
                  {t('تسجيل دخول الطالب', 'Student Login')}
                </h2>
                <p className="text-muted-foreground">
                  {t('أدخل بياناتك للدخول إلى حسابك', 'Enter your credentials to login')}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="academicNumber" className="text-right block text-foreground font-semibold">
                    {t('الرقم الأكاديمي', 'Academic Number')}
                  </Label>
                  <Input
                    id="academicNumber"
                    type="text"
                    value={formData.academicNumber}
                    onChange={(e) => setFormData({ ...formData, academicNumber: e.target.value })}
                    placeholder={t('أدخل الرقم الأكاديمي', 'Enter academic number')}
                    required
                    className="text-right"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-right block text-foreground font-semibold">
                    {t('كلمة المرور', 'Password')}
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder={t('أدخل كلمة المرور', 'Enter password')}
                    required
                    className="text-right"
                  />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="rememberStudent"
                        checked={rememberMe}
                        onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                      />
                      <Label htmlFor="rememberStudent" className="text-sm text-muted-foreground cursor-pointer">
                        {t('تذكرني', 'Remember me')}
                      </Label>
                    </div>
                    <Link
                      to="/forgot-password"
                      className="text-sm text-secondary hover:text-secondary/80 hover:underline transition-colors"
                    >
                      {t('هل نسيت كلمة السر؟', 'Forgot password?')}
                    </Link>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-right block text-foreground font-semibold">
                    {t('رقم الهاتف', 'Phone Number')}
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder={t('أدخل رقم الهاتف', 'Enter phone number')}
                    required
                    className="text-right"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="submit"
                    className="flex-1 bg-secondary hover:bg-secondary/90 text-primary font-bold py-6"
                  >
                    {t('دخول', 'Login')}
                    <ArrowRight className="w-5 h-5 mr-2" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setUserType(null)}
                    className="px-8 py-6"
                  >
                    {t('رجوع', 'Back')}
                  </Button>
                </div>
              </form>
            </Card>
          )}

          {/* Teacher Login Form */}
          {userType === 'teacher' && (
            <Card className="p-8 md:p-12 max-w-md mx-auto animate-fade-in">
              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                  <User className="w-8 h-8 text-secondary" />
                </div>
                <h2 className="text-3xl font-bold text-foreground mb-2">
                  {t('تسجيل دخول الدكتور', 'Teacher Login')}
                </h2>
                <p className="text-muted-foreground">
                  {t('أدخل بياناتك للدخول إلى حسابك', 'Enter your credentials to login')}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-right block text-foreground font-semibold">
                    {t('الاسم الكامل', 'Full Name')}
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t('أدخل الاسم الكامل', 'Enter full name')}
                    required
                    className="text-right"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="teacherPhone" className="text-right block text-foreground font-semibold">
                    {t('رقم الهاتف', 'Phone Number')}
                  </Label>
                  <Input
                    id="teacherPhone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder={t('أدخل رقم الهاتف', 'Enter phone number')}
                    required
                    className="text-right"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-right block text-foreground font-semibold">
                    {t('البريد الإلكتروني', 'Email')}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={t('أدخل البريد الإلكتروني', 'Enter email')}
                    required
                    className="text-right"
                  />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="rememberTeacher"
                        checked={rememberMe}
                        onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                      />
                      <Label htmlFor="rememberTeacher" className="text-sm text-muted-foreground cursor-pointer">
                        {t('تذكرني', 'Remember me')}
                      </Label>
                    </div>
                    <Link
                      to="/forgot-password"
                      className="text-sm text-secondary hover:text-secondary/80 hover:underline transition-colors"
                    >
                      {t('هل نسيت كلمة السر؟', 'Forgot password?')}
                    </Link>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="submit"
                    className="flex-1 bg-secondary hover:bg-secondary/90 text-primary font-bold py-6"
                  >
                    {t('دخول', 'Login')}
                    <ArrowRight className="w-5 h-5 mr-2" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setUserType(null)}
                    className="px-8 py-6"
                  >
                    {t('رجوع', 'Back')}
                  </Button>
                </div>
              </form>
            </Card>
          )}
        </div>
      </main>

      {/* Team Section */}
      <section className="py-16 bg-muted/30 border-t">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-display font-bold text-foreground mb-8">
              {t('فريق العمل', 'Our Team')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="bg-card p-4 rounded-lg border border-border hover:shadow-lg hover:border-secondary transition-all duration-300"
                >
                  <p className="text-base font-semibold text-foreground">{member}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
