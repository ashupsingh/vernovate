import { Code, Cpu, Globe, Activity, BarChart, Server } from 'lucide-react';

export const servicesData = [
    {
        id: 'software-development',
        title: "Software Development",
        icon: Code,
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop",
        shortDescription: "End-to-end custom software solutions, from web apps to enterprise platforms.",
        fullDescription: "We build robust, scalable, and secure software tailored to your unique business needs. Our full-cycle development services cover everything from conceptualization and design to engineering, deployment, and maintenance.",
        features: [
            "Custom Web Application Development",
            "Enterprise Resource Planning (ERP) Systems",
            "Mobile App Development (iOS & Android)",
            "Cloud-Native Solutions",
            "API Integration & Development"
        ],
        benefits: [
            "Streamline business operations with tailored tools.",
            "Enhance user engagement with intuitive interfaces.",
            "Scale effortlessly with cloud-first architecture."
        ],
        faqs: [
            {
                question: "Do you build custom software from scratch?",
                answer: "Yes, we specialize in building bespoke software solutions tailored exactly to your business requirements, ensuring complete ownership and flexibility."
            },
            {
                question: "What technologies do you use?",
                answer: "We use a modern tech stack including React, Node.js, Python, and cloud services like AWS and Azure to build scalable and secure applications."
            },
            {
                question: "Do you provide post-launch support?",
                answer: "Absolutely. We offer ongoing maintenance and support packages to ensure your software remains updated, secure, and performs optimally."
            }
        ]
    },
    {
        id: 'ai-machine-learning',
        title: "AI & Machine Learning",
        icon: Cpu,
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2065&auto=format&fit=crop",
        shortDescription: "Predictive analytics, NLP, and computer vision models tailored to your data.",
        fullDescription: "Unlock the power of your data with our advanced Artificial Intelligence and Machine Learning solutions. We help businesses automate complex processes, predict trends, and gain deeper insights into customer behavior.",
        features: [
            "Predictive Analytics & Forecasting",
            "Natural Language Processing (NLP)",
            "Computer Vision & Image Recognition",
            "Recommendation Engines",
            "Automated Workflows & Chatbots"
        ],
        benefits: [
            "make data-driven decisions with high accuracy.",
            "Automate repetitive tasks to save time and costs.",
            "Personalize customer experiences at scale."
        ],
        faqs: [
            {
                question: "How can AI help my business?",
                answer: "AI can automate routine tasks, provide deep insights into customer behavior, predict market trends, and enhance decision-making accuracy."
            },
            {
                question: "Do I need a lot of data to start with AI?",
                answer: "Not necessarily. While more data is better, we can start with small datasets or use pre-trained models to deliver immediate value while building your data pipeline."
            },
            {
                question: "Is AI integration secure?",
                answer: "Security is our top priority. We implement strict data encryption and comply with privacy regulations to ensure your data remains safe throughout the AI lifecycle."
            }
        ]
    },
    {
        id: 'iot-embedded-systems',
        title: "IoT & Embedded Systems",
        icon: Globe,
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop",
        shortDescription: "Smart device integration and real-time monitoring ecosystems.",
        fullDescription: "Connect the physical and digital worlds with our Internet of Things (IoT) solutions. We design and develop smart ecosystems that enable real-time monitoring, control, and data collection from connected devices.",
        features: [
            "IoT Architecture Design",
            "Smart Home & Industrial IoT Solutions",
            "Real-time Remote Monitoring",
            "Embedded Firmware Development",
            "Sensor Data Integration"
        ],
        benefits: [
            "Improve operational efficiency through real-time tracking.",
            "Reduce maintenance costs with predictive alerts.",
            "Create new business models based on connectivity."
        ],
        faqs: [
            {
                question: "What industries can benefit from IoT?",
                answer: "IoT transforms industries like manufacturing, healthcare, logistics, and smart homes by enabling real-time monitoring and automation."
            },
            {
                question: "Can you upgrade existing non-smart devices?",
                answer: "Yes, we can retro-fit legacy equipment with sensors and connectivity modules to bring them into a modern IoT ecosystem."
            },
            {
                question: "How do you handle IoT security?",
                answer: "We secure every layer of the IoT stack, from device firmware to cloud communication, ensuring that your connected ecosystem is protected against cyber threats."
            }
        ]
    },
    {
        id: 'smart-city-solutions',
        title: "Smart City Solutions",
        icon: Server,
        image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=2070&auto=format&fit=crop",
        shortDescription: "Intelligent infrastructure management for traffic, utilities, and safety.",
        fullDescription: "Vernovate collaborates with municipalities and urban planners to build smarter, sustainable cities. Our technologies improve urban life through intelligent management of resources, traffic, and public services.",
        features: [
            "Smart Traffic Management Systems",
            "Intelligent Lighting Control",
            "Waste Management Optimization",
            "Public Safety Monitoring",
            "Utility Consumption Analytics"
        ],
        benefits: [
            "Reduce urban congestion and energy consumption.",
            "Enhance public safety and quality of life.",
            "Enable sustainable urban growth."
        ],
        faqs: [
            {
                question: "What is a Smart City solution?",
                answer: "It involves using technology and data to manage assets, resources, and services efficiently to improve the quality of life for citizens."
            },
            {
                question: "Do you work with government agencies?",
                answer: "Yes, we partner with municipal bodies and urban planners to deploy scalable technology infrastructure for cities."
            },
            {
                question: "Is your system scalable?",
                answer: "Our solutions are designed to scale from small districts to entire metropolitan areas, adapting to the growing needs of the city."
            }
        ]
    },
    {
        id: 'data-analytics',
        title: "Data Analytics",
        icon: BarChart,
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
        shortDescription: "Turning raw data into actionable insights with interactive dashboards.",
        fullDescription: "Transform raw data into a strategic asset. Our data analytics services help you visualize performance, identify inefficiencies, and discover new opportunities for growth.",
        features: [
            "Business Intelligence (BI) Dashboards",
            "Data Warehousing & ETL Processes",
            "Real-time Reporting",
            "Customer Behavior Analysis",
            "Market Trend Visualization"
        ],
        benefits: [
            "Gain a clear view of business performance.",
            "Identify hidden trends and opportunities.",
            "Democratize data access across your organization."
        ],
        faqs: [
            {
                question: "What kind of data can you analyze?",
                answer: "We can analyze structured and unstructured data from various sources including sales records, customer feedback, social media, and operational logs."
            },
            {
                question: "Which BI tools do you support?",
                answer: "We work with leading BI tools like Power BI, Tableau, and custom web-based dashboarding solutions tailored to your needs."
            },
            {
                question: "Can you help set up a data warehouse?",
                answer: "Yes, we design and implement robust data warehousing strategies to consolidate your data sources into a single source of truth."
            }
        ]
    },
    {
        id: 'healthcare-tech',
        title: "Healthcare Tech",
        icon: Activity,
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop",
        shortDescription: "Digital health platforms and patient monitoring systems.",
        fullDescription: "We innovate for the future of healthcare. Our digital health solutions prioritize patient care, data security, and interoperability to support medical professionals and institutions.",
        features: [
            "Telemedicine Platforms",
            "Electronic Health Records (EHR) Integration",
            "Remote Patient Monitoring (RPM)",
            "Medical IoT Systems",
            "Health Data Compliance (HIPAA/GDPR)"
        ],
        benefits: [
            "Improve patient access to care.",
            "Streamline clinical workflows.",
            "Ensure secure and compliant health data management."
        ],
        faqs: [
            {
                question: "Are your solutions HIPAA compliant?",
                answer: "Yes, all our healthcare software solutions are built with strict adherence to HIPAA and GDPR regulations to ensure patient data privacy."
            },
            {
                question: "Can you integrate with existing EHR systems?",
                answer: "We specialize in interoperability and can integrate our solutions with major EHR/EMR platforms like Epic, Cerner, and others."
            },
            {
                question: "Do you support telemedicine apps?",
                answer: "Yes, we build secure, high-quality video consultation platforms with integrated appointment scheduling and prescription management."
            }
        ]
    }
];
