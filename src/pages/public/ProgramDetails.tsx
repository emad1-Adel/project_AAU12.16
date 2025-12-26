import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { LoadingState } from '@/components/common/LoadingState';
import { ErrorState } from '@/components/common/ErrorState';
import { College, AcademicProgram } from '@/types';
import { collegesService } from '@/services/data/colleges.service.mock';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  Clock,
  Percent,
  BookOpen,
  Building2,
  FileText,
  CheckCircle,
  Users,
  Target,
  Award,
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Sparkles,
  TrendingUp,
  User,
} from 'lucide-react';

const ProgramDetails = () => {
  const { collegeId, programId } = useParams<{ collegeId: string; programId: string }>();
  const { language, t } = useLanguage();
  const isRtl = language === 'ar';

  const [college, setCollege] = useState<College | null>(null);
  const [program, setProgram] = useState<AcademicProgram | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (collegeId && programId) {
          const result = await collegesService.getProgramById(collegeId, programId);
          if (result) {
            setCollege(result.college);
            setProgram(result.program);
          } else {
            setError('Program not found');
          }
        }
      } catch (err) {
        setError('Failed to load program data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [collegeId, programId]);

  if (loading) return <LoadingState />;
  if (error || !college || !program) {
    return (
      <ErrorState
        messageAr={error || 'البرنامج غير موجود'}
        messageEn={error || 'Program not found'}
        onRetry={() => window.location.reload()}
      />
    );
  }

  const breadcrumbItems = [
    { label: { ar: 'الكليات', en: 'Colleges' }, href: '/colleges' },
    { label: { ar: college.nameAr, en: college.nameEn }, href: `/colleges/${college.id}` },
    { label: { ar: program.nameAr, en: program.nameEn } },
  ];

  const admissionSteps = [
    { ar: 'التقديم الإلكتروني عبر موقع الجامعة', en: 'Online application through university website' },
    { ar: 'إرفاق الوثائق المطلوبة', en: 'Attach required documents' },
    { ar: 'دفع رسوم التسجيل', en: 'Pay registration fees' },
    { ar: 'إجراء المقابلة الشخصية (إن وجدت)', en: 'Personal interview (if required)' },
    { ar: 'استلام القبول والتسجيل النهائي', en: 'Receive admission and final registration' },
  ];

  return (
    <div className="min-h-screen bg-background" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Hero Section with Image */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative min-h-[500px] overflow-hidden"
      >
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: program.image 
              ? `url(${program.image})` 
              : 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 100%)'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/30" />
        </div>

        <div className="container mx-auto px-4 relative z-10 pt-8 pb-16">
          <Breadcrumb items={breadcrumbItems} />
          
          <div className="mt-16 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-wrap gap-2 mb-4"
            >
              <Badge className="bg-primary/90 text-primary-foreground">
                {isRtl ? college.nameAr : college.nameEn}
              </Badge>
              {program.departmentAr && (
                <Badge variant="outline" className="border-primary/50 text-foreground bg-background/50 backdrop-blur">
                  <Building2 className="w-3 h-3 mr-1" />
                  {isRtl ? program.departmentAr : program.departmentEn}
                </Badge>
              )}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold text-foreground mb-6"
            >
              {isRtl ? program.nameAr : program.nameEn}
            </motion.h1>

            {program.descriptionAr && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xl text-muted-foreground max-w-3xl leading-relaxed"
              >
                {isRtl ? program.descriptionAr : program.descriptionEn}
              </motion.p>
            )}
          </div>
        </div>
      </motion.section>

      {/* Quick Stats */}
      <section className="py-6 -mt-20 relative z-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              {
                icon: Percent,
                label: isRtl ? 'نسبة القبول' : 'Admission Rate',
                value: `${program.admissionRate}%`,
                color: 'from-blue-500 to-cyan-500',
              },
              {
                icon: Clock,
                label: isRtl ? 'سنوات الدراسة' : 'Study Years',
                value: program.studyYears,
                color: 'from-purple-500 to-pink-500',
              },
              {
                icon: BookOpen,
                label: isRtl ? 'نوع الثانوية' : 'High School',
                value: isRtl ? program.highSchoolType : program.highSchoolTypeEn,
                color: 'from-orange-500 to-red-500',
              },
              {
                icon: GraduationCap,
                label: isRtl ? 'الدرجة العلمية' : 'Degree',
                value: isRtl ? 'بكالوريوس' : 'Bachelor',
                color: 'from-green-500 to-emerald-500',
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="group"
              >
                <Card className="border-0 shadow-lg bg-card/95 backdrop-blur-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className={`h-1 bg-gradient-to-r ${stat.color}`} />
                  <CardContent className="p-5">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white shadow-lg`}>
                        <stat.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                        <p className="text-xl font-bold text-foreground">{stat.value}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Main Info */}
            <div className="lg:col-span-2 space-y-8">
              {/* Program Objectives */}
              {program.objectives && program.objectives.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <Card className="overflow-hidden border-0 shadow-lg">
                    <div className="h-1 bg-gradient-to-r from-primary to-secondary" />
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 text-2xl">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Target className="w-6 h-6 text-primary" />
                        </div>
                        {isRtl ? 'أهداف البرنامج' : 'Program Objectives'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4">
                        {program.objectives.map((objective, index) => (
                          <motion.div
                            key={objective.id}
                            initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                          >
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm">
                              {index + 1}
                            </div>
                            <p className="text-foreground leading-relaxed pt-1">
                              {isRtl ? objective.textAr : objective.textEn}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Career Prospects */}
              {program.careerProspectsAr && program.careerProspectsAr.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  <Card className="overflow-hidden border-0 shadow-lg">
                    <div className="h-1 bg-gradient-to-r from-green-500 to-emerald-500" />
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 text-2xl">
                        <div className="p-2 rounded-lg bg-green-500/10">
                          <Briefcase className="w-6 h-6 text-green-600" />
                        </div>
                        {isRtl ? 'فرص العمل' : 'Career Opportunities'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {(isRtl ? program.careerProspectsAr : program.careerProspectsEn)?.map((career, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border border-green-200/50 dark:border-green-800/30"
                          >
                            <TrendingUp className="w-5 h-5 text-green-600 flex-shrink-0" />
                            <span className="text-foreground font-medium">{career}</span>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Admission Steps */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <Card className="overflow-hidden border-0 shadow-lg">
                  <div className="h-1 bg-gradient-to-r from-purple-500 to-pink-500" />
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-2xl">
                      <div className="p-2 rounded-lg bg-purple-500/10">
                        <Users className="w-6 h-6 text-purple-600" />
                      </div>
                      {isRtl ? 'خطوات التقديم' : 'Application Steps'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative">
                      {/* Timeline line */}
                      <div className={`absolute ${isRtl ? 'right-4' : 'left-4'} top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-pink-500`} />
                      
                      <div className="space-y-6">
                        {admissionSteps.map((step, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`flex items-start gap-4 ${isRtl ? 'pr-0' : 'pl-0'}`}
                          >
                            <div className="relative z-10 flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                              {index + 1}
                            </div>
                            <div className="flex-1 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                              <p className="text-foreground">{isRtl ? step.ar : step.en}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Faculty Members */}
              {program.facultyMembers && program.facultyMembers.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.25 }}
                >
                  <Card className="overflow-hidden border-0 shadow-lg">
                    <div className="h-1 bg-gradient-to-r from-indigo-500 to-violet-500" />
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 text-2xl">
                        <div className="p-2 rounded-lg bg-indigo-500/10">
                          <Users className="w-6 h-6 text-indigo-600" />
                        </div>
                        {isRtl ? 'أعضاء هيئة التدريس' : 'Faculty Members'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {program.facultyMembers.map((member, index) => (
                          <Link
                            key={member.id}
                            to={`/faculty/${member.id}`}
                          >
                            <motion.div
                              initial={{ opacity: 0, scale: 0.9 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: index * 0.1 }}
                              className="group p-4 rounded-xl bg-gradient-to-br from-muted/50 to-muted hover:from-indigo-50 hover:to-violet-50 dark:hover:from-indigo-950/30 dark:hover:to-violet-950/30 transition-all duration-300 border border-transparent hover:border-indigo-200/50 dark:hover:border-indigo-800/30 cursor-pointer"
                            >
                              <div className="flex items-center gap-4">
                                <Avatar className="w-16 h-16 border-2 border-indigo-200/50 group-hover:border-indigo-400/50 transition-colors shadow-md">
                                  <AvatarImage src={member.image} alt={isRtl ? member.nameAr : member.nameEn} />
                                  <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-violet-500 text-white">
                                    <User className="w-6 h-6" />
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-semibold text-foreground group-hover:text-indigo-700 dark:group-hover:text-indigo-400 transition-colors truncate">
                                    {isRtl ? member.nameAr : member.nameEn}
                                  </h4>
                                  <Badge variant="secondary" className="mt-1 text-xs bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300">
                                    {isRtl ? member.titleAr : member.titleEn}
                                  </Badge>
                                </div>
                              </div>
                            </motion.div>
                          </Link>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* About Program */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <Card className="overflow-hidden border-0 shadow-lg">
                  <div className="h-1 bg-gradient-to-r from-blue-500 to-cyan-500" />
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-2xl">
                      <div className="p-2 rounded-lg bg-blue-500/10">
                        <Sparkles className="w-6 h-6 text-blue-600" />
                      </div>
                      {isRtl ? 'لماذا هذا البرنامج؟' : 'Why This Program?'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {[
                        { ar: 'منهج دراسي حديث ومعتمد دولياً', en: 'Modern internationally accredited curriculum' },
                        { ar: 'كادر أكاديمي متميز وذو خبرة', en: 'Distinguished and experienced academic staff' },
                        { ar: 'مختبرات ومرافق متطورة', en: 'Advanced laboratories and facilities' },
                        { ar: 'تدريب عملي في مؤسسات رائدة', en: 'Practical training in leading institutions' },
                        { ar: 'فرص بحثية وتطويرية', en: 'Research and development opportunities' },
                        { ar: 'شراكات مع جامعات عالمية', en: 'Partnerships with international universities' },
                      ].map((feature, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-center gap-3 p-3"
                        >
                          <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
                          <span className="text-muted-foreground">{isRtl ? feature.ar : feature.en}</span>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Admission Requirements Card */}
              <motion.div
                initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden border-0 shadow-xl bg-gradient-to-br from-primary/5 via-background to-secondary/5">
                  <div className="h-1 bg-gradient-to-r from-primary to-secondary" />
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Award className="w-5 h-5 text-primary" />
                      {isRtl ? 'متطلبات القبول' : 'Admission Requirements'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="p-4 rounded-xl bg-background border">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <Percent className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">
                              {isRtl ? 'الحد الأدنى للمعدل' : 'Minimum Rate'}
                            </p>
                            <p className="text-2xl font-bold text-foreground">{program.admissionRate}%</p>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-background border">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-secondary/10">
                            <BookOpen className="w-5 h-5 text-secondary-foreground" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">
                              {isRtl ? 'نوع الثانوية' : 'High School Type'}
                            </p>
                            <p className="font-bold text-foreground">
                              {isRtl ? program.highSchoolType : program.highSchoolTypeEn}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-background border">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-accent/10">
                            <Clock className="w-5 h-5 text-accent-foreground" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">
                              {isRtl ? 'مدة الدراسة' : 'Study Duration'}
                            </p>
                            <p className="font-bold text-foreground">
                              {program.studyYears} {isRtl ? 'سنوات' : 'years'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Button asChild className="w-full h-12 text-lg shadow-lg" size="lg">
                      <Link to="/admission">
                        <GraduationCap className="w-5 h-5 mr-2" />
                        {isRtl ? 'تقديم الآن' : 'Apply Now'}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Other Programs in Same College */}
              <motion.div
                initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <Card className="border-0 shadow-lg">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">
                      {isRtl ? 'برامج أخرى في الكلية' : 'Other Programs'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {college.programs
                        .filter(p => p.id !== program.id)
                        .slice(0, 5)
                        .map((p) => (
                          <Link
                            key={p.id}
                            to={`/colleges/${college.id}/programs/${p.id}`}
                            className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors group"
                          >
                            {p.image && (
                              <img 
                                src={p.image} 
                                alt={isRtl ? p.nameAr : p.nameEn}
                                className="w-12 h-12 rounded-lg object-cover"
                              />
                            )}
                            <div className="flex-1 min-w-0">
                              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
                                {isRtl ? p.nameAr : p.nameEn}
                              </span>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline" className="text-xs">
                                  {p.admissionRate}%
                                </Badge>
                              </div>
                            </div>
                            {isRtl ? (
                              <ArrowLeft className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                            ) : (
                              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                            )}
                          </Link>
                        ))}
                    </div>
                    <Button asChild variant="outline" className="w-full mt-4">
                      <Link to={`/colleges/${college.id}`}>
                        {isRtl ? 'عرض جميع البرامج' : 'View All Programs'}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Contact Card */}
              <motion.div
                initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <Card className="border-0 shadow-lg bg-gradient-to-br from-muted/50 to-muted">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                        <FileText className="w-8 h-8 text-primary" />
                      </div>
                      <h4 className="font-semibold text-foreground mb-2">
                        {isRtl ? 'هل لديك استفسار؟' : 'Have a Question?'}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        {isRtl
                          ? 'تواصل معنا للحصول على مزيد من المعلومات'
                          : 'Contact us for more information'}
                      </p>
                      <Button asChild variant="outline" className="w-full">
                        <Link to="/contact">
                          {isRtl ? 'تواصل معنا' : 'Contact Us'}
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-primary to-secondary p-8 md:p-12 text-center"
          >
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full blur-3xl" />
            </div>

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary-foreground">
                {isRtl ? 'ابدأ رحلتك الأكاديمية معنا' : 'Start Your Academic Journey With Us'}
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                {isRtl
                  ? 'سجل الآن في برنامج ' + program.nameAr + ' واحصل على تعليم متميز يؤهلك للمستقبل'
                  : 'Register now in the ' + program.nameEn + ' program and receive outstanding education'}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" variant="secondary" className="text-lg px-8 shadow-lg">
                  <Link to="/admission">
                    {isRtl ? 'التقديم الآن' : 'Apply Now'}
                    {isRtl ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-lg px-8 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  <Link to="/contact">
                    {isRtl ? 'تواصل معنا' : 'Contact Us'}
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ProgramDetails;
