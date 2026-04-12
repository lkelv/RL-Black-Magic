import React, { useState } from "react";
import { ChevronRight, Play, BookOpen, CheckCircle2, ArrowLeft, Lock, HelpCircle } from "lucide-react";

const SUBJECTS = [
    {
        id: "cas",
        name: "Introduction to CAS",
        icon: "⌨",
        desc: "Master calculator syntax, essential operations, and software shortcuts.",
        progress: 100,
        locked: false
    },
    {
        id: "methods",
        name: "Mathematical Methods",
        icon: "∫",
        desc: "Comprehensive modules covering Calculus, Algebra, and Probability.",
        progress: 42,
        locked: false
    },
    {
        id: "specialist",
        name: "Specialist Mathematics",
        icon: "∑",
        desc: "Advanced vectors, complex numbers, and mathematical proof.",
        progress: 0,
        locked: true
    },
];

const TOPICS = [
    { id: 1, name: "Differentiation", lessons: [
            { id: "1.1", label: "6.1 Chain Rule", status: "completed" },
            { id: "1.2", label: "6.2 Product Rule", status: "in-progress" },
        ]}
];

const LearningPortal = () => {
    const [view, setView] = useState("dashboard");
    const [selectedLesson, setSelectedLesson] = useState(null);
    const [showSolution, setShowSolution] = useState(false);

    // Height extended to 120vh to force scrolling to the footer
    const MainLayout = ({ children }) => (
        <div className="min-h-[120vh] bg-[#1a1f26] text-white flex flex-col font-sans">
            {children}
        </div>
    );

    if (view === "dashboard") {
        return (
            <MainLayout>
                {/* Increased vertical padding (py-24) to further extend page length */}
                <div className="max-w-7xl mx-auto w-full px-8 lg:px-16 py-24">
                    <header className="mb-16">
                        <h1 className="text-5xl font-extrabold mb-4 tracking-tight">Learning Portal</h1>
                        <p className="text-gray-400 text-lg">Select a subject to continue your academic journey.</p>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {SUBJECTS.map((s) => (
                            <div
                                key={s.id}
                                onClick={() => !s.locked && setView("lesson")}
                                className={`flex flex-col p-10 rounded-[2.5rem] border bg-[#202830] transition-all duration-500 min-h-[380px]
                                    ${s.locked
                                    ? 'opacity-40 border-white/5 cursor-not-allowed'
                                    : 'cursor-pointer border-white/10 hover:border-[#74be9c]/50 hover:-translate-y-3 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]'
                                }`}
                            >
                                <div className="text-4xl mb-8 bg-[#1a1f26] w-20 h-20 rounded-2xl flex items-center justify-center border border-white/5">
                                    {s.icon}
                                </div>

                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold mb-3">{s.name}</h3>
                                    <p className="text-gray-500 leading-relaxed">{s.desc}</p>
                                </div>

                                <div className="h-px bg-white/5 w-full my-8" />

                                {!s.locked ? (
                                    <div className="w-full">
                                        <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] text-[#74be9c] mb-4">
                                            <span>Progress</span>
                                            <span>{s.progress}%</span>
                                        </div>
                                        <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-[#74be9c] rounded-full transition-all duration-1000 ease-out"
                                                style={{ width: `${s.progress}%` }}
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2 text-gray-600 text-xs font-bold uppercase tracking-widest">
                                        <Lock size={14} /> Subject Locked
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Extra spacing block to ensure scroll requirement */}
                    <div className="mt-32 border-t border-white/5 pt-12">
                        <p className="text-center text-gray-600 text-sm italic">
                            New modules are released weekly. Check back for updates.
                        </p>
                    </div>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className="flex flex-1 flex-col lg:flex-row">
                <aside className="w-full lg:w-80 bg-[#202830] border-r border-white/5 p-8 space-y-10">
                    <button onClick={() => setView("dashboard")} className="flex items-center gap-2 text-xs font-black text-gray-500 hover:text-[#74be9c] uppercase tracking-[0.2em] transition-colors">
                        <ArrowLeft size={16} /> Back to Hub
                    </button>
                    <div>
                        <h4 className="text-[10px] font-black text-gray-600 uppercase tracking-[0.2em] mb-8 px-2">Course Content</h4>
                        {TOPICS.map(topic => (
                            <div key={topic.id} className="space-y-3">
                                <h5 className="text-sm font-bold px-2 mb-4 text-white uppercase tracking-tight">{topic.name}</h5>
                                <div className="space-y-1">
                                    {topic.lessons.map(l => (
                                        <button
                                            key={l.id}
                                            onClick={() => { setSelectedLesson(l); setShowSolution(false); }}
                                            className={`w-full p-4 rounded-2xl text-left text-sm flex justify-between items-center transition-all ${
                                                selectedLesson?.id === l.id
                                                    ? 'bg-[#74be9c] text-[#202830] font-bold shadow-xl shadow-[#74be9c]/20'
                                                    : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                                        >
                                            <span className="flex items-center gap-3">
                                                <Play size={14} /> {l.label}
                                            </span>
                                            {l.status === 'completed' && <CheckCircle2 size={16} />}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </aside>

                <main className="flex-1 p-12 lg:p-20 overflow-y-auto">
                    {selectedLesson ? (
                        <div className="max-w-4xl mx-auto">
                            <h2 className="text-5xl font-black mb-12 tracking-tighter">{selectedLesson.label}</h2>
                            <div className="aspect-video w-full rounded-[3rem] bg-black border border-white/5 mb-20 flex items-center justify-center shadow-[0_50px_100px_-20px_rgba(0,0,0,0.7)] relative overflow-hidden group">
                                <Play size={80} className="text-[#74be9c] opacity-80 group-hover:scale-110 transition-transform cursor-pointer" />
                            </div>

                            <section className="bg-[#202830] border border-white/10 rounded-[3rem] p-12 lg:p-16">
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#74be9c] mb-8 block">Practice Question</span>
                                <p className="text-2xl lg:text-3xl font-medium leading-snug mb-12 text-gray-100">
                                    Differentiate $f(x) = \sin(x^2 + 1)$ with respect to $x$.
                                </p>
                                <textarea
                                    className="w-full bg-[#1a1f26] border border-white/10 rounded-[2rem] p-8 text-white min-h-[200px] focus:border-[#74be9c] outline-none font-mono text-lg transition-all"
                                    placeholder="Enter your working here..."
                                />
                                <div className="mt-10">
                                    <button onClick={() => setShowSolution(!showSolution)} className="text-sm font-black text-[#74be9c] uppercase tracking-[0.2em] hover:brightness-125">
                                        {showSolution ? "Hide Working" : "Reveal Solution"}
                                    </button>
                                </div>
                                {showSolution && (
                                    <div className="mt-10 p-10 bg-[#1a1f26] border border-[#74be9c]/20 rounded-[2rem] animate-in fade-in slide-in-from-top-6 duration-500">
                                        <p className="text-[10px] font-black text-[#74be9c] uppercase tracking-[0.2em] mb-6">Final Answer</p>
                                        <p className="font-mono text-xl text-gray-200 leading-loose">$f'(x) = 2x \cos(x^2 + 1)$</p>
                                    </div>
                                )}
                            </section>

                            <div className="flex justify-end mt-20 mb-10">
                                <button className="bg-[#74be9c] text-[#202830] px-12 py-5 rounded-full font-black uppercase tracking-widest hover:bg-[#86cfad] transform hover:-translate-y-2 transition-all shadow-2xl">
                                    Next Lesson <ChevronRight size={20} className="inline ml-1" />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-gray-800">
                            <BookOpen size={64} className="opacity-5 mb-6" />
                            <p className="font-black uppercase tracking-[0.4em] text-[10px]">Select a module to begin</p>
                        </div>
                    )}
                </main>
            </div>
        </MainLayout>
    );
};

export default LearningPortal;