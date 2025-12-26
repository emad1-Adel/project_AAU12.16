import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { facultyService } from '@/services/data/faculty.service.mock';
import { FacultyMember } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, GraduationCap, Search, User, Building, BookOpen, Filter, X, ArrowLeft, ArrowRight } from 'lucide-react';
import { LoadingState } from '@/components/common/LoadingState';
import { ErrorState } from '@/components/common/ErrorState';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { motion } from 'framer-motion';

export default function Faculty() {
  const { t, language } = useLanguage();
  const isRtl = language === 'ar';
  const [members, setMembers] = useState<FacultyMember[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<FacultyMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCollege, setSelectedCollege] = useState<string>('all');
  const [selectedDegree, setSelectedDegree] = useState<string>('all');
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoading(true);
        const data = await facultyService.getAllMembers();
        setMembers(data);
        setFilteredMembers(data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  useEffect(() => {
    let filtered = members;

    if (selectedCollege !== 'all') {
      filtered = filtered.filter(
        member => (language === 'ar' ? member.collegeAr : member.collegeEn) === selectedCollege
      );
    }

    if (selectedDegree !== 'all') {
      filtered = filtered.filter(
        member => (language === 'ar' ? member.degreeAr : member.degreeEn) === selectedDegree
      );
    }

    if (selectedSpecialization !== 'all') {
      filtered = filtered.filter(
        member => (language === 'ar' ? member.specializationAr : member.specializationEn) === selectedSpecialization
      );
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        member =>
          member.nameAr.toLowerCase().includes(query) ||
          member.nameEn.toLowerCase().includes(query) ||
          member.specializationAr.toLowerCase().includes(query) ||
          member.specializationEn.toLowerCase().includes(query) ||
          member.collegeAr.toLowerCase().includes(query) ||
          member.collegeEn.toLowerCase().includes(query)
      );
    }

    setFilteredMembers(filtered);
  }, [searchQuery, selectedCollege, selectedDegree, selectedSpecialization, members, language]);

  const colleges = Array.from(new Set(members.map(m => language === 'ar' ? m.collegeAr : m.collegeEn)));
  const degrees = Array.from(new Set(members.map(m => language === 'ar' ? m.degreeAr : m.degreeEn)));
  const specializations = Array.from(new Set(members.map(m => language === 'ar' ? m.specializationAr : m.specializationEn)));

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCollege('all');
    setSelectedDegree('all');
    setSelectedSpecialization('all');
  };

  const hasActiveFilters = searchQuery || selectedCollege !== 'all' || selectedDegree !== 'all' || selectedSpecialization !== 'all';

  if (loading) return <LoadingState />;
  if (error) return <ErrorState />;

  return (
    <div className="min-h-screen bg-background" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 pt-8 pb-16"
      >
        <div className="container mx-auto px-4">
          <Breadcrumb
            items={[
              { label: { ar: 'الكادر التعليمي', en: 'Faculty' } }
            ]}
          />

          <div className="text-center mt-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
                <GraduationCap className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {t('الكادر التعليمي', 'Faculty')}
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                {t(
                  'تعرف على نخبة من الأساتذة والدكاترة المتميزين في مختلف التخصصات',
                  'Meet our elite professors and doctors distinguished in various specializations'
                )}
              </p>
            </motion.div>
          </div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-5xl mx-auto"
          >
            <Card className="border-0 shadow-xl bg-card/95 backdrop-blur">
              <CardContent className="p-6">
                {/* Main Search Bar */}
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className={`absolute ${isRtl ? 'right-4' : 'left-4'} top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5`} />
                    <Input
                      placeholder={t('ابحث عن أستاذ، تخصص، أو كلية...', 'Search for professor, specialization, or college...')}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className={`${isRtl ? 'pr-12' : 'pl-12'} h-12 text-lg`}
                    />
                  </div>
                  <Button
                    variant={showFilters ? "secondary" : "outline"}
                    onClick={() => setShowFilters(!showFilters)}
                    className="h-12 px-6"
                  >
                    <Filter className="w-5 h-5 mr-2" />
                    {t('تصفية متقدمة', 'Advanced Filters')}
                    {hasActiveFilters && (
                      <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 flex items-center justify-center rounded-full">
                        !
                      </Badge>
                    )}
                  </Button>
                </div>

                {/* Advanced Filters */}
                {showFilters && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6 pt-6 border-t"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* College Filter */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium flex items-center gap-2">
                          <Building className="w-4 h-4 text-primary" />
                          {t('الكلية', 'College')}
                        </label>
                        <Select value={selectedCollege} onValueChange={setSelectedCollege}>
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder={t('جميع الكليات', 'All Colleges')} />
                          </SelectTrigger>
                          <SelectContent className="bg-popover z-50">
                            <SelectItem value="all">{t('جميع الكليات', 'All Colleges')}</SelectItem>
                            {colleges.map((college) => (
                              <SelectItem key={college} value={college}>
                                {college}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Degree Filter */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium flex items-center gap-2">
                          <GraduationCap className="w-4 h-4 text-primary" />
                          {t('الدرجة العلمية', 'Academic Degree')}
                        </label>
                        <Select value={selectedDegree} onValueChange={setSelectedDegree}>
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder={t('جميع الدرجات', 'All Degrees')} />
                          </SelectTrigger>
                          <SelectContent className="bg-popover z-50">
                            <SelectItem value="all">{t('جميع الدرجات', 'All Degrees')}</SelectItem>
                            {degrees.map((degree) => (
                              <SelectItem key={degree} value={degree}>
                                {degree}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Specialization Filter */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-primary" />
                          {t('التخصص', 'Specialization')}
                        </label>
                        <Select value={selectedSpecialization} onValueChange={setSelectedSpecialization}>
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder={t('جميع التخصصات', 'All Specializations')} />
                          </SelectTrigger>
                          <SelectContent className="bg-popover z-50">
                            <SelectItem value="all">{t('جميع التخصصات', 'All Specializations')}</SelectItem>
                            {specializations.map((spec) => (
                              <SelectItem key={spec} value={spec}>
                                {spec}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Clear Filters */}
                    {hasActiveFilters && (
                      <div className="mt-4 flex justify-end">
                        <Button variant="ghost" size="sm" onClick={clearFilters}>
                          <X className="w-4 h-4 mr-2" />
                          {t('مسح جميع الفلاتر', 'Clear All Filters')}
                        </Button>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Results Count */}
                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {t(`عرض ${filteredMembers.length} من ${members.length} عضو`, `Showing ${filteredMembers.length} of ${members.length} members`)}
                  </span>
                  {hasActiveFilters && (
                    <Badge variant="secondary">
                      {t('تم تطبيق الفلاتر', 'Filters Applied')}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.section>

      {/* Results Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {filteredMembers.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                <Search className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {t('لم يتم العثور على نتائج', 'No Results Found')}
              </h3>
              <p className="text-muted-foreground mb-6">
                {t('جرب تغيير معايير البحث أو الفلاتر', 'Try changing your search criteria or filters')}
              </p>
              <Button variant="outline" onClick={clearFilters}>
                {t('مسح الفلاتر', 'Clear Filters')}
              </Button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredMembers.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link to={`/faculty/${member.id}`}>
                    <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-0 shadow-md h-full">
                      <div className="h-1 bg-gradient-to-r from-primary to-secondary" />
                      <CardContent className="p-6">
                        <div className="flex flex-col items-center text-center">
                          <Avatar className="w-24 h-24 mb-4 border-4 border-primary/20 group-hover:border-primary/40 transition-colors shadow-lg">
                            <AvatarImage src={member.image} alt={t(member.nameAr, member.nameEn)} />
                            <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-2xl">
                              <User className="w-10 h-10" />
                            </AvatarFallback>
                          </Avatar>
                          
                          <h3 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors line-clamp-1">
                            {t(member.nameAr, member.nameEn)}
                          </h3>
                          
                          <Badge className="mb-3 bg-primary/10 text-primary hover:bg-primary/20">
                            {t(member.degreeAr, member.degreeEn)}
                          </Badge>

                          <div className="space-y-2 w-full text-sm">
                            <div className="flex items-center gap-2 justify-center text-muted-foreground">
                              <BookOpen className="w-4 h-4 flex-shrink-0" />
                              <span className="line-clamp-1">
                                {t(member.specializationAr, member.specializationEn)}
                              </span>
                            </div>
                            
                            <div className="flex items-center gap-2 justify-center text-muted-foreground">
                              <Building className="w-4 h-4 flex-shrink-0" />
                              <span className="line-clamp-1">
                                {t(member.collegeAr, member.collegeEn)}
                              </span>
                            </div>
                          </div>

                          <div className="mt-4 pt-4 border-t w-full">
                            <div className="flex items-center justify-center gap-2 text-sm text-primary group-hover:underline">
                              {t('عرض الملف الشخصي', 'View Profile')}
                              {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
