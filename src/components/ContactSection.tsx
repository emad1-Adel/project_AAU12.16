import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Send, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';
import { motion, useInView } from 'framer-motion';

export const ContactSection = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(
      t(
        'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.',
        'Your message has been sent successfully! We will contact you soon.'
      )
    );
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: { ar: 'الهاتف', en: 'Phone' },
      content: '+964 XXX XXX XXXX',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: Mail,
      title: { ar: 'البريد الإلكتروني', en: 'Email' },
      content: 'info@ngu.edu',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: MapPin,
      title: { ar: 'العنوان', en: 'Address' },
      content: { ar: 'بغداد، العراق', en: 'Baghdad, Iraq' },
      gradient: 'from-rose-500 to-pink-500'
    }
  ];

  const socialMedia = [
    { icon: Facebook, link: '#', color: 'hover:bg-blue-600 hover:border-blue-600' },
    { icon: Twitter, link: '#', color: 'hover:bg-sky-500 hover:border-sky-500' },
    { icon: Instagram, link: '#', color: 'hover:bg-pink-600 hover:border-pink-600' },
    { icon: Linkedin, link: '#', color: 'hover:bg-blue-700 hover:border-blue-700' }
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
    hidden: { opacity: 0, y: 30 },
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
    <section id="contact" className="py-20 bg-card relative overflow-hidden" ref={sectionRef}>
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <MessageCircle className="w-4 h-4" />
            {t('نحن هنا لمساعدتك', 'We are here to help')}
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
            {t('تواصل معنا', 'Contact Us')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t(
              'نحن هنا للإجابة على استفساراتكم ومساعدتكم',
              'We are here to answer your questions and assist you'
            )}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div 
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* Contact Cards */}
            <div className="grid gap-4">
              {contactInfo.map((info, index) => (
                <motion.div 
                  key={index} 
                  className="group flex items-center gap-4 bg-background rounded-2xl p-5 border border-border/50"
                  variants={itemVariants}
                  whileHover={{ 
                    y: -5,
                    boxShadow: "0 20px 40px -15px rgba(0,0,0,0.1)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div 
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${info.gradient} flex items-center justify-center shadow-lg`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <info.icon className="w-6 h-6 text-white" />
                  </motion.div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">
                      {t(info.title.ar, info.title.en)}
                    </h4>
                    <p className="text-muted-foreground">
                      {typeof info.content === 'string' 
                        ? info.content 
                        : t(info.content.ar, info.content.en)
                      }
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Media */}
            <motion.div 
              className="bg-background rounded-2xl p-6 border border-border/50"
              variants={itemVariants}
            >
              <h4 className="font-semibold mb-4 text-foreground">
                {t('تابعنا على', 'Follow Us')}
              </h4>
              <div className="flex gap-3">
                {socialMedia.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.link}
                    className={`w-12 h-12 rounded-xl border-2 border-border bg-card flex items-center justify-center transition-all duration-300 hover:text-white ${social.color}`}
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.3 }}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Map */}
            <motion.div 
              className="h-64 bg-background rounded-2xl overflow-hidden border border-border/50 shadow-lg"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d105905.68573654724!2d44.36219804963375!3d33.31240499999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15577f67a0a74193%3A0x9deda9d2a3b16f2c!2sBaghdad%2C%20Iraq!5e0!3m2!1sen!2s!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="shadow-2xl border-border/50 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-primary to-secondary text-primary-foreground">
                <CardTitle className="text-2xl flex items-center gap-3">
                  <Send className="w-6 h-6" />
                  {t('أرسل رسالة', 'Send a Message')}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Label htmlFor="name" className="text-foreground">
                      {t('الاسم', 'Name')}
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={t('أدخل اسمك', 'Enter your name')}
                      required
                      className="mt-2"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Label htmlFor="contact-email" className="text-foreground">
                      {t('البريد الإلكتروني', 'Email')}
                    </Label>
                    <Input
                      id="contact-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={t('أدخل بريدك الإلكتروني', 'Enter your email')}
                      required
                      className="mt-2"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.6 }}
                  >
                    <Label htmlFor="subject" className="text-foreground">
                      {t('الموضوع', 'Subject')}
                    </Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder={t('أدخل موضوع الرسالة', 'Enter message subject')}
                      required
                      className="mt-2"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.7 }}
                  >
                    <Label htmlFor="message" className="text-foreground">
                      {t('الرسالة', 'Message')}
                    </Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={t('اكتب رسالتك هنا', 'Write your message here')}
                      required
                      rows={5}
                      className="mt-2 resize-none"
                    />
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      className="w-full group"
                      size="lg"
                    >
                      <Send className="w-4 h-4 mr-2 transition-transform group-hover:translate-x-1" />
                      {t('إرسال الرسالة', 'Send Message')}
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
