// src/pages/CasID.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { validateCasId, generatePassword } from '../utils/productKeys';
import Popup from '../components/Popup';

function CasID() {
    const [casId, setCasId] = useState('');
    const [confirmCasId, setConfirmCasId] = useState('');
    const [popup, setPopup] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    const { productType } = location.state || {};

    useEffect(() => {
        if (!productType) navigate('/activate', { replace: true });
    }, [productType, navigate]);

    const handleVerify = () => {
        if (!casId.trim() || !confirmCasId.trim()) {
            setPopup({ type: 'error', message: 'Please enter valid CAS IDs.' });
            return;
        }

        if (casId !== confirmCasId) {
            setPopup({ type: 'error', message: 'CAS IDs do not match.' });
            return;
        }

        const val = validateCasId(casId);
        if (!val.valid) {
            setPopup({ type: 'error', message: val.message });
            return;
        }

        const last6 = casId.slice(-6);
        const productChar =
            productType === "methods" ? "M" :
                productType === "specialist" ? "S" :
                    productType === "both" ? "B" : "M";

        const password = generatePassword(last6, productChar);

        setTimeout(() => {
            navigate('/installation-complete', {
                state: {
                    password,
                    casId,
                    productType,
                }
            });
        }, 1000);
    };

    return (
        <div className="bg-[#202830] text-white py-12 px-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold mb-4 text-center">
                    CAS ID Verification
                </h1>

                <div className="bg-[#2d5047] p-8 rounded-2xl">
                    <h2 className="text-[#f4a52e] text-2xl font-bold text-center mb-6">
                        Enter the last 6 digits of the CAS ID
                    </h2>

                    <div className="space-y-6">
                        <input
                            value={casId}
                            onChange={(e) => setCasId(e.target.value)}
                            className="w-full bg-white text-gray-800 p-3 rounded-lg text-center text-lg"
                            placeholder="CAS ID"
                        />

                        <input
                            value={confirmCasId}
                            onChange={(e) => setConfirmCasId(e.target.value)}
                            className="w-full bg-white text-gray-800 p-3 rounded-lg text-center text-lg"
                            placeholder="Confirm CAS ID"
                        />
                    </div>

                    <button
                        onClick={handleVerify}
                        className="w-full mt-8 py-3 bg-gradient-to-r from-[#62a888] to-[#74be9c] rounded-lg text-[#202830] font-bold"
                    >
                        Verify CAS ID
                    </button>

                </div>
            </div>

            {popup && (
                <Popup
                    type={popup.type}
                    message={popup.message}
                    onClose={() => setPopup(null)}
                />
            )}
        </div>
    );
}

export default CasID;
