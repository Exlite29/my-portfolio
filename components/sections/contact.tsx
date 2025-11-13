'use client';
import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import ladder from '../../assets/ladder.png';
import arrow from '../../assets/curlyarrow.png';
import { FormData, SubmitStatus, initialFormData, initialSubmitStatus } from '@/types/contact';
import { sanitizeInput } from '@/utils/form';
import axios from 'axios';
import { contactAPI } from '@/types/contact';



interface FormFieldProps {
    id: string;
    label: string;
    type: 'text' | 'email' | 'textarea';
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    maxLength?: number;
    autoComplete?: string;
    rows?: number;
}

function FormField({
    id,
    label,
    type,
    value,
    onChange,
    maxLength,
    autoComplete,
    rows
}: FormFieldProps) {
    const commonClasses = "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#00ADB5] focus:border-[#00ADB5] dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white";

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
        >
            <motion.label
                htmlFor={id}
                className="block text-lg font-medium text-gray-900 dark:text-white"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
            >
                {label}
            </motion.label>
            {type === 'textarea' ? (
                <motion.textarea
                    id={id}
                    value={value}
                    onChange={onChange}
                    className={commonClasses}
                    placeholder={label}
                    required
                    maxLength={maxLength}
                    rows={rows}
                    whileFocus={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                />
            ) : (
                <motion.input
                    type={type}
                    id={id}
                    value={value}
                    onChange={onChange}
                    className={commonClasses}
                    placeholder={label}
                    required
                    maxLength={maxLength}
                    autoComplete={autoComplete}
                    whileFocus={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                />
            )}
        </motion.div>
    );
}

function Contact() {
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<SubmitStatus>(initialSubmitStatus);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(initialSubmitStatus);

        try {
            // Validation (keep your existing validation)
            if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
                throw new Error('All fields are required');
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                throw new Error('Please enter a valid email address');
            }

            // Sanitize (keep your existing sanitization)
            const sanitizedData = {
                name: sanitizeInput(formData.name),
                email: sanitizeInput(formData.email),
                message: sanitizeInput(formData.message),
            };

            // ✅ CHANGE ONLY THIS PART - Replace fetch with Axios
            const response = await axios.post(contactAPI ?? '/api/contact', {
                name: sanitizedData.name,
                email: sanitizedData.email,
                message: sanitizedData.message
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // ✅ SIMPLER RESPONSE HANDLING - No need for response.text() or JSON.parse()
            if (response.status >= 200 && response.status < 300) {
                setSubmitStatus({
                    success: true,
                    message: response.data.message || 'Message sent successfully!'
                });
                setFormData(initialFormData);
            } else {
                throw new Error(response.data.message || 'Failed to send message');
            }

        } catch (error: unknown) {
            console.error('Submission error:', error);
            let errorMessage = 'Failed to send message. Please try again later.';

            if (axios.isAxiosError(error)) {
                // Axios-specific error handling
                errorMessage = error.response?.data?.message || error.message || 'Network error';
            } else if (error instanceof Error) {
                errorMessage = error.message;
            }

            setSubmitStatus({
                success: false,
                message: errorMessage,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section
            id="contact"
            className="flex justify-center items-center py-16 px-4 sm:px-8 lg:px-16"
        >
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 w-full max-w-6xl">
                {/* Left: Heading & Decorative */}
                <motion.div
                    className="w-full lg:w-1/2 relative"
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.h2
                        className="mb-8 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white text-left"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        Got a project in <motion.span
                            className="text-[#00ADB5]"
                            animate={{
                                scale: [1, 1.1, 1],
                                color: ["#00ADB5", "#009fae", "#00ADB5"]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatType: "reverse"
                            }}
                        >
                            mind?
                        </motion.span>
                    </motion.h2>
                    <div className="flex items-start gap-8">
                        <motion.div
                            animate={{
                                x: [0, 10, 0],
                                rotate: [0, 15, 0]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatType: "reverse"
                            }}
                        >
                            <Image
                                src={arrow}
                                alt="Decorative arrow"
                                width={64}
                                height={64}
                                className="w-16 h-16 mt-4"
                                priority
                            />
                        </motion.div>
                        <motion.div
                            animate={{
                                y: [0, -20, 0],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                repeatType: "reverse"
                            }}
                        >
                            <Image
                                src={ladder}
                                alt="Decorative ladder"
                                width={256}
                                height={256}
                                className="w-64 h-64 object-contain"
                                priority
                            />
                        </motion.div>
                    </div>
                </motion.div>
                {/* Right: Contact Form */}
                <motion.div
                    className="w-full lg:w-1/2"
                    initial={{ opacity: 0, x: 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <FormField
                            id="name"
                            label="Your name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            maxLength={100}
                            autoComplete="name"
                        />
                        <FormField
                            id="email"
                            label="Your email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            maxLength={100}
                            autoComplete="email"
                        />
                        <FormField
                            id="message"
                            label="Your message"
                            type="textarea"
                            value={formData.message}
                            onChange={handleChange}
                            maxLength={2000}
                            rows={4}
                        />
                        <AnimatePresence mode="wait">
                            {submitStatus.message && (
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    transition={{ duration: 0.3 }}
                                    className={`p-4 rounded-lg ${submitStatus.success
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-red-100 text-red-800'
                                        }`}
                                >
                                    {submitStatus.message}
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <motion.button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full px-6 py-3 bg-[#00ADB5] hover:bg-[#009fae] text-white font-bold rounded-lg shadow-md transition-colors duration-300 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                                }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ duration: 0.2 }}
                        >
                            {isSubmitting ? (
                                <motion.span
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    Sending...
                                </motion.span>
                            ) : (
                                'Send Message'
                            )}
                        </motion.button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
}

export default Contact;