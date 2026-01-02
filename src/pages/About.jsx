import React from 'react';
import { motion } from 'framer-motion';
import { Target, Lightbulb, Users } from 'lucide-react';
import SEO from '../components/SEO';

const About = () => {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 pt-32 pb-20">
            <SEO
                title="About Us"
                description="Meet the team at Vernovate. A tech startup incubated at down town Venture Labs (dtvl), Assam Down Town University."
            />
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-bold mb-6 text-black"
                    >
                        Who <span className="text-vernovate-primary">We Are</span>
                    </motion.h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Vernovate is a future-focused technology company <strong>incubated at down town Venture Labs (dtvl), Assam Down Town University</strong>. We are dedicated to building intelligent systems that solve real-world problems.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {[
                        { title: "Our Vision", icon: Lightbulb, desc: "To be the global leader in intelligent system innovation, creating a smarter, more connected world." },
                        { title: "Our Mission", icon: Target, desc: "To deliver scalable, high-impact technology solutions that empower businesses and communities." },
                        { title: "Our Values", icon: Users, desc: "Innovation, Integrity, Impact, and Scalability are at the core of everything we do." }
                    ].map((item, i) => (
                        <div key={i} className="text-center p-8 rounded-2xl bg-white border border-gray-100 shadow-lg hover:shadow-xl transition-shadow">
                            <div className="inline-flex p-4 rounded-full bg-vernovate-primary/10 text-vernovate-primary mb-6">
                                <item.icon size={32} />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-black">{item.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Meet Our Team Section */}
                <div className="mt-32">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-black">
                            Meet Our <span className="text-vernovate-primary">Team</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                            The visionary minds driving Vernovate forward.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
                        {[
                            { name: "Aditya Singh", role: "CEO & Founder" },
                            { name: "Lungsom Lamnio", role: "CTO & Founder" },
                            { name: "Debojyoti Paul", role: "MD & Co-Founder" },
                            { name: "Amit Sharma", role: "COO & Co-Founder" },
                            { name: "Ashutosh Pratap Singh", role: "CFO & Co-Founder" }
                        ].map((member, i) => (
                            <div key={i} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-lg text-center hover:scale-105 transition-transform duration-300">
                                <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-6 text-gray-400">
                                    <Users size={40} />
                                </div>
                                <h3 className="text-xl font-bold text-black mb-2">{member.name}</h3>
                                <p className="text-vernovate-primary font-medium uppercase text-sm tracking-wider">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
