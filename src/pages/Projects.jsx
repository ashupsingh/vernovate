import React from 'react';
import ProjectCard from '../components/ProjectCard';
import { motion } from 'framer-motion';
import { projectsData } from '../data/projectsData';

const Projects = () => {
    return (
        <div className="pt-24 md:pt-32 min-h-screen bg-gray-50 text-black font-sans">
            {/* Header */}
            <section className="py-10 bg-gray-50 border-b border-gray-100">
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
            <section className="py-20">
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
