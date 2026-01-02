import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Calendar, Building2, Handshake, Sparkles, FolderOpen, HelpCircle, Tag } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { CollegesSection } from '@/components/CollegesSection';
import { NewsSection } from '@/components/NewsSection';
import { ContactSection } from '@/components/ContactSection';
import { EventsSection } from '@/components/EventsSection';
import { CampusLifeSection } from '@/components/CampusLifeSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { OffersSection } from '@/components/OffersSection';
import { ScrollToTop } from '@/components/ScrollToTop';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
// teamService and facultyService removed — team and faculty not shown on homepage
import { eventsService } from '@/services/data/events.service.mock';
import { campusLifeService } from '@/services/data/campuslife.service.mock';
import { projectsService } from '@/services/data/projects.service.mock';
import { faqService } from '@/services/data/faq.service.mock';
// partnersService and offersService removed — not used on homepage
import type { EventItem, CampusLifeItem, ProjectItem, FAQItem, OfferItem } from '@/types';

const Index = () => {
  const { t, language } = useLanguage();
  const ChevronIcon = language === 'ar' ? ArrowLeft : ArrowRight;

  const [events, setEvents] = useState<EventItem[]>([]);
  const [campusLife, setCampusLife] = useState<CampusLifeItem[]>([]);
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [offers, setOffers] = useState<OfferItem[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [eventsData, campusData, projectsData, faqData] = await Promise.all([
          eventsService.getAllEvents(),
          campusLifeService.getAllItems(),
          projectsService.getAll(),
          faqService.getAll(),
        ]);
        setEvents(eventsData.slice(0, 4));
        setCampusLife(campusData.slice(0, 6));
        setProjects(projectsData.slice(0, 6));
        setFaqs(faqData.slice(0, 6));
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

        

        

        <NewsSection />

        <EventsSection />

        <CampusLifeSection />

        <ProjectsSection />

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
