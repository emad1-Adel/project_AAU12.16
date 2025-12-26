import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { PublicLayout } from "@/layouts/PublicLayout";
import { AdminLayout } from "@/layouts/AdminLayout";
import Index from "./pages/Index";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import StudentDashboard from "./pages/StudentDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import NotFound from "./pages/NotFound";
import About from "./pages/public/About";
import Colleges from "./pages/public/Colleges";
import News from "./pages/public/News";
import Admission from "./pages/public/Admission";
import Contact from "./pages/public/Contact";
import Centers from "./pages/public/Centers";
import CenterDetails from "./pages/public/CenterDetails";
import Partners from "./pages/public/Partners";
import Offers from "./pages/public/Offers";
import CampusLife from "./pages/public/CampusLife";
import FAQ from "./pages/public/FAQ";
import ProjectsStudio from "./pages/public/ProjectsStudio";
import NewsDetails from "./pages/public/NewsDetails";
import ProjectDetail from "./pages/public/ProjectDetail";
import Search from "./pages/public/Search";
import Team from "./pages/public/Team";
import Faculty from "./pages/public/Faculty";
import FacultyMemberDetails from "./pages/public/FacultyMemberDetails";
import CollegeDetails from "./pages/public/CollegeDetails";
import Events from "./pages/public/Events";
import EventDetails from "./pages/public/EventDetails";
import JoinUs from "./pages/public/JoinUs";
import Blog from "./pages/public/Blog";
import BlogDetails from "./pages/public/BlogDetails";
import ProgramDetails from "./pages/public/ProgramDetails";
import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import RolesManagement from "./pages/admin/RolesManagement";
import AdminNews from "./pages/admin/News";
import BlogManagement from "./pages/admin/BlogManagement";
import EventsManagement from "./pages/admin/EventsManagement";
import Projects from "./pages/admin/Projects";
import CollegesManagement from "./pages/admin/CollegesManagement";
import CentersManagement from "./pages/admin/CentersManagement";
import FacultyManagement from "./pages/admin/FacultyManagement";
import TeamManagement from "./pages/admin/TeamManagement";
import PartnersManagement from "./pages/admin/PartnersManagement";
import OffersManagement from "./pages/admin/OffersManagement";
import PagesManagement from "./pages/admin/PagesManagement";
import MediaLibrary from "./pages/admin/MediaLibrary";
import FAQManagement from "./pages/admin/FAQManagement";
import Settings from "./pages/admin/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes with Layout */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/colleges" element={<Colleges />} />
              <Route path="/colleges/:id" element={<CollegeDetails />} />
              <Route path="/colleges/:collegeId/programs/:programId" element={<ProgramDetails />} />
              <Route path="/team" element={<Team />} />
              <Route path="/faculty" element={<Faculty />} />
              <Route path="/faculty/:id" element={<FacultyMemberDetails />} />
              <Route path="/news" element={<News />} />
              <Route path="/events" element={<Events />} />
              <Route path="/events/:slug" element={<EventDetails />} />
              <Route path="/news/:slug" element={<NewsDetails />} />
              <Route path="/admission" element={<Admission />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/centers" element={<Centers />} />
              <Route path="/centers/:id" element={<CenterDetails />} />
              <Route path="/partners" element={<Partners />} />
              <Route path="/offers" element={<Offers />} />
              <Route path="/campus-life" element={<CampusLife />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/projects-studio" element={<ProjectsStudio />} />
              <Route path="/projects-studio/:slug" element={<ProjectDetail />} />
              <Route path="/search" element={<Search />} />
              <Route path="/join-us" element={<JoinUs />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogDetails />} />
            </Route>

            {/* Auth Routes without Layout */}
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/student-dashboard" element={<StudentDashboard />} />
            <Route path="/doctor-dashboard" element={<DoctorDashboard />} />

            {/* Admin Routes with Admin Layout */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="users" element={<Users />} />
              <Route path="roles" element={<RolesManagement />} />
              <Route path="news" element={<AdminNews />} />
              <Route path="blog" element={<BlogManagement />} />
              <Route path="events" element={<EventsManagement />} />
              <Route path="projects" element={<Projects />} />
              <Route path="colleges" element={<CollegesManagement />} />
              <Route path="centers" element={<CentersManagement />} />
              <Route path="faculty" element={<FacultyManagement />} />
              <Route path="team" element={<TeamManagement />} />
              <Route path="partners" element={<PartnersManagement />} />
              <Route path="offers" element={<OffersManagement />} />
              <Route path="pages" element={<PagesManagement />} />
              <Route path="media" element={<MediaLibrary />} />
              <Route path="faq" element={<FAQManagement />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
