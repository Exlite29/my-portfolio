
import { HomeIcon, UserIcon, FolderIcon, MailIcon, CodeIcon } from "lucide-react";

export const navItems = [
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


export const projects = [
    {
        id: "dujas",
        title: "Dujas Cleaning Ltd",
        description: "An online cleaning service booking platform with scheduling and payment features",
        category: "web",
        link: "https://dujascleaning.com/",
        github: "https://github.com/Exlite29",
        technologies: ["Wordpress", "Elementor"]
    },
    {
        id: "nextmba",
        title: "NextMBA",
        description: "NEXT MBA is a global online education platform that offers practical and professional knowledge in leadership, digital marketing, and technology-related fields.",
        category: "mobile",
        link: "https://admin.nextmba.com/",
        github: "https://github.com/Exlite29",
        technologies: ["React", "TypeScript", "Node.js", "MongoDB"]
    },
    {
        id: "oms",
        title: "OMS G-Rocket",
        description: "Minimalist portfolio design for creative professionals",
        category: "web",
        link: "https://g-rocket.me/",
        github: "https://github.com/Exlite29",
        technologies: ["React", "Next.js", "Tailwind CSS"]
    },
    {
        id: "revscout",
        title: "RevScout",
        description: "Augmented reality navigation prototype",
        category: "other",
        link: "https://revscout.io/",
        github: "https://github.com/Exlite29",
        technologies: ["React", "Node.js", "MongoDB", "Express"]
    },
]