import React from 'react';

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
                                    <li><a className="dropdown-item" href="tools/email-finder">Email Finder</a></li>
                                    <li><a className="dropdown-item" href="tools/email-validator">Email Checker</a></li>
                                    <li><a className="dropdown-item" href="tools/number-finder">Website Number Checker</a></li>
                                    <li><a className="dropdown-item" href="tools/link-finder">Website Link Finder</a></li>
                                    <li><a className="dropdown-item" href="tools/social-finder">Website Number Checker</a></li>
                                    <li><a className="dropdown-item" href="tools/word-counter">Word Counter</a></li>
                                    <li><a className="dropdown-item" href="tools/reverse-text-generator">Reverse Text Generator</a></li>
                                    <li><a className="dropdown-item" href="tools/small-text-generator">Small Text Generator</a></li>
                                    <li><a className="dropdown-item" href="tools/change-text-case">Change Text Case</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item" href="#">More Tools</a></li>
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
