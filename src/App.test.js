import { render, screen } from "@testing-library/react";
import App from "./App";

describe("<App />", () => {
 
  test("check if map is availbale in app component", () => {
    render(<App />);
    expect(screen.queryByTestId ("map")).toBeDefined()
  });

  test("check if slider component is availbale in app component", () => {
    render(<App />);
    expect(screen.queryByTestId ("slider")).toBeDefined()
  });

  test("check if bookingform component is availbale in app component", () => {
    render(<App />);
    expect(screen.queryByTestId ("bookingform")).toBeDefined()
  });

});
