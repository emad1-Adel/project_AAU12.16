import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Microscope, GraduationCap, BriefcaseBusiness } from 'lucide-react';
import { centersService } from '@/services/data/centers.service.mock';
import { CenterItem } from '@/types';
import { LoadingState } from '@/components/common/LoadingState';
import { ErrorState } from '@/components/common/ErrorState';

const iconMap: Record<string, any> = {
  research: Microscope,
  training: GraduationCap,
  consulting: BriefcaseBusiness,
};

export default function Centers() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [centers, setCenters] = useState<CenterItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadCenters = async () => {
      setIsLoading(true);
      setError(false);
      try {
        const data = await centersService.getAll();
        setCenters(data);
      } catch (err) {
        console.error('Error loading centers:', err);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadCenters();
  }, []);

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
            {t('مراكز الجامعة', 'University Centers')}
          </h1>
          <div className="w-24 h-1 bg-secondary mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {centers.map((center, index) => {
            const Icon = iconMap[center.id] || Microscope;
            return (
              <Card
                key={center.id}
                className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className="w-16 h-16 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-8 h-8 text-secondary" aria-hidden="true" />
                  </div>
                  <CardTitle>{t(center.titleAr, center.titleEn)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {t(center.descAr, center.descEn)}
                  </CardDescription>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => navigate(`/centers/${center.id}`)} className="w-full">
                    {t('التفاصيل', 'Details')}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
