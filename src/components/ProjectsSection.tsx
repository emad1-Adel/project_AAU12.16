import { useEffect, useState, useRef } from 'react';
import { ArrowLeft, ArrowRight, FolderOpen, Users, Calendar, CheckCircle, Clock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { projectsService } from '@/services/data/projects.service.mock';
import { ProjectItem } from '@/types';
import { motion, useInView } from 'framer-motion';

export const ProjectsSection = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const fetchData = async () => {
      const data = await projectsService.getAll();
      setProjects(data.slice(0, 3));
    };
    fetchData();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  const getStatusConfig = (status: string) => {
    return status === 'completed' 
      ? { 
          icon: <CheckCircle className="w-4 h-4" />,
          label: { ar: 'مكتمل', en: 'Completed' },
          className: 'bg-green-500 text-white'
        }
      : { 
          icon: <Clock className="w-4 h-4" />,
          label: { ar: 'قيد التنفيذ', en: 'In Progress' },
          className: 'bg-secondary text-secondary-foreground'
        };
  };

  return (
    <section id="projects" className="py-20 bg-card relative overflow-hidden" ref={sectionRef}>
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
            className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-medium mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <FolderOpen className="w-4 h-4" />
            {t('إبداعات طلابنا', 'Our Students Creations')}
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 bg-gradient-to-r from-secondary via-primary to-secondary bg-clip-text text-transparent">
            {t('استديو المشاريع', 'Projects Studio')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t(
              'اكتشف المشاريع الإبداعية والابتكارية لطلابنا الموهوبين',
              'Discover the creative and innovative projects of our talented students'
            )}
          </p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {projects.map((project, index) => {
            const statusConfig = getStatusConfig(project.status);
            
            return (
              <motion.div
                key={project.id || index}
                className="group relative"
                variants={cardVariants}
              >
                <motion.div 
                  className="relative bg-background rounded-2xl overflow-hidden shadow-lg border border-border/50 h-full"
                  whileHover={{ 
                    y: -10,
                    boxShadow: "0 25px 50px -12px rgba(0,0,0,0.15)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <motion.img
                      src={project.images?.[0] || `https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&h=600&fit=crop`}
                      alt={language === 'ar' ? project.titleAr : project.titleEn}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    
                    {/* Status Badge */}
                    <motion.div 
                      className={`absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${statusConfig.className}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                    >
                      {statusConfig.icon}
                      {t(statusConfig.label.ar, statusConfig.label.en)}
                    </motion.div>

                    {/* Year Badge */}
                    {project.year && (
                      <motion.div 
                        className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm bg-white/20 backdrop-blur-md text-white border border-white/30"
                        initial={{ opacity: 0, x: 20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                        transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        {project.year}
                      </motion.div>
                    )}

                    {/* Progress Bar */}
                    {project.progress !== undefined && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                        <motion.div 
                          className="h-full bg-secondary"
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${project.progress}%` } : { width: 0 }}
                          transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-secondary transition-colors line-clamp-1">
                      {language === 'ar' ? project.titleAr : project.titleEn}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-2 text-sm">
                      {language === 'ar' ? project.descAr : project.descEn}
                    </p>

                    {/* Students */}
                    {project.students && project.students.length > 0 && (
                      <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
                        <Users className="w-4 h-4 text-secondary" />
                        <span className="line-clamp-1">
                          {project.students.slice(0, 2).join('، ')}
                          {project.students.length > 2 && ` +${project.students.length - 2}`}
                        </span>
                      </div>
                    )}
                    
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button 
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/projects-studio/${project.slug}`)}
                        className="group/btn w-full border-secondary/50 hover:bg-secondary hover:text-secondary-foreground"
                      >
                        {t('عرض المشروع', 'View Project')}
                        {language === 'ar' ? (
                          <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover/btn:-translate-x-1" />
                        ) : (
                          <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                        )}
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* View All Button */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate('/projects-studio')}
              className="group border-secondary/50 hover:bg-secondary hover:text-secondary-foreground"
            >
              {t('عرض جميع المشاريع', 'View All Projects')}
              {language === 'ar' ? (
                <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
              ) : (
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              )}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
