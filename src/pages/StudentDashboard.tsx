import { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  User, BookOpen, Calendar, FileText, Wallet,
  Mail, Phone, GraduationCap, Building, Award,
  Download, Clock, MapPin, Video, FileSpreadsheet, File,
  Bell, CheckCircle, AlertCircle, Timer, CreditCard,
  TrendingUp, BookMarked, Edit, Save, X, MessageSquare, Send
} from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import {
  getStudentProfile,
  getStudentCourses,
  getCourseFiles,
  getStudentSchedule,
  getStudentGrades,
  getStudentFinance,
  getStudentNotifications,
  updateStudentProfile,
  markStudentNotificationAsRead,
  type StudentProfile,
  type StudentCourse,
  type CourseFile,
  type StudentScheduleItem,
  type StudentGrade,
  type StudentFinance,
  type StudentNotification
} from '@/services/data/student.service.mock';
import { messagesService, Conversation, Message } from '@/services/data/messages.service.mock';

export default function StudentDashboard() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { language, t } = useLanguage();
  
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [courses, setCourses] = useState<StudentCourse[]>([]);
  const [files, setFiles] = useState<CourseFile[]>([]);
  const [schedule, setSchedule] = useState<StudentScheduleItem[]>([]);
  const [grades, setGrades] = useState<StudentGrade[]>([]);
  const [finance, setFinance] = useState<StudentFinance | null>(null);
  const [notifications, setNotifications] = useState<StudentNotification[]>([]);
  
  const [selectedCourse, setSelectedCourse] = useState<string>('all');
  const [selectedSemester, setSelectedSemester] = useState<string>('all');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editedProfile, setEditedProfile] = useState<Partial<StudentProfile>>({});
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const profileImageRef = useRef<HTMLInputElement>(null);
  
  // Messages state
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [conversationMessages, setConversationMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [contactFaculty, setContactFaculty] = useState<{id: string; name: string; email: string} | null>(null);
  
  // Get initial tab from URL params
  const initialTab = searchParams.get('tab') || 'profile';

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [profileData, coursesData, filesData, scheduleData, gradesData, financeData, notificationsData, conversationsData] = await Promise.all([
          getStudentProfile(),
          getStudentCourses(),
          getCourseFiles(),
          getStudentSchedule(),
          getStudentGrades(),
          getStudentFinance(),
          getStudentNotifications(),
          messagesService.getStudentConversations()
        ]);
        setProfile(profileData);
        setCourses(coursesData);
        setFiles(filesData);
        setSchedule(scheduleData);
        setGrades(gradesData);
        setFinance(financeData);
        setNotifications(notificationsData);
        setConversations(conversationsData);
        setEditedProfile({ emailPersonal: profileData.emailPersonal, phone: profileData.phone });
        
        // Check for faculty contact from localStorage
        const storedFaculty = localStorage.getItem('contactFaculty');
        if (storedFaculty) {
          const faculty = JSON.parse(storedFaculty);
          setContactFaculty(faculty);
          localStorage.removeItem('contactFaculty');
          
          // Get or create conversation with this faculty
          const conv = await messagesService.getOrCreateConversation(faculty.id, faculty.name, faculty.email);
          setCurrentConversation(conv);
          const msgs = await messagesService.getConversationMessages(conv.id);
          setConversationMessages(msgs);
        }
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleSelectConversation = async (conv: Conversation) => {
    setCurrentConversation(conv);
    setContactFaculty({ id: conv.doctorId, name: conv.doctorName, email: conv.doctorEmail });
    const msgs = await messagesService.getConversationMessages(conv.id);
    setConversationMessages(msgs);
    await messagesService.markConversationAsRead(conv.id, 'student');
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !currentConversation) return;
    
    const msg = await messagesService.sendMessage(
      currentConversation.id,
      newMessage.trim(),
      'student',
      profile?.nameAr || 'الطالب'
    );
    setConversationMessages(prev => [...prev, msg]);
    setNewMessage('');
    
    // Update conversation in list
    setConversations(prev => prev.map(c => 
      c.id === currentConversation.id 
        ? { ...c, lastMessage: msg.text, lastMessageDate: msg.createdAt }
        : c
    ));
    
    toast.success(t('تم إرسال الرسالة بنجاح', 'Message sent successfully'));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(language === 'ar' ? 'ar-YE' : 'en-US').format(amount) + (language === 'ar' ? ' ر.ي' : ' YER');
  };

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'text-green-600';
    if (grade.startsWith('B')) return 'text-blue-600';
    if (grade.startsWith('C')) return 'text-yellow-600';
    if (grade.startsWith('D')) return 'text-orange-600';
    if (grade === 'F') return 'text-red-600';
    return 'text-muted-foreground';
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid': return <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20">{t('مدفوع', 'Paid')}</Badge>;
      case 'pending': return <Badge className="bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20">{t('قيد الانتظار', 'Pending')}</Badge>;
      case 'overdue': return <Badge className="bg-red-500/10 text-red-600 hover:bg-red-500/20">{t('متأخر', 'Overdue')}</Badge>;
      case 'partial': return <Badge className="bg-blue-500/10 text-blue-600 hover:bg-blue-500/20">{t('جزئي', 'Partial')}</Badge>;
      default: return null;
    }
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="h-5 w-5 text-purple-500" />;
      case 'assignment': return <FileSpreadsheet className="h-5 w-5 text-orange-500" />;
      case 'exam': return <FileText className="h-5 w-5 text-red-500" />;
      default: return <File className="h-5 w-5 text-blue-500" />;
    }
  };

  const handleSaveProfile = async () => {
    try {
      await updateStudentProfile(editedProfile);
      setProfile(prev => prev ? { ...prev, ...editedProfile } : null);
      setIsEditingProfile(false);
      toast.success(t('تم تحديث البيانات بنجاح', 'Profile updated successfully'));
    } catch {
      toast.error(t('حدث خطأ أثناء التحديث', 'Error updating profile'));
    }
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error(t('حجم الصورة يجب أن يكون أقل من 5 ميجابايت', 'Image size must be less than 5MB'));
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target?.result as string);
        toast.success(t('تم تغيير الصورة بنجاح', 'Profile image updated successfully'));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMarkNotificationRead = async (id: string) => {
    await markStudentNotificationAsRead(id);
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const filteredFiles = files.filter(f => selectedCourse === 'all' || f.courseId === selectedCourse);
  
  const semesters = [...new Set(grades.map(g => g.semester))];
  const filteredGrades = grades.filter(g => selectedSemester === 'all' || g.semester === selectedSemester);

  const days = [
    { ar: 'السبت', en: 'Saturday' },
    { ar: 'الأحد', en: 'Sunday' },
    { ar: 'الإثنين', en: 'Monday' },
    { ar: 'الثلاثاء', en: 'Tuesday' },
    { ar: 'الأربعاء', en: 'Wednesday' },
    { ar: 'الخميس', en: 'Thursday' }
  ];

  const unreadNotifications = notifications.filter(n => !n.isRead).length;

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="space-y-4">
            <Skeleton className="h-12 w-64" />
            <Skeleton className="h-[400px] w-full" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 pt-24">
        {/* Page Title with Notifications */}
        <div className="mb-8 animate-fade-in flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
              {t('بوابة الطالب', 'Student Portal')}
            </h1>
            <p className="text-muted-foreground">
              {t(`مرحباً، ${profile?.nameAr}`, `Welcome, ${profile?.nameEn}`)}
            </p>
          </div>
          
          {/* Quick Stats */}
          <div className="flex flex-wrap gap-3">
            <Card className="px-4 py-2 bg-secondary/10 border-secondary/20">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-secondary" />
                <div>
                  <p className="text-xs text-muted-foreground">{t('المعدل', 'GPA')}</p>
                  <p className="font-bold text-secondary">{profile?.gpa.toFixed(2)}</p>
                </div>
              </div>
            </Card>
            <Card className="px-4 py-2 bg-blue-500/10 border-blue-500/20">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-blue-500" />
                <div>
                  <p className="text-xs text-muted-foreground">{t('المقررات', 'Courses')}</p>
                  <p className="font-bold text-blue-600">{courses.length}</p>
                </div>
              </div>
            </Card>
            {unreadNotifications > 0 && (
              <Card className="px-4 py-2 bg-red-500/10 border-red-500/20">
                <div className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-red-500" />
                  <div>
                    <p className="text-xs text-muted-foreground">{t('إشعارات', 'Notifications')}</p>
                    <p className="font-bold text-red-600">{unreadNotifications}</p>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue={initialTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 gap-2 h-auto p-2 bg-muted/50">
            <TabsTrigger value="profile" className="flex items-center gap-2 py-3">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">{t('الملف الشخصي', 'Profile')}</span>
            </TabsTrigger>
            <TabsTrigger value="courses" className="flex items-center gap-2 py-3">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">{t('المقررات', 'Courses')}</span>
            </TabsTrigger>
            <TabsTrigger value="schedule" className="flex items-center gap-2 py-3">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">{t('الجدول', 'Schedule')}</span>
            </TabsTrigger>
            <TabsTrigger value="grades" className="flex items-center gap-2 py-3">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">{t('الدرجات', 'Grades')}</span>
            </TabsTrigger>
            <TabsTrigger value="finance" className="flex items-center gap-2 py-3">
              <Wallet className="h-4 w-4" />
              <span className="hidden sm:inline">{t('المالية', 'Finance')}</span>
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center gap-2 py-3">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">{t('الرسائل', 'Messages')}</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="animate-fade-in">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Profile Card */}
              <Card className="md:col-span-1">
                <CardContent className="pt-6 text-center">
                  <div className="relative w-32 h-32 mx-auto mb-4 group">
                    {profileImage ? (
                      <img 
                        src={profileImage} 
                        alt="Profile" 
                        className="w-full h-full rounded-full object-cover border-4 border-secondary/20"
                      />
                    ) : (
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-secondary to-gold flex items-center justify-center">
                        <User className="h-16 w-16 text-secondary-foreground" />
                      </div>
                    )}
                    <button
                      onClick={() => profileImageRef.current?.click()}
                      className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                    >
                      <Edit className="h-6 w-6 text-white" />
                    </button>
                    <input
                      type="file"
                      ref={profileImageRef}
                      className="hidden"
                      accept="image/*"
                      onChange={handleProfileImageChange}
                    />
                  </div>
                  <h2 className="text-xl font-bold text-foreground mb-1">
                    {language === 'ar' ? profile?.nameAr : profile?.nameEn}
                  </h2>
                  <p className="text-secondary font-medium mb-2">{profile?.academicNumber}</p>
                  <Badge variant="secondary" className="mb-4">
                    {language === 'ar' ? profile?.levelAr : profile?.levelEn}
                  </Badge>
                  <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">{t('الساعات المكتملة', 'Completed Credits')}</span>
                      <span className="font-bold">{profile?.completedCredits} / {profile?.totalCredits}</span>
                    </div>
                    <Progress value={(profile?.completedCredits || 0) / (profile?.totalCredits || 1) * 100} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              {/* Info Cards */}
              <div className="md:col-span-2 space-y-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Building className="h-5 w-5 text-secondary" />
                      {t('المعلومات الأكاديمية', 'Academic Information')}
                    </CardTitle>
                    <Badge className={profile?.status === 'active' ? 'bg-green-500' : 'bg-red-500'}>
                      {profile?.status === 'active' ? t('نشط', 'Active') : t('موقف', 'Suspended')}
                    </Badge>
                  </CardHeader>
                  <CardContent className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">{t('الكلية', 'College')}</p>
                      <p className="font-medium">{language === 'ar' ? profile?.collegeAr : profile?.collegeEn}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{t('القسم', 'Department')}</p>
                      <p className="font-medium">{language === 'ar' ? profile?.departmentAr : profile?.departmentEn}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{t('التخصص', 'Specialization')}</p>
                      <p className="font-medium">{language === 'ar' ? profile?.specializationAr : profile?.specializationEn}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{t('المعدل التراكمي', 'GPA')}</p>
                      <p className="font-bold text-secondary">{profile?.gpa.toFixed(2)} / 4.00</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{t('المرشد الأكاديمي', 'Academic Advisor')}</p>
                      <p className="font-medium">{language === 'ar' ? profile?.advisorAr : profile?.advisorEn}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{t('التخرج المتوقع', 'Expected Graduation')}</p>
                      <p className="font-medium">{new Date(profile?.expectedGraduation || '').toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US')}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Mail className="h-5 w-5 text-secondary" />
                      {t('معلومات التواصل', 'Contact Information')}
                    </CardTitle>
                    {!isEditingProfile ? (
                      <Button variant="outline" size="sm" onClick={() => setIsEditingProfile(true)}>
                        <Edit className="h-4 w-4 me-2" />
                        {t('تعديل', 'Edit')}
                      </Button>
                    ) : (
                      <div className="flex gap-2">
                        <Button size="sm" onClick={handleSaveProfile}>
                          <Save className="h-4 w-4 me-2" />
                          {t('حفظ', 'Save')}
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => setIsEditingProfile(false)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </CardHeader>
                  <CardContent className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm text-muted-foreground">{t('البريد الجامعي', 'University Email')}</Label>
                      <p className="font-medium">{profile?.emailUniversity}</p>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">{t('البريد الشخصي', 'Personal Email')}</Label>
                      {isEditingProfile ? (
                        <Input 
                          value={editedProfile.emailPersonal || ''} 
                          onChange={(e) => setEditedProfile(prev => ({ ...prev, emailPersonal: e.target.value }))}
                        />
                      ) : (
                        <p className="font-medium">{profile?.emailPersonal}</p>
                      )}
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">{t('رقم الهاتف', 'Phone Number')}</Label>
                      {isEditingProfile ? (
                        <Input 
                          value={editedProfile.phone || ''} 
                          onChange={(e) => setEditedProfile(prev => ({ ...prev, phone: e.target.value }))}
                          dir="ltr"
                        />
                      ) : (
                        <p className="font-medium" dir="ltr">{profile?.phone}</p>
                      )}
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">{t('تاريخ الالتحاق', 'Admission Date')}</Label>
                      <p className="font-medium">{new Date(profile?.admissionDate || '').toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US')}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Notifications */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5 text-secondary" />
                      {t('الإشعارات', 'Notifications')}
                      {unreadNotifications > 0 && (
                        <Badge variant="destructive">{unreadNotifications}</Badge>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {notifications.slice(0, 4).map((notif) => (
                      <div 
                        key={notif.id} 
                        className={`p-3 rounded-lg border cursor-pointer transition-colors ${notif.isRead ? 'bg-muted/30' : 'bg-secondary/5 border-secondary/20'}`}
                        onClick={() => handleMarkNotificationRead(notif.id)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className={`font-medium ${!notif.isRead ? 'text-foreground' : 'text-muted-foreground'}`}>
                              {language === 'ar' ? notif.titleAr : notif.titleEn}
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                              {language === 'ar' ? notif.messageAr : notif.messageEn}
                            </p>
                          </div>
                          <span className="text-xs text-muted-foreground">{notif.date}</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Courses Tab */}
          <TabsContent value="courses" className="animate-fade-in space-y-6">
            {/* Course List */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookMarked className="h-5 w-5 text-secondary" />
                  {t('المقررات المسجلة', 'Registered Courses')}
                </CardTitle>
                <CardDescription>
                  {t('الفصل الدراسي الحالي', 'Current Semester')} - {courses.length} {t('مقررات', 'courses')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {courses.map((course) => (
                  <Card key={course.id} className="p-4 hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge variant="outline" className="font-mono">{course.code}</Badge>
                          <h3 className="font-bold text-foreground">
                            {language === 'ar' ? course.nameAr : course.nameEn}
                          </h3>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {language === 'ar' ? course.doctorAr : course.doctorEn}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {course.classroom}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {language === 'ar' ? course.scheduleAr : course.scheduleEn}
                          </div>
                          <div className="flex items-center gap-1">
                            <GraduationCap className="h-3 w-3" />
                            {course.creditHours} {t('ساعات', 'credits')}
                          </div>
                        </div>
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setSelectedCourse(course.id)}>
                            <FileText className="h-4 w-4 me-2" />
                            {t('الملفات', 'Files')}
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>{course.code} - {language === 'ar' ? course.nameAr : course.nameEn}</DialogTitle>
                            <DialogDescription>{t('الملفات والمحتوى التعليمي', 'Files and course materials')}</DialogDescription>
                          </DialogHeader>
                          <div className="space-y-3 mt-4">
                            {files.filter(f => f.courseId === course.id).map((file) => (
                              <div key={file.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                                <div className="flex items-center gap-3">
                                  {getFileIcon(file.type)}
                                  <div>
                                    <p className="font-medium">{language === 'ar' ? file.titleAr : file.titleEn}</p>
                                    <p className="text-xs text-muted-foreground">{file.fileSize} • {file.uploadDate}</p>
                                  </div>
                                </div>
                                <Button variant="ghost" size="sm">
                                  <Download className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                            {files.filter(f => f.courseId === course.id).length === 0 && (
                              <p className="text-center text-muted-foreground py-8">{t('لا توجد ملفات حالياً', 'No files available')}</p>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </Card>
                ))}
              </CardContent>
            </Card>

            {/* All Files */}
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <CardTitle className="flex items-center gap-2">
                    <File className="h-5 w-5 text-secondary" />
                    {t('جميع الملفات', 'All Files')}
                  </CardTitle>
                  <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder={t('اختر المقرر', 'Select Course')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t('جميع المقررات', 'All Courses')}</SelectItem>
                      {courses.map(course => (
                        <SelectItem key={course.id} value={course.id}>{course.code}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {filteredFiles.map((file) => (
                    <div key={file.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                      <div className="flex items-center gap-4">
                        {getFileIcon(file.type)}
                        <div>
                          <p className="font-medium">{language === 'ar' ? file.titleAr : file.titleEn}</p>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <Badge variant="outline" className="text-xs">{file.courseCode}</Badge>
                            <span>{file.fileSize}</span>
                            <span>{file.uploadDate}</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 me-2" />
                        {t('تحميل', 'Download')}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Schedule Tab */}
          <TabsContent value="schedule" className="animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-secondary" />
                  {t('جدول الحصص الأسبوعي', 'Weekly Schedule')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <div className="min-w-[800px]">
                    {days.map((day) => {
                      const daySchedule = schedule.filter(s => 
                        language === 'ar' ? s.dayAr === day.ar : s.dayEn === day.en
                      );
                      
                      if (daySchedule.length === 0) return null;
                      
                      return (
                        <div key={day.en} className="mb-6">
                          <h3 className="font-bold text-lg mb-3 text-secondary">
                            {language === 'ar' ? day.ar : day.en}
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                            {daySchedule.map((item) => (
                              <Card 
                                key={item.id} 
                                className={`p-4 border-s-4 ${
                                  item.type === 'lecture' ? 'border-s-secondary' :
                                  item.type === 'lab' ? 'border-s-purple-500' : 'border-s-blue-500'
                                }`}
                              >
                                <div className="flex items-start justify-between">
                                  <div>
                                    <Badge variant="outline" className="mb-2 font-mono">{item.courseCode}</Badge>
                                    <h4 className="font-medium">
                                      {language === 'ar' ? item.courseNameAr : item.courseNameEn}
                                    </h4>
                                    <p className="text-sm text-muted-foreground mt-1">
                                      {language === 'ar' ? item.doctorAr : item.doctorEn}
                                    </p>
                                  </div>
                                  <div className="text-end">
                                    <p className="font-mono text-sm">{item.time}</p>
                                    <p className="text-sm text-muted-foreground flex items-center gap-1 justify-end mt-1">
                                      <MapPin className="h-3 w-3" />
                                      {item.classroom}
                                    </p>
                                    <Badge 
                                      variant="secondary" 
                                      className={`mt-2 text-xs ${
                                        item.type === 'lecture' ? 'bg-secondary/20' :
                                        item.type === 'lab' ? 'bg-purple-500/20 text-purple-600' : 'bg-blue-500/20 text-blue-600'
                                      }`}
                                    >
                                      {item.type === 'lecture' ? t('محاضرة', 'Lecture') : 
                                       item.type === 'lab' ? t('معمل', 'Lab') : t('تمارين', 'Tutorial')}
                                    </Badge>
                                  </div>
                                </div>
                              </Card>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Grades Tab */}
          <TabsContent value="grades" className="animate-fade-in space-y-6">
            {/* GPA Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="p-4 bg-gradient-to-br from-secondary/10 to-secondary/5">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-full bg-secondary/20">
                    <TrendingUp className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t('المعدل التراكمي', 'Cumulative GPA')}</p>
                    <p className="text-2xl font-bold text-secondary">{profile?.gpa.toFixed(2)}</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-full bg-green-500/20">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t('ناجح', 'Passed')}</p>
                    <p className="text-2xl font-bold text-green-600">{grades.filter(g => g.status === 'pass').length}</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-full bg-blue-500/20">
                    <Timer className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t('قيد الدراسة', 'In Progress')}</p>
                    <p className="text-2xl font-bold text-blue-600">{grades.filter(g => g.status === 'in_progress').length}</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-full bg-muted">
                    <GraduationCap className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t('إجمالي الساعات', 'Total Credits')}</p>
                    <p className="text-2xl font-bold">{profile?.completedCredits}</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Grades Table */}
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-secondary" />
                    {t('كشف الدرجات', 'Grade Report')}
                  </CardTitle>
                  <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder={t('اختر الفصل', 'Select Semester')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t('جميع الفصول', 'All Semesters')}</SelectItem>
                      {semesters.map(sem => (
                        <SelectItem key={sem} value={sem}>{sem}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="p-3 text-start">{t('المقرر', 'Course')}</th>
                        <th className="p-3 text-center">{t('الساعات', 'Credits')}</th>
                        <th className="p-3 text-center">{t('الحضور', 'Attend.')}</th>
                        <th className="p-3 text-center">{t('أعمال السنة', 'Coursework')}</th>
                        <th className="p-3 text-center">{t('النصفي', 'Midterm')}</th>
                        <th className="p-3 text-center">{t('النهائي', 'Final')}</th>
                        <th className="p-3 text-center">{t('المجموع', 'Total')}</th>
                        <th className="p-3 text-center">{t('التقدير', 'Grade')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredGrades.map((grade) => (
                        <tr key={grade.id} className="border-b hover:bg-muted/30">
                          <td className="p-3">
                            <div>
                              <Badge variant="outline" className="font-mono text-xs mb-1">{grade.courseCode}</Badge>
                              <p className="font-medium">{language === 'ar' ? grade.courseNameAr : grade.courseNameEn}</p>
                              <p className="text-xs text-muted-foreground">{language === 'ar' ? grade.semesterAr : grade.semesterEn}</p>
                            </div>
                          </td>
                          <td className="p-3 text-center">{grade.creditHours}</td>
                          <td className="p-3 text-center">{grade.attendance}%</td>
                          <td className="p-3 text-center">{grade.coursework}/30</td>
                          <td className="p-3 text-center">{grade.midterm}/30</td>
                          <td className="p-3 text-center">{grade.status === 'in_progress' ? '-' : `${grade.final}/50`}</td>
                          <td className="p-3 text-center font-bold">{grade.status === 'in_progress' ? grade.total : grade.total}/100</td>
                          <td className="p-3 text-center">
                            {grade.status === 'in_progress' ? (
                              <Badge variant="secondary">{t('قيد الدراسة', 'In Progress')}</Badge>
                            ) : (
                              <span className={`font-bold text-lg ${getGradeColor(grade.grade)}`}>{grade.grade}</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Finance Tab */}
          <TabsContent value="finance" className="animate-fade-in space-y-6">
            {/* Finance Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="p-4 bg-gradient-to-br from-secondary/10 to-secondary/5">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-full bg-secondary/20">
                    <Wallet className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t('إجمالي الرسوم', 'Total Fees')}</p>
                    <p className="text-xl font-bold">{formatCurrency(finance?.totalFees || 0)}</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4 bg-green-500/5">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-full bg-green-500/20">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t('المدفوع', 'Paid')}</p>
                    <p className="text-xl font-bold text-green-600">{formatCurrency(finance?.totalPaid || 0)}</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4 bg-red-500/5">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-full bg-red-500/20">
                    <AlertCircle className="h-6 w-6 text-red-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t('المتبقي', 'Remaining')}</p>
                    <p className="text-xl font-bold text-red-600">{formatCurrency(finance?.totalRemaining || 0)}</p>
                  </div>
                </div>
              </Card>
              {finance?.discountAmount && finance.discountAmount > 0 && (
                <Card className="p-4 bg-purple-500/5">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-full bg-purple-500/20">
                      <Award className="h-6 w-6 text-purple-500" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{t('الخصم', 'Discount')}</p>
                      <p className="text-xl font-bold text-purple-600">{formatCurrency(finance.discountAmount)}</p>
                      <p className="text-xs text-muted-foreground">{finance.discountType}</p>
                    </div>
                  </div>
                </Card>
              )}
            </div>

            {/* Payment Progress */}
            <Card>
              <CardHeader>
                <CardTitle>{t('نسبة السداد', 'Payment Progress')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{t('المدفوع', 'Paid')}: {formatCurrency(finance?.totalPaid || 0)}</span>
                    <span>{Math.round((finance?.totalPaid || 0) / (finance?.totalFees || 1) * 100)}%</span>
                  </div>
                  <Progress value={(finance?.totalPaid || 0) / (finance?.totalFees || 1) * 100} className="h-3" />
                </div>
              </CardContent>
            </Card>

            {/* Installments */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-secondary" />
                  {t('الأقساط', 'Installments')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {finance?.installments.map((installment) => (
                    <div key={installment.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4 mb-4 md:mb-0">
                        <div className={`p-3 rounded-full ${
                          installment.status === 'paid' ? 'bg-green-500/20' :
                          installment.status === 'overdue' ? 'bg-red-500/20' :
                          installment.status === 'partial' ? 'bg-blue-500/20' : 'bg-yellow-500/20'
                        }`}>
                          {installment.status === 'paid' ? <CheckCircle className="h-5 w-5 text-green-500" /> :
                           installment.status === 'overdue' ? <AlertCircle className="h-5 w-5 text-red-500" /> :
                           <Timer className="h-5 w-5 text-yellow-500" />}
                        </div>
                        <div>
                          <p className="font-bold">{t('القسط', 'Installment')} #{installment.installmentNumber}</p>
                          <p className="text-sm text-muted-foreground">{t('تاريخ الاستحقاق:', 'Due:')} {installment.dueDate}</p>
                          {installment.paidDate && (
                            <p className="text-sm text-green-600">{t('تاريخ الدفع:', 'Paid:')} {installment.paidDate}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">{t('المبلغ', 'Amount')}</p>
                          <p className="font-bold">{formatCurrency(installment.amountTotal)}</p>
                        </div>
                        {installment.status === 'partial' && (
                          <div className="text-center">
                            <p className="text-sm text-muted-foreground">{t('المتبقي', 'Remaining')}</p>
                            <p className="font-bold text-red-600">{formatCurrency(installment.amountRemaining)}</p>
                          </div>
                        )}
                        {getStatusBadge(installment.status)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Payment History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-secondary" />
                  {t('سجل المدفوعات', 'Payment History')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="p-3 text-start">{t('رقم الإيصال', 'Receipt No.')}</th>
                        <th className="p-3 text-start">{t('الوصف', 'Description')}</th>
                        <th className="p-3 text-center">{t('التاريخ', 'Date')}</th>
                        <th className="p-3 text-center">{t('طريقة الدفع', 'Method')}</th>
                        <th className="p-3 text-end">{t('المبلغ', 'Amount')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {finance?.payments.map((payment) => (
                        <tr key={payment.id} className="border-b hover:bg-muted/30">
                          <td className="p-3 font-mono text-sm">{payment.receiptNumber}</td>
                          <td className="p-3">{language === 'ar' ? payment.descriptionAr : payment.descriptionEn}</td>
                          <td className="p-3 text-center">{payment.date}</td>
                          <td className="p-3 text-center">
                            <Badge variant="outline">{language === 'ar' ? payment.methodAr : payment.methodEn}</Badge>
                          </td>
                          <td className="p-3 text-end font-bold text-green-600">{formatCurrency(payment.amount)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages" className="animate-fade-in">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Conversations List */}
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-secondary" />
                    {t('المحادثات', 'Conversations')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {conversations.length === 0 ? (
                    <div className="p-4 text-center text-muted-foreground">
                      <p className="text-sm">{t('لا توجد محادثات', 'No conversations')}</p>
                    </div>
                  ) : (
                    <div className="divide-y">
                      {conversations.map((conv) => (
                        <div
                          key={conv.id}
                          onClick={() => handleSelectConversation(conv)}
                          className={`p-4 cursor-pointer hover:bg-muted/50 transition-colors ${
                            currentConversation?.id === conv.id ? 'bg-secondary/10 border-s-4 border-secondary' : ''
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-secondary to-gold flex items-center justify-center shrink-0">
                              <User className="h-5 w-5 text-secondary-foreground" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-sm truncate">{conv.doctorName}</p>
                              <p className="text-xs text-muted-foreground truncate">{conv.lastMessage || t('لا توجد رسائل', 'No messages')}</p>
                            </div>
                            {conv.unreadCount > 0 && (
                              <Badge className="bg-red-500 text-white">{conv.unreadCount}</Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">
                            {new Date(conv.lastMessageDate).toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US')}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="p-4 border-t">
                    <Button variant="outline" className="w-full" onClick={() => navigate('/faculty')}>
                      {t('محادثة جديدة', 'New Conversation')}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Chat Area */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-secondary" />
                    {currentConversation 
                      ? currentConversation.doctorName 
                      : t('اختر محادثة', 'Select a conversation')
                    }
                  </CardTitle>
                  {currentConversation && (
                    <CardDescription>{currentConversation.doctorEmail}</CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  {currentConversation ? (
                    <div className="space-y-4">
                      {/* Messages List */}
                      <div className="space-y-3 max-h-[400px] overflow-y-auto p-2 bg-muted/30 rounded-lg">
                        {conversationMessages.length === 0 ? (
                          <div className="text-center py-8 text-muted-foreground">
                            <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p>{t('لا توجد رسائل بعد، ابدأ المحادثة الآن', 'No messages yet, start the conversation')}</p>
                          </div>
                        ) : (
                          conversationMessages.map((msg) => (
                            <div 
                              key={msg.id} 
                              className={`p-3 rounded-lg max-w-[80%] ${
                                msg.senderType === 'student' 
                                  ? 'bg-secondary/20 ms-auto text-end' 
                                  : 'bg-background me-auto border'
                              }`}
                            >
                              <p className="text-sm">{msg.text}</p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {new Date(msg.createdAt).toLocaleString(language === 'ar' ? 'ar-SA' : 'en-US')}
                              </p>
                            </div>
                          ))
                        )}
                      </div>
                      
                      {/* Send Message */}
                      <div className="flex gap-2">
                        <Textarea
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder={t('اكتب رسالتك هنا...', 'Write your message here...')}
                          className="flex-1 min-h-[80px]"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              handleSendMessage();
                            }
                          }}
                        />
                        <Button 
                          onClick={handleSendMessage} 
                          className="self-end"
                          disabled={!newMessage.trim()}
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <MessageSquare className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                      <p className="text-lg font-semibold text-foreground mb-2">
                        {t('اختر محادثة من القائمة', 'Select a conversation from the list')}
                      </p>
                      <p className="text-muted-foreground mb-6">
                        {t('أو ابدأ محادثة جديدة مع أحد الدكاترة', 'Or start a new conversation with a faculty member')}
                      </p>
                      <Button variant="outline" onClick={() => navigate('/faculty')}>
                        {t('تصفح هيئة التدريس', 'Browse Faculty')}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <Button variant="outline" onClick={() => navigate('/')} className="px-8">
            {t('العودة للصفحة الرئيسية', 'Back to Home')}
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
