import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Info,
    List,
    Download,
    Target,
    Share2,
    Lock,
    Database,
    UserCheck,
    BarChart2,
    Shield,
    RefreshCcw,
    Mail
} from 'lucide-react';

function PrivacyPolicy() {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const sections = [
        { id: 'who-we-are', title: '1. Who We Are', icon: <Info size={20} /> },
        { id: 'info-we-collect', title: '2. Information We Collect', icon: <List size={20} /> },
        { id: 'how-we-collect', title: '3. How We Collect', icon: <Download size={20} /> },
        { id: 'why-we-collect', title: '4. Why We Collect', icon: <Target size={20} /> },
        { id: 'disclosure', title: '5. Disclosure of Info', icon: <Share2 size={20} /> },
        { id: 'security', title: '6. Storage & Security', icon: <Lock size={20} /> },
        { id: 'retention', title: '7. Data Retention', icon: <Database size={20} /> },
        { id: 'access', title: '8. Access & Correction', icon: <UserCheck size={20} /> },
        { id: 'cookies', title: '9. Cookies & Analytics', icon: <BarChart2 size={20} /> },
        { id: 'children', title: '10. Children’s Privacy', icon: <Shield size={20} /> },
        { id: 'changes', title: '11. Changes to Policy', icon: <RefreshCcw size={20} /> },
        { id: 'contact', title: '12. Contact Us', icon: <Mail size={20} /> },
    ];

    const scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (!el) return;

        const y = el.getBoundingClientRect().top + window.scrollY;

        // Put the section around the middle of the viewport.
        const targetY = y - window.innerHeight * 0.35;

        window.scrollTo({ top: targetY, behavior: 'smooth' });
    };

    return (
        <div className="bg-[#202830] min-h-screen text-gray-300 py-16 px-8">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Privacy Policy</h1>
                    <p className="text-[#74be9c]">Last Updated: February 20, 2026</p>
                    <div className="h-1 w-24 bg-[#74be9c] mx-auto mt-6 rounded-full"></div>
                </div>

                <div className="flex flex-col md:flex-row gap-12">

                    {/* Sticky Sidebar Navigation */}
                    <aside className="md:w-1/4">
                        <div className="sticky top-8 space-y-2">
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Contents</p>
                            {sections.map((section) => (
                                <button
                                    key={section.id}
                                    onClick={() => scrollToSection(section.id)}
                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#2d5047] hover:text-[#74be9c] transition-all text-left group"
                                >
                                    <span className="text-gray-500 group-hover:text-[#74be9c] transition-colors">
                                        {section.icon}
                                    </span>
                                    <span className="font-medium text-sm">{section.title}</span>
                                </button>
                            ))}
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="md:w-3/4 bg-[#2d5047]/30 rounded-2xl p-8 md:p-12 border border-gray-700">
                        <section className="prose prose-invert max-w-none">
                            <p className="text-lg leading-relaxed mb-4">
                                <span className="text-[#74be9c] font-bold">RL Education</span> respects your privacy and is committed to protecting your personal information in accordance with the Privacy Act 1988 (Cth) and the Australian Privacy Principles.
                            </p>
                            <p className="text-lg leading-relaxed mb-10">
                                This Privacy Policy explains how we collect, use, store, and disclose your information when you use the
                                <span className="text-white font-bold"> BlackMagic CAS </span>
                                software or visit our website.
                            </p>

                            <hr className="border-gray-700 mb-10" />

                            {/* Section 1 */}
                            <div id="who-we-are" className="mb-12 scroll-mt-8">
                                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                                    1. Who We Are
                                </h2>
                                <p className="leading-relaxed">
                                    This Privacy Policy applies to RL Education and the BlackMagic CAS software, including all related activation systems and support services.
                                </p>
                            </div>

                            {/* Section 2 */}
                            <div id="info-we-collect" className="mb-12 scroll-mt-8">
                                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                                    2. Information We Collect
                                </h2>
                                <p className="leading-relaxed mb-6">We may collect the following types of information:</p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                                    <div className="bg-[#202830] p-6 rounded-lg border border-gray-700">
                                        <h3 className="text-xl font-bold text-white mb-4">Personal Information</h3>
                                        <ul className="list-disc list-inside space-y-2 text-sm">
                                            <li>Name</li>
                                            <li>Email address</li>
                                            <li>Payment confirmation details</li>
                                            <li>Billing information</li>
                                        </ul>
                                    </div>
                                    <div className="bg-[#202830] p-6 rounded-lg border border-gray-700">
                                        <h3 className="text-xl font-bold text-white mb-4">Technical Information</h3>
                                        <ul className="list-disc list-inside space-y-2 text-sm">
                                            <li>CAS ID</li>
                                            <li>Calculator model</li>
                                            <li>Activation key usage data</li>
                                            <li>IP address</li>
                                            <li>Basic website analytics data</li>
                                        </ul>
                                    </div>
                                </div>
                                <p className="leading-relaxed text-[#74be9c]">
                                    We only collect information that is reasonably necessary to provide and support the Software.
                                </p>
                            </div>

                            {/* Section 3 */}
                            <div id="how-we-collect" className="mb-12 scroll-mt-8">
                                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                                    3. How We Collect Information
                                </h2>
                                <p className="leading-relaxed mb-4">We collect information when you:</p>
                                <ul className="list-disc list-inside space-y-3 mb-6">
                                    <li>Purchase an activation key</li>
                                    <li>Activate the Software</li>
                                    <li>Contact support</li>
                                    <li>Submit a form on our website</li>
                                    <li>Visit our website</li>
                                </ul>
                                <p className="leading-relaxed">
                                    Information may be collected directly from you or automatically through secure activation and analytics systems.
                                </p>
                            </div>

                            {/* Section 4 */}
                            <div id="why-we-collect" className="mb-12 scroll-mt-8">
                                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                                    4. Why We Collect Your Information
                                </h2>
                                <p className="leading-relaxed mb-4">We collect and use your information to:</p>
                                <ul className="list-disc list-inside space-y-3 mb-6">
                                    <li>Issue and validate activation keys</li>
                                    <li>Bind licenses to a specific CAS ID</li>
                                    <li>Provide customer support</li>
                                    <li>Detect misuse, duplication, or unauthorised distribution</li>
                                    <li>Improve our Software and website</li>
                                    <li>Comply with legal obligations</li>
                                </ul>
                                <blockquote className="border-l-4 border-[#74be9c] bg-[#202830] p-4 italic rounded-r-lg font-bold">
                                    We do not sell your personal information.
                                </blockquote>
                            </div>

                            {/* Section 5 */}
                            <div id="disclosure" className="mb-12 scroll-mt-8">
                                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                                    5. Disclosure of Information
                                </h2>
                                <p className="leading-relaxed mb-4">We may disclose your information to:</p>
                                <ul className="list-disc list-inside space-y-3 mb-6">
                                    <li>Payment processors</li>
                                    <li>Secure hosting providers</li>
                                    <li>IT and activation system providers</li>
                                    <li>Professional advisers if required</li>
                                    <li>Government authorities where required by law</li>
                                </ul>
                                <p className="leading-relaxed">
                                    We only share information where reasonably necessary to operate the Software or comply with legal obligations.
                                </p>
                            </div>

                            {/* Section 6 */}
                            <div id="security" className="mb-12 scroll-mt-8">
                                <h2 className="text-2xl font-bold text-white mb-4">6. Storage and Security</h2>
                                <p className="leading-relaxed mb-4">
                                    We take reasonable steps to protect your information from misuse, interference, loss, unauthorised access, modification, or disclosure.
                                </p>
                                <p className="leading-relaxed">
                                    Data may be stored on secure third-party servers located in Australia or overseas. Where data is stored overseas, we take reasonable steps to ensure appropriate data protection safeguards are in place.
                                </p>
                            </div>

                            {/* Section 7 */}
                            <div id="retention" className="mb-12 scroll-mt-8">
                                <h2 className="text-2xl font-bold text-white mb-4">7. Data Retention</h2>
                                <p className="leading-relaxed mb-4">We retain personal information only for as long as necessary to:</p>
                                <ul className="list-disc list-inside space-y-3 mb-6">
                                    <li>Maintain activation records</li>
                                    <li>Provide support</li>
                                    <li>Comply with legal and accounting requirements</li>
                                </ul>
                                <p className="leading-relaxed">
                                    Activation and purchase records may be retained to prevent licence fraud.
                                </p>
                            </div>

                            {/* Section 8 */}
                            <div id="access" className="mb-12 scroll-mt-8">
                                <h2 className="text-2xl font-bold text-white mb-4">8. Access and Correction</h2>
                                <p className="leading-relaxed mb-4">
                                    You may request access to personal information we hold about you and request correction of inaccurate information by contacting us.
                                </p>
                                <p className="leading-relaxed">
                                    We will respond within a reasonable timeframe as required under Australian law.
                                </p>
                            </div>

                            {/* Section 9 */}
                            <div id="cookies" className="mb-12 scroll-mt-8">
                                <h2 className="text-2xl font-bold text-white mb-4">9. Cookies and Analytics</h2>
                                <p className="leading-relaxed mb-4">
                                    Our website may use cookies and basic analytics tools to understand website traffic and improve user experience.
                                </p>
                                <p className="leading-relaxed">
                                    You can disable cookies in your browser settings, though some website functionality may be affected.
                                </p>
                            </div>

                            {/* Section 10 */}
                            <div id="children" className="mb-12 scroll-mt-8">
                                <h2 className="text-2xl font-bold text-white mb-4">10. Children’s Privacy</h2>
                                <p className="leading-relaxed">
                                    BlackMagic CAS is intended for students. We do not knowingly collect personal information from children under 13 without parental involvement. If you believe information has been collected inappropriately, please contact us.
                                </p>
                            </div>

                            {/* Section 11 */}
                            <div id="changes" className="mb-12 scroll-mt-8">
                                <h2 className="text-2xl font-bold text-white mb-4">11. Changes to This Policy</h2>
                                <p className="leading-relaxed">
                                    We may update this Privacy Policy from time to time. Updated versions will be published on our website with a revised “Last Updated” date.
                                </p>
                            </div>

                            {/* Section 12 / Contact */}
                            <div id="contact" className="mt-16 p-8 bg-[#74be9c]/10 border border-[#74be9c]/30 rounded-xl text-center scroll-mt-8">
                                <h2 className="text-2xl font-bold text-white mb-4">12. Contact Us</h2>
                                <p className="mb-4 text-sm text-gray-300">
                                    If you have questions about this Privacy Policy or your personal information, please contact:
                                </p>
                                <p className="font-bold text-white text-lg mb-2">RL Education</p>
                                <a href="mailto:blackmagic@rleducation.com.au" className="text-[#74be9c] font-bold hover:underline flex items-center justify-center gap-2">
                                    <Mail size={18} />
                                    blackmagic@rleducation.com.au
                                </a>
                            </div>

                        </section>
                    </main>
                </div>
            </div>
        </div>
    );
}

export default PrivacyPolicy;