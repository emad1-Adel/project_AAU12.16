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
import { Plus, Edit, Trash2, Calendar, MapPin, Clock } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Event {
  id: number;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  date: string;
  time: string;
  location: string;
  organizer: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'draft';
}

const initialEvents: Event[] = [
  {
    id: 1,
    titleAr: 'معرض التخرج السنوي',
    titleEn: 'Annual Graduation Exhibition',
    descriptionAr: 'معرض لمشاريع التخرج للطلاب',
    descriptionEn: 'Exhibition of student graduation projects',
    date: '2025-02-15',
    time: '09:00',
    location: 'القاعة الكبرى',
    organizer: 'كلية الهندسة',
    status: 'upcoming',
  },
  {
    id: 2,
    titleAr: 'ورشة البرمجة المتقدمة',
    titleEn: 'Advanced Programming Workshop',
    descriptionAr: 'ورشة عمل عملية في البرمجة',
    descriptionEn: 'Hands-on programming workshop',
    date: '2025-01-20',
    time: '14:00',
    location: 'معمل الحاسوب',
    organizer: 'قسم علوم الحاسوب',
    status: 'ongoing',
  },
  {
    id: 3,
    titleAr: 'ندوة ريادة الأعمال',
    titleEn: 'Entrepreneurship Seminar',
    descriptionAr: 'ندوة حول بدء المشاريع الناشئة',
    descriptionEn: 'Seminar on starting startups',
    date: '2024-12-10',
    time: '10:00',
    location: 'قاعة المؤتمرات',
    organizer: 'مركز ريادة الأعمال',
    status: 'completed',
  },
];

export default function EventsManagement() {
  const { t } = useLanguage();
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState({
    titleAr: '',
    titleEn: '',
    descriptionAr: '',
    descriptionEn: '',
    date: '',
    time: '',
    location: '',
    organizer: '',
    status: 'draft' as Event['status'],
  });

  const getStatusLabel = (status: Event['status']) => {
    const labels = {
      upcoming: { ar: 'قادم', en: 'Upcoming' },
      ongoing: { ar: 'جاري', en: 'Ongoing' },
      completed: { ar: 'منتهي', en: 'Completed' },
      draft: { ar: 'مسودة', en: 'Draft' },
    };
    return t(labels[status].ar, labels[status].en);
  };

  const getStatusVariant = (status: Event['status']) => {
    const variants: Record<Event['status'], 'default' | 'secondary' | 'destructive' | 'outline'> = {
      upcoming: 'default',
      ongoing: 'secondary',
      completed: 'outline',
      draft: 'destructive',
    };
    return variants[status];
  };

  const handleSubmit = () => {
    if (!formData.titleAr || !formData.titleEn || !formData.date) {
      toast({
        title: t('خطأ', 'Error'),
        description: t('يرجى ملء جميع الحقول المطلوبة', 'Please fill all required fields'),
        variant: 'destructive',
      });
      return;
    }

    if (editingEvent) {
      setEvents(events.map(e => e.id === editingEvent.id ? { ...formData, id: editingEvent.id } : e));
      toast({ title: t('تم التحديث', 'Updated'), description: t('تم تحديث الفعالية بنجاح', 'Event updated successfully') });
    } else {
      setEvents([...events, { ...formData, id: Date.now() }]);
      toast({ title: t('تمت الإضافة', 'Added'), description: t('تمت إضافة الفعالية بنجاح', 'Event added successfully') });
    }
    resetForm();
  };

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
    setFormData({
      titleAr: event.titleAr,
      titleEn: event.titleEn,
      descriptionAr: event.descriptionAr,
      descriptionEn: event.descriptionEn,
      date: event.date,
      time: event.time,
      location: event.location,
      organizer: event.organizer,
      status: event.status,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setEvents(events.filter(e => e.id !== id));
    toast({ title: t('تم الحذف', 'Deleted'), description: t('تم حذف الفعالية', 'Event deleted') });
  };

  const resetForm = () => {
    setFormData({ titleAr: '', titleEn: '', descriptionAr: '', descriptionEn: '', date: '', time: '', location: '', organizer: '', status: 'draft' });
    setEditingEvent(null);
    setIsDialogOpen(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">{t('إدارة الفعاليات', 'Events Management')}</h1>
          <p className="text-muted-foreground">{t('إضافة وتعديل وإدارة فعاليات الجامعة', 'Add, edit and manage university events')}</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { resetForm(); setIsDialogOpen(true); }}>
              <Plus className="w-4 h-4 mr-2" />
              {t('إضافة فعالية', 'Add Event')}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingEvent ? t('تعديل فعالية', 'Edit Event') : t('إضافة فعالية جديدة', 'Add New Event')}</DialogTitle>
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
                  <Label>{t('التاريخ', 'Date')}</Label>
                  <Input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>{t('الوقت', 'Time')}</Label>
                  <Input type="time" value={formData.time} onChange={(e) => setFormData({ ...formData, time: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>{t('الحالة', 'Status')}</Label>
                  <Select value={formData.status} onValueChange={(value: Event['status']) => setFormData({ ...formData, status: value })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">{t('مسودة', 'Draft')}</SelectItem>
                      <SelectItem value="upcoming">{t('قادم', 'Upcoming')}</SelectItem>
                      <SelectItem value="ongoing">{t('جاري', 'Ongoing')}</SelectItem>
                      <SelectItem value="completed">{t('منتهي', 'Completed')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{t('المكان', 'Location')}</Label>
                  <Input value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>{t('الجهة المنظمة', 'Organizer')}</Label>
                  <Input value={formData.organizer} onChange={(e) => setFormData({ ...formData, organizer: e.target.value })} />
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" onClick={resetForm}>{t('إلغاء', 'Cancel')}</Button>
                <Button onClick={handleSubmit}>{editingEvent ? t('تحديث', 'Update') : t('إضافة', 'Add')}</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('العنوان', 'Title')}</TableHead>
              <TableHead>{t('التاريخ والوقت', 'Date & Time')}</TableHead>
              <TableHead>{t('المكان', 'Location')}</TableHead>
              <TableHead>{t('الجهة المنظمة', 'Organizer')}</TableHead>
              <TableHead>{t('الحالة', 'Status')}</TableHead>
              <TableHead className="text-right">{t('الإجراءات', 'Actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event.id}>
                <TableCell className="font-medium">{t(event.titleAr, event.titleEn)}</TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <span className="flex items-center gap-1 text-sm"><Calendar className="w-3 h-3" />{event.date}</span>
                    <span className="flex items-center gap-1 text-sm text-muted-foreground"><Clock className="w-3 h-3" />{event.time}</span>
                  </div>
                </TableCell>
                <TableCell><span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{event.location}</span></TableCell>
                <TableCell>{event.organizer}</TableCell>
                <TableCell><Badge variant={getStatusVariant(event.status)}>{getStatusLabel(event.status)}</Badge></TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(event)}><Edit className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(event.id)}><Trash2 className="w-4 h-4" /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}