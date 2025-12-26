import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Newspaper, FolderKanban, GraduationCap } from 'lucide-react';

export default function Dashboard() {
  const { t } = useLanguage();

  const stats = [
    {
      icon: Users,
      titleAr: 'إجمالي المستخدمين',
      titleEn: 'Total Users',
      value: 1234,
      color: 'text-blue-500',
    },
    {
      icon: Newspaper,
      titleAr: 'الأخبار المنشورة',
      titleEn: 'Published News',
      value: 87,
      color: 'text-green-500',
    },
    {
      icon: FolderKanban,
      titleAr: 'المشاريع النشطة',
      titleEn: 'Active Projects',
      value: 42,
      color: 'text-purple-500',
    },
    {
      icon: GraduationCap,
      titleAr: 'الطلاب المسجلين',
      titleEn: 'Registered Students',
      value: 956,
      color: 'text-orange-500',
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {t('لوحة التحكم', 'Dashboard')}
        </h1>
        <p className="text-muted-foreground">
          {t('نظرة عامة على إحصائيات النظام', 'Overview of system statistics')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {t(stat.titleAr, stat.titleEn)}
                </CardTitle>
                <Icon className={`w-5 h-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{t('النشاط الأخير', 'Recent Activity')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-4 pb-4 border-b last:border-0">
                  <div className="w-2 h-2 rounded-full bg-secondary"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      {t('نشاط جديد', 'New activity')} #{i}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t('منذ ساعة واحدة', '1 hour ago')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('إحصائيات سريعة', 'Quick Stats')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { labelAr: 'معدل التسجيل اليومي', labelEn: 'Daily Registration Rate', value: '15' },
                { labelAr: 'الأخبار المعلقة', labelEn: 'Pending News', value: '8' },
                { labelAr: 'المشاريع قيد المراجعة', labelEn: 'Projects Under Review', value: '12' },
                { labelAr: 'الأسئلة الجديدة', labelEn: 'New Questions', value: '5' },
              ].map((stat, i) => (
                <div key={i} className="flex items-center justify-between pb-4 border-b last:border-0">
                  <span className="text-sm text-muted-foreground">
                    {t(stat.labelAr, stat.labelEn)}
                  </span>
                  <span className="text-lg font-semibold">{stat.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
