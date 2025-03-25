// components/Footer.tsx
import Link from "next/link";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export const Footer = () => {
    return (
        <footer className="bg-neutral-800 text-white py-6 mt-auto">
            <div className="container mx-auto px-4 text-center">
                {/* Social Media Links */}
                <div className="flex justify-center space-x-6 mb-4">
                    <a
                        href="https://github.com/Exlite29"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-neutral-400 transition-colors"
                        aria-label="GitHub"
                    >
                        <FaGithub size={24} />
                    </a>
                    <a
                        href="https://linkedin.com/in/ariel-agdon-916846160/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-neutral-400 transition-colors"
                        aria-label="LinkedIn"
                    >
                        <FaLinkedin size={24} />
                    </a>
                    <a
                        href="mailto:youremail@example.com"
                        className="hover:text-neutral-400 transition-colors"
                        aria-label="Email"
                    >
                        <FaEnvelope size={24} />
                    </a>
                </div>

                {/* Copyright Notice */}
                <p className="text-neutral-500 text-sm">
                    &copy; {new Date().getFullYear()} Your Name. All rights reserved.
                </p>
            </div>
        </footer>
    );
};