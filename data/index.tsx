'use client';

import React from 'react';
import { HomeIcon, UserIcon, FolderIcon, MailIcon, CodeIcon } from "lucide-react";
import dujas from '../public/dujas.png';
import nextmba from '../public/nextmba.png';
import oms from '../public/oms.png';
import revscout from '../public/revscoutadmin.png'

// Type definitions for better type safety
export type ProjectCategory = 'web' | 'mobile' | 'other';

export interface NavItem {
    name: string;
    link: string;
    icon: React.ReactNode;
}

export interface Project {
    id: string;
    title: string;
    description: string;
    category: ProjectCategory;
    image: string;
    link: string;
    github: string;
    technologies: string[];
}

// Environment variables with fallback
export const emailApi = process.env.NEXT_PUBLIC_EMAIL || '';

// Navigation items with proper typing
export const navItems: NavItem[] = [
    {
        name: "Home",
        link: "#home",
        icon: <HomeIcon className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
        name: "About",
        link: "#about",
        icon: <UserIcon className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
        name: "Skills",
        link: "#skills",
        icon: <CodeIcon className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
        name: "Projects",
        link: "#projects",
        icon: <FolderIcon className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
        name: "Contact",
        link: "#contact",
        icon: <MailIcon className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
];

// Projects data with proper typing
export const projects: Project[] = [
    {
        id: "dujas",
        title: "Dujas Cleaning Ltd",
        description: "An online cleaning service booking platform with scheduling and payment features",
        category: "web",
        image: dujas.src,
        link: "https://dujascleaning.com/",
        github: "https://github.com/Exlite29",
        technologies: ["WordPress", "Elementor"]
    },
    {
        id: "nextmba",
        title: "NextMBA",
        description: "NEXT MBA is a global online education platform that offers practical and professional knowledge in leadership, digital marketing, and technology-related fields.",
        category: "mobile",
        image: nextmba.src,
        link: "https://admin.nextmba.com/",
        github: "https://github.com/Exlite29",
        technologies: ["React", "TypeScript", "Node.js", "MongoDB"]
    },
    {
        id: "oms",
        title: "OMS G-Rocket",
        description: "Minimalist portfolio design for creative professionals",
        category: "web",
        image: oms.src,
        link: "https://g-rocket.me/",
        github: "https://github.com/Exlite29",
        technologies: ["React", "Next.js", "Tailwind CSS"]
    },
    {
        id: "revscout",
        title: "RevScout",
        description: "Augmented reality navigation prototype",
        category: "other",
        image: revscout.src,
        link: "https://revscout.io/",
        github: "https://github.com/Exlite29",
        technologies: ["React", "Node.js", "MongoDB", "Express"]
    },
] as const;

// Utility function to get projects by category
export const getProjectsByCategory = (category: ProjectCategory): Project[] => {
    return projects.filter((project) => project.category === category);
};

// Utility function to get project by ID
export const getProjectById = (id: string): Project | undefined => {
    return projects.find((project) => project.id === id);
};

// Constant for supported categories
export const PROJECT_CATEGORIES: ProjectCategory[] = ['web', 'mobile', 'other'];