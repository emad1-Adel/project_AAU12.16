import { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { eventsService } from '@/services/data/events.service.mock';
import { EventItem } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Users, ArrowRight, ArrowLeft, CalendarDays, Filter, Search } from 'lucide-react';
import { LoadingState } from '@/components/common/LoadingState';
import { ErrorState } from '@/components/common/ErrorState';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { Input } from '@/components/ui/input';
import { motion, useInView } from 'framer-motion';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';

export default function Events() {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeStatus, setActiveStatus] = useState('all');
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });

  const ArrowIcon = language === 'ar' ? ArrowLeft : ArrowRight;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const data = await eventsService.getAllEvents();
        setEvents(data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const statusFilters = [
    { value: 'all', label: { ar: 'الكل', en: 'All' } },
    { value: 'upcoming', label: { ar: 'قادم', en: 'Upcoming' } },
    { value: 'ongoing', label: { ar: 'جاري', en: 'Ongoing' } },
    { value: 'completed', label: { ar: 'منتهي', en: 'Completed' } },
  ];

  const categoryFilters = [
    { value: 'all', label: { ar: 'جميع التصنيفات', en: 'All Categories' } },
    { value: 'academic', label: { ar: 'أكاديمي', en: 'Academic' } },
    { value: 'cultural', label: { ar: 'ثقافي', en: 'Cultural' } },
    { value: 'sports', label: { ar: 'رياضي', en: 'Sports' } },
    { value: 'social', label: { ar: 'اجتماعي', en: 'Social' } },
  ];

  const getStatusConfig = (status: string) => {
    const config = {
      upcoming: { className: 'bg-secondary text-secondary-foreground', label: { ar: 'قادم', en: 'Upcoming' } },
      ongoing: { className: 'bg-green-500 text-white', label: { ar: 'جاري', en: 'Ongoing' } },
      completed: { className: 'bg-muted text-muted-foreground', label: { ar: 'منتهي', en: 'Completed' } },
    };
    return config[status as keyof typeof config] || config.upcoming;
  };

  const getCategoryLabel = (category: string) => {
    const labels = {
      academic: { ar: 'أكاديمي', en: 'Academic' },
      cultural: { ar: 'ثقافي', en: 'Cultural' },
      sports: { ar: 'رياضي', en: 'Sports' },
      social: { ar: 'اجتماعي', en: 'Social' },
      other: { ar: 'أخرى', en: 'Other' },
    };
    return labels[category as keyof typeof labels] || labels.other;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'dd MMMM yyyy', { locale: language === 'ar' ? ar : undefined });
  };

  const filteredEvents = events.filter(event => {
    const matchesStatus = activeStatus === 'all' || event.status === activeStatus;
    const matchesCategory = activeCategory === 'all' || event.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      event.titleAr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.titleEn.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesCategory && matchesSearch;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const }
    }
  };

  if (loading) return <LoadingState />;
  if (error) return <ErrorState />;

  return (
    <div className="min-h-screen bg-background" ref={sectionRef}>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-secondary/10 via-background to-primary/10 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50"></div>
        
        <div className="container mx-auto px-4 py-8 relative z-10">
          <Breadcrumb
            items={[
              { label: { ar: 'الفعاليات', en: 'Events' } }
            ]}
          />

          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-medium mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <CalendarDays className="w-4 h-4" />
              {t('اكتشف الأنشطة', 'Discover Activities')}
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 bg-gradient-to-r from-secondary via-primary to-secondary bg-clip-text text-transparent">
              {t('الفعاليات والأنشطة', 'Events & Activities')}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t(
                'تابع أحدث الفعاليات والأنشطة الجامعية وشارك في تجارب مميزة',
                'Follow the latest university events and activities and participate in unique experiences'
              )}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="sticky top-16 z-40 bg-background/95 backdrop-blur-md border-b border-border/50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full lg:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder={t('البحث في الفعاليات...', 'Search events...')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-muted/50 border-border/50"
              />
            </div>

            {/* Status Filters */}
            <div className="flex items-center gap-2 flex-wrap justify-center">
              <Filter className="w-4 h-4 text-muted-foreground" />
              {statusFilters.map((filter) => (
                <Button
                  key={filter.value}
                  variant={activeStatus === filter.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveStatus(filter.value)}
                  className={activeStatus === filter.value ? "bg-secondary hover:bg-secondary/90" : "border-secondary/30 hover:bg-secondary/10"}
                >
                  {t(filter.label.ar, filter.label.en)}
                </Button>
              ))}
            </div>

            {/* Category Filters */}
            <div className="flex items-center gap-2 flex-wrap justify-center">
              {categoryFilters.map((filter) => (
                <Badge
                  key={filter.value}
                  variant={activeCategory === filter.value ? "default" : "outline"}
                  className={`cursor-pointer transition-all ${
                    activeCategory === filter.value 
                      ? 'bg-primary text-primary-foreground' 
                      : 'hover:bg-primary/10 border-primary/30'
                  }`}
                  onClick={() => setActiveCategory(filter.value)}
                >
                  {t(filter.label.ar, filter.label.en)}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div className="container mx-auto px-4 py-12">
        {filteredEvents.length === 0 ? (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <CalendarDays className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
            <p className="text-xl text-muted-foreground">
              {t('لا توجد فعاليات مطابقة للبحث', 'No events match your search')}
            </p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => { setActiveStatus('all'); setActiveCategory('all'); setSearchQuery(''); }}
            >
              {t('إعادة تعيين الفلاتر', 'Reset Filters')}
            </Button>
          </motion.div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-8">
              <p className="text-muted-foreground">
                {t(`عرض ${filteredEvents.length} فعالية`, `Showing ${filteredEvents.length} events`)}
              </p>
            </div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {filteredEvents.map((event, index) => {
                const statusConfig = getStatusConfig(event.status);
                const categoryLabel = getCategoryLabel(event.category);
                
                return (
                  <motion.div
                    key={event.id}
                    variants={cardVariants}
                    className="group relative bg-card rounded-2xl overflow-hidden shadow-lg border border-border/50 hover:shadow-xl transition-all duration-300"
                    whileHover={{ y: -8 }}
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <motion.img
                        src={event.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800'}
                        alt={t(event.titleAr, event.titleEn)}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                      
                      {/* Status Badge */}
                      <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-medium ${statusConfig.className}`}>
                        {t(statusConfig.label.ar, statusConfig.label.en)}
                      </div>

                      {/* Category Badge */}
                      <div className="absolute top-4 right-4 px-3 py-1 rounded-full text-sm bg-white/20 backdrop-blur-md text-white border border-white/30">
                        {t(categoryLabel.ar, categoryLabel.en)}
                      </div>

                      {/* Date Overlay */}
                      <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm font-medium">{formatDate(event.date)}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-secondary transition-colors">
                        {t(event.titleAr, event.titleEn)}
                      </h3>
                      <p className="text-muted-foreground mb-4 line-clamp-2 text-sm">
                        {t(event.descriptionAr, event.descriptionEn)}
                      </p>

                      {/* Info */}
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4 text-secondary" />
                          <span className="line-clamp-1">{t(event.locationAr, event.locationEn)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Users className="w-4 h-4 text-secondary" />
                          <span className="line-clamp-1">{t(event.organizerAr, event.organizerEn)}</span>
                        </div>
                      </div>

                      <Button 
                        className="w-full bg-secondary hover:bg-secondary/90 group/btn"
                        onClick={() => navigate(`/events/${event.slug}`)}
                      >
                        {t('التفاصيل', 'Details')}
                        <ArrowIcon className="w-4 h-4 transition-transform group-hover/btn:translate-x-1 rtl:group-hover/btn:-translate-x-1" />
                      </Button>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
