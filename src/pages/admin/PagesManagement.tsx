import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Save, FileText } from 'lucide-react';

const pages = [
  {
    id: 'about',
    nameAr: 'عن الجامعة',
    nameEn: 'About University',
    titleAr: 'جامعة الجيل الجديد',
    titleEn: 'Al JEEL AL JADEED UNIVERSITU',
    contentAr: 'جامعة الجيل الجديد هي مؤسسة تعليمية رائدة تهدف إلى تقديم تعليم عالي الجودة يواكب متطلبات العصر الحديث.',
    contentEn: 'Al JEEL AL JADEED UNIVERSITU is a leading educational institution that aims to provide high-quality education that meets the requirements of the modern era.',
    visionAr: 'أن نكون جامعة رائدة محلياً وإقليمياً في مجال التعليم العالي والبحث العلمي.',
    visionEn: 'To be a leading university locally and regionally in higher education and scientific research.',
    missionAr: 'تقديم تعليم متميز وإعداد كوادر مؤهلة تسهم في بناء المجتمع.',
    missionEn: 'Providing excellent education and preparing qualified cadres that contribute to building society.',
  },
  {
    id: 'campus-life',
    nameAr: 'الحياة الجامعية',
    nameEn: 'Campus Life',
    titleAr: 'الحياة الجامعية',
    titleEn: 'Campus Life',
    contentAr: 'توفر جامعة الجيل الجديد بيئة تعليمية متكاملة تشمل الأنشطة الطلابية والخدمات المتنوعة.',
    contentEn: 'Al JEEL AL JADEED UNIVERSITU provides an integrated educational environment including student activities and various services.',
    visionAr: '',
    visionEn: '',
    missionAr: '',
    missionEn: '',
  },
  {
    id: 'admission',
    nameAr: 'القبول والتسجيل',
    nameEn: 'Admission',
    titleAr: 'القبول والتسجيل',
    titleEn: 'Admission and Registration',
    contentAr: 'تعرف على شروط ومتطلبات القبول في جامعة الجيل الجديد وخطوات التسجيل.',
    contentEn: 'Learn about the admission requirements at Al JEEL AL JADEED UNIVERSITU and registration steps.',
    visionAr: '',
    visionEn: '',
    missionAr: '',
    missionEn: '',
  },
];

export default function PagesManagement() {
  const { t } = useLanguage();
  const [selectedPage, setSelectedPage] = useState(pages[0]);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            {t('إدارة الصفحات التعريفية', 'Pages Management')}
          </h1>
          <p className="text-muted-foreground">
            {t('تعديل محتوى الصفحات الثابتة في الموقع', 'Edit static page content on the website')}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Pages List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">{t('الصفحات', 'Pages')}</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1 p-2">
              {pages.map((page) => (
                <button
                  key={page.id}
                  onClick={() => setSelectedPage(page)}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
                    selectedPage.id === page.id
                      ? 'bg-secondary text-secondary-foreground'
                      : 'hover:bg-muted'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  {t(page.nameAr, page.nameEn)}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Page Editor */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>{t(selectedPage.nameAr, selectedPage.nameEn)}</CardTitle>
            <CardDescription>
              {t('تحرير محتوى الصفحة بالعربية والإنجليزية', 'Edit page content in Arabic and English')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="arabic" className="space-y-6">
              <TabsList>
                <TabsTrigger value="arabic">{t('العربية', 'Arabic')}</TabsTrigger>
                <TabsTrigger value="english">{t('الإنجليزية', 'English')}</TabsTrigger>
              </TabsList>

              <TabsContent value="arabic" className="space-y-4">
                <div className="space-y-2">
                  <Label>{t('العنوان', 'Title')}</Label>
                  <Input defaultValue={selectedPage.titleAr} dir="rtl" />
                </div>
                <div className="space-y-2">
                  <Label>{t('المحتوى', 'Content')}</Label>
                  <Textarea 
                    defaultValue={selectedPage.contentAr} 
                    dir="rtl" 
                    rows={6}
                  />
                </div>
                {selectedPage.visionAr && (
                  <div className="space-y-2">
                    <Label>{t('الرؤية', 'Vision')}</Label>
                    <Textarea defaultValue={selectedPage.visionAr} dir="rtl" rows={3} />
                  </div>
                )}
                {selectedPage.missionAr && (
                  <div className="space-y-2">
                    <Label>{t('الرسالة', 'Mission')}</Label>
                    <Textarea defaultValue={selectedPage.missionAr} dir="rtl" rows={3} />
                  </div>
                )}
              </TabsContent>

              <TabsContent value="english" className="space-y-4">
                <div className="space-y-2">
                  <Label>{t('العنوان', 'Title')}</Label>
                  <Input defaultValue={selectedPage.titleEn} dir="ltr" />
                </div>
                <div className="space-y-2">
                  <Label>{t('المحتوى', 'Content')}</Label>
                  <Textarea 
                    defaultValue={selectedPage.contentEn} 
                    dir="ltr" 
                    rows={6}
                  />
                </div>
                {selectedPage.visionEn && (
                  <div className="space-y-2">
                    <Label>{t('الرؤية', 'Vision')}</Label>
                    <Textarea defaultValue={selectedPage.visionEn} dir="ltr" rows={3} />
                  </div>
                )}
                {selectedPage.missionEn && (
                  <div className="space-y-2">
                    <Label>{t('الرسالة', 'Mission')}</Label>
                    <Textarea defaultValue={selectedPage.missionEn} dir="ltr" rows={3} />
                  </div>
                )}
              </TabsContent>
            </Tabs>

            <div className="mt-6 pt-6 border-t">
              <Button>
                <Save className="w-4 h-4 mr-2" />
                {t('حفظ التغييرات', 'Save Changes')}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
