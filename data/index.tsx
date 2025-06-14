
import { HomeIcon, UserIcon, MessageCircleIcon } from "lucide-react";

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