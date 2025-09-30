// src/pages/ContactUs.jsx
import React from 'react';

function ContactUs() {
    return (
        <div className="bg-[#202830] min-h-screen text-white py-12 px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
                <div className="bg-[#2d3642] rounded-lg p-8">
                    <div className="space-y-4">
                        <p><strong>Email:</strong> enquiry@rleducation.com</p>
                        <p><strong>Phone:</strong> (03) 99732966</p>
                        <p><strong>Location 1:</strong> Level 12 Suite 1, 190 Queen St, Melbourne VIC 3000</p>
                        <p><strong>Location 2:</strong> Level 2, Unit 12, 532 Station Street, Box Hill VIC 3128</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactUs;