import { useEffect, useState, useRef } from 'react';
import { ArrowLeft, ArrowRight, Tag, Gift, Percent, Clock, Star } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { offersService } from '@/services/data/offers.service.mock';
import { OfferItem } from '@/types';
import { motion, useInView } from 'framer-motion';

const categoryConfig: Record<string, { icon: React.ReactNode; color: string }> = {
  academic: { icon: <Star className="w-5 h-5" />, color: 'from-blue-500 to-blue-600' },
  scholarship: { icon: <Gift className="w-5 h-5" />, color: 'from-green-500 to-green-600' },
  training: { icon: <Tag className="w-5 h-5" />, color: 'from-purple-500 to-purple-600' },
  other: { icon: <Percent className="w-5 h-5" />, color: 'from-orange-500 to-orange-600' },
};

export const OffersSection = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [offers, setOffers] = useState<OfferItem[]>([]);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const fetchData = async () => {
      const data = await offersService.getAll();
      setOffers(data.slice(0, 4));
    };
    fetchData();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, x: -30, rotateY: -5 },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, { ar: string; en: string }> = {
      academic: { ar: 'أكاديمي', en: 'Academic' },
      scholarship: { ar: 'منحة', en: 'Scholarship' },
      training: { ar: 'تدريب', en: 'Training' },
      other: { ar: 'أخرى', en: 'Other' },
    };
    return labels[category] || labels.other;
  };

  return (
    <section id="offers" className="py-20 bg-background relative overflow-hidden" ref={sectionRef}>
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50"></div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-secondary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Gift className="w-4 h-4" />
            {t('عروض حصرية', 'Exclusive Offers')}
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
            {t('العروض الخاصة', 'Special Offers')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t(
              'استفد من عروضنا الحصرية والفرص المميزة المتاحة لك',
              'Benefit from our exclusive offers and special opportunities available to you'
            )}
          </p>
        </motion.div>

        {/* Offers Grid */}
        <motion.div 
          className="grid md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{ perspective: 1000 }}
        >
          {offers.map((offer, index) => {
            const config = categoryConfig[offer.category] || categoryConfig.other;
            const categoryLabel = getCategoryLabel(offer.category);
            
            return (
              <motion.div
                key={offer.id || index}
                className="group relative"
                variants={cardVariants}
              >
                <motion.div 
                  className="relative bg-card rounded-2xl overflow-hidden shadow-lg border border-border/50 h-full"
                  whileHover={{ 
                    y: -8,
                    boxShadow: "0 25px 50px -12px rgba(0,0,0,0.15)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex flex-col md:flex-row h-full">
                    {/* Left Color Bar / Image */}
                    <div className={`relative w-full md:w-1/3 h-32 md:h-auto bg-gradient-to-br ${config.color} flex items-center justify-center`}>
                      {offer.image ? (
                        <>
                          <img 
                            src={offer.image} 
                            alt={language === 'ar' ? offer.titleAr : offer.titleEn}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                          <div className={`absolute inset-0 bg-gradient-to-br ${config.color} opacity-80`}></div>
                        </>
                      ) : null}
                      <motion.div 
                        className="relative z-10 w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white"
                        whileHover={{ scale: 1.1, rotate: 10 }}
                      >
                        {config.icon}
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <Badge variant="outline" className="text-xs">
                          {t(categoryLabel.ar, categoryLabel.en)}
                        </Badge>
                        {offer.validUntil && (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            <span>
                              {t('حتى', 'Until')} {new Date(offer.validUntil).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US')}
                            </span>
                          </div>
                        )}
                      </div>

                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {language === 'ar' ? offer.titleAr : offer.titleEn}
                      </h3>
                      <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                        {language === 'ar' ? offer.descAr : offer.descEn}
                      </p>
                      
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button 
                          variant="outline"
                          size="sm"
                          onClick={() => navigate('/offers')}
                          className="group/btn"
                        >
                          {t('معرفة المزيد', 'Learn More')}
                          {language === 'ar' ? (
                            <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover/btn:-translate-x-1" />
                          ) : (
                            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                          )}
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* View All Button */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              size="lg"
              onClick={() => navigate('/offers')}
              className="group bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
            >
              {t('عرض جميع العروض', 'View All Offers')}
              {language === 'ar' ? (
                <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
              ) : (
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              )}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
