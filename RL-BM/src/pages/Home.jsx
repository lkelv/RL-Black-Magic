// src/components/Home.jsx
import React, { useState, useEffect, useRef } from 'react';
import student_image from "../assets/studentconcentratedcalculator.jpg";
import ricky_image from "../assets/rickyteaching.jpg";


function Home() {
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const [visibleSections, setVisibleSections] = useState(new Set());
    const sectionRefs = useRef([]);

    const testimonials = [
        "I couldn't believe how much faster I got at exams. What used to take 10 steps on the calculator was done in 2! I improved my exam score by 14 marks.",
        "Black Magic saved me so much time during my Methods exam. The shortcuts are incredible!",
        "This program completely changed how I approach calculator work. Highly recommend!"
    ];

    // Auto-rotate testimonials every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [testimonials.length]);

    // Intersection Observer for scroll animations
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVisibleSections((prev) => new Set([...prev, entry.target.dataset.section]));
                    }
                });
            },
            { threshold: 0.1 }
        );

        sectionRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => observer.disconnect();
    }, []);

    const nextTestimonial = () => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <div className="bg-[#202830] min-h-screen flex flex-col items-center">
        {/* Hero Section */}
            <section className="py-20 px-8 w-full flex items-center justify-center min-h-[80vh] relative overflow-hidden">
                {/* Animated gradient background */}
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#74be9c] via-[#202830] to-[#f4a52e] animate-gradient-shift"></div>
                </div>

                <div className="max-w-5xl w-full flex flex-col items-center text-center relative z-10">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white leading-tight animate-fade-in-down">
                    RL BLACK MAGIC PROGRAM
                    </h1>
                    <p className="text-xl mb-12 text-white animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    Turn 5-minute questions into 1-minute solutions with RL Black Magic.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                    <a
                        href="/contact-us"
                        className="bg-[#f4a52e] hover:bg-[#e09420] text-[#202830] font-bold py-3 px-8 rounded-full transition-all duration-300 text-base inline-block hover:scale-110 hover:shadow-2xl animate-pulse-glow"
                    >
                        Contact Us
                    </a>
                    <a
                        href="/activate"
                        className="bg-[#74be9c] hover:bg-[#62a888] text-[#202830] font-bold py-3 px-8 rounded-full transition-all duration-300 text-base inline-block hover:scale-110 hover:shadow-2xl animate-pulse-glow-green"
                        style={{ animationDelay: '0.3s' }}
                    >
                        Activate Now
                    </a>
                    </div>
                </div>
            </section>

            {/* Supercharge Section */}
            <section
                ref={(el) => (sectionRefs.current[0] = el)}
                data-section="supercharge"
                className={`py-8 px-8 w-full flex items-center justify-center transition-all duration-1000 ${
                    visibleSections.has('supercharge') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
            >
                <div className="max-w-5xl w-full flex flex-col items-center">
                    <div className="bg-[#2d5047] rounded-2xl p-8 md:p-12 w-full hover:scale-105 transition-transform duration-300 hover:shadow-2xl">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#f4a52e] text-center">
                        Supercharge Your CAS. Maximise Your Marks.
                    </h2>
                    <p className="text-white text-base md:text-lg leading-relaxed text-center">
                        The RL Black Magic Program is a trusted upgrade for the CAS calculator that helps students in Methods and
                        Specialist Maths. Designed by expert tutors and used by high-achieving students, it cuts down time spent on
                        repetitive tasks so your child can focus on solving problems, not fighting the calculator.
                    </p>
                    </div>
                </div>
            </section>
                    

            {/* Why Black Magic Section */}
            <section
                ref={(el) => (sectionRefs.current[1] = el)}
                data-section="why"
                className={`py-20 px-8 transition-all duration-1000 ${
                    visibleSections.has('why') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
            >
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center text-white">Why Black Magic?</h2>
                    <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                        <div className="flex justify-center items-center overflow-hidden rounded-xl">
                                <img
                                    src={student_image}
                                    alt="Student with Calculator"
                                    className="w-100 h-100 object-cover rounded-xl hover:scale-110 transition-transform duration-700 hover:rotate-2"
                                />
                           </div>
                        <div className="text-white space-y-6 flex flex-col justify-center">
                            <p className="text-base leading-relaxed">
                                In high-stakes timed exams like VCE Methods and Specialist Maths, every
                                second counts. Many students struggle because they spend too much time
                                navigating their calculator. The Black Magic Program solves this by bringing
                                together tools, shortcuts, and automated processes that allow students to:
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3 hover:translate-x-2 transition-transform duration-300">
                                    <span className="text-[#74be9c] text-xl flex-shrink-0">✓</span>
                                    <span className="text-base">Solve algebraic, calculus, probability, and matrices problems faster</span>
                                </li>
                                <li className="flex items-start gap-3 hover:translate-x-2 transition-transform duration-300">
                                    <span className="text-[#74be9c] text-xl flex-shrink-0">✓</span>
                                    <span className="text-base">Simplify surds, factorise expressions, and check solutions instantly</span>
                                </li>
                                <li className="flex items-start gap-3 hover:translate-x-2 transition-transform duration-300">
                                    <span className="text-[#74be9c] text-xl flex-shrink-0">✓</span>
                                    <span className="text-base">Access complex CAS functions through an intuitive interface</span>
                                </li>
                                <li className="flex items-start gap-3 hover:translate-x-2 transition-transform duration-300">
                                    <span className="text-[#74be9c] text-xl flex-shrink-0">✓</span>
                                    <span className="text-base">Minimise time on tedious steps while avoiding careless mistakes</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>


            {/* Subject Coverage Section */}
            <section
                ref={(el) => (sectionRefs.current[2] = el)}
                data-section="coverage"
                className={`py-16 px-8 transition-all duration-1000 ${
                    visibleSections.has('coverage') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
            >
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-white">Subject Coverage</h2>
                    <div className="bg-[#2d3642] rounded-2xl p-8 md:p-12 hover:scale-105 transition-transform duration-300 hover:shadow-2xl">
                        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                            <div className="text-white space-y-8 flex flex-col justify-center">
                                <p className="font-semibold text-lg">This tool is optimised for:</p>
                                <div className="space-y-6">
                                    <div className="hover:translate-x-2 transition-transform duration-300">
                                        <h3 className="font-bold text-[#74be9c] mb-3 text-lg">
                                            • Mathematical Methods Units 3 & 4
                                        </h3>
                                        <p className="text-gray-300 text-base leading-relaxed pl-4">
                                            Including differentiation, integration, probability distributions,
                                            transformations, and more
                                        </p>
                                    </div>
                                    <div className="hover:translate-x-2 transition-transform duration-300">
                                        <h3 className="font-bold text-[#74be9c] mb-3 text-lg">
                                            • Specialist Mathematics Units 3 & 4
                                        </h3>
                                        <p className="text-gray-300 text-base leading-relaxed pl-4">
                                            Perfect for matrix operations, vectors, mechanics, complex numbers,
                                            and advanced calculus
                                        </p>
                                    </div>
                                    <div className="hover:translate-x-2 transition-transform duration-300">
                                        <h3 className="font-bold text-[#74be9c] text-lg">
                                            • General support for Year 12 MM & SM students
                                        </h3>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-center items-center overflow-hidden rounded-xl">
                                <img
                                    src={ricky_image}
                                    alt="Student with Calculator"
                                    className="w-100 h-100 object-cover rounded-xl hover:scale-110 transition-transform duration-700 hover:-rotate-2"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* Testimonials Section */}
            <section
                ref={(el) => (sectionRefs.current[3] = el)}
                data-section="testimonials"
                className={`py-16 px-8 pb-24 transition-all duration-1000 ${
                    visibleSections.has('testimonials') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
            >
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold mb-12 text-center text-white">Real Students' Results</h2>
                    <div className="relative flex items-center justify-center gap-6">
                        <button
                            onClick={prevTestimonial}
                            className="text-[#f4a52e] text-5xl hover:text-[#e09420] hover:scale-125 transition-all duration-300 flex-shrink-0 w-12 h-12 flex items-center justify-center"
                            aria-label="Previous testimonial"
                        >
                            ◀
                        </button>
                        <div className="bg-[#2d5047] rounded-lg p-12 max-w-3xl min-h-[250px] flex items-center justify-center flex-1 hover:shadow-2xl transition-shadow duration-300">
                            <p
                                key={currentTestimonial}
                                className="text-xl md:text-2xl text-center italic text-white leading-relaxed animate-fade-in"
                            >
                                "{testimonials[currentTestimonial]}"
                            </p>
                        </div>
                        <button
                            onClick={nextTestimonial}
                            className="text-[#f4a52e] text-5xl hover:text-[#e09420] hover:scale-125 transition-all duration-300 flex-shrink-0 w-12 h-12 flex items-center justify-center"
                            aria-label="Next testimonial"
                        >
                            ▶
                        </button>
                    </div>
                    <div className="flex justify-center gap-3 mt-8">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentTestimonial(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                    index === currentTestimonial ? 'bg-[#74be9c] scale-150' : 'bg-gray-500 hover:scale-125'
                                }`}
                                aria-label={`Go to testimonial ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;