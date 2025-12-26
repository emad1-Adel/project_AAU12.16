import { useEffect, useState, useRef } from 'react';
import { ArrowLeft, ArrowRight, Users, BookOpen, Award, GraduationCap } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { collegesService } from '@/services/data/colleges.service.mock';
import { College } from '@/types';
import { motion, useInView } from 'framer-motion';

export const CollegesSection = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [colleges, setColleges] = useState<College[]>([]);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const fetchColleges = async () => {
      const data = await collegesService.getAllColleges();
      setColleges(data);
    };
    fetchColleges();
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
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  return (
    <section id="colleges" className="py-20 bg-background" ref={sectionRef}>
      <div className="container mx-auto px-4">
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
            <GraduationCap className="w-4 h-4" />
            {t('التميز الأكاديمي', 'Academic Excellence')}
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
            {t('كلياتنا', 'Our Colleges')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t(
              'نقدم مجموعة متنوعة من البرامج الأكاديمية المتميزة في مختلف التخصصات',
              'We offer a diverse range of distinguished academic programs in various specializations'
            )}
          </p>
        </motion.div>

        {/* Colleges Grid */}
        <motion.div 
          className="grid md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {colleges.map((college, index) => (
            <motion.div
              key={college.id}
              className="group relative bg-card rounded-2xl overflow-hidden shadow-lg border border-border/50"
              variants={cardVariants}
              whileHover={{ 
                y: -10,
                boxShadow: "0 25px 50px -12px rgba(0,0,0,0.15)"
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Image Section */}
              <div className="relative h-56 md:h-64 overflow-hidden">
                <motion.img
                  src={college.image || 'https://images.unsplash.com/photo-1562774053-701939374585?w=800'}
                  alt={t(college.nameAr, college.nameEn)}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                
                {/* College Icon */}
                <motion.div 
                  className="absolute top-4 right-4 w-14 h-14 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/30"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <GraduationCap className="w-7 h-7 text-white" />
                </motion.div>

                {/* College Name on Image */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    {t(college.nameAr, college.nameEn)}
                  </h3>
                  <div className="flex items-center gap-4 text-white/80 text-sm">
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      {college.programs?.length || 4} {t('برامج', 'Programs')}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      50+ {t('أستاذ', 'Faculty')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6">
                <p className="text-muted-foreground mb-6 line-clamp-2">
                  {t(college.descriptionAr, college.descriptionEn)}
                </p>

                {/* Programs Preview */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-secondary mb-3 flex items-center gap-2">
                    <Award className="w-4 h-4" />
                    {t('البرامج المتاحة', 'Available Programs')}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {(college.programs || []).slice(0, 3).map((program, idx) => (
                      <motion.span
                        key={idx}
                        className="px-3 py-1.5 bg-primary/5 text-primary text-xs font-medium rounded-full border border-primary/20"
                        whileHover={{ 
                          scale: 1.05,
                          backgroundColor: "hsl(var(--primary) / 0.15)"
                        }}
                      >
                        {t(program.nameAr, program.nameEn)}
                      </motion.span>
                    ))}
                    {(college.programs?.length || 0) > 3 && (
                      <span className="px-3 py-1.5 bg-muted text-muted-foreground text-xs font-medium rounded-full">
                        +{(college.programs?.length || 0) - 3} {t('أخرى', 'more')}
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Button */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    className="w-full group/btn"
                    onClick={() => navigate(`/colleges/${college.id}`)}
                  >
                    {t('استكشف الكلية', 'Explore College')}
                    {language === 'ar' ? (
                      <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover/btn:-translate-x-1" />
                    ) : (
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                    )}
                  </Button>
                </motion.div>
              </div>
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
              onClick={() => navigate('/colleges')}
              className="group"
            >
              {t('عرض جميع الكليات', 'View All Colleges')}
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
