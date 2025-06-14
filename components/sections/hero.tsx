
import React from 'react'
import doodle from '../../assets/d-round.png'
import sitting from '../../assets/sitting.png'
import curlyarrow from '../../assets/curlyarrow.png'
import { Download } from 'lucide-react'

function Hero() {

    return (
        <section id='home'>
            <div className='flex items-center justify-center h-screen w-full'>
                <div className='flex gap-20 justify-between '>
                    <div className='flex gap-2 mt-16' >
                        <div className="relative z-10">
                            <img className="h-62 w-20 mt-14" src={curlyarrow.src} alt="arrow" />
                        </div>
                        <div>
                            <h1 className='text-8xl font-bold relative z-10'>Jr. Front End</h1>
                            <h1 className='text-8xl text-[#00ADB5] font-bold relative z-10'>Developer</h1>
                            <div className="flex mt-14 gap-2">
                                <button className="px-6 py-2 bg-[#00ADB5] text-white font-bold rounded-3xl shadow-lg hover:bg-[#007F87] transition-colors duration-300">
                                    Hire me
                                </button>
                                <button className="px-6 py-2 bg-[#393E46] text-white font-bold rounded-3xl flex items-center gap-2 shadow-lg hover:bg-[#2C3136] transition-colors duration-300">
                                    Download CV <Download className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <img className="absolute top-0 left-0 z-0 w-screen" src={doodle.src} alt="mixed" />
                        <img className="h-86 w-86 relative mt-40 mr-40 z-10 shadow-2xs" src={sitting.src} alt="sitting" />
                    </div>
                </div>

            </div>


        </section>
    )
}

export default Hero