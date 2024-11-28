import React from 'react';
import Link from 'next/link';

const Navbar = () => {
    return (
        <div className="container">
            <nav id="mynav" className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand headline fs-3 ps-3" href="#">AsaTem</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0 text-uppercase">
                            <li className="nav-item">
                                <a className="nav-link text-white" aria-current="page" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" aria-current="page" href="#about">About Us</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" aria-current="page" href="#service">Services</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" aria-current="page" href="#review">Client Say</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" aria-current="page" href="#Faq">Faq</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link text-white" aria-current="page" href="#contact">Contact Us</a>
                            </li>
                            {/* Dropdown Menu for Tools */}
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Tools
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><Link href="/tools/email-finder" className="dropdown-item">Email Finder</Link></li>
                                    <li><Link href="/tools/email-validator" className="dropdown-item">Email Checker</Link></li>
                                    <li><Link href="/tools/number-finder" className="dropdown-item">Website Number Checker</Link></li>
                                    <li><Link href="/tools/link-finder" className="dropdown-item">Website Link Finder</Link></li>
                                    <li><Link href="/tools/social-finder" className="dropdown-item">Social Media Finder</Link></li>
                                    <li><Link href="/tools/word-counter" className="dropdown-item">Word Counter</Link></li>
                                    <li><Link href="/tools/reverse-text-generator" className="dropdown-item">Reverse Text Generator</Link></li>
                                    <li><Link href="/tools/small-text-generator" className="dropdown-item">Small Text Generator</Link></li>
                                    <li><Link href="/tools/change-text-case" className="dropdown-item">Change Text Case</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><Link href="/tools" className="dropdown-item">More Tools</Link></li>
                                </ul>
                            </li>
                        </ul>
                        <button className="btn btn-outline-primary text-white">Become a member</button>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
