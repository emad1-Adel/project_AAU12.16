import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Plus, Edit, Trash2, ExternalLink, Building2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Partner {
  id: number;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  logo: string;
  website: string;
  category: 'academic' | 'corporate' | 'government' | 'ngo';
  status: 'active' | 'inactive';
}

const initialPartners: Partner[] = [
  {
    id: 1,
    nameAr: 'جامعة القاهرة',
    nameEn: 'Cairo University',
    descriptionAr: 'شراكة أكاديمية لتبادل الطلاب والأبحاث',
    descriptionEn: 'Academic partnership for student and research exchange',
    logo: '',
    website: 'https://cu.edu.eg',
    category: 'academic',
    status: 'active',
  },
  {
    id: 2,
    nameAr: 'شركة مايكروسوفت',
    nameEn: 'Microsoft',
    descriptionAr: 'شراكة تقنية لدعم البرامج التعليمية',
    descriptionEn: 'Technology partnership for educational programs',
    logo: '',
    website: 'https://microsoft.com',
    category: 'corporate',
    status: 'active',
  },
  {
    id: 3,
    nameAr: 'وزارة التعليم العالي',
    nameEn: 'Ministry of Higher Education',
    descriptionAr: 'شراكة حكومية للاعتماد الأكاديمي',
    descriptionEn: 'Government partnership for academic accreditation',
    logo: '',
    website: '',
    category: 'government',
    status: 'active',
  },
];

