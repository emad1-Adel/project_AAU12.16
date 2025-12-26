import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { teamService } from '@/services/data/team.service.mock';
import { TeamMember } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Phone, Users } from 'lucide-react';
import { LoadingState } from '@/components/common/LoadingState';
import { ErrorState } from '@/components/common/ErrorState';
import { Breadcrumb } from '@/components/common/Breadcrumb';

export default function Team() {
  const { t } = useLanguage();
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);
        const data = await teamService.getAllMembers();
        setMembers(data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState />;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb
          items={[
            { label: { ar: 'فريق العمل', en: 'Team' } }
          ]}
        />

        <div className="text-center mb-12">
          <Users className="w-16 h-16 mx-auto mb-4 text-primary" />
          <h1 className="text-4xl font-bold mb-4">
            {t('فريق العمل', 'Team')}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t(
              'تعرف على الفريق الإداري المتميز الذي يقود جامعتنا نحو التميز والابتكار',
              'Meet our distinguished administrative team leading our university towards excellence and innovation'
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member) => (
            <Card key={member.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Users className="w-16 h-16 text-primary" />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2">
                    {t(member.nameAr, member.nameEn)}
                  </h3>
                  
                  <p className="text-primary font-medium mb-4">
                    {t(member.positionAr, member.positionEn)}
                  </p>

                  {member.bioAr && member.bioEn && (
                    <p className="text-muted-foreground text-sm mb-4">
                      {t(member.bioAr, member.bioEn)}
                    </p>
                  )}

                  <div className="space-y-2 w-full">
                    {member.email && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground justify-center">
                        <Mail className="w-4 h-4" />
                        <a href={`mailto:${member.email}`} className="hover:text-primary transition-colors">
                          {member.email}
                        </a>
                      </div>
                    )}
                    
                    {member.phone && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground justify-center">
                        <Phone className="w-4 h-4" />
                        <a href={`tel:${member.phone}`} className="hover:text-primary transition-colors">
                          {member.phone}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
