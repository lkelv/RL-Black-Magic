import React from 'react';
import { supabase } from '../supabaseClient.js';
import { ShieldCheck, LogIn } from 'lucide-react';

const Login = () => {
    const handleGoogleLogin = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: window.location.origin + '/learning-portal',
            },
        });
    };

    const handleDevAccess = () => {
        sessionStorage.setItem('devLearningPortalAccess', 'true');
        window.location.href = '/learning-portal';
    };

    return (
        <div className="min-h-screen bg-[#1a1f26] flex items-center justify-center p-6 font-sans">
            <div className="max-w-md w-full bg-[#202830] rounded-[2.5rem] border border-white/10 p-12 text-center shadow-2xl relative overflow-hidden">
                <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#74be9c]/10 rounded-full blur-3xl" />

                <div className="relative z-10">
                    <div className="w-20 h-20 bg-[#1a1f26] border border-[#74be9c]/30 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner">
                        <ShieldCheck size={40} className="text-[#74be9c]" />
                    </div>

                    <h1 className="text-3xl font-black text-white mb-4 tracking-tight">
                        Student <span className="text-[#74be9c]">Portal</span>
                    </h1>

                    <p className="text-gray-400 mb-10 leading-relaxed">
                        Please sign in with your student Google account to access your courses and progress.
                    </p>

                    <button
                        onClick={handleGoogleLogin}
                        className="w-full group flex items-center justify-center gap-4 bg-[#1a1f26] border border-[#f59e0b]/50 hover:border-[#f59e0b] text-white py-5 rounded-2xl font-bold uppercase tracking-widest transition-all hover:shadow-[0_0_20px_rgba(245,158,11,0.2)] active:scale-[0.98]"
                    >
                        <img
                            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                            className="w-6 h-6"
                            alt="Google"
                        />
                        Continue with Google
                    </button>

                    {import.meta.env.DEV && (
                        <button
                            onClick={handleDevAccess}
                            className="w-full mt-4 flex items-center justify-center gap-3 bg-transparent border border-[#74be9c]/40 hover:border-[#74be9c] text-[#74be9c] py-4 rounded-2xl font-semibold transition-all hover:shadow-[0_0_15px_rgba(116,190,156,0.2)] active:scale-[0.98]"
                        >
                            <LogIn size={18} />
                            Dev Access
                        </button>
                    )}

                    <div className="mt-8 pt-8 border-t border-white/5">
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em]">
                            RL BlackMagic Security Protocol v1.9
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;