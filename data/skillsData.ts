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
  FaNodeJs,
  FaPython,
  FaDocker,
} from "react-icons/fa";
import { GrGraphQl } from "react-icons/gr";
import {
  SiRender,
  SiMongodb,
  SiPostgresql,
  SiExpress,
  SiPrisma,
} from "react-icons/si";
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
    name: "Node.js",
    icon: FaNodeJs,
    color: "#339933",
    category: "backend",
    level: "Intermediate",
  },
  {
    name: "Express.js",
    icon: SiExpress,
    color: "#000000",
    category: "backend",
    level: "Intermediate",
  },
  {
    name: "MongoDB",
    icon: SiMongodb,
    color: "#13AA52",
    category: "backend",
    level: "Intermediate",
  },
  {
    name: "PostgreSQL",
    icon: SiPostgresql,
    color: "#336791",
    category: "backend",
    level: "Intermediate",
  },
  {
    name: "Prisma ORM",
    icon: SiPrisma,
    color: "#2D3748",
    category: "backend",
    level: "Intermediate",
  },
  {
    name: "Docker",
    icon: FaDocker,
    color: "#2496ED",
    category: "tools",
    level: "Beginner",
  },
  {
    name: "Python",
    icon: FaPython,
    color: "#3776AB",
    category: "backend",
    level: "Beginner",
  },
  {
    name: "Render",
    icon: SiRender,
    color: "#46E3B7",
    category: "tools",
    level: "Intermediate",
  },
];
