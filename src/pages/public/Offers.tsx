import { useLanguage } from '@/contexts/LanguageContext';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Gift, Search } from 'lucide-react';
import { offersService } from '@/services/data/offers.service.mock';
import { OfferItem } from '@/types';
import { LoadingState } from '@/components/common/LoadingState';
import { ErrorState } from '@/components/common/ErrorState';
import { EmptyState } from '@/components/common/EmptyState';

export default function Offers() {
  const { t } = useLanguage();
  const [offers, setOffers] = useState<OfferItem[]>([]);
  const [filteredOffers, setFilteredOffers] = useState<OfferItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadOffers = async () => {
      setIsLoading(true);
      setError(false);
      try {
        const data = await offersService.getAll();
        setOffers(data);
        setFilteredOffers(data);
      } catch (err) {
        console.error('Error loading offers:', err);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadOffers();
  }, []);

  useEffect(() => {
    let filtered = offers;

    if (category !== 'all') {
      filtered = filtered.filter((offer) => offer.category === category);
    }

    if (searchTerm.trim()) {
      filtered = filtered.filter((offer) =>
        t(offer.titleAr, offer.titleEn).toLowerCase().includes(searchTerm.toLowerCase()) ||
        t(offer.descAr, offer.descEn).toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredOffers(filtered);
  }, [searchTerm, category, offers, t]);

  if (isLoading) {
    return <LoadingState messageAr="جاري التحميل..." messageEn="Loading..." />;
  }

  if (error) {
    return (
      <div className="min-h-screen py-16 bg-background">
        <div className="container mx-auto px-4">
          <ErrorState onRetry={() => window.location.reload()} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            {t('عروض الجامعة', 'University Offers')}
          </h1>
          <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t(
              'اطلع على أحدث العروض والفرص المتاحة للطلاب',
              'Check out the latest offers and opportunities for students'
            )}
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" aria-hidden="true" />
            <Input
              placeholder={t('ابحث عن عرض...', 'Search for an offer...')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
              aria-label={t('البحث عن عرض', 'Search for offer')}
            />
          </div>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full md:w-48" aria-label={t('فلترة حسب الفئة', 'Filter by category')}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('الكل', 'All')}</SelectItem>
              <SelectItem value="academic">{t('أكاديمي', 'Academic')}</SelectItem>
              <SelectItem value="scholarship">{t('منح', 'Scholarships')}</SelectItem>
              <SelectItem value="training">{t('تدريب', 'Training')}</SelectItem>
              <SelectItem value="other">{t('أخرى', 'Other')}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {filteredOffers.length === 0 ? (
          <EmptyState
            messageAr="لم يتم العثور على عروض"
            messageEn="No offers found"
            icon={<Gift className="w-16 h-16 text-muted-foreground" />}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOffers.map((offer, index) => (
              <Card
                key={offer.id}
                className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {offer.image && (
                  <img
                    src={offer.image}
                    alt={t(offer.titleAr, offer.titleEn)}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                )}
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Gift className="w-6 h-6 text-secondary" aria-hidden="true" />
                    {offer.validUntil && (
                      <span className="text-xs text-muted-foreground">
                        {t('صالح حتى', 'Valid until')}: {offer.validUntil}
                      </span>
                    )}
                  </div>
                  <CardTitle className="text-xl">
                    {t(offer.titleAr, offer.titleEn)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {t(offer.descAr, offer.descEn)}
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <Button variant="secondary" className="w-full">
                    {t('المزيد من التفاصيل', 'More Details')}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
