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
import { Plus, Edit, Trash2, Building } from 'lucide-react';

const centers = [
  {
    id: '1',
    nameAr: 'مركز البحث العلمي',
    nameEn: 'Scientific Research Center',
    descriptionAr: 'مركز متخصص في دعم البحث العلمي والابتكار',
    descriptionEn: 'Center specialized in supporting scientific research and innovation',
    servicesCount: 8,
    programsCount: 5,
    status: 'active',
  },
  {
    id: '2',
    nameAr: 'مركز التدريب والتطوير',
    nameEn: 'Training and Development Center',
    descriptionAr: 'مركز متخصص في تقديم برامج التدريب المهني',
    descriptionEn: 'Center specialized in providing professional training programs',
    servicesCount: 12,
    programsCount: 8,
    status: 'active',
  },
  {
    id: '3',
    nameAr: 'مركز الاستشارات',
    nameEn: 'Consulting Center',
    descriptionAr: 'مركز يقدم استشارات أكاديمية ومهنية',
    descriptionEn: 'Center providing academic and professional consultations',
    servicesCount: 6,
    programsCount: 3,
    status: 'active',
  },
  {
    id: '4',
    nameAr: 'مركز اللغات',
    nameEn: 'Language Center',
    descriptionAr: 'مركز متخصص في تعليم اللغات الأجنبية',
    descriptionEn: 'Center specialized in teaching foreign languages',
    servicesCount: 4,
    programsCount: 6,
    status: 'inactive',
  },
];

export default function CentersManagement() {
  const { t } = useLanguage();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            {t('إدارة المراكز', 'Centers Management')}
          </h1>
          <p className="text-muted-foreground">
            {t('عرض وإدارة مراكز الجامعة', 'View and manage university centers')}
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          {t('إضافة مركز', 'Add Center')}
        </Button>
      </div>

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('اسم المركز', 'Center Name')}</TableHead>
              <TableHead>{t('الوصف', 'Description')}</TableHead>
              <TableHead>{t('الخدمات', 'Services')}</TableHead>
              <TableHead>{t('البرامج', 'Programs')}</TableHead>
              <TableHead>{t('الحالة', 'Status')}</TableHead>
              <TableHead className="text-right">{t('الإجراءات', 'Actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {centers.map((center) => (
              <TableRow key={center.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-muted-foreground" />
                    {t(center.nameAr, center.nameEn)}
                  </div>
                </TableCell>
                <TableCell className="max-w-xs truncate">
                  {t(center.descriptionAr, center.descriptionEn)}
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{center.servicesCount}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{center.programsCount}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={center.status === 'active' ? 'default' : 'secondary'}>
                    {center.status === 'active' ? t('نشط', 'Active') : t('غير نشط', 'Inactive')}
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
