import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChevronLeft, ChevronRight, CheckCircle, Upload, FileText, GraduationCap, User, FolderOpen } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';
import { motion, useInView, AnimatePresence } from 'framer-motion';

export const AdmissionSection = () => {
  const { t, language } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    college: '',
    program: '',
    documents: {
      highSchool: null as File | null,
      id: null as File | null,
      photo: null as File | null,
    }
  });

  const colleges = [
    { ar: 'كلية الهندسة', en: 'College of Engineering' },
    { ar: 'كلية الطب', en: 'College of Medicine' },
    { ar: 'كلية إدارة الأعمال', en: 'College of Business Administration' },
    { ar: 'كلية العلوم الإنسانية', en: 'College of Humanities' }
  ];

  const steps = [
    { number: 1, title: { ar: 'المعلومات الشخصية', en: 'Personal Info' }, icon: User },
    { number: 2, title: { ar: 'الكلية والبرنامج', en: 'College & Program' }, icon: GraduationCap },
    { number: 3, title: { ar: 'الوثائق', en: 'Documents' }, icon: FolderOpen },
    { number: 4, title: { ar: 'المراجعة', en: 'Review' }, icon: CheckCircle },
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFileUpload = (field: keyof typeof formData.documents, file: File | null) => {
    setFormData(prev => ({
      ...prev,
      documents: { ...prev.documents, [field]: file }
    }));
  };

  const handleSubmit = () => {
    toast.success(
      t(
        'تم إرسال طلب القبول بنجاح! سنتواصل معك قريباً.',
        'Admission application submitted successfully! We will contact you soon.'
      )
    );
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      college: '',
      program: '',
      documents: { highSchool: null, id: null, photo: null }
    });
    setCurrentStep(1);
  };

  const stepVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.4, ease: "easeOut" as const }
    },
    exit: { 
      opacity: 0, 
      x: -50,
      transition: { duration: 0.3 }
    }
  };

  return (
    <section id="admission" className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5 relative overflow-hidden" ref={sectionRef}>
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <FileText className="w-4 h-4" />
            {t('ابدأ مستقبلك الآن', 'Start Your Future Now')}
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
            {t('القبول والتسجيل', 'Admission & Registration')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t(
              'ابدأ رحلتك الأكاديمية معنا من خلال التقديم عبر النموذج التالي',
              'Start your academic journey with us by applying through the following form'
            )}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.95 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="max-w-4xl mx-auto shadow-2xl border-border/50 overflow-hidden">
            {/* Progress Steps */}
            <CardHeader className="bg-gradient-to-r from-primary via-primary/90 to-secondary text-primary-foreground pb-8">
              <CardTitle className="text-2xl text-center mb-8">
                {t('نموذج التقديم', 'Application Form')}
              </CardTitle>
              
              <div className="flex justify-between items-center relative">
                {/* Progress Line */}
                <div className="absolute top-6 left-0 right-0 h-1 bg-white/20 rounded-full">
                  <motion.div 
                    className="h-full bg-secondary rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
                
                {steps.map((step) => (
                  <motion.div 
                    key={step.number} 
                    className="relative z-10 flex flex-col items-center"
                    whileHover={{ scale: 1.1 }}
                  >
                    <motion.div 
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                        currentStep >= step.number 
                          ? 'bg-secondary text-primary shadow-lg' 
                          : 'bg-white/20 text-white/60'
                      }`}
                      animate={currentStep >= step.number ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ duration: 0.3 }}
                    >
                      <step.icon className="w-5 h-5" />
                    </motion.div>
                    <span className={`text-xs mt-2 font-medium ${currentStep >= step.number ? 'text-secondary' : 'text-white/60'}`}>
                      {t(step.title.ar, step.title.en)}
                    </span>
                  </motion.div>
                ))}
              </div>
            </CardHeader>

            <CardContent className="p-8">
              <AnimatePresence mode="wait">
                {/* Step 1: Personal Information */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    variants={stepVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="space-y-6"
                  >
                    <h3 className="text-xl font-display font-bold mb-6 flex items-center gap-2">
                      <User className="w-5 h-5 text-primary" />
                      {t('المعلومات الشخصية', 'Personal Information')}
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <Label htmlFor="fullName">{t('الاسم الكامل', 'Full Name')}</Label>
                        <Input
                          id="fullName"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          placeholder={t('أدخل الاسم الكامل', 'Enter full name')}
                          className="mt-2"
                        />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <Label htmlFor="phone">{t('رقم الهاتف', 'Phone Number')}</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder={t('أدخل رقم الهاتف', 'Enter phone number')}
                          className="mt-2"
                        />
                      </motion.div>
                    </div>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Label htmlFor="email">{t('البريد الإلكتروني', 'Email')}</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder={t('أدخل البريد الإلكتروني', 'Enter email')}
                        className="mt-2"
                      />
                    </motion.div>
                  </motion.div>
                )}

                {/* Step 2: College Selection */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    variants={stepVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="space-y-6"
                  >
                    <h3 className="text-xl font-display font-bold mb-6 flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-primary" />
                      {t('اختيار الكلية والبرنامج', 'College and Program Selection')}
                    </h3>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <Label htmlFor="college">{t('الكلية', 'College')}</Label>
                      <Select
                        value={formData.college}
                        onValueChange={(value) => setFormData({ ...formData, college: value })}
                      >
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder={t('اختر الكلية', 'Select College')} />
                        </SelectTrigger>
                        <SelectContent>
                          {colleges.map((college, index) => (
                            <SelectItem key={index} value={t(college.ar, college.en)}>
                              {t(college.ar, college.en)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Label htmlFor="program">{t('البرنامج', 'Program')}</Label>
                      <Input
                        id="program"
                        value={formData.program}
                        onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                        placeholder={t('أدخل اسم البرنامج', 'Enter program name')}
                        className="mt-2"
                      />
                    </motion.div>
                  </motion.div>
                )}

                {/* Step 3: Documents Upload */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    variants={stepVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="space-y-6"
                  >
                    <h3 className="text-xl font-display font-bold mb-6 flex items-center gap-2">
                      <FolderOpen className="w-5 h-5 text-primary" />
                      {t('رفع الوثائق', 'Upload Documents')}
                    </h3>

                    <div className="grid gap-4">
                      {[
                        { key: 'highSchool', label: { ar: 'شهادة الثانوية', en: 'High School Certificate' } },
                        { key: 'id', label: { ar: 'صورة الهوية', en: 'ID Photo' } },
                        { key: 'photo', label: { ar: 'صورة شخصية', en: 'Personal Photo' } }
                      ].map((doc, index) => (
                        <motion.label
                          key={doc.key}
                          className="group border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 + index * 0.1 }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <motion.div 
                            className="w-14 h-14 mx-auto mb-3 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors"
                            whileHover={{ rotate: 10 }}
                          >
                            <Upload className="w-6 h-6 text-primary" />
                          </motion.div>
                          <span className="text-foreground font-medium">
                            {t(doc.label.ar, doc.label.en)}
                          </span>
                          <Input
                            type="file"
                            className="hidden"
                            onChange={(e) => handleFileUpload(doc.key as keyof typeof formData.documents, e.target.files?.[0] || null)}
                          />
                          {formData.documents[doc.key as keyof typeof formData.documents] && (
                            <motion.p 
                              className="mt-2 text-sm text-green-600 flex items-center justify-center gap-2"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                            >
                              <CheckCircle className="w-4 h-4" />
                              {formData.documents[doc.key as keyof typeof formData.documents]?.name}
                            </motion.p>
                          )}
                        </motion.label>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Review & Submit */}
                {currentStep === 4 && (
                  <motion.div
                    key="step4"
                    variants={stepVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="space-y-6"
                  >
                    <h3 className="text-xl font-display font-bold mb-6 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-primary" />
                      {t('مراجعة البيانات', 'Review Information')}
                    </h3>

                    <motion.div 
                      className="bg-muted/50 rounded-xl p-6 space-y-4"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      {[
                        { label: { ar: 'الاسم:', en: 'Name:' }, value: formData.fullName },
                        { label: { ar: 'البريد الإلكتروني:', en: 'Email:' }, value: formData.email },
                        { label: { ar: 'الهاتف:', en: 'Phone:' }, value: formData.phone },
                        { label: { ar: 'الكلية:', en: 'College:' }, value: formData.college },
                        { label: { ar: 'البرنامج:', en: 'Program:' }, value: formData.program },
                      ].map((item, index) => (
                        <motion.div 
                          key={index} 
                          className="flex justify-between items-center py-2 border-b border-border/50 last:border-0"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.15 + index * 0.05 }}
                        >
                          <span className="font-semibold text-muted-foreground">{t(item.label.ar, item.label.en)}</span>
                          <span className="text-foreground">{item.value || '-'}</span>
                        </motion.div>
                      ))}
                    </motion.div>

                    <motion.p 
                      className="text-sm text-muted-foreground text-center bg-amber-500/10 text-amber-700 p-3 rounded-lg"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      {t(
                        'تأكد من صحة جميع البيانات قبل الإرسال',
                        'Make sure all information is correct before submitting'
                      )}
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t border-border">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="outline"
                    onClick={handlePrevious}
                    disabled={currentStep === 1}
                    className="gap-2"
                  >
                    {language === 'ar' ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                    {t('السابق', 'Previous')}
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {currentStep < totalSteps ? (
                    <Button onClick={handleNext} className="gap-2">
                      {t('التالي', 'Next')}
                      {language === 'ar' ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </Button>
                  ) : (
                    <Button onClick={handleSubmit} className="gap-2">
                      <CheckCircle className="w-4 h-4" />
                      {t('إرسال الطلب', 'Submit Application')}
                    </Button>
                  )}
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};
