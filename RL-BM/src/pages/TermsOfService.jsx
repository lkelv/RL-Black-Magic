import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, FileText, Scale, Lock } from 'lucide-react';

function TermsOfService() {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const sections = [
        { id: 'license', title: '1. License Grant', icon: <FileText size={20} /> },
        { id: 'activation', title: '2. Activation & Binding', icon: <Lock size={20} /> },
        { id: 'restrictions', title: '3. Restrictions', icon: <ShieldCheck size={20} /> },
        { id: 'academic', title: '4. Academic Integrity', icon: <Scale size={20} /> },
    ];

    const scrollToSection = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
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

                            <hr className="border-gray-700 mb-10" />

                            {/* Section 1 */}
                            <div id="license" className="mb-12 scroll-mt-8">
                                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                                    1. License Grant
                                </h2>
                                <p className="leading-relaxed">
                                    We grant you a personal, non-exclusive, non-transferable, and limited license to use the Software on a single compatible TI-Nspire CX II CAS calculator for your own personal, educational use.
                                </p>
                            </div>

                            {/* Section 2 */}
                            <div id="activation" className="mb-12 scroll-mt-8">
                                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                                    2. Activation Keys & Device Binding
                                </h2>
                                <ul className="list-disc list-inside space-y-3">
                                    <li><span className="text-[#f4a52e] font-semibold">Single-Use:</span> Each activation key is valid for a single CAS ID.</li>
                                    <li><span className="text-[#f4a52e] font-semibold">Binding:</span> Once activated, the Software is bound to that specific hardware. Licenses cannot be transferred between calculators.</li>
                                    <li><span className="text-[#f4a52e] font-semibold">Loss of Device:</span> RL Education is not responsible for the loss of a license due to hardware failure, theft, or factory resetting.</li>
                                </ul>
                            </div>

                            {/* Section 3 */}
                            <div id="restrictions" className="mb-12 scroll-mt-8">
                                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                                    3. Restrictions on Use
                                </h2>
                                <p className="mb-4">You strictly agree <span className="text-red-400 underline italic">not</span> to:</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {[
                                        'Decompile or reverse engineer the source code.',
                                        'Redistribute or sell .tns files or keys.',
                                        'Use for commercial tutoring services.',
                                        'Modify or create derivative works.'
                                    ].map((text, i) => (
                                        <div key={i} className="bg-[#202830] p-4 rounded-lg border border-gray-700 text-sm">
                                            {text}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Section 4 */}
                            <div id="academic" className="mb-12 scroll-mt-8">
                                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                                    4. Academic Integrity
                                </h2>
                                <blockquote className="border-l-4 border-[#74be9c] bg-[#202830] p-6 italic rounded-r-lg">
                                    "It is the user’s responsibility to ensure that the use of this Software complies with the rules set by the VCAA (Victorian Curriculum and Assessment Authority) or their respective examination board."
                                </blockquote>
                                <p className="mt-4">
                                    RL Education is not liable for any disqualification, penalty, or academic consequence resulting from the misuse of the Software during official assessments.
                                </p>
                            </div>

                            <div className="mt-16 p-8 bg-[#74be9c]/10 border border-[#74be9c]/30 rounded-xl text-center">
                                <h3 className="text-white font-bold mb-2">Have questions about our terms?</h3>
                                <p className="mb-4 text-sm">Our team is here to help you understand your license.</p>
                                <a href="mailto:blackmagic@rleducation.com.au" className="text-[#74be9c] font-bold hover:underline">
                                    Contact Support →
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