import { useEffect, useState } from "react";
import { fetchJSON, LIST_ALL_BREEDS_ENDPOINT, massageData } from "./utils";

export const useGetAllBreeds = () => {
  const [allBreeds, setAllBreeds] = useState(null);
  useEffect(() => {
    const getBreedsFromAPI = async () => {
      const response = await fetchJSON(LIST_ALL_BREEDS_ENDPOINT);
      console.log({ response });
      if (!response?.message) return;
      const listOfBreeds = massageData(response);
      setAllBreeds(listOfBreeds);
    };

    getBreedsFromAPI();
  }, [setAllBreeds]);

  return allBreeds;
};
