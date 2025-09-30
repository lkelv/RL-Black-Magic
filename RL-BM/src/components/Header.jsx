import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-slate-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-12 h-12 bg-yellow-500 rounded flex items-center justify-center font-bold text-slate-900 text-xl">
              RL
            </div>
            <span className="text-xl font-bold">Black Magic</span>
          </Link>
          <nav className="flex space-x-8">
            <Link to="/" className="hover:text-yellow-400 transition-colors">
              Home
            </Link>
            <Link to="/activate" className="hover:text-yellow-400 transition-colors">
              Activate
            </Link>
            <Link to="/installation" className="hover:text-yellow-400 transition-colors">
              Installation guide
            </Link>
            <Link to="/contact" className="hover:text-yellow-400 transition-colors">
              Contact Us
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;