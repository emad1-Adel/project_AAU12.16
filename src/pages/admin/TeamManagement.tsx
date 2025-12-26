import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import { Plus, Edit, Trash2, Mail, Phone, ArrowUp, ArrowDown } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface TeamMember {
  id: number;
  nameAr: string;
  nameEn: string;
  positionAr: string;
  positionEn: string;
  departmentAr: string;
  departmentEn: string;
  email: string;
  phone: string;
  image: string;
  order: number;
  status: 'active' | 'inactive';
}

const initialTeam: TeamMember[] = [
  {
    id: 1,
    nameAr: 'د. أحمد محمد علي',
    nameEn: 'Dr. Ahmed Mohamed Ali',
    positionAr: 'رئيس الجامعة',
    positionEn: 'University President',
    departmentAr: 'الإدارة العليا',
    departmentEn: 'Executive Management',
    email: 'president@ngu.edu',
    phone: '+967 1 234567',
    image: '',
    order: 1,
    status: 'active',
  },
  {
    id: 2,
    nameAr: 'د. فاطمة أحمد',
    nameEn: 'Dr. Fatima Ahmed',
    positionAr: 'نائب الرئيس للشؤون الأكاديمية',
    positionEn: 'Vice President for Academic Affairs',
    departmentAr: 'الشؤون الأكاديمية',
    departmentEn: 'Academic Affairs',
    email: 'vp.academic@ngu.edu',
    phone: '+967 1 234568',
    image: '',
    order: 2,
    status: 'active',
  },
  {
    id: 3,
    nameAr: 'أ. محمد سالم',
    nameEn: 'Mr. Mohamed Salem',
    positionAr: 'مدير الشؤون المالية',
    positionEn: 'Financial Affairs Director',
    departmentAr: 'الشؤون المالية',
    departmentEn: 'Financial Affairs',
    email: 'finance@ngu.edu',
    phone: '+967 1 234569',
    image: '',
    order: 3,
    status: 'active',
  },
];

