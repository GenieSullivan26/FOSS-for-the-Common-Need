export interface RepoModule {
  id: string;
  name: string;
  gemName: string;
  tagline: string;
  description: string;
  type: string;
  license: string;
  status: 'Active Sprint' | 'Specification' | 'Stable Core';
  version: string;
  githubUrl: string;
  keyFeatures: string[];
  sampleCode: string;
  routesSample: string;
}

export interface EconomicPillar {
  id: string;
  title: string;
  category: string;
  problem: string;
  solution: string;
  metric: string;
}

export interface DonationTier {
  amount: number;
  label: string;
  impact: string;
  breakdown: string;
  popular?: boolean;
}

export interface FaqItem {
  question: string;
  category: 'Governance' | 'Open Source' | 'Logistics' | 'Finances';
  answer: string;
}

export interface PartnerInquiry {
  orgName: string;
  contactName: string;
  email: string;
  orgType: string;
  location: string;
  estimatedDeliveriesWeekly: string;
  needsDescription: string;
}

export interface DevDispatchSignup {
  fullName: string;
  email: string;
  githubHandle: string;
  skillsets: string[];
  interestArea: string;
  availabilityHours: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  date: string; // ISO date or formatted date
  timestamp: number;
  author: {
    name: string;
    role: string;
  };
  category: 'Announcements' | 'Engineering' | 'Community & Pilots' | 'Governance & Policy';
  readTime: string;
  summary: string;
  content: string;
  tags: string[];
  featured?: boolean;
}

export interface ProjectItem {
  id: string;
  title: string;
  repoName: string;
  category: string;
  tagline: string;
  description: string;
  goals: string[];
  currentStatus: 'Active Alpha Sprint' | 'In Specification' | 'Pilot Ready' | 'Active Development' | 'Public Draft';
  statusCode: 'active' | 'spec' | 'pilot' | 'draft';
  progressPercent: number;
  repositoryUrl: string;
  docsUrl?: string;
  techStack: string[];
  license: string;
  leadRole: string;
  keyDeliverables: string[];
}

