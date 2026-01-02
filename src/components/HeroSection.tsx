import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, GraduationCap, Users, Award, BookOpen, ArrowLeft, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import heroCampus from '@/assets/ngu-building.jpg';

export const HeroSection = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  const stats = [
    { icon: GraduationCap, number: '10,000+', label: { ar: 'طالب وطالبة', en: 'Students' } },
    { icon: Users, number: '500+', label: { ar: 'عضو هيئة تدريس', en: 'Faculty Members' } },
    { icon: BookOpen, number: '50+', label: { ar: 'برنامج أكاديمي', en: 'Academic Programs' } },
    { icon: Award, number: '4', label: { ar: 'كليات متخصصة', en: 'Specialized Colleges' } },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  const statsVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 0.8 + i * 0.1,
        ease: "easeOut" as const
      }
    })
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax Background */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{ y }}
      >
        <img
          src={heroCampus}
          alt="University Campus"
          className="w-full h-full object-cover scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80"></div>
      </motion.div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      {/* Content */}
      <motion.div 
        className="relative z-10 container mx-auto px-4 text-center text-white"
        style={{ opacity }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Badge */}
          <motion.div 
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white px-5 py-2.5 rounded-full text-sm font-medium border border-white/20"
            variants={itemVariants}
          >
            <GraduationCap className="w-4 h-4 text-secondary" />
            {t('مرحباً بكم في جامعة الجيل الجديد', 'Welcome to Al JEEL AL JADEED UNIVERSITU')}
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold"
            variants={itemVariants}
          >
            <span className="bg-gradient-to-r from-white via-secondary to-white bg-clip-text text-transparent">
              {t('جامعة الجيل الجديد', 'Al JEEL AL JADEED UNIVERSITU')}
            </span>
            <br />
            <span className="text-secondary">{t('', 'University')}</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto"
            variants={itemVariants}
          >
            {t(
              'مؤسسة تعليمية رائدة تهدف إلى إعداد خريجين متخصصين ومؤهلين علميًا وتقنيًا لخدمة المجتمع',
              'A leading educational institution aiming to prepare specialized and scientifically qualified graduates to serve the community'
            )}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={itemVariants}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                onClick={() => navigate('/admission')}
                className="bg-secondary text-primary hover:bg-secondary/90 text-lg px-8 py-6 shadow-xl shadow-secondary/30 group"
              >
                {t('التقديم الآن', 'Apply Now')}
                {language === 'ar' ? (
                  <ArrowLeft className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" />
                ) : (
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                )}
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate('/colleges')}
                className="bg-white/10 backdrop-blur-md border-2 border-white/30 text-white hover:bg-white/20 text-lg px-8 py-6"
              >
                {t('استكشف الكليات', 'Explore Colleges')}
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 border border-white/10"
                custom={index}
                variants={statsVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.3 }
                }}
              >
                <motion.div 
                  className="w-12 h-12 mx-auto mb-4 rounded-xl bg-secondary/20 flex items-center justify-center"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <stat.icon className="w-6 h-6 text-secondary" />
                </motion.div>
                <div className="text-3xl md:text-4xl font-bold text-secondary mb-1">{stat.number}</div>
                <div className="text-white/70 text-sm">{t(stat.label.ar, stat.label.en)}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/80 hover:text-secondary transition-colors group"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm font-medium">{t('اكتشف المزيد', 'Discover More')}</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </div>
      </motion.button>
    </section>
  );
};
