import React from 'react';
import './Header.css';  

function Header() {
    return (
        <header className="header">
            <img src="logo.png" alt="Company Logo" className="logo" />
            <nav>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">About</a></li>
                </ul>
            </nav>
        </header>
    );
}


export default Header;

    