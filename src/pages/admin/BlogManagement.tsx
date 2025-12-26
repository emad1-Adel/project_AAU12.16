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
import { Plus, Edit, Trash2, Eye } from 'lucide-react';

const blogPosts = [
  {
    id: '1',
    titleAr: 'نصائح للنجاح في الامتحانات',
    titleEn: 'Tips for Exam Success',
    author: { ar: 'د. أحمد محمد', en: 'Dr. Ahmed Mohamed' },
    category: { ar: 'أكاديمي', en: 'Academic' },
    date: '2025-01-15',
    status: 'published',
    views: 524,
  },
  {
    id: '2',
    titleAr: 'كيفية إدارة الوقت للطلاب',
    titleEn: 'Time Management for Students',
    author: { ar: 'أ. سارة علي', en: 'Prof. Sara Ali' },
    category: { ar: 'تطوير ذاتي', en: 'Self Development' },
    date: '2025-01-10',
    status: 'published',
    views: 412,
  },
  {
    id: '3',
    titleAr: 'أهمية البحث العلمي',
    titleEn: 'Importance of Scientific Research',
    author: { ar: 'د. محمد خالد', en: 'Dr. Mohamed Khaled' },
    category: { ar: 'بحث علمي', en: 'Research' },
    date: '2025-01-05',
    status: 'draft',
    views: 0,
  },
  {
    id: '4',
    titleAr: 'التعلم الإلكتروني في العصر الحديث',
    titleEn: 'E-Learning in Modern Era',
    author: { ar: 'د. فاطمة حسن', en: 'Dr. Fatima Hassan' },
    category: { ar: 'تكنولوجيا', en: 'Technology' },
    date: '2024-12-28',
    status: 'published',
    views: 678,
  },
];

export default function BlogManagement() {
  const { t } = useLanguage();

  const getStatusLabel = (status: string) => {
    return status === 'published'
      ? t('منشور', 'Published')
      : t('مسودة', 'Draft');
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            {t('إدارة المدونة', 'Blog Management')}
          </h1>
          <p className="text-muted-foreground">
            {t('عرض وإدارة مقالات المدونة', 'View and manage blog posts')}
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          {t('إضافة مقال', 'Add Post')}
        </Button>
      </div>

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('العنوان', 'Title')}</TableHead>
              <TableHead>{t('الكاتب', 'Author')}</TableHead>
              <TableHead>{t('التصنيف', 'Category')}</TableHead>
              <TableHead>{t('التاريخ', 'Date')}</TableHead>
              <TableHead>{t('الحالة', 'Status')}</TableHead>
              <TableHead>{t('المشاهدات', 'Views')}</TableHead>
              <TableHead className="text-right">{t('الإجراءات', 'Actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {blogPosts.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium max-w-xs">
                  {t(item.titleAr, item.titleEn)}
                </TableCell>
                <TableCell>{t(item.author.ar, item.author.en)}</TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {t(item.category.ar, item.category.en)}
                  </Badge>
                </TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell>
                  <Badge variant={item.status === 'published' ? 'default' : 'secondary'}>
                    {getStatusLabel(item.status)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-muted-foreground" />
                    {item.views}
                  </div>
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
