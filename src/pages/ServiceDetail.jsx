import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { servicesData } from '../data/servicesData';
import Button from '../components/ui/Button';

const ServiceDetail = () => {
    const { id } = useParams();
    const service = servicesData.find(s => s.id === id);
    const [openFaqIndex, setOpenFaqIndex] = useState(null);

    const toggleFaq = (index) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

    if (!service) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Service Not Found</h2>
                    <Link to="/services" className="text-vernovate-primary hover:underline">
                        Back to Services
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            {/* Hero Section */}
            <section className="bg-black text-white relative overflow-hidden min-h-[55vh] md:min-h-[60vh] flex flex-col justify-center md:justify-end pt-24 pb-12 md:pt-32 md:pb-20">
                {/* Background Image with Parallax-like feel */}
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                    style={{ backgroundImage: `url("${service.image}")` }}
                >
                    <div className="absolute inset-0 bg-black/60"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                </div>

                <div className="container mx-auto px-4 z-10 relative">
                    {/* Breadcrumb - Hidden on mobile for cleaner look */}
                    <nav className="hidden md:flex text-sm text-gray-400 mb-6 items-center space-x-2">
                        <Link to="/" className="hover:text-white transition-colors">Home</Link>
                        <span>/</span>
                        <Link to="/services" className="hover:text-white transition-colors">Services</Link>
                        <span>/</span>
                        <span className="text-vernovate-primary">{service.title}</span>
                    </nav>

                    <Link to="/services" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors text-sm font-medium group">
                        <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Services
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl"
                    >
                        {/* Icon & Badge - Hidden on mobile to prioritize Title */}
                        <div className="hidden md:flex items-center space-x-4 mb-6">
                            <div className="w-12 h-12 bg-vernovate-primary rounded-xl flex items-center justify-center text-black shadow-lg shadow-vernovate-primary/20 shrink-0">
                                <service.icon size={24} />
                            </div>
                            <span className="text-vernovate-primary font-bold tracking-wider uppercase text-sm">Industry Solutions</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 text-white leading-tight break-words">{service.title}</h1>
                        <p className="text-base md:text-xl text-gray-200 max-w-2xl leading-relaxed font-light border-l-4 border-vernovate-primary pl-6">
                            {service.shortDescription}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Detailed Content */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        <div>
                            <h2 className="text-3xl font-bold mb-6 text-black">Overview</h2>
                            <p className="text-gray-600 text-lg leading-relaxed mb-8">
                                {service.fullDescription}
                            </p>

                            <h3 className="text-2xl font-bold mb-4 text-black">Key Benefits</h3>
                            <ul className="space-y-4">
                                {service.benefits.map((benefit, index) => (
                                    <li key={index} className="flex items-start">
                                        <CheckCircle className="text-vernovate-primary mt-1 mr-3 flex-shrink-0" size={20} />
                                        <span className="text-gray-700">{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100">
                            <h3 className="text-2xl font-bold mb-6 text-black">Core Features</h3>
                            <ul className="space-y-4 mb-8">
                                {service.features.map((feature, index) => (
                                    <li key={index} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 font-medium text-gray-800">
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <div className="bg-black text-white p-8 rounded-2xl text-center">
                                <h4 className="text-xl font-bold mb-4">Ready to Innovate?</h4>
                                <p className="text-gray-400 mb-6 text-sm">Let's discuss how our {service.title} solutions can transform your business.</p>
                                <Link to="/contact">
                                    <Button variant="primary" className="w-full justify-center">Get in Touch</Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* FAQ Section */}
            {service.faqs && (
                <section className="py-20 bg-gray-50">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <h2 className="text-3xl font-bold mb-12 text-center text-black">Frequently Asked Questions</h2>
                        <div className="space-y-4">
                            {service.faqs.map((faq, index) => (
                                <div key={index} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                                    <button
                                        className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                                        onClick={() => toggleFaq(index)}
                                    >
                                        <span className="text-lg font-semibold text-gray-900">{faq.question}</span>
                                        {openFaqIndex === index ? (
                                            <ChevronUp className="text-vernovate-primary" />
                                        ) : (
                                            <ChevronDown className="text-gray-400" />
                                        )}
                                    </button>
                                    <motion.div
                                        initial={false}
                                        animate={{ height: openFaqIndex === index ? 'auto' : 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="p-6 pt-0 text-gray-600 leading-relaxed border-t border-gray-50">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

export default ServiceDetail;
