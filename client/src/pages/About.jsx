import React from 'react';
import { motion } from 'framer-motion';
import { Target, Lightbulb, Users, Github, Linkedin, Instagram } from 'lucide-react';
import SEO from '../components/SEO';

const About = () => {
    return (
        <div className="min-h-screen text-gray-900 pt-28 md:pt-16 pb-20">
            <SEO
                title="About Us"
                path="/about"
                description="Learn about Vernovate Pvt Ltd — from a hackathon idea at Innovathon 2024 to a DST NIDHI-funded company. Meet our founders Aditya Singh (CEO) & Lungsom Lamnio (CTO), incubated at DTVL, Assam Down Town University."
                keywords="about Vernovate, Vernovate team, Aditya Singh CEO, Lungsom Lamnio CTO, startup story, Vernovate founders, DTVL incubation, Assam Down Town University startup, Guwahati tech company"
                breadcrumbs={[
                    { name: 'Home', path: '/' },
                    { name: 'About Us', path: '/about' }
                ]}
                faqData={[
                    {
                        question: 'Who founded Vernovate Pvt Ltd?',
                        answer: 'Vernovate was co-founded by Aditya Singh (CEO), Lungsom Lamnio (CTO), Debojyoti Paul (Managing Director), Amit Sharma (COO), and Ashutosh Pratap Singh (CFO). It started as a hackathon idea at Innovathon 2024.'
                    },
                    {
                        question: 'What is the vision of Vernovate?',
                        answer: 'Vernovate\'s vision is to be the global leader in intelligent system innovation, creating a smarter, more connected world through AI, IoT, and custom software solutions.'
                    },
                    {
                        question: 'Is Vernovate incubated at a university?',
                        answer: 'Yes, Vernovate Pvt Ltd is incubated at Down Town Venture Labs (DTVL) at Assam Down Town University, Guwahati, Assam, India.'
                    },
                ]}
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

                    <div className="flex flex-wrap justify-center gap-8">
                        {[
                            { name: "Aditya Singh", role: "CEO & Founder", image: "/team/aditya-singh.png", linkedin: "https://www.linkedin.com/in/aditya-singh-1b7243291", github: "https://github.com/Aditya-10-Singh", instagram: "https://www.instagram.com/___adityasingh9?igsh=aGZ1MGNrMm5jdDI5" },
                            { name: "Lungsom Lamnio", role: "CTO & Founder", image: "/team/lungsom-lamnio.png", imageScale: 1.3, linkedin: "https://www.linkedin.com/in/lungsom-lamnio-339914282", github: "https://github.com/LungsomLamnio", instagram: "https://www.instagram.com/lungsom.lamnio/" },
                            { name: "Debojyoti Paul", role: "MD & Co-Founder", image: "/team/debojyoti-paul.png", linkedin: "https://www.linkedin.com/in/debojyoti-paul-05b68021a/", github: "https://share.google/KSQCVeTWv6uBexCnO", instagram: "https://www.instagram.com/debo__paul__?igsh=cmpoaHB5Y2Z6dDFo" },
                            { name: "Amit Sharma", role: "COO & Co-Founder", image: "/team/amit-sharma.png", linkedin: "https://www.linkedin.com/in/amit-sharma-99a87a372", github: "https://github.com/amitsharma071", instagram: "https://www.instagram.com/sarma.insta?igsh=MTBqc3pwYnd3emw2eA==" },
                            { name: "Ashutosh Pratap Singh", role: "CFO & Co-Founder", image: "/team/ashutosh-singh.png", imagePos: "center 30%", linkedin: "https://www.linkedin.com/in/ashupratapsingh/", github: "https://github.com/ashupsingh", instagram: "https://www.instagram.com/moody_skull_/" }
                        ].map((member, i) => (
                            <div key={i} className="group bg-white p-8 rounded-2xl border border-gray-100 shadow-lg text-center hover:scale-105 transition-transform duration-300 relative w-full md:w-[calc(33.333%-1.5rem)]">
                                <div className="w-28 h-28 mx-auto rounded-full overflow-hidden mb-6 border-2 border-gray-100 relative">
                                    {member.image ? (
                                        <img src={member.image} alt={member.name} className="w-full h-full object-cover" style={{ objectPosition: member.imagePos || 'center 10%', transform: `scale(${member.imageScale || 1})` }} />
                                    ) : (
                                        <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                                            <Users size={40} />
                                        </div>
                                    )}
                                </div>
                                <h3 className="text-xl font-bold text-black mb-2">{member.name}</h3>
                                <p className="text-vernovate-primary font-medium uppercase text-sm tracking-wider mb-4">{member.role}</p>

                                {/* Social icons - visible on hover */}
                                <div className="flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <a href={member.github || '#'} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-black hover:text-white transition-colors">
                                        <Github size={16} />
                                    </a>
                                    <a href={member.linkedin || '#'} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-blue-600 hover:text-white transition-colors">
                                        <Linkedin size={16} />
                                    </a>
                                    <a href={member.instagram || '#'} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-pink-500 hover:text-white transition-colors">
                                        <Instagram size={16} />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
