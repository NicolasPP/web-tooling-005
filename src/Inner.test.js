import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import Inner from "./Inner";

const defaultInnerProps = {
  allBreeds: ["pug", "poodle"],
  selectedBreed: null,
  setSelectedBreed: () => {},
};

// this component makes it easier to test the inner component and changing its state
const InnerTestingComponent = () => {
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
    render(<InnerTestingComponent />);
    expect(screen.getAllByTestId("breed-button")[0]).toHaveTextContent("pug");
    expect(screen.getAllByTestId("breed-button")[1]).toHaveTextContent(
      "poodle"
    );
  });

  it("should change the selected breed when clicking breed buttons", () => {
    render(<InnerTestingComponent />);
    expect(screen.getByTestId("selected-breed")).toBeEmptyDOMElement();
    userEvent.click(screen.getAllByTestId("breed-button")[0]);
    expect(screen.getByTestId("selected-breed")).toHaveTextContent("pug");
  });
});
