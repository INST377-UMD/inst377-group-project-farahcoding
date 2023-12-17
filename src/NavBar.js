
import React, { useEffect, useState } from 'react';
import './NavBar.css';

const Navbar = () => {
  const [contentHeight, setContentHeight] = useState(0);
  // Adjust the maximum padding as needed
  const maxPadding = 350; 

  const updatePadding = () => {
    const navbarHeight = document.querySelector('.navbar').offsetHeight;
    const newPadding = Math.min(navbarHeight + contentHeight, maxPadding);
    document.body.style.paddingBottom = `${newPadding}px`;
  };

  useEffect(() => {
    const updateContentHeight = () => {
      // Change selector based on your content structure
      const content = document.querySelector('#root'); 
      setContentHeight(content.offsetHeight);
    };

    updatePadding(); 
    updateContentHeight(); 

    window.addEventListener('resize', () => {
      updatePadding();
      updateContentHeight();
    });

    return () => {
      window.removeEventListener('resize', () => {
        updatePadding();
        updateContentHeight();
      });
    };
  }, [contentHeight]);

  return (
    <>
      <nav className="navbar">
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
          
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
