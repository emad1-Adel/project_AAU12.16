import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Edit, Trash2 } from 'lucide-react';

const faqs = [
  {
    id: 1,
    questionAr: 'ما هي شروط القبول في الجامعة؟',
    questionEn: 'What are the admission requirements?',
    answerAr: 'يجب على الطالب الحصول على شهادة الثانوية العامة بمعدل لا يقل عن 60%',
    answerEn: 'Students must have a high school diploma with a minimum GPA of 60%',
    order: 1,
  },
  {
    id: 2,
    questionAr: 'هل تتوفر منح دراسية؟',
    questionEn: 'Are scholarships available?',
    answerAr: 'نعم، تقدم الجامعة منح دراسية جزئية وكاملة للطلاب المتفوقين',
    answerEn: 'Yes, the university offers partial and full scholarships',
    order: 2,
  },
  {
    id: 3,
    questionAr: 'ما هي مدة الدراسة؟',
    questionEn: 'What is the duration of study?',
    answerAr: 'تختلف مدة الدراسة حسب التخصص، وتتراوح بين 4 إلى 6 سنوات',
    answerEn: 'Study duration varies by major, ranging from 4 to 6 years',
    order: 3,
  },
];

export default function FAQManagement() {
  const { t } = useLanguage();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            {t('إدارة الأسئلة الشائعة', 'FAQ Management')}
          </h1>
          <p className="text-muted-foreground">
            {t('عرض وإدارة الأسئلة الشائعة', 'View and manage frequently asked questions')}
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          {t('إضافة سؤال', 'Add Question')}
        </Button>
      </div>

      <div className="space-y-4">
        {faqs.map((faq) => (
          <Card key={faq.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg">
                  {t(faq.questionAr, faq.questionEn)}
                </CardTitle>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {t(faq.answerAr, faq.answerEn)}
              </p>
              <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                <span>
                  {t('الترتيب:', 'Order:')} {faq.order}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