export default function TeamManagement() {
  const { t } = useLanguage();
  const [team, setTeam] = useState<TeamMember[]>(initialTeam);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [formData, setFormData] = useState({
    nameAr: '',
    nameEn: '',
    positionAr: '',
    positionEn: '',
    departmentAr: '',
    departmentEn: '',
    email: '',
    phone: '',
    image: '',
    status: 'active' as TeamMember['status'],
  });

  const handleSubmit = () => {
    if (!formData.nameAr || !formData.nameEn || !formData.positionAr) {
      toast({
        title: t('خطأ', 'Error'),
        description: t('يرجى ملء جميع الحقول المطلوبة', 'Please fill all required fields'),
        variant: 'destructive',
      });
      return;
    }

    if (editingMember) {
      setTeam(team.map(m => m.id === editingMember.id ? { ...formData, id: editingMember.id, order: editingMember.order } : m));
      toast({ title: t('تم التحديث', 'Updated'), description: t('تم تحديث بيانات العضو', 'Member updated successfully') });
    } else {
      const newOrder = Math.max(...team.map(m => m.order), 0) + 1;
      setTeam([...team, { ...formData, id: Date.now(), order: newOrder }]);
      toast({ title: t('تمت الإضافة', 'Added'), description: t('تمت إضافة العضو بنجاح', 'Member added successfully') });
    }
    resetForm();
  };

  const handleEdit = (member: TeamMember) => {
    setEditingMember(member);
    setFormData({
      nameAr: member.nameAr,
      nameEn: member.nameEn,
      positionAr: member.positionAr,
      positionEn: member.positionEn,
      departmentAr: member.departmentAr,
      departmentEn: member.departmentEn,
      email: member.email,
      phone: member.phone,
      image: member.image,
      status: member.status,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setTeam(team.filter(m => m.id !== id));
    toast({ title: t('تم الحذف', 'Deleted'), description: t('تم حذف العضو', 'Member deleted') });
  };

  const moveOrder = (id: number, direction: 'up' | 'down') => {
    const sorted = [...team].sort((a, b) => a.order - b.order);
    const index = sorted.findIndex(m => m.id === id);
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === sorted.length - 1)) return;
    
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    const tempOrder = sorted[index].order;
    sorted[index].order = sorted[swapIndex].order;
    sorted[swapIndex].order = tempOrder;
    setTeam(sorted);
  };

  const resetForm = () => {
    setFormData({ nameAr: '', nameEn: '', positionAr: '', positionEn: '', departmentAr: '', departmentEn: '', email: '', phone: '', image: '', status: 'active' });
    setEditingMember(null);
    setIsDialogOpen(false);
  };

  const sortedTeam = [...team].sort((a, b) => a.order - b.order);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">{t('إدارة فريق العمل', 'Team Management')}</h1>
          <p className="text-muted-foreground">{t('إدارة أعضاء الطاقم الإداري وترتيب عرضهم', 'Manage administrative staff and their display order')}</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { resetForm(); setIsDialogOpen(true); }}>
              <Plus className="w-4 h-4 mr-2" />
              {t('إضافة عضو', 'Add Member')}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingMember ? t('تعديل عضو', 'Edit Member') : t('إضافة عضو جديد', 'Add New Member')}</DialogTitle>
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
                  <Label>{t('المنصب (عربي)', 'Position (Arabic)')}</Label>
                  <Input value={formData.positionAr} onChange={(e) => setFormData({ ...formData, positionAr: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>{t('المنصب (إنجليزي)', 'Position (English)')}</Label>
                  <Input value={formData.positionEn} onChange={(e) => setFormData({ ...formData, positionEn: e.target.value })} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{t('القسم (عربي)', 'Department (Arabic)')}</Label>
                  <Input value={formData.departmentAr} onChange={(e) => setFormData({ ...formData, departmentAr: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>{t('القسم (إنجليزي)', 'Department (English)')}</Label>
                  <Input value={formData.departmentEn} onChange={(e) => setFormData({ ...formData, departmentEn: e.target.value })} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{t('البريد الإلكتروني', 'Email')}</Label>
                  <Input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>{t('رقم الهاتف', 'Phone')}</Label>
                  <Input value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>{t('رابط الصورة', 'Image URL')}</Label>
                  <Input value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} placeholder="https://..." />
                </div>
                <div className="space-y-2">
                  <Label>{t('الحالة', 'Status')}</Label>
                  <Select value={formData.status} onValueChange={(value: TeamMember['status']) => setFormData({ ...formData, status: value })}>
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
                <Button onClick={handleSubmit}>{editingMember ? t('تحديث', 'Update') : t('إضافة', 'Add')}</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">#</TableHead>
              <TableHead>{t('العضو', 'Member')}</TableHead>
              <TableHead>{t('المنصب', 'Position')}</TableHead>
              <TableHead>{t('القسم', 'Department')}</TableHead>
              <TableHead>{t('التواصل', 'Contact')}</TableHead>
              <TableHead>{t('الحالة', 'Status')}</TableHead>
              <TableHead className="text-right">{t('الإجراءات', 'Actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedTeam.map((member, index) => (
              <TableRow key={member.id}>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => moveOrder(member.id, 'up')} disabled={index === 0}>
                      <ArrowUp className="w-3 h-3" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => moveOrder(member.id, 'down')} disabled={index === sortedTeam.length - 1}>
                      <ArrowDown className="w-3 h-3" />
                    </Button>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={member.image} />
                      <AvatarFallback>{member.nameEn.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{t(member.nameAr, member.nameEn)}</span>
                  </div>
                </TableCell>
                <TableCell>{t(member.positionAr, member.positionEn)}</TableCell>
                <TableCell>{t(member.departmentAr, member.departmentEn)}</TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1 text-sm">
                    <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{member.email}</span>
                    <span className="flex items-center gap-1 text-muted-foreground"><Phone className="w-3 h-3" />{member.phone}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={member.status === 'active' ? 'default' : 'secondary'}>
                    {member.status === 'active' ? t('نشط', 'Active') : t('غير نشط', 'Inactive')}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(member)}><Edit className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(member.id)}><Trash2 className="w-4 h-4" /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}