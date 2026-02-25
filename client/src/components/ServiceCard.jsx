import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ServiceCard = ({ id, title, description, shortDescription, icon: Icon, image, index }) => {
    return (
        <Link to={`/services/${id}`} className="block">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-2xl border border-gray-100 hover:border-vernovate-primary/40 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden h-full"
            >
                {/* Thumbnail */}
                {image && (
                    <div className="w-full h-40 overflow-hidden">
                        <img
                            src={image}
                            alt={title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            loading="lazy"
                        />
                    </div>
                )}

                <div className="p-6">
                    <div className="w-12 h-12 bg-vernovate-primary/10 rounded-xl flex items-center justify-center mb-4 text-vernovate-primary group-hover:scale-110 transition-transform duration-300">
                        <Icon size={24} />
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-black group-hover:text-vernovate-primary transition-colors">{title}</h3>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">{shortDescription || description}</p>

                    <span className="inline-flex items-center text-vernovate-primary font-semibold text-sm group-hover:translate-x-1 transition-transform">
                        Learn More <ArrowRight size={16} className="ml-1" />
                    </span>
                </div>
            </motion.div>
        </Link>
    );
};

export default ServiceCard;
