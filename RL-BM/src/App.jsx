// src/App.jsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Analytics } from "@vercel/analytics/react";
import { supabase } from './supabaseClient.js'; // Ensure this file exists with your Supabase keys

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
import TermsOfService from './pages/helper pages/TermsOfService.jsx';
import Team from './pages/Team.jsx';
import PrivacyPolicy from './pages/helper pages/PrivacyPolicy.jsx';
import LearningPortal from "./pages/LearningPortal";
import Login from "./pages/Login"; // Ensure you create this file in your pages folder
import './App.css';

/**
 * Controller class for managing application-wide routing behaviors.
 */
class AppRouterController {
    constructor(pathname, windowObj) {
        this.pathname = pathname;
        this.window = windowObj;
    }

    scrollToTop() {
        this.window.scrollTo(0, 0);
    }
}

function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        const controller = new AppRouterController(pathname, window);
        controller.scrollToTop();
    }, [pathname]);

    return null;
}

function App() {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Initialize session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setLoading(false);
        });

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#1a1f26] flex items-center justify-center">
                <div className="text-[#74be9c] font-bold uppercase tracking-[0.3em] animate-pulse">
                    Initialising System...
                </div>
            </div>
        );
    }

    return (
        <Router>
            <ScrollToTop />
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-grow">
                    <Routes>
                        {/* Public Routes */}
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

                        {/* Authentication Page */}
                        <Route
                            path="/login"
                            element={
                                !session
                                    ? <Login />
                                    : <Navigate to="/learning-portal" replace />
                            }
                        />

                        <Route
                            path="/learning-portal"
                            element={
                                session || sessionStorage.getItem('devLearningPortalAccess') === 'true'
                                    ? <LearningPortal />
                                    : <Navigate to="/login" replace />
                            }
                        />
                    </Routes>
                </main>
                <Footer />
                <Analytics />
            </div>
        </Router>
    );
}

export default App;