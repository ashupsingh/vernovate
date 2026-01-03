import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Facebook, Mail, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-50 pt-20 pb-10 border-t border-gray-200">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-2">
                        <h2 className="text-3xl font-bold mb-6 text-black">VERNO<span className="text-vernovate-primary">VATE</span></h2>
                        <p className="text-gray-600 max-w-sm mb-8 leading-relaxed">
                            Innovating intelligent systems for a smarter future. We bridge the gap between complex technology and real-world solutions.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center text-gray-700 hover:bg-vernovate-primary hover:text-white transition-colors">
                                <Linkedin size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center text-gray-700 hover:bg-vernovate-primary hover:text-white transition-colors">
                                <Twitter size={20} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center text-gray-700 hover:bg-vernovate-primary hover:text-white transition-colors">
                                <Mail size={20} />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold mb-6 text-black">Quick Links</h3>
                        <ul className="space-y-4">
                            <li><Link to="/about" className="text-gray-600 hover:text-vernovate-primary transition-colors">About Us</Link></li>
                            <li><Link to="/services" className="text-gray-600 hover:text-vernovate-primary transition-colors">Our Services</Link></li>
                            <li><Link to="/projects" className="text-gray-600 hover:text-vernovate-primary transition-colors">Projects</Link></li>
                            <li><Link to="/careers" className="text-gray-600 hover:text-vernovate-primary transition-colors">Careers</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold mb-6 text-black">Contact</h3>
                        <ul className="space-y-4 text-gray-600">
                            <li className="flex items-start">
                                <MapPin size={20} className="mr-3 text-vernovate-primary shrink-0" />
                                <span>Assam, India</span>
                            </li>
                            <li className="flex items-center">
                                <Mail size={20} className="mr-3 text-vernovate-primary" />
                                <a href="mailto:vernovate@gmail.com" className="hover:text-black transition-colors">vernovate@gmail.com</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                    <p>&copy; {new Date().getFullYear()} Vernovate Pvt Ltd. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-black transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-black transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
