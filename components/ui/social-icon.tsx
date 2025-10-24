import { IconType } from 'react-icons';

interface SocialIconProps {
    href: string;
    icon: IconType;
    label: string;
}

export const SocialIcon = ({ href, icon: Icon, label }: SocialIconProps) => {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-neutral-400 transition-colors duration-300 hover:scale-110 transform"
            aria-label={label}
        >
            <Icon size={24} />
        </a>
    );
};