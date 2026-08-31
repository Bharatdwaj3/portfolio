function backendBase(): string {
  if (!import.meta.env.SSR) return "/api";
  if (import.meta.env.BACKEND_HOST) return import.meta.env.BACKEND_HOST;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}/api`;
  return "http://backend:9000";
}

const PROFILE_BASE = `${backendBase()}/profile`;
const PROJECTS_BASE = `${backendBase()}/projects`;
const SKILLS_BASE = `${backendBase()}/skills`;

export interface ProfileData {
  fullName: string;
  headline: string;
  bio: string;
  links: { label: string; url: string }[];
  resumeUrl: string;
  services: string[];
}

export interface Testimonial {
  _id: string;
  clientName: string;
  clientRole: string;
  quote: string;
}

export interface ContactMessage {
  senderName?: string;
  senderEmail: string;
  subject?: string;
  message?: string;
}

export async function fetchProfile(): Promise<ProfileData> {
  const response = await fetch(`${PROFILE_BASE}/`);
  if (!response.ok) throw new Error("Failed to fetch profile");
  return response.json();
}

export async function fetchTestimonials(): Promise<Testimonial[]> {
  const response = await fetch(`${PROFILE_BASE}/testimonials`);
  if (!response.ok) throw new Error("Failed to fetch testimonials");
  return response.json();
}

export async function sendMessage(payload: ContactMessage): Promise<Response> {
  return fetch(`${PROFILE_BASE}/messages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}

export interface Project {
  topics: string[];
  name: string;
  description: string;
  language: string;
  stars: number;
  featured: boolean;
  htmlUrl: string;
  liveUrl: string | null;
  imageUrl: string | null;
}

export interface ProjectDetail extends Project {
  htmlUrl: string;
  caseStudy: string;
  liveUrl: string | null;
  imageUrl: string | null;
  deploymentStatus: string | null;
}

export async function fetchProjects(): Promise<Project[]> {
  const response = await fetch(`${PROJECTS_BASE}/`);
  if (!response.ok) throw new Error("Failed to fetch projects");
  return response.json();
}

export async function fetchProject(name: string): Promise<ProjectDetail> {
  const response = await fetch(`${PROJECTS_BASE}/${name}`);
  if (!response.ok) throw new Error("Failed to fetch project");
  return response.json();
}

export interface Skill {
  name: string;
  projectCount: number;
  category: string;
  level: string;
}

export async function fetchSkills(): Promise<Skill[]> {
  const response = await fetch(`${SKILLS_BASE}/`);
  if (!response.ok) throw new Error("Failed to fetch skills");
  return response.json();
}
