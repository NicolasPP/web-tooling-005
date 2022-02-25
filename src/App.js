import React, { useEffect, useState } from "react";
import Inner from "./Inner";
import { useGetAllBreeds } from "./useGetAllBreeds";

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
