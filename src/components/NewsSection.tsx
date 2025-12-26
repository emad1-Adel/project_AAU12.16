import { useEffect, useState, useRef } from 'react';
import { Calendar, ArrowLeft, ArrowRight, Newspaper } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { newsService } from '@/services/data/news.service.mock';
import { NewsItem } from '@/types';
import { motion, useInView } from 'framer-motion';

export const NewsSection = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [news, setNews] = useState<NewsItem[]>([]);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const fetchNews = async () => {
      const data = await newsService.getAll();
      setNews(data.slice(0, 4));
    };
    fetchNews();
  }, []);

  const defaultNews = [
    {
      id: '1',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800',
      date: { ar: '15 نوفمبر 2025', en: 'November 15, 2025' },
      title: { ar: 'تكريم الطلاب المتفوقين', en: 'Honoring Outstanding Students' },
      description: { ar: 'احتفالية تكريم الطلاب المتفوقين لهذا العام الأكاديمي', en: 'Celebration honoring outstanding students for this academic year' }
    },
    {
      id: '2',
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800',
      date: { ar: '10 نوفمبر 2025', en: 'November 10, 2025' },
      title: { ar: 'ورشة عمل البحث العلمي', en: 'Scientific Research Workshop' },
      description: { ar: 'ورشة عمل متخصصة في منهجيات البحث العلمي الحديثة', en: 'Specialized workshop on modern scientific research methodologies' }
    },
    {
      id: '3',
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800',
      date: { ar: '5 نوفمبر 2025', en: 'November 5, 2025' },
      title: { ar: 'افتتاح المكتبة الرقمية', en: 'Digital Library Opening' },
      description: { ar: 'افتتاح المكتبة الرقمية الجديدة بآلاف المراجع العلمية', en: 'Opening of the new digital library with thousands of scientific references' }
    },
    {
      id: '4',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800',
      date: { ar: '1 نوفمبر 2025', en: 'November 1, 2025' },
      title: { ar: 'بدء التسجيل للفصل الدراسي القادم', en: 'Registration Opens for Next Semester' },
      description: { ar: 'بدء فترة التسجيل للطلاب الجدد والقدامى', en: 'Registration period begins for new and returning students' }
    }
  ];

  const displayNews = news.length > 0 ? news : defaultNews;

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
    hidden: { opacity: 0, y: 50, rotateX: -15 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  return (
    <section id="news" className="py-20 bg-background relative overflow-hidden" ref={sectionRef}>
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
            <Newspaper className="w-4 h-4" />
            {t('آخر المستجدات', 'Latest Updates')}
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
            {t('الأخبار', 'News')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t(
              'تابع آخر أخبار الجامعة ومستجداتها',
              'Follow the latest university news and updates'
            )}
          </p>
        </motion.div>

        {/* News Grid */}
        <motion.div 
          className="grid md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{ perspective: 1000 }}
        >
          {displayNews.map((item, index) => (
            <motion.div
              key={item.id || index}
              className="group relative bg-card rounded-2xl overflow-hidden shadow-lg border border-border/50"
              variants={cardVariants}
              whileHover={{ 
                y: -10,
                boxShadow: "0 25px 50px -12px rgba(0,0,0,0.15)"
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <motion.img
                  src={(item as any).image || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800'}
                  alt={t((item as any).title?.ar || item.titleAr, (item as any).title?.en || item.titleEn)}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                
                {/* Date Badge */}
                <motion.div 
                  className="absolute top-4 left-4 flex items-center gap-2 bg-white/20 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-sm border border-white/30"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                >
                  <Calendar className="w-4 h-4" />
                  {t((item as any).date?.ar || item.dateAr || '', (item as any).date?.en || item.dateEn || '')}
                </motion.div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                  {t((item as any).title?.ar || item.titleAr, (item as any).title?.en || item.titleEn)}
                </h3>
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {t((item as any).description?.ar || item.summaryAr || '', (item as any).description?.en || item.summaryEn || '')}
                </p>
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/news/${item.id}`)}
                    className="group/btn"
                  >
                    {t('قراءة المزيد', 'Read More')}
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
              onClick={() => navigate('/news')}
              className="group"
            >
              {t('عرض جميع الأخبار', 'View All News')}
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
