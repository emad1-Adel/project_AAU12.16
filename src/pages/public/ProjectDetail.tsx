import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useState, useEffect } from 'react';
import { projectsService } from '@/services/data/projects.service.mock';
import { ProjectItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Calendar, Users } from 'lucide-react';
import { LoadingState } from '@/components/common/LoadingState';
import { ErrorState } from '@/components/common/ErrorState';

export default function ProjectDetail() {
  const { slug } = useParams();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [project, setProject] = useState<ProjectItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadProject = async () => {
      if (!slug) return;
      
      setIsLoading(true);
      setError(false);
      try {
        const data = await projectsService.getBySlug(slug);
        setProject(data);
        if (!data) setError(true);
      } catch (err) {
        console.error('Error loading project:', err);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadProject();
  }, [slug]);

  if (isLoading) {
    return <LoadingState messageAr="جاري التحميل..." messageEn="Loading..." />;
  }

  if (error || !project) {
    return (
      <div className="min-h-screen py-16 bg-background">
        <div className="container mx-auto px-4">
          <ErrorState
            messageAr="المشروع غير موجود"
            messageEn="Project not found"
            onRetry={() => navigate('/projects-studio')}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <Button variant="ghost" onClick={() => navigate('/projects-studio')} className="mb-6">
          <ArrowRight className="w-4 h-4 mr-2" />
          {t('العودة للمشاريع', 'Back to Projects')}
        </Button>

        <article>
          <header className="mb-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Badge variant={project.status === 'current' ? 'secondary' : 'default'}>
                {project.status === 'current'
                  ? t('مشروع حالي', 'Current Project')
                  : t('مشروع منتهي', 'Completed Project')}
              </Badge>
              {project.progress && (
                <Badge variant="outline">{t(`التقدم: ${project.progress}%`, `Progress: ${project.progress}%`)}</Badge>
              )}
              {project.year && <Badge variant="outline">{project.year}</Badge>}
            </div>

            <h1 className="text-4xl font-bold mb-4">{t(project.titleAr, project.titleEn)}</h1>

            <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" aria-hidden="true" />
                <span>{project.students.join(' • ')}</span>
              </div>
              {project.startDate && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" aria-hidden="true" />
                  <span>
                    {project.startDate}
                    {project.endDate && ` - ${project.endDate}`}
                  </span>
                </div>
              )}
            </div>
          </header>

          {project.images && project.images.length > 0 && (
            <div className="mb-8">
              <img
                src={project.images[0]}
                alt={t(project.titleAr, project.titleEn)}
                className="w-full h-[400px] object-cover rounded-lg"
              />
            </div>
          )}

          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">{t('نظرة عامة', 'Overview')}</h2>
              <p className="text-lg leading-relaxed">{t(project.descAr, project.descEn)}</p>
            </CardContent>
          </Card>

          {(project.detailsAr || project.detailsEn) && (
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold mb-4">{t('التفاصيل', 'Details')}</h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-base leading-relaxed whitespace-pre-line">
                    {t(project.detailsAr || '', project.detailsEn || '')}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {project.progress !== undefined && project.status === 'current' && (
            <Card className="mt-8">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold mb-4">{t('حالة التقدم', 'Progress Status')}</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">{t('نسبة الإنجاز', 'Completion Rate')}</span>
                    <span className="font-bold text-lg">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-3">
                    <div
                      className="bg-secondary h-3 rounded-full transition-all"
                      style={{ width: `${project.progress}%` }}
                      role="progressbar"
                      aria-valuenow={project.progress}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </article>
      </div>
    </div>
  );
}
