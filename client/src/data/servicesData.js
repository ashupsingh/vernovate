import { Code, Cpu, Globe, Activity, BarChart, Server } from 'lucide-react';

export const servicesData = [
    {
        id: 'software-development',
        title: "Software Development",
        icon: Code,
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop",
        shortDescription: "End-to-end custom software solutions, from web apps to enterprise platforms.",
        fullDescription: "We build robust, scalable, and secure software tailored to your unique business needs. Our full-cycle development services cover everything from conceptualization and design to engineering, deployment, and maintenance. Whether you need a sleek customer-facing web application, a powerful internal enterprise tool, or a cross-platform mobile app, our team of experienced developers brings your vision to life with clean code and modern architecture. We follow agile methodologies to ensure rapid delivery, continuous feedback, and high-quality results that evolve with your business.",
        features: [
            "Custom Web Application Development",
            "Enterprise Resource Planning (ERP) Systems",
            "Mobile App Development (iOS & Android)",
            "Cloud-Native Solutions & Microservices",
            "API Integration & Development",
            "Progressive Web Apps (PWA)",
            "Legacy System Modernization",
            "DevOps & CI/CD Pipeline Setup"
        ],
        benefits: [
            "Streamline business operations with tailored tools designed for your specific workflows.",
            "Enhance user engagement with intuitive, responsive interfaces across all devices.",
            "Scale effortlessly with cloud-first architecture built for growth.",
            "Reduce time-to-market with agile sprints and rapid prototyping.",
            "Lower total cost of ownership through modern, maintainable codebases."
        ],
        faqs: [
            {
                question: "Do you build custom software from scratch?",
                answer: "Yes, we specialize in building bespoke software solutions tailored exactly to your business requirements. From initial consultation and wireframing to development, testing, and deployment, we ensure complete ownership and flexibility at every stage."
            },
            {
                question: "What technologies do you use?",
                answer: "We use a modern tech stack including React, Next.js, Node.js, Python, and cloud services like AWS, Azure, and Google Cloud. We also work with databases like PostgreSQL, MongoDB, and Redis to build highly scalable and secure applications."
            },
            {
                question: "Do you provide post-launch support?",
                answer: "Absolutely. We offer ongoing maintenance and support packages including bug fixes, performance optimization, security updates, and feature enhancements to ensure your software remains updated and performs optimally."
            },
            {
                question: "Can you modernize our legacy software?",
                answer: "Yes, we specialize in legacy system modernization. We can re-architect monolithic applications into microservices, migrate on-premise systems to the cloud, and upgrade outdated tech stacks — all while minimizing downtime and preserving your existing data."
            },
            {
                question: "What is your development process like?",
                answer: "We follow an Agile/Scrum methodology with 2-week sprints, daily standups, and regular demos. This ensures transparency, rapid iteration, and continuous delivery of value throughout the project lifecycle."
            }
        ]
    },
    {
        id: 'ai-machine-learning',
        title: "AI & Machine Learning",
        icon: Cpu,
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2065&auto=format&fit=crop",
        shortDescription: "Predictive analytics, NLP, and computer vision models tailored to your data.",
        fullDescription: "Unlock the power of your data with our advanced Artificial Intelligence and Machine Learning solutions. We help businesses automate complex processes, predict trends, and gain deeper insights into customer behavior. From building custom ML models trained on your proprietary data to deploying production-ready AI pipelines, our data scientists and engineers work closely with you to identify high-impact use cases. Whether it's automating document processing with NLP, detecting anomalies in real-time data streams, or building intelligent chatbots, we turn cutting-edge research into practical business tools.",
        features: [
            "Predictive Analytics & Demand Forecasting",
            "Natural Language Processing (NLP) & Text Mining",
            "Computer Vision & Image Recognition",
            "Recommendation Engines & Personalization",
            "Automated Workflows & Conversational AI Chatbots",
            "Anomaly Detection & Fraud Prevention",
            "Speech Recognition & Voice Assistants",
            "MLOps & Model Deployment Pipelines"
        ],
        benefits: [
            "Make data-driven decisions with high accuracy and confidence.",
            "Automate repetitive tasks to save time and reduce operational costs by up to 40%.",
            "Personalize customer experiences at scale, increasing engagement and retention.",
            "Detect patterns and anomalies that human analysts might miss.",
            "Stay ahead of competitors by leveraging predictive intelligence."
        ],
        faqs: [
            {
                question: "How can AI help my business?",
                answer: "AI can automate routine tasks like data entry and customer support, provide deep insights into customer behavior and market trends, optimize supply chains, detect fraud, and enable predictive maintenance — ultimately saving costs and driving revenue growth."
            },
            {
                question: "Do I need a lot of data to start with AI?",
                answer: "Not necessarily. While more data generally improves model accuracy, we can start with small datasets using transfer learning and pre-trained models to deliver immediate value. We also help you build robust data collection pipelines for long-term AI readiness."
            },
            {
                question: "Is AI integration secure?",
                answer: "Security is our top priority. We implement strict data encryption at rest and in transit, apply differential privacy techniques, and comply with regulations like GDPR and CCPA to ensure your data remains safe throughout the entire AI lifecycle."
            },
            {
                question: "How long does it take to deploy an AI solution?",
                answer: "A proof-of-concept can typically be delivered in 4-6 weeks. Production-ready solutions usually take 2-4 months depending on complexity, data availability, and integration requirements. We prioritize quick wins while building toward comprehensive solutions."
            },
            {
                question: "Can you integrate AI into our existing systems?",
                answer: "Yes, we specialize in embedding AI capabilities into your existing software stack via APIs and microservices. This means you get the benefits of AI without overhauling your current infrastructure."
            }
        ]
    },
    {
        id: 'iot-embedded-systems',
        title: "IoT & Embedded Systems",
        icon: Globe,
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop",
        shortDescription: "Smart device integration and real-time monitoring ecosystems.",
        fullDescription: "Connect the physical and digital worlds with our Internet of Things (IoT) solutions. We design and develop smart ecosystems that enable real-time monitoring, control, and data collection from connected devices. From custom embedded firmware for microcontrollers like ESP32 and STM32 to cloud-based IoT platforms that aggregate data from thousands of sensors, we deliver end-to-end solutions. Our expertise spans smart agriculture, industrial automation, fleet management, environmental monitoring, and consumer electronics — bringing intelligence to the devices that power your world.",
        features: [
            "IoT Architecture Design & Consulting",
            "Smart Home & Industrial IoT Solutions",
            "Real-time Remote Monitoring Dashboards",
            "Embedded Firmware Development (ESP32, STM32, Arduino)",
            "Sensor Data Integration & Edge Computing",
            "OTA (Over-the-Air) Firmware Updates",
            "MQTT, CoAP & WebSocket Protocol Implementation",
            "IoT Security & Device Authentication"
        ],
        benefits: [
            "Improve operational efficiency through real-time tracking and automated alerts.",
            "Reduce maintenance costs by 30-50% with predictive monitoring and early fault detection.",
            "Create new business models and revenue streams based on connectivity and data.",
            "Gain granular visibility into field operations with live sensor dashboards.",
            "Extend equipment lifespan through condition-based maintenance."
        ],
        faqs: [
            {
                question: "What industries can benefit from IoT?",
                answer: "IoT transforms virtually every industry — manufacturing (predictive maintenance), agriculture (smart irrigation), healthcare (remote patient monitoring), logistics (fleet tracking), energy (smart grids), and retail (inventory management). We tailor solutions to your specific industry challenges."
            },
            {
                question: "Can you upgrade existing non-smart devices?",
                answer: "Yes, we specialize in retrofitting legacy equipment with sensors, connectivity modules (Wi-Fi, LoRa, Zigbee), and microcontrollers to bring them into a modern IoT ecosystem — without replacing your existing infrastructure."
            },
            {
                question: "How do you handle IoT security?",
                answer: "We secure every layer of the IoT stack: encrypted device-to-cloud communication (TLS/SSL), secure boot and firmware signing, device identity certificates, and role-based access control on dashboards. Your connected ecosystem stays protected against cyber threats."
            },
            {
                question: "What communication protocols do you support?",
                answer: "We work with a wide range of protocols including MQTT, CoAP, HTTP/HTTPS, WebSockets, BLE, Wi-Fi, LoRaWAN, and Zigbee — choosing the best fit based on your power, range, bandwidth, and latency requirements."
            },
            {
                question: "Can you build a custom IoT dashboard?",
                answer: "Absolutely. We build intuitive, real-time web and mobile dashboards that visualize sensor data, trigger alerts, control devices remotely, and provide historical analytics with beautiful charts and graphs."
            }
        ]
    },
    {
        id: 'smart-city-solutions',
        title: "Smart City Solutions",
        icon: Server,
        image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=2070&auto=format&fit=crop",
        shortDescription: "Intelligent infrastructure management for traffic, utilities, and safety.",
        fullDescription: "Vernovate collaborates with municipalities, urban planners, and government agencies to build smarter, more sustainable cities. Our technologies improve urban life through intelligent management of resources, traffic, and public services. Using a combination of IoT sensors, AI analytics, and cloud computing, we create unified city management platforms that optimize energy consumption, reduce congestion, improve public safety, and enhance the quality of life for citizens. Our solutions are designed to scale from small districts to entire metropolitan areas.",
        features: [
            "Smart Traffic Management & Adaptive Signal Control",
            "Intelligent Street Lighting Systems",
            "Waste Management Optimization & Route Planning",
            "Public Safety Monitoring (CCTV Analytics & Emergency Response)",
            "Utility Consumption Analytics (Water, Gas, Electricity)",
            "Environmental Monitoring (Air Quality, Noise Levels)",
            "Smart Parking Management Systems",
            "Citizen Engagement Platforms & Mobile Apps"
        ],
        benefits: [
            "Reduce urban congestion by up to 25% with adaptive traffic management.",
            "Cut energy consumption by 30-40% through intelligent lighting and HVAC systems.",
            "Enhance public safety with AI-powered surveillance and rapid emergency response.",
            "Enable sustainable urban growth through data-driven infrastructure planning.",
            "Improve citizen satisfaction with responsive, transparent public services."
        ],
        faqs: [
            {
                question: "What is a Smart City solution?",
                answer: "A Smart City solution uses technology — IoT sensors, AI, cloud computing, and data analytics — to manage a city's assets, resources, and services more efficiently. The goal is to reduce costs, improve sustainability, and enhance the overall quality of life for citizens."
            },
            {
                question: "Do you work with government agencies?",
                answer: "Yes, we actively partner with municipal bodies, urban development authorities, and government agencies to deploy scalable technology infrastructure. We understand the regulatory landscape, procurement processes, and compliance requirements unique to the public sector."
            },
            {
                question: "Is your system scalable?",
                answer: "Our solutions are built on scalable cloud infrastructure and modular architecture, designed to grow from a single neighborhood pilot to a city-wide deployment. New sensors, zones, and services can be added incrementally without overhauling the core platform."
            },
            {
                question: "How do you ensure data privacy for citizens?",
                answer: "We implement anonymization, data minimization, and strict access controls. All personally identifiable information (PII) is handled in compliance with local data protection regulations. Video analytics uses edge processing to avoid transmitting raw footage to the cloud."
            },
            {
                question: "What is the ROI of Smart City technology?",
                answer: "Cities typically see ROI within 2-3 years through reduced energy costs (30-40% savings), lower traffic congestion (fewer accidents, less fuel waste), optimized waste collection routes, and improved operational efficiency across public services."
            }
        ]
    },
    {
        id: 'data-analytics',
        title: "Data Analytics",
        icon: BarChart,
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
        shortDescription: "Turning raw data into actionable insights with interactive dashboards.",
        fullDescription: "Transform raw data into a strategic asset that drives growth. Our data analytics services help you visualize performance, identify inefficiencies, and discover new opportunities through interactive dashboards and deep-dive reports. We don't just build charts — we build a data culture within your organization. From designing data warehouses and ETL pipelines to creating executive-ready dashboards with real-time KPIs, we make your data accessible, understandable, and actionable for every stakeholder — from C-suite executives to frontline managers.",
        features: [
            "Business Intelligence (BI) Dashboards & KPI Tracking",
            "Data Warehousing & ETL Pipeline Design",
            "Real-time Reporting & Live Data Streams",
            "Customer Behavior & Cohort Analysis",
            "Market Trend Visualization & Competitor Benchmarking",
            "Revenue & Financial Analytics",
            "A/B Testing & Experimentation Frameworks",
            "Self-Service Analytics Portals for Teams"
        ],
        benefits: [
            "Gain a 360-degree view of business performance with unified dashboards.",
            "Identify hidden trends and revenue opportunities buried in your data.",
            "Democratize data access so every team can make informed decisions.",
            "Reduce reporting time from days to minutes with automated pipelines.",
            "Track ROI on campaigns and initiatives with precise attribution."
        ],
        faqs: [
            {
                question: "What kind of data can you analyze?",
                answer: "We can analyze structured and unstructured data from virtually any source — CRM records, sales transactions, website analytics, social media, IoT sensors, customer feedback, financial systems, and operational logs. We consolidate everything into a unified data model."
            },
            {
                question: "Which BI tools do you support?",
                answer: "We work with leading BI platforms including Power BI, Tableau, Looker, Metabase, and Apache Superset. We also build fully custom web-based dashboarding solutions when off-the-shelf tools don't meet your specific needs."
            },
            {
                question: "Can you help set up a data warehouse?",
                answer: "Yes, we design and implement robust data warehousing strategies using technologies like Snowflake, Amazon Redshift, Google BigQuery, and PostgreSQL to consolidate your data sources into a single, reliable source of truth."
            },
            {
                question: "How do you ensure data quality?",
                answer: "We implement automated data validation, deduplication, and cleansing pipelines. We also set up monitoring and alerting so you're immediately notified of data anomalies, missing records, or pipeline failures."
            },
            {
                question: "Can non-technical users access the insights?",
                answer: "Absolutely. We design intuitive, self-service analytics portals with drag-and-drop filters, natural language search, and scheduled email reports — empowering every team member to explore data without writing SQL."
            }
        ]
    },
    {
        id: 'healthcare-tech',
        title: "Healthcare Tech",
        icon: Activity,
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop",
        shortDescription: "Digital health platforms and patient monitoring systems.",
        fullDescription: "We innovate for the future of healthcare. Our digital health solutions prioritize patient care, data security, and interoperability to support medical professionals and institutions. From telemedicine platforms that connect patients with doctors remotely, to IoT-enabled remote patient monitoring systems that track vitals in real time, we build technology that saves lives. Our systems integrate seamlessly with existing hospital infrastructure including EHR/EMR platforms, lab systems, and pharmacy management tools — all while maintaining strict compliance with healthcare data regulations.",
        features: [
            "Telemedicine & Video Consultation Platforms",
            "Electronic Health Records (EHR/EMR) Integration",
            "Remote Patient Monitoring (RPM) with Wearables",
            "Medical IoT Systems & Vital Sign Tracking",
            "Health Data Compliance (HIPAA, GDPR, DISHA)",
            "Clinical Decision Support Systems (CDSS)",
            "Pharmacy & Lab Management Integration",
            "Patient Portal & Appointment Scheduling Apps"
        ],
        benefits: [
            "Improve patient access to care, especially in rural and underserved areas.",
            "Streamline clinical workflows, reducing administrative burden by up to 50%.",
            "Ensure secure and compliant health data management across all systems.",
            "Enable proactive care through continuous vital sign monitoring and alerts.",
            "Reduce hospital readmissions with post-discharge remote monitoring."
        ],
        faqs: [
            {
                question: "Are your solutions HIPAA compliant?",
                answer: "Yes, all our healthcare software solutions are built with strict adherence to HIPAA, GDPR, and India's DISHA regulations. We implement end-to-end encryption, audit logs, access controls, and regular security assessments to ensure patient data privacy at every level."
            },
            {
                question: "Can you integrate with existing EHR systems?",
                answer: "We specialize in healthcare interoperability using standards like HL7 FHIR and DICOM. We can integrate our solutions with major EHR/EMR platforms like Epic, Cerner, and Practo — ensuring seamless data flow across your clinical ecosystem."
            },
            {
                question: "Do you support telemedicine apps?",
                answer: "Yes, we build secure, high-quality video consultation platforms with integrated appointment scheduling, prescription management, digital payment processing, and patient health records access — all compliant with healthcare regulations."
            },
            {
                question: "Can you build remote patient monitoring systems?",
                answer: "Absolutely. We design RPM solutions that integrate with wearable devices and medical-grade sensors to continuously track vitals like heart rate, blood pressure, SpO2, and glucose levels — with real-time alerts to care providers when readings fall outside safe ranges."
            },
            {
                question: "How do you handle patient data security?",
                answer: "We follow a defense-in-depth approach: encrypted data storage and transmission, role-based access control, multi-factor authentication, detailed audit trails, and regular penetration testing. All data handling follows the principle of minimum necessary access."
            }
        ]
    }
];
