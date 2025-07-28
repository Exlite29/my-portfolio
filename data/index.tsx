
import { HomeIcon, UserIcon, MessageCircleIcon } from "lucide-react";

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
        title: "E-commerce Website",
        description: "A modern online shopping platform with payment integration",
        category: "web",
        image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 2,
        title: "Fitness Mobile App",
        description: "Workout tracking application with personalized plans",
        category: "mobile",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 3,
        title: "Portfolio Website",
        description: "Minimalist portfolio design for creative professionals",
        category: "web",
        image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 4,
        title: "AR Navigation",
        description: "Augmented reality navigation prototype",
        category: "other",
        image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 5,
        title: "Recipe Mobile App",
        description: "Cooking app with step-by-step instructions",
        category: "mobile",
        image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
    },
    {
        id: 6,
        title: "Dashboard UI",
        description: "Analytics dashboard for business metrics",
        category: "web",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
    }
]