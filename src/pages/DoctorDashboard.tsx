import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  User, BookOpen, Calendar, Users, FileText, Wallet,
  Mail, Phone, Clock, MapPin, GraduationCap, Building,
  Search, Download, Save, CheckCircle, AlertCircle, Timer,
  Bell, MessageSquare, Upload, File, Trash2, Video, FileSpreadsheet,
  Send, Eye, X, Edit, Megaphone
} from 'lucide-react';
import { toast } from 'sonner';
import {
  getDoctorProfile,
  getTeachingCourses,
  getDoctorStudents,
  getDoctorSchedule,
  getDoctorFinance,
  getDoctorNotifications,
  getDoctorMessages,
  getCourseMaterials,
  markNotificationAsRead,
  markMessageAsRead,
  updateDoctorProfile
} from '@/services/data/doctor.service.mock';
import { messagesService, Conversation, Message as ChatMessage } from '@/services/data/messages.service.mock';
import type { 
  DoctorProfile, 
  TeachingCourse, 
  DoctorStudent, 
  DoctorScheduleItem, 
  DoctorFinance,
  DoctorNotification,
  DoctorMessage,
  CourseMaterial
} from '@/types';

export default function DoctorDashboard() {
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<DoctorProfile | null>(null);
  const [courses, setCourses] = useState<TeachingCourse[]>([]);
  const [students, setStudents] = useState<DoctorStudent[]>([]);
  const [schedule, setSchedule] = useState<DoctorScheduleItem[]>([]);
  const [finance, setFinance] = useState<DoctorFinance | null>(null);
  const [notifications, setNotifications] = useState<DoctorNotification[]>([]);
  const [messages, setMessages] = useState<DoctorMessage[]>([]);
  const [materials, setMaterials] = useState<CourseMaterial[]>([]);
  
  const [selectedCourse, setSelectedCourse] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [gradesData, setGradesData] = useState<Record<string, { midterm: number; final: number }>>({});
  const [selectedMessage, setSelectedMessage] = useState<DoctorMessage | null>(null);
  const [replyText, setReplyText] = useState('');
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [announcementDialogOpen, setAnnouncementDialogOpen] = useState(false);
  const [selectedCourseForUpload, setSelectedCourseForUpload] = useState<string>('');
  const [announcementText, setAnnouncementText] = useState('');
  const [courseAnnouncements, setCourseAnnouncements] = useState<Record<string, string[]>>({});
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editedProfile, setEditedProfile] = useState<{ email?: string; phone?: string }>({});
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const profileImageRef = useRef<HTMLInputElement>(null);
  
  // Student conversations state
  const [studentConversations, setStudentConversations] = useState<Conversation[]>([]);
  const [currentStudentConversation, setCurrentStudentConversation] = useState<Conversation | null>(null);
  const [studentChatMessages, setStudentChatMessages] = useState<ChatMessage[]>([]);
  const [studentReplyText, setStudentReplyText] = useState('');
  const [studentMessageCount, setStudentMessageCount] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [profileData, coursesData, studentsData, scheduleData, financeData, notificationsData, messagesData, materialsData] = await Promise.all([
          getDoctorProfile(),
          getTeachingCourses(),
          getDoctorStudents(),
          getDoctorSchedule(),
          getDoctorFinance(),
          getDoctorNotifications(),
          getDoctorMessages(),
          getCourseMaterials()
        ]);
        setProfile(profileData);
        setCourses(coursesData);
        setStudents(studentsData);
        setSchedule(scheduleData);
        setFinance(financeData);
        setNotifications(notificationsData);
        setMessages(messagesData);
        setMaterials(materialsData);
        setEditedProfile({ email: profileData.email, phone: profileData.phone });
        
        // Initialize grades data
        const initialGrades: Record<string, { midterm: number; final: number }> = {};
        studentsData.forEach(s => {
          initialGrades[s.id] = { midterm: s.midterm || 0, final: s.final || 0 };
        });
        setGradesData(initialGrades);
        
        // Load student conversations for this doctor
        const doctorId = '1'; // Mock doctor ID
        const [convs, unreadCount] = await Promise.all([
          messagesService.getDoctorConversations(doctorId),
          messagesService.getDoctorUnreadCount(doctorId)
        ]);
        setStudentConversations(convs);
        setStudentMessageCount(unreadCount);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleSelectStudentConversation = async (conv: Conversation) => {
    setCurrentStudentConversation(conv);
    const msgs = await messagesService.getConversationMessages(conv.id);
    setStudentChatMessages(msgs);
    await messagesService.markConversationAsRead(conv.id, 'doctor');
    
    // Update unread count
    const unreadCount = await messagesService.getDoctorUnreadCount('1');
    setStudentMessageCount(unreadCount);
  };

  const handleSendStudentReply = async () => {
    if (!studentReplyText.trim() || !currentStudentConversation) return;
    
    const msg = await messagesService.sendMessage(
      currentStudentConversation.id,
      studentReplyText.trim(),
      'doctor',
      profile?.nameAr || 'الدكتور'
    );
    setStudentChatMessages(prev => [...prev, msg]);
    setStudentReplyText('');
    
    // Update conversation in list
    setStudentConversations(prev => prev.map(c => 
      c.id === currentStudentConversation.id 
        ? { ...c, lastMessage: msg.text, lastMessageDate: msg.createdAt }
        : c
    ));
    
    toast.success(t('تم إرسال الرد بنجاح', 'Reply sent successfully'));
  };

  const filteredStudents = students.filter(student => {
    const matchesCourse = selectedCourse === 'all' || student.courseId === selectedCourse;
    const matchesSearch = student.nameAr.includes(searchQuery) || 
                         student.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.academicNumber.includes(searchQuery);
    return matchesCourse && matchesSearch;
  });

  const handleSaveGrades = () => {
    toast.success(t('تم حفظ الدرجات بنجاح', 'Grades saved successfully'));
  };

  const handleExportExcel = () => {
    // Generate CSV content
    const headers = [
      t('الرقم الأكاديمي', 'Academic No'),
      t('الاسم', 'Name'),
      t('المقرر', 'Course'),
      t('أعمال السنة', 'Coursework'),
      t('النهائي', 'Final'),
      t('المجموع', 'Total')
    ];
    
    const rows = filteredStudents.map(student => [
      student.academicNumber,
      language === 'ar' ? student.nameAr : student.nameEn,
      student.courseCode,
      gradesData[student.id]?.midterm || 0,
      gradesData[student.id]?.final || 0,
      (gradesData[student.id]?.midterm || 0) + (gradesData[student.id]?.final || 0)
    ]);

    const csvContent = [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `grades_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success(t('تم تصدير الدرجات بنجاح', 'Grades exported successfully'));
  };

  const handleExportPDF = () => {
    // Create printable HTML content
    const printContent = `
      <!DOCTYPE html>
      <html dir="${language === 'ar' ? 'rtl' : 'ltr'}">
      <head>
        <meta charset="utf-8">
        <title>${t('تقرير الدرجات', 'Grades Report')}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          h1 { text-align: center; color: #333; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #ddd; padding: 10px; text-align: center; }
          th { background-color: #4a5568; color: white; }
          tr:nth-child(even) { background-color: #f9f9f9; }
          .header-info { margin-bottom: 20px; }
        </style>
      </head>
      <body>
        <h1>${t('تقرير درجات الطلاب', 'Student Grades Report')}</h1>
        <div class="header-info">
          <p><strong>${t('الأستاذ:', 'Professor:')} </strong>${language === 'ar' ? profile?.nameAr : profile?.nameEn}</p>
          <p><strong>${t('التاريخ:', 'Date:')} </strong>${new Date().toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US')}</p>
        </div>
        <table>
          <thead>
            <tr>
              <th>${t('الرقم الأكاديمي', 'Academic No')}</th>
              <th>${t('الاسم', 'Name')}</th>
              <th>${t('المقرر', 'Course')}</th>
              <th>${t('أعمال السنة', 'Coursework')}</th>
              <th>${t('النهائي', 'Final')}</th>
              <th>${t('المجموع', 'Total')}</th>
            </tr>
          </thead>
          <tbody>
            ${filteredStudents.map(student => `
              <tr>
                <td>${student.academicNumber}</td>
                <td>${language === 'ar' ? student.nameAr : student.nameEn}</td>
                <td>${student.courseCode}</td>
                <td>${gradesData[student.id]?.midterm || 0}</td>
                <td>${gradesData[student.id]?.final || 0}</td>
                <td>${(gradesData[student.id]?.midterm || 0) + (gradesData[student.id]?.final || 0)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.print();
    }
    toast.success(t('جاري طباعة التقرير', 'Printing report'));
  };

  const handleSaveProfile = async () => {
    try {
      await updateDoctorProfile(editedProfile);
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
    await markNotificationAsRead(id);
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const handleMarkMessageRead = async (message: DoctorMessage) => {
    if (!message.isRead) {
      await markMessageAsRead(message.id);
      setMessages(prev => prev.map(m => m.id === message.id ? { ...m, isRead: true } : m));
    }
    setSelectedMessage(message);
  };

  const handleSendReply = () => {
    if (!replyText.trim()) return;
    toast.success(t('تم إرسال الرد بنجاح', 'Reply sent successfully'));
    setReplyText('');
    setSelectedMessage(null);
  };

  const handleFileUpload = () => {
    if (!selectedCourseForUpload) {
      toast.error(t('يرجى اختيار المقرر أولاً', 'Please select a course first'));
      return;
    }
    fileInputRef.current?.click();
  };

  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const newMaterial: CourseMaterial = {
        id: String(materials.length + 1),
        courseId: selectedCourseForUpload,
        titleAr: file.name,
        titleEn: file.name,
        type: file.type.includes('video') ? 'video' : 'lecture',
        fileName: file.name,
        fileSize: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
        uploadDate: new Date().toISOString().split('T')[0],
        downloadCount: 0
      };
      setMaterials(prev => [...prev, newMaterial]);
      toast.success(t('تم رفع الملف بنجاح', 'File uploaded successfully'));
      setUploadDialogOpen(false);
      e.target.value = '';
    }
  };

  const handleDeleteMaterial = (id: string) => {
    setMaterials(prev => prev.filter(m => m.id !== id));
    toast.success(t('تم حذف الملف بنجاح', 'File deleted successfully'));
  };

  const handleAddAnnouncement = () => {
    if (!selectedCourseForUpload) {
      toast.error(t('يرجى اختيار المقرر أولاً', 'Please select a course first'));
      return;
    }
    if (!announcementText.trim()) {
      toast.error(t('يرجى كتابة الإعلان', 'Please write the announcement'));
      return;
    }
    setCourseAnnouncements(prev => ({
      ...prev,
      [selectedCourseForUpload]: [...(prev[selectedCourseForUpload] || []), announcementText.trim()]
    }));
    toast.success(t('تم إضافة الإعلان بنجاح', 'Announcement added successfully'));
    setAnnouncementText('');
    setAnnouncementDialogOpen(false);
  };

  const handleDeleteAnnouncement = (courseId: string, index: number) => {
    setCourseAnnouncements(prev => ({
      ...prev,
      [courseId]: prev[courseId].filter((_, i) => i !== index)
    }));
    toast.success(t('تم حذف الإعلان بنجاح', 'Announcement deleted successfully'));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(language === 'ar' ? 'ar-YE' : 'en-US').format(amount) + (language === 'ar' ? ' ر.ي' : ' YER');
  };

  const unreadNotifications = notifications.filter(n => !n.isRead).length;
  const unreadMessages = messages.filter(m => !m.isRead).length;

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
        {/* Page Title */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
            {t('لوحة تحكم الدكتور', 'Doctor Dashboard')}
          </h1>
          <p className="text-muted-foreground">
            {t(`مرحباً، ${profile?.nameAr}`, `Welcome, ${profile?.nameEn}`)}
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 md:grid-cols-7 gap-2 h-auto p-2 bg-muted/50">
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
            <TabsTrigger value="students" className="flex items-center gap-2 py-3">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">{t('الطلاب', 'Students')}</span>
            </TabsTrigger>
            <TabsTrigger value="grades" className="flex items-center gap-2 py-3">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">{t('الدرجات', 'Grades')}</span>
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center gap-2 py-3 relative">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">{t('الرسائل', 'Messages')}</span>
              {(unreadNotifications + unreadMessages) > 0 && (
                <span className="absolute -top-1 -end-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {unreadNotifications + unreadMessages}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="finance" className="flex items-center gap-2 py-3">
              <Wallet className="h-4 w-4" />
              <span className="hidden sm:inline">{t('المالية', 'Finance')}</span>
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
                  <p className="text-secondary font-medium mb-4">
                    {language === 'ar' ? profile?.degreeAr : profile?.degreeEn}
                  </p>
                  <Badge variant="secondary" className="mb-4">
                    {language === 'ar' ? profile?.specializationAr : profile?.specializationEn}
                  </Badge>
                </CardContent>
              </Card>

              {/* Info Cards */}
              <div className="md:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building className="h-5 w-5 text-secondary" />
                      {t('المعلومات الأكاديمية', 'Academic Information')}
                    </CardTitle>
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
                      <Label className="text-sm text-muted-foreground">{t('البريد الإلكتروني', 'Email')}</Label>
                      {isEditingProfile ? (
                        <Input 
                          value={editedProfile.email || ''} 
                          onChange={(e) => setEditedProfile(prev => ({ ...prev, email: e.target.value }))}
                        />
                      ) : (
                        <div className="flex items-center gap-2 mt-1">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span>{profile?.email}</span>
                        </div>
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
                        <div className="flex items-center gap-2 mt-1">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span dir="ltr">{profile?.phone}</span>
                        </div>
                      )}
                    </div>
                    <div className="sm:col-span-2">
                      <Label className="text-sm text-muted-foreground">{t('ساعات المكتب', 'Office Hours')}</Label>
                      <div className="flex items-center gap-2 mt-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{language === 'ar' ? profile?.officeHoursAr : profile?.officeHoursEn}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>{t('نبذة شخصية', 'Biography')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {language === 'ar' ? profile?.bioAr : profile?.bioEn}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Courses Tab with Materials */}
          <TabsContent value="courses" className="animate-fade-in space-y-6">
            {/* Upload Dialog */}
            <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{t('رفع ملف جديد', 'Upload New File')}</DialogTitle>
                  <DialogDescription>{t('اختر المقرر والملف المراد رفعه للطلاب', 'Select the course and file to upload for students')}</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>{t('المقرر', 'Course')}</Label>
                    <Select value={selectedCourseForUpload} onValueChange={setSelectedCourseForUpload}>
                      <SelectTrigger>
                        <SelectValue placeholder={t('اختر المقرر', 'Select course')} />
                      </SelectTrigger>
                      <SelectContent>
                        {courses.map((course) => (
                          <SelectItem key={course.id} value={course.id}>
                            {course.code} - {language === 'ar' ? course.nameAr : course.nameEn}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileSelected}
                    accept=".pdf,.doc,.docx,.ppt,.pptx,.mp4,.mp3,.zip"
                  />
                  <Button onClick={handleFileUpload} className="w-full">
                    <Upload className="h-4 w-4 me-2" />
                    {t('اختر ملف للرفع', 'Choose file to upload')}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            {/* Announcement Dialog */}
            <Dialog open={announcementDialogOpen} onOpenChange={setAnnouncementDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{t('إضافة إعلان جديد', 'Add New Announcement')}</DialogTitle>
                  <DialogDescription>{t('اختر المقرر واكتب الإعلان للطلاب', 'Select the course and write the announcement for students')}</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>{t('المقرر', 'Course')}</Label>
                    <Select value={selectedCourseForUpload} onValueChange={setSelectedCourseForUpload}>
                      <SelectTrigger>
                        <SelectValue placeholder={t('اختر المقرر', 'Select course')} />
                      </SelectTrigger>
                      <SelectContent>
                        {courses.map((course) => (
                          <SelectItem key={course.id} value={course.id}>
                            {course.code} - {language === 'ar' ? course.nameAr : course.nameEn}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>{t('نص الإعلان', 'Announcement Text')}</Label>
                    <Textarea 
                      value={announcementText}
                      onChange={(e) => setAnnouncementText(e.target.value)}
                      placeholder={t('اكتب الإعلان هنا...', 'Write the announcement here...')}
                      rows={4}
                    />
                  </div>
                  <Button onClick={handleAddAnnouncement} className="w-full">
                    <Megaphone className="h-4 w-4 me-2" />
                    {t('إضافة الإعلان', 'Add Announcement')}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">{t('المقررات والملفات', 'Courses & Materials')}</h2>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setAnnouncementDialogOpen(true)}>
                  <Megaphone className="h-4 w-4 me-2" />
                  {t('إعلان جديد', 'New Announcement')}
                </Button>
                <Button onClick={() => setUploadDialogOpen(true)}>
                  <Upload className="h-4 w-4 me-2" />
                  {t('رفع ملف جديد', 'Upload New File')}
                </Button>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => {
                const courseMaterials = materials.filter(m => m.courseId === course.id);
                return (
                  <Card key={course.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <Badge variant="outline" className="mb-2">{course.code}</Badge>
                        <Badge className="bg-secondary/20 text-secondary">
                          {course.creditHours} {t('ساعات', 'hrs')}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">
                        {language === 'ar' ? course.nameAr : course.nameEn}
                      </CardTitle>
                      <CardDescription>{course.semester}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{course.studentsCount} {t('طالب', 'students')}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{language === 'ar' ? course.scheduleAr : course.scheduleEn}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{course.classroom}</span>
                      </div>
                      
                      {/* Course Announcements */}
                      {courseAnnouncements[course.id]?.length > 0 && (
                        <div className="mt-4 pt-4 border-t">
                          <p className="text-sm font-medium mb-2 flex items-center gap-2">
                            <Megaphone className="h-4 w-4 text-amber-500" />
                            {t('الإعلانات', 'Announcements')} ({courseAnnouncements[course.id].length})
                          </p>
                          <div className="space-y-2 max-h-32 overflow-y-auto">
                            {courseAnnouncements[course.id].map((announcement, index) => (
                              <div key={index} className="flex items-start justify-between text-xs bg-amber-50 dark:bg-amber-950/30 p-2 rounded border border-amber-200 dark:border-amber-800">
                                <span className="flex-1">{announcement}</span>
                                <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-red-500 shrink-0" onClick={() => handleDeleteAnnouncement(course.id, index)}>
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Course Materials */}
                      {courseMaterials.length > 0 && (
                        <div className="mt-4 pt-4 border-t">
                          <p className="text-sm font-medium mb-2">{t('الملفات المرفوعة', 'Uploaded Files')} ({courseMaterials.length})</p>
                          <div className="space-y-2 max-h-32 overflow-y-auto">
                            {courseMaterials.map((material) => (
                              <div key={material.id} className="flex items-center justify-between text-xs bg-muted/50 p-2 rounded">
                                <div className="flex items-center gap-2 flex-1 min-w-0">
                                  {material.type === 'video' ? <Video className="h-3 w-3 text-purple-500" /> : <File className="h-3 w-3 text-blue-500" />}
                                  <span className="truncate">{material.fileName}</span>
                                </div>
                                <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-red-500" onClick={() => handleDeleteMaterial(material.id)}>
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Schedule Tab */}
          <TabsContent value="schedule" className="animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle>{t('الجدول الأسبوعي', 'Weekly Schedule')}</CardTitle>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  <thead>
                    <tr className="border-b">
                      <th className="p-3 text-start font-medium">{t('اليوم', 'Day')}</th>
                      <th className="p-3 text-start font-medium">{t('الوقت', 'Time')}</th>
                      <th className="p-3 text-start font-medium">{t('المقرر', 'Course')}</th>
                      <th className="p-3 text-start font-medium">{t('القاعة', 'Room')}</th>
                      <th className="p-3 text-start font-medium">{t('النوع', 'Type')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {schedule.map((item) => (
                      <tr key={item.id} className="border-b hover:bg-muted/50">
                        <td className="p-3">{language === 'ar' ? item.dayAr : item.dayEn}</td>
                        <td className="p-3 font-mono text-sm" dir="ltr">{item.time}</td>
                        <td className="p-3">
                          {item.courseCode && (
                            <Badge variant="outline" className="me-2">{item.courseCode}</Badge>
                          )}
                          {language === 'ar' ? item.courseNameAr : item.courseNameEn}
                        </td>
                        <td className="p-3">{item.classroom}</td>
                        <td className="p-3">
                          <Badge 
                            className={
                              item.type === 'lecture' ? 'bg-blue-500/20 text-blue-600' :
                              item.type === 'lab' ? 'bg-green-500/20 text-green-600' :
                              'bg-amber-500/20 text-amber-600'
                            }
                          >
                            {item.type === 'lecture' ? t('محاضرة', 'Lecture') :
                             item.type === 'lab' ? t('معمل', 'Lab') :
                             t('مكتب', 'Office')}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Students Tab */}
          <TabsContent value="students" className="animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle>{t('قائمة الطلاب', 'Students List')}</CardTitle>
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                  <div className="relative flex-1">
                    <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder={t('بحث بالاسم أو الرقم الأكاديمي...', 'Search by name or academic number...')}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="ps-10"
                    />
                  </div>
                  <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                    <SelectTrigger className="w-full sm:w-[200px]">
                      <SelectValue placeholder={t('اختر المقرر', 'Select course')} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t('جميع المقررات', 'All Courses')}</SelectItem>
                      {courses.map((course) => (
                        <SelectItem key={course.id} value={course.id}>
                          {course.code} - {language === 'ar' ? course.nameAr : course.nameEn}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  <thead>
                    <tr className="border-b">
                      <th className="p-3 text-start font-medium">{t('الرقم الأكاديمي', 'Academic No.')}</th>
                      <th className="p-3 text-start font-medium">{t('الاسم', 'Name')}</th>
                      <th className="p-3 text-start font-medium">{t('المقرر', 'Course')}</th>
                      <th className="p-3 text-start font-medium">{t('الحضور', 'Attendance')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((student) => (
                      <tr key={student.id} className="border-b hover:bg-muted/50">
                        <td className="p-3 font-mono text-sm">{student.academicNumber}</td>
                        <td className="p-3">{language === 'ar' ? student.nameAr : student.nameEn}</td>
                        <td className="p-3">
                          <Badge variant="outline">{student.courseCode}</Badge>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                              <div 
                                className={`h-full rounded-full ${
                                  student.attendance >= 90 ? 'bg-green-500' :
                                  student.attendance >= 75 ? 'bg-amber-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${student.attendance}%` }}
                              />
                            </div>
                            <span className="text-sm">{student.attendance}%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filteredStudents.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    {t('لا توجد نتائج', 'No results found')}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Grades Tab */}
          <TabsContent value="grades" className="animate-fade-in">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <CardTitle>{t('إدارة الدرجات', 'Grades Management')}</CardTitle>
                  <div className="flex gap-2 flex-wrap">
                    <Button variant="outline" size="sm" onClick={handleExportExcel}>
                      <FileSpreadsheet className="h-4 w-4 me-2" />
                      {t('تصدير Excel', 'Export Excel')}
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleExportPDF}>
                      <Download className="h-4 w-4 me-2" />
                      {t('تصدير PDF', 'Export PDF')}
                    </Button>
                    <Button size="sm" onClick={handleSaveGrades}>
                      <Save className="h-4 w-4 me-2" />
                      {t('حفظ', 'Save')}
                    </Button>
                  </div>
                </div>
                <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                  <SelectTrigger className="w-full sm:w-[300px] mt-4">
                    <SelectValue placeholder={t('اختر المقرر', 'Select course')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t('جميع المقررات', 'All Courses')}</SelectItem>
                    {courses.map((course) => (
                      <SelectItem key={course.id} value={course.id}>
                        {course.code} - {language === 'ar' ? course.nameAr : course.nameEn}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <table className="w-full min-w-[700px]">
                  <thead>
                    <tr className="border-b">
                      <th className="p-3 text-start font-medium">{t('الطالب', 'Student')}</th>
                      <th className="p-3 text-center font-medium">{t('أعمال السنة (30)', 'Coursework (30)')}</th>
                      <th className="p-3 text-center font-medium">{t('النهائي (70)', 'Final (70)')}</th>
                      <th className="p-3 text-center font-medium">{t('المجموع', 'Total')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((student) => (
                      <tr key={student.id} className="border-b hover:bg-muted/50">
                        <td className="p-3">
                          <div>
                            <p className="font-medium">{language === 'ar' ? student.nameAr : student.nameEn}</p>
                            <p className="text-sm text-muted-foreground">{student.academicNumber}</p>
                          </div>
                        </td>
                        <td className="p-3">
                          <Input
                            type="number"
                            min="0"
                            max="30"
                            value={gradesData[student.id]?.midterm || 0}
                            onChange={(e) => setGradesData(prev => ({
                              ...prev,
                              [student.id]: { ...prev[student.id], midterm: Number(e.target.value) }
                            }))}
                            className="w-20 mx-auto text-center"
                          />
                        </td>
                        <td className="p-3">
                          <Input
                            type="number"
                            min="0"
                            max="70"
                            value={gradesData[student.id]?.final || 0}
                            onChange={(e) => setGradesData(prev => ({
                              ...prev,
                              [student.id]: { ...prev[student.id], final: Number(e.target.value) }
                            }))}
                            className="w-20 mx-auto text-center"
                          />
                        </td>
                        <td className="p-3 text-center">
                          <Badge 
                            className={
                              (gradesData[student.id]?.midterm || 0) + (gradesData[student.id]?.final || 0) >= 85 ? 'bg-green-500/20 text-green-600' :
                              (gradesData[student.id]?.midterm || 0) + (gradesData[student.id]?.final || 0) >= 70 ? 'bg-blue-500/20 text-blue-600' :
                              (gradesData[student.id]?.midterm || 0) + (gradesData[student.id]?.final || 0) >= 50 ? 'bg-amber-500/20 text-amber-600' :
                              'bg-red-500/20 text-red-600'
                            }
                          >
                            {(gradesData[student.id]?.midterm || 0) + (gradesData[student.id]?.final || 0)}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Messages & Notifications Tab */}
          <TabsContent value="messages" className="animate-fade-in">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Notifications */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-secondary" />
                    {t('الإشعارات', 'Notifications')}
                    {unreadNotifications > 0 && (
                      <Badge className="bg-red-500">{unreadNotifications}</Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 max-h-[500px] overflow-y-auto">
                  {notifications.map((notification) => (
                    <div 
                      key={notification.id}
                      className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                        notification.isRead ? 'bg-muted/30' : 'bg-secondary/10 border-secondary/30'
                      }`}
                      onClick={() => handleMarkNotificationRead(notification.id)}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant="outline"
                            className={
                              notification.type === 'announcement' ? 'border-blue-500 text-blue-500' :
                              notification.type === 'reminder' ? 'border-amber-500 text-amber-500' :
                              notification.type === 'alert' ? 'border-red-500 text-red-500' :
                              'border-gray-500 text-gray-500'
                            }
                          >
                            {notification.type === 'announcement' ? t('إعلان', 'Announcement') :
                             notification.type === 'reminder' ? t('تذكير', 'Reminder') :
                             notification.type === 'alert' ? t('تنبيه', 'Alert') :
                             t('نظام', 'System')}
                          </Badge>
                          {!notification.isRead && (
                            <span className="h-2 w-2 bg-secondary rounded-full" />
                          )}
                        </div>
                        <span className="text-xs text-muted-foreground">{notification.date}</span>
                      </div>
                      <h4 className="font-medium mb-1">
                        {language === 'ar' ? notification.titleAr : notification.titleEn}
                      </h4>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {language === 'ar' ? notification.messageAr : notification.messageEn}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {t('من:', 'From:')} {language === 'ar' ? notification.senderAr : notification.senderEn}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Student Conversations */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-secondary" />
                    {t('محادثات الطلاب', 'Student Conversations')}
                    {studentMessageCount > 0 && (
                      <Badge className="bg-red-500">{studentMessageCount}</Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    {/* Conversations List */}
                    <div className="md:col-span-1 border rounded-lg overflow-hidden">
                      <div className="bg-muted/50 p-3 border-b">
                        <h4 className="font-semibold text-sm">{t('الطلاب', 'Students')}</h4>
                      </div>
                      {studentConversations.length === 0 ? (
                        <div className="p-4 text-center text-muted-foreground">
                          <p className="text-sm">{t('لا توجد محادثات', 'No conversations')}</p>
                        </div>
                      ) : (
                        <div className="divide-y max-h-[350px] overflow-y-auto">
                          {studentConversations.map((conv) => (
                            <div
                              key={conv.id}
                              onClick={() => handleSelectStudentConversation(conv)}
                              className={`p-3 cursor-pointer hover:bg-muted/50 transition-colors ${
                                currentStudentConversation?.id === conv.id ? 'bg-secondary/10 border-s-4 border-secondary' : ''
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-secondary to-gold flex items-center justify-center shrink-0">
                                  <User className="h-4 w-4 text-secondary-foreground" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="font-semibold text-sm truncate">{conv.studentName}</p>
                                  <p className="text-xs text-muted-foreground">{conv.studentAcademicNumber}</p>
                                </div>
                              </div>
                              <p className="text-xs text-muted-foreground truncate mt-1">{conv.lastMessage}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Chat Area */}
                    <div className="md:col-span-2 border rounded-lg overflow-hidden">
                      {currentStudentConversation ? (
                        <div className="flex flex-col h-[400px]">
                          {/* Header */}
                          <div className="bg-muted/50 p-3 border-b flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-secondary to-gold flex items-center justify-center">
                              <User className="h-5 w-5 text-secondary-foreground" />
                            </div>
                            <div>
                              <p className="font-semibold">{currentStudentConversation.studentName}</p>
                              <p className="text-xs text-muted-foreground">{currentStudentConversation.studentAcademicNumber}</p>
                            </div>
                          </div>
                          
                          {/* Messages */}
                          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-muted/20">
                            {studentChatMessages.map((msg) => (
                              <div 
                                key={msg.id} 
                                className={`p-3 rounded-lg max-w-[80%] ${
                                  msg.senderType === 'doctor' 
                                    ? 'bg-secondary/20 ms-auto text-end' 
                                    : 'bg-background me-auto border'
                                }`}
                              >
                                <p className="text-sm">{msg.text}</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {new Date(msg.createdAt).toLocaleString(language === 'ar' ? 'ar-SA' : 'en-US')}
                                </p>
                              </div>
                            ))}
                          </div>
                          
                          {/* Reply */}
                          <div className="p-3 border-t flex gap-2">
                            <Textarea
                              value={studentReplyText}
                              onChange={(e) => setStudentReplyText(e.target.value)}
                              placeholder={t('اكتب ردك هنا...', 'Write your reply here...')}
                              className="flex-1 min-h-[60px] max-h-[100px]"
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                  e.preventDefault();
                                  handleSendStudentReply();
                                }
                              }}
                            />
                            <Button 
                              onClick={handleSendStudentReply} 
                              className="self-end"
                              disabled={!studentReplyText.trim()}
                            >
                              <Send className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center h-[400px] text-muted-foreground">
                          <div className="text-center">
                            <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p>{t('اختر طالب من القائمة', 'Select a student from the list')}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Old Message Reply Dialog - Keep for legacy messages */}
            <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>{t('رسالة من طالب', 'Message from Student')}</DialogTitle>
                </DialogHeader>
                {selectedMessage && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-secondary to-gold flex items-center justify-center">
                        <User className="h-5 w-5 text-secondary-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">
                          {language === 'ar' ? selectedMessage.studentNameAr : selectedMessage.studentNameEn}
                        </p>
                        <p className="text-sm text-muted-foreground">{selectedMessage.studentAcademicNumber}</p>
                      </div>
                    </div>
                    <div>
                      <p className="font-medium mb-2">
                        {language === 'ar' ? selectedMessage.subjectAr : selectedMessage.subjectEn}
                      </p>
                      <p className="text-muted-foreground bg-muted/50 p-3 rounded-lg">
                        {language === 'ar' ? selectedMessage.messageAr : selectedMessage.messageEn}
                      </p>
                    </div>
                    <div>
                      <Label>{t('الرد', 'Reply')}</Label>
                      <Textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder={t('اكتب ردك هنا...', 'Write your reply here...')}
                        rows={4}
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setSelectedMessage(null)}>
                        {t('إلغاء', 'Cancel')}
                      </Button>
                      <Button onClick={handleSendReply}>
                        <Send className="h-4 w-4 me-2" />
                        {t('إرسال الرد', 'Send Reply')}
                      </Button>
                    </div>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </TabsContent>

          {/* Finance Tab */}
          <TabsContent value="finance" className="animate-fade-in">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Salary Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>{t('ملخص الراتب', 'Salary Summary')}</CardTitle>
                  <CardDescription>{t('الشهر الحالي', 'Current Month')}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-muted-foreground">{t('الراتب الأساسي', 'Base Salary')}</span>
                    <span className="font-medium">{formatCurrency(finance?.baseSalary || 0)}</span>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium text-green-600">{t('البدلات', 'Allowances')}</h4>
                    <div className="ps-4 space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>{language === 'ar' ? finance?.allowances.housingAr : finance?.allowances.housingEn}</span>
                        <span className="text-green-600">+{formatCurrency(finance?.allowances.housingAmount || 0)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{language === 'ar' ? finance?.allowances.transportAr : finance?.allowances.transportEn}</span>
                        <span className="text-green-600">+{formatCurrency(finance?.allowances.transportAmount || 0)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{language === 'ar' ? finance?.allowances.otherAr : finance?.allowances.otherEn}</span>
                        <span className="text-green-600">+{formatCurrency(finance?.allowances.otherAmount || 0)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-red-600">{t('الخصومات', 'Deductions')}</h4>
                    <div className="ps-4 space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>{language === 'ar' ? finance?.deductions.taxAr : finance?.deductions.taxEn}</span>
                        <span className="text-red-600">-{formatCurrency(finance?.deductions.taxAmount || 0)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{language === 'ar' ? finance?.deductions.insuranceAr : finance?.deductions.insuranceEn}</span>
                        <span className="text-red-600">-{formatCurrency(finance?.deductions.insuranceAmount || 0)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>{language === 'ar' ? finance?.deductions.otherAr : finance?.deductions.otherEn}</span>
                        <span className="text-red-600">-{formatCurrency(finance?.deductions.otherAmount || 0)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center py-3 border-t-2 border-secondary">
                    <span className="font-bold text-lg">{t('صافي الراتب', 'Net Salary')}</span>
                    <span className="font-bold text-lg text-secondary">{formatCurrency(finance?.netSalary || 0)}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Payment History */}
              <Card>
                <CardHeader>
                  <CardTitle>{t('سجل المدفوعات', 'Payment History')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {finance?.paymentHistory.map((payment) => (
                      <div 
                        key={payment.id} 
                        className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                      >
                        <div>
                          <p className="font-medium">{language === 'ar' ? payment.monthAr : payment.monthEn}</p>
                          <p className="text-sm text-muted-foreground">{formatCurrency(payment.netSalary)}</p>
                        </div>
                        <Badge 
                          className={
                            payment.status === 'paid' ? 'bg-green-500/20 text-green-600' :
                            payment.status === 'pending' ? 'bg-amber-500/20 text-amber-600' :
                            'bg-red-500/20 text-red-600'
                          }
                        >
                          {payment.status === 'paid' && <CheckCircle className="h-3 w-3 me-1" />}
                          {payment.status === 'pending' && <Timer className="h-3 w-3 me-1" />}
                          {payment.status === 'delayed' && <AlertCircle className="h-3 w-3 me-1" />}
                          {payment.status === 'paid' ? t('مدفوع', 'Paid') :
                           payment.status === 'pending' ? t('قيد الانتظار', 'Pending') :
                           t('متأخر', 'Delayed')}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Team Section */}
      <section className="py-16 bg-muted/30 border-t">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-display font-bold text-foreground mb-8">
              {t('فريق العمل', 'Development Team')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'Albaraa Nashwan Naaman',
                'Osama Mohammed Al-Rujwai',
                'Riyadh Mohammed Al-Rouhani',
                'Emad Adel Al-Kawkabani',
                'Hamzah Mansour Al-Harazi',
              ].map((member, index) => (
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