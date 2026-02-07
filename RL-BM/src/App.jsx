// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Activate from './pages/ActivateSelectPage.jsx';
import ActivateMethods from './pages/Activation pages/ActivateMethods.jsx';
import ActivateSpecialist from './pages/Activation pages/ActivateSpecialist.jsx';
import ActivateBoth from './pages/Activation pages/ActivateBoth.jsx';
import CasID from "./pages/CasID.jsx";
import FileDownload from "./pages/FileDownload.jsx";
import InstallationComplete from "./pages/InstallationComplete.jsx";
import InstallationGuide from './pages/helper pages/InstallationGuide';
import FindCasID from './pages/helper pages/FindCasID';
import ContactUs from './pages/helper pages/ContactUs';
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
                        <Route path="/file-download" element={<FileDownload />} />
                        <Route path="/cas-id" element={<CasID />} />
                        <Route path="/installation-complete" element={<InstallationComplete />} />
                        <Route path="/installation-guide" element={<InstallationGuide />} />
                        <Route path="/find-cas-id" element={<FindCasID />} />
                        <Route path="/contact-us" element={<ContactUs />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;