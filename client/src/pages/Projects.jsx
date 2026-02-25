import React from 'react';
import ProjectCard from '../components/ProjectCard';
import { motion } from 'framer-motion';
import { projectsData } from '../data/projectsData';
import SEO from '../components/SEO';

const Projects = () => {
    return (
        <div className="pt-28 md:pt-16 min-h-screen text-black font-sans">
            <SEO
                title="Projects"
                path="/projects"
                description="Explore Vernovate's portfolio — real-world AI, IoT, and enterprise software projects including Intelligent Traffic Management, AgriTech Monitoring, and Enterprise ERP solutions."
                keywords="Vernovate projects, portfolio, case studies, AI projects India, IoT projects, smart city projects, agritech solutions, enterprise ERP, technology solutions Guwahati"
            />
            {/* Header */}
            <section className="pt-6 pb-4 border-b border-gray-100">
                <div className="container mx-auto px-4 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-bold mb-6 text-black"
                    >
                        Our <span className="text-vernovate-primary">Work</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-600 max-w-3xl mx-auto"
                    >
                        Real-world challenges solved with intelligent technology.
                    </motion.p>
                </div>
            </section>

            {/* Projects Grid */}
            <section className="py-10">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projectsData.map((project, index) => (
                            <ProjectCard
                                key={index}
                                {...project}
                                description={project.shortDescription} // Pass short description for card view
                                index={index}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Projects;
