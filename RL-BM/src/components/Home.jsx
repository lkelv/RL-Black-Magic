// src/components/Home.jsx
import React, { useState } from 'react';

function Home() {
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    
    const testimonials = [
        "I couldn't believe how much faster I got at exams. What used to take 10 steps on the calculator was done in 2! I improved my exam score by 14 marks.",
        "Black Magic saved me so much time during my Methods exam. The shortcuts are incredible!",
        "This program completely changed how I approach calculator work. Highly recommend!"
    ];

    const nextTestimonial = () => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <div className="bg-[#202830] min-h-screen">
            {/* Hero Section */}
            <section className="py-20 px-8">
                <div className="max-w-5xl mx-auto text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white leading-tight">
                        RL BLACK MAGIC PROGRAM
                    </h1>
                    <p className="text-xl mb-12 text-white">
                        Turn 5-minute questions into 1-minute solutions with RL Black Magic.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
                        <a 
                            href="/contact-us" 
                            className="bg-[#f4a52e] hover:bg-[#e09420] text-[#202830] font-bold py-3 px-8 rounded-full transition-colors text-base inline-block"
                        >
                            Contact Us
                        </a>
                        <a 
                            href="/activate" 
                            className="bg-[#74be9c] hover:bg-[#62a888] text-[#202830] font-bold py-3 px-8 rounded-full transition-colors text-base inline-block"
                        >
                            Activate Now
                        </a>
                    </div>
                </div>
            </section>
            
            {/* Supercharge Section */}
            <section className="py-8 px-8 mb-16">
                <div className="max-w-5xl mx-auto">
                    <div className="bg-[#2d5047] rounded-2xl p-8 md:p-12">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#f4a52e] text-center">
                            Supercharge Your CAS. Maximise Your Marks.
                        </h2>
                        <p className="text-white text-base md:text-lg leading-relaxed text-center max-w-4xl mx-auto">
                            The RL Black Magic Program is a trusted upgrade for the CAS calculator that helps students in Methods and 
                            Specialist Maths. Designed by expert tutors and used by high-achieving students, it cuts down time spent on 
                            repetitive tasks so your child can focus on solving problems, not fighting the calculator.
                        </p>
                    </div>
                </div>
            </section>

       

            {/* Why Black Magic Section */}
            <section className="py-20 px-8">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center text-white">Why Black Magic?</h2>
                    <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                        <div className="flex justify-center items-center">
                            <div className="bg-[#2d3642] rounded-xl p-8 w-full max-w-md h-[400px] flex items-center justify-center">
                                <div className="text-center text-gray-400">
                                    <p className="text-lg font-semibold">Calculator Image</p>
                                    <p className="text-sm mt-2">(Add image here)</p>
                                </div>
                            </div>
                        </div>
                        <div className="text-white space-y-6 flex flex-col justify-center">
                            <p className="text-base leading-relaxed">
                                In high-stakes timed exams like VCE Methods and Specialist Maths, every 
                                second counts. Many students struggle because they spend too much time 
                                navigating their calculator. The Black Magic Program solves this by bringing 
                                together tools, shortcuts, and automated processes that allow students to:
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <span className="text-[#74be9c] text-xl flex-shrink-0">✓</span>
                                    <span className="text-base">Solve algebraic, calculus, probability, and matrices problems faster</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-[#74be9c] text-xl flex-shrink-0">✓</span>
                                    <span className="text-base">Simplify surds, factorise expressions, and check solutions instantly</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-[#74be9c] text-xl flex-shrink-0">✓</span>
                                    <span className="text-base">Access complex CAS functions through an intuitive interface</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-[#74be9c] text-xl flex-shrink-0">✓</span>
                                    <span className="text-base">Minimise time on tedious steps while avoiding careless mistakes</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>


            {/* Subject Coverage Section */}
            <section className="py-16 px-8">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-white">Subject Coverage</h2>
                    <div className="bg-[#2d3642] rounded-2xl p-8 md:p-12">
                        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                            <div className="text-white space-y-8 flex flex-col justify-center">
                                <p className="font-semibold text-lg">This tool is optimised for:</p>
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="font-bold text-[#74be9c] mb-3 text-lg">
                                            • Mathematical Methods Units 3 & 4
                                        </h3>
                                        <p className="text-gray-300 text-base leading-relaxed pl-4">
                                            Including differentiation, integration, probability distributions, 
                                            transformations, and more
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-[#74be9c] mb-3 text-lg">
                                            • Specialist Mathematics Units 3 & 4
                                        </h3>
                                        <p className="text-gray-300 text-base leading-relaxed pl-4">
                                            Perfect for matrix operations, vectors, mechanics, complex numbers, 
                                            and advanced calculus
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-[#74be9c] text-lg">
                                            • General support for Year 12 MM & SM students
                                        </h3>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-center items-center">
                                <div className="bg-[#202830] rounded-xl p-8 w-full max-w-md h-[400px] flex items-center justify-center">
                                    <div className="text-center text-gray-400">
                                        <p className="text-lg font-semibold">Students Studying</p>
                                        <p className="text-sm mt-2">(Add image here)</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* Testimonials Section */}
            <section className="py-16 px-8 pb-24">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold mb-12 text-center text-white">Real Students' Results</h2>
                    <div className="relative flex items-center justify-center gap-6">
                        <button 
                            onClick={prevTestimonial}
                            className="text-[#f4a52e] text-5xl hover:text-[#e09420] transition-colors flex-shrink-0 w-12 h-12 flex items-center justify-center"
                            aria-label="Previous testimonial"
                        >
                            ◀
                        </button>
                        <div className="bg-[#2d5047] rounded-lg p-12 max-w-3xl min-h-[250px] flex items-center justify-center flex-1">
                            <p className="text-xl md:text-2xl text-center italic text-white leading-relaxed">
                                "{testimonials[currentTestimonial]}"
                            </p>
                        </div>
                        <button 
                            onClick={nextTestimonial}
                            className="text-[#f4a52e] text-5xl hover:text-[#e09420] transition-colors flex-shrink-0 w-12 h-12 flex items-center justify-center"
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
                                className={`w-3 h-3 rounded-full transition-colors ${
                                    index === currentTestimonial ? 'bg-[#74be9c]' : 'bg-gray-500'
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