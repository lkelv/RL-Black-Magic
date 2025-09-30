import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Activate from './pages/Activate';
import InstallationGuide from './pages/InstallationGuide';
import ContactUs from './pages/ContactUs';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-900">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/activate" element={<Activate />} />
          <Route path="/installation" element={<InstallationGuide />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
        <Footer />
    <>

      <div> 
        <Header />
      </div>



      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
    </Router>
  );
}

export default App;