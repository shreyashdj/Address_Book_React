import logo1 from '../../assets/logo/logo1.jpeg'
import React, { Component } from 'react';
import './Header.css';

export class Header extends Component {
    render() {
        return (
            <div>
                <header className="header-content header">
                    <div className="logo-content">
                        <img src={logo1} alt="logo" />
                        <div>
                            <span className="address-text">Address</span><br />
                            <span className="address-text address-book">Book</span>
                        </div>
                    </div>
                </header>
            </div>
        )
    }
}

export default Header;