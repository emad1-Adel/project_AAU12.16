import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { 
  GraduationCap, 
  Briefcase, 
  Users, 
  CheckCircle, 
  Send, 
  MapPin, 
  Clock, 
  Building2,
  Award,
  Heart,
  Lightbulb,
  Target
} from 'lucide-react';

const JoinUs = () => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';
  const [activeTab, setActiveTab] = useState('student');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const breadcrumbItems = [
    { label: { ar: 'الرئيسية', en: 'Home' }, href: '/' },
    { label: { ar: 'انضم لنا', en: 'Join Us' } }
  ];

  const benefits = [
    {
      icon: Award,
      title: { ar: 'بيئة تعليمية متميزة', en: 'Distinguished Learning Environment' },
      description: { ar: 'نوفر أحدث التقنيات والمرافق التعليمية', en: 'We provide the latest technologies and educational facilities' }
    },
    {
      icon: Users,
      title: { ar: 'فريق عمل متميز', en: 'Outstanding Team' },
      description: { ar: 'نخبة من الأكاديميين والإداريين المتميزين', en: 'Elite academics and distinguished administrators' }
    },
    {
      icon: Lightbulb,
      title: { ar: 'فرص التطوير المهني', en: 'Professional Development' },
      description: { ar: 'برامج تدريبية مستمرة لتطوير المهارات', en: 'Continuous training programs for skill development' }
    },
    {
      icon: Heart,
      title: { ar: 'بيئة عمل محفزة', en: 'Motivating Work Environment' },
      description: { ar: 'ثقافة عمل إيجابية وداعمة', en: 'Positive and supportive work culture' }
    }
  ];

  const jobOpenings = [
    {
      id: 1,
      title: { ar: 'أستاذ مساعد - علوم الحاسب', en: 'Assistant Professor - Computer Science' },
      department: { ar: 'كلية تقنية المعلومات', en: 'College of Information Technology' },
      type: { ar: 'دوام كامل', en: 'Full-time' },
      location: { ar: 'صنعاء', en: 'Sanaa' }
    },
    {
      id: 2,
      title: { ar: 'محاضر - إدارة الأعمال', en: 'Lecturer - Business Administration' },
      department: { ar: 'كلية العلوم الإدارية', en: 'College of Administrative Sciences' },
      type: { ar: 'دوام كامل', en: 'Full-time' },
      location: { ar: 'صنعاء', en: 'Sanaa' }
    },
    {
      id: 3,
      title: { ar: 'موظف قبول وتسجيل', en: 'Admission & Registration Officer' },
      department: { ar: 'شؤون الطلاب', en: 'Student Affairs' },
      type: { ar: 'دوام كامل', en: 'Full-time' },
      location: { ar: 'صنعاء', en: 'Sanaa' }
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success(
      language === 'ar' 
        ? 'تم إرسال طلبك بنجاح! سنتواصل معك قريباً.' 
        : 'Your application has been submitted successfully! We will contact you soon.'
    );
    setIsSubmitting(false);
  };

  return (
    <div className={`min-h-screen bg-background ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto px-4">
          <Breadcrumb items={breadcrumbItems} />
          
          <div className="text-center mt-8">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {language === 'ar' ? 'انضم إلى عائلتنا' : 'Join Our Family'}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {language === 'ar' 
                ? 'كن جزءاً من رحلتنا نحو التميز الأكاديمي وبناء جيل المستقبل'
                : 'Be part of our journey towards academic excellence and building the future generation'}
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            {language === 'ar' ? 'لماذا تنضم إلينا؟' : 'Why Join Us?'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                    <benefit.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {benefit.title[language]}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {benefit.description[language]}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Application Forms */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="student" className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                {language === 'ar' ? 'التحق كطالب' : 'Apply as Student'}
              </TabsTrigger>
              <TabsTrigger value="employee" className="flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                {language === 'ar' ? 'انضم للعمل' : 'Join as Employee'}
              </TabsTrigger>
            </TabsList>

            {/* Student Application */}
            <TabsContent value="student">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="w-6 h-6 text-primary" />
                    {language === 'ar' ? 'نموذج التسجيل للطلاب' : 'Student Registration Form'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>{language === 'ar' ? 'الاسم الكامل' : 'Full Name'}</Label>
                        <Input placeholder={language === 'ar' ? 'أدخل اسمك الكامل' : 'Enter your full name'} required />
                      </div>
                      <div className="space-y-2">
                        <Label>{language === 'ar' ? 'البريد الإلكتروني' : 'Email'}</Label>
                        <Input type="email" placeholder={language === 'ar' ? 'أدخل بريدك الإلكتروني' : 'Enter your email'} required />
                      </div>
                      <div className="space-y-2">
                        <Label>{language === 'ar' ? 'رقم الهاتف' : 'Phone Number'}</Label>
                        <Input placeholder={language === 'ar' ? 'أدخل رقم هاتفك' : 'Enter your phone number'} required />
                      </div>
                      <div className="space-y-2">
                        <Label>{language === 'ar' ? 'المرحلة الدراسية' : 'Education Level'}</Label>
                        <Select required>
                          <SelectTrigger>
                            <SelectValue placeholder={language === 'ar' ? 'اختر المرحلة' : 'Select level'} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="bachelor">{language === 'ar' ? 'بكالوريوس' : 'Bachelor'}</SelectItem>
                            <SelectItem value="master">{language === 'ar' ? 'ماجستير' : 'Master'}</SelectItem>
                            <SelectItem value="diploma">{language === 'ar' ? 'دبلوم' : 'Diploma'}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>{language === 'ar' ? 'الكلية المرغوبة' : 'Desired College'}</Label>
                        <Select required>
                          <SelectTrigger>
                            <SelectValue placeholder={language === 'ar' ? 'اختر الكلية' : 'Select college'} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="it">{language === 'ar' ? 'تقنية المعلومات' : 'Information Technology'}</SelectItem>
                            <SelectItem value="business">{language === 'ar' ? 'العلوم الإدارية' : 'Administrative Sciences'}</SelectItem>
                            <SelectItem value="engineering">{language === 'ar' ? 'الهندسة' : 'Engineering'}</SelectItem>
                            <SelectItem value="medicine">{language === 'ar' ? 'الطب' : 'Medicine'}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>{language === 'ar' ? 'معدل الثانوية' : 'High School GPA'}</Label>
                        <Input placeholder={language === 'ar' ? 'مثال: 85%' : 'Example: 85%'} />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>{language === 'ar' ? 'رسالة إضافية' : 'Additional Message'}</Label>
                      <Textarea 
                        placeholder={language === 'ar' ? 'أي معلومات إضافية تود مشاركتها...' : 'Any additional information you would like to share...'}
                        rows={4}
                      />
                    </div>

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                          {language === 'ar' ? 'جاري الإرسال...' : 'Submitting...'}
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Send className="w-4 h-4" />
                          {language === 'ar' ? 'إرسال الطلب' : 'Submit Application'}
                        </span>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Employee Application */}
            <TabsContent value="employee">
              <div className="space-y-8">
                {/* Job Openings */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-6 h-6 text-primary" />
                      {language === 'ar' ? 'الوظائف المتاحة' : 'Available Positions'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {jobOpenings.map((job) => (
                        <div key={job.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                              <h3 className="font-semibold text-foreground">{job.title[language]}</h3>
                              <div className="flex flex-wrap items-center gap-2 mt-2 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Building2 className="w-4 h-4" />
                                  {job.department[language]}
                                </span>
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-4 h-4" />
                                  {job.location[language]}
                                </span>
                                <Badge variant="secondary">
                                  <Clock className="w-3 h-3 mr-1" />
                                  {job.type[language]}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Application Form */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="w-6 h-6 text-primary" />
                      {language === 'ar' ? 'نموذج التقديم للوظائف' : 'Job Application Form'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>{language === 'ar' ? 'الاسم الكامل' : 'Full Name'}</Label>
                          <Input placeholder={language === 'ar' ? 'أدخل اسمك الكامل' : 'Enter your full name'} required />
                        </div>
                        <div className="space-y-2">
                          <Label>{language === 'ar' ? 'البريد الإلكتروني' : 'Email'}</Label>
                          <Input type="email" placeholder={language === 'ar' ? 'أدخل بريدك الإلكتروني' : 'Enter your email'} required />
                        </div>
                        <div className="space-y-2">
                          <Label>{language === 'ar' ? 'رقم الهاتف' : 'Phone Number'}</Label>
                          <Input placeholder={language === 'ar' ? 'أدخل رقم هاتفك' : 'Enter your phone number'} required />
                        </div>
                        <div className="space-y-2">
                          <Label>{language === 'ar' ? 'الوظيفة المرغوبة' : 'Desired Position'}</Label>
                          <Select required>
                            <SelectTrigger>
                              <SelectValue placeholder={language === 'ar' ? 'اختر الوظيفة' : 'Select position'} />
                            </SelectTrigger>
                            <SelectContent>
                              {jobOpenings.map((job) => (
                                <SelectItem key={job.id} value={job.id.toString()}>
                                  {job.title[language]}
                                </SelectItem>
                              ))}
                              <SelectItem value="other">{language === 'ar' ? 'أخرى' : 'Other'}</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>{language === 'ar' ? 'المؤهل العلمي' : 'Qualification'}</Label>
                          <Select required>
                            <SelectTrigger>
                              <SelectValue placeholder={language === 'ar' ? 'اختر المؤهل' : 'Select qualification'} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="bachelor">{language === 'ar' ? 'بكالوريوس' : 'Bachelor'}</SelectItem>
                              <SelectItem value="master">{language === 'ar' ? 'ماجستير' : 'Master'}</SelectItem>
                              <SelectItem value="phd">{language === 'ar' ? 'دكتوراه' : 'PhD'}</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>{language === 'ar' ? 'سنوات الخبرة' : 'Years of Experience'}</Label>
                          <Select required>
                            <SelectTrigger>
                              <SelectValue placeholder={language === 'ar' ? 'اختر' : 'Select'} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0-2">{language === 'ar' ? '0-2 سنوات' : '0-2 years'}</SelectItem>
                              <SelectItem value="3-5">{language === 'ar' ? '3-5 سنوات' : '3-5 years'}</SelectItem>
                              <SelectItem value="6-10">{language === 'ar' ? '6-10 سنوات' : '6-10 years'}</SelectItem>
                              <SelectItem value="10+">{language === 'ar' ? 'أكثر من 10 سنوات' : 'More than 10 years'}</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>{language === 'ar' ? 'نبذة عنك' : 'About You'}</Label>
                        <Textarea 
                          placeholder={language === 'ar' ? 'اكتب نبذة مختصرة عن خبراتك ومؤهلاتك...' : 'Write a brief summary about your experience and qualifications...'}
                          rows={4}
                          required
                        />
                      </div>

                      <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                            {language === 'ar' ? 'جاري الإرسال...' : 'Submitting...'}
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <Send className="w-4 h-4" />
                            {language === 'ar' ? 'إرسال الطلب' : 'Submit Application'}
                          </span>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            {language === 'ar' ? 'هل لديك استفسارات؟' : 'Have Questions?'}
          </h2>
          <p className="text-muted-foreground mb-6">
            {language === 'ar' 
              ? 'تواصل مع قسم القبول والتسجيل للحصول على مزيد من المعلومات'
              : 'Contact the Admission and Registration Department for more information'}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="outline" asChild>
              <a href="tel:+967123456789">
                {language === 'ar' ? 'اتصل بنا: 123456789' : 'Call Us: 123456789'}
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href="mailto:admission@ngu.edu.ye">
                admission@ngu.edu.ye
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JoinUs;
