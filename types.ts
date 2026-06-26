import { ReactNode } from 'react';

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
  highlight?: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
}

export interface Company {
  id: number;
  name: string;
  logo: string;
}
