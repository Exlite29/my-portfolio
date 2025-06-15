import notes from '../../assets/musicnotes.png'
import doodleItems from '../../assets/doodleitems.png';
import work from '../../assets/Group62.png';
import lightbulb from '../../assets/lightbulb.png';
import vector from '../../assets/Vector186.png'

function About() {
    return (
        <section id='about' className="flex justify-center  text-center px-50 py-50">
            <div className="flex gap-10 justify-between w-full">
                <div className="w-1/2 relative">
                    <img
                        src={notes.src}
                        alt="Music Notes"
                        className="w-20 h-20 mb-4"
                    />
                    <div className='flex justify-center items-center mb-4 gap-2'>
                        <h2 className="text-3xl font-bold mb-4">
                            About <span className="text-[#00ADB5]">me</span>
                        </h2>
                        <img
                            src={lightbulb.src}
                            alt="light bulb"
                            className="w-20 h-20 mb-4 top-0 right-0"
                        />
                    </div>
                    <p className="text-lg mb-4">
                        "Hi, I'm Ariel – a passionate Jr. Front End Developer dedicated to turning design ideas into interactive, user-friendly websites. Let's build something amazing together!"
                    </p>
                    <img
                        src={vector.src}
                        alt="vector"
                        className="absolute right-0 mt-20 transform -translate-y-1/2 rotate-[180deg] w-32 h-32"
                    />
                </div>
                <div className=" relative flex justify-center items-center">
                    <img
                        src={doodleItems.src}
                        alt="About Us"
                        className="absolute left-1/2 w-3/4 top-1/2transform -translate-x-1/2 -translate-y-1/2 z-0 "
                    />
                    <img
                        src={work.src}
                        alt="Work"
                        className="relative z-10 w-1/2"
                    />
                </div>
            </div>
        </section>
    )
}

export default About;