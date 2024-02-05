import React, { useState } from "react";
import "./AnimalCard.css";
import Button from "react-bootstrap/Button";


interface AnimalCardProps {
  index: number;
  name: string;
  alienName: string;
  height: string;
  weight: string;
  rarity: string;
  image: string;
}

//main component that renders the card
export default function AnimalCard({
  index,
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

  const setFree = () => {
    fetch(`/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `mutation {
          removeAnimal(index: "${String(index)}")
        }`,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch(console.error);
  }

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
          <Button
          variant="secondary"
            onClick={
              setFree
            }
          >
            Set Free!
          </Button>
        </div>
      )}
    </div>
  );
}
