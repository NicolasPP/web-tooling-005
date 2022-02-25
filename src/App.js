import React, { useEffect, useState } from "react";
import { useGetAllBreeds } from "./useGetAllBreeds";
import { getRandomItemFromArray } from "./utils";

export const Inner = ({
  selectedBreed,
  setSelectedBreed,
  allBreeds,
  selectRandomBreed,
}) => (
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
      <button data-testid="random-button" onClick={selectRandomBreed}>
        random
      </button>
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

  const selectRandomBreed = () =>
    setSelectedBreed(getRandomItemFromArray(allBreeds));

  if (!allBreeds) return <div data-testid="main">loading</div>;

  return (
    <Inner
      allBreeds={allBreeds}
      selectRandomBreed={selectRandomBreed}
      selectedBreed={selectedBreed}
      setSelectedBreed={setSelectedBreed}
    />
  );
};

export default App;