export default function PartnersManagement() {
  const { t } = useLanguage();
  const [partners, setPartners] = useState<Partner[]>(initialPartners);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
  const [formData, setFormData] = useState({
    nameAr: '',
    nameEn: '',
    descriptionAr: '',
    descriptionEn: '',
    logo: '',
    website: '',
    category: 'academic' as Partner['category'],
    status: 'active' as Partner['status'],
  });

  const getCategoryLabel = (category: Partner['category']) => {
    const labels = {
      academic: { ar: 'أكاديمي', en: 'Academic' },
      corporate: { ar: 'شركات', en: 'Corporate' },
      government: { ar: 'حكومي', en: 'Government' },
      ngo: { ar: 'منظمات', en: 'NGO' },
    };
    return t(labels[category].ar, labels[category].en);
  };

  const handleSubmit = () => {
    if (!formData.nameAr || !formData.nameEn) {
      toast({
        title: t('خطأ', 'Error'),
        description: t('يرجى ملء جميع الحقول المطلوبة', 'Please fill all required fields'),
        variant: 'destructive',
      });
      return;
    }

    if (editingPartner) {
      setPartners(partners.map(p => p.id === editingPartner.id ? { ...formData, id: editingPartner.id } : p));
      toast({ title: t('تم التحديث', 'Updated'), description: t('تم تحديث الشريك بنجاح', 'Partner updated successfully') });
    } else {
      setPartners([...partners, { ...formData, id: Date.now() }]);
      toast({ title: t('تمت الإضافة', 'Added'), description: t('تمت إضافة الشريك بنجاح', 'Partner added successfully') });
    }
    resetForm();
  };

  const handleEdit = (partner: Partner) => {
    setEditingPartner(partner);
    setFormData({
      nameAr: partner.nameAr,
      nameEn: partner.nameEn,
      descriptionAr: partner.descriptionAr,
      descriptionEn: partner.descriptionEn,
      logo: partner.logo,
      website: partner.website,
      category: partner.category,
      status: partner.status,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setPartners(partners.filter(p => p.id !== id));
    toast({ title: t('تم الحذف', 'Deleted'), description: t('تم حذف الشريك', 'Partner deleted') });
  };

  const resetForm = () => {
    setFormData({ nameAr: '', nameEn: '', descriptionAr: '', descriptionEn: '', logo: '', website: '', category: 'academic', status: 'active' });
    setEditingPartner(null);
    setIsDialogOpen(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">{t('إدارة الشركاء', 'Partners Management')}</h1>
          <p className="text-muted-foreground">{t('إدارة الجهات والمؤسسات الشريكة للجامعة', 'Manage university partner organizations')}</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { resetForm(); setIsDialogOpen(true); }}>
              <Plus className="w-4 h-4 mr-2" />
              {t('إضافة شريك', 'Add Partner')}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingPartner ? t('تعديل شريك', 'Edit Partner') : t('إضافة شريك جديد', 'Add New Partner')}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{t('الاسم (عربي)', 'Name (Arabic)')}</Label>
                  <Input value={formData.nameAr} onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>{t('الاسم (إنجليزي)', 'Name (English)')}</Label>
                  <Input value={formData.nameEn} onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{t('الوصف (عربي)', 'Description (Arabic)')}</Label>
                  <Textarea value={formData.descriptionAr} onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>{t('الوصف (إنجليزي)', 'Description (English)')}</Label>
                  <Textarea value={formData.descriptionEn} onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{t('رابط الشعار', 'Logo URL')}</Label>
                  <Input value={formData.logo} onChange={(e) => setFormData({ ...formData, logo: e.target.value })} placeholder="https://..." />
                </div>
                <div className="space-y-2">
                  <Label>{t('الموقع الإلكتروني', 'Website')}</Label>
                  <Input value={formData.website} onChange={(e) => setFormData({ ...formData, website: e.target.value })} placeholder="https://..." />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{t('التصنيف', 'Category')}</Label>
                  <Select value={formData.category} onValueChange={(value: Partner['category']) => setFormData({ ...formData, category: value })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="academic">{t('أكاديمي', 'Academic')}</SelectItem>
                      <SelectItem value="corporate">{t('شركات', 'Corporate')}</SelectItem>
                      <SelectItem value="government">{t('حكومي', 'Government')}</SelectItem>
                      <SelectItem value="ngo">{t('منظمات', 'NGO')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>{t('الحالة', 'Status')}</Label>
                  <Select value={formData.status} onValueChange={(value: Partner['status']) => setFormData({ ...formData, status: value })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">{t('نشط', 'Active')}</SelectItem>
                      <SelectItem value="inactive">{t('غير نشط', 'Inactive')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={resetForm}>{t('إلغاء', 'Cancel')}</Button>
                <Button onClick={handleSubmit}>{editingPartner ? t('تحديث', 'Update') : t('إضافة', 'Add')}</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('الشريك', 'Partner')}</TableHead>
              <TableHead>{t('الوصف', 'Description')}</TableHead>
              <TableHead>{t('التصنيف', 'Category')}</TableHead>
              <TableHead>{t('الموقع', 'Website')}</TableHead>
              <TableHead>{t('الحالة', 'Status')}</TableHead>
              <TableHead className="text-right">{t('الإجراءات', 'Actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {partners.map((partner) => (
              <TableRow key={partner.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-muted flex items-center justify-center">
                      {partner.logo ? (
                        <img src={partner.logo} alt="" className="w-8 h-8 object-contain" />
                      ) : (
                        <Building2 className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                    <span className="font-medium">{t(partner.nameAr, partner.nameEn)}</span>
                  </div>
                </TableCell>
                <TableCell className="max-w-xs truncate">{t(partner.descriptionAr, partner.descriptionEn)}</TableCell>
                <TableCell><Badge variant="outline">{getCategoryLabel(partner.category)}</Badge></TableCell>
                <TableCell>
                  {partner.website && (
                    <a href={partner.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-primary hover:underline">
                      <ExternalLink className="w-3 h-3" />
                      {t('زيارة', 'Visit')}
                    </a>
                  )}
                </TableCell>
                <TableCell>
                  <Badge variant={partner.status === 'active' ? 'default' : 'secondary'}>
                    {partner.status === 'active' ? t('نشط', 'Active') : t('غير نشط', 'Inactive')}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(partner)}><Edit className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(partner.id)}><Trash2 className="w-4 h-4" /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}