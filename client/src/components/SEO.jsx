import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://www.vernovate.com';

const SEO = ({
    title,
    description,
    keywords,
    path = '/',
    type = 'website',
    image,
    noindex = false,
    structuredData: extraStructuredData,
}) => {
    const siteTitle = 'Vernovate Pvt Ltd | AI, IoT & Custom Software Development Company';
    const defaultDescription =
        'Vernovate Pvt Ltd is a technology company incubated at Down Town Venture Labs (DTVL), Assam Down Town University, Guwahati. We build AI/ML, IoT, and custom software solutions that are scalable, secure, and future-ready.';
    const defaultKeywords =
        'Vernovate, Vernovate Pvt Ltd, AI company India, Machine Learning, IoT development, custom software development, web development, Guwahati tech startup, Assam startup, DTVL, Assam Down Town University, intelligent systems, full stack development, React, Node.js, enterprise software, DST NIDHI, startup India';

    const fullTitle = title ? `${title} | Vernovate` : siteTitle;
    const canonicalUrl = `${SITE_URL}${path === '/' ? '' : path}`;
    const ogImage = image || `${SITE_URL}/og-image.png`;
    const metaDescription = description || defaultDescription;
    const metaKeywords = keywords || defaultKeywords;

    // Force document title update immediately
    useEffect(() => {
        document.title = fullTitle;
    }, [fullTitle]);

    // Organization structured data
    const organizationData = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Vernovate Pvt Ltd',
        alternateName: 'Vernovate',
        url: SITE_URL,
        logo: `${SITE_URL}/logo.png`,
        description: defaultDescription,
        foundingDate: '2024',
        address: {
            '@type': 'PostalAddress',
            streetAddress: 'Down Town Venture Labs (DTVL), Assam Down Town University',
            addressLocality: 'Guwahati',
            addressRegion: 'Assam',
            postalCode: '781026',
            addressCountry: 'IN',
        },
        contactPoint: {
            '@type': 'ContactPoint',
            email: 'vernovate@gmail.com',
            contactType: 'customer service',
            areaServed: ['IN', 'US', 'GB', 'AE'],
            availableLanguage: ['English', 'Hindi'],
        },
        sameAs: [
            'https://www.linkedin.com/company/vernovate-pvt-ltd-page/',
            'https://www.instagram.com/vernovate/',
            'https://github.com/ashupsingh/vernovate',
        ],
        founder: [
            { '@type': 'Person', name: 'Aditya Singh', jobTitle: 'CEO & Founder' },
            { '@type': 'Person', name: 'Lungsom Lamnio', jobTitle: 'CTO & Founder' },
        ],
        knowsAbout: [
            'Artificial Intelligence',
            'Machine Learning',
            'Internet of Things',
            'Custom Software Development',
            'Web Application Development',
            'Cloud Computing',
            'UI/UX Design',
            'Data Analytics',
            'Smart Agriculture',
            'Digital Transformation',
        ],
    };

    // WebPage structured data (per-page)
    const webPageData = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: fullTitle,
        description: metaDescription,
        url: canonicalUrl,
        isPartOf: { '@type': 'WebSite', name: 'Vernovate', url: SITE_URL },
        publisher: { '@type': 'Organization', name: 'Vernovate Pvt Ltd', url: SITE_URL },
    };

    return (
        <Helmet>
            {/* Standard Meta Tags */}
            <title>{fullTitle}</title>
            <meta name="description" content={metaDescription} />
            <meta name="keywords" content={metaKeywords} />
            {noindex ? (
                <meta name="robots" content="noindex, nofollow" />
            ) : (
                <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
            )}
            <link rel="canonical" href={canonicalUrl} />

            {/* Open Graph / Facebook / LinkedIn */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:alt" content={fullTitle} />
            <meta property="og:site_name" content="Vernovate" />
            <meta property="og:locale" content="en_IN" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={canonicalUrl} />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={metaDescription} />
            <meta name="twitter:image" content={ogImage} />
            <meta name="twitter:image:alt" content={fullTitle} />

            {/* Structured Data — Organization (only on homepage) */}
            {path === '/' && (
                <script type="application/ld+json">
                    {JSON.stringify(organizationData)}
                </script>
            )}

            {/* Structured Data — WebPage (every page) */}
            <script type="application/ld+json">
                {JSON.stringify(webPageData)}
            </script>

            {/* Optional extra structured data from page */}
            {extraStructuredData && (
                <script type="application/ld+json">
                    {JSON.stringify(extraStructuredData)}
                </script>
            )}
        </Helmet>
    );
};

export default SEO;
