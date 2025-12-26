import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, ArrowRight, Search, Calendar, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LoadingState } from '@/components/common/LoadingState';
import { EmptyState } from '@/components/common/EmptyState';
import { newsService } from '@/services/data/news.service.mock';
import { NewsItem } from '@/types';

const News = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const BackArrow = language === 'ar' ? ArrowRight : ArrowLeft;

  const [news, setNews] = useState<NewsItem[]>([]);
  const [filteredNews, setFilteredNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      const data = await newsService.getAll();
      setNews(data);
      setFilteredNews(data);
      setLoading(false);
    };
    fetchNews();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = news.filter((item) =>
        (language === 'ar' ? item.titleAr : item.titleEn)
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        (language === 'ar' ? item.descriptionAr : item.descriptionEn)
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
      setFilteredNews(filtered);
    } else {
      setFilteredNews(news);
    }
  }, [searchQuery, news, language]);

  if (loading) {
    return <LoadingState />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb items={[{ label: { ar: 'الأخبار', en: 'News' } }]} />
        
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <BackArrow className="w-4 h-4 mx-2" />
          {t('رجوع', 'Back')}
        </Button>

        <div className="mb-12 text-center animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            {t('الأخبار', 'News')}
          </h1>
          <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            {t(
              'تابع آخر أخبار الجامعة ومستجداتها',
              'Follow the latest university news and updates'
            )}
          </p>

          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder={t('ابحث في الأخبار...', 'Search news...')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {filteredNews.length === 0 ? (
          <EmptyState 
            messageAr="لا توجد أخبار متاحة. جرب البحث بكلمات مختلفة"
            messageEn="No news available. Try searching with different keywords"
          />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredNews.map((item, index) => (
              <Card
                key={item.id}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => navigate(`/news/${item.slug}`)}
              >
                <div className="aspect-video w-full overflow-hidden bg-muted">
                  <img
                    src={item.image}
                    alt={language === 'ar' ? item.titleAr : item.titleEn}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                
                <CardHeader>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(item.date).toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  
                  <CardTitle className="text-xl mb-2 line-clamp-2 group-hover:text-secondary transition-colors">
                    {language === 'ar' ? item.titleAr : item.titleEn}
                  </CardTitle>
                  
                  <CardDescription className="line-clamp-3">
                    {language === 'ar' ? item.descriptionAr : item.descriptionEn}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Eye className="w-4 h-4" />
                      <span>{item.views}</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {item.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full" size="sm">
                    {t('قراءة المزيد', 'Read More')}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default News;
