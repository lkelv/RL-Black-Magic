// src/pages/InstallationGuide.jsx
import React, { useState } from 'react';
import ActivateNowImg from '../../assets/ActivateNow.png';
import SubjectSelection from '../../assets/SubjectSelection.png';
import ProductKey from '../../assets/ProductKey.png';
import Redirect from '../../assets/Redirect.png';
import Downloads from '../../assets/Download.png';
import Downloadmanual from '../../assets/Downloadmanual.png';
import FileTransfer from '../../assets/FileTransfer.png';
import ConnectCalc from '../../assets/ConnectCalc.png';
import ToDoCAS from '../../assets/ToDoCAS.png';
import ToCalc from '../../assets/ToCalc.png';
import TransferPage from '../../assets/TransferPage.png';
import CASIDverification from '../../assets/CASIDverification.png';
import CASIDlocation from '../../assets/CASIDlocation.png';
import InstallationComplete from '../../assets/InstallationComplete.png';
import BlackDownloadCAS from '../../assets/Blackcompcasdownload.png';
import BlackCompCASProgram from '../../assets/BlackCompCASProgram.png';

function InstallationGuide() {
    const [activeGuide, setActiveGuide] = useState('blue');

    const sections = [
        { id: 'video', title: 'Video Guide' },
        { id: 'intro', title: 'Overview' },
        { id: 'cas-type', title: 'Calculator Type' },
        { id: 'step1', title: 'Step 1' },
        { id: 'step2', title: 'Step 2' },
        { id: 'step3', title: 'Step 3' },
        { id: 'step4', title: 'Step 4' },
        { id: 'step5', title: 'Step 5' },
        { id: 'step6', title: 'Step 6' },
        { id: 'step7', title: 'Step 7' },
        { id: 'step8', title: 'Step 8' },
    ];

    const scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (!el) return;

        const y = el.getBoundingClientRect().top + window.scrollY;
        const targetY = y - window.innerHeight * 0.35;

        window.scrollTo({ top: targetY, behavior: 'smooth' });
    };

    return (
        <div className="bg-[#202830] min-h-screen text-white py-12 px-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-center">Installation Guide</h1>

                <div className="flex flex-col md:flex-row gap-10">
                    {/* Sticky Sidebar Navigation (LEFT) */}
                    <aside className="md:w-1/4">
                        <div className="sticky top-0 h-screen flex items-center">
                            <div className="w-full max-h-[85vh] overflow-auto pr-2 space-y-2">
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">
                                    Contents
                                </p>

                                {sections.map((section) => (
                                    <button
                                        key={section.id}
                                        type="button"
                                        onClick={() => scrollToSection(section.id)}
                                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-[#2d5047] hover:text-[#74be9c] transition-all text-left group"
                                    >
                                        <span className="font-medium">{section.title}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* Main Content (RIGHT) */}
                    <main className="md:w-3/4">
                        {/* Responsive 16:9 iframe (no plugin needed) */}
                        <div id="video" className="relative w-full mb-8">
                            <div className="pt-[56.25%]"></div>
                            <iframe
                                className="absolute inset-0 h-full w-full rounded-lg"
                                src="https://www.youtube.com/embed/dQw4w9WgXcQ?list=RDdQw4w9WgXcQ"
                                title="BlackMagic Installation Guide"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                                referrerPolicy="strict-origin-when-cross-origin"
                            />
                        </div>

                        {/* Placeholder Text */}
                        <div id="intro" className="bg-[#2d3642] rounded-lg p-8 mb-[32px]">
                            <h2 className="text-2xl font-semibold mb-4">How to Install BlackMagic</h2>
                            <p className="text-gray-300 leading-relaxed">
                                Here you will find a step-by-step guide on how to
                                install and activate the BlackMagic program on your CAS calculator.
                                Detailed instructions, screenshots, and troubleshooting tips are provided below.
                            </p>
                        </div>

                        {/* CAS Type Selection Buttons */}
                        <div id="cas-type" className="mb-8 max-w-sm mx-auto">
                            <div className="grid grid-cols-2 gap-2">
                                <button
                                    type="button"
                                    onClick={() => setActiveGuide('blue')}
                                    className={
                                        "rounded-md py-2 px-4 text-sm font-semibold transition-all border cursor-pointer " +
                                        (activeGuide === 'blue'
                                            ? "bg-[#3a4552] text-[#74be9c] border-[#74be9c]"
                                            : "bg-transparent text-gray-400 border-[#3a4552] hover:text-white hover:border-gray-500")
                                    }
                                >
                                    Blue CAS
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setActiveGuide('black')}
                                    className={
                                        "rounded-md py-2 px-4 text-sm font-semibold transition-all border cursor-pointer " +
                                        (activeGuide === 'black'
                                            ? "bg-[#3a4552] text-[#74be9c] border-[#74be9c]"
                                            : "bg-transparent text-gray-400 border-[#3a4552] hover:text-white hover:border-gray-500")
                                    }
                                >
                                    Black CAS
                                </button>
                            </div>
                            <p className="text-xs text-gray-400 text-center mt-3 italic">
                                Select your calculator type to view transfer steps.
                            </p>
                        </div>

                        <div id="step1" className="bg-[#2d3642] rounded-lg p-8 mb-[32px]">
                            <h2 className="text-2xl font-semibold mb-4">Step 1</h2>
                            <p className="text-gray-300 leading-relaxed">
                                Go to your home page, and click on "Activate Now".
                            </p>
                            <div className="mt-4">
                                <img
                                    src={ActivateNowImg}
                                    alt="Where to click Activate Now"
                                    className="rounded-lg shadow-lg border border-[#3a4552]"
                                />
                            </div>
                        </div>

                        <div id="step2" className="bg-[#2d3642] rounded-lg p-8 mb-[32px]">
                            <h2 className="text-2xl font-semibold mb-4">Step 2</h2>
                            <p className="text-gray-300 leading-relaxed">
                                Once you have clicked on the "Activate Now", the website should
                                redirect you to a subject selection page. You will be given the
                                following options, Maths Methods, Specialist Maths or Both subjects.
                                Please selection your respective subjects, to activate your Black
                                Magic Program on your CAS Calculator.
                            </p>
                            <div className="mt-4">
                                <img
                                    src={SubjectSelection}
                                    alt="Subjects Selection Page, showing MM, SM and both"
                                    className="rounded-lg shadow-lg border border-[#3a4552]"
                                />
                            </div>
                        </div>

                        <div id="step3" className="bg-[#2d3642] rounded-lg p-8 mb-[32px]">
                            <h2 className="text-2xl font-semibold mb-4">Step 3</h2>
                            <p className="text-gray-300 leading-relaxed">
                                After selecting your subject, you will be redirected to the product key
                                activation page. Enter your assigned product key in the input field. Then click
                                "Activate" so that the system will verify it, and if the key is valid,
                                you’ll be taken to the next page.
                            </p>
                            <div className="mt-4">
                                <img
                                    src={ProductKey}
                                    alt="Product Key Page"
                                    className="rounded-lg shadow-lg border border-[#3a4552]"
                                />
                            </div>
                        </div>

                        <div id="step4" className="bg-[#2d3642] rounded-lg p-8 mb-[32px]">
                            <h2 className="text-2xl font-semibold mb-4">Step 4</h2>
                            <p className="text-gray-300 leading-relaxed">
                                Once the product key has been successfully verified, you
                                will be redirected to the download page which should automatically download
                                the file for the specific subject you will be receiving.
                            </p>
                            <div className="mt-4">
                                <img
                                    src={Redirect}
                                    alt="Redirect"
                                    className="rounded-lg shadow-lg border border-[#3a4552]"
                                />
                            </div>
                            <p className="text-gray-300 leading-relaxed">
                                If the file has not automatically downloaded for you, please
                                click on the manual download link.
                            </p>
                            <div className="mt-4">
                                <img
                                    src={Downloadmanual}
                                    alt="Manual download link"
                                    className="rounded-lg shadow-lg border border-[#3a4552]"
                                />
                            </div>
                        </div>

                        <div id="step5" className="bg-[#2d3642] rounded-lg p-8 mb-[32px]">
                            <h2 className="text-2xl font-semibold mb-4">Step 5</h2>

                            {activeGuide === 'blue' && (
                                <>
                                    <p className="text-gray-300 leading-relaxed">
                                        Now we want to transfer this downloaded file into your CAS calculator.
                                        Please ensure that your CAS calculator is connected to your computer.
                                        Once it is connected, please go to{' '}
                                        <a
                                            href="https://nspireconnect.ti.com/nsc/file-transfer"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[#74be9c] underline hover:text-[#62a888]"
                                        >
                                            nspireconnect.ti.com/nsc/file-transfer
                                        </a>
                                        {' '}to transfer the BlackMagic Program file. Please click on "Connect
                                        to Calculator".
                                    </p>
                                    <div className="mt-4">
                                        <img
                                            src={FileTransfer}
                                            alt="CAS connection page"
                                            className="rounded-lg shadow-lg border border-[#3a4552]"
                                        />
                                    </div>
                                    <p className="text-gray-300 leading-relaxed">
                                        You should see your calculator appear after clicking "Connect to Calculator".
                                        If it doesn’t show up, please contact RL staff for assistance,
                                        as older versions of the CAS calculator (eg. black CAS) may not be supported.
                                    </p>
                                    <div className="mt-4">
                                        <img
                                            src={ConnectCalc}
                                            alt="Connect Calculator"
                                            className="rounded-lg shadow-lg border border-[#3a4552]"
                                        />
                                    </div>
                                    <p className="text-gray-300 leading-relaxed">
                                        Click on "Transfer File".
                                    </p>
                                    <div className="mt-4">
                                        <img
                                            src={ToDoCAS}
                                            alt="Connect Calculator"
                                            className="rounded-lg shadow-lg border border-[#3a4552]"
                                        />
                                    </div>
                                    <p className="text-gray-300 leading-relaxed">
                                        Click on "To Calculator".
                                    </p>
                                    <div className="mt-4">
                                        <img
                                            src={ToCalc}
                                            alt="Connect Calculator"
                                            className="rounded-lg shadow-lg border border-[#3a4552]"
                                        />
                                    </div>
                                    <p className="text-gray-300 leading-relaxed">
                                        Now click on either Google Drive or your Computer drive, depending
                                        on where you saved your black magic file, and transfer it to your CAS
                                        calculator.
                                    </p>
                                    <div className="mt-4">
                                        <img
                                            src={TransferPage}
                                            alt="Connect Calculator"
                                            className="rounded-lg shadow-lg border border-[#3a4552]"
                                        />
                                    </div>
                                    <p className="text-gray-300 leading-relaxed">
                                        Once you have successfully completed the following steps, please
                                        proceed to the next step by clicking the "Continue to CAS ID verification"
                                        button.
                                    </p>
                                    <div className="mt-4">
                                        <img
                                            src={Downloads}
                                            alt="Connect Calculator"
                                            className="rounded-lg shadow-lg border border-[#3a4552]"
                                        />
                                    </div>
                                </>
                            )}

                            {activeGuide === 'black' && (
                                <div className="text-gray-300 leading-relaxed">
                                    <p className="text-gray-300 leading-relaxed">
                                        Now we want to transfer this downloaded file into your CAS calculator.
                                        Please ensure that your CAS calculator is connected to your computer.
                                        Once it is connected, please go to{' '}
                                        <a
                                            href="https://education.ti.com/en/products/computer-software/ti-nspire-computer-link"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[#74be9c] underline hover:text-[#62a888]"
                                        >
                                            education.ti.com
                                        </a>
                                        {' '}to transfer the BlackMagic Program file. Please click on "Download".
                                    </p>
                                    <div className="mt-4">
                                        <img
                                            src={BlackDownloadCAS}
                                            alt="CAS connection page"
                                            className="rounded-lg shadow-lg border border-[#3a4552]"
                                        />
                                    </div>
                                    <p className="text-gray-300 leading-relaxed">
                                        Once you have downloaded the CAS computer program, you will be prompted for a activation
                                        code or a free trial. Please click on the free trial to enable access to the CAS Computer
                                        Program. if you don't want to click on the free trial, please come to RL for installation
                                        of Black Magic on your Black CAS Calculator.
                                    </p>

                                    <p className="text-gray-300 leading-relaxed">
                                        Once you have gotten the free trial, it is reccomended that you cancel trial immediately,
                                        to avoid financial complications. Your application should open up to become like the image below.
                                        Please ensure that you click the file button for transfering the BlackMagic Files.
                                    </p>
                                    <div className="mt-4">
                                        <img
                                            src={BlackCompCASProgram}
                                            alt="CAS connection page"
                                            className="rounded-lg shadow-lg border border-[#3a4552]"
                                        />
                                    </div>
                                    <p className="text-gray-300 leading-relaxed">
                                        Now you want to find your BlackMagic Program installed on your computer on the top rightside of the screen
                                    </p>
                                    <div className="mt-4">
                                        <img
                                            src={BlackCompCASProgram}
                                            alt="CAS connection page"
                                            className="rounded-lg shadow-lg border border-[#3a4552]"
                                        />
                                    </div>
                                    <p className="text-gray-300 leading-relaxed">
                                        Once you found it, please drag the BlackMagic Program into the CAS calculator connected to your computer.
                                    </p>
                                    <div className="mt-4">
                                        <img
                                            src={BlackCompCASProgram}
                                            alt="CAS connection page"
                                            className="rounded-lg shadow-lg border border-[#3a4552]"
                                        />
                                    </div>
                                    <p className="text-gray-300 leading-relaxed">
                                        Once you have successfully completed the following steps, please
                                        proceed to the next step by clicking the "Continue to CAS ID verification"
                                        button.
                                    </p>
                                    <div className="mt-4">
                                        <img
                                            src={Downloads}
                                            alt="Connect Calculator"
                                            className="rounded-lg shadow-lg border border-[#3a4552]"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>

                        <div id="step6" className="bg-[#2d3642] rounded-lg p-8 mb-[32px]">
                            <h2 className="text-2xl font-semibold mb-4">Step 6</h2>
                            <p className="text-gray-300 leading-relaxed">
                                Please enter the last 6 digits of your CAS ID into the input box.
                            </p>
                            <div className="mt-4">
                                <img
                                    src={CASIDverification}
                                    alt="CAS ID verification"
                                    className="rounded-lg shadow-lg border border-[#3a4552]"
                                />
                            </div>
                            <p className="text-gray-300 leading-relaxed">
                                If you are wondering where are the last 6 digits of your CAS ID,
                                please open up the downloaded program in your CAS calculator. The CAS ID
                                should be shown on the front page as soon as you open the file.
                            </p>
                            <div className="mt-4">
                                <img
                                    src={CASIDlocation}
                                    alt="CAS ID location"
                                    className="rounded-lg shadow-lg border border-[#3a4552]"
                                />
                            </div>
                        </div>

                        <div id="step7" className="bg-[#2d3642] rounded-lg p-8 mb-[32px]">
                            <h2 className="text-2xl font-semibold mb-4">Step 7</h2>
                            <p className="text-gray-300 leading-relaxed">
                                Now you have finished setting up the BlackMagic Program!
                                Please ensure you save your password, to ensure you don't get
                                locked out of the program.
                            </p>
                            <div className="mt-4">
                                <img
                                    src={InstallationComplete}
                                    alt="CAS ID Complete"
                                    className="rounded-lg shadow-lg border border-[#3a4552]"
                                />
                            </div>
                        </div>

                        <div id="step8" className="bg-[#2d3642] rounded-lg p-8 mb-[32px]">
                            <h2 className="text-2xl font-semibold mb-4">Step 8</h2>
                            <p className="text-gray-300 leading-relaxed">
                                Put the code into the Enter Password section of the CAS Calculator
                                and click <b className="text-[#F04D4D]">ctrl+s</b> on your CAS to save the
                                code into the program.
                            </p>
                            <p className="mt-4 text-gray-300 leading-relaxed">
                                Start using the program!
                            </p>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}

export default InstallationGuide;