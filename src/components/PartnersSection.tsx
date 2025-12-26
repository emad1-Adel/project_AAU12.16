import { useEffect, useState, useRef } from 'react';
import { ArrowLeft, ArrowRight, Handshake, ExternalLink, Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { partnersService } from '@/services/data/partners.service.mock';
import { PartnerItem } from '@/types';
import { motion, useInView } from 'framer-motion';

export const PartnersSection = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [partners, setPartners] = useState<PartnerItem[]>([]);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const fetchPartners = async () => {
      const data = await partnersService.getAll();
      setPartners(data.slice(0, 8));
    };
    fetchPartners();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const
      }
    }
  };

  return (
    <section id="partners" className="py-20 bg-card relative overflow-hidden" ref={sectionRef}>
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-medium mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Handshake className="w-4 h-4" />
            {t('شراكات استراتيجية', 'Strategic Partnerships')}
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 bg-gradient-to-r from-secondary via-primary to-secondary bg-clip-text text-transparent">
            {t('شركاؤنا', 'Our Partners')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t(
              'نفتخر بشراكاتنا المحلية والدولية مع أبرز المؤسسات والجامعات',
              'We are proud of our local and international partnerships with leading institutions and universities'
            )}
          </p>
        </motion.div>

        {/* Partners Grid */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {partners.map((partner, index) => (
            <motion.div
              key={partner.id || index}
              className="group relative"
              variants={cardVariants}
            >
              <motion.div 
                className="relative bg-background rounded-2xl p-6 shadow-lg border border-border/50 h-full flex flex-col items-center justify-center text-center overflow-hidden"
                whileHover={{ 
                  y: -8,
                  boxShadow: "0 25px 50px -12px rgba(0,0,0,0.15)"
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Partner Type Badge */}
                <Badge 
                  className={`absolute top-3 right-3 text-xs ${
                    partner.type === 'international' 
                      ? 'bg-primary/10 text-primary' 
                      : 'bg-secondary/10 text-secondary'
                  }`}
                >
                  {partner.type === 'international' 
                    ? t('دولي', 'International') 
                    : t('محلي', 'Local')
                  }
                </Badge>

                {/* Logo */}
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center mb-4 overflow-hidden group-hover:scale-110 transition-transform duration-300">
                  {partner.logo ? (
                    <img 
                      src={partner.logo} 
                      alt={language === 'ar' ? partner.nameAr : partner.nameEn}
                      className="w-full h-full object-contain p-2"
                    />
                  ) : (
                    <Handshake className="w-10 h-10 text-secondary" />
                  )}
                </div>

                {/* Name */}
                <h4 className="font-bold text-base mb-2 group-hover:text-secondary transition-colors line-clamp-2">
                  {language === 'ar' ? partner.nameAr : partner.nameEn}
                </h4>

                {/* Website Link */}
                {partner.website && (
                  <motion.a
                    href={partner.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors mt-2"
                    whileHover={{ scale: 1.05 }}
                  >
                    <Globe className="w-3 h-3" />
                    {t('زيارة الموقع', 'Visit Website')}
                    <ExternalLink className="w-3 h-3" />
                  </motion.a>
                )}

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </motion.div>
            </motion.div>
          ))}
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
              variant="outline" 
              size="lg"
              onClick={() => navigate('/partners')}
              className="group border-secondary/50 hover:bg-secondary hover:text-secondary-foreground"
            >
              {t('عرض جميع الشركاء', 'View All Partners')}
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
