export const SITE = {
  name: "SOUR LEMON",
  tagline: "Complexity becomes intelligence.",
  description:
    "AI-powered Operational Intelligence Platform that helps enterprises reduce complexity, automate workflows, preserve knowledge and accelerate onboarding.",
  url: "https://sourlemon.ai",
  email: "hello@sourlemon.ai",
};

export const NAV_LINKS = [
  { label: "Platform",    href: "/platform" },
  { label: "Use Cases",   href: "/use-cases" },
  { label: "Case Studies",href: "/case-studies" },
  { label: "About",       href: "/about" },
  { label: "Pricing",     href: "/pricing" },
] as const;

export const FOOTER_LINKS = {
  Platform: [
    { label: "AI Knowledge Assistant", href: "/platform#knowledge" },
    { label: "Process Intelligence",   href: "/platform#process" },
    { label: "Workflow Automation",    href: "/platform#workflow" },
    { label: "AI Agent Platform",      href: "/platform#agents" },
    { label: "Predictive Analytics",   href: "/platform#analytics" },
  ],
  "Use Cases": [
    { label: "Pharma & Life Sciences", href: "/use-cases/pharma" },
    { label: "GMP Manufacturing",      href: "/use-cases/manufacturing" },
    { label: "Automotive",             href: "/use-cases/automotive" },
    { label: "Healthcare",             href: "/use-cases/healthcare" },
    { label: "Finance",                href: "/use-cases/finance" },
  ],
  Company: [
    { label: "About",         href: "/about" },
    { label: "Blog",          href: "/blog" },
    { label: "Case Studies",  href: "/case-studies" },
    { label: "Pricing",       href: "/pricing" },
    { label: "Contact",       href: "/contact" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/legal/privacy" },
    { label: "Terms of Service", href: "/legal/terms" },
    { label: "Security",         href: "/legal/security" },
    { label: "GDPR",             href: "/legal/gdpr" },
  ],
} as const;

export const STATS = [
  { value: 10,  suffix: "×",  label: "Faster knowledge retrieval" },
  { value: 87,  suffix: "%",  label: "Reduction in onboarding time" },
  { value: 100, suffix: "%",  label: "Audit trail coverage" },
  { value: 40,  suffix: "+",  label: "Enterprise integrations" },
] as const;

export const INDUSTRIES = [
  "Pharma & Life Sciences",
  "GMP Manufacturing",
  "Automotive",
  "Logistics",
  "Healthcare",
  "Financial Services",
] as const;

export const PLATFORM_MODULES = [
  {
    id: "knowledge",
    icon: "Brain",
    title: "AI Knowledge Assistant",
    subtitle: "Instant answers from your entire knowledge base",
    description:
      "Natural language queries return precise, source-cited answers from your SOPs, batch records, and institutional knowledge. No hallucinations — only traceable intelligence.",
    features: [
      "Natural language Q&A across all enterprise documents",
      "Source citations with full audit trail",
      "Role-based knowledge access control",
      "Multi-language support (30+ languages)",
    ],
  },
  {
    id: "process",
    icon: "GitBranch",
    title: "Process Intelligence",
    subtitle: "Understand every workflow at a glance",
    description:
      "Automatically maps, analyzes and optimizes your business processes. Identifies bottlenecks, compliance gaps and improvement opportunities before they become problems.",
    features: [
      "Automated process discovery and mapping",
      "Real-time deviation detection",
      "Compliance gap analysis",
      "Process optimization recommendations",
    ],
  },
  {
    id: "workflow",
    icon: "Workflow",
    title: "Workflow Automation",
    subtitle: "Automate repetitive operations intelligently",
    description:
      "Build intelligent automation workflows without code. Connect your ERP, MES, LIMS, and document management systems into seamless automated pipelines.",
    features: [
      "No-code workflow builder",
      "40+ pre-built enterprise connectors",
      "Conditional logic and approvals",
      "Real-time monitoring and alerting",
    ],
  },
  {
    id: "agents",
    icon: "Bot",
    title: "AI Agent Platform",
    subtitle: "Deploy autonomous AI agents across your organization",
    description:
      "Specialized AI agents that handle complex multi-step tasks. From batch release decisions to supplier qualification — your digital workforce, available 24/7.",
    features: [
      "Pre-built agents for GMP, QA, Logistics",
      "Custom agent builder with drag-and-drop UI",
      "Human-in-the-loop escalation",
      "Full auditability and explainability",
    ],
  },
  {
    id: "analytics",
    icon: "BarChart3",
    title: "Predictive Analytics",
    subtitle: "See problems before they happen",
    description:
      "Machine learning models trained on your operational data predict equipment failures, quality deviations, and process anomalies — days before they occur.",
    features: [
      "Predictive maintenance alerts",
      "Quality deviation forecasting",
      "Supply chain risk modeling",
      "Customizable KPI dashboards",
    ],
  },
  {
    id: "documents",
    icon: "FileText",
    title: "Document Intelligence",
    subtitle: "Extract meaning from every document",
    description:
      "Automatically classify, extract, and index information from PDFs, scanned documents, emails, and legacy systems. Turn unstructured data into queryable knowledge.",
    features: [
      "OCR for scanned documents",
      "Intelligent document classification",
      "Automated metadata extraction",
      "Version control and change tracking",
    ],
  },
  {
    id: "training",
    icon: "GraduationCap",
    title: "Training Assistant",
    subtitle: "Accelerate employee competency",
    description:
      "AI-powered training paths that adapt to each employee's role, experience level, and learning pace. Reduce time-to-competency by 80% across your organization.",
    features: [
      "Role-based learning paths",
      "Interactive SOP walkthroughs",
      "Competency assessment and certification",
      "Progress tracking and reporting",
    ],
  },
  {
    id: "workforce",
    icon: "Users",
    title: "Digital Workforce",
    subtitle: "Scale your operations without scaling headcount",
    description:
      "A complete digital workforce that handles routine knowledge work, regulatory reporting, and operational support tasks autonomously — freeing your people for high-value activities.",
    features: [
      "Automated regulatory reporting",
      "24/7 intelligent support desk",
      "Cross-department knowledge routing",
      "Performance analytics and ROI tracking",
    ],
  },
] as const;
