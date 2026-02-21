import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Globe, ArrowRight } from 'lucide-react';

function Footer() {
    const currentYear = new Date().getFullYear();

    // Map service names to their respective routes
    const services = [
        { name: 'Programs K-12 Academic Coaching', path: '/programs' },
        { name: 'CAS Calculator Booklet - Exclusive in Australia', path: '/cas-booklet' },
        { name: 'Medpro - Australian Medical School Application', path: '/medpro' },
        { name: 'Overseas Study - US/UK/EU Universities', path: '/overseas' }
    ];

    return (
        <footer className="bg-[#202830] text-gray-300 border-t border-gray-700 pt-16 pb-8 px-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

                    {/* Services Section - Updated to Links */}
                    <div>
                        <h3 className="text-white text-lg font-bold mb-6 flex items-center gap-2">
                            Our Services
                            <div className="h-1 w-8 bg-[#74be9c] rounded-full"></div>
                        </h3>
                        <ul className="space-y-4">
                            {services.map((service) => (
                                <li key={service.name}>
                                    <Link
                                        to="https://rleducation.com.au/"
                                        className="hover:text-[#74be9c] flex items-start gap-3 transition-all hover:translate-x-1 group text-sm"
                                    >
                                        <ArrowRight className="text-[#74be9c] mt-0.5 flex-shrink-0 transition-colors" size={14} />
                                        <span>{service.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Section */}
                    <div>
                        <h3 className="text-white text-lg font-bold mb-6 flex items-center gap-2">
                            Contact Us
                            <div className="h-1 w-8 bg-[#74be9c] rounded-full"></div>
                        </h3>
                        <ul className="space-y-5">
                            <li className="flex items-center gap-4 group">
                                <div className="bg-gray-800 p-2 rounded-lg group-hover:bg-[#74be9c] transition-colors">
                                    <Mail className="group-hover:text-[#202830]" size={18} />
                                </div>
                                <a href="mailto:blackmagic@rleducation.com.au" className="hover:text-[#74be9c] transition-colors">
                                    blackmagic@rleducation.com.au
                                </a>
                            </li>
                            <li className="flex items-center gap-4 group">
                                <div className="bg-gray-800 p-2 rounded-lg group-hover:bg-[#74be9c] transition-colors">
                                    <Phone className="group-hover:text-[#202830]" size={18} />
                                </div>
                                <a href="tel:0399732966" className="hover:text-[#74be9c] transition-colors">
                                    (03) 9973 2966
                                </a>
                            </li>
                            <li className="flex items-start gap-4 group">
                                <div className="bg-gray-800 p-2 rounded-lg group-hover:bg-[#74be9c] transition-colors flex-shrink-0">
                                    <MapPin className="group-hover:text-[#202830]" size={18} />
                                </div>
                                <div className="text-sm">
                                    <p className="text-white font-semibold">Box Hill Campus</p>
                                    <p>Level 2, Unit 12, 532 Station St, Box Hill VIC 3128</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-4 group">
                                <div className="bg-gray-800 p-2 rounded-lg group-hover:bg-[#74be9c] transition-colors flex-shrink-0">
                                    <MapPin className="group-hover:text-[#202830]" size={18} />
                                </div>
                                <div className="text-sm">
                                    <p className="text-white font-semibold">City Campus</p>
                                    <p>Level 12 Suite 1, 190 Queen St, Melbourne VIC 3000</p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Quick Links Section */}
                    <div>
                        <h3 className="text-white text-lg font-bold mb-6 flex items-center gap-2">
                            Quick Links
                            <div className="h-1 w-8 bg-[#74be9c] rounded-full"></div>
                        </h3>
                        <ul className="space-y-4">
                            <li>
                                <Link to="/team" className="hover:text-[#74be9c] flex items-center gap-2 transition-all hover:translate-x-1">
                                    Meet Our Team
                                </Link>
                            </li>
                            <li>
                                <Link to="/results" className="hover:text-[#74be9c] flex items-center gap-2 transition-all hover:translate-x-1">
                                    Student Results
                                </Link>
                            </li>
                            <li>
                                <Link to="/activate" className="hover:text-[#74be9c] flex items-center gap-2 transition-all hover:translate-x-1">
                                    Activate Software
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                        <img className="h-6 w-auto grayscale opacity-50" src="/transparent RL Logo.png" alt="RL Logo" />
                        <span>© {currentYear} RL Education. All rights reserved.</span>
                    </div>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;