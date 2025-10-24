import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { IconType } from "react-icons";

export interface SocialLink {
    id: string;
    href: string;
    icon: IconType;
    label: string;
}

export const socialLinks: SocialLink[] = [
    {
        id: 'github',
        href: 'https://github.com/Exlite29',
        icon: FaGithub,
        label: 'GitHub'
    },
    {
        id: 'linkedin',
        href: 'https://linkedin.com/in/ariel-agdon-916846160/',
        icon: FaLinkedin,
        label: 'LinkedIn'
    },
    {
        id: 'email',
        href: `mailto:${process.env.NEXT_PUBLIC_EMAIL}`,
        icon: FaEnvelope,
        label: 'Email'
    }
];