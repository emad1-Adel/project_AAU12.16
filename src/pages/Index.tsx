import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Users, GraduationCap, Calendar, Building2, Handshake, Sparkles, FolderOpen, HelpCircle, Tag, Star } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { CollegesSection } from '@/components/CollegesSection';
import { NewsSection } from '@/components/NewsSection';
import { ContactSection } from '@/components/ContactSection';
import { EventsSection } from '@/components/EventsSection';
import { CentersSection } from '@/components/CentersSection';
import { PartnersSection } from '@/components/PartnersSection';
import { CampusLifeSection } from '@/components/CampusLifeSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { OffersSection } from '@/components/OffersSection';
import { ScrollToTop } from '@/components/ScrollToTop';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { teamService } from '@/services/data/team.service.mock';
import { facultyService } from '@/services/data/faculty.service.mock';
import { eventsService } from '@/services/data/events.service.mock';
import { centersService } from '@/services/data/centers.service.mock';
import { partnersService } from '@/services/data/partners.service.mock';
import { campusLifeService } from '@/services/data/campuslife.service.mock';
import { projectsService } from '@/services/data/projects.service.mock';
import { faqService } from '@/services/data/faq.service.mock';
import { offersService } from '@/services/data/offers.service.mock';
import type { TeamMember, FacultyMember, EventItem, CenterItem, PartnerItem, CampusLifeItem, ProjectItem, FAQItem, OfferItem } from '@/types';

const Index = () => {
  const { t, language } = useLanguage();
  const ChevronIcon = language === 'ar' ? ArrowLeft : ArrowRight;

  const [team, setTeam] = useState<TeamMember[]>([]);
  const [faculty, setFaculty] = useState<FacultyMember[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [centers, setCenters] = useState<CenterItem[]>([]);
  const [partners, setPartners] = useState<PartnerItem[]>([]);
  const [campusLife, setCampusLife] = useState<CampusLifeItem[]>([]);
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [offers, setOffers] = useState<OfferItem[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [teamData, facultyData, eventsData, centersData, partnersData, campusData, projectsData, faqData, offersData] = await Promise.all([
          teamService.getAllMembers(),
          facultyService.getAllMembers(),
          eventsService.getAllEvents(),
          centersService.getAll(),
          partnersService.getAll(),
          campusLifeService.getAllItems(),
          projectsService.getAll(),
          faqService.getAll(),
          offersService.getAll(),
        ]);
        
        setTeam(teamData.slice(0, 6));
        setFaculty(facultyData.slice(0, 6));
        setEvents(eventsData.slice(0, 4));
        setCenters(centersData.slice(0, 4));
        setPartners(partnersData.slice(0, 8));
        setCampusLife(campusData.slice(0, 6));
        setProjects(projectsData.slice(0, 6));
        setFaqs(faqData.slice(0, 6));
        setOffers(offersData.slice(0, 4));
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
    
    loadData();
  }, []);

  return (
    <div className="scroll-smooth">
      <main>
        <HeroSection />
        
        <AboutSection />

        <CollegesSection />

        {/* Team Section */}
        <section id="team" className="py-20 bg-card transition-all duration-500 animate-fade-in">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
                {t('فريق العمل', 'Our Team')}
              </h2>
              <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                {t('تعرف على فريق العمل الإداري المتميز', 'Meet our distinguished administrative team')}
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              {team.map((member) => (
                <Card key={member.id} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className="p-6">
                    <div className="w-20 h-20 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-4">
                      <Users className="w-10 h-10 text-secondary" />
                    </div>
                    <h3 className="text-xl font-bold text-center mb-2">
                      {language === 'ar' ? member.nameAr : member.nameEn}
                    </h3>
                    <p className="text-muted-foreground text-center text-sm">
                      {language === 'ar' ? member.positionAr : member.positionEn}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
            <div className="text-center">
              <Button asChild size="lg">
                <Link to="/team" className="gap-2">
                  {t('عرض الفريق كاملاً', 'View Full Team')}
                  <ChevronIcon className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Faculty Section */}
        <section id="faculty" className="py-20 bg-muted/30 transition-all duration-500 animate-fade-in">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4 px-4 py-1 text-sm font-medium border-secondary text-secondary">
                {t('أعضاء هيئة التدريس', 'Faculty Members')}
              </Badge>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {t('الكادر التعليمي', 'Teaching Staff')}
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                {t('نخبة من أفضل الأساتذة والمحاضرين المتميزين في مجالاتهم', 'Elite of the best professors and lecturers excelling in their fields')}
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {faculty.map((member) => (
                <Link to={`/faculty/${member.id}`} key={member.id}>
                  <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden border-0 bg-card/80 backdrop-blur-sm h-full">
                    <div className="p-6">
                      <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform duration-300">
                        {member.image ? (
                          <img 
                            src={member.image} 
                            alt={language === 'ar' ? member.nameAr : member.nameEn}
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          <GraduationCap className="w-12 h-12 text-secondary" />
                        )}
                        <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                          <Star className="w-4 h-4 text-secondary-foreground" />
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-center mb-2 group-hover:text-primary transition-colors">
                        {language === 'ar' ? member.nameAr : member.nameEn}
                      </h3>
                      <Badge variant="secondary" className="mx-auto block w-fit mb-2">
                        {language === 'ar' ? member.degreeAr : member.degreeEn}
                      </Badge>
                      <p className="text-muted-foreground text-center text-sm">
                        {language === 'ar' ? member.specializationAr : member.specializationEn}
                      </p>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
            <div className="text-center">
              <Button asChild size="lg" className="group">
                <Link to="/faculty" className="gap-2">
                  {t('عرض جميع الأعضاء', 'View All Members')}
                  <ChevronIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform rtl:rotate-180 rtl:group-hover:-translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <NewsSection />

        <EventsSection />

        <CentersSection />

        <PartnersSection />

        <CampusLifeSection />

        <ProjectsSection />

        <OffersSection />

        {/* FAQ Section */}
        <section id="faq" className="py-20 bg-card transition-all duration-500 animate-fade-in">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
                {t('الأسئلة المتكررة', 'Frequently Asked Questions')}
              </h2>
              <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                {t('إجابات للأسئلة الشائعة', 'Answers to common questions')}
              </p>
            </div>
            <div className="max-w-3xl mx-auto space-y-4 mb-8">
              {faqs.map((faq) => (
                <Card key={faq.id} className="p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex gap-4">
                    <HelpCircle className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-bold mb-2">
                        {language === 'ar' ? faq.questionAr : faq.questionEn}
                      </h3>
                      <p className="text-muted-foreground">
                        {language === 'ar' ? faq.answerAr : faq.answerEn}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            <div className="text-center">
              <Button asChild size="lg">
                <Link to="/faq" className="gap-2">
                  {t('عرض المزيد', 'View More')}
                  <ChevronIcon className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <ContactSection />
      </main>
      <ScrollToTop />
    </div>
  );
};

export default Index;
