import React, { useState } from 'react';
import ServiceCard from '../components/ServiceCard';
import { servicesData } from '../data/servicesData';
import StartProjectModal from '../components/StartProjectModal';
import Button from '../components/ui/Button';
import SEO from '../components/SEO';

const Services = () => {
    const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

    return (
        <div className="min-h-screen text-gray-900 pt-28 md:pt-16 pb-12 md:pb-20">
            <SEO
                title="Services"
                path="/services"
                description="Explore Vernovate's technology solutions — AI & Machine Learning, IoT & Embedded Systems, Custom Software Development, Smart City Solutions, Data Analytics, and Healthcare Tech. Enterprise-grade solutions built in India."
                keywords="Vernovate services, AI development India, machine learning services, IoT solutions, embedded systems, custom software development, smart city technology, data analytics, healthcare tech, web development company Guwahati, full stack development, enterprise software"
                breadcrumbs={[
                    { name: 'Home', path: '/' },
                    { name: 'Services', path: '/services' }
                ]}
                faqData={[
                    {
                        question: 'What services does Vernovate Pvt Ltd offer?',
                        answer: 'Vernovate offers Custom Software Development, AI & Machine Learning, IoT & Embedded Systems, Smart City Solutions, Data Analytics & Business Intelligence, and Healthcare Technology solutions.'
                    },
                    {
                        question: 'Does Vernovate build AI and Machine Learning solutions?',
                        answer: 'Yes, Vernovate specializes in building AI and Machine Learning solutions including predictive analytics, natural language processing, computer vision, and intelligent automation systems.'
                    },
                    {
                        question: 'Can Vernovate build IoT solutions?',
                        answer: 'Yes, Vernovate designs and develops IoT & Embedded Systems for real-time monitoring, smart agriculture, industrial automation, and connected device ecosystems.'
                    },
                ]}
            />
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 text-black">
                        Our <span className="text-vernovate-primary">Services</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Comprehensive technology solutions designed to drive growth and efficiency.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {servicesData.map((service, index) => (
                        <ServiceCard key={index} {...service} index={index} />
                    ))}
                </div>

                {/* CTA Section */}
                <div className="mt-20 bg-vernovate-primary rounded-3xl p-12 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">Ready to Transform Your Business?</h2>
                    <p className="text-black/80 text-lg max-w-2xl mx-auto mb-8">
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
            </div>

            <StartProjectModal isOpen={isProjectModalOpen} onClose={() => setIsProjectModalOpen(false)} />
        </div>
    );
};

export default Services;
