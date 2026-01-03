import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, url = "https://vernovate.com" }) => {
    const siteTitle = "Vernovate Pvt Ltd | Intelligent Systems & Software Solutions";
    const defaultDescription = "Vernovate Pvt Ltd is a premier software development startup incubated at dtvl, Assam Down Town University (AdtU), Guwahati. We specialize in AI, Web Development, and Intelligent Systems.";
    const defaultKeywords = "Vernovate Pvt Ltd, Software Company, AdtU Startup, dtvl incubation, Guwahati Tech, Assam Down Town University, Web Development, AI Solutions";

    // Structured Data for Knowledge Graph (Location & Organization)
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Vernovate Pvt Ltd",
        "url": url,
        "logo": "https://vernovate.com/logo.png",
        "description": description || defaultDescription,
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "down town Venture Labs (dtvl), Assam Down Town University",
            "addressLocality": "Guwahati",
            "addressRegion": "Assam",
            "postalCode": "781026",
            "addressCountry": "IN"
        },
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+91-1234567890",
            "contactType": "customer service",
            "email": "vernovate@gmail.com"
        },
        "sameAs": [
            "https://www.linkedin.com/company/vernovate",
            "https://github.com/ashupsingh/vernovate"
        ],
        "founder": [
            { "@type": "Person", "name": "Aditya Singh", "jobTitle": "CEO" },
            { "@type": "Person", "name": "Lungsom Lamnio", "jobTitle": "CTO" }
        ]
    };

    return (
        <Helmet>
            {/* Standard Meta Tags */}
            <title>{title ? `${title} | Vernovate` : siteTitle}</title>
            <meta name="description" content={description || defaultDescription} />
            <meta name="keywords" content={keywords || defaultKeywords} />
            <meta name="google-site-verification" content="08zZoGJMhWLR8OTc1Ug_PWpVfvGqq8WTu940R7ukndU" />
            <link rel="canonical" href={url} />

            {/* Open Graph / Facebook / LinkedIn */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={title || siteTitle} />
            <meta property="og:description" content={description || defaultDescription} />
            <meta property="og:image" content="https://vernovate.com/og-image.png" />
            <meta property="og:site_name" content="Vernovate" />
            <meta property="og:locale" content="en_IN" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={url} />
            <meta name="twitter:title" content={title || siteTitle} />
            <meta name="twitter:description" content={description || defaultDescription} />
            <meta name="twitter:image" content="https://vernovate.com/og-image.png" />

            {/* Structured Data (JSON-LD) */}
            <script type="application/ld+json">
                {JSON.stringify(structuredData)}
            </script>
        </Helmet>
    );
};

export default SEO;
