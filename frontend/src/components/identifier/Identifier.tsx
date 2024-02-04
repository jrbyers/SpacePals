import React from "react";
import "./Identifier.css";
import Button from "react-bootstrap/Button";

import JSConfetti from "js-confetti";

interface IdentifierProps {
  name: string;
  alienName: string;
  height: string;
  weight: string;
  rarity: string;
  image: string;
}

//main component that renders the card
export default function Identifier({
  name,
  alienName,
  height,
  weight,
  rarity,
  image,
}: IdentifierProps) {
  // Function to toggle the visibility state

  const jsConfetti = new JSConfetti();

  jsConfetti.addConfetti();

  return (
    <div className="top-div">
      <h1 className="title">Congratulations!</h1>
      <h2>You caught a {alienName}.</h2>
      <img className="animal-img" src={image} />
      <div>Height: {height}</div>
      <div>Weight: {weight}</div>
      <div>Rarity: {rarity}</div>
      <div className="button-group">
        <Button variant="secondary" href="/collection">
          Go to collection
        </Button>
        <Button variant="secondary" href="/camera">
          Go back to camera
        </Button>
      </div>
    </div>
  );
}
