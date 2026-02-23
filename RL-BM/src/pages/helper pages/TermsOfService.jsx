import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, FileText, Scale, Lock, AlertTriangle, Gavel, RefreshCcw } from 'lucide-react';

function TermsOfService() {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const sections = [
        { id: 'license', title: '1. License Grant', icon: <FileText size={20} /> },
        { id: 'term', title: '2. Term & Termination', icon: <AlertTriangle size={20} /> },
        { id: 'activation', title: '3. Activation & Binding', icon: <Lock size={20} /> },
        { id: 'restrictions', title: '4. Restrictions', icon: <ShieldCheck size={20} /> },
        { id: 'academic', title: '5. Academic Integrity', icon: <Scale size={20} /> },
        { id: 'disclaimer', title: '6. Disclaimer of Warranties', icon: <AlertTriangle size={20} /> },
        { id: 'liability', title: '7. Limitation of Liability', icon: <Gavel size={20} /> },
        { id: 'governing', title: '8. Governing Law', icon: <Gavel size={20} /> },
        { id: 'changes', title: '9. Changes to These Terms', icon: <RefreshCcw size={20} /> },
    ];

    const scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (!el) return;

        const y = el.getBoundingClientRect().top + window.scrollY;

        // Put the section around the middle of the viewport.
        // You can tweak 0.35–0.5 to taste (smaller = higher on screen).
        const targetY = y - window.innerHeight * 0.35;

        window.scrollTo({ top: targetY, behavior: 'smooth' });
    };

    return (
        <div className="bg-[#202830] min-h-screen text-gray-300 py-16 px-8">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Terms of Service</h1>
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
                                    <span className="font-medium">{section.title}</span>
                                </button>
                            ))}
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="md:w-3/4 bg-[#2d5047]/30 rounded-2xl p-8 md:p-12 border border-gray-700">
                        <section className="prose prose-invert max-w-none">
                            <p className="text-lg leading-relaxed mb-8">
                                Please read these Terms of Service ("Terms") carefully before using the
                                <span className="text-white font-bold"> BlackMagic</span> CAS software provided by
                                <span className="text-[#74be9c]"> RL Education</span>. By downloading, installing, or using the Software,
                                you agree to be bound by these Terms.
                            </p>

                            {/* Definition of Software */}
                            <div className="mb-10">
                                <h2 className="text-2xl font-bold text-white mb-4">Definition of Software</h2>
                                <p className="leading-relaxed">
                                    For the purposes of these Terms, “Software” means the BlackMagic CAS software provided by RL Education,
                                    including all .tns files, activation systems, updates, documentation, and related materials supplied with
                                    or in connection with the product.
                                </p>
                            </div>

                            <hr className="border-gray-700 mb-10" />

                            {/* Section 1 */}
                            <div id="license" className="mb-12 scroll-mt-8">
                                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                                    1. License Grant
                                </h2>
                                <p className="leading-relaxed">
                                    We grant you a personal, non-exclusive, non-transferable, and limited license to use the Software on a single
                                    compatible TI-Nspire CX II CAS calculator for your own personal, educational use.
                                </p>

                                {/* Ownership */}
                                <h3 className="text-xl font-bold text-white mt-8 mb-3">Ownership</h3>
                                <p className="leading-relaxed">
                                    The Software is licensed, not sold. RL Education retains all right, title, and interest in and to the Software,
                                    including all intellectual property rights. All rights not expressly granted under these Terms are reserved by RL Education.
                                </p>
                            </div>

                            {/* Section 2 */}
                            <div id="term" className="mb-12 scroll-mt-8">
                                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                                    2. Term and Termination
                                </h2>
                                <p className="leading-relaxed">
                                    This license remains in effect until terminated. Your rights under this license will terminate automatically if you breach
                                    any provision of these Terms. Upon termination, you must cease all use of the Software and delete all copies in your possession.
                                </p>
                                <p className="leading-relaxed mt-4">
                                    RL Education reserves the right to suspend or deactivate any activation key obtained or used in violation of these Terms.
                                </p>
                            </div>

                            {/* Section 3 */}
                            <div id="activation" className="mb-12 scroll-mt-8">
                                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                                    3. Activation Keys & Device Binding
                                </h2>
                                <ul className="list-disc list-inside space-y-3">
                                    <li><span className="text-[#f4a52e] font-semibold">Single-Use:</span> Each activation key is valid for a single CAS ID.</li>
                                    <li><span className="text-[#f4a52e] font-semibold">Binding:</span> Once activated, the Software is bound to that specific hardware. Licenses cannot be transferred between calculators.</li>
                                    <li><span className="text-[#f4a52e] font-semibold">Loss of Device:</span> RL Education is not responsible for the loss of a license due to hardware failure, theft, or factory resetting.</li>
                                </ul>

                                <p className="leading-relaxed mt-6">
                                    RL Education does not guarantee compatibility with future calculator operating system updates or hardware revisions.
                                    Proof of purchase may be required for activation support. Activation keys that are shared, duplicated, or used in breach
                                    of these Terms may be permanently deactivated without refund.
                                </p>
                            </div>

                            {/* Section 4 */}
                            <div id="restrictions" className="mb-12 scroll-mt-8">
                                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                                    4. Restrictions on Use
                                </h2>
                                <p className="mb-4">You strictly agree <span className="text-red-400 underline italic">not</span> to:</p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {[
                                        'Decompile or reverse engineer the source code.',
                                        'Redistribute or sell .tns files or keys.',
                                        'Use for commercial tutoring services.',
                                        'Modify or create derivative works.',
                                        'Share, publish, or upload activation keys or Software files to any public or private repository, cloud storage service, or file sharing platform.',
                                        'Circumvent, disable, or attempt to bypass any activation, licensing, or technical protection mechanisms.',
                                        'Use the Software in connection with any paid tutoring, coaching, or commercial instructional services without written permission from RL Education. For avoidance of doubt, commercial tutoring includes any paid educational service delivered to students.',
                                    ].map((text, i) => (
                                        <div key={i} className="bg-[#202830] p-4 rounded-lg border border-gray-700 text-sm">
                                            {text}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Section 5 */}
                            <div id="academic" className="mb-12 scroll-mt-8">
                                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                                    5. Academic Integrity
                                </h2>
                                <blockquote className="border-l-4 border-[#74be9c] bg-[#202830] p-6 italic rounded-r-lg">
                                    "It is the user’s responsibility to ensure that the use of this Software complies with the rules set by the VCAA (Victorian Curriculum and Assessment Authority) or their respective examination board."
                                </blockquote>
                                <p className="mt-4">
                                    RL Education is not liable for any disqualification, penalty, or academic consequence resulting from the misuse of the Software during official assessments.
                                </p>
                                <p className="leading-relaxed mt-6">
                                    RL Education does not represent or warrant that the Software is approved for use in any specific examination or assessment.
                                    Examination rules may change without notice. Users are responsible for verifying compliance with the most current VCAA or
                                    relevant examination board requirements prior to use in any formal assessment setting.
                                </p>
                            </div>

                            {/* Section 6 */}
                            <div id="disclaimer" className="mb-12 scroll-mt-8">
                                <h2 className="text-2xl font-bold text-white mb-4">6. Disclaimer of Warranties</h2>
                                <p className="leading-relaxed">
                                    The Software is provided “as is” and “as available” without warranties of any kind, whether express or implied, except as required
                                    under Australian Consumer Law. RL Education does not guarantee that the Software will be error free, uninterrupted, or compatible
                                    with all devices or calculator operating systems.
                                </p>
                                <p className="leading-relaxed mt-4">
                                    Nothing in these Terms excludes, restricts, or modifies any rights you may have under the Competition and Consumer Act 2010 (Cth)
                                    or other applicable Australian consumer protection laws.
                                </p>
                            </div>

                            {/* Section 7 */}
                            <div id="liability" className="mb-12 scroll-mt-8">
                                <h2 className="text-2xl font-bold text-white mb-4">7. Limitation of Liability</h2>
                                <p className="leading-relaxed">
                                    To the maximum extent permitted by law, RL Education’s total liability arising out of or in connection with the Software or these Terms
                                    is limited to the amount paid for the applicable license.
                                </p>
                                <p className="leading-relaxed mt-4">
                                    RL Education is not liable for any indirect, incidental, special, or consequential loss, including loss of academic results, business income, or data.
                                </p>
                            </div>

                            {/* Section 8 */}
                            <div id="governing" className="mb-12 scroll-mt-8">
                                <h2 className="text-2xl font-bold text-white mb-4">8. Governing Law</h2>
                                <p className="leading-relaxed">
                                    These Terms are governed by the laws of the State of Victoria, Australia. Any disputes arising in connection with these Terms will be subject
                                    to the exclusive jurisdiction of the courts of Victoria.
                                </p>
                            </div>

                            {/* Section 9 */}
                            <div id="changes" className="mb-12 scroll-mt-8">
                                <h2 className="text-2xl font-bold text-white mb-4">9. Changes to These Terms</h2>
                                <p className="leading-relaxed">
                                    RL Education reserves the right to modify these Terms at any time. Updated versions will be published on the official BlackMagic website with a revised “Last Updated” date.
                                    Continued use of the Software after any changes constitutes acceptance of the updated Terms.
                                </p>
                            </div>

                            <div className="mt-16 p-8 bg-[#74be9c]/10 border border-[#74be9c]/30 rounded-xl text-center">
                                <h3 className="text-white font-bold mb-2">Have questions about our privacy practices?</h3>
                                <p className="mb-4 text-sm">Our team is here to help you understand how your information is collected, used, and protected.</p>
                                <a className="">
                                <Link to="/contact-us"
                                className="hover:text-[#74be9c] text-[#74be9c] font-bold hover:underline">
                                    Contact Us →</Link>
                                </a>
                                
                            </div>
                        </section>
                    </main>
                </div>
            </div>
        </div>
    );
}

export default TermsOfService;