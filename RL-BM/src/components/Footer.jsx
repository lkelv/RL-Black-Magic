// src/components/Footer.jsx
import React from 'react';

function Footer() {
    return (
        <footer className="bg-[#2c3f51] text-[#74be9c] py-12 px-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <h3 className="text-xl font-bold mb-4 text-white">Our Services</h3>
                    <ul className="space-y-2">
                        <li>Programs K-12 Academic Coaching</li>
                        <li>CAS Calculator Booklet-Exclusive in Australia</li>
                        <li>Medpro-Australian Medical School Application</li>
                        <li>Overseas Study-US/UK/EU Universities Application</li>
                    </ul>
                </div>
                
                <div>
                    <h3 className="text-xl font-bold mb-4 text-white">Contact Us</h3>
                    <ul className="space-y-2">
                        <li>enquiry@rleducation.com</li>
                        <li>(03) 99732966</li>
                        <li className="mt-4">Level 12 Suite 1, 190 Queen St, Melbourne VIC 3000</li>
                        <li>Level 2, Unit 12, 532 Station Street, Box Hill VIC 3128</li>
                    </ul>
                </div>
                
                <div>
                    <h3 className="text-xl font-bold mb-4 text-white">About Us</h3>
                    <ul className="space-y-2">
                        <li><a href="/mentors" className="hover:text-white transition-colors">Meet Our Mentors</a></li>
                        <li><a href="/results" className="hover:text-white transition-colors">Student Results</a></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}

export default Footer;