import { Target, Eye, Heart, Sparkles } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import studentsStudying from '@/assets/students-studying.jpg';

export const AboutSection = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const values = [
    {
      icon: Eye,
      title: { ar: 'الرؤية', en: 'Vision' },
      content: {
        ar: 'أن نكون جامعة رائدة في التعليم والبحث العلمي على المستوى الإقليمي والعالمي',
        en: 'To be a leading university in education and scientific research at the regional and global level'
      },
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Target,
      title: { ar: 'الرسالة', en: 'Mission' },
      content: {
        ar: 'تقديم تعليم عالي الجودة وإعداد كوادر مؤهلة تساهم في بناء المجتمع وتطويره',
        en: 'Providing high-quality education and preparing qualified personnel who contribute to building and developing society'
      },
      gradient: 'from-amber-500 to-orange-500'
    },
    {
      icon: Heart,
      title: { ar: 'القيم', en: 'Values' },
      content: {
        ar: 'التميز الأكاديمي، النزاهة، الابتكار، المسؤولية المجتمعية، والتعاون',
        en: 'Academic excellence, integrity, innovation, social responsibility, and collaboration'
      },
      gradient: 'from-rose-500 to-pink-500'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 0.4 + i * 0.15,
        ease: "easeOut" as const
      }
    })
  };

  return (
    <section id="about" className="py-20 bg-card relative overflow-hidden" ref={sectionRef}>
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="w-4 h-4" />
            {t('تعرف علينا', 'About Us')}
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
            {t('عن الجامعة', 'About the University')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t(
              'جامعة الجيل الجديد مؤسسة تعليمية رائدة تهدف إلى إعداد خريجين متخصصين ومؤهلين علميًا وتقنيًا للمساهمة في تنمية المجتمع',
              'New Generation University is a leading educational institution that aims to prepare specialized and scientifically qualified graduates to contribute to community development'
            )}
          </p>
        </motion.div>

        {/* Main Content */}
        <motion.div 
          className="grid lg:grid-cols-2 gap-12 items-center mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Image */}
          <motion.div 
            className="relative group"
            variants={itemVariants}
          >
            <motion.div 
              className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-xl opacity-50"
              animate={{ 
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.02, 1]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <motion.img
                src={studentsStudying}
                alt="Students Studying"
                className="w-full h-[400px] object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <motion.div 
                className="absolute bottom-6 left-6 right-6"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <h3 className="text-2xl font-bold text-white mb-2">
                  {t('بيئة تعليمية متميزة', 'Distinguished Learning Environment')}
                </h3>
                <p className="text-white/80 text-sm line-clamp-2">
                  {t(
                    'نوفر بيئة تعليمية حديثة ومتطورة تشمل مختبرات مجهزة بأحدث التقنيات',
                    'We provide a modern educational environment with state-of-the-art laboratories'
                  )}
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div 
            className="space-y-6"
            variants={itemVariants}
          >
            <motion.div 
              className="bg-background/50 backdrop-blur-sm rounded-2xl p-6 border border-border/50"
              whileHover={{ 
                boxShadow: "0 20px 40px -15px rgba(0,0,0,0.1)",
                y: -5
              }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-display font-bold mb-4 text-foreground">
                {t('تعليم نوعي يجمع بين النظرية والتطبيق', 'Quality Education Combining Theory and Practice')}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {t(
                  'توفر جامعة الجيل الجديد بيئة تعليمية حديثة ومتطورة تشمل مختبرات مجهزة بأحدث التقنيات، مكتبة شاملة تحتوي على آلاف المراجع العلمية، وقاعات دراسية مريحة مصممة لتعزيز التفاعل والإبداع.',
                  'New Generation University provides a modern and advanced educational environment including laboratories equipped with the latest technologies, a comprehensive library containing thousands of scientific references, and comfortable classrooms designed to enhance interaction and creativity.'
                )}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {t(
                  'نؤمن بأهمية التعليم النوعي الذي يجمع بين الجانب النظري والتطبيقي، مع التركيز على تطوير المهارات العملية والقيادية لدى طلابنا.',
                  'We believe in the importance of quality education that combines theoretical and practical aspects, with a focus on developing practical and leadership skills in our students.'
                )}
              </p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                size="lg"
                onClick={() => navigate('/about')}
                className="group"
              >
                {t('اكتشف المزيد عنا', 'Discover More About Us')}
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Vision, Mission, Values */}
        <div className="grid md:grid-cols-3 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={index}
              className="group relative bg-background rounded-2xl p-8 shadow-lg border border-border/50 overflow-hidden"
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              whileHover={{ 
                y: -10,
                boxShadow: "0 25px 50px -12px rgba(0,0,0,0.15)"
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Gradient Top Bar */}
              <motion.div 
                className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${value.gradient}`}
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ delay: 0.6 + index * 0.15, duration: 0.5 }}
              />
              
              {/* Icon */}
              <motion.div 
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${value.gradient} flex items-center justify-center mb-6 shadow-lg`}
                whileHover={{ 
                  scale: 1.1,
                  rotate: 5
                }}
                transition={{ duration: 0.3 }}
              >
                <value.icon className="w-8 h-8 text-white" />
              </motion.div>
              
              <h3 className="text-2xl font-display font-bold mb-4">
                {t(value.title.ar, value.title.en)}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {t(value.content.ar, value.content.en)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
