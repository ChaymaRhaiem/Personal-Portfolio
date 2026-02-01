"use client"

// Performance optimizations applied:
// 1. useMemo for static data to prevent recreation
// 2. Lazy loading for images below the fold
// 3. Reduced animation complexity where possible
// 4. Memoized navigation items and card data

import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Brain, Database, TrendingUp, BookOpen, Users, Zap, Github, Linkedin, Download } from "lucide-react"
import { ScrollReveal } from "@/components/scroll-reveal"
import { MatrixBackground } from "@/components/matrix-background"
import { EnhancedTimeline } from "@/components/enhanced-timeline"
import { EducationTimeline } from "@/components/education-timeline"
import { VisualSkills } from "@/components/visual-skills"
import { LanguagesSection } from "@/components/languages-section"
import { ModernContact } from "@/components/modern-contact"
import { CertificationsSection } from "@/components/certifications-section"

// Updated with enhanced information from resume while preserving all original content
const portfolioData = {
  name: "Chayma Rhaiem",
  title: "AI Engineer & Software Engineer",
  tagline: "Building production RAG systems and AI-integrated development workflows",
  email: "rhaiem.chayma@gmail.com",
  phone: "(+216) 26 364 009",
  location: "Ariana, Tunisia",
  github: "https://github.com/ChaymaRhaiem",
  linkedin: "https://linkedin.com/in/chayma-rhaiem",
  medium: "https://medium.com/@rhaiem.chayma",
  avatar: "/profile-photo.jpg",
  cvUrl: "/Chayma_Rhaiem_CV.pdf", 
  ieltsUrl: "/IELTS_Certificate_C1.pdf",
  tcfUrl: "/TCF_Certificate_C1.pdf", 

  about:
    "AI Engineer specializing in AI-integrated development workflows and production RAG systems. I've spent the last year and a half building cloud-native applications that intelligently monitor systems, detect anomalies, and provide automated insights. My approach centers on making AI a core part of the development process rather than just an add-on feature.",

  // Professional metrics section - more discrete and mature
  professionalHighlights: {
    experience: "2+ Years",
    projectsDelivered: "10+ Projects",
    specialization: "Production AI Systems",
    focus: "RAG & ML Engineering",
  },

  // Latest blog section
  latestBlog: {
    title: "From Chaos to Context: How We Tamed SAP Monitoring with a Graph RAG Assistant",
    excerpt:
      "A complete implementation guide for building AI-powered SAP monitoring systems using Graph RAG architecture. Learn how we combined Neo4j knowledge graphs with vector search to create an intelligent assistant that processes SAP T-codes, detects anomalies, and provides contextual solutions in real-time.",
    publishDate: "July 2025",
    readTime: "10 min read",
    url: "https://medium.com/@rhaiem.chayma/from-chaos-to-context-how-we-tamed-sap-monitoring-with-a-graph-rag-assistant-19abe59f13f7",
    tags: ["Graph RAG", "SAP Monitoring", "Neo4j", "Production AI", "System Architecture"],
  },

  languages: [
    { name: "Arabic", level: "Native", flag: "🇹🇳", proficiency: 100 },
    { name: "English", level: "Advanced (C1)", flag: "🇬🇧", proficiency: 98, certUrl: "/IELTS_Certificate_C1.pdf" },
    { name: "French", level: "Advanced (C1)", flag: "🇫🇷", proficiency: 98, certUrl: "/TCF_Certificate_C1.pdf" },
    { name: "German", level: "Basic (A1)", flag: "🇩🇪", proficiency: 25 },
    { name: "Spanish", level: "Basic (A1)", flag: "🇪🇸", proficiency: 25 },
  ],

  experiences: [
        {
      title: "Freelance Full-Stack Developer",
      company: "B2B Dispatching Platform",
      companyIcon: "", // You can add a custom icon later if needed
      location: "Tunis, Tunisia",
      period: "Oct 2025 - Present",
      description: [
        "Designed and deployed cloud-based architecture using Firebase and websockets for real-time trip management",
        "Built intelligent dispatching system leveraging spatial optimization algorithms for driver assignment under spatio-temporal constraints",
        "Developed Flutter mobile app and web dashboard for GPS tracking, live monitoring, and operational analytics / Reporting",
      ],
      technologies: [
        "Flutter",
        "Firebase",
        "Cloud Functions",
        "Maps API",
        "Real-time Databases",
        "Spatial Optimization",
        "GPS Tracking",
        "Mobile Development",
      ],
      // projects: [
      //   {
      //     title: "Intelligent Dispatching System",
      //     description:
      //       "Cloud-based real-time trip management platform with spatial optimization algorithms for efficient driver assignment and live GPS tracking capabilities.",
      //     image: "", // You can add an image later if you have one
      //     technologies: ["Flutter", "Firebase", "Cloud Functions", "Realtime GPS tracking"],
      //     impact: "Real-time trip management",
      //   },
      // ],
    },
    {
      title: "AI Engineer – Client in Logistics & Communication Sector, Europe",
      company: "Avaxia Group",
      companyIcon: "https://www.avaxiagroup.com/wp-content/themes/poey-custom-wp/assets/img/avaxia-logo.svg",
      location: "Tunis, Tunisia",
      period: "Jul 2024 - Jun 2025",
      description: [
        "Built cloud-based service with FastAPI to monitor SAP systems using T-codes, detect anomalies and critical errors, and suggest fixes from SAP help docs, SAP notes, and expert knowledge",
        "Built hybrid RAG architecture combining Knowledge graphs and vector databases for automated root-cause analysis (RCA).",
        "Scaled systems capacity by 70× while keeping response times under one second using Neo4j graph queries and Qdrant vector search",
        "Added Ollama for local LLM inference and Groq for low-latency model serving, cutting response times and reducing API costs",
        "Optimized vector similarity search performance from 3.2s to 800ms response time in production queries",
        "Created production MS Teams bot integration processing 1000+ automated incident workflows daily",
        "Delivered the system as a production-ready service with easy deployment and integration into client's environment",
      ],
      technologies: [
        "FastAPI",
        "Neo4j",
        "Qdrant",
        "Ollama",
        "MongoDB",
        "SAP T-codes",
        "MS Teams API",
        "Vector Search",
        "Knowledge Graphs",
        "Deployment",
        "RAG",
        "Context Engineering",
      ],
      projects: [
        {
          title: "Enterprise SAP Monitoring System",
          description:
            "Production-ready AI-powered monitoring system with 70× capacity increase and sub-second response times using hybrid Graph-Vector RAG architecture.",
          image: "/hybrid-rag-flow.png",
          technologies: ["FastAPI", "Neo4j", "Qdrant", "LLaMa", "SAP"],
          impact: "70× system capacity increase",
          isEarlyRAG: false,
        },
      ],
    },
    {
      title: "Cloud Solutions Consultant (Full-Time Contract)",
      company: "VIZIO Consulting Inc",
      companyIcon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT39K5GpsUNxR1H3z_aWTvBaMyxA_XLgrXjLg&s",
      location: "Toronto, Canada",
      period: "Jun 2023 - Jan 2024",
      description: [
        "Delivered production RAG-based enterprise AI assistant using AWS Bedrock, S3 and Kendra enterprise search, demonstrating 25% internal efficiency gains",
        "Built real-time BI dashboards in SAP Analytics Cloud, PowerBI, and QuickSight processing large-scale data streams",
        "Optimized multi-cloud ETL architectures achieving 25% performance improvement in production reporting systems",
        "Led AI integration proof-of-concept from prototype to approved production deployment",
      ],
      technologies: [
        "AWS Bedrock",
        "AWS S3",
        "AWS Kendra",
        "SAP Analytics Cloud",
        "PowerBI",
        "QuickSight",
        "Multi-cloud ETL",
        "Production RAG",
      ],
      experienceLetter: "/Experience Letter-Chayma_Rhaiem - Vizio Consulting.pdf",
      projects: [
        {
          title: "AWS Glue to Power BI Pipeline",
          description:
            "Built comprehensive ETL pipeline using AWS Glue for data transformation and Power BI integration, enabling real-time dashboard analytics for enterprise clients with automated data quality checks.",
          image: "./dashboard-gas-client.png",
          technologies: ["AWS Glue", "Power BI", "ETL", "Data Pipeline"],
          impact: "40% faster data retrieval",
        },
        {
          title: "Bedrock Streamlit Chatbot with Claude Foundation Model",
          description:
            "Pioneered early RAG implementation using AWS Bedrock's foundation models for intelligent document processing. Built when RAG was just emerging as a paradigm, featuring advanced prompt engineering and context-aware responses.",
          image: "/aws-bedrock-rag.png",
          technologies: ["AWS Bedrock", "AWS Kendra", "IAM", "ReactJS", "Flask", "RAG", "LLM", "Python"],
          impact: "Enterprise PoC success",
        },
        {
          title: "AWS S3 and Redshift Data Pipeline Optimization in Glue",
          description:
            "Developed proof-of-concept AI assistant for major gas company operations, integrating multiple AWS services for document analysis, query processing, and automated response generation.",
          image: "/s3_redshift_pipeline.png",
          technologies: ["AWS Glue", "S3", "Redshift", "Pyspark"],
          impact: "Data Pipelines optimized and cost reduction in AWS infrastructure",
        },
      ],
    },
    {
      title: "ML Systems Engineer",
      company: "BFI Groupe",
      companyIcon: "https://bfigroupe.com/wp-content/uploads/2021/02/bfi_logo_2021.svg",
      location: "Tunis, Tunisia",
      period: "Feb 2022 - Jun 2022",
      experienceLetter: "/Lettre de recommandation Chayma RHAIEM - BFI Groupe.pdf",
      description: [
        "Deployed credit risk scoring models for African banking sector with Basel II and IFRS 9 compliance requirements",
        "Achieved an additional 10% model accuracy improvement through AutoML frameworks and hyperparameter optimization",
        "Built production model validation ensuring regulatory compliance in live financial systems",
      ],
      technologies: [
        "Credit Risk Modeling",
        "Basel II",
        "IFRS 9",
        "AutoML",
        "Hyperparameter Optimization",
        "Production Validation",
        "Regulatory Compliance",
        "Financial ML",
      ],
    },
  ],

  education: [
    {
      degree: "Master of Science in Engineering (MSE)",
      specialization: "Software Engineering & Data Science",
      institution: "ESPRIT (Higher School of Engineering and Technology)",
      institutionIcon: "https://upload.wikimedia.org/wikipedia/commons/f/ff/Logo_ESPRIT_Ariana.jpg",
      location: "Ariana, Tunisia",
      period: "Sep 2022 - Jul 2025",
      gpa: "Magna Cum Laude (High Honors)",
      achievements: [
        "CTI & EUR-ACE Accredited Program",
        "Awarded Magna Cum Laude (High Honors)",
        "Specialized in AI-integrated development workflows and production systems",
        "Led multiple industry-collaboration projects with real-world impact",
      ],
      relevantCourses: [
        "Advanced Machine Learning",
        "Production AI Systems",
        "Cloud Architecture",
        "Software Engineering",
        "Data Science",
        "System Design",
      ],
    },
    {
      degree: "Bachelor of Science in Computer Science",
      specialization: "Software Engineering and Information Systems",
      institution: "Polytech-Intl",
      institutionIcon: "https://pi.tn/wp-content/uploads/2019/02/Logo-Pi-RVB.png",
      location: "Tunis, Tunisia",
      period: "Graduated Jun 2022",
      gpa: "",
      achievements: [
        "Strong foundation in computer science fundamentals",
        "Focus on software development and system design",
        "Early exposure to machine learning and data processing",
      ],
      relevantCourses: [
        "Data Structures & Algorithms",
        "Database Systems",
        "Software Engineering",
        "Web Development",
        "System Programming",
      ],
    },
  ],

  skills: {
    "Machine Learning": [
      {
        name: "TensorFlow",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
      },
      {
        name: "Scikit-learn",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg",
      },
      {
        name: "Keras",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/keras/keras-plain-wordmark.svg",
      },
      {
        name: "PyTorch",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pytorch/pytorch-original-wordmark.svg",
      },
      {
        name: "Transformers",
        logo: "https://huggingface.co/datasets/huggingface/brand-assets/resolve/7e7df7da9642aaae2ad311be8bf12a63dddbc6d2/hf-logo-with-title.png",
      },
    ],
    Programming: [
      { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
      {
        name: "JavaScript",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-plain.svg",
      },
      {
        name: "PySpark",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apachespark/apachespark-original.svg",
      },
      { name: "R", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg" },
    ],
    "Tools & Frameworks": [
      { name: "FastAPI", logo: "https://fastapi.tiangolo.com/img/logo-margin/logo-teal.png" },
      {
        name: "Streamlit",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/streamlit/streamlit-original-wordmark.svg",
      },
      {
        name: "Flask",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flask/flask-original-wordmark.svg",
      },
      { name: "Spring Boot", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" },
      { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    ],
    "Cloud & Data": [
      { name: "SAP Analytics Cloud", logo: "https://img.icons8.com/deco/512/sap.png" },
      { name: "SAP HANA", logo: "https://img.icons8.com/deco/512/sap.png" },
      { name: "Neo4j", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/neo4j/neo4j-original.svg" },
      {
        name: "Qdrant Cloud",
        logo: "https://imgs.search.brave.com/ULLwmKzIw9i0dO-HP_aRrXwRT9oQX-LYmjioyT_sC-k/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuc2Vla2xvZ28u/Y29tL2xvZ28tcG5n/LzQ5LzIvcWRyYW50/LWxvZ28tcG5nX3Nl/ZWtsb2dvLTQ5Nzk1/OS5wbmc",
      },
      {
        name: "MongoDB",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
      },
      { name: "AWS Glue", logo: "https://devicons.railway.com/i/aws.svg" },
      { name: "AWS Bedrock", logo: "https://devicons.railway.com/i/aws.svg" },
      { name: "AWS Redshift", logo: "https://devicons.railway.com/i/aws.svg" },
      { name: "AWS QuickSight", logo: "https://devicons.railway.com/i/aws.svg" },
      { name: "AWS S3", logo: "https://devicons.railway.com/i/aws.svg" },
      { name: "AWS Kendra", logo: "https://devicons.railway.com/i/aws.svg" },
    ],
    "AI/GenAI": [
      { name: "LangChain", logo: "https://python.langchain.com/img/brand/wordmark.png" },
      { name: "Ollama", logo: "https://ollama.ai/public/ollama.png" },
      { name: "Groq", logo: "https://groq.com/wp-content/uploads/2024/03/PBG-mark1-color.svg" },
      { name: "RAG Systems" },
      { name: "Vector Search" },
      { name: "Graph RAG" },
    ],
    "Web Scraping & Tools": [
      { name: "Selenium", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/selenium/selenium-original.svg" },
      {
        name: "Scrapy Playwright",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/playwright/playwright-plain.svg",
      },
      { name: "BeautifulSoup" },
      { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" },
      { name: "Jenkins", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg" },
      { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
    ],
  },

  certifications: [
    {
      name: "Microsoft Certified: Azure Data Scientist Associate",
      issuer: "Microsoft",
      date: "Jun 2024",
      expiryDate: "Jun 2026",
      credentialId: "78162F3F59701145",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/200px-Microsoft_logo.svg.png",
      skills: ["Azure Machine Learning", "Azure DevOps", "MLOps"],
      credentialUrl:
        "https://learn.microsoft.com/en-us/users/chaymarhaiem-7186/credentials/78162f3f59701145?ref=https%3A%2F%2Fwww.linkedin.com%2F",
    },
    {
      name: "Natural Language Processing Specialization",
      issuer: "DeepLearning.AI",
      date: "Nov 2024",
      credentialId: "JFO0EFGD9RCR",
      logo: "https://learn.deeplearning.ai/assets/dlai-logo.png",
      skills: ["NLP", "Deep Learning", "Transformers"],
      credentialUrl: "https://www.coursera.org/account/accomplishments/specialization/JFO0EFGD9RCR",
    },
    {
      name: "Building Transformer-Based NLP Applications",
      issuer: "NVIDIA",
      date: "Apr 2024",
      credentialId: "LVo06eDuQb6qo9H4MgSl1g",
      logo: "https://upload.wikimedia.org/wikipedia/fr/4/47/Nvidia_%28logo%29.svg",
      skills: ["Transformers", "BERT", "NLP"],
      credentialUrl: "https://courses.nvidia.com/certificates/LVo06eDuQb6qo9H4MgSl1g",
    },
    {
      name: "Hedera Hashgraph Developer Certification",
      issuer: "The Hashgraph Association",
      date: "Nov 2024",
      credentialId: "4e0bdb4d-e9fa-4cc1-9ec0-8716f19ed134",
      logo: "https://hashgraphdev.com/images/tha-white-logo.png",
      skills: ["Blockchain", "Hashgraph", "DLT"],
      credentialUrl: "https://certs.hashgraphdev.com/4e0bdb4d-e9fa-4cc1-9ec0-8716f19ed134.pdf",
    },
    {
      name: "SAP Certified Application Associate - SAP Analytics Cloud",
      issuer: "SAP",
      date: "Mar 2022",
      expiryDate: "Mar 2027",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/SAP_2011_logo.svg/200px-SAP_2011_logo.svg.png",
      credentialUrl: "https://www.credly.com/badges/6e3cf9b9-8809-412f-a0fb-eefc4c070cfc",
    },
    {
      name: "Google Data Analytics Specialization",
      issuer: "Google",
      date: "Oct 2022",
      credentialId: "K64885TR8EFY",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/200px-Google_2015_logo.svg.png",
      skills: ["Data Analysis", "SQL", "Tableau"],
      credentialUrl: "https://coursera.org/verify/specialization/K64885TR8EFY",
    },
  ],

  // Enhanced academic projects with more depth from resume
  academicProjects: [
    {
      id: 1,
      title: "Smart PM Hub – AI-Enhanced Project Assistant",
      description:
        "Live RAG-powered project management platform combining Neo4j knowledge graphs with LLM reasoning. Built production NLP pipeline processing 500+ Reddit discussions and PMBOK 7 documentation with optimized 15s response time. Features real-time KPI visualization dashboard with graph-based analytics serving live project data.",
      technologies: [
        "Python",
        "PyTorch",
        "Neo4j",
        "Ollama",
        "Streamlit",
        "CUDA Optimization",
        "Graph RAG",
        "NLP Pipeline",
        "Real-time Analytics",
      ],
      github: "https://github.com/ChaymaRhaiem/GraphRAG-PM-Graph-RAG-for-Project-Management",
      demo: "https://drive.google.com/file/d/1ztugCpJtxsbMuLbolK9gcPTFmFR_Eytq/view",
      image:
        "https://github.com/ChaymaRhaiem/GraphRAG-PM-Graph-RAG-for-Project-Management/blob/main/1731533190320.jpg?raw=true",
      category: "Production RAG System",
      year: "2024",
    },
    {
      id: 2,
      title: "Innovest – AI Trading Platform",
      description:
        "Real-time trading system for Tunisian markets with production trading system featuring real-time sentiment analysis processing 200+ daily financial articles. Integrated generative AI document processing streamlining automated workflow analysis. Built scalable cloud architecture for live market signal processing and storage.",
      technologies: [
        "Python",
        "MongoDB Atlas",
        "Timeseries Forecasting",
        "PyTorch",
        "Real-time Processing",
        "Sentiment Analysis",
        "Cloud Architecture",
      ],
      github: "https://github.com/ChaymaRhaiem/FinSent--Market-Intelligence-with-Predictive-Analytics-and-NLP",
      demo: "https://drive.google.com/file/d/13l9xMRhHxkDNh-efaR6_PCc-PWZsAuNp/view?usp=sharing",
      image: "/finsent-architecture.png",
      category: "Financial ML",
      year: "2024",
    },
    // {
    //   id: 3,
    //   title: "DevOps CI/CD Pipeline",
    //   description:
    //     "Complete DevOps automation for Spring Boot applications achieving 95% test coverage. Containerized production application stack with Docker Compose enabling seamless deployments. Built comprehensive monitoring infrastructure using Grafana dashboards for real-time performance metrics.",
    //   technologies: ["Jenkins", "Docker", "Kubernetes", "Grafana", "Prometheus", "Spring Boot", "CI/CD", "Monitoring"],
    //   github: "https://github.com/ChaymaRhaiem/devops-pipeline",
    //   image: "/devops-pipeline.png",
    //   category: "DevOps",
    //   year: "2024",
    // },
    {
      id: 3,
      title: "Object Detection Using Adaptive Mask RCNN in Optical Remote Sensing Images",
      description:
        "This project presents a comparative study of three deep learning approaches for classifying images in the CIFAR-10 dataset: A basic Artificial Neural Network (ANN), A custom Convolutional Neural Network (CNN), Transfer Learning using VGG19 and ResNet-50.",
      technologies: ["CNN", "Computer Vision", "Python"],
      github: "https://github.com/ChaymaRhaiem/CIFAR-10-mask-RCNN/tree/main",
      image: "https://github.com/ChaymaRhaiem/CIFAR-10-mask-RCNN/blob/main/cifar-architecture.png?raw=true",
      category: "Computer Vision",
    },
  ],

  professionalProjects: [
    {
      id: 1,
      title: "Hybrid Graph-Vector RAG System",
      description:
        "Hybrid RAG architecture combining graph and vector retrieval, Custom G-Eval framework for LLM response quality assessment, 70% alert accuracy matching expert-defined priorities, Conversational interface for natural language SAP queries, Automated RCA (root cause analysis) with contextual documentation",
      technologies: ["Neo4j", "Qdrant Cloud", "Vector Search", "Graph Analytics", "Python"],
      impact: "70× data processing improvement",
      image: "/venn.png",
    },
    {
      id: 2,
      title: "Credit Risk Assessment System",
      description:
        "Automated credit PD (Probability of default) models under Basel II and IFRS 9 guidelines using 300,000+ customer records from African banks.",
      technologies: [
        "Risk Modeling",
        "Statistical Analysis",
        "Python",
        "Credit scoring",
        "AutoML",
        "Logistic Regression",
        "Random Forest",
      ],
      image: "/credit-score-architecture.png",
      impact: "85% initial PD prediction accuracy further enhanced by 10% using AutoML.",
      category: "Financial ML",
    },
  ],
}

export default function Portfolio() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
    setMobileMenuOpen(false)
  }

  // Memoize navigation items to prevent recreating on every render
  const navItems = useMemo(
    () => ["Home", "About", "Experience", "Education", "Certifications", "Skills", "Projects", "Contact"],
    [],
  )

  // Memoize about cards to prevent recreating on every render
  const aboutCards = useMemo(
    () => [
      {
        icon: Brain,
        title: "AI/ML Engineering",
        desc: "RAG systems, NLP pipelines, and scalable ML architectures",
      },
      {
        icon: Database,
        title: "Data Engineering",
        desc: "Cloud data pipelines, vector databases, and real-time processing",
      },
      {
        icon: TrendingUp,
        title: "Software Engineering",
        desc: "Full-stack development, system design, and production deployment",
      },
    ],
    [],
  )

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 relative overflow-hidden">
      <MatrixBackground />

      {/* Cyber Grid Overlay */}
      <div className="fixed inset-0 cyber-grid opacity-20 pointer-events-none" />

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-900/90 backdrop-blur-lg border-b border-blue-500/30 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div
              className={`text-xl font-bold text-blue-300 transition-all duration-500 ${isLoaded ? "animate-slide-in-left" : "opacity-0"}`}
            >
              {portfolioData.name}
            </div>

            {/* Desktop Navigation */}
            <div
              className={`hidden md:flex space-x-8 transition-all duration-700 ${isLoaded ? "animate-slide-in-right" : "opacity-0"}`}
            >
              {navItems.map((item, index) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className={`text-slate-300 hover:text-blue-400 transition-all duration-300 hover:scale-105 relative group stagger-${index + 1}`}
                  >
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
                  </button>
                ),
              )}
            </div>

            {/* Social Links */}
            <div
              className={`hidden md:flex items-center space-x-4 transition-all duration-700 ${isLoaded ? "animate-slide-in-right" : "opacity-0"}`}
            >
              <a
                href={portfolioData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-blue-400 transition-colors duration-300 hover:scale-110"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={portfolioData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-blue-400 transition-colors duration-300 hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={portfolioData.medium}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-blue-400 transition-colors duration-300 hover:scale-110"
                aria-label="Medium"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                  <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
                </svg>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-blue-400 hover:scale-110 transition-transform duration-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? "✕" : "☰"}
            </button>
          </div>

          {/* Mobile Navigation */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-500 ${mobileMenuOpen ? "max-h-[500px] py-4" : "max-h-0"}`}
          >
            <div className="border-t border-blue-500/30 pt-4">
              <div className="flex flex-col space-y-4">
                {navItems.map((item, index) => (
                    <button
                      key={item}
                      onClick={() => scrollToSection(item.toLowerCase())}
                      className={`text-slate-300 hover:text-blue-400 transition-all duration-300 text-left transform hover:translate-x-2 stagger-${index + 1}`}
                    >
                      {item}
                    </button>
                  ),
                )}

                {/* Mobile Social Links */}
                <div className="flex space-x-4 pt-4 border-t border-slate-700/50">
                  <a
                    href={portfolioData.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-blue-400 transition-colors duration-300"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href={portfolioData.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-blue-400 transition-colors duration-300"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href={portfolioData.medium}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-blue-400 transition-colors duration-300"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                      <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 relative min-h-screen flex items-center">
        <div className="max-w-6xl mx-auto w-full">
          <div className="text-center">
            {/* Avatar and Name Side by Side */}
            <div
              className={`flex items-center justify-center gap-8 mb-8 transition-all duration-1000 ${isLoaded ? "animate-scale-in" : "opacity-0 scale-90"}`}
            >
              <Avatar className="w-32 h-32 md:w-40 md:h-40 border-4 border-blue-500/30 shadow-2xl shadow-blue-500/30 flex-shrink-0">
                <AvatarImage 
                  src={portfolioData.avatar || "/placeholder.svg"} 
                  alt={portfolioData.name}
                  loading="eager"
                />
                <AvatarFallback className="text-2xl md:text-3xl bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                  {portfolioData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="text-left flex-1 max-w-2xl">
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-slate-100 leading-tight">
                  {portfolioData.name}
                </h1>
                <p className="text-lg md:text-xl lg:text-2xl text-blue-400 mt-2 mb-4">{portfolioData.title}</p>
                <p className="text-base md:text-lg text-purple-400 font-light leading-relaxed">
                  {portfolioData.tagline}
                </p>
              </div>
            </div>

            <div
              className={`transition-all duration-1000 delay-700 ${isLoaded ? "animate-fade-in-up" : "opacity-0 translate-y-8"}`}
            >
              <p className="text-lg text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">{portfolioData.about}</p>
            </div>

            <div
              className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-900 ${isLoaded ? "animate-fade-in-up" : "opacity-0 translate-y-8"}`}
            >
              <Button
                onClick={() => scrollToSection("projects")}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300"
              >
                <Brain className="w-5 h-5 mr-2" />
                View My Work
              </Button>
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300"
              >
                <a href={portfolioData.cvUrl} download>
                  <Download className="w-5 h-5 mr-2" />
                  Download CV
                </a>
              </Button>
              <Button
                onClick={() => scrollToSection("contact")}
                variant="outline"
                size="lg"
                className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10 transform hover:scale-105 transition-all duration-300"
              >
                <Zap className="w-5 h-5 mr-2" />
                Get In Touch
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-800/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-blue-300">About Me</h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                AI Engineer specializing in production RAG systems and AI-integrated development workflows with
                expertise in machine learning, cloud computing, and intelligent system design.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {aboutCards.map((item, index) => (
              <ScrollReveal key={index} delay={index * 200}>
                <Card className="neon-border bg-slate-800/50 backdrop-blur-sm hover-glow text-center">
                  <CardHeader className="pb-4">
                    <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-blue-300 text-lg">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-300 text-sm">{item.desc}</p>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>

          {/* Professional Highlights - More discrete and mature */}
          <ScrollReveal delay={600}>
            <Card className="neon-border bg-slate-800/50 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-4 gap-6 text-center">
                  {Object.entries(portfolioData.professionalHighlights).map(([key, value], index) => (
                    <div key={key} className="space-y-2">
                      <div className="text-2xl font-bold text-blue-300">{value}</div>
                      <div className="text-sm text-slate-400 capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>
      </section>

      {/* Latest Blog Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-300">Latest Publication</h2>
              <p className="text-lg text-slate-300">Sharing insights from production AI systems</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <Card className="neon-border bg-slate-800/50 backdrop-blur-sm hover-glow group">
              <CardContent className="p-8">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-sm text-blue-400 mb-3">
                      <span>{portfolioData.latestBlog.publishDate}</span>
                      <span>•</span>
                      <span>{portfolioData.latestBlog.readTime}</span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-100 mb-4 group-hover:text-blue-200 transition-colors">
                      {portfolioData.latestBlog.title}
                    </h3>

                    <p className="text-slate-300 leading-relaxed mb-6">{portfolioData.latestBlog.excerpt}</p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {portfolioData.latestBlog.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="border-blue-500/50 text-blue-300 text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center gap-4">
                      <a
                        href={portfolioData.latestBlog.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/blog inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-xl text-blue-300 hover:from-blue-500/30 hover:to-purple-500/30 hover:border-blue-400/50 transition-all duration-300 hover:scale-105 backdrop-blur-sm"
                      >
                        <div className="flex items-center gap-2">
                          <svg
                            className="w-5 h-5"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                          >
                            <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
                          </svg>
                          <span className="font-medium">Read on Medium</span>
                        </div>
                        <svg
                          className="w-4 h-4 opacity-60 group-hover/blog:opacity-100 group-hover/blog:translate-x-1 transition-all duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>

                  <div className="lg:w-48 flex-shrink-0">
                    <div className="aspect-square bg-gradient-to-br from-blue-900/50 to-purple-900/50 rounded-lg flex items-center justify-center">
                      <div className="text-4xl">📝</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>
      </section>

      {/* Experience Timeline - Enhanced */}
      <section id="experience" className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-800/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-blue-300">Professional Experience</h2>
              <p className="text-xl text-slate-300">My journey in AI engineering and software development</p>
            </div>
          </ScrollReveal>

          <EnhancedTimeline experiences={portfolioData.experiences} />
        </div>
      </section>

      {/* Education Section - Compact */}
      <section id="education" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-blue-300">Education</h2>
              <p className="text-xl text-slate-300">Academic foundation in software engineering and data science</p>
            </div>
          </ScrollReveal>

          <EducationTimeline education={portfolioData.education} />
        </div>
      </section>

      {/* Certifications Section - Compact */}
      <section id="certifications" className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-800/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-blue-300">Certifications</h2>
              <p className="text-xl text-slate-300 mb-8">
                Professional certifications in data science, cloud computing, and machine learning
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <CertificationsSection certifications={portfolioData.certifications} />
          </ScrollReveal>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-blue-300">Technical Skills</h2>
              <p className="text-xl text-slate-300 mb-8">
                Expertise across the full AI engineering and software development stack
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <VisualSkills skills={portfolioData.skills} />
          </ScrollReveal>

          {/* Languages Section */}
          <ScrollReveal delay={400}>
            <div className="mt-8">
              <LanguagesSection languages={portfolioData.languages} ieltsUrl={portfolioData.ieltsUrl} tcfUrl={portfolioData.tcfUrl} />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-800/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-blue-300">Featured Projects</h2>
              <p className="text-xl text-slate-300">Academic research and professional implementations</p>
            </div>
          </ScrollReveal>

          {/* Highlighted Professional Projects */}
          <ScrollReveal delay={200}>
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-blue-400 mb-6 flex items-center">
                <Users className="w-6 h-6 mr-2" />
                Professional Projects
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                {portfolioData.professionalProjects.map((project, index) => (
                  <Card key={project.id} className="neon-border bg-slate-800/50 backdrop-blur-sm hover-glow group">
                    <div className="aspect-video bg-gradient-to-br from-blue-900/50 to-purple-900/50 relative overflow-hidden">
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                      <div className="absolute bottom-4 left-4">
                        <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/50 text-xs">
                          {project.impact}
                        </Badge>
                      </div>
                    </div>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-blue-300 group-hover:text-blue-200 transition-colors text-lg">
                        {project.title}
                      </CardTitle>
                      <CardDescription className="text-slate-300 text-sm">{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.map((tech, techIndex) => (
                          <Badge
                            key={techIndex}
                            variant="outline"
                            className="text-xs border-purple-500/50 text-purple-300 px-2 py-0.5"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Highlighted Academic Projects */}
          <ScrollReveal delay={400}>
            <div>
              <h3 className="text-2xl font-bold text-purple-400 mb-8 flex items-center">
                <BookOpen className="w-6 h-6 mr-2" />
                Academic Projects
              </h3>
              <div className="space-y-8">
                {portfolioData.academicProjects.map((project, index) => (
                  <Card
                    key={project.id}
                    className="neon-border bg-slate-800/50 backdrop-blur-sm hover-glow group overflow-hidden"
                  >
                    <div className="grid lg:grid-cols-5 gap-0">
                      {/* Large Image Section - Takes up 3/5 of the width */}
                      <div className="lg:col-span-3 relative">
                        <div className="aspect-[4/3] lg:aspect-[16/10] bg-gradient-to-br from-purple-900/50 to-pink-900/50 relative overflow-hidden">
                          <img
                            src={project.image || "/placeholder.svg"}
                            alt={project.title}
                            className="w-full h-full object-contain transition-all duration-700 group-hover:scale-105 filter brightness-90 group-hover:brightness-100"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-slate-900/20 lg:to-slate-900/60" />

                          {/* Floating Category Badge */}
                          <div className="absolute top-4 left-4">
                            <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/50 text-sm px-3 py-1 backdrop-blur-sm">
                              {project.category}
                            </Badge>
                          </div>

                          {/* Hover Overlay with Links */}
                          <div className="absolute inset-0 bg-slate-900/80 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                            <div className="flex gap-4">
                              <Button
                                variant="outline"
                                size="lg"
                                asChild
                                className="border-blue-500/50 text-blue-300 hover:bg-blue-500/20 backdrop-blur-sm bg-transparent"
                              >
                                <a href={project.github} target="_blank" rel="noopener noreferrer">
                                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                  </svg>
                                  View Code
                                </a>
                              </Button>
                              {project.demo && (
                                <Button
                                  size="lg"
                                  asChild
                                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 backdrop-blur-sm"
                                >
                                  <a href={project.demo} target="_blank" rel="noopener noreferrer">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                      />
                                    </svg>
                                    Demo
                                  </a>
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Content Section - Takes up 2/5 of the width */}
                      <div className="lg:col-span-2 p-8 flex flex-col justify-center">
                        <div className="space-y-6">
                          <div>
                            <CardTitle className="text-2xl text-purple-300 group-hover:text-purple-200 transition-colors mb-3 leading-tight">
                              {project.title}
                            </CardTitle>
                            <CardDescription className="text-slate-300 text-base leading-relaxed">
                              {project.description}
                            </CardDescription>
                          </div>

                          {/* Technologies */}
                          <div>
                            <h4 className="text-sm font-semibold text-purple-400 mb-3">Technologies Used</h4>
                            <div className="flex flex-wrap gap-2">
                              {project.technologies.map((tech, techIndex) => (
                                <Badge
                                  key={techIndex}
                                  variant="outline"
                                  className="text-sm border-blue-500/50 text-blue-300 hover:bg-blue-500/10 px-3 py-1 transition-colors"
                                >
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {/* Action Buttons for Mobile */}
                          <div className="flex gap-3 lg:hidden">
                            <Button
                              variant="outline"
                              size="sm"
                              asChild
                              className="flex-1 border-blue-500/50 text-blue-300 hover:bg-blue-500/20 bg-transparent"
                            >
                              <a href={project.github} target="_blank" rel="noopener noreferrer">
                                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                                Code
                              </a>
                            </Button>
                            {project.demo && (
                              <Button
                                size="sm"
                                asChild
                                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                              >
                                <a href={project.demo} target="_blank" rel="noopener noreferrer">
                                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                    />
                                  </svg>
                                  Demo
                                </a>
                              </Button>
                            )}
                          </div>

                          {/* Project Year */}
                          {project.year && (
                            <div className="pt-4 border-t border-slate-700/50">
                              <div className="flex items-center gap-4 text-sm text-slate-400">
                                <div className="flex items-center gap-1">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                  </svg>
                                  <span>{project.year}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                  </svg>
                                  <span>Completed</span>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Glow Effect */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500/50 via-blue-500/50 to-pink-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </Card>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-blue-300">Get In Touch</h2>
              <p className="text-xl text-slate-300 mb-8">
                Let's discuss how we can leverage AI and data science to drive innovation
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <ModernContact
              email={portfolioData.email}
              phone={portfolioData.phone}
              location={portfolioData.location}
              github={portfolioData.github}
              linkedin={portfolioData.linkedin}
              medium={portfolioData.medium}
            />
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 px-4 sm:px-6 lg:px-8 border-t border-blue-500/30">
        <div className="max-w-6xl mx-auto text-center">
          {/* <p className="text-slate-400">© 2024 {portfolioData.name}. All rights reserved.</p> */}
          <p className="text-slate-500 text-sm mt-2">Built with Next.js and TypeScript</p>
        </div>
      </footer>
    </div>
  )
}