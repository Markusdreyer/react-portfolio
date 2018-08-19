import React from 'react';
import Navbar from './Navbar.css'


const navbar = (props) => {
    return (   
        <div>
            <ul>
                <li><a href='#home'>Home</a></li>
                <li><a href='#projects'>Projects</a></li>
                <li><a href='#about'>About</a></li>
                <li><a href='#contact'>Contact</a></li>
            </ul>
        </div>
    )
}


export default navbar;