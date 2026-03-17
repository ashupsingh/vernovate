import React from 'react';
import ContactForm from '../components/ContactForm';
import { Mail, MapPin, Phone } from 'lucide-react';
import SEO from '../components/SEO';

const Contact = () => {
    return (
        <div className="min-h-screen text-gray-900 pt-28 md:pt-16 pb-20">
            <SEO
                title="Contact Us"
                path="/contact"
                description="Get in touch with Vernovate Pvt Ltd — discuss your next AI, IoT, or software project. Located at DTVL, Assam Down Town University, Guwahati, Assam. Email: vernovate@gmail.com"
                keywords="contact Vernovate, Vernovate email, project inquiry, software consultation, hire developers Guwahati, technology partner India, Vernovate Guwahati address"
                breadcrumbs={[
                    { name: 'Home', path: '/' },
                    { name: 'Contact Us', path: '/contact' }
                ]}
                faqData={[
                    {
                        question: 'How can I contact Vernovate?',
                        answer: 'You can email us at vernovate@gmail.com, visit our office at Down Town Venture Labs (DTVL), Assam Down Town University, Guwahati, Assam 781026, or use the contact form on our website.'
                    },
                    {
                        question: 'Where is the Vernovate office located?',
                        answer: 'Vernovate Pvt Ltd is located at Down Town Venture Labs (DTVL), Assam Down Town University, Panikhaiti, Guwahati, Assam 781026, India.'
                    },
                ]}
            />
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 text-black">
                        Get in <span className="text-vernovate-primary">Touch</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Ready to start your next project? We are here to help.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    <div>
                        <h2 className="text-2xl font-bold mb-8 text-black">Contact Information</h2>
                        <div className="space-y-6">
                            <div className="flex items-start">
                                <div className="w-10 h-10 bg-vernovate-primary/10 rounded-full flex items-center justify-center text-vernovate-primary mr-4 shrink-0">
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-lg text-black">Our Location</h4>
                                    <p className="text-gray-600">Assam, India</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="w-10 h-10 bg-vernovate-primary/10 rounded-full flex items-center justify-center text-vernovate-primary mr-4 shrink-0">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-lg text-black">Email Us</h4>
                                    <p className="text-gray-600">vernovate@gmail.com</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-xl">
                        <ContactForm />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
