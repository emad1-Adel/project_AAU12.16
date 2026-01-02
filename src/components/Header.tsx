import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Globe, Menu, X, LogIn, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import nguLogo from '@/assets/ngu-building.jpg';
import { mainNavRoutes, additionalRoutes } from '@/config/routes';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { motion, AnimatePresence } from 'framer-motion';

export const Header = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (href: string, isRoute?: boolean) => {
    if (isRoute) {
      navigate(href);
      setIsMobileMenuOpen(false);
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setIsMobileMenuOpen(false);
      }
    }
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 + i * 0.05,
        duration: 0.3,
        ease: "easeOut" as const
      }
    })
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-background/98 backdrop-blur-xl shadow-xl border-b border-border' 
          : 'bg-gradient-to-b from-black/80 via-black/60 to-transparent backdrop-blur-md'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.button 
            onClick={() => navigate('/')}
            className="flex items-center gap-3 cursor-pointer group"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div 
              className="w-12 h-12 rounded-full overflow-hidden border-2 border-secondary"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              <img src={nguLogo} alt="NGU Logo" className="w-full h-full object-cover" />
            </motion.div>
            <div className={`transition-all duration-500 ${isScrolled ? 'text-foreground' : 'text-white text-shadow'}`}>
              <h1 className="text-xl font-display font-bold leading-tight group-hover:text-secondary transition-colors">
                {t('جامعة الجيل الجديد', 'Al JEEL AL JADEED UNIVERSITU')}
              </h1>
              <p className="text-xs text-secondary font-semibold">AAU</p>
            </div>
          </motion.button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {mainNavRoutes.map((item, index) => (
              <motion.button
                key={index}
                onClick={() => handleNavigation(item.href, item.isRoute)}
                className={`transition-all duration-300 font-medium text-sm relative group ${
                  isScrolled ? 'text-foreground hover:text-secondary' : 'text-white text-shadow-sm hover:text-secondary'
                }`}
                custom={index}
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ y: -2 }}
              >
                {t(item.ar, item.en)}
                <motion.span 
                  className="absolute bottom-0 left-0 h-0.5 bg-secondary shadow-[0_0_8px_hsl(var(--secondary))]"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            ))}
            
            {additionalRoutes.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.button 
                    className={`transition-all duration-300 font-medium text-sm relative group flex items-center gap-1 ${
                      isScrolled ? 'text-foreground hover:text-secondary' : 'text-white text-shadow-sm hover:text-secondary'
                    }`}
                    custom={mainNavRoutes.length}
                    variants={navItemVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover={{ y: -2 }}
                  >
                    {t('المزيد', 'More')}
                    <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180 duration-300" />
                  </motion.button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align={language === 'ar' ? 'start' : 'end'}>
                  {additionalRoutes.map((item, index) => (
                    <DropdownMenuItem
                      key={index}
                      onClick={() => handleNavigation(item.href, item.isRoute)}
                    >
                      {t(item.ar, item.en)}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </nav>

          {/* Login, Language Toggle & Mobile Menu */}
          <motion.div 
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="sm"
                onClick={() => navigate('/login')}
                className="bg-gradient-to-r from-secondary to-gold hover:from-gold hover:to-secondary text-primary hover:text-primary font-semibold transition-all duration-300 glow-gold hidden sm:flex"
              >
                <LogIn className="w-4 h-4 ml-2" />
                {t('تسجيل الدخول', 'Login')}
              </Button>
            </motion.div>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={toggleLanguage}
                      className={`transition-all duration-300 group ${
                        isScrolled 
                          ? 'bg-transparent text-foreground border-border hover:bg-secondary hover:text-primary hover:border-secondary' 
                          : 'bg-transparent text-white border-white/50 hover:bg-white hover:text-primary hover:border-white text-shadow-sm'
                      }`}
                    >
                      <motion.div
                        animate={{ rotate: [0, 15, -15, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 5 }}
                      >
                        <Globe className="w-4 h-4 mr-2" />
                      </motion.div>
                      {language === 'ar' ? 'EN' : 'عربي'}
                    </Button>
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t('تبديل اللغة', 'Switch Language')}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden transition-all duration-300 ${
                isScrolled ? 'text-foreground' : 'text-white text-shadow-sm'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Mobile Menu */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side={language === 'ar' ? 'right' : 'left'} className="w-80">
          <SheetHeader>
            <SheetTitle className="text-start font-display">
              {t('القائمة', 'Menu')}
            </SheetTitle>
          </SheetHeader>
          
          <div className="mt-6 space-y-6">
            {/* Login Button in Mobile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Button
                size="sm"
                onClick={() => {
                  navigate('/login');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full bg-gradient-to-r from-secondary to-gold hover:from-gold hover:to-secondary text-primary font-semibold transition-all duration-300"
              >
                <LogIn className="w-4 h-4 ml-2" />
                {t('تسجيل الدخول', 'Login')}
              </Button>
            </motion.div>
            
            <Separator />
            
            <div>
              <h3 className="font-semibold mb-3 text-sm text-muted-foreground uppercase">
                {t('الصفحات الرئيسية', 'Main Pages')}
              </h3>
              <nav className="flex flex-col gap-2">
                {mainNavRoutes.map((item, index) => (
                  <motion.button
                    key={index}
                    onClick={() => {
                      handleNavigation(item.href, item.isRoute);
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-lg font-medium text-foreground hover:text-secondary transition-all duration-200 text-start py-2.5 px-3 hover:bg-accent rounded-lg flex items-center gap-3 group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + index * 0.05 }}
                    whileHover={{ x: language === 'ar' ? -5 : 5 }}
                  >
                    <motion.span 
                      className="w-1 h-6 bg-secondary rounded-full"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    />
                    {t(item.ar, item.en)}
                  </motion.button>
                ))}
              </nav>
            </div>

            {additionalRoutes.length > 0 && (
              <>
                <Separator />
                <div>
                  <h3 className="font-semibold mb-3 text-sm text-muted-foreground uppercase">
                    {t('المزيد', 'More')}
                  </h3>
                  <nav className="flex flex-col gap-2">
                    {additionalRoutes.map((item, index) => (
                      <motion.button
                        key={index}
                        onClick={() => {
                          handleNavigation(item.href, item.isRoute);
                          setIsMobileMenuOpen(false);
                        }}
                        className="text-base font-medium text-foreground hover:text-secondary transition-all duration-200 text-start py-2 px-3 hover:bg-accent rounded-lg flex items-center gap-3 group"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.05 }}
                        whileHover={{ x: language === 'ar' ? -5 : 5 }}
                      >
                        <motion.span 
                          className="w-1 h-5 bg-secondary/50 rounded-full"
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                        />
                        {t(item.ar, item.en)}
                      </motion.button>
                    ))}
                  </nav>
                </div>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </motion.header>
  );
};
