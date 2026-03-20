import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { Suspense, lazy } from 'react';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AnimatedRoutes from './components/AnimatedRoutes';
import ScrollToTop from './components/ScrollToTop';
import AdminLayout from './components/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';
import PageLoader from './components/PageLoader';

// Auth Pages (lazy)
const Login = lazy(() => import('./pages/auth/Login'));
const Signup = lazy(() => import('./pages/auth/Signup'));
const VerifyOTP = lazy(() => import('./pages/auth/VerifyOTP'));
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'));

// Admin Pages (lazy)
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const Users = lazy(() => import('./pages/admin/Users'));
const Messages = lazy(() => import('./pages/admin/Messages'));
const Settings = lazy(() => import('./pages/admin/Settings'));

// Dynamic Canonical SEO component
const CanonicalSEO = () => {
  const location = useLocation();
  const path = location.pathname === '/' ? '' : location.pathname.replace(/\/$/, '');
  const canonicalUrl = `https://www.vernovate.com${path}`;

  return (
    <Helmet>
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:url" content={canonicalUrl} />
    </Helmet>
  );
};

// Layout wrapper that conditionally shows Navbar/Footer
const AppLayout = () => {
  const location = useLocation();
  const isAuthPage = ['/login', '/signup', '/verify-otp', '/forgot-password'].includes(location.pathname);
  const isProfilePage = location.pathname === '/profile';
  const isAdminPage = location.pathname.startsWith('/admin');

  // Auth pages: no navbar/footer
  if (isAuthPage) {
    return (
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </Suspense>
    );
  }

  // Profile page: standalone layout, no navbar/footer
  if (isProfilePage) {
    return (
      <div className="min-h-screen bg-gray-50/50">
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="w-full h-full bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>
        <main className="relative z-[1]">
          <AnimatedRoutes />
        </main>
      </div>
    );
  }

  // Admin pages: admin layout
  if (isAdminPage) {
    return (
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="messages" element={<Messages />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </Suspense>
    );
  }

  // Public pages: normal layout
  return (
    <div className="min-h-screen bg-white text-vernovate-dark font-sans selection:bg-vernovate-primary selection:text-black flex flex-col">
      {/* Global continuous grid background for all public pages */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="w-full h-full bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>
      <Navbar />
      <main className="flex-grow relative z-[1] md:pr-20">
        <AnimatedRoutes />
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <HelmetProvider>
      <Router>
        <AuthProvider>
          <CanonicalSEO />
          <ScrollToTop />
          <AppLayout />
        </AuthProvider>
      </Router>
    </HelmetProvider>
  );
}

export default App;
