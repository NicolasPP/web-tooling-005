jest.mock("./useGetAllBreeds", () => ({
  useGetAllBreeds: () => ["pug", "baskiat"],
}));

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import App, { Inner } from "./App";
import { useGetAllBreeds } from "./useGetAllBreeds";

describe("App", () => {
  it("should not break when rendering App component", () => {
    render(<App />);
    expect(screen.getByTestId("main")).toBeVisible();
  });

  it("should get data for us", () => {});
});

const defaultInnerProps = {
  allBreeds: ["pug", "baskiat"],
  selectRandomBreed: () => {},
  selectedBreed: null,
  setSelectedBreed: () => {},
};

const MockStateComponent = () => {
  // const [allBreeds, setAllBreeds] = useState(null);
  const [selectedBreed, setSelectedBreed] = useState(null);

  return (
    <Inner
      {...defaultInnerProps}
      selectedBreed={selectedBreed}
      setSelectedBreed={setSelectedBreed}
    />
  );
};

describe("Inner", () => {
  it("should render buttons for each breed", () => {
    render(<Inner {...defaultInnerProps} />);
    expect(screen.getAllByTestId("breed-button")[0]).toHaveTextContent("pug");
    expect(screen.getAllByTestId("breed-button")[1]).toHaveTextContent(
      "baskiat"
    );
  });

  it("should change the selected breed when clicking breed buttons", () => {
    render(<MockStateComponent />);
    expect(screen.getByTestId("selected-breed")).toBeEmptyDOMElement();
    userEvent.click(screen.getAllByTestId("breed-button")[0]);
    expect(screen.getByTestId("selected-breed")).toHaveTextContent("pug");
  });
});
