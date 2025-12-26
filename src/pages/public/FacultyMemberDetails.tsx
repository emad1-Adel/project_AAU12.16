import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { LoadingState } from '@/components/common/LoadingState';
import { ErrorState } from '@/components/common/ErrorState';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  Phone,
  Clock,
  Building,
  GraduationCap,
  BookOpen,
  FileText,
  Award,
  ExternalLink,
  Calendar,
  Briefcase,
  MessageSquare,
} from 'lucide-react';
import { facultyService, FacultyMemberDetail } from '@/services/data/faculty.service.mock';

const FacultyMemberDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const isRtl = language === 'ar';

  const [member, setMember] = useState<FacultyMemberDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (id) {
          const data = await facultyService.getMemberById(id);
          if (data) {
            setMember(data);
          } else {
            setError('Faculty member not found');
          }
        }
      } catch (err) {
        setError('Failed to load faculty member data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <LoadingState />;
  if (error || !member) {
    return (
      <ErrorState
        messageAr={error || 'عضو هيئة التدريس غير موجود'}
        messageEn={error || 'Faculty member not found'}
        onRetry={() => window.location.reload()}
      />
    );
  }

  const breadcrumbItems = [
    { label: { ar: 'هيئة التدريس', en: 'Faculty' }, href: '/faculty' },
    { label: { ar: member.nameAr, en: member.nameEn } },
  ];

  return (
    <div className="min-h-screen bg-background" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 pt-8 pb-16"
      >
        <div className="container mx-auto px-4">
          <Breadcrumb items={breadcrumbItems} />

          <div className="mt-8 flex flex-col lg:flex-row gap-8 items-start">
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="w-full lg:w-auto"
            >
              <Card className="overflow-hidden border-0 shadow-xl lg:w-80">
                <div className="h-2 bg-gradient-to-r from-primary to-secondary" />
                <CardContent className="pt-8 text-center">
                  <Avatar className="w-40 h-40 mx-auto border-4 border-primary/20 shadow-xl">
                    <AvatarImage src={member.image} alt={isRtl ? member.nameAr : member.nameEn} />
                    <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-4xl">
                      <User className="w-16 h-16" />
                    </AvatarFallback>
                  </Avatar>
                  <h1 className="text-2xl font-bold text-foreground mt-6 mb-2">
                    {isRtl ? member.nameAr : member.nameEn}
                  </h1>
                  <Badge className="bg-primary/90 text-primary-foreground mb-4">
                    {isRtl ? member.degreeAr : member.degreeEn}
                  </Badge>
                  <p className="text-muted-foreground text-sm">
                    {isRtl ? member.specializationAr : member.specializationEn}
                  </p>

                  <div className="mt-6 space-y-3 text-start">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <Mail className="w-5 h-5 text-primary" />
                      <span className="text-sm" dir="ltr">{member.email}</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <Phone className="w-5 h-5 text-primary" />
                      <span className="text-sm" dir="ltr">{member.phone}</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <Clock className="w-5 h-5 text-primary" />
                      <span className="text-sm">{isRtl ? member.officeHoursAr : member.officeHoursEn}</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                      <Building className="w-5 h-5 text-primary" />
                      <span className="text-sm">{isRtl ? member.departmentAr : member.departmentEn}</span>
                    </div>
                  </div>

                  <Button 
                    className="w-full mt-6"
                    onClick={() => {
                      // Check if user is logged in as student (mock check)
                      const userRole = localStorage.getItem('userRole');
                      if (userRole === 'student') {
                        // Navigate to student dashboard messages with faculty member info
                        localStorage.setItem('contactFaculty', JSON.stringify({
                          id: member.id,
                          name: isRtl ? member.nameAr : member.nameEn,
                          email: member.email
                        }));
                        navigate('/student-dashboard?tab=messages');
                        toast.success(t('جاري فتح صفحة الرسائل...', 'Opening messages...'));
                      } else {
                        // Redirect to login
                        toast.info(t('يجب تسجيل الدخول كطالب للتواصل', 'Please login as a student to contact'));
                        navigate('/login');
                      }
                    }}
                  >
                    <MessageSquare className="w-4 h-4 me-2" />
                    {isRtl ? 'تواصل معي' : 'Contact Me'}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex-1"
            >
              <Tabs defaultValue="about" className="w-full">
                <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 gap-2 h-auto p-2 bg-muted/50">
                  <TabsTrigger value="about" className="flex items-center gap-2 py-3">
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline">{t('نبذة', 'About')}</span>
                  </TabsTrigger>
                  <TabsTrigger value="research" className="flex items-center gap-2 py-3">
                    <BookOpen className="h-4 w-4" />
                    <span className="hidden sm:inline">{t('الأبحاث', 'Research')}</span>
                  </TabsTrigger>
                  <TabsTrigger value="courses" className="flex items-center gap-2 py-3">
                    <GraduationCap className="h-4 w-4" />
                    <span className="hidden sm:inline">{t('المقررات', 'Courses')}</span>
                  </TabsTrigger>
                  <TabsTrigger value="education" className="flex items-center gap-2 py-3">
                    <Award className="h-4 w-4" />
                    <span className="hidden sm:inline">{t('التعليم', 'Education')}</span>
                  </TabsTrigger>
                  <TabsTrigger value="experience" className="flex items-center gap-2 py-3">
                    <Briefcase className="h-4 w-4" />
                    <span className="hidden sm:inline">{t('الخبرات', 'Experience')}</span>
                  </TabsTrigger>
                </TabsList>

                {/* About Tab */}
                <TabsContent value="about" className="mt-6">
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <User className="w-5 h-5 text-primary" />
                        {t('نبذة شخصية', 'Biography')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">
                        {isRtl ? member.bioAr : member.bioEn}
                      </p>

                      <div className="mt-8">
                        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                          <BookOpen className="w-5 h-5 text-primary" />
                          {t('الاهتمامات البحثية', 'Research Interests')}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {(isRtl ? member.researchInterestsAr : member.researchInterestsEn).map((interest, index) => (
                            <Badge key={index} variant="secondary" className="px-4 py-2">
                              {interest}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Research Tab */}
                <TabsContent value="research" className="mt-6">
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-primary" />
                        {t('المنشورات العلمية', 'Publications')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {member.publications.map((pub, index) => (
                          <motion.div
                            key={pub.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <h4 className="font-semibold text-foreground mb-1">
                                  {isRtl ? pub.titleAr : pub.titleEn}
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                  {pub.journal} • {pub.year}
                                </p>
                              </div>
                              {pub.link && (
                                <Button variant="ghost" size="icon" asChild>
                                  <a href={pub.link} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="w-4 h-4" />
                                  </a>
                                </Button>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Courses Tab */}
                <TabsContent value="courses" className="mt-6">
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <GraduationCap className="w-5 h-5 text-primary" />
                        {t('المقررات الدراسية', 'Teaching Courses')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4">
                        {member.courses.map((course, index) => (
                          <motion.div
                            key={course.id}
                            initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/10"
                          >
                            <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
                              <span className="text-primary font-bold text-sm">{course.code}</span>
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-foreground">
                                {isRtl ? course.nameAr : course.nameEn}
                              </h4>
                              <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                                <Calendar className="w-4 h-4" />
                                {course.semester}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Education Tab */}
                <TabsContent value="education" className="mt-6">
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <Award className="w-5 h-5 text-primary" />
                        {t('المؤهلات العلمية', 'Education')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="relative">
                        <div className={`absolute ${isRtl ? 'right-4' : 'left-4'} top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-secondary`} />
                        <div className="space-y-6">
                          {member.education.map((edu, index) => (
                            <motion.div
                              key={edu.id}
                              initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex gap-4"
                            >
                              <div className="relative z-10 flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white shadow-lg">
                                <GraduationCap className="w-4 h-4" />
                              </div>
                              <div className="flex-1 p-4 rounded-xl bg-muted/50">
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="font-semibold text-foreground">
                                    {isRtl ? edu.degreeAr : edu.degreeEn}
                                  </h4>
                                  <Badge variant="outline">{edu.year}</Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  {isRtl ? edu.institutionAr : edu.institutionEn}
                                </p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Experience Tab */}
                <TabsContent value="experience" className="mt-6">
                  <Card className="border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <Briefcase className="w-5 h-5 text-primary" />
                        {t('الخبرات المهنية', 'Professional Experience')}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="relative">
                        <div className={`absolute ${isRtl ? 'right-4' : 'left-4'} top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-500 to-emerald-500`} />
                        <div className="space-y-6">
                          {member.experience.map((exp, index) => (
                            <motion.div
                              key={exp.id}
                              initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex gap-4"
                            >
                              <div className="relative z-10 flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white shadow-lg">
                                <Briefcase className="w-4 h-4" />
                              </div>
                              <div className="flex-1 p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border border-green-200/50 dark:border-green-800/30">
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="font-semibold text-foreground">
                                    {isRtl ? exp.positionAr : exp.positionEn}
                                  </h4>
                                  <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300">
                                    {isRtl ? exp.periodAr : exp.periodEn}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground flex items-center gap-2">
                                  <Building className="w-4 h-4" />
                                  {isRtl ? exp.organizationAr : exp.organizationEn}
                                </p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default FacultyMemberDetails;
