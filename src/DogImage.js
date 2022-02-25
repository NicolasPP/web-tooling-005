import React, { useEffect, useState } from "react";
import { fetchJSON } from "./utils";

const DogImage = ({ breed }) => {
  const [dogImageSrc, setDogImageSrc] = useState(null);

  useEffect(() => {
    const updateDogImageSrc = async () => {
      const response = await fetchJSON(
        `https://dog.ceo/api/breed/${breed}/images/random`
      );
      setDogImageSrc(response?.message || null);
    };

    updateDogImageSrc();
  }, [breed]);

  if (!dogImageSrc) return null;
  return <img src={dogImageSrc} alt={breed} />;
};

export default DogImage;
