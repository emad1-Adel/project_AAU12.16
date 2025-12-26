import { useLanguage } from '@/contexts/LanguageContext';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { projectsService } from '@/services/data/projects.service.mock';
import { ProjectItem } from '@/types';
import { LoadingState } from '@/components/common/LoadingState';
import { ErrorState } from '@/components/common/ErrorState';
import { EmptyState } from '@/components/common/EmptyState';

export default function ProjectsStudio() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [currentProjects, setCurrentProjects] = useState<ProjectItem[]>([]);
  const [completedProjects, setCompletedProjects] = useState<ProjectItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadProjects = async () => {
      setIsLoading(true);
      setError(false);
      try {
        const current = await projectsService.getCurrent();
        const completed = await projectsService.getCompleted();
        setCurrentProjects(current);
        setCompletedProjects(completed);
      } catch (err) {
        console.error('Error loading projects:', err);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();
  }, []);

  const filterProjects = (projects: ProjectItem[]) =>
    projects.filter((p) =>
      t(p.titleAr, p.titleEn).toLowerCase().includes(searchTerm.toLowerCase()) ||
      t(p.descAr, p.descEn).toLowerCase().includes(searchTerm.toLowerCase())
    );

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
            {t('استوديو المشاريع', 'Projects Studio')}
          </h1>
          <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t(
              'مشاريع الطلاب المبتكرة في مختلف المجالات',
              'Innovative student projects in various fields'
            )}
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder={t('ابحث عن مشروع...', 'Search for a project...')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <Tabs defaultValue="current" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="current">
              {t('المشاريع الحالية', 'Current Projects')}
            </TabsTrigger>
            <TabsTrigger value="completed">
              {t('المشاريع المنتهية', 'Completed Projects')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="current" className="space-y-6">
            {filterProjects(currentProjects).length === 0 ? (
              <EmptyState messageAr="لم يتم العثور على مشاريع" messageEn="No projects found" />
            ) : (
              filterProjects(currentProjects).map((project) => (
              <Card key={project.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">
                        {t(project.titleAr, project.titleEn)}
                      </CardTitle>
                      <CardDescription className="text-base">
                        {t(project.descAr, project.descEn)}
                      </CardDescription>
                    </div>
                    <Badge variant="secondary" className="ml-4">
                      {project.progress}%
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-secondary h-2 rounded-full transition-all"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          {t('فريق العمل:', 'Team:')}
                        </p>
                        <p className="text-sm font-medium">
                          {project.students.join(' • ')}
                        </p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => navigate(`/projects-studio/${project.slug}`)}
                      >
                        {t('التفاصيل', 'Details')}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-6">
            {filterProjects(completedProjects).length === 0 ? (
              <EmptyState messageAr="لم يتم العثور على مشاريع" messageEn="No projects found" />
            ) : (
              filterProjects(completedProjects).map((project) => (
              <Card key={project.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">
                        {t(project.titleAr, project.titleEn)}
                      </CardTitle>
                      <CardDescription className="text-base">
                        {t(project.descAr, project.descEn)}
                      </CardDescription>
                    </div>
                    <Badge className="ml-4">{project.year}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {t('فريق العمل:', 'Team:')}
                      </p>
                      <p className="text-sm font-medium">
                        {project.students.join(' • ')}
                      </p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigate(`/projects-studio/${project.slug}`)}
                    >
                      {t('عرض المشروع', 'View Project')}
                    </Button>
                  </div>
                </CardContent>
              </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
