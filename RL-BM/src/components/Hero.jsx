import { Link } from 'react-router-dom';

function Hero() {
  return (
    <section className="bg-gradient-to-b from-slate-700 to-slate-900 text-white py-20">
      <div className="max-w-4xl mx-auto text-center px-4">
        <h1 className="text-5xl font-bold mb-4 tracking-tight">
          RL BLACK MAGIC PROGRAM
        </h1>
        <p className="text-xl mb-8 text-gray-300">
          Turn 5-minute questions into 1-minute solutions with RL Black Magic.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link to="/contact">
            <button className="bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105">
              Contact Us
            </button>
          </Link>
          <Link to="/activate">
            <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105">
              Activate Now
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;