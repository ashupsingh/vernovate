import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, Eye, Database, Lock, UserCheck, Globe, Mail, Calendar, FileText, AlertTriangle } from 'lucide-react';
import SEO from '../components/SEO';

const PrivacyPolicy = () => {
    const lastUpdated = "February 23, 2025";

    const sections = [
        {
            id: "introduction",
            icon: FileText,
            title: "1. Introduction",
            content: [
                `Vernovate Private Limited ("Vernovate," "we," "us," or "our") is committed to protecting the privacy and security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website vernovate.com (the "Site"), use our services, or engage with us in any capacity.`,
                `By accessing or using our Site and services, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy. If you do not agree with the terms of this Privacy Policy, please do not access the Site or use our services.`,
                `This Policy applies to all visitors, users, clients, and others who access or use the Site and services offered by Vernovate.`,
            ],
        },
        {
            id: "information-we-collect",
            icon: Database,
            title: "2. Information We Collect",
            content: [
                `We collect information that you provide directly to us, as well as data collected automatically when you interact with our Site.`,
            ],
            subsections: [
                {
                    title: "2.1 Personal Information Provided Voluntarily",
                    items: [
                        "Full name, email address, phone number, and company name when you fill out contact forms, project inquiry forms, or career application forms.",
                        "Login credentials (email and password) when you create an account on our platform.",
                        "Billing and payment information when you engage our services under a contract.",
                        "Résumé, CV, portfolio links, and professional qualifications submitted through our careers page.",
                        "Any other information you voluntarily provide through communication with our team.",
                    ],
                },
                {
                    title: "2.2 Information Collected Automatically",
                    items: [
                        "Device information: browser type, operating system, device identifiers, and screen resolution.",
                        "Usage data: pages visited, time spent on pages, click patterns, and navigation paths.",
                        "IP address and approximate geographic location derived from your IP.",
                        "Cookies and similar tracking technologies (see Section 7 for our Cookie Policy).",
                        "Referral URLs and information about how you arrived at our Site.",
                    ],
                },
                {
                    title: "2.3 Information from Third Parties",
                    items: [
                        "We may receive information about you from third-party services integrated with our platform, such as analytics providers, advertising partners, or social media platforms, in accordance with their respective privacy policies.",
                    ],
                },
            ],
        },
        {
            id: "how-we-use",
            icon: Eye,
            title: "3. How We Use Your Information",
            content: [
                `We use the information we collect for the following purposes:`,
            ],
            subsections: [
                {
                    title: "3.1 Service Delivery & Operations",
                    items: [
                        "To provide, maintain, and improve our services, including software development, AI/ML solutions, IoT systems, and enterprise platforms.",
                        "To process and respond to your inquiries, project requests, and support tickets.",
                        "To manage your account and authenticate your identity.",
                        "To deliver project updates, invoices, and service-related communications.",
                    ],
                },
                {
                    title: "3.2 Communication",
                    items: [
                        "To send you transactional emails, including order confirmations, project milestones, and account notifications.",
                        "To respond to your messages submitted through our contact or application forms.",
                        "To send you marketing communications, newsletters, or promotional materials (only with your explicit consent, and you may opt out at any time).",
                    ],
                },
                {
                    title: "3.3 Analytics & Improvement",
                    items: [
                        "To analyze usage patterns and trends to improve our website's functionality and user experience.",
                        "To conduct research and development to enhance our products and service offerings.",
                        "To monitor and prevent fraudulent activity, security threats, and policy violations.",
                    ],
                },
                {
                    title: "3.4 Legal & Compliance",
                    items: [
                        "To comply with applicable laws, regulations, legal processes, or enforceable governmental requests.",
                        "To enforce our Terms of Service, protect our rights, and defend against legal claims.",
                    ],
                },
            ],
        },
        {
            id: "data-sharing",
            icon: UserCheck,
            title: "4. Data Sharing & Disclosure",
            content: [
                `We do not sell, rent, or trade your personal information to third parties for their marketing purposes. We may share your information in the following limited circumstances:`,
            ],
            subsections: [
                {
                    title: "",
                    items: [
                        "Service Providers: We may share data with trusted third-party vendors who assist us in operating our website, conducting business, or servicing clients (e.g., cloud hosting providers, email service providers, analytics tools), provided they agree to keep your information confidential.",
                        "Business Transfers: In the event of a merger, acquisition, reorganization, or sale of assets, your information may be transferred as part of the transaction. We will notify you of any such change in ownership or control of your personal information.",
                        "Legal Requirements: We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., a court order or government agency).",
                        "Protection of Rights: When we believe in good faith that disclosure is necessary to protect our rights, your safety, or the safety of others, investigate fraud, or respond to a government request.",
                        "With Your Consent: We may share your information for any other purpose with your explicit consent.",
                    ],
                },
            ],
        },
        {
            id: "data-security",
            icon: Lock,
            title: "5. Data Security",
            content: [
                `We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. These measures include, but are not limited to:`,
            ],
            subsections: [
                {
                    title: "",
                    items: [
                        "SSL/TLS encryption for all data transmitted between your browser and our servers.",
                        "Secure password hashing using bcrypt with salt rounds for stored credentials.",
                        "Role-based access control (RBAC) to restrict internal access to personal data on a need-to-know basis.",
                        "Regular security audits, vulnerability assessments, and penetration testing.",
                        "Automated session expiration and secure token-based authentication (JWT).",
                        "Data stored on encrypted, SOC 2-compliant cloud infrastructure.",
                    ],
                },
            ],
            note: "While we strive to use commercially acceptable means to protect your personal information, no method of transmission over the Internet or method of electronic storage is 100% secure. We cannot guarantee absolute security.",
        },
        {
            id: "your-rights",
            icon: UserCheck,
            title: "6. Your Rights & Choices",
            content: [
                `Depending on your location, you may have the following rights regarding your personal information:`,
            ],
            subsections: [
                {
                    title: "",
                    items: [
                        "Right to Access: You may request a copy of the personal data we hold about you.",
                        "Right to Rectification: You may request correction of any inaccurate or incomplete personal data.",
                        "Right to Erasure: You may request deletion of your personal data, subject to certain legal exceptions.",
                        "Right to Restrict Processing: You may request that we limit how we use your personal data.",
                        "Right to Data Portability: You may request a copy of your data in a structured, machine-readable format.",
                        "Right to Object: You may object to processing of your personal data for direct marketing purposes.",
                        "Right to Withdraw Consent: Where we rely on your consent to process personal data, you may withdraw that consent at any time.",
                    ],
                },
            ],
            note: "To exercise any of these rights, please contact us at vernovate@gmail.com. We will respond to your request within 30 days in accordance with applicable law.",
        },
        {
            id: "cookies",
            icon: Globe,
            title: "7. Cookies & Tracking Technologies",
            content: [
                `Our Site uses cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and personalize content.`,
            ],
            subsections: [
                {
                    title: "Types of Cookies We Use",
                    items: [
                        "Essential Cookies: Required for the Site to function properly (e.g., session management, authentication).",
                        "Analytics Cookies: Help us understand how visitors interact with our Site through aggregate data collection.",
                        "Functional Cookies: Remember your preferences and settings to provide a personalized experience.",
                    ],
                },
            ],
            note: "You can manage your cookie preferences through your browser settings. Please note that disabling certain cookies may affect the functionality of our Site.",
        },
        {
            id: "third-party",
            icon: Globe,
            title: "8. Third-Party Links & Services",
            content: [
                `Our Site may contain links to third-party websites, plugins, and applications. Clicking on those links or enabling those connections may allow third parties to collect or share data about you. We do not control these third-party websites and are not responsible for their privacy practices or content.`,
                `We encourage you to review the privacy policy of every third-party site you visit before providing any personal information.`,
            ],
        },
        {
            id: "data-retention",
            icon: Calendar,
            title: "9. Data Retention",
            content: [
                `We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. Specific retention periods include:`,
            ],
            subsections: [
                {
                    title: "",
                    items: [
                        "Account Data: Retained for the duration of your account's active status, plus 90 days after account deletion for recovery purposes.",
                        "Contact Form Submissions: Retained for up to 2 years after the last interaction.",
                        "Career Applications: Retained for up to 1 year after the position is filled or your application is processed.",
                        "Financial Records: Retained for 7 years in accordance with Indian tax and accounting regulations.",
                        "Analytics Data: Aggregated and anonymized data may be retained indefinitely for statistical purposes.",
                    ],
                },
            ],
        },
        {
            id: "childrens-privacy",
            icon: Shield,
            title: "10. Children's Privacy",
            content: [
                `Our Site and services are not intended for individuals under the age of 18. We do not knowingly collect personal information from minors. If we become aware that we have inadvertently collected personal data from a child under 18, we will take steps to delete such information as promptly as possible.`,
                `If you are a parent or guardian and believe that your child has provided personal information to us, please contact us immediately at vernovate@gmail.com.`,
            ],
        },
        {
            id: "international-transfers",
            icon: Globe,
            title: "11. International Data Transfers",
            content: [
                `Vernovate is headquartered in Assam, India. Your information may be processed and stored on servers located in India and other jurisdictions. By using our Site and services, you consent to the transfer of your information to India and other countries that may have different data protection laws than your jurisdiction.`,
                `We ensure that any international transfers of personal data are conducted in compliance with applicable data protection laws, including the implementation of appropriate safeguards such as standard contractual clauses or equivalent mechanisms.`,
            ],
        },
        {
            id: "changes",
            icon: FileText,
            title: "12. Changes to This Privacy Policy",
            content: [
                `We reserve the right to update or modify this Privacy Policy at any time. When we make changes, we will update the "Last Updated" date at the top of this page and, where appropriate, notify you via email or a prominent notice on our Site.`,
                `Your continued use of the Site and services after any modifications to the Privacy Policy constitutes your acknowledgment and acceptance of the modified policy. We encourage you to review this Privacy Policy periodically.`,
            ],
        },
        {
            id: "contact",
            icon: Mail,
            title: "13. Contact Us",
            content: [
                `If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:`,
            ],
            contactInfo: true,
        },
    ];

    return (
        <div className="min-h-screen pt-28 md:pt-16">
            <SEO
                title="Privacy Policy"
                path="/privacy"
                description="Vernovate Pvt Ltd Privacy Policy — how we collect, use, store, and protect your personal information. GDPR and IT Act compliant."
                keywords="Vernovate privacy policy, data protection, personal information, GDPR, IT Act compliance"
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
                            <Shield size={16} className="text-vernovate-primary" />
                            <span className="text-xs font-bold text-vernovate-primary uppercase tracking-wider">Legal Document</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-black">Privacy Policy</h1>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto mb-4">
                            Your privacy is important to us. This policy outlines how Vernovate Private Limited collects, uses, and protects your information.
                        </p>
                        <p className="text-sm text-gray-400 flex items-center justify-center gap-2">
                            <Calendar size={14} />
                            Last Updated: {lastUpdated}
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
                        {sections.map((section, sIdx) => {
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
                        to="/terms"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-xl text-sm font-semibold hover:bg-gray-800 transition-colors"
                    >
                        <FileText size={16} />
                        Terms of Service
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default PrivacyPolicy;
