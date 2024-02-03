import React from 'react'
import PersonComponent from '../../components/home/PersonComponent'

import "./FAQPage.css"

//main component of the faq page
export default function FAQPage() {
  return (
    <div className="faq-page">
      <div className="main-container-faq">
        <div className="overview-container">
          How do I get out of the Home Page?
          <br></br>Please Click on the Planet to get out of the Home Page!
          <br />
          <br />
          How do you know what the image is showing?
          <br></br>We trained a machine learning model that clasifies the
          animals for us!
          <br />
          <br />
          How many alien animals are there?
          <br></br>There are twenty different animals that you can find!
          <br />
          <br />
          Are all animals equally easy to find?
          <br></br>Some animals are rarer than others to find! Goodluck!
        </div>
        <div id="circle-orbit-container">
          <div id="sun"></div>
          <div id="inner-orbit">
            <div className="inner-orbit-cirlces"></div>
          </div>
          <div id="middle-orbit">
            <div className="middle-orbit-cirlces"></div>
          </div>
          <div id="outer-orbit">
            <div className="outer-orbit-cirlces"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
