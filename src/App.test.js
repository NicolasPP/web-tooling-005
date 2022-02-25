/* eslint-disable import/first */
jest.mock("./useGetAllBreeds");
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import App, { Inner } from "./App";
import * as useGetAllBreedsImports from "./useGetAllBreeds";

const useGetAllBreedsSpy = jest.spyOn(
  useGetAllBreedsImports,
  "useGetAllBreeds"
);

const defaultInnerProps = {
  allBreeds: ["pug", "poodle"],
  selectedBreed: null,
  setSelectedBreed: () => {},
};

// this component makes it easier to test the inner component and changing its state
const MockStateComponent = () => {
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
      "poodle"
    );
  });

  it("should change the selected breed when clicking breed buttons", () => {
    render(<MockStateComponent />);
    expect(screen.getByTestId("selected-breed")).toBeEmptyDOMElement();
    userEvent.click(screen.getAllByTestId("breed-button")[0]);
    expect(screen.getByTestId("selected-breed")).toHaveTextContent("pug");
  });
});

describe("App", () => {
  it("should not break when rendering App component", () => {
    render(<App />);
    expect(screen.getByTestId("main")).toBeVisible();
  });

  it("should show a loading state when the data haven’t arrived yet", () => {
    useGetAllBreedsSpy.mockImplementation(() => undefined);
    render(<App />);
    expect(screen.queryByTestId("loading-state")).toBeVisible();
    expect(screen.queryByTestId("breed-button")).toBe(null);
  });

  it("should hide the loading state and show buttons when we receive the data", () => {
    useGetAllBreedsSpy.mockImplementation(() => ["pug", "poodle"]);
    render(<App />);
    expect(screen.queryByTestId("loading-state")).toBeNull();
    expect(screen.getAllByTestId("breed-button")).toHaveLength(2);
    expect(screen.getAllByTestId("breed-button")[0]).toHaveTextContent("pug");
    expect(screen.getAllByTestId("breed-button")[1]).toHaveTextContent(
      "poodle"
    );
  });

  it("clicking a breed-button should change the selected breed", () => {
    useGetAllBreedsSpy.mockImplementation(() => ["pug", "poodle"]);
    render(<App />);
    expect(screen.getByTestId("selected-breed")).toBeEmptyDOMElement();
    userEvent.click(screen.getAllByTestId("breed-button")[0]);
    expect(screen.getByTestId("selected-breed")).toHaveTextContent("pug");
    userEvent.click(screen.getAllByTestId("breed-button")[1]);
    expect(screen.getByTestId("selected-breed")).toHaveTextContent("poodle");
    userEvent.click(screen.getAllByTestId("breed-button")[0]);
    expect(screen.getByTestId("selected-breed")).toHaveTextContent("pug");
  });
});
