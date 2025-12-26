import { Outlet, Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  LayoutDashboard, Users, Newspaper, FolderKanban, HelpCircle, Settings, LogOut,
  Calendar, UsersRound, Building2, Gift, Image, Shield, BookOpen, GraduationCap,
  Building, UserCheck, FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { adminRoutes } from '@/config/routes';
import { ScrollArea } from '@/components/ui/scroll-area';

export const AdminLayout = () => {
  const { t } = useLanguage();
  const location = useLocation();

  const menuIcons = [
    LayoutDashboard, // Dashboard
    Users,           // Users
    Shield,          // Roles
    Newspaper,       // News
    BookOpen,        // Blog
    Calendar,        // Events
    FolderKanban,    // Projects
    GraduationCap,   // Colleges
    Building,        // Centers
    UserCheck,       // Faculty
    UsersRound,      // Team
    Building2,       // Partners
    Gift,            // Offers
    FileText,        // Pages
    Image,           // Media
    HelpCircle,      // FAQ
    Settings,        // Settings
  ];

  const menuItems = adminRoutes.map((route, index) => ({
    path: route.href,
    icon: menuIcons[index],
    label: t(route.ar, route.en),
  }));

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border flex flex-col">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-secondary">
            {t('لوحة الإدارة', 'Admin Panel')}
          </h2>
        </div>
        <ScrollArea className="flex-1 px-3">
          <nav className="space-y-1 pb-4">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                    isActive(item.path)
                      ? 'bg-secondary text-secondary-foreground'
                      : 'hover:bg-muted'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </ScrollArea>
        <div className="p-4 border-t">
          <Button variant="outline" className="w-full" asChild>
            <Link to="/login">
              <LogOut className="w-4 h-4 mr-2" />
              {t('تسجيل الخروج', 'Logout')}
            </Link>
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};