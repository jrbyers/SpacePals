import React, { useState } from "react";
import "./AnimalCard.css";

interface AnimalCardProps {
  name: string;
  alienName: string;
  height: string;
  weight: string;
  rarity: string;
  image: string;
}

//main component that renders the card
export default function AnimalCard({
  name,
  alienName,
  height,
  weight,
  rarity,
  image,
}: AnimalCardProps) {
  const [showDetails, setShowDetails] = useState(false);

  // Function to toggle the visibility state
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div
      className="animal-card"
      onClick={toggleDetails}
      style={{ cursor: "pointer" }}
    >
      {!showDetails && (
        <div>
          <img
            src={image}
            alt={name}
            style={{ width: "100%", display: showDetails ? "none" : "block" }}
            className="animal-image"
          />
          <h2>{alienName}</h2>
        </div>
      )}
      {showDetails && (
        <div className="animal-details">
          <h2>{alienName}</h2>
          <p>Height: {height}</p>
          <p>Weight: {weight}</p>
          <p>Rarity: {rarity}</p>
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevents the toggleDetails from being called
            }}
          >
            Set Free!
          </button>
        </div>
      )}
    </div>
  );
}
