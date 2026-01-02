import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Outlet } from 'react-router-dom';
import ChatWidget from '@/components/ChatWidget';

export const PublicLayout = () => {
  // determine role from localStorage (mock auth)
  const rawRole = typeof window !== 'undefined' ? localStorage.getItem('userRole') : null;
  let role: 'guest' | 'student' | 'doctor' | 'editor' | 'admin' = 'guest';
  if (rawRole === 'student') role = 'student';
  if (rawRole === 'teacher') role = 'doctor';
  if (rawRole === 'editor' || rawRole === 'content_editor') role = 'editor';

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        <Outlet />
      </main>
      <Footer />
      <ChatWidget role={role} />
    </div>
  );
};
