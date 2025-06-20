import Image from 'next/image'; // Add this import
import ladder from '../../assets/ladder.png';
import arrow from '../../assets/curlyarrow.png';

function Contact() {
    return (
        <section id='contact' className="flex justify-center items-center py-16 px-4 sm:px-8 lg:px-16 ">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 w-full max-w-6xl">
                {/* Left side with heading and decorative elements */}
                <div className="w-full lg:w-1/2 relative">
                    <h2 className="mb-8 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white text-left">
                        Got a project in <span className="text-[#00ADB5]">mind?</span>
                    </h2>

                    <div className="flex items-start gap-8">
                        <Image
                            src={arrow}
                            alt="Decorative arrow"
                            width={64}
                            height={64}
                            className="w-16 h-16 mt-4"
                        />
                        <Image
                            src={ladder}
                            alt="Decorative ladder"
                            width={256}
                            height={256}
                            className="w-64 h-64 object-contain"
                        />
                    </div>
                </div>

                {/* Right side with contact form */}
                <div className="w-full lg:w-1/2">
                    <form className="space-y-6">
                        <div className="space-y-1">
                            <label htmlFor="name" className="block text-lg font-medium text-gray-900 dark:text-white">
                                Your name
                            </label>
                            <input
                                type="text"
                                id="name"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#00ADB5] focus:border-[#00ADB5] dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                placeholder="Name"
                                required
                            />
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="email" className="block text-lg font-medium text-gray-900 dark:text-white">
                                Your email
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#00ADB5] focus:border-[#00ADB5] dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                placeholder="Email"
                                required
                            />
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="message" className="block text-lg font-medium text-gray-900 dark:text-white">
                                Your message
                            </label>
                            <textarea
                                id="message"
                                rows={4}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#00ADB5] focus:border-[#00ADB5] dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                placeholder="Message"
                                required
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="w-full px-6 py-3 bg-[#00ADB5] hover:bg-[#009fae] text-white font-bold rounded-lg shadow-md transition-colors duration-300"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default Contact;