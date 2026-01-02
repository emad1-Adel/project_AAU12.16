import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, GraduationCap } from 'lucide-react';

export const Footer = () => {
  const { t, language } = useLanguage();
  const currentYear = new Date().getFullYear();
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, margin: "-50px" });

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  const quickLinks = [
    { ar: 'الكليات', en: 'Colleges', href: '/colleges' },
    { ar: 'القبول', en: 'Admission', href: '/admission' },
    { ar: 'الأخبار', en: 'News', href: '/news' },
    { ar: 'تواصل معنا', en: 'Contact', href: '/contact' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const
      }
    }
  };

  return (
    <footer className="bg-primary text-primary-foreground relative overflow-hidden" ref={footerRef}>
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute -top-20 -right-20 w-64 h-64 bg-secondary/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute -bottom-20 -left-20 w-72 h-72 bg-secondary/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <motion.div 
          className="grid md:grid-cols-4 gap-8 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Logo & Description */}
          <motion.div variants={itemVariants} className="md:col-span-2">
            <motion.div 
              className="flex items-center gap-3 mb-4"
              whileHover={{ scale: 1.02 }}
            >
              <motion.div 
                className="w-14 h-14 bg-secondary rounded-xl flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <GraduationCap className="w-8 h-8 text-primary" />
              </motion.div>
              <div>
                <h3 className="text-2xl font-display font-bold text-secondary">
                  {t('جامعة الجيل الجديد', 'Al JEEL AL JADEED UNIVERSITU')}
                </h3>
                <p className="text-sm text-primary-foreground/70">AAU</p>
              </div>
            </motion.div>
            <p className="text-primary-foreground/80 leading-relaxed max-w-md">
              {t(
                'مؤسسة تعليمية رائدة تهدف إلى إعداد خريجين متخصصين ومؤهلين علميًا وتقنيًا للمساهمة في تنمية المجتمع.',
                'A leading educational institution aiming to prepare specialized and scientifically qualified graduates to contribute to community development.'
              )}
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-bold text-secondary mb-4">
              {t('روابط سريعة', 'Quick Links')}
            </h4>
            <nav className="space-y-2">
              {quickLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  className="block text-primary-foreground/80 hover:text-secondary transition-colors"
                  whileHover={{ x: language === 'ar' ? -5 : 5 }}
                  transition={{ duration: 0.2 }}
                >
                  {t(link.ar, link.en)}
                </motion.a>
              ))}
            </nav>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-bold text-secondary mb-4">
              {t('تواصل معنا', 'Contact Us')}
            </h4>
            <div className="space-y-3">
              <motion.a 
                href="tel:+964XXXXXXXX" 
                className="flex items-center gap-2 text-primary-foreground/80 hover:text-secondary transition-colors"
                whileHover={{ scale: 1.02 }}
              >
                <Phone className="w-4 h-4" />
                <span>+964 XXX XXX XXXX</span>
              </motion.a>
              <motion.a 
                href="mailto:info@ngu.edu" 
                className="flex items-center gap-2 text-primary-foreground/80 hover:text-secondary transition-colors"
                whileHover={{ scale: 1.02 }}
              >
                <Mail className="w-4 h-4" />
                <span>info@ngu.edu</span>
              </motion.a>
              <motion.div 
                className="flex items-center gap-2 text-primary-foreground/80"
                whileHover={{ scale: 1.02 }}
              >
                <MapPin className="w-4 h-4" />
                <span>{t('بغداد، العراق', 'Baghdad, Iraq')}</span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <motion.div 
          className="h-px bg-gradient-to-r from-transparent via-secondary/50 to-transparent mb-8"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        />

        {/* Bottom Section */}
        <motion.div 
          className="flex flex-col md:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          {/* Social Links */}
          <div className="flex gap-3">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-secondary hover:text-primary transition-all"
                whileHover={{ scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.3 }}
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <motion.p 
            className="text-sm text-primary-foreground/70 text-center"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            © {currentYear} {t('جامعة الجيل الجديد. جميع الحقوق محفوظة.', 'Al JEEL AL JADEED UNIVERSITU. All rights reserved.')}
          </motion.p>
        </motion.div>
      </div>
    </footer>
  );
};
