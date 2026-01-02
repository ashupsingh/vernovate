import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import { Link } from 'react-router-dom';

const ServiceCard = ({ id, title, description, icon: Icon, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group bg-white p-8 rounded-2xl border border-gray-100 hover:border-vernovate-primary/40 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden"
        >
            <div className={`w-14 h-14 bg-vernovate-primary/10 rounded-xl flex items-center justify-center mb-6 text-vernovate-primary group-hover:scale-110 transition-transform duration-300`}>
                <Icon size={28} />
            </div>
            <h3 className="text-xl font-bold mb-3 text-black group-hover:text-vernovate-primary transition-colors">{title}</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>

            <Link to={`/services/${id}`} className="inline-flex items-center text-vernovate-primary font-semibold text-sm group-hover:translate-x-1 transition-transform">
                Learn More <ArrowRight size={16} className="ml-1" />
            </Link>
        </motion.div>
    );
};

export default ServiceCard;
