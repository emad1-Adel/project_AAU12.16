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
import { Plus, Edit, Trash2, Calendar, Percent, Gift } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Offer {
  id: number;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  type: 'scholarship' | 'discount' | 'program' | 'other';
  discount: string;
  startDate: string;
  endDate: string;
  targetAudience: string;
  status: 'active' | 'expired' | 'draft';
}

const initialOffers: Offer[] = [
  {
    id: 1,
    titleAr: 'منحة التفوق الدراسي',
    titleEn: 'Academic Excellence Scholarship',
    descriptionAr: 'منحة كاملة للطلاب المتفوقين بمعدل 95% فأعلى',
    descriptionEn: 'Full scholarship for students with 95%+ GPA',
    type: 'scholarship',
    discount: '100%',
    startDate: '2025-01-01',
    endDate: '2025-06-30',
    targetAudience: 'طلاب الثانوية المتفوقين',
    status: 'active',
  },
  {
    id: 2,
    titleAr: 'خصم التسجيل المبكر',
    titleEn: 'Early Registration Discount',
    descriptionAr: 'خصم 20% للتسجيل المبكر قبل نهاية يناير',
    descriptionEn: '20% discount for early registration before end of January',
    type: 'discount',
    discount: '20%',
    startDate: '2025-01-01',
    endDate: '2025-01-31',
    targetAudience: 'جميع الطلاب الجدد',
    status: 'active',
  },
  {
    id: 3,
    titleAr: 'برنامج الأخوة',
    titleEn: 'Siblings Program',
    descriptionAr: 'خصم 15% للأخوة المسجلين في نفس الفترة',
    descriptionEn: '15% discount for siblings registered in the same period',
    type: 'program',
    discount: '15%',
    startDate: '2024-09-01',
    endDate: '2025-08-31',
    targetAudience: 'الأخوة من نفس العائلة',
    status: 'active',
  },
];

