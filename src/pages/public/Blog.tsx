import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { LoadingState } from '@/components/common/LoadingState';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { getBlogPosts, getBlogCategories, BlogPost } from '@/services/data/blog.service.mock';
import { Calendar, Clock, Search, User, ArrowRight, ArrowLeft, BookOpen } from 'lucide-react';
import { format } from 'date-fns';
import { ar, enUS } from 'date-fns/locale';

const Blog = () => {
  const { language } = useLanguage();
  const isRTL = language === 'ar';
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<{ ar: string; en: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const breadcrumbItems = [
    { label: { ar: 'الرئيسية', en: 'Home' }, href: '/' },
    { label: { ar: 'المدونة', en: 'Blog' } }
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [postsData, categoriesData] = await Promise.all([
        getBlogPosts(),
        getBlogCategories()
      ]);
      setPosts(postsData);
      setCategories(categoriesData);
      setLoading(false);
    };
    fetchData();
  }, []);

  const filteredPosts = posts.filter(post => {
    const matchesSearch = searchQuery === '' || 
      post.title[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt[language].toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === null || 
      post.category[language] === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  if (loading) {
    return <LoadingState />;
  }

  return (
    <div className={`min-h-screen bg-background ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto px-4">
          <Breadcrumb items={breadcrumbItems} />
          
          <div className="text-center mt-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <BookOpen className="w-10 h-10 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                {language === 'ar' ? 'المدونة' : 'Blog'}
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {language === 'ar' 
                ? 'مقالات ونصائح تعليمية لمساعدتك في رحلتك الأكاديمية'
                : 'Educational articles and tips to help you in your academic journey'}
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-96">
              <Search className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground`} />
              <Input
                placeholder={language === 'ar' ? 'ابحث في المقالات...' : 'Search articles...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={isRTL ? 'pr-10' : 'pl-10'}
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === null ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(null)}
              >
                {language === 'ar' ? 'الكل' : 'All'}
              </Button>
              {categories.map((category, index) => (
                <Button
                  key={index}
                  variant={selectedCategory === category[language] ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category[language])}
                >
                  {category[language]}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {language === 'ar' ? 'لا توجد مقالات' : 'No articles found'}
              </h3>
              <p className="text-muted-foreground">
                {language === 'ar' ? 'جرب تغيير معايير البحث' : 'Try changing your search criteria'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <Link key={post.id} to={`/blog/${post.id}`}>
                  <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 group">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title[language]}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <Badge className="absolute top-4 left-4" variant="secondary">
                        {post.category[language]}
                      </Badge>
                    </div>

                    <CardContent className="p-6">
                      {/* Meta */}
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {format(new Date(post.publishedAt), 'dd MMM yyyy', {
                            locale: language === 'ar' ? ar : enUS
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {post.readTime} {language === 'ar' ? 'دقائق' : 'min'}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="text-xl font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                        {post.title[language]}
                      </h2>

                      {/* Excerpt */}
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                        {post.excerpt[language]}
                      </p>

                      {/* Author */}
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex items-center gap-2">
                          <img
                            src={post.author.avatar}
                            alt={post.author.name[language]}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <span className="text-sm font-medium text-foreground">
                            {post.author.name[language]}
                          </span>
                        </div>
                        <ArrowIcon className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            {language === 'ar' ? 'اشترك في نشرتنا البريدية' : 'Subscribe to Our Newsletter'}
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            {language === 'ar' 
              ? 'احصل على أحدث المقالات والنصائح التعليمية مباشرة في بريدك الإلكتروني'
              : 'Get the latest articles and educational tips directly in your email'}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input 
              type="email" 
              placeholder={language === 'ar' ? 'بريدك الإلكتروني' : 'Your email'} 
              className="flex-1"
            />
            <Button>
              {language === 'ar' ? 'اشترك' : 'Subscribe'}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
