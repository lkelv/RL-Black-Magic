import React from 'react';
import alanImg from '../assets/alan.jpg';
import michaelImg from '../assets/michael.png';
import yeehengImg from '../assets/Yeeheng.png';
import kelvinImg from '../assets/kelvinv2.png';
import tomImg from '../assets/tom.png';

const teamMembers = [
    {
        name: 'Michael Wang',
        role: 'Project Manager',
        description: 'Oversees project roadmap and department coordination.',
        image: michaelImg,
    },
    {
        name: 'Alan Zhang',
        role: 'Material Lead',
        description: 'Heads the Material Dept and CAS content development.',
        image: alanImg,
    },
    {
        name: 'Yeeheng Lee',
        role: 'Software Engineer',
        description: 'Web and activation systems, specialising in UX and front-end development.',
        image: yeehengImg,
    },
    {
        name: 'Kelvin Liang',
        role: 'Software Engineer',
        description: 'Skilled architect for web and activation systems.',
        image: kelvinImg,
    },
    {
        name: 'Tom Le',
        role: 'Software Engineer',
        description: 'Backend logic and calculator integration.',
        image: tomImg,
    }
];

function MeetTheTeam() {
    return (
        <div className="bg-[#202830] text-white py-20 px-4 min-h-screen">
            <div className="max-w-[1400px] mx-auto">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-3">Meet Our Team</h1>
                    <div className="w-20 h-1 bg-[#74be9c] mx-auto mb-6"></div>
                    <p className="text-gray-400">The talent behind BlackMagic</p>
                </div>

                {/* Unified Row Container */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 lg:gap-8">
                    {teamMembers.map((member, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center group cursor-pointer"
                        >
                            {/* Unified Image Frame */}
                            <div className="bg-[#2d5047] p-1.5 rounded-2xl mb-6 transition-all duration-300 group-hover:shadow-[0_0_25px_rgba(116,190,156,0.3)] group-hover:-translate-y-2 w-full max-w-[240px]">
                                <div className="overflow-hidden rounded-xl aspect-[4/5] relative bg-[#1a1f26]">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        /* REMOVED grayscale and grayscale-0 */
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                </div>
                            </div>

                            {/* Text Section */}
                            <div className="text-center w-full max-w-[240px]">
                                <h3 className="text-lg font-bold text-[#f4a52e] mb-1 transition-colors group-hover:text-white">
                                    {member.name}
                                </h3>
                                <p className="text-[#74be9c] font-bold text-[10px] uppercase tracking-widest mb-3">
                                    {member.role}
                                </p>

                                {/* Hidden Description - Appears on Hover */}
                                <div className="min-h-[80px] flex justify-center">
                                    <p className="text-gray-400 text-xs leading-relaxed px-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out">
                                        {member.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default MeetTheTeam;