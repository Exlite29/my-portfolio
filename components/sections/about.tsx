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
                        <img
                            src={notes.src}
                            alt="Music Notes"
                            className="w-12 h-12 sm:w-16 sm:h-16"
                        />
                    </div>

                    <div className='flex items-center gap-4 mb-6'>
                        <h2 className="text-3xl sm:text-4xl font-bold">
                            About <span className="text-[#00ADB5]">me</span>
                        </h2>
                        <img
                            src={lightbulb.src}
                            alt="Light bulb"
                            className="w-12 h-12 sm:w-16 sm:h-16"
                        />
                    </div>

                    <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                        "Hi, I'm Ariel – a passionate Jr. Front End Developer dedicated to turning design ideas into interactive, user-friendly websites. Let's build something amazing together!"
                    </p>

                    <img
                        src={vector.src}
                        alt="Decorative vector"
                        className="absolute right-0 top-1/2 w-24 h-24 sm:w-32 sm:h-32 transform -translate-y-1/2 rotate-180 opacity-70"
                    />
                </div>

                {/* Right Content - Images */}
                <div className="w-full lg:w-1/2 relative flex justify-center items-center min-h-[300px]">
                    <img
                        src={doodleItems.src}
                        alt="Doodle items"
                        className="absolute w-full max-w-md opacity-70"
                        style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
                    />
                    <img
                        src={work.src}
                        alt="Work illustration"
                        className="relative z-10 w-full max-w-xs sm:max-w-sm"
                    />
                </div>
            </div>
        </section>
    );
}

export default About;