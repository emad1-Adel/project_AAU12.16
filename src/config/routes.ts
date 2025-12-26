export interface NavItem {
  ar: string;
  en: string;
  href: string;
  isRoute: boolean;
  showInMainNav?: boolean;
}

export const publicRoutes: NavItem[] = [
  { ar: 'الرئيسية', en: 'Home', href: '/', isRoute: true, showInMainNav: true },
  { ar: 'عن الجامعة', en: 'About', href: '/about', isRoute: true, showInMainNav: true },
  { ar: 'كلياتنا', en: 'Colleges', href: '/colleges', isRoute: true, showInMainNav: true },
  { ar: 'الأخبار', en: 'News', href: '/news', isRoute: true, showInMainNav: true },
  { ar: 'القبول', en: 'Admission', href: '/admission', isRoute: true, showInMainNav: true },
  { ar: 'فريق العمل', en: 'Team', href: '/team', isRoute: true, showInMainNav: false },
  { ar: 'الكادر التعليمي', en: 'Faculty', href: '/faculty', isRoute: true, showInMainNav: false },
  { ar: 'المراكز', en: 'Centers', href: '/centers', isRoute: true, showInMainNav: false },
  { ar: 'الشركاء', en: 'Partners', href: '/partners', isRoute: true, showInMainNav: false },
  { ar: 'العروض', en: 'Offers', href: '/offers', isRoute: true, showInMainNav: false },
  { ar: 'الحياة الجامعية', en: 'Campus Life', href: '/campus-life', isRoute: true, showInMainNav: false },
  { ar: 'المشاريع', en: 'Projects', href: '/projects-studio', isRoute: true, showInMainNav: false },
  { ar: 'الفعاليات', en: 'Events', href: '/events', isRoute: true, showInMainNav: false },
  { ar: 'الأسئلة', en: 'FAQ', href: '/faq', isRoute: true, showInMainNav: false },
  { ar: 'انضم لنا', en: 'Join Us', href: '/join-us', isRoute: true, showInMainNav: false },
  { ar: 'المدونة', en: 'Blog', href: '/blog', isRoute: true, showInMainNav: false },
  { ar: 'تواصل معنا', en: 'Contact', href: '/contact', isRoute: true, showInMainNav: true },
];

export const mainNavRoutes = publicRoutes.filter(route => route.showInMainNav);
export const additionalRoutes = publicRoutes.filter(route => !route.showInMainNav && route.href !== '/');

export const adminRoutes = [
  { ar: 'لوحة التحكم', en: 'Dashboard', href: '/admin/dashboard' },
  { ar: 'المستخدمين', en: 'Users', href: '/admin/users' },
  { ar: 'الأدوار', en: 'Roles', href: '/admin/roles' },
  { ar: 'الأخبار', en: 'News', href: '/admin/news' },
  { ar: 'المدونة', en: 'Blog', href: '/admin/blog' },
  { ar: 'الفعاليات', en: 'Events', href: '/admin/events' },
  { ar: 'المشاريع', en: 'Projects', href: '/admin/projects' },
  { ar: 'الكليات', en: 'Colleges', href: '/admin/colleges' },
  { ar: 'المراكز', en: 'Centers', href: '/admin/centers' },
  { ar: 'الكادر التعليمي', en: 'Faculty', href: '/admin/faculty' },
  { ar: 'فريق العمل', en: 'Team', href: '/admin/team' },
  { ar: 'الشركاء', en: 'Partners', href: '/admin/partners' },
  { ar: 'العروض', en: 'Offers', href: '/admin/offers' },
  { ar: 'الصفحات', en: 'Pages', href: '/admin/pages' },
  { ar: 'مكتبة الوسائط', en: 'Media', href: '/admin/media' },
  { ar: 'الأسئلة الشائعة', en: 'FAQ', href: '/admin/faq' },
  { ar: 'الإعدادات', en: 'Settings', href: '/admin/settings' },
];
