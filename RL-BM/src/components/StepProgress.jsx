import React from 'react';
import { Check } from 'lucide-react';

const steps = [
    { number: 1, label: 'Product Key' },
    { number: 2, label: 'Download' },
    { number: 3, label: 'CAS ID' },
    { number: 4, label: 'Activate' }
];

function StepProgress({ currentStep }) {
    return (
        <div className="w-full max-w-2xl mx-auto mb-16 px-4">
            <div className="flex items-center justify-between">
                {steps.map((step, index) => {
                    const isCompleted = step.number < currentStep;
                    const isActive = step.number === currentStep;
                    const isLast = index === steps.length - 1;

                    return (
                        <React.Fragment key={step.number}>
                            {/* Step Item */}
                            <div className="relative flex flex-col items-center">
                                <div 
                                    className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full border-4 z-10 transition-all duration-300 font-bold bg-[#202830]
                                        ${isCompleted ? 'border-[#74be9c] text-[#74be9c]' : 
                                          isActive ? 'border-[#f4a52e] text-[#f4a52e] shadow-[0_0_15px_rgba(244,165,46,0.3)]' : 
                                          'border-[#3a4552] text-gray-500'}`}
                                >
                                    {isCompleted ? <Check size={20} strokeWidth={4} /> : step.number}
                                </div>
                                <span className={`absolute top-14 w-32 text-center text-xs sm:text-sm font-semibold transition-colors duration-300
                                    ${isCompleted ? 'text-[#74be9c]' : 
                                      isActive ? 'text-[#f4a52e]' : 
                                      'text-gray-500'}`}
                                >
                                    {step.label}
                                </span>
                            </div>

                            {/* Connector */}
                            {!isLast && (
                                <div className="flex-1 h-1 mx-2 sm:mx-4 rounded-full bg-[#3a4552] z-0 overflow-hidden">
                                    <div 
                                        className={`h-full bg-[#74be9c] transition-all duration-500 ${isCompleted ? 'w-full' : 'w-0'}`}
                                    ></div>
                                </div>
                            )}
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
}

export default StepProgress;
