import Image from 'next/image'; // Add this import
import notes from '../../assets/musicnotes.png';
import doodleItems from '../../assets/doodleitems.png';
import work from '../../assets/Group62.png';
import lightbulb from '../../assets/lightbulb.png';
import vector from '../../assets/Vector186.png';

function About() {
    return (
        <section id='about' className="flex justify-center items-center py-16 px-4 sm:px-8 lg:px-16">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 w-full max-w-6xl">
                {/* Left Content */}
                <div className="w-full lg:w-1/2 relative">
                    <div className="flex items-start mb-2">
                        <Image
                            src={notes}
                            alt="Music Notes"
                            width={64}
                            height={64}
                            className="w-12 h-12 sm:w-16 sm:h-16"
                            priority // Add for above-the-fold images
                        />
                    </div>

                    <div className='flex items-center gap-4 mb-6'>
                        <h2 className="text-3xl sm:text-4xl font-bold">
                            About <span className="text-[#00ADB5]">me</span>
                        </h2>
                        <Image
                            src={lightbulb}
                            alt="Light bulb"
                            width={64}
                            height={64}
                            className="w-12 h-12 sm:w-16 sm:h-16"
                        />
                    </div>

                    <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                        Hi, I&apos;m Ariel – a passionate Jr. Front End Developer dedicated to turning design ideas into interactive, user-friendly websites. Let&apos;s build something amazing together!
                    </p>


                    <Image
                        src={vector}
                        alt="Decorative vector"
                        width={128}
                        height={128}
                        className="absolute right-0 top-1/2 w-24 h-24 sm:w-32 sm:h-32 transform -translate-y-1/2 rotate-180 opacity-70"
                    />
                </div>

                {/* Right Content - Images */}
                <div className="w-full lg:w-1/2 relative flex justify-center items-center min-h-[300px]">
                    <Image
                        src={doodleItems}
                        alt="Doodle items"
                        width={500}
                        height={500}
                        className="absolute w-full max-w-md opacity-70"
                        style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
                    />
                    <Image
                        src={work}
                        alt="Work illustration"
                        width={400}
                        height={400}
                        className="relative z-10 w-full max-w-xs sm:max-w-sm"
                    />
                </div>
            </div>
        </section>
    );
}

export default About;