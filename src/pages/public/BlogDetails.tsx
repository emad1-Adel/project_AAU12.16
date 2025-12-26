import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { LoadingState } from '@/components/common/LoadingState';
import { ErrorState } from '@/components/common/ErrorState';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getBlogPostById, getBlogPosts, BlogPost } from '@/services/data/blog.service.mock';
import { Calendar, Clock, User, ArrowRight, ArrowLeft, Share2, Facebook, Twitter, Linkedin, BookOpen } from 'lucide-react';
import { format } from 'date-fns';
import { ar, enUS } from 'date-fns/locale';

const BlogDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { language } = useLanguage();
  const isRTL = language === 'ar';
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  const breadcrumbItems = [
    { label: { ar: 'الرئيسية', en: 'Home' }, href: '/' },
    { label: { ar: 'المدونة', en: 'Blog' }, href: '/blog' },
    { label: { ar: post?.title.ar || '', en: post?.title.en || '' } }
  ];

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      setLoading(true);
      const [postData, allPosts] = await Promise.all([
        getBlogPostById(id),
        getBlogPosts()
      ]);
      setPost(postData);
      
      if (postData) {
        const related = allPosts
          .filter(p => p.id !== id && p.category[language] === postData.category[language])
          .slice(0, 3);
        setRelatedPosts(related);
      }
      setLoading(false);
    };
    fetchData();
  }, [id, language]);

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  if (loading) {
    return <LoadingState />;
  }

  if (!post) {
    return <ErrorState messageAr="المقال غير موجود" messageEn="Article not found" />;
  }

  return (
    <div className={`min-h-screen bg-background ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <section className="relative">
        <div className="h-[400px] relative">
          <img
            src={post.image}
            alt={post.title[language]}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 relative -mt-32 z-10">
          <div className="bg-card rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
            <Breadcrumb items={breadcrumbItems} />
            
            <Badge className="mt-4 mb-3">{post.category[language]}</Badge>
            
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {post.title[language]}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <img
                  src={post.author.avatar}
                  alt={post.author.name[language]}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-foreground">{post.author.name[language]}</p>
                  <p className="text-sm">{post.author.role[language]}</p>
                </div>
              </div>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {format(new Date(post.publishedAt), 'dd MMMM yyyy', {
                  locale: language === 'ar' ? ar : enUS
                })}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {post.readTime} {language === 'ar' ? 'دقائق للقراءة' : 'min read'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-3">
                <article className="prose prose-lg dark:prose-invert max-w-none">
                  {post.content[language].split('\n').map((paragraph, index) => {
                    if (paragraph.startsWith('## ')) {
                      return <h2 key={index} className="text-2xl font-bold mt-8 mb-4">{paragraph.replace('## ', '')}</h2>;
                    }
                    if (paragraph.trim()) {
                      return <p key={index} className="text-muted-foreground leading-relaxed mb-4">{paragraph}</p>;
                    }
                    return null;
                  })}
                </article>

                {/* Tags */}
                <div className="mt-8 pt-8 border-t">
                  <h3 className="font-semibold text-foreground mb-3">
                    {language === 'ar' ? 'الوسوم:' : 'Tags:'}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary">
                        {tag[language]}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Share */}
                <div className="mt-8 pt-8 border-t">
                  <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Share2 className="w-5 h-5" />
                    {language === 'ar' ? 'شارك المقال:' : 'Share Article:'}
                  </h3>
                  <div className="flex gap-3">
                    <Button variant="outline" size="icon">
                      <Facebook className="w-5 h-5" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Twitter className="w-5 h-5" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Linkedin className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                        <User className="w-5 h-5 text-primary" />
                        {language === 'ar' ? 'عن الكاتب' : 'About Author'}
                      </h3>
                      <div className="text-center">
                        <img
                          src={post.author.avatar}
                          alt={post.author.name[language]}
                          className="w-20 h-20 rounded-full mx-auto mb-3 object-cover"
                        />
                        <h4 className="font-semibold text-foreground">{post.author.name[language]}</h4>
                        <p className="text-sm text-muted-foreground">{post.author.role[language]}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
              {language === 'ar' ? 'مقالات ذات صلة' : 'Related Articles'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {relatedPosts.map((relatedPost) => (
                <Link key={relatedPost.id} to={`/blog/${relatedPost.id}`}>
                  <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow group">
                    <div className="h-40 overflow-hidden">
                      <img
                        src={relatedPost.image}
                        alt={relatedPost.title[language]}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                        {relatedPost.title[language]}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-2 flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {relatedPost.readTime} {language === 'ar' ? 'دقائق' : 'min'}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button asChild variant="outline">
                <Link to="/blog" className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  {language === 'ar' ? 'عرض جميع المقالات' : 'View All Articles'}
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default BlogDetails;
