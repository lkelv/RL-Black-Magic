import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12 border-t border-slate-700">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-emerald-400">Our Services</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="hover:text-yellow-400 transition-colors cursor-pointer">
                Programs K-12 Academic Coaching
              </li>
              <li className="hover:text-yellow-400 transition-colors cursor-pointer">
                CAS Calculator Booklet-Exclusive in Australia
              </li>
              <li className="hover:text-yellow-400 transition-colors cursor-pointer">
                Medpro-Australian Medical School Application
              </li>
              <li className="hover:text-yellow-400 transition-colors cursor-pointer">
                Overseas Study-US/UK/EU Universities Application
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4 text-emerald-400">Contact Us</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="mailto:enquiry@rleducation.com" className="hover:text-yellow-400 transition-colors">
                  enquiry@rleducation.com
                </a>
              </li>
              <li>
                <a href="tel:0399732966" className="hover:text-yellow-400 transition-colors">
                  (03) 99732966
                </a>
              </li>
              <li className="pt-2">Level 12 Suite 1, 190 Queen St, Melbourne VIC 3000</li>
              <li>Level 2, Unit 12, 532 Station Street, Box Hill vic 3128</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4 text-emerald-400">About Us</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link to="/mentors" className="hover:text-yellow-400 transition-colors">
                  Meet Our Mentors
                </Link>
              </li>
              <li>
                <Link to="/results" className="hover:text-yellow-400 transition-colors">
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