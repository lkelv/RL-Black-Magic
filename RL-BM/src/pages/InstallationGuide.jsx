// src/pages/InstallationGuide.jsx
import React from 'react';
import ActivateNowImg from '../assets/ActivateNow.png';
import SubjectSelection from '../assets/SubjectSelection.png';
import ProductKey from '../assets/ProductKey.png';
import Redirect from '../assets/Redirect.png';
import Downloadmanual from '../assets/Downloadmanual.png';
import FileTransfer from '../assets/FileTransfer.png';

function InstallationGuide() {
    return (
        <div className="bg-[#202830] min-h-screen text-white py-12 px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-8 text-center">Installation Guide</h1>

                {/* Responsive 16:9 iframe (no plugin needed) */}
                <div className="relative w-full mb-8">
                    {/* 56.25% = 9/16 to preserve 16:9 */}
                    <div className="pt-[56.25%]"></div>
                    <iframe
                        className="absolute inset-0 h-full w-full rounded-lg"
                        src="https://www.youtube.com/embed/dQw4w9WgXcQ?list=RDdQw4w9WgXcQ"  // use /embed/<ID>
                        title="Black Magic Installation Guide"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        referrerPolicy="strict-origin-when-cross-origin"
                    />
                </div>

                {/* Placeholder Text */}
                <div className="bg-[#2d3642] rounded-lg p-8 mb-[32px]">
                    <h2 className="text-2xl font-semibold mb-4">How to Install Black Magic</h2>
                    <p className="text-gray-300 leading-relaxed">
                        Here you will find a step-by-step guide on how to
                        install and activate the Black Magic program on your CAS calculator.
                        Detailed instructions, screenshots, and troubleshooting tips are provided below.
                    </p>
                </div>
                <div className="bg-[#2d3642] rounded-lg p-8 mb-[32px]">
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
                <div className="bg-[#2d3642] rounded-lg p-8 mb-[32px]">
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
                <div className="bg-[#2d3642] rounded-lg p-8 mb-[32px]">
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
                <div className="bg-[#2d3642] rounded-lg p-8 mb-[32px]">
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
                <div className="bg-[#2d3642] rounded-lg p-8 mb-[32px]">
                    <h2 className="text-2xl font-semibold mb-4">Step 5</h2>
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
                        {' '}to transfer the Black Magic Program file. Please click on "Connect
                        to Calculator".
                    </p>
                    <div className="mt-4">
                        <img
                            src={FileTransfer}
                            alt="Manual download link"
                            className="rounded-lg shadow-lg border border-[#3a4552]"
                        />
                    </div>

                </div>
                <div className="bg-[#2d3642] rounded-lg p-8 mb-[32px]">
                    <h2 className="text-2xl font-semibold mb-4">Step 6</h2>
                    <p className="text-gray-300 leading-relaxed">
                        Placeholder text: Here you will find a step-by-step guide on how to
                        install and activate the Black Magic program on your CAS calculator.
                        Detailed instructions, screenshots, and troubleshooting tips will
                        be provided here soon.
                    </p>
                </div>
                <div className="bg-[#2d3642] rounded-lg p-8 mb-[32px]">
                    <h2 className="text-2xl font-semibold mb-4">Step 7</h2>
                    <p className="text-gray-300 leading-relaxed">
                        Placeholder text: Here you will find a step-by-step guide on how to
                        install and activate the Black Magic program on your CAS calculator.
                        Detailed instructions, screenshots, and troubleshooting tips will
                        be provided here soon.
                    </p>
                </div>
                <div className="bg-[#2d3642] rounded-lg p-8 mb-[32px]">
                    <h2 className="text-2xl font-semibold mb-4">Step 8</h2>
                    <p className="text-gray-300 leading-relaxed">
                        Placeholder text: Here you will find a step-by-step guide on how to
                        install and activate the Black Magic program on your CAS calculator.
                        Detailed instructions, screenshots, and troubleshooting tips will
                        be provided here soon.
                    </p>
                </div>
                <div className="bg-[#2d3642] rounded-lg p-8 mb-[32px]">
                    <h2 className="text-2xl font-semibold mb-4">Step 9</h2>
                    <p className="text-gray-300 leading-relaxed">
                        Placeholder text: Here you will find a step-by-step guide on how to
                        install and activate the Black Magic program on your CAS calculator.
                        Detailed instructions, screenshots, and troubleshooting tips will
                        be provided here soon.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default InstallationGuide;
