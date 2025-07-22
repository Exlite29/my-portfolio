'use client'
import { useState } from 'react';
import ladder from '../../assets/ladder.png';
import arrow from '../../assets/curlyarrow.png';
import { Email } from '../../data/index'

interface FormData {
    name: string;
    email: string;
    message: string;
}

interface SubmitStatus {
    success: boolean;
    message: string;
}

interface SanitizedData {
    name: string;
    email: string;
    message: string;
}

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState({
        success: false,
        message: ''
    });



    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev: FormData) => ({
            ...prev,
            [id]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus({ success: false, message: '' });

        try {
            // Client-side validation
            if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
                throw new Error('All fields are required');
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                throw new Error('Please enter a valid email address');
            }

            // Sanitize inputs (basic example - consider using a library like DOMPurify)
            const sanitizedData: SanitizedData = {
                name: formData.name.replace(/</g, '&lt;').replace(/>/g, '&gt;'),
                email: formData.email.replace(/</g, '&lt;').replace(/>/g, '&gt;'),
                message: formData.message.replace(/</g, '&lt;').replace(/>/g, '&gt;')
            };

            // Add CSRF token if your backend requires it
            const csrfToken: string | undefined = document.cookie
                .split('; ')
                .find((row: string) => row.startsWith('XSRF-TOKEN='))
                ?.split('=')[1];

            const response: Response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': csrfToken || ''
                },
                body: JSON.stringify(sanitizedData)
            });

            if (!response.ok) {
                const errorData: { message?: string } = await response.json();
                throw new Error(errorData.message || 'Submission failed');
            }

            setSubmitStatus({ success: true, message: 'Message sent successfully!' });
            setFormData({ name: '', email: '', message: '' });
        } catch (error: unknown) {
            setSubmitStatus({
                success: false,
                message: (error instanceof Error) ? error.message : 'An unexpected error occurred'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id='contact' className="flex justify-center items-center py-16 px-4 sm:px-8 lg:px-16">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 w-full max-w-6xl">
                {/* Left side with heading and decorative elements */}
                <div className="w-full lg:w-1/2 relative">
                    <h2 className="mb-8 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white text-left">
                        Got a project in <span className="text-[#00ADB5]">mind?</span>
                    </h2>

                    <div className="flex items-start gap-8">
                        <img
                            src={arrow.src}
                            alt="Decorative arrow"
                            width={64}
                            height={64}
                            className="w-16 h-16 mt-4"
                        />
                        <img
                            src={ladder.src}
                            alt="Decorative ladder"
                            width={256}
                            height={256}
                            className="w-64 h-64 object-contain"
                        />
                    </div>
                </div>

                {/* Right side with contact form */}
                <div className="w-full lg:w-1/2">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-1">
                            <label htmlFor="name" className="block text-lg font-medium text-gray-900 dark:text-white">
                                Your name
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#00ADB5] focus:border-[#00ADB5] dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                placeholder="Name"
                                required
                                maxLength={100}
                            />
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="email" className="block text-lg font-medium text-gray-900 dark:text-white">
                                Your email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#00ADB5] focus:border-[#00ADB5] dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                placeholder="Email"
                                required
                                maxLength={100}
                            />
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="message" className="block text-lg font-medium text-gray-900 dark:text-white">
                                Your message
                            </label>
                            <textarea
                                id="message"
                                rows={4}
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#00ADB5] focus:border-[#00ADB5] dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                placeholder="Message"
                                required
                                maxLength={2000}
                            ></textarea>
                        </div>

                        {submitStatus.message && (
                            <div className={`p-4 rounded-lg ${submitStatus.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                {submitStatus.message}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full px-6 py-3 bg-[#00ADB5] hover:bg-[#009fae] text-white font-bold rounded-lg shadow-md transition-colors duration-300 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default Contact;