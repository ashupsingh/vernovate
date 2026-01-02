export const projectsData = [
    {
        id: "intelligent-traffic-management",
        title: "Intelligent Traffic Management",
        category: "Smart City",
        shortDescription: "An AI-powered system that optimizes traffic flow in real-time using computer vision and IoT sensors.",
        fullDescription: "Vernovate developed a comprehensive Smart Traffic Management System for a Tier-1 city to combat increasing congestion. By leveraging existing CCTV infrastructure and deploying custom IoT sensors, our system analyzes traffic density in real-time and adaptively controls traffic signal timings. This solution reduced average wait times by 30% and significantly lowered carbon emissions from idling vehicles.",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
        client: "Metropolitan Transport Authority",
        timeline: "12 Months",
        role: "Full Stack Development & AI Implementation",
        challenge: "The city faced severe gridlocks during peak hours, and the legacy timer-based traffic lights were inefficient. The challenge was to integrate a modern AI solution without replacing the expensive existing physical infrastructure.",
        solution: "We built an edge-computing layer that processes video feeds locally to detect vehicle density. This data is fed into a central cloud dashboard where a reinforcement learning algorithm adjusts signal cycles dynamically.",
        techStack: ["Python", "OpenCV", "TensorFlow", "IoT (Edge AI)", "React", "AWS"],
        testimonial: {
            quote: "Vernovate's solution transformed our traffic network. The adaptive signals work like magic, and the dashboard gives us visibility we never had before.",
            author: "Rajesh Kumar",
            position: "Chief City Engineer"
        }
    },
    {
        id: "agritech-monitoring-system",
        title: "AgriTech Monitoring System",
        category: "IoT / Agriculture",
        shortDescription: "Remote soil health monitoring and automated irrigation control system for large-scale farms.",
        fullDescription: "Our AgriTech solution brings precision farming to large-scale agricultural estates. We designed a network of solar-powered soil sensors that transmit moisture, pH, and nutrient levels via LoRaWAN to a central hub. Farmers can monitor their crop health via a mobile app and automate irrigation valves to water specific zones only when needed, conserving water and improving yield.",
        image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070&auto=format&fit=crop",
        client: "GreenFields Agro Corp",
        timeline: "8 Months",
        role: "IoT Architecture & Mobile App Dev",
        challenge: "Water scarcity and uneven irrigation were leading to crop wastage. The client needed a robust solution that could operate in remote areas with unreliable power and connectivity.",
        solution: "We utilized LoRaWAN for long-range, low-power communication, ensuring sensors could run for years on a single battery. The mobile app features an offline-first architecture to ensure usability even with spotty internet.",
        techStack: ["ESP32", "LoRaWAN", "Flutter", "Node.js", "MongoDB"],
        testimonial: {
            quote: "The automated irrigation system has saved us 40% on water costs, and our crop yield has improved significantly. It's technology that truly serves nature.",
            author: "Sarah Jenkins",
            position: "Director of Operations"
        }
    },
    {
        id: "enterprise-erp-suite",
        title: "Enterprise ERP Suite",
        category: "Software",
        shortDescription: "A comprehensive resource planning tool for manufacturing units with integrated inventory tracking.",
        fullDescription: "We partnered with a leading manufacturing firm to build a bespoke ERP suite tailored to their unique supply chain workflows. Unlike off-the-shelf software, this system integrates directly with their assembly line machines to track production in real-time. It handles inventory management, procurement forecasting, HR payroll, and logistics tracking in one unified interface.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
        client: "Apex Manufacturing Solutions",
        timeline: "18 Months",
        role: "End-to-End Software Development",
        challenge: "The client was using five different disconnected software tools, leading to data silos and manual entry errors. They needed a single source of truth.",
        solution: "We designed a modular ERP architecture using Microservices. This allowed different departments (HR, Sales, Production) to have their own optimized views while sharing a consistent real-time database.",
        techStack: ["React", "Node.js", "PostgreSQL", "Docker", "Redis"],
        testimonial: {
            quote: "Efficiency has gone through the roof. We finally have a real-time view of our entire production floor. Vernovate understood our complex workflow perfectly.",
            author: "Michael Chang",
            position: "COO"
        }
    }
];
