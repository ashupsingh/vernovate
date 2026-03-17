import React, { useState } from 'react';
import Hero from '../components/Hero';
import ServiceCard from '../components/ServiceCard';
import Button from '../components/ui/Button';
import { Code, Cpu, Globe, MapPin, ShieldCheck, Rocket, Lightbulb, Award, Users, GraduationCap, Trophy, Handshake, Building2, X, ZoomIn } from 'lucide-react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';

const Home = () => {
    const [activeLocation, setActiveLocation] = useState(null);
    const [lightbox, setLightbox] = useState({ open: false, src: '', alt: '' });

    const services = [
        { id: 'software-development', title: "Software Development", description: "Custom enterprise software tailored to your business needs.", icon: Code, image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop" },
        { id: 'ai-machine-learning', title: "AI & Machine Learning", description: "Intelligent algorithms that automate and optimize operations.", icon: Cpu, image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2065&auto=format&fit=crop" },
        { id: 'iot-embedded-systems', title: "IoT Solutions", description: "Connected devices and smart systems for real-time monitoring.", icon: Globe, image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop" },
    ];

    const journeySteps = [
        {
            icon: Trophy,
            title: "The Beginning",
            period: "March 2024",
            image: "/journey/innovathon-2024.png",
            highlight: "2nd Prize · ₹20,000",
            description: "Vernovate started as a hackathon idea at Innovathon 2024, conducted by Assam down town University. What began as a problem-solving concept quickly turned into something bigger when we secured 2nd Prize and won ₹20,000 — validating our vision and marking the foundation of our startup journey.",
            color: "bg-amber-50 text-amber-600 border-amber-200",
        },
        {
            icon: Handshake,
            title: "First Institutional Support",
            period: "2024",
            image: "/journey/dtvl-mou.png",
            highlight: "MoU with dtVL · ₹25,000 Grant",
            description: "We signed an MoU with down town Venture Labs (dtVL). Recognizing the potential of our software idea, dtVL supported us with ₹25,000 to build our first working prototype — our first official step toward transforming an idea into a product.",
            color: "bg-blue-50 text-blue-600 border-blue-200",
        },
        {
            icon: Rocket,
            title: "Scaling the Vision",
            period: "2024",
            image: "/journey/sunstone-launchpad.png",
            highlight: "1st Position · ₹15,000",
            description: "We participated in SUNSTONE Launchpad, where we refined our concept and presented a stronger business model. Our efforts paid off as we secured 1st Position along with a ₹15,000 prize.",
            color: "bg-purple-50 text-purple-600 border-purple-200",
        },
        {
            icon: MapPin,
            title: "Regional Recognition",
            period: "January 2025",
            image: "/journey/udyamotsav-2025.png",
            highlight: "Top 33 Startups — Northeast India",
            description: "Our idea was selected among the Top 33 startup ideas from Northeast India at Udyamotsav 2025, conducted at Assam Don Bosco University. This recognition validated the regional impact and scalability of our vision.",
            color: "bg-green-50 text-green-600 border-green-200",
        },
        {
            icon: Trophy,
            title: "Strengthening the Product",
            period: "March 2025",
            image: "/journey/col-gpd-hackathon.png",
            highlight: "2nd Position · ₹50,000",
            description: "At the COL GPD Hackathon at Jorhat Engineering College, we showcased an even more refined version of our solution. Competing among strong teams, we achieved 2nd Position and won ₹50,000.",
            color: "bg-amber-50 text-amber-600 border-amber-200",
        },
        {
            icon: Award,
            title: "Government Recognition",
            period: "April 2025",
            image: "/journey/dst-nidhi-grant.png",
            highlight: "₹5,00,000 DST NIDHI iTBI Grant",
            description: "Our biggest milestone — our idea was awarded a ₹5,00,000 grant under the NIDHI iTBI Scheme by the Department of Science and Technology (DST), Government of India. This accelerated our growth and strengthened our mission.",
            color: "bg-green-50 text-green-600 border-green-200",
        },
        {
            icon: Building2,
            title: "From Project to Company",
            period: "October 2025",
            image: "/journey/vernovate-pvt-ltd.png",
            highlight: "Vernovate Private Limited",
            description: "What began as a hackathon project has now evolved into a registered startup. Our venture is officially incorporated as Vernovate Private Limited, marking our transition from an idea-stage project to a structured and growth-focused company.",
            color: "bg-vernovate-primary/10 text-vernovate-primary border-vernovate-primary/30",
        },
    ];

    const grants = [
        {
            title: "Innovathon 2024 — 2nd Prize",
            organization: "Assam down town University",
            description: "Secured 2nd Prize at Innovathon 2024, validating our hackathon idea and marking the foundation of Vernovate's journey.",
            image: "/journey/innovathon-2024.png",
            amount: "₹20,000",
        },
        {
            title: "dtVL Incubation & MoU",
            organization: "down town Venture Labs (dtVL)",
            description: "Signed an MoU with dtVL and received grant support to build our first working prototype — our first official step toward a product.",
            image: "/journey/dtvl-mou.png",
            amount: "₹25,000 Grant",
        },
        {
            title: "SUNSTONE Launchpad — 1st Position",
            organization: "SUNSTONE",
            description: "Refined our concept and presented a stronger business model, securing 1st Position at the SUNSTONE Launchpad competition.",
            image: "/journey/sunstone-launchpad.png",
            amount: "₹15,000",
        },
        {
            title: "Udyamotsav 2025 — Top 33",
            organization: "Assam Don Bosco University",
            description: "Selected among the Top 33 startup ideas from Northeast India at Udyamotsav 2025, validating the regional impact of our vision.",
            image: "/journey/udyamotsav-2025.png",
            amount: "Top 33 NE India",
        },
        {
            title: "COL GPD Hackathon — 2nd Position",
            organization: "Jorhat Engineering College",
            description: "Showcased a refined version of our solution at COL GPD Hackathon, competing among strong teams and securing 2nd Position.",
            image: "/journey/col-gpd-hackathon.png",
            amount: "₹50,000",
        },
        {
            title: "DST NIDHI iTBI Grant",
            organization: "Dept. of Science & Technology, Govt. of India",
            description: "Awarded a major government grant under the NIDHI iTBI Scheme by DST — our biggest milestone that accelerated growth and validated our mission.",
            image: "/journey/dst-nidhi-grant.png",
            amount: "₹5,00,000",
        },
    ];

    return (
        <div className="relative">


            <SEO
                title="Home"
                path="/"
                description="Vernovate Pvt Ltd — DST NIDHI iTBI-funded technology company building AI, IoT, and custom software solutions. Incubated at DTVL, Assam Down Town University, Guwahati. Award-winning startup with ₹5L+ in grants."
                keywords="Vernovate, Vernovate Pvt Ltd, best software company Guwahati, AI solutions India, IoT development Assam, custom software development, DST NIDHI iTBI startup, DTVL AdtU, Assam Down Town University, startup India, tech startup northeast India, Innovathon 2024, SUNSTONE Launchpad, COL GPD Hackathon"
                breadcrumbs={[
                    { name: 'Home', path: '/' }
                ]}
                faqData={[
                    {
                        question: 'What is Vernovate Pvt Ltd?',
                        answer: 'Vernovate Pvt Ltd is a technology startup incubated at Down Town Venture Labs (DTVL), Assam Down Town University, Guwahati. We specialize in AI/ML, IoT, custom software development, and intelligent systems for businesses across India.'
                    },
                    {
                        question: 'Who are the directors of Vernovate Pvt Ltd?',
                        answer: 'The directors and co-founders of Vernovate Pvt Ltd are: Aditya Singh (CEO & Founder), Lungsom Lamnio (CTO & Founder), Debojyoti Paul (Managing Director & Co-Founder), Amit Sharma (COO & Co-Founder), and Ashutosh Pratap Singh (CFO & Co-Founder).'
                    },
                    {
                        question: 'Who is the CEO of Vernovate?',
                        answer: 'Aditya Singh is the CEO and Founder of Vernovate Pvt Ltd. He leads the company vision and strategic direction.'
                    },
                    {
                        question: 'Who is the CTO of Vernovate?',
                        answer: 'Lungsom Lamnio is the CTO and Founder of Vernovate Pvt Ltd. He oversees all technology development and architecture.'
                    },
                    {
                        question: 'Who is the CFO of Vernovate?',
                        answer: 'Ashutosh Pratap Singh is the CFO and Co-Founder of Vernovate Pvt Ltd. He manages the company finances and operations strategy.'
                    },
                    {
                        question: 'Who is the Managing Director (MD) of Vernovate?',
                        answer: 'Debojyoti Paul is the Managing Director and Co-Founder of Vernovate Pvt Ltd.'
                    },
                    {
                        question: 'Who is the COO of Vernovate?',
                        answer: 'Amit Sharma is the COO and Co-Founder of Vernovate Pvt Ltd. He manages day-to-day operations and business development.'
                    },
                    {
                        question: 'How can I contact Vernovate Pvt Ltd?',
                        answer: 'You can contact Vernovate Pvt Ltd via email at vernovate@gmail.com or visit our office at Down Town Venture Labs (DTVL), Assam Down Town University, Guwahati, Assam 781026, India. You can also use the contact form on our website at www.vernovate.com/contact.'
                    },
                    {
                        question: 'What services does Vernovate offer?',
                        answer: 'Vernovate offers: Custom Software Development, AI & Machine Learning Solutions, IoT & Embedded Systems, Smart City Solutions, Data Analytics & Business Intelligence, Healthcare Technology, Web & Mobile App Development, and UI/UX Design.'
                    },
                    {
                        question: 'Where is Vernovate located?',
                        answer: 'Vernovate Pvt Ltd is incubated at Down Town Venture Labs (DTVL), Assam Down Town University, Panikhaiti, Guwahati, Assam 781026, India. Our registered office is in Kokrajhar, Assam.'
                    },
                    {
                        question: 'How does Vernovate work?',
                        answer: 'Vernovate follows an agile development methodology. We start with understanding client requirements, create detailed project plans, develop using modern technologies (React, Node.js, Python, AI/ML frameworks), test rigorously, and deliver scalable solutions. We offer end-to-end product development from ideation to deployment.'
                    },
                    {
                        question: 'Is Vernovate a government-funded startup?',
                        answer: 'Yes, Vernovate Pvt Ltd received a ₹5,00,000 grant under the DST NIDHI iTBI Scheme from the Department of Science and Technology (DST), Government of India. We have also won multiple hackathons and competitions.'
                    },
                ]}
            />
            <Hero />

            {/* Short Intro Section */}
            <section className="py-20 relative">
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

            {/* Our Journey Section */}
            <section className="py-24 relative overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="inline-block px-4 py-1.5 bg-vernovate-primary/10 text-vernovate-primary text-xs font-bold uppercase tracking-wider rounded-full mb-4">
                                Our Story
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                The Journey of <span className="text-gradient">Vernovate</span>
                            </h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                From a spark of an idea to a growing technology company — here's how our team transformed a vision into reality.
                            </p>
                        </motion.div>
                    </div>

                    {/* Timeline */}
                    <div className="relative max-w-5xl mx-auto">
                        {/* Vertical line */}
                        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-vernovate-primary/20 via-vernovate-primary to-vernovate-primary/20 md:-translate-x-px"></div>

                        {journeySteps.map((step, i) => {
                            const Icon = step.icon;
                            const isLeft = i % 2 === 0;

                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.6, delay: i * 0.08 }}
                                    className={`relative flex flex-col md:flex-row items-start gap-4 mb-16 last:mb-0 pl-14 md:pl-0 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                                >
                                    {/* Desktop timeline dot */}
                                    <div className={`hidden md:flex absolute left-1/2 top-6 -translate-x-1/2 w-10 h-10 rounded-full border-2 border-white shadow-lg items-center justify-center z-10 ${step.color}`}>
                                        <Icon size={18} />
                                    </div>

                                    {/* Content card */}
                                    <div className={`w-full md:w-[calc(50%-2.5rem)] ${isLeft ? 'md:text-right' : 'md:text-left'}`}>
                                        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:shadow-lg transition-shadow">
                                            <div className={`flex items-center gap-2 mb-2 ${isLeft ? 'md:justify-end' : 'md:justify-start'}`}>
                                                <span className="text-xs font-bold text-vernovate-primary bg-vernovate-primary/10 px-3 py-1 rounded-full">{step.period}</span>
                                            </div>
                                            <h3 className="text-lg font-bold text-gray-900 mt-1 mb-1">{step.title}</h3>
                                            {step.highlight && <p className="text-sm font-semibold text-amber-600 mb-2">{step.highlight}</p>}
                                            <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
                                        </div>
                                    </div>

                                    {/* Image */}
                                    <div className="w-full md:w-[calc(50%-2.5rem)]">
                                        <div
                                            className="rounded-2xl overflow-hidden shadow-md border border-gray-100 bg-gray-50 cursor-pointer relative group/img"
                                            onClick={() => setLightbox({ open: true, src: step.image, alt: step.title })}
                                        >
                                            <img
                                                src={step.image}
                                                alt={step.title}
                                                className="w-full h-56 object-cover group-hover/img:scale-105 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                                                <ZoomIn size={28} className="text-white opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 drop-shadow-lg" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Mobile dot */}
                                    <div className="md:hidden absolute left-0 top-0 z-10">
                                        <div className={`w-10 h-10 rounded-full border-2 border-white shadow-lg flex items-center justify-center ${step.color}`}>
                                            <Icon size={16} />
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Grants & Recognition Section */}
            <section className="py-24 relative overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="inline-block px-4 py-1.5 bg-green-50 text-green-600 text-xs font-bold uppercase tracking-wider rounded-full mb-4">
                                Grants & Recognition
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">
                                Backed by <span className="text-gradient">Trust & Support</span>
                            </h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">
                                We're proud to have received grants and recognition from leading institutions that believe in our vision to innovate the future.
                            </p>
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {grants.map((grant, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.15 }}
                                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 group"
                            >
                                {/* Grant image */}
                                <div
                                    className="relative h-48 overflow-hidden cursor-pointer"
                                    onClick={() => setLightbox({ open: true, src: grant.image, alt: grant.title })}
                                >
                                    <img
                                        src={grant.image}
                                        alt={grant.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <ZoomIn size={20} className="text-white drop-shadow-lg" />
                                    </div>
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <span className="inline-block px-3 py-1 bg-vernovate-primary text-black text-xs font-bold rounded-full">
                                            {grant.amount}
                                        </span>
                                    </div>
                                </div>

                                {/* Grant content */}
                                <div className="p-6">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Trophy size={16} className="text-vernovate-primary" />
                                        <span className="text-xs font-semibold text-vernovate-primary uppercase tracking-wider">{grant.organization}</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-3">{grant.title}</h3>
                                    <p className="text-sm text-gray-600 leading-relaxed">{grant.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Snippet */}
            <section className="py-20 relative overflow-hidden">
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
            <section className="py-20 relative">
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
                        <div className="relative h-[28rem] rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                            {/* Embedded Google Map */}
                            <iframe
                                key={activeLocation || 'overview'}
                                title="Vernovate Location"
                                src={
                                    activeLocation === 'hq'
                                        ? 'https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3580!2d89.9664!3d26.4394!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin'
                                        : activeLocation === 'dtvl'
                                            ? 'https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3580!2d91.8615!3d26.2018!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin'
                                            : 'https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d450000!2d90.5!3d26.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin'
                                }
                                className="w-full h-full border-0"
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />

                            {/* Location badges */}
                            <div className="absolute top-4 right-4 flex flex-col items-end gap-2">
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    onClick={() => setActiveLocation(activeLocation === 'hq' ? null : 'hq')}
                                    className={`cursor-pointer bg-white/95 backdrop-blur-md px-4 py-3 rounded-xl shadow-lg border max-w-xs transition-all ${activeLocation === 'hq' ? 'border-vernovate-primary ring-2 ring-vernovate-primary/30 scale-[1.02]' : 'border-gray-100 hover:border-gray-300'
                                        }`}
                                >
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className="w-6 h-6 rounded-full bg-vernovate-primary/20 flex items-center justify-center">
                                            <MapPin size={12} className="text-vernovate-primary" />
                                        </div>
                                        <span className="text-xs font-bold text-gray-900">Company HQ</span>
                                        {activeLocation === 'hq' && <span className="text-[10px] text-vernovate-primary font-semibold ml-auto">● Viewing</span>}
                                    </div>
                                    <p className="text-[11px] text-gray-500 leading-snug pl-8">Mamani Sarma Mechpara, Part 1, D.K. Road, Gossaigaon, Kokrajhar, Assam 783360</p>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.15 }}
                                    onClick={() => setActiveLocation(activeLocation === 'dtvl' ? null : 'dtvl')}
                                    className={`cursor-pointer bg-white/95 backdrop-blur-md px-4 py-3 rounded-xl shadow-lg border max-w-xs transition-all ${activeLocation === 'dtvl' ? 'border-purple-500 ring-2 ring-purple-300/40 scale-[1.02]' : 'border-gray-100 hover:border-gray-300'
                                        }`}
                                >
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center">
                                            <MapPin size={12} className="text-purple-600" />
                                        </div>
                                        <span className="text-xs font-bold text-gray-900">Incubation Center</span>
                                        {activeLocation === 'dtvl' && <span className="text-[10px] text-purple-600 font-semibold ml-auto">● Viewing</span>}
                                    </div>
                                    <p className="text-[11px] text-gray-500 leading-snug pl-8">Down Town Venture Labs (DTVL), Assam Down Town University, Guwahati, Assam</p>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Lightbox Modal */}
            {lightbox.open && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                    onClick={() => setLightbox({ open: false, src: '', alt: '' })}
                >
                    <div className="relative inline-block" onClick={(e) => e.stopPropagation()}>
                        <button
                            className="absolute -top-3 -right-3 w-9 h-9 rounded-full bg-white shadow-lg hover:bg-gray-100 flex items-center justify-center transition-colors z-10"
                            onClick={() => setLightbox({ open: false, src: '', alt: '' })}
                        >
                            <X size={18} className="text-gray-700" />
                        </button>
                        <motion.img
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.25 }}
                            src={lightbox.src}
                            alt={lightbox.alt}
                            className="max-w-full max-h-[90vh] rounded-xl shadow-2xl object-contain"
                        />
                    </div>
                </div>
            )}

        </div >
    );
};

export default Home;
