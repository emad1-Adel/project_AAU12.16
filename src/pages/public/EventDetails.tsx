import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { eventsService } from '@/services/data/events.service.mock';
import { EventItem } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users, ExternalLink, ArrowRight, ArrowLeft, Share2, Clock, CalendarDays } from 'lucide-react';
import { LoadingState } from '@/components/common/LoadingState';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';

export default function EventDetails() {
  const { slug } = useParams<{ slug: string }>();
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [event, setEvent] = useState<EventItem | null>(null);
  const [relatedEvents, setRelatedEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const isRTL = language === 'ar';

  useEffect(() => {
    const fetchEvent = async () => {
      if (!slug) return;
      
      try {
        setLoading(true);
        const data = await eventsService.getEventBySlug(slug);
        setEvent(data || null);
        
        // Get related events
        const allEvents = await eventsService.getAllEvents();
        const related = allEvents.filter(e => e.slug !== slug).slice(0, 3);
        setRelatedEvents(related);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [slug]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'dd MMMM yyyy', { locale: language === 'ar' ? ar : undefined });
  };

  const getStatusBadge = (status: string) => {
    const config = {
      upcoming: { 
        variant: 'default' as const, 
        label: { ar: 'قادم', en: 'Upcoming' },
        className: 'bg-secondary text-secondary-foreground'
      },
      ongoing: { 
        variant: 'secondary' as const, 
        label: { ar: 'جاري', en: 'Ongoing' },
        className: 'bg-green-500 text-white'
      },
      completed: { 
        variant: 'outline' as const, 
        label: { ar: 'منتهي', en: 'Completed' },
        className: 'bg-muted text-muted-foreground'
      },
    };

    const statusConfig = config[status as keyof typeof config] || config.upcoming;

    return (
      <Badge className={statusConfig.className}>
        {t(statusConfig.label.ar, statusConfig.label.en)}
      </Badge>
    );
  };

  const BackArrow = isRTL ? ArrowRight : ArrowLeft;

  if (loading) {
    return <LoadingState message={t('جاري التحميل...', 'Loading...')} />;
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">{t('الفعالية غير موجودة', 'Event not found')}</h1>
          <Button onClick={() => navigate('/events')}>
            {t('العودة للفعاليات', 'Back to Events')}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-secondary/10 via-background to-primary/10 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb
            items={[
              { label: { ar: 'الفعاليات', en: 'Events' }, href: '/events' },
              { label: { ar: event.titleAr, en: event.titleEn } }
            ]}
          />
          
          <Button
            variant="ghost"
            onClick={() => navigate('/events')}
            className="mb-6 hover:bg-secondary/10"
          >
            <BackArrow className="w-4 h-4 mx-2" />
            {t('العودة للفعاليات', 'Back to Events')}
          </Button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl"
          >
            {/* Status Badge */}
            <div className="flex flex-wrap gap-2 mb-4">
              {getStatusBadge(event.status)}
              {event.category && (
                <Badge variant="outline" className="border-secondary/50">
                  {event.category}
                </Badge>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6 leading-tight">
              {t(event.titleAr, event.titleEn)}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-secondary" />
                <span>{formatDate(event.date)}</span>
                {event.endDate && (
                  <span className="text-muted-foreground/70">
                    - {formatDate(event.endDate)}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-secondary" />
                <span>{t(event.locationAr, event.locationEn)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-secondary" />
                <span>{t(event.organizerAr, event.organizerEn)}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Event Content */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            {/* Featured Image */}
            <div className="relative rounded-2xl overflow-hidden mb-8 shadow-lg">
              <img
                src={event.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800'}
                alt={t(event.titleAr, event.titleEn)}
                className="w-full h-[300px] md:h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              
              {/* Date Overlay */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-secondary/90 backdrop-blur-md text-secondary-foreground px-4 py-2 rounded-full font-medium">
                <CalendarDays className="w-5 h-5" />
                {formatDate(event.date)}
              </div>
            </div>

            {/* Event Details Card */}
            <Card className="mb-8 border-secondary/20">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <div className="w-1 h-6 bg-secondary rounded-full"></div>
                  {t('تفاصيل الفعالية', 'Event Details')}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-xl">
                    <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{t('التاريخ', 'Date')}</p>
                      <p className="font-semibold">{formatDate(event.date)}</p>
                      {event.endDate && (
                        <p className="text-sm text-muted-foreground">
                          {t('إلى', 'to')} {formatDate(event.endDate)}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-xl">
                    <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{t('المكان', 'Location')}</p>
                      <p className="font-semibold">{t(event.locationAr, event.locationEn)}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-xl">
                    <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center">
                      <Users className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{t('المنظم', 'Organizer')}</p>
                      <p className="font-semibold">{t(event.organizerAr, event.organizerEn)}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Content */}
            <div className="prose prose-lg max-w-none mb-8">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <div className="w-1 h-6 bg-secondary rounded-full"></div>
                {t('نبذة عن الفعالية', 'About the Event')}
              </h2>
              <p className="text-lg leading-relaxed text-foreground/90 whitespace-pre-line">
                {t(
                  event.contentAr || event.descriptionAr,
                  event.contentEn || event.descriptionEn
                )}
              </p>
            </div>

            {/* Registration Section */}
            {event.registrationRequired && event.registrationLink && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="bg-gradient-to-r from-secondary/20 via-secondary/10 to-primary/20 p-8 rounded-2xl text-center mb-8"
              >
                <h3 className="text-2xl font-bold mb-3">
                  {t('سجل الآن للمشاركة', 'Register Now to Participate')}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {t('لا تفوت فرصة المشاركة في هذه الفعالية المميزة', "Don't miss the chance to participate in this special event")}
                </p>
                <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90">
                  <Link to={event.registrationLink} className="gap-2">
                    {t('سجل الآن', 'Register Now')}
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </Button>
              </motion.div>
            )}

            {!event.registrationRequired && event.status === 'upcoming' && (
              <div className="bg-muted/50 p-6 rounded-2xl text-center mb-8 border border-border/50">
                <Clock className="w-8 h-8 text-secondary mx-auto mb-3" />
                <p className="text-muted-foreground">
                  {t(
                    'هذه الفعالية مفتوحة للجميع ولا تحتاج إلى تسجيل مسبق',
                    'This event is open to everyone and does not require prior registration'
                  )}
                </p>
              </div>
            )}

            {/* Share Section */}
            <div className="pt-8 border-t border-border">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <Share2 className="w-5 h-5 text-secondary" />
                  <span className="font-medium">{t('مشاركة الفعالية', 'Share this event')}</span>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" size="sm" className="rounded-full border-secondary/50 hover:bg-secondary/10">
                    Facebook
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full border-secondary/50 hover:bg-secondary/10">
                    Twitter
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full border-secondary/50 hover:bg-secondary/10">
                    LinkedIn
                  </Button>
                </div>
              </div>
            </div>
          </motion.article>

          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-1"
          >
            {/* Related Events */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 sticky top-24">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <div className="w-1 h-6 bg-secondary rounded-full"></div>
                  {t('فعاليات ذات صلة', 'Related Events')}
                </h3>
                <div className="space-y-4">
                  {relatedEvents.map((item, index) => (
                    <Link
                      key={item.id}
                      to={`/events/${item.slug}`}
                      className="group block"
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex gap-4 p-3 rounded-xl hover:bg-muted/50 transition-all duration-300"
                      >
                        <img
                          src={item.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=200'}
                          alt={t(item.titleAr, item.titleEn)}
                          className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm line-clamp-2 group-hover:text-secondary transition-colors">
                            {t(item.titleAr, item.titleEn)}
                          </h4>
                          <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            {formatDate(item.date)}
                          </div>
                          <div className="mt-1">
                            {getStatusBadge(item.status)}
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </div>

                {/* View All Button */}
                <Button
                  variant="outline"
                  className="w-full mt-6 rounded-full border-secondary/50 hover:bg-secondary hover:text-secondary-foreground"
                  onClick={() => navigate('/events')}
                >
                  {t('عرض جميع الفعاليات', 'View All Events')}
                </Button>
              </CardContent>
            </Card>
          </motion.aside>
        </div>
      </div>
    </div>
  );
}
