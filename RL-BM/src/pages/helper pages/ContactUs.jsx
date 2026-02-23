// src/pages/ContactUs.jsx
import React from 'react';
import Wecom_QR_code from '../../assets/WecomQRcode.jpeg';

function ContactUs() {
    return (
        <div className="bg-[#202830] min-h-screen text-white py-12 px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
                <div className="bg-[#2d3642] rounded-lg p-8">
                    <div className="space-y-4">
                        <p><strong>Email:</strong> blackmagic@rleducation.com.au</p>
                        <p><strong>Phone:</strong> (03) 99732966</p>
                        <p><strong>Box Hill Campus:</strong> Level 2, Unit 12, 532 Station Street, Box Hill VIC 3128</p>
                        <p><strong>City Campus:</strong> Level 12 Suite 1, 190 Queen St, Melbourne VIC 3000</p>
                        <p><strong>Add our Wechat:</strong></p>
                        <img
                            src={Wecom_QR_code}
                            alt="QR code for wechat contact"
                            className="rounded-lg shadow-lg border border-[#3a4552] w-48 h-48 object-cover"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContactUs;