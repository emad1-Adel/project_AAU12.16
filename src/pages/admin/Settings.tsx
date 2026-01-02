import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Settings() {
  const { t } = useLanguage();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {t('الإعدادات', 'Settings')}
        </h1>
        <p className="text-muted-foreground">
          {t('إدارة إعدادات النظام العامة', 'Manage general system settings')}
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="flex-wrap h-auto">
          <TabsTrigger value="general">{t('عام', 'General')}</TabsTrigger>
          <TabsTrigger value="appearance">{t('المظهر', 'Appearance')}</TabsTrigger>
          <TabsTrigger value="university">{t('بيانات الجامعة', 'University Info')}</TabsTrigger>
          <TabsTrigger value="social">{t('التواصل الاجتماعي', 'Social Media')}</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>{t('الإعدادات العامة', 'General Settings')}</CardTitle>
              <CardDescription>
                {t('تكوين الإعدادات الأساسية للنظام', 'Configure basic system settings')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="site-name">
                  {t('اسم الموقع', 'Site Name')}
                </Label>
                <Input
                  id="site-name"
                  defaultValue={t('جامعة الجيل الجديد', 'Al JEEL AL JADEED UNIVERSITU')}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="site-email">
                  {t('البريد الإلكتروني', 'Email')}
                </Label>
                <Input
                  id="site-email"
                  type="email"
                  defaultValue="info@ngu.edu"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="site-phone">
                  {t('رقم الهاتف', 'Phone Number')}
                </Label>
                <Input
                  id="site-phone"
                  defaultValue="+249 123 456 789"
                />
              </div>
              <Button>{t('حفظ التغييرات', 'Save Changes')}</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>{t('إعدادات المظهر', 'Appearance Settings')}</CardTitle>
              <CardDescription>
                {t('تخصيص الألوان والشعار', 'Customize colors and logo')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>{t('اللون الأساسي', 'Primary Color')}</Label>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-md bg-primary border"></div>
                  <Input type="color" className="w-24" defaultValue="#000000" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>{t('اللون الثانوي', 'Secondary Color')}</Label>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-md bg-secondary border"></div>
                  <Input type="color" className="w-24" defaultValue="#EAB308" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="logo-upload">
                  {t('شعار الجامعة', 'University Logo')}
                </Label>
                <Input id="logo-upload" type="file" accept="image/*" />
              </div>
              <Button>{t('حفظ التغييرات', 'Save Changes')}</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="university">
          <Card>
            <CardHeader>
              <CardTitle>{t('بيانات الجامعة', 'University Information')}</CardTitle>
              <CardDescription>
                {t('تحديث معلومات الجامعة', 'Update university information')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="uni-name-ar">
                  {t('اسم الجامعة (عربي)', 'University Name (Arabic)')}
                </Label>
                <Input id="uni-name-ar" defaultValue="جامعة الجيل الجديد" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="uni-name-en">
                  {t('اسم الجامعة (إنجليزي)', 'University Name (English)')}
                </Label>
                <Input id="uni-name-en" defaultValue="Al JEEL AL JADEED UNIVERSITU" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="uni-address">
                  {t('العنوان', 'Address')}
                </Label>
                <Input id="uni-address" defaultValue="الخرطوم، السودان" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="uni-about">
                  {t('عن الجامعة', 'About University')}
                </Label>
                <Input
                  id="uni-about"
                  defaultValue={t(
                    'نحو مستقبل أكاديمي متميز',
                    'Towards a Distinguished Academic Future'
                  )}
                />
              </div>
              <Button>{t('حفظ التغييرات', 'Save Changes')}</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social">
          <Card>
            <CardHeader>
              <CardTitle>{t('روابط التواصل الاجتماعي', 'Social Media Links')}</CardTitle>
              <CardDescription>
                {t('إدارة روابط وسائل التواصل الاجتماعي', 'Manage social media links')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="facebook">Facebook</Label>
                <Input
                  id="facebook"
                  placeholder="https://facebook.com/ngu"
                  defaultValue="https://facebook.com/ngu"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="twitter">Twitter / X</Label>
                <Input
                  id="twitter"
                  placeholder="https://twitter.com/ngu"
                  defaultValue="https://twitter.com/ngu"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="instagram">Instagram</Label>
                <Input
                  id="instagram"
                  placeholder="https://instagram.com/ngu"
                  defaultValue="https://instagram.com/ngu"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="youtube">YouTube</Label>
                <Input
                  id="youtube"
                  placeholder="https://youtube.com/ngu"
                  defaultValue="https://youtube.com/ngu"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input
                  id="linkedin"
                  placeholder="https://linkedin.com/company/ngu"
                  defaultValue="https://linkedin.com/company/ngu"
                />
              </div>
              <Button>{t('حفظ التغييرات', 'Save Changes')}</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
