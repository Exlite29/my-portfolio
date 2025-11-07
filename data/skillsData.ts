import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaGitAlt,
  FaGithub,
  FaNpm,
  FaFigma,
  FaCode,
} from "react-icons/fa";
import { GrGraphQl } from "react-icons/gr";
import { SiRender } from "react-icons/si";
import {
  SiTypescript,
  SiTailwindcss,
  SiNextdotjs,
  SiFramer,
  SiVercel,
} from "react-icons/si";
import { IconType } from "react-icons";

export interface Skill {
  name: string;
  icon: IconType;
  color: string;
  category: "frontend" | "backend" | "tools" | "design";
  level: "Beginner" | "Intermediate" | "Advanced";
}

export const skillsData: Skill[] = [
  {
    name: "HTML",
    icon: FaHtml5,
    color: "#E34F26",
    category: "frontend",
    level: "Advanced",
  },
  {
    name: "CSS",
    icon: FaCss3Alt,
    color: "#1572B6",
    category: "frontend",
    level: "Advanced",
  },
  {
    name: "JavaScript",
    icon: FaJs,
    color: "#F7DF1E",
    category: "frontend",
    level: "Advanced",
  },
  {
    name: "TypeScript",
    icon: SiTypescript,
    color: "#3178C6",
    category: "frontend",
    level: "Intermediate",
  },
  {
    name: "React",
    icon: FaReact,
    color: "#61DAFB",
    category: "frontend",
    level: "Advanced",
  },
  {
    name: "Next.js",
    icon: SiNextdotjs,
    color: "#000000",
    category: "frontend",
    level: "Intermediate",
  },
  {
    name: "Tailwind CSS",
    icon: SiTailwindcss,
    color: "#06B6D4",
    category: "frontend",
    level: "Advanced",
  },
  {
    name: "Framer Motion",
    icon: SiFramer,
    color: "#FF0066",
    category: "frontend",
    level: "Intermediate",
  },
  {
    name: "Git",
    icon: FaGitAlt,
    color: "#F05032",
    category: "tools",
    level: "Intermediate",
  },
  {
    name: "GitHub",
    icon: FaGithub,
    color: "#181717",
    category: "tools",
    level: "Intermediate",
  },
  {
    name: "VS Code",
    icon: FaCode,
    color: "#007ACC",
    category: "tools",
    level: "Advanced",
  },
  {
    name: "npm",
    icon: FaNpm,
    color: "#CB3837",
    category: "tools",
    level: "Intermediate",
  },
  {
    name: "Vercel",
    icon: SiVercel,
    color: "#000000",
    category: "tools",
    level: "Intermediate",
  },
  {
    name: "Figma",
    icon: FaFigma,
    color: "#F24E1E",
    category: "design",
    level: "Intermediate",
  },
  {
    name: "Graph QL",
    icon: GrGraphQl,
    color: "#E10098",
    category: "frontend",
    level: "Advanced",
  },
  {
    name: "Render",
    icon: SiRender,
    color: "#000000",
    category: "backend",
    level: "Intermediate",
  },
];
