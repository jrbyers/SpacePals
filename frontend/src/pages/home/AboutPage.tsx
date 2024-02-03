import React from 'react'

import "./AboutPage.css"

export default function AboutPage() {
  return (
    <div className="about-page">
      <div className="right-blob"></div>
      <div className="main-container">
        <div className="mission-container">
          <span
            style={{ fontWeight: "bold", fontSize: "40pt", lineHeight: "50px" }}
          >
            About:
          </span>
          <br />
          With SpacePals you can embark on a journey to discover the conzmos!
          Take pictures of all the alien animlas that you find along the way,
          and look back at them later on in your Explorers's Guide! You can see
          your progress there as you progress on your journey and learn some
          cool information about all the animals you encounter.
        </div>
        <div className="emoji-container">👽</div>
      </div>
    </div>
  );
}
