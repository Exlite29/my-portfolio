'use client';
import { useState } from 'react';
import ladder from '../../assets/ladder.png';
import arrow from '../../assets/curlyarrow.png';

interface FormData {
    name: string;
    email: string;
    message: string;
}

interface SubmitStatus {
    success: boolean;
    message: string;
}

const initialFormData: FormData = {
    name: '',
    email: '',
    message: '',
};

const initialSubmitStatus: SubmitStatus = {
    success: false,
    message: '',
};

function sanitizeInput(input: string): string {
    return input.replace(/</g, '&lt;').replace(/>/g, '&gt;');
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
            // Validation
            if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
                throw new Error('All fields are required');
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                throw new Error('Please enter a valid email address');
            }

            // Sanitize
            const sanitizedData = {
                name: sanitizeInput(formData.name),
                email: sanitizeInput(formData.email),
                message: sanitizeInput(formData.message),
            };

            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: sanitizedData.name,
                    email: sanitizedData.email,
                    message: sanitizedData.message
                }),
            });

            const text = await response.text();
            let data;

            try {
                data = JSON.parse(text);
            } catch {
                console.error('Failed to parse response:', text);
                throw new Error('Server returned invalid JSON');
            }

            if (!response.ok) {
                throw new Error(data.message || 'Failed to send message');
            }

            setSubmitStatus({
                success: true,
                message: data.message || 'Message sent successfully!'
            });
            setFormData(initialFormData);
        } catch (error: unknown) {
            console.error('Submission error:', error);
            let errorMessage = 'Failed to send message. Please try again later.';
            if (error instanceof Error) {
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
                {/* Right: Contact Form */}
                <div className="w-full lg:w-1/2">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-lg font-medium text-gray-900 dark:text-white"
                            >
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
                                autoComplete="name"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-lg font-medium text-gray-900 dark:text-white"
                            >
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
                                autoComplete="email"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="message"
                                className="block text-lg font-medium text-gray-900 dark:text-white"
                            >
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
                            />
                        </div>
                        {submitStatus.message && (
                            <div
                                className={`p-4 rounded-lg ${submitStatus.success
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-red-100 text-red-800'
                                    }`}
                            >
                                {submitStatus.message}
                            </div>
                        )}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full px-6 py-3 bg-[#00ADB5] hover:bg-[#009fae] text-white font-bold rounded-lg shadow-md transition-colors duration-300 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                                }`}
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