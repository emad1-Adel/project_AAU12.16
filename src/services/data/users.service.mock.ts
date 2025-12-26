import { User, Role, Permission, AppRole } from '@/types';

// Permissions
export const permissions: Permission[] = [
  // Users permissions
  { id: 'p1', key: 'users.view', nameAr: 'عرض المستخدمين', nameEn: 'View Users', descriptionAr: 'عرض قائمة المستخدمين', descriptionEn: 'View users list', category: 'users' },
  { id: 'p2', key: 'users.create', nameAr: 'إضافة مستخدم', nameEn: 'Create User', descriptionAr: 'إضافة مستخدم جديد', descriptionEn: 'Create new user', category: 'users' },
  { id: 'p3', key: 'users.edit', nameAr: 'تعديل مستخدم', nameEn: 'Edit User', descriptionAr: 'تعديل بيانات المستخدمين', descriptionEn: 'Edit user data', category: 'users' },
  { id: 'p4', key: 'users.delete', nameAr: 'حذف مستخدم', nameEn: 'Delete User', descriptionAr: 'حذف المستخدمين', descriptionEn: 'Delete users', category: 'users' },
  { id: 'p5', key: 'roles.manage', nameAr: 'إدارة الأدوار', nameEn: 'Manage Roles', descriptionAr: 'إضافة وتعديل الأدوار والصلاحيات', descriptionEn: 'Add and edit roles and permissions', category: 'users' },
  
  // Content permissions
  { id: 'p6', key: 'content.news', nameAr: 'إدارة الأخبار', nameEn: 'Manage News', descriptionAr: 'إضافة وتعديل وحذف الأخبار', descriptionEn: 'Add, edit and delete news', category: 'content' },
  { id: 'p7', key: 'content.events', nameAr: 'إدارة الفعاليات', nameEn: 'Manage Events', descriptionAr: 'إضافة وتعديل وحذف الفعاليات', descriptionEn: 'Add, edit and delete events', category: 'content' },
  { id: 'p8', key: 'content.projects', nameAr: 'إدارة المشاريع', nameEn: 'Manage Projects', descriptionAr: 'إضافة وتعديل وحذف المشاريع', descriptionEn: 'Add, edit and delete projects', category: 'content' },
  { id: 'p9', key: 'content.media', nameAr: 'إدارة الوسائط', nameEn: 'Manage Media', descriptionAr: 'رفع وحذف ملفات الوسائط', descriptionEn: 'Upload and delete media files', category: 'content' },
  
  // Settings permissions
  { id: 'p10', key: 'settings.general', nameAr: 'الإعدادات العامة', nameEn: 'General Settings', descriptionAr: 'تعديل إعدادات الموقع', descriptionEn: 'Edit site settings', category: 'settings' },
  { id: 'p11', key: 'settings.appearance', nameAr: 'إعدادات المظهر', nameEn: 'Appearance Settings', descriptionAr: 'تعديل مظهر الموقع', descriptionEn: 'Edit site appearance', category: 'settings' },
  
  // Reports permissions
  { id: 'p12', key: 'reports.view', nameAr: 'عرض التقارير', nameEn: 'View Reports', descriptionAr: 'عرض تقارير النظام', descriptionEn: 'View system reports', category: 'reports' },
  { id: 'p13', key: 'reports.export', nameAr: 'تصدير التقارير', nameEn: 'Export Reports', descriptionAr: 'تصدير التقارير', descriptionEn: 'Export reports', category: 'reports' },
];

// Roles
export const roles: Role[] = [
  {
    id: 'r1',
    key: 'admin',
    nameAr: 'مدير النظام',
    nameEn: 'System Admin',
    descriptionAr: 'صلاحيات كاملة على النظام',
    descriptionEn: 'Full system access',
    permissions: permissions.map(p => p.key),
    isSystem: true,
    createdAt: '2024-01-01',
  },
  {
    id: 'r2',
    key: 'content_editor',
    nameAr: 'محرر المحتوى',
    nameEn: 'Content Editor',
    descriptionAr: 'إدارة محتوى الموقع',
    descriptionEn: 'Manage website content',
    permissions: ['content.news', 'content.events', 'content.projects', 'content.media'],
    isSystem: true,
    createdAt: '2024-01-01',
  },
  {
    id: 'r3',
    key: 'doctor',
    nameAr: 'دكتور',
    nameEn: 'Doctor',
    descriptionAr: 'عضو هيئة تدريس',
    descriptionEn: 'Faculty member',
    permissions: ['reports.view'],
    isSystem: true,
    createdAt: '2024-01-01',
  },
  {
    id: 'r4',
    key: 'student',
    nameAr: 'طالب',
    nameEn: 'Student',
    descriptionAr: 'طالب مسجل في الجامعة',
    descriptionEn: 'Enrolled student',
    permissions: [],
    isSystem: true,
    createdAt: '2024-01-01',
  },
];

