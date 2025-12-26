import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { searchService } from '@/services/data/search.service.mock';
import { SearchResult } from '@/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search as SearchIcon, ArrowRight } from 'lucide-react';
import { LoadingState } from '@/components/common/LoadingState';
import { EmptyState } from '@/components/common/EmptyState';

export default function Search() {
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const searchQuery = searchParams.get('q');
    if (searchQuery) {
      setQuery(searchQuery);
      performSearch(searchQuery);
    }
  }, [searchParams]);

  const performSearch = async (searchQuery: string) => {
    if (!searchQuery || searchQuery.trim().length < 2) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const searchResults = await searchService.search(searchQuery);
      setResults(searchResults);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchParams({ q: query.trim() });
    }
  };

  const getTypeBadge = (type: string) => {
    const labels = {
      news: { ar: 'خبر', en: 'News' },
      project: { ar: 'مشروع', en: 'Project' },
      center: { ar: 'مركز', en: 'Center' },
      offer: { ar: 'عرض', en: 'Offer' },
    };
    return t(labels[type as keyof typeof labels]?.ar, labels[type as keyof typeof labels]?.en);
  };

  return (
    <div className="min-h-screen py-16 bg-background">
      <div className="container mx-auto px-4">
        <Button variant="ghost" onClick={() => navigate('/')} className="mb-6">
          <ArrowRight className="w-4 h-4 mr-2" />
          {t('العودة', 'Back')}
        </Button>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">
            {t('البحث', 'Search')}
          </h1>

          <form onSubmit={handleSearch} className="mb-12">
            <div className="relative">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" aria-hidden="true" />
              <Input
                type="search"
                placeholder={t('ابحث في الموقع...', 'Search the website...')}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-12 h-14 text-lg"
                aria-label={t('البحث في الموقع', 'Search the website')}
              />
            </div>
          </form>

          {isLoading ? (
            <LoadingState messageAr="جاري البحث..." messageEn="Searching..." />
          ) : results.length === 0 && searchParams.get('q') ? (
            <EmptyState
              messageAr="لم يتم العثور على نتائج"
              messageEn="No results found"
              icon={<SearchIcon className="w-16 h-16 text-muted-foreground" />}
            />
          ) : results.length > 0 ? (
            <div className="space-y-6">
              <p className="text-muted-foreground">
                {t(
                  `تم العثور على ${results.length} نتيجة`,
                  `Found ${results.length} result${results.length !== 1 ? 's' : ''}`
                )}
              </p>

              {results.map((result) => (
                <Card
                  key={result.id}
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => navigate(result.link)}
                  role="article"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      navigate(result.link);
                    }
                  }}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">
                          {t(result.titleAr, result.titleEn)}
                        </CardTitle>
                        <CardDescription className="text-base">
                          {t(result.descriptionAr, result.descriptionEn)}
                        </CardDescription>
                      </div>
                      <Badge variant="secondary">{getTypeBadge(result.type)}</Badge>
                    </div>
                  </CardHeader>
                  {result.image && (
                    <CardContent>
                      <img
                        src={result.image}
                        alt={t(result.titleAr, result.titleEn)}
                        className="w-full h-48 object-cover rounded-md"
                      />
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
