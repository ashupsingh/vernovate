import React from 'react';
import ServiceCard from '../components/ServiceCard';
import { servicesData } from '../data/servicesData';

const Services = () => {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 pt-24 pb-12 md:pt-32 md:pb-20">
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
            </div>
        </div>
    );
};

export default Services;