// Users
export const users: User[] = [
  {
    id: 'u1',
    nameAr: 'أحمد محمد الأنصاري',
    nameEn: 'Ahmed Mohammed Al-Ansari',
    email: 'ahmed.admin@ngu.edu.ye',
    phone: '+967 777 123456',
    roleId: 'r1',
    status: 'active',
    lastLogin: '2024-12-07T10:30:00',
    createdAt: '2024-01-15',
  },
  {
    id: 'u2',
    nameAr: 'فاطمة علي الحسني',
    nameEn: 'Fatima Ali Al-Hasani',
    email: 'fatima.editor@ngu.edu.ye',
    phone: '+967 777 234567',
    roleId: 'r2',
    status: 'active',
    lastLogin: '2024-12-06T14:20:00',
    createdAt: '2024-02-10',
  },
  {
    id: 'u3',
    nameAr: 'د. محمد حسن العمري',
    nameEn: 'Dr. Mohammed Hassan Al-Omari',
    email: 'mohamed.doctor@ngu.edu.ye',
    phone: '+967 777 345678',
    roleId: 'r3',
    status: 'active',
    lastLogin: '2024-12-05T09:15:00',
    createdAt: '2024-01-20',
  },
  {
    id: 'u4',
    nameAr: 'سارة أحمد الصالح',
    nameEn: 'Sara Ahmed Al-Saleh',
    email: 'sara.student@ngu.edu.ye',
    phone: '+967 777 456789',
    roleId: 'r4',
    status: 'active',
    lastLogin: '2024-12-07T08:45:00',
    createdAt: '2024-03-01',
  },
  {
    id: 'u5',
    nameAr: 'خالد يوسف البكري',
    nameEn: 'Khaled Yousef Al-Bakri',
    email: 'khaled.student@ngu.edu.ye',
    phone: '+967 777 567890',
    roleId: 'r4',
    status: 'inactive',
    lastLogin: '2024-11-20T16:30:00',
    createdAt: '2024-03-15',
  },
  {
    id: 'u6',
    nameAr: 'نورة محمد الزهراني',
    nameEn: 'Noura Mohammed Al-Zahrani',
    email: 'noura.editor@ngu.edu.ye',
    phone: '+967 777 678901',
    roleId: 'r2',
    status: 'suspended',
    lastLogin: '2024-10-10T11:00:00',
    createdAt: '2024-04-01',
  },
];

// Mock API functions
export const getUsers = (): Promise<User[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve([...users]), 300);
  });
};

export const getUserById = (id: string): Promise<User | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(users.find(u => u.id === id)), 200);
  });
};

export const createUser = (user: Omit<User, 'id' | 'createdAt'>): Promise<User> => {
  return new Promise((resolve) => {
    const newUser: User = {
      ...user,
      id: `u${users.length + 1}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    users.push(newUser);
    setTimeout(() => resolve(newUser), 300);
  });
};

export const updateUser = (id: string, data: Partial<User>): Promise<User | undefined> => {
  return new Promise((resolve) => {
    const index = users.findIndex(u => u.id === id);
    if (index !== -1) {
      users[index] = { ...users[index], ...data };
      setTimeout(() => resolve(users[index]), 300);
    } else {
      setTimeout(() => resolve(undefined), 300);
    }
  });
};

export const deleteUser = (id: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const index = users.findIndex(u => u.id === id);
    if (index !== -1) {
      users.splice(index, 1);
      setTimeout(() => resolve(true), 300);
    } else {
      setTimeout(() => resolve(false), 300);
    }
  });
};

// Roles API
export const getRoles = (): Promise<Role[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve([...roles]), 300);
  });
};

export const getRoleById = (id: string): Promise<Role | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(roles.find(r => r.id === id)), 200);
  });
};

export const createRole = (role: Omit<Role, 'id' | 'createdAt' | 'isSystem'>): Promise<Role> => {
  return new Promise((resolve) => {
    const newRole: Role = {
      ...role,
      id: `r${roles.length + 1}`,
      isSystem: false,
      createdAt: new Date().toISOString().split('T')[0],
    };
    roles.push(newRole);
    setTimeout(() => resolve(newRole), 300);
  });
};

export const updateRole = (id: string, data: Partial<Role>): Promise<Role | undefined> => {
  return new Promise((resolve) => {
    const index = roles.findIndex(r => r.id === id);
    if (index !== -1 && !roles[index].isSystem) {
      roles[index] = { ...roles[index], ...data };
      setTimeout(() => resolve(roles[index]), 300);
    } else {
      setTimeout(() => resolve(undefined), 300);
    }
  });
};

export const deleteRole = (id: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const index = roles.findIndex(r => r.id === id);
    if (index !== -1 && !roles[index].isSystem) {
      roles.splice(index, 1);
      setTimeout(() => resolve(true), 300);
    } else {
      setTimeout(() => resolve(false), 300);
    }
  });
};

// Permissions API
export const getPermissions = (): Promise<Permission[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve([...permissions]), 200);
  });
};

export const getPermissionsByCategory = (category: Permission['category']): Promise<Permission[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(permissions.filter(p => p.category === category)), 200);
  });
};