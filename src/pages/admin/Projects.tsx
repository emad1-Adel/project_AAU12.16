import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plus, Edit, Trash2 } from 'lucide-react';

const projects = [
  {
    id: 1,
    titleAr: 'نظام إدارة المكتبات الذكي',
    titleEn: 'Smart Library Management System',
    students: 'أحمد محمد، فاطمة علي',
    status: 'active',
    progress: 75,
  },
  {
    id: 2,
    titleAr: 'تطبيق الصحة الإلكترونية',
    titleEn: 'E-Health Application',
    students: 'محمد حسن، سارة أحمد',
    status: 'active',
    progress: 60,
  },
  {
    id: 3,
    titleAr: 'منصة التعليم الإلكتروني',
    titleEn: 'E-Learning Platform',
    students: 'خالد يوسف، مريم سالم',
    status: 'active',
    progress: 85,
  },
  {
    id: 4,
    titleAr: 'نظام إدارة المخزون',
    titleEn: 'Inventory Management System',
    students: 'علي حسين، نور الدين',
    status: 'completed',
    progress: 100,
  },
];

export default function Projects() {
  const { t } = useLanguage();

  const getStatusLabel = (status: string) => {
    const labels: Record<string, { ar: string; en: string }> = {
      active: { ar: 'نشط', en: 'Active' },
      completed: { ar: 'مكتمل', en: 'Completed' },
      pending: { ar: 'قيد الانتظار', en: 'Pending' },
    };
    return t(labels[status].ar, labels[status].en);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            {t('إدارة المشاريع', 'Projects Management')}
          </h1>
          <p className="text-muted-foreground">
            {t('عرض وإدارة مشاريع الطلاب', 'View and manage student projects')}
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          {t('إضافة مشروع', 'Add Project')}
        </Button>
      </div>

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('المشروع', 'Project')}</TableHead>
              <TableHead>{t('الطلاب', 'Students')}</TableHead>
              <TableHead>{t('التقدم', 'Progress')}</TableHead>
              <TableHead>{t('الحالة', 'Status')}</TableHead>
              <TableHead className="text-right">{t('الإجراءات', 'Actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell className="font-medium max-w-md">
                  {t(project.titleAr, project.titleEn)}
                </TableCell>
                <TableCell>{project.students}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-24 bg-muted rounded-full h-2">
                      <div
                        className="bg-secondary h-2 rounded-full"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {project.progress}%
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={project.status === 'completed' ? 'default' : 'secondary'}>
                    {getStatusLabel(project.status)}
                  </Badge>
                </TableCell>
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
