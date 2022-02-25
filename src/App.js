import React, { useEffect, useState } from "react";
import { useGetAllBreeds } from "./useGetAllBreeds";

export const Inner = ({ selectedBreed, setSelectedBreed, allBreeds }) => (
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

const App = () => {
  const [selectedBreed, setSelectedBreed] = useState(null);
  const allBreeds = useGetAllBreeds();

  useEffect(() => {
    document.title = selectedBreed;
  }, [selectedBreed]);

  if (!allBreeds)
    return (
      <div data-testid="main">
        <div data-testid="loading-state">loading</div>
      </div>
    );

  return (
    <Inner
      allBreeds={allBreeds}
      selectedBreed={selectedBreed}
      setSelectedBreed={setSelectedBreed}
    />
  );
};

export default App;
