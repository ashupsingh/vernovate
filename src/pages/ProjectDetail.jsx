import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, Clock, Globe, User, Quote, Award } from 'lucide-react';
import Button from '../components/ui/Button';
import { projectsData } from '../data/projectsData';

const ProjectDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(null);

    useEffect(() => {
        const foundProject = projectsData.find(project => project.id === id);
        if (foundProject) {
            setProject(foundProject);
        } else {
            navigate('/projects');
        }
    }, [id, navigate]);

    if (!project) return <div className="min-h-screen flex items-center justify-center bg-gray-50 text-black">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50 text-black">
            {/* Hero Banner with Image */}
            {/* Hero Banner with Image - Compact Mobile Widget Style */}
            <section className="bg-black text-white relative overflow-hidden min-h-[55vh] md:min-h-[60vh] flex flex-col justify-center md:justify-end pt-24 pb-12 md:pt-32 md:pb-20">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${project.image})` }}
                />
                <div className="absolute inset-0 bg-black/50" /> {/* Slightly darker overlay for mobile readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />

                <div className="container mx-auto px-4 z-10 relative">
                    {/* Breadcrumb - Hidden on mobile */}
                    <nav className="hidden md:flex text-sm text-gray-400 mb-6 items-center space-x-2">
                        <Link to="/" className="hover:text-white transition-colors">Home</Link>
                        <span>/</span>
                        <Link to="/projects" className="hover:text-white transition-colors">Projects</Link>
                        <span>/</span>
                        <span className="text-vernovate-primary">{project.title}</span>
                    </nav>

                    <button
                        onClick={() => navigate('/projects')}
                        className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors text-sm font-medium group"
                    >
                        <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Projects
                    </button>

                    <div className="max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="hidden md:inline-block bg-vernovate-primary/90 backdrop-blur-sm text-black px-4 py-1 rounded-full text-sm font-bold mb-4 uppercase tracking-wider"
                        >
                            {project.category}
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-3xl md:text-5xl lg:text-7xl font-bold text-white mb-4 md:mb-6 leading-tight"
                        >
                            {project.title}
                        </motion.h1>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="hidden md:flex flex-wrap gap-6 text-gray-300"
                        >
                            <div className="flex items-center"><User className="mr-2 text-vernovate-primary" size={20} /> {project.client}</div>
                            <div className="flex items-center"><Clock className="mr-2 text-vernovate-primary" size={20} /> {project.timeline}</div>
                            <div className="flex items-center"><Globe className="mr-2 text-vernovate-primary" size={20} /> {project.role}</div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Main Content Grid */}
            <section className="container mx-auto px-4 pt-12 md:pt-20 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Left Column: Details */}
                    <div className="lg:col-span-2 space-y-12">
                        {/* Project Overview */}
                        <div>
                            <h2 className="text-3xl font-bold mb-6 flex items-center">
                                <span className="w-2 h-8 bg-vernovate-primary mr-4 rounded-full"></span>
                                Project Overview
                            </h2>
                            <p className="text-lg text-gray-700 leading-relaxed mb-6">
                                {project.shortDescription}
                            </p>
                            <p className="text-gray-600 leading-relaxed text-justify">
                                {project.fullDescription}
                            </p>
                        </div>

                        {/* Challenge & Solution */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-lg">
                                <h3 className="text-xl font-bold mb-4 flex items-center text-red-500">
                                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mr-3">!</div>
                                    The Challenge
                                </h3>
                                <p className="text-gray-600">{project.challenge}</p>
                            </div>
                            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-lg">
                                <h3 className="text-xl font-bold mb-4 flex items-center text-green-600">
                                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3"><CheckCircle size={16} /></div>
                                    Our Solution
                                </h3>
                                <p className="text-gray-600">{project.solution}</p>
                            </div>
                        </div>

                        {/* Tech Stack */}
                        <div>
                            <h3 className="text-2xl font-bold mb-6">Technologies Used</h3>
                            <div className="flex flex-wrap gap-3">
                                {project.techStack.map((tech, index) => (
                                    <span key={index} className="px-5 py-2 bg-gray-100 text-gray-800 rounded-full font-medium border border-gray-200">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Key Info Cards & Testimonial */}
                    <div className="lg:col-span-1 space-y-8">
                        {/* Highlights Card */}
                        <div className="bg-vernovate-primary/5 p-8 rounded-2xl border border-vernovate-primary/20">
                            <h3 className="text-xl font-bold mb-6 flex items-center">
                                <Award className="mr-3 text-vernovate-primary" /> Key Highlights
                            </h3>
                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <CheckCircle className="text-vernovate-primary mr-3 mt-1 shrink-0" size={18} />
                                    <span className="text-gray-700 text-sm">Custom architecture tailored to client needs.</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="text-vernovate-primary mr-3 mt-1 shrink-0" size={18} />
                                    <span className="text-gray-700 text-sm">Seamless integration with legacy systems.</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="text-vernovate-primary mr-3 mt-1 shrink-0" size={18} />
                                    <span className="text-gray-700 text-sm">Built for scalability and high performance.</span>
                                </li>
                            </ul>
                            <div className="mt-8 pt-8 border-t border-vernovate-primary/10">
                                <Button variant="primary" className="w-full text-center justify-center" onClick={() => window.location.href = '/contact'}>
                                    Build Something Similar
                                </Button>
                            </div>
                        </div>

                        {/* Testimonial */}
                        {project.testimonial && (
                            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 relative">
                                <Quote className="absolute top-6 right-6 text-gray-100 rotate-180" size={60} />
                                <p className="text-gray-700 italic relative z-10 mb-6">"{project.testimonial.quote}"</p>
                                <div className="flex items-center">
                                    <div className="w-12 h-12 rounded-full bg-gray-200 mr-4">
                                        {/* Avatar Placeholder */}
                                        <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-300 to-gray-400"></div>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm">{project.testimonial.author}</h4>
                                        <p className="text-xs text-gray-500">{project.testimonial.position}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </section>
        </div>
    );
};

export default ProjectDetail;
