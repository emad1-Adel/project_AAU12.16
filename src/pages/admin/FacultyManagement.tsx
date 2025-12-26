import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plus, Edit, Trash2 } from 'lucide-react';

const facultyMembers = [
  {
    id: '1',
    nameAr: 'د. أحمد محمد علي',
    nameEn: 'Dr. Ahmed Mohamed Ali',
    degreeAr: 'أستاذ مشارك',
    degreeEn: 'Associate Professor',
    specializationAr: 'هندسة البرمجيات',
    specializationEn: 'Software Engineering',
    collegeAr: 'كلية الحاسوب',
    collegeEn: 'College of Computing',
    email: 'ahmed.ali@ngu.edu',
    image: '',
  },
  {
    id: '2',
    nameAr: 'د. فاطمة حسن عبدالله',
    nameEn: 'Dr. Fatima Hassan Abdullah',
    degreeAr: 'أستاذ',
    degreeEn: 'Professor',
    specializationAr: 'إدارة الأعمال',
    specializationEn: 'Business Administration',
    collegeAr: 'كلية الاقتصاد',
    collegeEn: 'College of Economics',
    email: 'fatima.hassan@ngu.edu',
    image: '',
  },
  {
    id: '3',
    nameAr: 'د. محمد خالد أحمد',
    nameEn: 'Dr. Mohamed Khaled Ahmed',
    degreeAr: 'أستاذ مساعد',
    degreeEn: 'Assistant Professor',
    specializationAr: 'الذكاء الاصطناعي',
    specializationEn: 'Artificial Intelligence',
    collegeAr: 'كلية الحاسوب',
    collegeEn: 'College of Computing',
    email: 'mohamed.khaled@ngu.edu',
    image: '',
  },
  {
    id: '4',
    nameAr: 'د. سارة علي محمود',
    nameEn: 'Dr. Sara Ali Mahmoud',
    degreeAr: 'أستاذ مشارك',
    degreeEn: 'Associate Professor',
    specializationAr: 'المحاسبة',
    specializationEn: 'Accounting',
    collegeAr: 'كلية الاقتصاد',
    collegeEn: 'College of Economics',
    email: 'sara.ali@ngu.edu',
    image: '',
  },
];

export default function FacultyManagement() {
  const { t } = useLanguage();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            {t('إدارة الكادر التعليمي', 'Faculty Management')}
          </h1>
          <p className="text-muted-foreground">
            {t('عرض وإدارة أعضاء هيئة التدريس', 'View and manage faculty members')}
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          {t('إضافة عضو', 'Add Member')}
        </Button>
      </div>

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('العضو', 'Member')}</TableHead>
              <TableHead>{t('الدرجة العلمية', 'Degree')}</TableHead>
              <TableHead>{t('التخصص', 'Specialization')}</TableHead>
              <TableHead>{t('الكلية', 'College')}</TableHead>
              <TableHead>{t('البريد الإلكتروني', 'Email')}</TableHead>
              <TableHead className="text-right">{t('الإجراءات', 'Actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {facultyMembers.map((member) => (
              <TableRow key={member.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={member.image} alt={t(member.nameAr, member.nameEn)} />
                      <AvatarFallback>
                        {member.nameEn.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{t(member.nameAr, member.nameEn)}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {t(member.degreeAr, member.degreeEn)}
                  </Badge>
                </TableCell>
                <TableCell>{t(member.specializationAr, member.specializationEn)}</TableCell>
                <TableCell>{t(member.collegeAr, member.collegeEn)}</TableCell>
                <TableCell className="text-muted-foreground">{member.email}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="mr-2">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
