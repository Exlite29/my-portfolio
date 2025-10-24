'use client';

import { motion } from 'framer-motion';
import { socialLinks } from '@/data/socialLinks';
import { SocialIcon } from '@/components/ui/social-icon';

const footerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
};

const socialLinksVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { staggerChildren: 0.1 }
};

const iconVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
};

export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <motion.footer
            className="py-6 mt-auto"
            initial="initial"
            whileInView="animate"
            variants={footerVariants}
            viewport={{ once: true }}
        >
            <div className="container mx-auto px-4 text-center">
                <motion.div
                    className="flex justify-center space-x-6 mb-4"
                    variants={socialLinksVariants}
                >
                    {socialLinks.map((link) => (
                        <motion.div key={link.id} variants={iconVariants}>
                            <SocialIcon
                                href={link.href}
                                icon={link.icon}
                                label={link.label}
                            />
                        </motion.div>
                    ))}
                </motion.div>

                <motion.p
                    className="text-neutral-500 text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    &copy; {currentYear} Ariel. All rights reserved.
                </motion.p>
            </div>
        </motion.footer>
    );
};