export default function OffersManagement() {
  const { t } = useLanguage();
  const [offers, setOffers] = useState<Offer[]>(initialOffers);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);
  const [formData, setFormData] = useState({
    titleAr: '',
    titleEn: '',
    descriptionAr: '',
    descriptionEn: '',
    type: 'discount' as Offer['type'],
    discount: '',
    startDate: '',
    endDate: '',
    targetAudience: '',
    status: 'draft' as Offer['status'],
  });

  const getTypeLabel = (type: Offer['type']) => {
    const labels = {
      scholarship: { ar: 'منحة', en: 'Scholarship' },
      discount: { ar: 'خصم', en: 'Discount' },
      program: { ar: 'برنامج', en: 'Program' },
      other: { ar: 'أخرى', en: 'Other' },
    };
    return t(labels[type].ar, labels[type].en);
  };

  const getStatusLabel = (status: Offer['status']) => {
    const labels = {
      active: { ar: 'نشط', en: 'Active' },
      expired: { ar: 'منتهي', en: 'Expired' },
      draft: { ar: 'مسودة', en: 'Draft' },
    };
    return t(labels[status].ar, labels[status].en);
  };

  const getStatusVariant = (status: Offer['status']) => {
    const variants: Record<Offer['status'], 'default' | 'secondary' | 'destructive'> = {
      active: 'default',
      expired: 'secondary',
      draft: 'destructive',
    };
    return variants[status];
  };

  const handleSubmit = () => {
    if (!formData.titleAr || !formData.titleEn || !formData.startDate || !formData.endDate) {
      toast({
        title: t('خطأ', 'Error'),
        description: t('يرجى ملء جميع الحقول المطلوبة', 'Please fill all required fields'),
        variant: 'destructive',
      });
      return;
    }

    if (editingOffer) {
      setOffers(offers.map(o => o.id === editingOffer.id ? { ...formData, id: editingOffer.id } : o));
      toast({ title: t('تم التحديث', 'Updated'), description: t('تم تحديث العرض بنجاح', 'Offer updated successfully') });
    } else {
      setOffers([...offers, { ...formData, id: Date.now() }]);
      toast({ title: t('تمت الإضافة', 'Added'), description: t('تمت إضافة العرض بنجاح', 'Offer added successfully') });
    }
    resetForm();
  };

  const handleEdit = (offer: Offer) => {
    setEditingOffer(offer);
    setFormData({
      titleAr: offer.titleAr,
      titleEn: offer.titleEn,
      descriptionAr: offer.descriptionAr,
      descriptionEn: offer.descriptionEn,
      type: offer.type,
      discount: offer.discount,
      startDate: offer.startDate,
      endDate: offer.endDate,
      targetAudience: offer.targetAudience,
      status: offer.status,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setOffers(offers.filter(o => o.id !== id));
    toast({ title: t('تم الحذف', 'Deleted'), description: t('تم حذف العرض', 'Offer deleted') });
  };

  const resetForm = () => {
    setFormData({ titleAr: '', titleEn: '', descriptionAr: '', descriptionEn: '', type: 'discount', discount: '', startDate: '', endDate: '', targetAudience: '', status: 'draft' });
    setEditingOffer(null);
    setIsDialogOpen(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">{t('إدارة العروض', 'Offers Management')}</h1>
          <p className="text-muted-foreground">{t('إدارة المنح والخصومات والبرامج الخاصة', 'Manage scholarships, discounts and special programs')}</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { resetForm(); setIsDialogOpen(true); }}>
              <Plus className="w-4 h-4 mr-2" />
              {t('إضافة عرض', 'Add Offer')}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingOffer ? t('تعديل عرض', 'Edit Offer') : t('إضافة عرض جديد', 'Add New Offer')}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{t('العنوان (عربي)', 'Title (Arabic)')}</Label>
                  <Input value={formData.titleAr} onChange={(e) => setFormData({ ...formData, titleAr: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>{t('العنوان (إنجليزي)', 'Title (English)')}</Label>
                  <Input value={formData.titleEn} onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })} />
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
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>{t('النوع', 'Type')}</Label>
                  <Select value={formData.type} onValueChange={(value: Offer['type']) => setFormData({ ...formData, type: value })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="scholarship">{t('منحة', 'Scholarship')}</SelectItem>
                      <SelectItem value="discount">{t('خصم', 'Discount')}</SelectItem>
                      <SelectItem value="program">{t('برنامج', 'Program')}</SelectItem>
                      <SelectItem value="other">{t('أخرى', 'Other')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>{t('نسبة الخصم/المنحة', 'Discount/Scholarship %')}</Label>
                  <Input value={formData.discount} onChange={(e) => setFormData({ ...formData, discount: e.target.value })} placeholder="20%" />
                </div>
                <div className="space-y-2">
                  <Label>{t('الحالة', 'Status')}</Label>
                  <Select value={formData.status} onValueChange={(value: Offer['status']) => setFormData({ ...formData, status: value })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">{t('مسودة', 'Draft')}</SelectItem>
                      <SelectItem value="active">{t('نشط', 'Active')}</SelectItem>
                      <SelectItem value="expired">{t('منتهي', 'Expired')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{t('تاريخ البداية', 'Start Date')}</Label>
                  <Input type="date" value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>{t('تاريخ النهاية', 'End Date')}</Label>
                  <Input type="date" value={formData.endDate} onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>{t('الفئة المستهدفة', 'Target Audience')}</Label>
                <Input value={formData.targetAudience} onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })} />
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={resetForm}>{t('إلغاء', 'Cancel')}</Button>
                <Button onClick={handleSubmit}>{editingOffer ? t('تحديث', 'Update') : t('إضافة', 'Add')}</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('العرض', 'Offer')}</TableHead>
              <TableHead>{t('النوع', 'Type')}</TableHead>
              <TableHead>{t('الخصم', 'Discount')}</TableHead>
              <TableHead>{t('الفترة', 'Period')}</TableHead>
              <TableHead>{t('الفئة المستهدفة', 'Target')}</TableHead>
              <TableHead>{t('الحالة', 'Status')}</TableHead>
              <TableHead className="text-right">{t('الإجراءات', 'Actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {offers.map((offer) => (
              <TableRow key={offer.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
                      <Gift className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{t(offer.titleAr, offer.titleEn)}</p>
                      <p className="text-sm text-muted-foreground truncate max-w-xs">{t(offer.descriptionAr, offer.descriptionEn)}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell><Badge variant="outline">{getTypeLabel(offer.type)}</Badge></TableCell>
                <TableCell>
                  <span className="flex items-center gap-1 font-semibold text-primary">
                    <Percent className="w-3 h-3" />{offer.discount}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1 text-sm">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{offer.startDate}</span>
                    <span className="text-muted-foreground">{t('إلى', 'to')} {offer.endDate}</span>
                  </div>
                </TableCell>
                <TableCell className="max-w-xs truncate">{offer.targetAudience}</TableCell>
                <TableCell><Badge variant={getStatusVariant(offer.status)}>{getStatusLabel(offer.status)}</Badge></TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(offer)}><Edit className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(offer.id)}><Trash2 className="w-4 h-4" /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}