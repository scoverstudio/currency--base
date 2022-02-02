import { cleanup, render, screen } from "@testing-library/react";
import ResultBox from "./ResultBox";
import "@testing-library/jest-dom/extend-expect";

describe("Component ResultBox", () => {
  it("should render without crashing", () => {
    render(<ResultBox from="PLN" to="USD" amount={100} />);
  });
  it("should render proper info about conversion when PLN -> USD", () => {
    const testCases = [
      { amount: 100, expected: "PLN 100.00 = $28.57" },
      { amount: 20, expected: "PLN 20.00 = $5.71" },
      { amount: 200, expected: "PLN 200.00 = $57.14" },
      { amount: 340, expected: "PLN 340.00 = $97.14" },
    ];

    for (const testObj of testCases) {
      render(<ResultBox from="PLN" to="USD" amount={testObj.amount} />);
      const output = screen.getByTestId("output");
      expect(output).toHaveTextContent(testObj.expected);

      cleanup();
    }
  });
  it("should render proper info about conversion when USD -> PLN", () => {
    const testCases = [
      { amount: 100, expected: "$100.00 = PLN 350.00" },
      { amount: 20, expected: "$20.00 = PLN 70.00" },
      { amount: 200, expected: "$200.00 = PLN 700.00" },
      { amount: 340, expected: "$340.00 = PLN 1,190.00" },
    ];

    for (const testObj of testCases) {
      render(<ResultBox from="USD" to="PLN" amount={testObj.amount} />);
      const output = screen.getByTestId("output");
      expect(output).toHaveTextContent(testObj.expected);

      cleanup();
    }
  });
  it("should render proper info about conversion when PLN -> PLN", () => {
    render(<ResultBox from="PLN" to="PLN" amount={100} />);
    const output = screen.getByTestId("output");
    expect(output).toHaveTextContent("You can't transfer same currency!");
  });
  it("should render proper info about conversion when USD -> USD", () => {
    render(<ResultBox from="USD" to="USD" amount={100} />);
    const output = screen.getByTestId("output");
    expect(output).toHaveTextContent("You can't transfer same currency!");
  });
  it("should show 'error' when input is negative value", () => {
    render(<ResultBox from="PLN" to="USD" amount={-100} />);
    const output = screen.getByTestId("output");
    expect(output).toHaveTextContent("Wrong value...");
  });
});
