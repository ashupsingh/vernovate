import React, { Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import PageLoader from './PageLoader';
import ProtectedRoute from './ProtectedRoute';

// Lazy-loaded pages
const Home = lazy(() => import('../pages/Home'));
const About = lazy(() => import('../pages/About'));
const Services = lazy(() => import('../pages/Services'));
const ServiceDetail = lazy(() => import('../pages/ServiceDetail'));
const ProjectDetail = lazy(() => import('../pages/ProjectDetail'));
const Projects = lazy(() => import('../pages/Projects'));
const Contact = lazy(() => import('../pages/Contact'));
const Careers = lazy(() => import('../pages/Careers'));
const PolicyPage = lazy(() => import('../pages/PolicyPage'));
const TermsOfService = lazy(() => import('../pages/TermsOfService'));
const Profile = lazy(() => import('../pages/Profile'));

const PageWrapper = ({ children }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="w-full"
        >
            {children}
        </motion.div>
    );
};

const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <Suspense fallback={<PageLoader />}>
            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                    <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
                    <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
                    <Route path="/services" element={<PageWrapper><Services /></PageWrapper>} />
                    <Route path="/services/:id" element={<PageWrapper><ServiceDetail /></PageWrapper>} />
                    <Route path="/projects" element={<PageWrapper><Projects /></PageWrapper>} />
                    <Route path="/projects/:id" element={<PageWrapper><ProjectDetail /></PageWrapper>} />
                    <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
                    <Route path="/careers" element={<PageWrapper><Careers /></PageWrapper>} />
                    <Route path="/privacy" element={<PageWrapper><PolicyPage /></PageWrapper>} />
                    <Route path="/terms" element={<PageWrapper><TermsOfService /></PageWrapper>} />
                    <Route path="/profile" element={<PageWrapper><ProtectedRoute><Profile /></ProtectedRoute></PageWrapper>} />
                </Routes>
            </AnimatePresence>
        </Suspense>
    );
};

export default AnimatedRoutes;
