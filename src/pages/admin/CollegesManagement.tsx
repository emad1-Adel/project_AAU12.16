import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Edit, Trash2, GraduationCap, Upload, X, BookOpen, Target, Briefcase, Image, Users } from 'lucide-react';
import { toast } from 'sonner';
import { College, AcademicProgram, ProgramObjective, ProgramFacultyMember } from '@/types';
import { collegesService } from '@/services/data/colleges.service.mock';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function CollegesManagement() {
  const { t, language } = useLanguage();
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCollegeDialogOpen, setIsCollegeDialogOpen] = useState(false);
  const [isProgramDialogOpen, setIsProgramDialogOpen] = useState(false);
  const [editingCollege, setEditingCollege] = useState<College | null>(null);
  const [editingProgram, setEditingProgram] = useState<AcademicProgram | null>(null);
  const [selectedCollegeId, setSelectedCollegeId] = useState<string>('');
  const [collegeImagePreview, setCollegeImagePreview] = useState<string>('');
  const [programImagePreview, setProgramImagePreview] = useState<string>('');
  const collegeFileInputRef = useRef<HTMLInputElement>(null);
  const programFileInputRef = useRef<HTMLInputElement>(null);

  const [collegeFormData, setCollegeFormData] = useState({
    nameAr: '',
    nameEn: '',
    descriptionAr: '',
    descriptionEn: '',
    visionAr: '',
    visionEn: '',
    missionAr: '',
    missionEn: '',
    admissionRequirementsAr: '',
    admissionRequirementsEn: '',
    image: '',
    icon: '',
  });

  const [programFormData, setProgramFormData] = useState<{
    nameAr: string;
    nameEn: string;
    departmentAr: string;
    departmentEn: string;
    admissionRate: number;
    highSchoolType: 'علمي' | 'ادبي' | 'علمي + ادبي';
    highSchoolTypeEn: 'Scientific' | 'Literary' | 'Scientific + Literary';
    studyYears: string;
    image: string;
    descriptionAr: string;
    descriptionEn: string;
    objectives: ProgramObjective[];
    careerProspectsAr: string[];
    careerProspectsEn: string[];
    facultyMembers: ProgramFacultyMember[];
  }>({
    nameAr: '',
    nameEn: '',
    departmentAr: '',
    departmentEn: '',
    admissionRate: 50,
    highSchoolType: 'علمي',
    highSchoolTypeEn: 'Scientific',
    studyYears: '4',
    image: '',
    descriptionAr: '',
    descriptionEn: '',
    objectives: [],
    careerProspectsAr: [],
    careerProspectsEn: [],
    facultyMembers: [],
  });

  // For adding new objectives/careers/faculty
  const [newObjectiveAr, setNewObjectiveAr] = useState('');
  const [newObjectiveEn, setNewObjectiveEn] = useState('');
  const [newCareerAr, setNewCareerAr] = useState('');
  const [newCareerEn, setNewCareerEn] = useState('');
  const [newFacultyMember, setNewFacultyMember] = useState<Partial<ProgramFacultyMember>>({
    nameAr: '',
    nameEn: '',
    titleAr: '',
    titleEn: '',
    email: '',
    image: '',
  });

  useEffect(() => {
    fetchColleges();
  }, []);

  const fetchColleges = async () => {
    try {
      const data = await collegesService.getAllColleges();
      setColleges(data);
    } catch (error) {
      toast.error(t('حدث خطأ أثناء جلب البيانات', 'Error fetching data'));
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCollegeDialog = (college?: College) => {
    if (college) {
      setEditingCollege(college);
      setCollegeFormData({
        nameAr: college.nameAr,
        nameEn: college.nameEn,
        descriptionAr: college.descriptionAr,
        descriptionEn: college.descriptionEn,
        visionAr: college.visionAr,
        visionEn: college.visionEn,
        missionAr: college.missionAr,
        missionEn: college.missionEn,
        admissionRequirementsAr: college.admissionRequirementsAr,
        admissionRequirementsEn: college.admissionRequirementsEn,
        image: college.image || '',
        icon: college.icon || '',
      });
      setCollegeImagePreview(college.image || '');
    } else {
      setEditingCollege(null);
      setCollegeFormData({
        nameAr: '',
        nameEn: '',
        descriptionAr: '',
        descriptionEn: '',
        visionAr: '',
        visionEn: '',
        missionAr: '',
        missionEn: '',
        admissionRequirementsAr: '',
        admissionRequirementsEn: '',
        image: '',
        icon: '',
      });
      setCollegeImagePreview('');
    }
    setIsCollegeDialogOpen(true);
  };

  const handleOpenProgramDialog = (collegeId: string, program?: AcademicProgram) => {
    setSelectedCollegeId(collegeId);
    if (program) {
      setEditingProgram(program);
      setProgramFormData({
        nameAr: program.nameAr,
        nameEn: program.nameEn,
        departmentAr: program.departmentAr,
        departmentEn: program.departmentEn,
        admissionRate: program.admissionRate,
        highSchoolType: program.highSchoolType,
        highSchoolTypeEn: program.highSchoolTypeEn,
        studyYears: program.studyYears,
        image: program.image || '',
        descriptionAr: program.descriptionAr || '',
        descriptionEn: program.descriptionEn || '',
        objectives: program.objectives || [],
        careerProspectsAr: program.careerProspectsAr || [],
        careerProspectsEn: program.careerProspectsEn || [],
        facultyMembers: program.facultyMembers || [],
      });
      setProgramImagePreview(program.image || '');
    } else {
      setEditingProgram(null);
      setProgramFormData({
        nameAr: '',
        nameEn: '',
        departmentAr: '',
        departmentEn: '',
        admissionRate: 50,
        highSchoolType: 'علمي',
        highSchoolTypeEn: 'Scientific',
        studyYears: '4',
        image: '',
        descriptionAr: '',
        descriptionEn: '',
        objectives: [],
        careerProspectsAr: [],
        careerProspectsEn: [],
        facultyMembers: [],
      });
      setProgramImagePreview('');
    }
    setNewObjectiveAr('');
    setNewObjectiveEn('');
    setNewCareerAr('');
    setNewCareerEn('');
    setNewFacultyMember({ nameAr: '', nameEn: '', titleAr: '', titleEn: '', email: '', image: '' });
    setIsProgramDialogOpen(true);
  };

  const handleCollegeImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error(t('حجم الصورة كبير جداً (الحد الأقصى 5MB)', 'Image size too large (max 5MB)'));
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setCollegeImagePreview(result);
        setCollegeFormData(prev => ({ ...prev, image: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProgramImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error(t('حجم الصورة كبير جداً (الحد الأقصى 5MB)', 'Image size too large (max 5MB)'));
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setProgramImagePreview(result);
        setProgramFormData(prev => ({ ...prev, image: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveCollegeImage = () => {
    setCollegeImagePreview('');
    setCollegeFormData(prev => ({ ...prev, image: '' }));
    if (collegeFileInputRef.current) {
      collegeFileInputRef.current.value = '';
    }
  };

  const handleRemoveProgramImage = () => {
    setProgramImagePreview('');
    setProgramFormData(prev => ({ ...prev, image: '' }));
    if (programFileInputRef.current) {
      programFileInputRef.current.value = '';
    }
  };

  const handleAddObjective = () => {
    if (!newObjectiveAr.trim() && !newObjectiveEn.trim()) {
      toast.error(t('يرجى إدخال الهدف', 'Please enter objective'));
      return;
    }
    const newObj: ProgramObjective = {
      id: Date.now().toString(),
      textAr: newObjectiveAr.trim(),
      textEn: newObjectiveEn.trim(),
    };
    setProgramFormData(prev => ({
      ...prev,
      objectives: [...prev.objectives, newObj],
    }));
    setNewObjectiveAr('');
    setNewObjectiveEn('');
  };

  const handleRemoveObjective = (id: string) => {
    setProgramFormData(prev => ({
      ...prev,
      objectives: prev.objectives.filter(o => o.id !== id),
    }));
  };

  const handleAddCareer = () => {
    if (!newCareerAr.trim() && !newCareerEn.trim()) {
      toast.error(t('يرجى إدخال فرصة العمل', 'Please enter career prospect'));
      return;
    }
    setProgramFormData(prev => ({
      ...prev,
      careerProspectsAr: [...prev.careerProspectsAr, newCareerAr.trim()],
      careerProspectsEn: [...prev.careerProspectsEn, newCareerEn.trim()],
    }));
    setNewCareerAr('');
    setNewCareerEn('');
  };

  const handleAddFacultyMember = () => {
    if (!newFacultyMember.nameAr?.trim() && !newFacultyMember.nameEn?.trim()) {
      toast.error(t('يرجى إدخال اسم عضو هيئة التدريس', 'Please enter faculty member name'));
      return;
    }
    const newMember: ProgramFacultyMember = {
      id: Date.now().toString(),
      nameAr: newFacultyMember.nameAr?.trim() || '',
      nameEn: newFacultyMember.nameEn?.trim() || '',
      titleAr: newFacultyMember.titleAr?.trim() || '',
      titleEn: newFacultyMember.titleEn?.trim() || '',
      email: newFacultyMember.email?.trim(),
      image: newFacultyMember.image?.trim(),
    };
    setProgramFormData(prev => ({
      ...prev,
      facultyMembers: [...prev.facultyMembers, newMember],
    }));
    setNewFacultyMember({ nameAr: '', nameEn: '', titleAr: '', titleEn: '', email: '', image: '' });
  };

  const handleRemoveFacultyMember = (id: string) => {
    setProgramFormData(prev => ({
      ...prev,
      facultyMembers: prev.facultyMembers.filter(m => m.id !== id),
    }));
  };

  const handleRemoveCareer = (index: number) => {
    setProgramFormData(prev => ({
      ...prev,
      careerProspectsAr: prev.careerProspectsAr.filter((_, i) => i !== index),
      careerProspectsEn: prev.careerProspectsEn.filter((_, i) => i !== index),
    }));
  };

  const handleSubmitCollege = () => {
    if (!collegeFormData.nameAr || !collegeFormData.nameEn) {
      toast.error(t('يرجى إدخال اسم الكلية', 'Please enter college name'));
      return;
    }

    if (editingCollege) {
      setColleges(prev =>
        prev.map(c =>
          c.id === editingCollege.id
            ? { 
                ...c, 
                ...collegeFormData,
                slug: collegeFormData.nameEn.toLowerCase().replace(/\s+/g, '-'),
              }
            : c
        )
      );
      toast.success(t('تم تحديث الكلية بنجاح', 'College updated successfully'));
    } else {
      const newCollege: College = {
        id: Date.now().toString(),
        slug: collegeFormData.nameEn.toLowerCase().replace(/\s+/g, '-'),
        ...collegeFormData,
        programs: [],
      };
      setColleges(prev => [...prev, newCollege]);
      toast.success(t('تم إضافة الكلية بنجاح', 'College added successfully'));
    }

    setIsCollegeDialogOpen(false);
  };

  const handleSubmitProgram = () => {
    if (!programFormData.nameAr || !programFormData.nameEn) {
      toast.error(t('يرجى إدخال اسم البرنامج', 'Please enter program name'));
      return;
    }

    if (editingProgram) {
      setColleges(prev =>
        prev.map(c =>
          c.id === selectedCollegeId
            ? {
                ...c,
                programs: c.programs.map(p =>
                  p.id === editingProgram.id
                    ? { ...p, ...programFormData }
                    : p
                ),
              }
            : c
        )
      );
      toast.success(t('تم تحديث البرنامج بنجاح', 'Program updated successfully'));
    } else {
      const newProgram: AcademicProgram = {
        id: Date.now().toString(),
        ...programFormData,
      };
      setColleges(prev =>
        prev.map(c =>
          c.id === selectedCollegeId
            ? { ...c, programs: [...c.programs, newProgram] }
            : c
        )
      );
      toast.success(t('تم إضافة البرنامج بنجاح', 'Program added successfully'));
    }

    setIsProgramDialogOpen(false);
  };

  const handleDeleteCollege = (id: string) => {
    setColleges(prev => prev.filter(c => c.id !== id));
    toast.success(t('تم حذف الكلية بنجاح', 'College deleted successfully'));
  };

  const handleDeleteProgram = (collegeId: string, programId: string) => {
    setColleges(prev =>
      prev.map(c =>
        c.id === collegeId
          ? { ...c, programs: c.programs.filter(p => p.id !== programId) }
          : c
      )
    );
    toast.success(t('تم حذف البرنامج بنجاح', 'Program deleted successfully'));
  };

  const handleHighSchoolTypeChange = (value: string) => {
    let typeAr: 'علمي' | 'ادبي' | 'علمي + ادبي' = 'علمي';
    let typeEn: 'Scientific' | 'Literary' | 'Scientific + Literary' = 'Scientific';
    
    if (value === 'علمي') {
      typeAr = 'علمي';
      typeEn = 'Scientific';
    } else if (value === 'ادبي') {
      typeAr = 'ادبي';
      typeEn = 'Literary';
    } else {
      typeAr = 'علمي + ادبي';
      typeEn = 'Scientific + Literary';
    }
    
    setProgramFormData(prev => ({
      ...prev,
      highSchoolType: typeAr,
      highSchoolTypeEn: typeEn,
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            {t('إدارة الكليات والبرامج', 'Colleges & Programs Management')}
          </h1>
          <p className="text-muted-foreground">
            {t('عرض وإدارة كليات الجامعة وبرامجها الأكاديمية', 'View and manage university colleges and academic programs')}
          </p>
        </div>
        <Button onClick={() => handleOpenCollegeDialog()}>
          <Plus className="w-4 h-4 mr-2" />
          {t('إضافة كلية', 'Add College')}
        </Button>
      </div>

      {/* Colleges List */}
      <div className="space-y-4">
        {colleges.map((college) => (
          <Card key={college.id} className="overflow-hidden">
            <CardHeader className="bg-muted/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {college.image ? (
                    <div className="w-16 h-12 rounded-lg overflow-hidden">
                      <img src={college.image} alt={t(college.nameAr, college.nameEn)} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="w-16 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <GraduationCap className="w-6 h-6 text-primary" />
                    </div>
                  )}
                  <div>
                    <CardTitle className="text-xl">{t(college.nameAr, college.nameEn)}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {college.programs.length} {t('برنامج', 'programs')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleOpenProgramDialog(college.id)}>
                    <Plus className="w-4 h-4 mr-1" />
                    {t('إضافة برنامج', 'Add Program')}
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleOpenCollegeDialog(college)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDeleteCollege(college.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {college.programs.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">{t('م', '#')}</TableHead>
                      <TableHead className="w-16">{t('صورة', 'Image')}</TableHead>
                      <TableHead>{t('البرنامج الأكاديمي', 'Program')}</TableHead>
                      <TableHead>{t('القسم', 'Department')}</TableHead>
                      <TableHead className="text-center">{t('نسبة القبول', 'Rate')}</TableHead>
                      <TableHead className="text-center">{t('نوع الثانوية', 'HS Type')}</TableHead>
                      <TableHead className="text-center">{t('السنوات', 'Years')}</TableHead>
                        <TableHead className="text-center">{t('الأهداف', 'Objectives')}</TableHead>
                        <TableHead className="text-center">{t('الأعضاء', 'Faculty')}</TableHead>
                        <TableHead className="text-right w-24">{t('الإجراءات', 'Actions')}</TableHead>
                      </TableRow>
                    </TableHeader>
                  <TableBody>
                    {college.programs.map((program, index) => (
                      <TableRow key={program.id}>
                        <TableCell className="text-muted-foreground">{index + 1}</TableCell>
                        <TableCell>
                          {program.image ? (
                            <img src={program.image} alt="" className="w-12 h-10 rounded object-cover" />
                          ) : (
                            <div className="w-12 h-10 rounded bg-muted flex items-center justify-center">
                              <Image className="w-4 h-4 text-muted-foreground" />
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="font-medium">{t(program.nameAr, program.nameEn)}</TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                          {t(program.departmentAr, program.departmentEn) || '-'}
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant="outline">{program.admissionRate}%</Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant="secondary" className="text-xs">
                            {t(program.highSchoolType, program.highSchoolTypeEn)}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center font-medium">{program.studyYears}</TableCell>
                        <TableCell className="text-center">
                          <Badge variant="outline" className="text-xs">
                            {program.objectives?.length || 0}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge variant="secondary" className="text-xs">
                            {program.facultyMembers?.length || 0}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" onClick={() => handleOpenProgramDialog(college.id, program)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteProgram(college.id, program.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="p-8 text-center text-muted-foreground">
                  <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>{t('لا توجد برامج أكاديمية', 'No academic programs')}</p>
                  <Button variant="link" onClick={() => handleOpenProgramDialog(college.id)}>
                    {t('إضافة برنامج جديد', 'Add new program')}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* College Dialog */}
      <Dialog open={isCollegeDialogOpen} onOpenChange={setIsCollegeDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingCollege ? t('تعديل الكلية', 'Edit College') : t('إضافة كلية جديدة', 'Add New College')}
            </DialogTitle>
            <DialogDescription>
              {t('أدخل بيانات الكلية بالعربية والإنجليزية', 'Enter college details in Arabic and English')}
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">{t('البيانات الأساسية', 'Basic Info')}</TabsTrigger>
              <TabsTrigger value="details">{t('الرؤية والرسالة', 'Vision & Mission')}</TabsTrigger>
              <TabsTrigger value="image">{t('الصورة', 'Image')}</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{t('الاسم بالعربية', 'Arabic Name')}</Label>
                  <Input
                    value={collegeFormData.nameAr}
                    onChange={(e) => setCollegeFormData(prev => ({ ...prev, nameAr: e.target.value }))}
                    placeholder={t('كلية الهندسة', 'College of Engineering')}
                    dir="rtl"
                  />
                </div>
                <div className="space-y-2">
                  <Label>{t('الاسم بالإنجليزية', 'English Name')}</Label>
                  <Input
                    value={collegeFormData.nameEn}
                    onChange={(e) => setCollegeFormData(prev => ({ ...prev, nameEn: e.target.value }))}
                    placeholder="College of Engineering"
                    dir="ltr"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{t('الوصف بالعربية', 'Arabic Description')}</Label>
                  <Textarea
                    value={collegeFormData.descriptionAr}
                    onChange={(e) => setCollegeFormData(prev => ({ ...prev, descriptionAr: e.target.value }))}
                    dir="rtl"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label>{t('الوصف بالإنجليزية', 'English Description')}</Label>
                  <Textarea
                    value={collegeFormData.descriptionEn}
                    onChange={(e) => setCollegeFormData(prev => ({ ...prev, descriptionEn: e.target.value }))}
                    dir="ltr"
                    rows={3}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{t('شروط القبول بالعربية', 'Arabic Admission Requirements')}</Label>
                  <Textarea
                    value={collegeFormData.admissionRequirementsAr}
                    onChange={(e) => setCollegeFormData(prev => ({ ...prev, admissionRequirementsAr: e.target.value }))}
                    dir="rtl"
                    rows={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label>{t('شروط القبول بالإنجليزية', 'English Admission Requirements')}</Label>
                  <Textarea
                    value={collegeFormData.admissionRequirementsEn}
                    onChange={(e) => setCollegeFormData(prev => ({ ...prev, admissionRequirementsEn: e.target.value }))}
                    dir="ltr"
                    rows={2}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="details" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{t('الرؤية بالعربية', 'Arabic Vision')}</Label>
                  <Textarea
                    value={collegeFormData.visionAr}
                    onChange={(e) => setCollegeFormData(prev => ({ ...prev, visionAr: e.target.value }))}
                    dir="rtl"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label>{t('الرؤية بالإنجليزية', 'English Vision')}</Label>
                  <Textarea
                    value={collegeFormData.visionEn}
                    onChange={(e) => setCollegeFormData(prev => ({ ...prev, visionEn: e.target.value }))}
                    dir="ltr"
                    rows={3}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{t('الرسالة بالعربية', 'Arabic Mission')}</Label>
                  <Textarea
                    value={collegeFormData.missionAr}
                    onChange={(e) => setCollegeFormData(prev => ({ ...prev, missionAr: e.target.value }))}
                    dir="rtl"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label>{t('الرسالة بالإنجليزية', 'English Mission')}</Label>
                  <Textarea
                    value={collegeFormData.missionEn}
                    onChange={(e) => setCollegeFormData(prev => ({ ...prev, missionEn: e.target.value }))}
                    dir="ltr"
                    rows={3}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="image" className="mt-4">
              <div className="space-y-3">
                <Label>{t('صورة الكلية', 'College Image')}</Label>
                <div className="flex flex-col items-center gap-4">
                  {collegeImagePreview ? (
                    <div className="relative w-full h-48 rounded-xl overflow-hidden border-2 border-dashed border-border">
                      <img src={collegeImagePreview} alt="Preview" className="w-full h-full object-cover" />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={handleRemoveCollegeImage}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <label className="w-full h-48 rounded-xl border-2 border-dashed border-border hover:border-primary/50 bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer flex flex-col items-center justify-center gap-3">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                        <Upload className="w-8 h-8 text-primary" />
                      </div>
                      <div className="text-center">
                        <p className="font-medium">{t('اضغط لرفع صورة', 'Click to upload image')}</p>
                        <p className="text-sm text-muted-foreground">{t('PNG, JPG حتى 5MB', 'PNG, JPG up to 5MB')}</p>
                      </div>
                      <input
                        ref={collegeFileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleCollegeImageUpload}
                      />
                    </label>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCollegeDialogOpen(false)}>
              {t('إلغاء', 'Cancel')}
            </Button>
            <Button onClick={handleSubmitCollege}>
              {editingCollege ? t('حفظ التغييرات', 'Save Changes') : t('إضافة', 'Add')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Program Dialog - Enhanced */}
      <Dialog open={isProgramDialogOpen} onOpenChange={setIsProgramDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingProgram ? t('تعديل البرنامج', 'Edit Program') : t('إضافة برنامج جديد', 'Add New Program')}
            </DialogTitle>
            <DialogDescription>
              {t('أدخل بيانات البرنامج الأكاديمي الكاملة', 'Enter complete academic program details')}
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="basic">{t('البيانات الأساسية', 'Basic Info')}</TabsTrigger>
              <TabsTrigger value="image">{t('الصورة والوصف', 'Image & Desc')}</TabsTrigger>
              <TabsTrigger value="objectives">{t('الأهداف', 'Objectives')}</TabsTrigger>
              <TabsTrigger value="careers">{t('فرص العمل', 'Careers')}</TabsTrigger>
              <TabsTrigger value="faculty">{t('هيئة التدريس', 'Faculty')}</TabsTrigger>
            </TabsList>

            {/* Basic Info Tab */}
            <TabsContent value="basic" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{t('اسم البرنامج بالعربية', 'Arabic Program Name')} *</Label>
                  <Input
                    value={programFormData.nameAr}
                    onChange={(e) => setProgramFormData(prev => ({ ...prev, nameAr: e.target.value }))}
                    placeholder={t('هندسة الحاسوب', 'Computer Engineering')}
                    dir="rtl"
                  />
                </div>
                <div className="space-y-2">
                  <Label>{t('اسم البرنامج بالإنجليزية', 'English Program Name')} *</Label>
                  <Input
                    value={programFormData.nameEn}
                    onChange={(e) => setProgramFormData(prev => ({ ...prev, nameEn: e.target.value }))}
                    placeholder="Computer Engineering"
                    dir="ltr"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{t('القسم بالعربية', 'Arabic Department')}</Label>
                  <Input
                    value={programFormData.departmentAr}
                    onChange={(e) => setProgramFormData(prev => ({ ...prev, departmentAr: e.target.value }))}
                    placeholder={t('قسم هندسة الحاسوب', 'Department of Computer Engineering')}
                    dir="rtl"
                  />
                </div>
                <div className="space-y-2">
                  <Label>{t('القسم بالإنجليزية', 'English Department')}</Label>
                  <Input
                    value={programFormData.departmentEn}
                    onChange={(e) => setProgramFormData(prev => ({ ...prev, departmentEn: e.target.value }))}
                    placeholder="Department of Computer Engineering"
                    dir="ltr"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>{t('نسبة القبول (%)', 'Admission Rate (%)')}</Label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={programFormData.admissionRate}
                    onChange={(e) => setProgramFormData(prev => ({ ...prev, admissionRate: parseInt(e.target.value) || 0 }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>{t('نوع الثانوية', 'High School Type')}</Label>
                  <Select value={programFormData.highSchoolType} onValueChange={handleHighSchoolTypeChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="علمي">{t('علمي', 'Scientific')}</SelectItem>
                      <SelectItem value="ادبي">{t('أدبي', 'Literary')}</SelectItem>
                      <SelectItem value="علمي + ادبي">{t('علمي + أدبي', 'Scientific + Literary')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>{t('سنوات الدراسة', 'Study Years')}</Label>
                  <Input
                    value={programFormData.studyYears}
                    onChange={(e) => setProgramFormData(prev => ({ ...prev, studyYears: e.target.value }))}
                    placeholder="4"
                  />
                </div>
              </div>
            </TabsContent>

            {/* Image & Description Tab */}
            <TabsContent value="image" className="space-y-4 mt-4">
              <div className="space-y-3">
                <Label>{t('صورة البرنامج', 'Program Image')}</Label>
                <div className="flex flex-col items-center gap-4">
                  {programImagePreview ? (
                    <div className="relative w-full h-40 rounded-xl overflow-hidden border-2 border-dashed border-border">
                      <img src={programImagePreview} alt="Preview" className="w-full h-full object-cover" />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={handleRemoveProgramImage}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <label className="w-full h-40 rounded-xl border-2 border-dashed border-border hover:border-primary/50 bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer flex flex-col items-center justify-center gap-2">
                      <Upload className="w-8 h-8 text-primary" />
                      <p className="font-medium text-sm">{t('اضغط لرفع صورة', 'Click to upload image')}</p>
                      <p className="text-xs text-muted-foreground">{t('PNG, JPG حتى 5MB', 'PNG, JPG up to 5MB')}</p>
                      <input
                        ref={programFileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleProgramImageUpload}
                      />
                    </label>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{t('وصف البرنامج بالعربية', 'Arabic Description')}</Label>
                  <Textarea
                    value={programFormData.descriptionAr}
                    onChange={(e) => setProgramFormData(prev => ({ ...prev, descriptionAr: e.target.value }))}
                    dir="rtl"
                    rows={4}
                    placeholder={t('وصف مختصر للبرنامج الأكاديمي...', 'Brief description of the academic program...')}
                  />
                </div>
                <div className="space-y-2">
                  <Label>{t('وصف البرنامج بالإنجليزية', 'English Description')}</Label>
                  <Textarea
                    value={programFormData.descriptionEn}
                    onChange={(e) => setProgramFormData(prev => ({ ...prev, descriptionEn: e.target.value }))}
                    dir="ltr"
                    rows={4}
                    placeholder="Brief description of the academic program..."
                  />
                </div>
              </div>
            </TabsContent>

            {/* Objectives Tab */}
            <TabsContent value="objectives" className="space-y-4 mt-4">
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">{t('أهداف البرنامج', 'Program Objectives')}</h3>
              </div>

              {/* Existing objectives */}
              <div className="space-y-2 mb-4">
                {programFormData.objectives.map((obj, index) => (
                  <div key={obj.id} className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-sm flex items-center justify-center font-medium">
                      {index + 1}
                    </span>
                    <div className="flex-1 grid grid-cols-2 gap-2 text-sm">
                      <span dir="rtl">{obj.textAr}</span>
                      <span dir="ltr">{obj.textEn}</span>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => handleRemoveObjective(obj.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                {programFormData.objectives.length === 0 && (
                  <p className="text-center text-muted-foreground py-4">
                    {t('لا توجد أهداف مضافة', 'No objectives added')}
                  </p>
                )}
              </div>

              {/* Add new objective */}
              <div className="border rounded-lg p-4 space-y-3">
                <Label className="text-sm font-medium">{t('إضافة هدف جديد', 'Add New Objective')}</Label>
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    value={newObjectiveAr}
                    onChange={(e) => setNewObjectiveAr(e.target.value)}
                    placeholder={t('الهدف بالعربية', 'Objective in Arabic')}
                    dir="rtl"
                  />
                  <Input
                    value={newObjectiveEn}
                    onChange={(e) => setNewObjectiveEn(e.target.value)}
                    placeholder="Objective in English"
                    dir="ltr"
                  />
                </div>
                <Button onClick={handleAddObjective} size="sm" className="w-full">
                  <Plus className="w-4 h-4 mr-1" />
                  {t('إضافة هدف', 'Add Objective')}
                </Button>
              </div>
            </TabsContent>

            {/* Career Prospects Tab */}
            <TabsContent value="careers" className="space-y-4 mt-4">
              <div className="flex items-center gap-2 mb-4">
                <Briefcase className="w-5 h-5 text-green-600" />
                <h3 className="font-semibold">{t('فرص العمل', 'Career Opportunities')}</h3>
              </div>

              {/* Existing careers */}
              <div className="space-y-2 mb-4">
                {programFormData.careerProspectsAr.map((career, index) => (
                  <div key={index} className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
                    <Briefcase className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <div className="flex-1 grid grid-cols-2 gap-2 text-sm">
                      <span dir="rtl">{career}</span>
                      <span dir="ltr">{programFormData.careerProspectsEn[index]}</span>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => handleRemoveCareer(index)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                {programFormData.careerProspectsAr.length === 0 && (
                  <p className="text-center text-muted-foreground py-4">
                    {t('لا توجد فرص عمل مضافة', 'No career prospects added')}
                  </p>
                )}
              </div>

              {/* Add new career */}
              <div className="border rounded-lg p-4 space-y-3">
                <Label className="text-sm font-medium">{t('إضافة فرصة عمل جديدة', 'Add New Career')}</Label>
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    value={newCareerAr}
                    onChange={(e) => setNewCareerAr(e.target.value)}
                    placeholder={t('فرصة العمل بالعربية', 'Career in Arabic')}
                    dir="rtl"
                  />
                  <Input
                    value={newCareerEn}
                    onChange={(e) => setNewCareerEn(e.target.value)}
                    placeholder="Career in English"
                    dir="ltr"
                  />
                </div>
                <Button onClick={handleAddCareer} size="sm" className="w-full" variant="outline">
                  <Plus className="w-4 h-4 mr-1" />
                  {t('إضافة فرصة عمل', 'Add Career')}
                </Button>
              </div>
            </TabsContent>

            {/* Faculty Members Tab */}
            <TabsContent value="faculty" className="space-y-4 mt-4">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-indigo-600" />
                <h3 className="font-semibold">{t('أعضاء هيئة التدريس', 'Faculty Members')}</h3>
              </div>

              {/* Existing faculty members */}
              <div className="space-y-2 mb-4">
                {programFormData.facultyMembers.map((member) => (
                  <div key={member.id} className="flex items-center gap-3 p-3 bg-indigo-50 dark:bg-indigo-950/30 rounded-lg border border-indigo-200 dark:border-indigo-800">
                    <Avatar className="w-12 h-12 border-2 border-indigo-200">
                      <AvatarImage src={member.image} alt={t(member.nameAr, member.nameEn)} />
                      <AvatarFallback className="bg-indigo-100 text-indigo-600">
                        <Users className="w-5 h-5" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <span className="font-medium" dir="rtl">{member.nameAr}</span>
                        <span className="font-medium" dir="ltr">{member.nameEn}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mt-1">
                        <span dir="rtl">{member.titleAr}</span>
                        <span dir="ltr">{member.titleEn}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => handleRemoveFacultyMember(member.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                {programFormData.facultyMembers.length === 0 && (
                  <p className="text-center text-muted-foreground py-4">
                    {t('لا يوجد أعضاء هيئة تدريس مضافين', 'No faculty members added')}
                  </p>
                )}
              </div>

              {/* Add new faculty member */}
              <div className="border rounded-lg p-4 space-y-3">
                <Label className="text-sm font-medium">{t('إضافة عضو هيئة تدريس جديد', 'Add New Faculty Member')}</Label>
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    value={newFacultyMember.nameAr || ''}
                    onChange={(e) => setNewFacultyMember(prev => ({ ...prev, nameAr: e.target.value }))}
                    placeholder={t('الاسم بالعربية', 'Name in Arabic')}
                    dir="rtl"
                  />
                  <Input
                    value={newFacultyMember.nameEn || ''}
                    onChange={(e) => setNewFacultyMember(prev => ({ ...prev, nameEn: e.target.value }))}
                    placeholder="Name in English"
                    dir="ltr"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    value={newFacultyMember.titleAr || ''}
                    onChange={(e) => setNewFacultyMember(prev => ({ ...prev, titleAr: e.target.value }))}
                    placeholder={t('اللقب بالعربية (أستاذ دكتور)', 'Title in Arabic')}
                    dir="rtl"
                  />
                  <Input
                    value={newFacultyMember.titleEn || ''}
                    onChange={(e) => setNewFacultyMember(prev => ({ ...prev, titleEn: e.target.value }))}
                    placeholder="Title in English (Professor)"
                    dir="ltr"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    value={newFacultyMember.email || ''}
                    onChange={(e) => setNewFacultyMember(prev => ({ ...prev, email: e.target.value }))}
                    placeholder={t('البريد الإلكتروني', 'Email')}
                    type="email"
                    dir="ltr"
                  />
                  <Input
                    value={newFacultyMember.image || ''}
                    onChange={(e) => setNewFacultyMember(prev => ({ ...prev, image: e.target.value }))}
                    placeholder={t('رابط الصورة', 'Image URL')}
                    dir="ltr"
                  />
                </div>
                <Button onClick={handleAddFacultyMember} size="sm" className="w-full" variant="outline">
                  <Plus className="w-4 h-4 mr-1" />
                  {t('إضافة عضو', 'Add Member')}
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setIsProgramDialogOpen(false)}>
              {t('إلغاء', 'Cancel')}
            </Button>
            <Button onClick={handleSubmitProgram}>
              {editingProgram ? t('حفظ التغييرات', 'Save Changes') : t('إضافة', 'Add')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
