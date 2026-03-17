import React, { useState } from 'react';
import Button from '../components/ui/Button';
import ApplicationModal from '../components/ApplicationModal';
import SEO from '../components/SEO';

const Careers = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="pt-28 md:pt-16 min-h-screen flex flex-col items-center justify-center text-center px-4">
            <SEO
                title="Careers"
                path="/careers"
                description="Join Vernovate Pvt Ltd — explore career and internship opportunities in AI, IoT, software development, and design. Work with a DST NIDHI-funded startup in Guwahati, Assam."
                keywords="Vernovate careers, jobs at Vernovate, tech jobs Guwahati, software developer jobs Assam, AI engineer jobs India, startup jobs northeast India, internship Guwahati, Vernovate hiring"
                breadcrumbs={[
                    { name: 'Home', path: '/' },
                    { name: 'Careers', path: '/careers' }
                ]}
            />
            <ApplicationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            <span className="text-vernovate-primary font-bold tracking-widest uppercase mb-4">Join Our Team</span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-black">Build the Future with Us</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
                we are always looking for passionate individuals to join our mission.
            </p>
            <div className="p-8 bg-white border border-gray-100 shadow-xl text-black rounded-2xl max-w-md w-full">
                <h3 className="text-xl font-bold mb-4">Current Openings</h3>
                <p className="text-gray-500 mb-6">There are currently no open positions listed here. However, we are always open to talent.</p>
                <Button variant="primary" onClick={() => setIsModalOpen(true)}>
                    Send Your Resume
                </Button>
            </div>
        </div>
    );
};

export default Careers;
