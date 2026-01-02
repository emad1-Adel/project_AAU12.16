export async function getChatReply(message: string, role: string): Promise<string> {
  // Simple mock replies tailored by role
  const lower = message.toLowerCase();

  // role-based greeting
  let roleHint = '';
  if (role === 'student') roleHint = 'كطالب: يمكنك الاستفسار عن الدورات والجداول.';
  if (role === 'doctor') roleHint = 'كدكتور: يمكنك السؤال عن المقررات والإشراف.';
  if (role === 'editor') roleHint = 'كمحرر محتوى: يمكنك طلب موارد وصلاحيات نشر.';
  if (role === 'admin') roleHint = 'كمسؤول: يمكنك إدارة المستخدمين والإعدادات.';

  if (lower.includes('hello') || lower.includes('مرحبا') || lower.includes('hi')) {
    return `مرحباً! ${roleHint}`;
  }
  if (lower.includes('courses') || lower.includes('دورة') || lower.includes('مقرر')) {
    return 'لدينا العديد من البرامج؛ تفقد صفحة الكليات أو اتصل بالإدارة للحصول على تفاصيل.';
  }
  if (lower.includes('contact') || lower.includes('اتصال') || lower.includes('تواصل')) {
    return 'يمكنك استخدام نموذج الاتصال في أسفل الصفحة أو مراسلة البريد الإلكتروني الإداري.';
  }

  // fallback canned reply
  return `أعتذر، لا أفهم تماماً. ${roleHint} يمكنك تجربة سؤال آخر أو الانتقال للدعم.`;
}
