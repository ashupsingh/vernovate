import React from 'react';
import ContactForm from '../components/ContactForm';
import { Mail, MapPin, Phone } from 'lucide-react';

const Contact = () => {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-900 pt-32 pb-20">
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
