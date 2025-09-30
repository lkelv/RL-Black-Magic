import { useState } from 'react';

function Testimonials() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const testimonials = [
    {
      text: "I couldn't believe how much faster I got at exams. What used to take 10 steps on the calculator was done in 2! I improved my exam score by 12 marks.",
      author: "VCE Student"
    },
    {
      text: "Black Magic saved me so much time during practice exams. I could focus on understanding the problems instead of fighting with my calculator.",
      author: "Specialist Maths Student"
    },
    {
      text: "This program is a game-changer. I wish I had discovered it earlier in Year 12!",
      author: "Methods Student"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="bg-slate-800 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">
          Real Students' Results
        </h2>
        <div className="relative flex items-center justify-center">
          <button 
            onClick={prevSlide}
            className="absolute left-0 bg-yellow-500 hover:bg-yellow-600 text-slate-900 p-3 rounded-full z-10 transition-colors font-bold text-xl w-12 h-12 flex items-center justify-center"
          >
            ◀
          </button>
          
          <div className="max-w-2xl mx-20 px-4">
            <div className="bg-emerald-900 rounded-2xl p-8 shadow-xl">
              <p className="text-white text-lg leading-relaxed mb-4 text-center">
                "{testimonials[currentSlide].text}"
              </p>
              <p className="text-emerald-300 text-center font-semibold">
                — {testimonials[currentSlide].author}
              </p>
            </div>
          </div>

          <button 
            onClick={nextSlide}
            className="absolute right-0 bg-yellow-500 hover:bg-yellow-600 text-slate-900 p-3 rounded-full z-10 transition-colors font-bold text-xl w-12 h-12 flex items-center justify-center"
          >
            ▶
          </button>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;