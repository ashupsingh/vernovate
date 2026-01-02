import React, { useState } from 'react';
import Hero from '../components/Hero';
import ServiceCard from '../components/ServiceCard';
import ProjectCard from '../components/ProjectCard'; // We'll show a snippet
import Button from '../components/ui/Button';
import { Code, Cpu, Globe, Database, TrendingUp, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import StartProjectModal from '../components/StartProjectModal';
import SEO from '../components/SEO';

const Home = () => {
    const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

    const services = [
        { title: "Software Development", description: "Custom enterprise software tailored to your business needs.", icon: Code },
        { title: "AI & Machine Learning", description: "Intelligent algorithms that automate and optimize operations.", icon: Cpu },
        { title: "IoT Solutions", description: "Connected devices and smart systems for real-time monitoring.", icon: Globe },
    ];

    return (
        <div>
            <SEO
                title="Home"
                description="Vernovate | Leading Software Company in Guwahati, Incubated at dtvl AdtU. We build AI, Web, and Enterprise Solutions."
                keywords="Vernovate, AdtU, Assam Down Town University, Software Company Guwahati, Best Startup Assam, AI Solutions"
            />
            <Hero />

            <StartProjectModal isOpen={isProjectModalOpen} onClose={() => setIsProjectModalOpen(false)} />

            {/* Short Intro Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 text-center max-w-4xl">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-bold mb-6"
                    >
                        Driving Innovation Through <span className="text-gradient">Technology</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-600 text-lg leading-relaxed mb-8"
                    >
                        At Vernovate, we believe in the power of intelligent systems to transform industries.
                        From smart cities to enterprise automation, we deliver solutions that are scalable, secure, and future-ready.
                    </motion.p>
                </div>
            </section>

            {/* Services Snippet */}
            <section className="py-20 bg-gray-50 relative overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">Our Expertise</h2>
                        <p className="text-gray-600">Comprehensive technology solutions for the modern enterprise.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <ServiceCard key={index} {...service} index={index} />
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Button variant="outline" onClick={() => window.location.href = '/services'}>View All Services</Button>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose Vernovate?</h2>
                            <div className="space-y-6">
                                {[
                                    { title: "Innovation First", desc: "We stay ahead of the curve with cutting-edge tech." },
                                    { title: "Scalable Solutions", desc: "Built to grow with your business needs." },
                                    { title: "Expert Execution", desc: "A team of seasoned professionals dedicated to quality." }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start space-x-4">
                                        <div className="w-8 h-8 rounded-full bg-vernovate-primary/20 flex items-center justify-center text-vernovate-primary mt-1">
                                            <ShieldCheck size={16} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                                            <p className="text-gray-600 text-sm">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative h-96 bg-gradient-to-tr from-vernovate-primary/20 to-purple-500/20 rounded-2xl overflow-hidden border border-gray-100">
                            {/* Abstract Visual Placeholder */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-48 h-48 bg-vernovate-primary/30 rounded-full blur-3xl"></div>
                            </div>
                            <div className="absolute bottom-0 right-0 p-8">
                                <div className="bg-vernovate-dark/80 backdrop-blur-md p-6 rounded-xl border border-gray-100 max-w-xs">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <TrendingUp className="text-green-400" />
                                        <span className="font-bold">Growth Driven</span>
                                    </div>
                                    <p className="text-xs text-gray-400 mb-3">We focus on metrics that matter.</p>
                                    <div className="flex justify-between items-center text-xs border-t border-gray-700/50 pt-2">
                                        <div>
                                            <span className="block text-xl font-bold text-white">98%</span>
                                            <span className="text-gray-500">Retention</span>
                                        </div>
                                        <div>
                                            <span className="block text-xl font-bold text-white">2.5x</span>
                                            <span className="text-gray-500">ROI Avg.</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-20 bg-vernovate-primary">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-black">Ready to Transform Your Business?</h2>
                    <p className="text-black/80 text-xl max-w-2xl mx-auto mb-10">
                        Let's discuss how Vernovate can help you build intelligent systems for tomorrow.
                    </p>
                    <Button
                        variant="secondary"
                        className="bg-white text-vernovate-primary hover:bg-gray-100 border-none"
                        onClick={() => setIsProjectModalOpen(true)}
                    >
                        Start a Project
                    </Button>
                </div>
            </section>
        </div>
    );
};

export default Home;
