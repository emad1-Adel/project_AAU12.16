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

const news = [
  {
    id: 1,
    titleAr: 'افتتاح مبنى الكلية الجديد',
    titleEn: 'Opening of New College Building',
    date: '2025-01-15',
    status: 'published',
    views: 245,
  },
  {
    id: 2,
    titleAr: 'ورشة عمل حول الذكاء الاصطناعي',
    titleEn: 'Workshop on Artificial Intelligence',
    date: '2025-01-10',
    status: 'published',
    views: 189,
  },
  {
    id: 3,
    titleAr: 'نتائج امتحانات الفصل الأول',
    titleEn: 'First Semester Exam Results',
    date: '2025-01-05',
    status: 'draft',
    views: 0,
  },
  {
    id: 4,
    titleAr: 'مؤتمر الابتكار والتكنولوجيا',
    titleEn: 'Innovation and Technology Conference',
    date: '2024-12-28',
    status: 'published',
    views: 312,
  },
];

export default function News() {
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
            {t('إدارة الأخبار', 'News Management')}
          </h1>
          <p className="text-muted-foreground">
            {t('عرض وإدارة أخبار الجامعة', 'View and manage university news')}
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          {t('إضافة خبر', 'Add News')}
        </Button>
      </div>

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('العنوان', 'Title')}</TableHead>
              <TableHead>{t('التاريخ', 'Date')}</TableHead>
              <TableHead>{t('الحالة', 'Status')}</TableHead>
              <TableHead>{t('المشاهدات', 'Views')}</TableHead>
              <TableHead className="text-right">{t('الإجراءات', 'Actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {news.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium max-w-md">
                  {t(item.titleAr, item.titleEn)}
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
