import { useParams, useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { ArrowRight, ArrowLeft, Calendar, Eye, Tag, Share2, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { newsService } from '@/services/data/news.service.mock';
import { NewsItem } from '@/types';
import { LoadingState } from '@/components/common/LoadingState';

export default function NewsDetails() {
  const { id } = useParams();
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [news, setNews] = useState<NewsItem | null>(null);
  const [relatedNews, setRelatedNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const isRTL = language === 'ar';

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      const allNews = await newsService.getAll();
      const currentNews = allNews.find(n => n.id === id || n.slug === id);
      setNews(currentNews || null);
      
      // Get related news (excluding current)
      const related = allNews.filter(n => n.id !== id && n.slug !== id).slice(0, 3);
      setRelatedNews(related);
      setLoading(false);
    };
    fetchNews();
  }, [id]);

  if (loading) {
    return <LoadingState message={t('جاري التحميل...', 'Loading...')} />;
  }

  if (!news) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">{t('الخبر غير موجود', 'News not found')}</h1>
          <Button onClick={() => navigate('/news')}>
            {t('العودة للأخبار', 'Back to News')}
          </Button>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const estimateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(' ').length;
    return Math.ceil(words / wordsPerMinute);
  };

  const BackArrow = isRTL ? ArrowRight : ArrowLeft;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb 
            items={[
              { label: { ar: 'الأخبار', en: 'News' }, href: '/news' },
              { label: { ar: news.titleAr, en: news.titleEn } }
            ]} 
          />
          
          <Button
            variant="ghost"
            onClick={() => navigate('/news')}
            className="mb-6 hover:bg-primary/10"
          >
            <BackArrow className="w-4 h-4 mx-2" />
            {t('العودة للأخبار', 'Back to News')}
          </Button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl"
          >
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {news.tags?.map((tag, index) => (
                <Badge key={index} variant="secondary" className="bg-primary/10 text-primary">
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6 leading-tight">
              {t(news.titleAr, news.titleEn)}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                <span>{formatDate(news.date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-primary" />
                <span>{news.views} {t('مشاهدة', 'views')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                <span>{estimateReadTime(language === 'ar' ? news.contentAr : news.contentEn)} {t('دقائق قراءة', 'min read')}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Article Content */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            {/* Featured Image */}
            <div className="relative rounded-2xl overflow-hidden mb-8 shadow-lg">
              <img
                src={news.image}
                alt={t(news.titleAr, news.titleEn)}
                className="w-full h-[300px] md:h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed text-foreground/90">
                {t(news.contentAr, news.contentEn)}
              </p>
            </div>

            {/* Share Section */}
            <div className="mt-12 pt-8 border-t border-border">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <Share2 className="w-5 h-5 text-primary" />
                  <span className="font-medium">{t('مشاركة الخبر', 'Share this news')}</span>
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
          </motion.article>

          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-1"
          >
            {/* Related News */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 sticky top-24">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <div className="w-1 h-6 bg-primary rounded-full"></div>
                  {t('أخبار ذات صلة', 'Related News')}
                </h3>
                <div className="space-y-4">
                  {relatedNews.map((item, index) => (
                    <Link
                      key={item.id}
                      to={`/news/${item.slug || item.id}`}
                      className="group block"
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex gap-4 p-3 rounded-xl hover:bg-muted/50 transition-all duration-300"
                      >
                        <img
                          src={item.image}
                          alt={t(item.titleAr, item.titleEn)}
                          className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                            {t(item.titleAr, item.titleEn)}
                          </h4>
                          <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            {formatDate(item.date)}
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  ))}
                </div>

                {/* View All Button */}
                <Button
                  variant="outline"
                  className="w-full mt-6 rounded-full"
                  onClick={() => navigate('/news')}
                >
                  {t('عرض جميع الأخبار', 'View All News')}
                </Button>
              </CardContent>
            </Card>
          </motion.aside>
        </div>
      </div>
    </div>
  );
}
