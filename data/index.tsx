
import { HomeIcon, UserIcon, MessageCircleIcon } from "lucide-react";
import dujas from '../public/dujas.png';
import nextmba from '../public/nextmba.png';
import oms from '../public/oms.png';
import revscout from '../public/revscoutadmin.png'
import { link } from "fs";

export const emailApi = process.env.REACT_APP_EMAIL || '';

export const navItems = [
    {
        name: "Home",
        link: "#home",
        icon: <HomeIcon className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
        name: "About Me",
        link: "#about",
        icon: <UserIcon className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
        name: "Projects",
        link: "#projects",
        icon: (
            <MessageCircleIcon className="h-4 w-4 text-neutral-500 dark:text-white" />
        ),
    },
    {
        name: "Contact",
        link: "#contact",
        icon: (
            <MessageCircleIcon className="h-4 w-4 text-neutral-500 dark:text-white" />
        ),
    },

];


export const projects = [
    {
        id: 1,
        title: "Dujas Cleaning Ltd",
        description: "An online cleaning service booking platform with scheduling and payment features",
        category: "web",
        image: dujas.src,
        link: "https://dujascleaning.com/"
    },
    {
        id: 2,
        title: "NextMBA",
        description: "NEXT MBA is a global online education platform that offers practical and professional knowledge in leadership, digital marketing, and technology-related fields.",
        category: "mobile",
        image: nextmba.src,
        link: "https://admin.nextmba.com/"
    },
    {
        id: 3,
        title: "OMS G-Rocket",
        description: "Minimalist portfolio design for creative professionals",
        category: "web",
        image: oms.src,
        link: "https://g-rocket.me/"
    },
    {
        id: 4,
        title: "RevScout",
        description: "Augmented reality navigation prototype",
        category: "other",
        image: revscout.src,
        link: "https://revscout.io/"
    },
]