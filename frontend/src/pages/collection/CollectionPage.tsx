import React from "react";

import "./CollectionPage.css";
import animals from "src/assets/animals/animals2.json";

import AnimalCard from "src/components/card/AnimalCard";

//main component of the collection page
export default function CollectionPage() {
  const foundAnimals: boolean[] = [
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    false,
    true,
    true,
  ];
  return (
    <div className="animal-gallery">
      {animals.map((animal, index) =>
        foundAnimals[index] ? (
          <AnimalCard
            key={index}
            name={animal.name}
            alienName={animal.alienName}
            height={animal.height}
            weight={animal.weight}
            rarity={animal.rarity}
            image={animal.image}
          />
        ) : (
          <div className="placeholder-card">
            {index < 10 ? "0" + (index + 1) : index + 1}
          </div>
        )
      )}
    </div>
  );
}
