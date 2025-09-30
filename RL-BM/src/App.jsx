// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Activate from './pages/Activate';
import ActivateMethods from './pages/ActivateMethods';
import ActivateSpecialist from './pages/ActivateSpecialist';
import ActivateBoth from './pages/ActivateBoth';
import InstallationGuide from './pages/InstallationGuide';
import ContactUs from './pages/ContactUs';
import './App.css';

function App() {
    return (
        <Router>
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/activate" element={<Activate />} />
                        <Route path="/activate/methods" element={<ActivateMethods />} />
                        <Route path="/activate/specialist" element={<ActivateSpecialist />} />
                        <Route path="/activate/both" element={<ActivateBoth />} />
                        <Route path="/installation-guide" element={<InstallationGuide />} />
                        <Route path="/contact-us" element={<ContactUs />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;