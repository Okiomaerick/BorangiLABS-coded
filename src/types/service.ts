export interface WebsiteType {
  name: string;
  description: string;
}

export interface TechStack {
  frontend?: string[];
  backend?: string[];
  databases?: string[];
  cms?: string[];
  ecommerce?: string[];
  devops?: string[];
  diagnostic?: string[];
  repair?: string[];
  software?: string[];
  certifications?: string[];
  ml?: string[];
  nlp?: string[];
  vision?: string[];
  automation?: string[];
  cloud?: string[];
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  description: string;
  price: string;
  features: string[];
  details: string;
  icon: string;
  image?: string;
  websiteTypes: WebsiteType[];
  techStack: TechStack;
  process: string[];
  benefits: string[];
}
