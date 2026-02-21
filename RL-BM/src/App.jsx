// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route , useLocation} from 'react-router-dom';
import { useEffect } from 'react';
import { Analytics } from "@vercel/analytics/react";
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
import InstallationGuide from './pages/helper pages/InstallationGuide.jsx';
import FindCasID from './pages/helper pages/FindCasID';
import ContactUs from './pages/helper pages/ContactUs';
import TermsOfService from './pages/TermsOfService.jsx';
import Team from './pages/Team.jsx';
import PrivacyPolicy from './pages/PrivacyPolicy.jsx';
import './App.css';

function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
}

function App() {
    return (
        <Router>
            <ScrollToTop />
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
                        <Route path="/terms-of-service" element={<TermsOfService/>} />
                        <Route path="/team" element={<Team/>} />
                        <Route path="/privacy-policy" element={<PrivacyPolicy/>} />
                    </Routes>
                </main>
                <Footer />
                <Analytics />
            </div>
        </Router>
    );
}

export default App;