import { useEffect, useState, useRef } from 'react';
import { Calendar, ArrowLeft, ArrowRight, CalendarDays, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { eventsService } from '@/services/data/events.service.mock';
import { EventItem } from '@/types';
import { motion, useInView } from 'framer-motion';

export const EventsSection = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [events, setEvents] = useState<EventItem[]>([]);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const fetchEvents = async () => {
      const data = await eventsService.getAllEvents();
      setEvents(data.slice(0, 4));
    };
    fetchEvents();
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
    <section id="events" className="py-20 bg-card relative overflow-hidden" ref={sectionRef}>
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
            <CalendarDays className="w-4 h-4" />
            {t('الأنشطة القادمة', 'Upcoming Activities')}
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 bg-gradient-to-r from-secondary via-primary to-secondary bg-clip-text text-transparent">
            {t('الفعاليات', 'Events')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t(
              'اكتشف الفعاليات والأنشطة المتنوعة التي تقدمها الجامعة',
              'Discover the diverse events and activities offered by the university'
            )}
          </p>
        </motion.div>

        {/* Events Grid */}
        <motion.div 
          className="grid md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{ perspective: 1000 }}
        >
          {events.map((event, index) => (
            <motion.div
              key={event.id || index}
              className="group relative bg-background rounded-2xl overflow-hidden shadow-lg border border-border/50"
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
                  src={event.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800'}
                  alt={language === 'ar' ? event.titleAr : event.titleEn}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                
                {/* Date Badge */}
                <motion.div 
                  className="absolute top-4 left-4 flex items-center gap-2 bg-secondary/90 backdrop-blur-md text-secondary-foreground px-3 py-1.5 rounded-full text-sm font-medium border border-secondary/30"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                >
                  <Calendar className="w-4 h-4" />
                  {new Date(event.date).toLocaleDateString(language === 'ar' ? 'ar-EG' : 'en-US', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </motion.div>

                {/* Location Badge */}
                {event.locationAr && (
                  <motion.div 
                    className="absolute top-4 right-4 flex items-center gap-2 bg-white/20 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-sm border border-white/30"
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                    transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
                  >
                    <MapPin className="w-4 h-4" />
                    {language === 'ar' ? event.locationAr : event.locationEn}
                  </motion.div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-secondary transition-colors">
                  {language === 'ar' ? event.titleAr : event.titleEn}
                </h3>
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {language === 'ar' ? event.descriptionAr : event.descriptionEn}
                </p>

                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/events/${event.slug}`)}
                    className="group/btn border-secondary/50 hover:bg-secondary hover:text-secondary-foreground"
                  >
                    {t('التفاصيل', 'Details')}
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
              onClick={() => navigate('/events')}
              className="group border-secondary/50 hover:bg-secondary hover:text-secondary-foreground"
            >
              {t('عرض جميع الفعاليات', 'View All Events')}
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
