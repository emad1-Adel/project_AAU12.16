import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
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
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Label } from '@/components/ui/label';
import { Plus, Edit, Trash2, Search, UserCheck, UserX, Shield } from 'lucide-react';
import { User, Role } from '@/types';
import { getUsers, getRoles, createUser, updateUser, deleteUser } from '@/services/data/users.service.mock';
import { toast } from 'sonner';

export default function Users() {
  const { t, language } = useLanguage();
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  
  // Dialog states
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);
  
  // Form states
  const [formData, setFormData] = useState({
    nameAr: '',
    nameEn: '',
    email: '',
    phone: '',
    roleId: '',
    status: 'active' as User['status'],
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const [usersData, rolesData] = await Promise.all([getUsers(), getRoles()]);
    setUsers(usersData);
    setRoles(rolesData);
    setLoading(false);
  };

  const getRoleLabel = (roleId: string) => {
    const role = roles.find(r => r.id === roleId);
    return role ? (language === 'ar' ? role.nameAr : role.nameEn) : '';
  };

  const getStatusBadge = (status: User['status']) => {
    const variants: Record<User['status'], { label: string; variant: 'default' | 'secondary' | 'destructive' }> = {
      active: { label: t('نشط', 'Active'), variant: 'default' },
      inactive: { label: t('غير نشط', 'Inactive'), variant: 'secondary' },
      suspended: { label: t('موقوف', 'Suspended'), variant: 'destructive' },
    };
    return variants[status];
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.nameAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.nameEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === 'all' || user.roleId === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleOpenDialog = (user?: User) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        nameAr: user.nameAr,
        nameEn: user.nameEn,
        email: user.email,
        phone: user.phone || '',
        roleId: user.roleId,
        status: user.status,
      });
    } else {
      setEditingUser(null);
      setFormData({
        nameAr: '',
        nameEn: '',
        email: '',
        phone: '',
        roleId: roles[0]?.id || '',
        status: 'active',
      });
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = async () => {
    if (!formData.nameAr || !formData.nameEn || !formData.email || !formData.roleId) {
      toast.error(t('يرجى ملء جميع الحقول المطلوبة', 'Please fill all required fields'));
      return;
    }

    if (editingUser) {
      await updateUser(editingUser.id, formData);
      toast.success(t('تم تحديث المستخدم بنجاح', 'User updated successfully'));
    } else {
      await createUser(formData);
      toast.success(t('تم إضافة المستخدم بنجاح', 'User added successfully'));
    }
    
    setIsDialogOpen(false);
    loadData();
  };

  const handleDelete = async () => {
    if (deletingUser) {
      await deleteUser(deletingUser.id);
      toast.success(t('تم حذف المستخدم بنجاح', 'User deleted successfully'));
      setIsDeleteOpen(false);
      setDeletingUser(null);
      loadData();
    }
  };

  const handleToggleStatus = async (user: User) => {
    const newStatus = user.status === 'active' ? 'inactive' : 'active';
    await updateUser(user.id, { status: newStatus });
    toast.success(
      newStatus === 'active' 
        ? t('تم تفعيل المستخدم', 'User activated')
        : t('تم تعطيل المستخدم', 'User deactivated')
    );
    loadData();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            {t('إدارة المستخدمين', 'Users Management')}
          </h1>
          <p className="text-muted-foreground">
            {t('عرض وإدارة حسابات المستخدمين والأدوار', 'View and manage user accounts and roles')}
          </p>
        </div>
        <Button onClick={() => handleOpenDialog()}>
          <Plus className="w-4 h-4 mr-2" />
          {t('إضافة مستخدم', 'Add User')}
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder={t('بحث...', 'Search...')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterRole} onValueChange={setFilterRole}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={t('الدور', 'Role')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('جميع الأدوار', 'All Roles')}</SelectItem>
            {roles.map(role => (
              <SelectItem key={role.id} value={role.id}>
                {language === 'ar' ? role.nameAr : role.nameEn}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={t('الحالة', 'Status')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('جميع الحالات', 'All Status')}</SelectItem>
            <SelectItem value="active">{t('نشط', 'Active')}</SelectItem>
            <SelectItem value="inactive">{t('غير نشط', 'Inactive')}</SelectItem>
            <SelectItem value="suspended">{t('موقوف', 'Suspended')}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Users Table */}
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('الاسم', 'Name')}</TableHead>
              <TableHead>{t('البريد الإلكتروني', 'Email')}</TableHead>
              <TableHead>{t('الدور', 'Role')}</TableHead>
              <TableHead>{t('الحالة', 'Status')}</TableHead>
              <TableHead>{t('آخر دخول', 'Last Login')}</TableHead>
              <TableHead className="text-right">{t('الإجراءات', 'Actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  {t('جاري التحميل...', 'Loading...')}
                </TableCell>
              </TableRow>
            ) : filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  {t('لا يوجد مستخدمين', 'No users found')}
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => {
                const statusBadge = getStatusBadge(user.status);
                return (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">
                      {language === 'ar' ? user.nameAr : user.nameEn}
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="gap-1">
                        <Shield className="w-3 h-3" />
                        {getRoleLabel(user.roleId)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={statusBadge.variant}>
                        {statusBadge.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {user.lastLogin 
                        ? new Date(user.lastLogin).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US')
                        : '-'}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleToggleStatus(user)}
                        title={user.status === 'active' ? t('تعطيل', 'Deactivate') : t('تفعيل', 'Activate')}
                      >
                        {user.status === 'active' ? (
                          <UserX className="w-4 h-4" />
                        ) : (
                          <UserCheck className="w-4 h-4" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleOpenDialog(user)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setDeletingUser(user);
                          setIsDeleteOpen(true);
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingUser 
                ? t('تعديل المستخدم', 'Edit User')
                : t('إضافة مستخدم جديد', 'Add New User')}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>{t('الاسم بالعربية', 'Name (Arabic)')} *</Label>
              <Input
                value={formData.nameAr}
                onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
                dir="rtl"
              />
            </div>
            <div className="grid gap-2">
              <Label>{t('الاسم بالإنجليزية', 'Name (English)')} *</Label>
              <Input
                value={formData.nameEn}
                onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                dir="ltr"
              />
            </div>
            <div className="grid gap-2">
              <Label>{t('البريد الإلكتروني', 'Email')} *</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                dir="ltr"
              />
            </div>
            <div className="grid gap-2">
              <Label>{t('رقم الهاتف', 'Phone')}</Label>
              <Input
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                dir="ltr"
              />
            </div>
            <div className="grid gap-2">
              <Label>{t('الدور', 'Role')} *</Label>
              <Select value={formData.roleId} onValueChange={(v) => setFormData({ ...formData, roleId: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {roles.map(role => (
                    <SelectItem key={role.id} value={role.id}>
                      {language === 'ar' ? role.nameAr : role.nameEn}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label>{t('الحالة', 'Status')}</Label>
              <Select 
                value={formData.status} 
                onValueChange={(v) => setFormData({ ...formData, status: v as User['status'] })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">{t('نشط', 'Active')}</SelectItem>
                  <SelectItem value="inactive">{t('غير نشط', 'Inactive')}</SelectItem>
                  <SelectItem value="suspended">{t('موقوف', 'Suspended')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              {t('إلغاء', 'Cancel')}
            </Button>
            <Button onClick={handleSubmit}>
              {editingUser ? t('حفظ التغييرات', 'Save Changes') : t('إضافة', 'Add')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('حذف المستخدم', 'Delete User')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t(
                'هل أنت متأكد من حذف هذا المستخدم؟ لا يمكن التراجع عن هذا الإجراء.',
                'Are you sure you want to delete this user? This action cannot be undone.'
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('إلغاء', 'Cancel')}</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              {t('حذف', 'Delete')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}