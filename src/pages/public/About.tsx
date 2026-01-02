import { useLanguage } from '@/contexts/LanguageContext';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Target, Eye, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import campusImage from '@/assets/hero-campus.jpg';

const About = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const BackArrow = language === 'ar' ? ArrowRight : ArrowLeft;

  const values = [
    {
      icon: Eye,
      title: { ar: 'رؤيتنا', en: 'Our Vision' },
      description: {
        ar: 'أن نكون من الجامعات الرائدة في المنطقة، نقدم تعليماً متميزاً يواكب التطورات العالمية ويساهم في بناء مجتمع معرفي متقدم',
        en: 'To be among the leading universities in the region, providing distinguished education that keeps pace with global developments and contributes to building an advanced knowledge society'
      }
    },
    {
      icon: Target,
      title: { ar: 'رسالتنا', en: 'Our Mission' },
      description: {
        ar: 'تقديم تعليم عالي الجودة، وتعزيز البحث العلمي، وخدمة المجتمع من خلال برامج أكاديمية متميزة وبيئة تعليمية محفزة',
        en: 'Providing high-quality education, promoting scientific research, and serving the community through distinguished academic programs and a stimulating educational environment'
      }
    },
    {
      icon: Heart,
      title: { ar: 'قيمنا', en: 'Our Values' },
      description: {
        ar: 'التميز الأكاديمي، النزاهة، الابتكار، المسؤولية المجتمعية، والالتزام بالمعايير الأخلاقية في جميع جوانب العمل الجامعي',
        en: 'Academic excellence, integrity, innovation, social responsibility, and commitment to ethical standards in all aspects of university work'
      }
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb items={[{ label: { ar: 'عن الجامعة', en: 'About' } }]} />
        
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <BackArrow className="w-4 h-4 mx-2" />
          {t('رجوع', 'Back')}
        </Button>

        <div className="mb-16 text-center animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            {t('عن جامعة الجيل الجديد', 'About Al JEEL AL JADEED UNIVERSITU')}
          </h1>
          <div className="w-24 h-1 bg-secondary mx-auto"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16 animate-fade-in-up">
          <div className="space-y-6">
            <p className="text-lg leading-relaxed text-muted-foreground">
              {t(
                'جامعة الجيل الجديد هي مؤسسة تعليمية رائدة تأسست برؤية طموحة لتقديم تعليم عالي الجودة يواكب متطلبات العصر الحديث. نحن نؤمن بأن التعليم هو المفتاح الأساسي لبناء مستقبل أفضل للأجيال القادمة.',
                'Al JEEL AL JADEED UNIVERSITU is a leading educational institution founded with an ambitious vision to provide high-quality education that meets the requirements of the modern era. We believe that education is the key to building a better future for generations to come.'
              )}
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              {t(
                'منذ تأسيسها، التزمت الجامعة بتوفير بيئة تعليمية متميزة تجمع بين الأصالة والمعاصرة، وتشجع على الإبداع والابتكار والتفكير النقدي. نسعى دائماً لتطوير برامجنا الأكاديمية لتلبية احتياجات سوق العمل المتغيرة.',
                'Since its establishment, the university has been committed to providing a distinguished educational environment that combines authenticity and modernity, and encourages creativity, innovation, and critical thinking. We constantly strive to develop our academic programs to meet the changing needs of the labor market.'
              )}
            </p>
          </div>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl animate-scale-in">
            <img 
              src={campusImage} 
              alt={t('الحرم الجامعي', 'Campus')}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {values.map((value, index) => (
            <Card
              key={index}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="pt-6">
                <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center mb-4 group-hover:bg-secondary group-hover:scale-110 transition-all duration-300 mx-auto">
                  <value.icon className="w-8 h-8 text-secondary group-hover:text-primary" />
                </div>
                <h3 className="text-xl font-display font-bold text-center mb-3">
                  {t(value.title.ar, value.title.en)}
                </h3>
                <p className="text-muted-foreground text-center leading-relaxed">
                  {t(value.description.ar, value.description.en)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-muted/30 rounded-2xl p-8 md:p-12 animate-fade-in-up">
          <h2 className="text-3xl font-display font-bold mb-6 text-center">
            {t('بيئة تعليمية متميزة', 'Distinguished Educational Environment')}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed text-center max-w-4xl mx-auto">
            {t(
              'توفر الجامعة بيئة تعليمية حديثة مجهزة بأحدث التقنيات والمرافق التعليمية. نحن نؤمن بأهمية التطوير المستمر لكوادرنا الأكاديمية والإدارية لضمان تقديم أفضل خدمة تعليمية لطلابنا. كما نحرص على توفير فرص التدريب العملي والتعاون مع القطاعين العام والخاص لإكساب طلابنا المهارات اللازمة لسوق العمل.',
              'The university provides a modern educational environment equipped with the latest technologies and educational facilities. We believe in the importance of continuous development of our academic and administrative staff to ensure providing the best educational service to our students. We also ensure providing practical training opportunities and cooperation with the public and private sectors to equip our students with the necessary skills for the labor market.'
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
