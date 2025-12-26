import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Edit, Trash2, Shield, Lock, Users, FileText, Settings, BarChart } from 'lucide-react';
import { Role, Permission, AppRole } from '@/types';
import { getRoles, getPermissions, createRole, updateRole, deleteRole, getUsers } from '@/services/data/users.service.mock';
import { toast } from 'sonner';

const categoryIcons = {
  users: Users,
  content: FileText,
  settings: Settings,
  reports: BarChart,
};

const categoryLabels = {
  users: { ar: 'المستخدمين', en: 'Users' },
  content: { ar: 'المحتوى', en: 'Content' },
  settings: { ar: 'الإعدادات', en: 'Settings' },
  reports: { ar: 'التقارير', en: 'Reports' },
};

export default function RolesManagement() {
  const { t, language } = useLanguage();
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [usersCount, setUsersCount] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  
  // Dialog states
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [deletingRole, setDeletingRole] = useState<Role | null>(null);
  
  // Form states
  const [formData, setFormData] = useState({
    key: '' as AppRole,
    nameAr: '',
    nameEn: '',
    descriptionAr: '',
    descriptionEn: '',
    permissions: [] as string[],
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const [rolesData, permissionsData, usersData] = await Promise.all([
      getRoles(),
      getPermissions(),
      getUsers(),
    ]);
    setRoles(rolesData);
    setPermissions(permissionsData);
    
    // Count users per role
    const counts: Record<string, number> = {};
    usersData.forEach(user => {
      counts[user.roleId] = (counts[user.roleId] || 0) + 1;
    });
    setUsersCount(counts);
    setLoading(false);
  };

  const groupedPermissions = permissions.reduce((acc, perm) => {
    if (!acc[perm.category]) acc[perm.category] = [];
    acc[perm.category].push(perm);
    return acc;
  }, {} as Record<string, Permission[]>);

  const handleOpenDialog = (role?: Role) => {
    if (role) {
      setEditingRole(role);
      setFormData({
        key: role.key,
        nameAr: role.nameAr,
        nameEn: role.nameEn,
        descriptionAr: role.descriptionAr,
        descriptionEn: role.descriptionEn,
        permissions: [...role.permissions],
      });
    } else {
      setEditingRole(null);
      setFormData({
        key: 'student' as AppRole,
        nameAr: '',
        nameEn: '',
        descriptionAr: '',
        descriptionEn: '',
        permissions: [],
      });
    }
    setIsDialogOpen(true);
  };

  const handleTogglePermission = (permKey: string) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permKey)
        ? prev.permissions.filter(p => p !== permKey)
        : [...prev.permissions, permKey],
    }));
  };

  const handleToggleAllCategory = (category: string) => {
    const categoryPerms = groupedPermissions[category]?.map(p => p.key) || [];
    const allSelected = categoryPerms.every(p => formData.permissions.includes(p));
    
    setFormData(prev => ({
      ...prev,
      permissions: allSelected
        ? prev.permissions.filter(p => !categoryPerms.includes(p))
        : [...new Set([...prev.permissions, ...categoryPerms])],
    }));
  };

  const handleSubmit = async () => {
    if (!formData.nameAr || !formData.nameEn) {
      toast.error(t('يرجى ملء جميع الحقول المطلوبة', 'Please fill all required fields'));
      return;
    }

    if (editingRole) {
      if (editingRole.isSystem) {
        toast.error(t('لا يمكن تعديل الأدوار الأساسية', 'System roles cannot be modified'));
        return;
      }
      await updateRole(editingRole.id, formData);
      toast.success(t('تم تحديث الدور بنجاح', 'Role updated successfully'));
    } else {
      await createRole(formData);
      toast.success(t('تم إضافة الدور بنجاح', 'Role added successfully'));
    }
    
    setIsDialogOpen(false);
    loadData();
  };

  const handleDelete = async () => {
    if (deletingRole) {
      if (deletingRole.isSystem) {
        toast.error(t('لا يمكن حذف الأدوار الأساسية', 'System roles cannot be deleted'));
        return;
      }
      if (usersCount[deletingRole.id] > 0) {
        toast.error(t('لا يمكن حذف دور مرتبط بمستخدمين', 'Cannot delete role with assigned users'));
        return;
      }
      await deleteRole(deletingRole.id);
      toast.success(t('تم حذف الدور بنجاح', 'Role deleted successfully'));
      setIsDeleteOpen(false);
      setDeletingRole(null);
      loadData();
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            {t('إدارة الأدوار والصلاحيات', 'Roles & Permissions')}
          </h1>
          <p className="text-muted-foreground">
            {t('تحديد صلاحيات كل دور في النظام', 'Define permissions for each role')}
          </p>
        </div>
        <Button onClick={() => handleOpenDialog()}>
          <Plus className="w-4 h-4 mr-2" />
          {t('إضافة دور', 'Add Role')}
        </Button>
      </div>

      {/* Roles Grid */}
      {loading ? (
        <div className="text-center py-12">{t('جاري التحميل...', 'Loading...')}</div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {roles.map((role) => (
            <Card key={role.id} className="relative">
              {role.isSystem && (
                <Badge variant="secondary" className="absolute top-4 right-4 gap-1">
                  <Lock className="w-3 h-3" />
                  {t('أساسي', 'System')}
                </Badge>
              )}
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  {language === 'ar' ? role.nameAr : role.nameEn}
                </CardTitle>
                <CardDescription>
                  {language === 'ar' ? role.descriptionAr : role.descriptionEn}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>
                      {usersCount[role.id] || 0} {t('مستخدم', 'users')}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium">{t('الصلاحيات:', 'Permissions:')}</p>
                    <div className="flex flex-wrap gap-1">
                      {role.permissions.length === 0 ? (
                        <span className="text-sm text-muted-foreground">
                          {t('لا توجد صلاحيات', 'No permissions')}
                        </span>
                      ) : role.permissions.length === permissions.length ? (
                        <Badge variant="default">{t('جميع الصلاحيات', 'All Permissions')}</Badge>
                      ) : (
                        role.permissions.slice(0, 3).map(permKey => {
                          const perm = permissions.find(p => p.key === permKey);
                          return perm ? (
                            <Badge key={permKey} variant="outline" className="text-xs">
                              {language === 'ar' ? perm.nameAr : perm.nameEn}
                            </Badge>
                          ) : null;
                        })
                      )}
                      {role.permissions.length > 3 && role.permissions.length !== permissions.length && (
                        <Badge variant="secondary" className="text-xs">
                          +{role.permissions.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2 border-t">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleOpenDialog(role)}
                      disabled={role.isSystem}
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      {t('تعديل', 'Edit')}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setDeletingRole(role);
                        setIsDeleteOpen(true);
                      }}
                      disabled={role.isSystem || (usersCount[role.id] || 0) > 0}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingRole 
                ? t('تعديل الدور', 'Edit Role')
                : t('إضافة دور جديد', 'Add New Role')}
            </DialogTitle>
          </DialogHeader>
          
          <Tabs defaultValue="info" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="info">{t('معلومات الدور', 'Role Info')}</TabsTrigger>
              <TabsTrigger value="permissions">{t('الصلاحيات', 'Permissions')}</TabsTrigger>
            </TabsList>
            
            <TabsContent value="info" className="space-y-4 mt-4">
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
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
                </div>
                <div className="grid gap-2">
                  <Label>{t('الوصف بالعربية', 'Description (Arabic)')}</Label>
                  <Textarea
                    value={formData.descriptionAr}
                    onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })}
                    dir="rtl"
                    rows={2}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>{t('الوصف بالإنجليزية', 'Description (English)')}</Label>
                  <Textarea
                    value={formData.descriptionEn}
                    onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
                    dir="ltr"
                    rows={2}
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="permissions" className="mt-4">
              <div className="space-y-6">
                {Object.entries(groupedPermissions).map(([category, perms]) => {
                  const Icon = categoryIcons[category as keyof typeof categoryIcons];
                  const label = categoryLabels[category as keyof typeof categoryLabels];
                  const allSelected = perms.every(p => formData.permissions.includes(p.key));
                  const someSelected = perms.some(p => formData.permissions.includes(p.key));
                  
                  return (
                    <div key={category} className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 font-medium">
                          <Icon className="w-4 h-4 text-primary" />
                          {language === 'ar' ? label.ar : label.en}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleToggleAllCategory(category)}
                        >
                          {allSelected 
                            ? t('إلغاء الكل', 'Deselect All')
                            : t('تحديد الكل', 'Select All')}
                        </Button>
                      </div>
                      <div className="grid gap-2 pl-6">
                        {perms.map(perm => (
                          <div key={perm.key} className="flex items-start gap-3">
                            <Checkbox
                              id={perm.key}
                              checked={formData.permissions.includes(perm.key)}
                              onCheckedChange={() => handleTogglePermission(perm.key)}
                            />
                            <div className="grid gap-0.5">
                              <Label htmlFor={perm.key} className="font-normal cursor-pointer">
                                {language === 'ar' ? perm.nameAr : perm.nameEn}
                              </Label>
                              <p className="text-xs text-muted-foreground">
                                {language === 'ar' ? perm.descriptionAr : perm.descriptionEn}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              {t('إلغاء', 'Cancel')}
            </Button>
            <Button onClick={handleSubmit}>
              {editingRole ? t('حفظ التغييرات', 'Save Changes') : t('إضافة', 'Add')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('حذف الدور', 'Delete Role')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t(
                'هل أنت متأكد من حذف هذا الدور؟ لا يمكن التراجع عن هذا الإجراء.',
                'Are you sure you want to delete this role? This action cannot be undone.'
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