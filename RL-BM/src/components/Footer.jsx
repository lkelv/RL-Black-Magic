import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12 border-t border-slate-700">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-emerald-400">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-yellow-400 transition">
                  Programs K-12 Academic Coaching
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-400 transition">
                  CAS Calculator Booklet-Exclusive in Australia
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-400 transition">
                  Medpro-Australian Medical School Application
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-400 transition">
                  Overseas Study-US/UK/EU Universities Application
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4 text-emerald-400">Contact Us</h3>
            <ul className="space-y-2">
              <li>
                <a href="mailto:enquiry@rleducation.com" className="hover:text-yellow-400 transition">
                  enquiry@rleducation.com
                </a>
              </li>
              <li>
                <a href="tel:0399732966" className="hover:text-yellow-400 transition">
                  (03) 99732966
                </a>
              </li>
              <li className="pt-2">Level 12 Suite 1, 190 Queen St, Melbourne VIC 3000</li>
              <li>Level 2, Unit 12, 532 Station Street, Box Hill vic 3128</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4 text-emerald-400">About Us</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/mentors" className="hover:text-yellow-400 transition">
                  Meet Our Mentors
                </Link>
              </li>
              <li>
                <Link to="/results" className="hover:text-yellow-400 transition">
                  Student Results
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;