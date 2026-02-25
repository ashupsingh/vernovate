import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const ProjectCard = ({ id, title, category, description, image, techStack, index }) => {
    return (
        <Link to={`/projects/${id}`} className="block h-full">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white h-full flex flex-col border border-gray-100 rounded-2xl overflow-hidden hover:border-vernovate-primary/50 transition-all group shadow-sm hover:shadow-xl hover:-translate-y-1"
            >
                {/* Image Section */}
                <div className="h-56 relative overflow-hidden bg-gray-100">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />

                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black shadow-lg">
                            <ArrowRight size={20} />
                        </div>
                    </div>
                </div>

                <div className="p-8 flex-grow flex flex-col">
                    <div className="text-sm text-vernovate-primary font-bold mb-2 uppercase tracking-wider">{category}</div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-vernovate-primary transition-colors">{title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed flex-grow line-clamp-3">
                        {description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                        {techStack.slice(0, 3).map((tech, i) => (
                            <span key={i} className="px-3 py-1 bg-gray-100 rounded-full text-xs font-semibold text-gray-600 group-hover:bg-vernovate-primary/10 group-hover:text-vernovate-primary transition-colors">
                                {tech}
                            </span>
                        ))}
                        {techStack.length > 3 && (
                            <span className="px-3 py-1 bg-gray-50 rounded-full text-xs font-semibold text-gray-500">
                                +{techStack.length - 3}
                            </span>
                        )}
                    </div>
                </div>
            </motion.div>
        </Link>
    );
};

export default ProjectCard;
