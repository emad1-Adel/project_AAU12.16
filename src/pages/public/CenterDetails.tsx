import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { centersService } from '@/services/data/centers.service.mock';
import { CenterItem } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Building2, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle, 
  Phone, 
  Mail, 
  MapPin, 
  Share2,
  Briefcase,
  GraduationCap,
  Clock
} from 'lucide-react';
import { LoadingState } from '@/components/common/LoadingState';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { motion } from 'framer-motion';

export default function CenterDetails() {
  const { id } = useParams<{ id: string }>();
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [center, setCenter] = useState<CenterItem | null>(null);
  const [relatedCenters, setRelatedCenters] = useState<CenterItem[]>([]);
  const [loading, setLoading] = useState(true);
  const isRTL = language === 'ar';

  useEffect(() => {
    const fetchCenter = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const allCenters = await centersService.getAll();
        const currentCenter = allCenters.find(c => c.id === id);
        setCenter(currentCenter || null);
        
        // Get related centers
        const related = allCenters.filter(c => c.id !== id).slice(0, 3);
        setRelatedCenters(related);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCenter();
  }, [id]);

  const BackArrow = isRTL ? ArrowRight : ArrowLeft;

  if (loading) {
    return <LoadingState message={t('جاري التحميل...', 'Loading...')} />;
  }

  if (!center) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">{t('المركز غير موجود', 'Center not found')}</h1>
          <Button onClick={() => navigate('/centers')}>
            {t('العودة للمراكز', 'Back to Centers')}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 py-8 relative z-10">
          <Breadcrumb
            items={[
              { label: { ar: 'المراكز', en: 'Centers' }, href: '/centers' },
              { label: { ar: center.titleAr, en: center.titleEn } }
            ]}
          />
          
          <Button
            variant="ghost"
            onClick={() => navigate('/centers')}
            className="mb-6 hover:bg-primary/10"
          >
            <BackArrow className="w-4 h-4 mx-2" />
            {t('العودة للمراكز', 'Back to Centers')}
          </Button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl"
          >
            {/* Icon Badge */}
            <motion.div 
              className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <Building2 className="w-4 h-4" />
              {t('مركز متخصص', 'Specialized Center')}
            </motion.div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6 leading-tight">
              {t(center.titleAr, center.titleEn)}
            </h1>

            {/* Description */}
            <p className="text-lg text-muted-foreground mb-6 max-w-3xl">
              {t(center.descAr, center.descEn)}
            </p>

            {/* Quick Info */}
            <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
              {center.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>{center.location}</span>
                </div>
              )}
              {center.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-primary" />
                  <span dir="ltr">{center.phone}</span>
                </div>
              )}
              {center.email && (
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-primary" />
                  <span>{center.email}</span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Center Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Featured Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-lg">
              <img
                src={center.image || 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800'}
                alt={t(center.titleAr, center.titleEn)}
                className="w-full h-[300px] md:h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              
              {/* Icon Overlay */}
              <div className="absolute bottom-4 left-4 w-16 h-16 rounded-full bg-primary/90 backdrop-blur-md flex items-center justify-center">
                <Building2 className="w-8 h-8 text-primary-foreground" />
              </div>
            </div>

            {/* Services Card */}
            <Card className="border-primary/20">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <div className="w-1 h-6 bg-primary rounded-full"></div>
                  <Briefcase className="w-6 h-6 text-primary" />
                  {t('الخدمات', 'Services')}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {center.services.map((service, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-start gap-3 p-4 bg-muted/50 rounded-xl hover:bg-muted/80 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-foreground/90 font-medium">
                        {t(service.ar, service.en)}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Programs Card */}
            <Card className="border-secondary/20">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <div className="w-1 h-6 bg-secondary rounded-full"></div>
                  <GraduationCap className="w-6 h-6 text-secondary" />
                  {t('البرامج', 'Programs')}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {center.programs.map((program, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-start gap-3 p-4 bg-muted/50 rounded-xl hover:bg-muted/80 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-4 h-4 text-secondary" />
                      </div>
                      <span className="text-foreground/90 font-medium">
                        {t(program.ar, program.en)}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Contact CTA */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              className="bg-gradient-to-r from-primary/20 via-primary/10 to-secondary/20 p-8 rounded-2xl text-center"
            >
              <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-3">
                {t('تواصل معنا', 'Contact Us')}
              </h3>
              <p className="text-muted-foreground mb-6">
                {t('للاستفسار عن خدمات وبرامج المركز', 'For inquiries about center services and programs')}
              </p>
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link to="/contact" className="gap-2">
                  {t('تواصل الآن', 'Contact Now')}
                  <Mail className="w-4 h-4" />
                </Link>
              </Button>
            </motion.div>

            {/* Share Section */}
            <div className="pt-8 border-t border-border">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <Share2 className="w-5 h-5 text-primary" />
                  <span className="font-medium">{t('مشاركة المركز', 'Share this center')}</span>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" size="sm" className="rounded-full">
                    Facebook
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full">
                    Twitter
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full">
                    LinkedIn
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-1"
          >
            {/* Quick Contact Card */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 mb-6 sticky top-24">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <div className="w-1 h-6 bg-primary rounded-full"></div>
                  {t('معلومات التواصل', 'Contact Information')}
                </h3>
                
                <div className="space-y-4 mb-6">
                  {center.location && (
                    <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-xl">
                      <MapPin className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">{t('الموقع', 'Location')}</p>
                        <p className="font-medium">{center.location}</p>
                      </div>
                    </div>
                  )}
                  
                  {center.phone && (
                    <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-xl">
                      <Phone className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">{t('الهاتف', 'Phone')}</p>
                        <p className="font-medium" dir="ltr">{center.phone}</p>
                      </div>
                    </div>
                  )}
                  
                  {center.email && (
                    <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-xl">
                      <Mail className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">{t('البريد الإلكتروني', 'Email')}</p>
                        <p className="font-medium">{center.email}</p>
                      </div>
                    </div>
                  )}
                </div>

                <Button className="w-full" asChild>
                  <Link to="/contact">
                    {t('تواصل معنا', 'Contact Us')}
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Related Centers */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 sticky top-96">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <div className="w-1 h-6 bg-secondary rounded-full"></div>
                  {t('مراكز أخرى', 'Other Centers')}
                </h3>
                <div className="space-y-4">
                  {relatedCenters.map((item, index) => (
                    <Link
                      key={item.id}
                      to={`/centers/${item.id}`}
                      className="group block"
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex gap-4 p-3 rounded-xl hover:bg-muted/50 transition-all duration-300"
                      >
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
                          <Building2 className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                            {t(item.titleAr, item.titleEn)}
                          </h4>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                            {t(item.descAr, item.descEn)}
                          </p>
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </div>

                {/* View All Button */}
                <Button
                  variant="outline"
                  className="w-full mt-6 rounded-full"
                  onClick={() => navigate('/centers')}
                >
                  {t('عرض جميع المراكز', 'View All Centers')}
                </Button>
              </CardContent>
            </Card>
          </motion.aside>
        </div>
      </div>
    </div>
  );
}
