import React from "react";

const Inner = ({ selectedBreed, setSelectedBreed, allBreeds }) => (
  <div data-testid="main">
    <div>
      {allBreeds.map((breed) => (
        <button
          key={breed}
          data-testid="breed-button"
          onClick={() => setSelectedBreed(breed)}
        >
          {breed}
        </button>
      ))}
    </div>
    <pre data-testid="selected-breed">{selectedBreed}</pre>
  </div>
);

export default Inner;
