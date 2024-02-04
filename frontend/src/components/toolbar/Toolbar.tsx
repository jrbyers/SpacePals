import React from "react";
import "./Toolbar.css";

//Main component of the tool bar
function Toolbar() {
  //returns the component
  return (
    <header className="header">
      <a href="/" className="logo">
        SpacePals
      </a>

      <nav className="navbar">
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/faq">FAQ</a>
        <a href="/collection">Collection</a>
      </nav>
    </header>
  );
}

export default Toolbar;
