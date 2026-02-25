import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Scale, FileText, Shield, AlertTriangle, Ban, Globe, Clock, Gavel, Mail, Calendar, CreditCard, RefreshCw, User } from 'lucide-react';
import SEO from '../components/SEO';

const TermsOfService = () => {
    const lastUpdated = "February 23, 2025";

    const sections = [
        {
            id: "acceptance",
            icon: FileText,
            title: "1. Acceptance of Terms",
            content: [
                `These Terms of Service ("Terms") constitute a legally binding agreement between you ("User," "you," or "your") and Vernovate Private Limited ("Vernovate," "Company," "we," "us," or "our"), a company incorporated under the laws of India, with its registered office in Kokrajhar, Assam, and incubated at Down Town Venture Labs (DTVL), Assam Down Town University, Guwahati.`,
                `By accessing, browsing, or using our website (vernovate.com), mobile applications, APIs, or any of our services (collectively, the "Services"), you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy, which is incorporated herein by reference.`,
                `If you are entering into these Terms on behalf of a company or other legal entity, you represent that you have the authority to bind such entity to these Terms. If you do not have such authority, or if you do not agree with these Terms, you must not accept these Terms and may not use our Services.`,
            ],
        },
        {
            id: "services-description",
            icon: Globe,
            title: "2. Description of Services",
            content: [
                `Vernovate provides a range of technology solutions and professional services, including but not limited to:`,
            ],
            subsections: [
                {
                    title: "",
                    items: [
                        "Custom Software Development: Design, development, testing, deployment, and maintenance of bespoke software applications for web, mobile, and enterprise platforms.",
                        "Artificial Intelligence & Machine Learning: Development and integration of AI/ML models, intelligent automation systems, natural language processing, computer vision, and predictive analytics solutions.",
                        "Internet of Things (IoT) & Embedded Systems: Design and deployment of IoT architectures, sensor networks, embedded firmware, smart device integrations, and real-time monitoring systems.",
                        "UI/UX Design & Digital Experiences: User interface design, user experience research, prototyping, and implementation of modern, accessible digital experiences.",
                        "Cloud Infrastructure & DevOps: Cloud architecture, deployment automation, CI/CD pipeline setup, server management, and infrastructure optimization.",
                        "Consulting & Technology Advisory: Strategic technology consulting, digital transformation planning, system architecture reviews, and technical due diligence.",
                    ],
                },
            ],
            note: "The specific scope, deliverables, timelines, and pricing of project-based services are governed by individual Statements of Work (SOW) or service agreements executed between Vernovate and the client.",
        },
        {
            id: "user-accounts",
            icon: User,
            title: "3. User Accounts & Registration",
            content: [],
            subsections: [
                {
                    title: "3.1 Account Creation",
                    items: [
                        "Certain features of our Services may require you to create an account. You must provide accurate, current, and complete information during registration.",
                        "You are responsible for maintaining the confidentiality of your account credentials (email and password).",
                        "You agree to immediately notify Vernovate of any unauthorized use of your account or any other breach of security.",
                    ],
                },
                {
                    title: "3.2 Account Responsibilities",
                    items: [
                        "You are solely responsible for all activities that occur under your account, whether or not authorized by you.",
                        "Vernovate reserves the right to suspend or terminate accounts that violate these Terms or exhibit suspicious activity.",
                        "You may not create multiple accounts for deceptive or abusive purposes.",
                        "Accounts are non-transferable. You may not sell, assign, or transfer your account to any third party.",
                    ],
                },
                {
                    title: "3.3 Session Management",
                    items: [
                        "For security purposes, user sessions may automatically expire after a period of inactivity. You may be required to re-authenticate to continue using the Services.",
                        "We employ secure, token-based authentication mechanisms and encourage users to use strong, unique passwords.",
                    ],
                },
            ],
        },
        {
            id: "intellectual-property",
            icon: Shield,
            title: "4. Intellectual Property Rights",
            content: [],
            subsections: [
                {
                    title: "4.1 Vernovate's Intellectual Property",
                    items: [
                        "All content, features, and functionality on the Site—including but not limited to text, graphics, logos, icons, images, audio, video, software, source code, designs, trademarks, trade names, and service marks—are owned by or licensed to Vernovate and are protected by Indian and international copyright, trademark, patent, trade secret, and other intellectual property laws.",
                        "The Vernovate name, logo, and all related names, logos, product and service names, designs, and slogans are trademarks of Vernovate Private Limited. You may not use such marks without our prior written permission.",
                    ],
                },
                {
                    title: "4.2 Client Deliverables",
                    items: [
                        "Unless otherwise specified in a separate written agreement or SOW, upon full payment for services rendered, the client shall receive ownership of the final deliverables (e.g., custom-built software, applications, designs) created specifically for them.",
                        "Vernovate retains ownership of all proprietary frameworks, libraries, tools, methodologies, and pre-existing intellectual property used in the creation of deliverables. The client receives a non-exclusive, non-transferable license to use such components as part of their deliverables.",
                        "Vernovate reserves the right to use general knowledge, skills, experience, and techniques acquired during the performance of services.",
                    ],
                },
                {
                    title: "4.3 User Content",
                    items: [
                        "You retain ownership of any content you submit, post, or display through our Services (e.g., project requirements, briefs, feedback).",
                        "By submitting content, you grant Vernovate a non-exclusive, worldwide, royalty-free license to use, store, and process such content solely for the purpose of providing the Services.",
                    ],
                },
            ],
        },
        {
            id: "prohibited-conduct",
            icon: Ban,
            title: "5. Prohibited Conduct",
            content: [
                `When using our Services, you agree NOT to:`,
            ],
            subsections: [
                {
                    title: "",
                    items: [
                        "Use the Services for any unlawful purpose or in violation of any applicable local, state, national, or international law or regulation.",
                        "Attempt to gain unauthorized access to, interfere with, damage, or disrupt any parts of the Services, the servers on which the Services are stored, or any third-party systems connected to the Services.",
                        "Use any automated system, including robots, spiders, scrapers, or similar tools, to access the Services for any purpose without our express written permission.",
                        "Transmit any viruses, worms, defects, Trojan horses, malware, or any items of a destructive nature.",
                        "Impersonate or attempt to impersonate Vernovate, a Vernovate employee, another user, or any other person or entity.",
                        "Upload, post, or transmit any content that is infringing, defamatory, obscene, harassing, threatening, or otherwise objectionable.",
                        "Reverse engineer, decompile, disassemble, or otherwise attempt to derive the source code of our proprietary software or technology.",
                        "Interfere with or circumvent any security features of the Services, including any digital rights management mechanism, device, or other content protection system.",
                        "Use the Services to send unsolicited commercial communications (spam) or engage in any form of phishing.",
                        "Resell, sublicense, or redistribute any part of the Services without explicit written consent from Vernovate.",
                    ],
                },
            ],
        },
        {
            id: "payment-terms",
            icon: CreditCard,
            title: "6. Payment Terms & Billing",
            content: [],
            subsections: [
                {
                    title: "6.1 Pricing & Invoicing",
                    items: [
                        "All project-based services are quoted and invoiced in Indian Rupees (INR) unless otherwise specified in the SOW.",
                        "Payment terms, milestones, and schedules shall be as set forth in the applicable SOW or service agreement.",
                        "Vernovate reserves the right to modify pricing for future services at any time. Any changes will not affect existing contracts or SOWs already in effect.",
                    ],
                },
                {
                    title: "6.2 Payment Methods",
                    items: [
                        "We accept payments via bank transfer (NEFT/RTGS/IMPS), UPI, and other payment methods as mutually agreed.",
                        "All payments are due within the time frame specified on the invoice (typically Net 15 or Net 30 days).",
                    ],
                },
                {
                    title: "6.3 Late Payments",
                    items: [
                        "Invoices not paid within the specified due date may be subject to a late fee of 1.5% per month (or the maximum rate permitted by applicable law, whichever is lower).",
                        "Vernovate reserves the right to suspend services for accounts with overdue payments exceeding 30 days until all outstanding amounts are settled.",
                    ],
                },
                {
                    title: "6.4 Taxes",
                    items: [
                        "All fees are exclusive of applicable taxes, including Goods and Services Tax (GST). The client shall be responsible for all applicable taxes as required by Indian tax law.",
                    ],
                },
            ],
        },
        {
            id: "project-engagement",
            icon: RefreshCw,
            title: "7. Project Engagement & Delivery",
            content: [],
            subsections: [
                {
                    title: "7.1 Project Initiation",
                    items: [
                        "All projects commence only after a signed SOW or service agreement and receipt of the agreed-upon advance payment (if applicable).",
                        "The client agrees to provide timely access to required information, systems, and resources necessary for project execution.",
                    ],
                },
                {
                    title: "7.2 Change Requests",
                    items: [
                        "Any changes to the project scope, requirements, or specifications after the SOW is executed shall be documented in a written Change Order.",
                        "Change Orders may result in adjustments to project timelines, costs, and deliverables, which shall be mutually agreed upon before implementation.",
                    ],
                },
                {
                    title: "7.3 Acceptance & Testing",
                    items: [
                        "Upon delivery of a milestone or final deliverable, the client shall have a review period (as specified in the SOW, typically 7–14 business days) to accept or raise issues.",
                        "If the client fails to respond within the review period, the deliverable shall be deemed accepted.",
                        "Bug fixes and defect remediations during the warranty period (if applicable) are handled at no additional cost, provided they fall within the original project scope.",
                    ],
                },
                {
                    title: "7.4 Warranty & Support",
                    items: [
                        "Vernovate provides a limited warranty period (typically 30–90 days, as specified in the SOW) post-delivery for bug fixes related to the original scope.",
                        "Ongoing support, maintenance, and enhancements beyond the warranty period are governed by separate support agreements.",
                    ],
                },
            ],
        },
        {
            id: "confidentiality",
            icon: Shield,
            title: "8. Confidentiality",
            content: [
                `Both parties agree to maintain the confidentiality of any proprietary or confidential information disclosed during the course of the engagement. "Confidential Information" includes, but is not limited to, business plans, technical specifications, trade secrets, client data, financial information, source code, and system architectures.`,
            ],
            subsections: [
                {
                    title: "",
                    items: [
                        "Confidential Information shall not be disclosed to any third party without the disclosing party's prior written consent.",
                        "This confidentiality obligation survives the termination or expiration of these Terms and any associated service agreements for a period of 3 years.",
                        "Exceptions include information that: (a) is or becomes publicly available through no fault of the receiving party; (b) was known to the receiving party prior to disclosure; (c) is independently developed without use of the Confidential Information; or (d) is required to be disclosed by law or court order.",
                    ],
                },
            ],
        },
        {
            id: "limitation-of-liability",
            icon: AlertTriangle,
            title: "9. Limitation of Liability",
            content: [
                `TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW:`,
            ],
            subsections: [
                {
                    title: "",
                    items: [
                        'THE SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. VERNOVATE MAKES NO WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.',
                        "IN NO EVENT SHALL VERNOVATE, ITS DIRECTORS, EMPLOYEES, PARTNERS, AGENTS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.",
                        "VERNOVATE'S TOTAL AGGREGATE LIABILITY FOR ALL CLAIMS ARISING OUT OF OR RELATING TO THESE TERMS OR THE SERVICES SHALL NOT EXCEED THE TOTAL AMOUNT PAID BY YOU TO VERNOVATE IN THE TWELVE (12) MONTHS PRECEDING THE EVENT GIVING RISE TO THE CLAIM.",
                        "THIS LIMITATION OF LIABILITY APPLIES WHETHER THE ALLEGED LIABILITY IS BASED ON CONTRACT, TORT, NEGLIGENCE, STRICT LIABILITY, OR ANY OTHER BASIS, EVEN IF VERNOVATE HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.",
                    ],
                },
            ],
        },
        {
            id: "indemnification",
            icon: Shield,
            title: "10. Indemnification",
            content: [
                `You agree to indemnify, defend, and hold harmless Vernovate and its officers, directors, employees, agents, licensors, and suppliers from and against all claims, liabilities, damages, judgments, awards, losses, costs, expenses, and fees (including reasonable attorneys' fees) arising out of or relating to:`,
            ],
            subsections: [
                {
                    title: "",
                    items: [
                        "Your violation of these Terms or applicable law.",
                        "Your use of the Services, including any data or content transmitted or submitted by you.",
                        "Any third-party claims arising from your use of the deliverables.",
                        "Your negligence or willful misconduct.",
                    ],
                },
            ],
        },
        {
            id: "termination",
            icon: Clock,
            title: "11. Termination",
            content: [],
            subsections: [
                {
                    title: "11.1 Termination by User",
                    items: [
                        "You may stop using our Services at any time. To delete your account, contact us at vernovate@gmail.com.",
                        "Termination of your account does not release you from any payment obligations for services already rendered.",
                    ],
                },
                {
                    title: "11.2 Termination by Vernovate",
                    items: [
                        "We may suspend or terminate your access to the Services at any time, with or without cause, and with or without notice. Reasons for termination include, but are not limited to, violation of these Terms, non-payment, or conduct that we determine to be harmful to other users or the integrity of our Services.",
                    ],
                },
                {
                    title: "11.3 Effects of Termination",
                    items: [
                        "Upon termination, your right to access and use the Services will immediately cease.",
                        "Sections that by their nature should survive termination shall continue in full force and effect, including Intellectual Property, Confidentiality, Limitation of Liability, Indemnification, and Governing Law.",
                        "Vernovate will make reasonable efforts to provide you with a copy of your data upon request, subject to applicable laws.",
                    ],
                },
            ],
        },
        {
            id: "governing-law",
            icon: Gavel,
            title: "12. Governing Law & Dispute Resolution",
            content: [],
            subsections: [
                {
                    title: "12.1 Governing Law",
                    items: [
                        "These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.",
                    ],
                },
                {
                    title: "12.2 Dispute Resolution",
                    items: [
                        "Any dispute, controversy, or claim arising out of or relating to these Terms, or the breach, termination, or invalidity thereof, shall first be settled through good-faith negotiation between the parties.",
                        "If the dispute cannot be resolved through negotiation within 30 days, either party may refer the matter to binding arbitration under the Arbitration and Conciliation Act, 1996 (India), with the seat of arbitration in Guwahati, Assam.",
                        "The arbitration shall be conducted in English by a sole arbitrator mutually appointed by the parties.",
                        "The courts of Guwahati, Assam, India shall have exclusive jurisdiction over any disputes not subject to arbitration.",
                    ],
                },
            ],
        },
        {
            id: "general-provisions",
            icon: FileText,
            title: "13. General Provisions",
            content: [],
            subsections: [
                {
                    title: "",
                    items: [
                        "Entire Agreement: These Terms, together with the Privacy Policy and any SOWs, constitute the entire agreement between you and Vernovate regarding the Services and supersede all prior agreements and understandings.",
                        "Severability: If any provision of these Terms is found to be invalid or unenforceable by a court of competent jurisdiction, the remaining provisions shall continue in full force and effect.",
                        "Waiver: The failure of Vernovate to enforce any right or provision of these Terms shall not constitute a waiver of such right or provision.",
                        "Assignment: You may not assign or transfer your rights or obligations under these Terms without the prior written consent of Vernovate. Vernovate may freely assign its rights and obligations under these Terms.",
                        "Force Majeure: Neither party shall be liable for any delay or failure to perform resulting from causes beyond the reasonable control of such party, including but not limited to acts of God, war, terrorism, pandemics, government restrictions, internet or telecommunications failures, or power outages.",
                        "Notices: All notices under these Terms shall be in writing and delivered via email to the addresses provided during registration or as updated by either party.",
                    ],
                },
            ],
        },
        {
            id: "modifications",
            icon: RefreshCw,
            title: "14. Modifications to Terms",
            content: [
                `Vernovate reserves the right to revise and update these Terms at any time. Any changes will be effective immediately upon posting the revised Terms on our website, with an updated "Last Updated" date.`,
                `Material changes to these Terms will be communicated via email notification or a prominent notice on our website at least 15 days before they take effect.`,
                `Your continued use of the Services after the effective date of any changes constitutes your acceptance of the revised Terms. If you do not agree to the modified Terms, you should discontinue use of the Services.`,
            ],
        },
        {
            id: "contact",
            icon: Mail,
            title: "15. Contact Information",
            content: [
                `For any questions, concerns, or notices regarding these Terms of Service, please contact us:`,
            ],
            contactInfo: true,
        },
    ];

    return (
        <div className="min-h-screen pt-28 md:pt-16">
            <SEO
                title="Terms of Service"
                path="/terms"
                description="Vernovate Pvt Ltd Terms of Service — the terms and conditions governing use of our website and software services."
                keywords="Vernovate terms of service, terms and conditions, legal, user agreement"
            />

            {/* Hero */}
            <section className="relative pt-20 pb-12 md:pt-24 md:pb-16 overflow-hidden">
                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-vernovate-primary/10 rounded-full mb-6">
                            <Scale size={16} className="text-vernovate-primary" />
                            <span className="text-xs font-bold text-vernovate-primary uppercase tracking-wider">Legal Document</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-black">Terms of Service</h1>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-4">
                            Please read these terms carefully before using our services. By accessing or using Vernovate's services, you agree to be bound by these terms.
                        </p>
                        <p className="text-sm text-gray-400 flex items-center justify-center gap-2">
                            <Calendar size={14} />
                            Effective Date: {lastUpdated}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Table of Contents */}
            <section className="py-8 bg-white border-b border-gray-100">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex flex-wrap gap-2 justify-center">
                            {sections.map((section) => (
                                <a
                                    key={section.id}
                                    href={`#${section.id}`}
                                    className="text-xs font-medium text-gray-500 hover:text-vernovate-primary hover:bg-vernovate-primary/5 px-3 py-1.5 rounded-full transition-colors border border-transparent hover:border-vernovate-primary/20"
                                >
                                    {section.title.replace(/^\d+\.\s*/, '')}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto space-y-16">
                        {sections.map((section) => {
                            const Icon = section.icon;
                            return (
                                <motion.div
                                    key={section.id}
                                    id={section.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    className="scroll-mt-32"
                                >
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-10 h-10 rounded-xl bg-vernovate-primary/10 flex items-center justify-center text-vernovate-primary shrink-0">
                                            <Icon size={20} />
                                        </div>
                                        <h2 className="text-2xl md:text-3xl font-bold text-black">{section.title}</h2>
                                    </div>

                                    <div className="space-y-4 pl-0 md:pl-13">
                                        {section.content.map((para, pIdx) => (
                                            <p key={pIdx} className="text-gray-600 leading-relaxed text-[15px]">{para}</p>
                                        ))}

                                        {section.subsections && section.subsections.map((sub, subIdx) => (
                                            <div key={subIdx} className="mt-6">
                                                {sub.title && (
                                                    <h3 className="text-lg font-semibold text-gray-800 mb-3">{sub.title}</h3>
                                                )}
                                                <ul className="space-y-3">
                                                    {sub.items.map((item, iIdx) => (
                                                        <li key={iIdx} className="flex items-start gap-3 text-gray-600 text-[15px] leading-relaxed">
                                                            <span className="w-1.5 h-1.5 rounded-full bg-vernovate-primary mt-2.5 shrink-0"></span>
                                                            <span>{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}

                                        {section.note && (
                                            <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-5">
                                                <div className="flex items-start gap-3">
                                                    <AlertTriangle size={18} className="text-amber-600 mt-0.5 shrink-0" />
                                                    <p className="text-sm text-amber-800 leading-relaxed">{section.note}</p>
                                                </div>
                                            </div>
                                        )}

                                        {section.contactInfo && (
                                            <div className="mt-6 bg-gray-50 rounded-2xl p-8 border border-gray-100">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div>
                                                        <p className="font-semibold text-gray-900 mb-1">Vernovate Private Limited</p>
                                                        <p className="text-sm text-gray-600">Mamani Sarma Mechpara, Part 1, D.K. Road</p>
                                                        <p className="text-sm text-gray-600">Gossaigaon, Kokrajhar, Assam 783360, India</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-600 mb-2">
                                                            <span className="font-semibold text-gray-900">Email:</span>{' '}
                                                            <a href="mailto:vernovate@gmail.com" className="text-vernovate-primary hover:underline">vernovate@gmail.com</a>
                                                        </p>
                                                        <p className="text-sm text-gray-600 mb-2">
                                                            <span className="font-semibold text-gray-900">Incubation:</span>{' '}
                                                            Down Town Venture Labs (DTVL), AdtU, Guwahati
                                                        </p>
                                                        <p className="text-sm text-gray-600">
                                                            <span className="font-semibold text-gray-900">Website:</span>{' '}
                                                            <a href="https://vernovate.com" className="text-vernovate-primary hover:underline">vernovate.com</a>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Bottom nav */}
            <section className="py-10 bg-gray-50 border-t border-gray-100">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-sm text-gray-500 mb-4">Also review our</p>
                    <Link
                        to="/privacy"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-xl text-sm font-semibold hover:bg-gray-800 transition-colors"
                    >
                        <Shield size={16} />
                        Privacy Policy
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default TermsOfService;
