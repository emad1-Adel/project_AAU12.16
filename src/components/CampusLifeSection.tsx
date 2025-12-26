import { useEffect, useState, useRef } from 'react';
import { ArrowLeft, ArrowRight, Sparkles, Heart, Users, Music, Trophy } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { campusLifeService } from '@/services/data/campuslife.service.mock';
import { CampusLifeItem } from '@/types';
import { motion, useInView } from 'framer-motion';

const categoryIcons: Record<string, React.ReactNode> = {
  activities: <Heart className="w-6 h-6" />,
  clubs: <Users className="w-6 h-6" />,
  events: <Music className="w-6 h-6" />,
  sports: <Trophy className="w-6 h-6" />,
};

export const CampusLifeSection = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [campusLife, setCampusLife] = useState<CampusLifeItem[]>([]);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const fetchData = async () => {
      const data = await campusLifeService.getAllItems();
      setCampusLife(data.slice(0, 3));
    };
    fetchData();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, rotateY: -10 },
    visible: {
      opacity: 1,
      y: 0,
      rotateY: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  return (
    <section id="campus-life" className="py-20 bg-background relative overflow-hidden" ref={sectionRef}>
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
            className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="w-4 h-4" />
            {t('اكتشف المزيد', 'Discover More')}
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
            {t('الحياة الجامعية', 'Campus Life')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t(
              'تجربة جامعية متكاملة ومميزة تجمع بين التعليم والأنشطة والمرح',
              'A complete and distinctive university experience combining education, activities, and fun'
            )}
          </p>
        </motion.div>

        {/* Campus Life Grid */}
        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{ perspective: 1000 }}
        >
          {campusLife.map((item, index) => (
            <motion.div
              key={item.id || index}
              className="group relative"
              variants={cardVariants}
            >
              <motion.div 
                className="relative bg-card rounded-2xl overflow-hidden shadow-lg border border-border/50 h-full"
                whileHover={{ 
                  y: -10,
                  boxShadow: "0 25px 50px -12px rgba(0,0,0,0.15)"
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <motion.img
                    src={item.image || `https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop`}
                    alt={language === 'ar' ? item.titleAr : item.titleEn}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  
                  {/* Icon Badge */}
                  <motion.div 
                    className="absolute top-4 left-4 w-12 h-12 rounded-full bg-primary/90 backdrop-blur-md flex items-center justify-center text-primary-foreground"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                    transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
                  >
                    {categoryIcons[item.category] || <Sparkles className="w-6 h-6" />}
                  </motion.div>

                  {/* Title on Image */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white mb-1">
                      {language === 'ar' ? item.titleAr : item.titleEn}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {language === 'ar' ? item.descriptionAr : item.descriptionEn}
                  </p>
                  
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={() => navigate('/campus-life')}
                      className="group/btn w-full"
                    >
                      {t('اكتشف المزيد', 'Discover More')}
                      {language === 'ar' ? (
                        <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover/btn:-translate-x-1" />
                      ) : (
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                      )}
                    </Button>
                  </motion.div>
                </div>
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
              onClick={() => navigate('/campus-life')}
              className="group"
            >
              {t('استكشف الحياة الجامعية', 'Explore Campus Life')}
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
