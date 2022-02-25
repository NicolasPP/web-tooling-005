export const fetchJSON = async (endpoint) =>
  await fetch(endpoint).then((x) => x.json());

export const massageData = (data) => Object.keys(data?.message);

export const LIST_ALL_BREEDS_ENDPOINT = "https://dog.ceo/api/breeds/list/all";
