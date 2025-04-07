/* eslint-disable @typescript-eslint/no-require-imports */
import { jest } from "@jest/globals";

describe("Main Application", () => {
  beforeEach(() => {
    // Create a mock root element in the DOM
    const root = document.createElement("div");
    root.id = "root";
    document.body.appendChild(root);
  });

  afterEach(() => {
    // Clean up the DOM after each test
    const root = document.getElementById("root");
    if (root) {
      document.body.removeChild(root);
    }
    jest.resetModules(); // Reset modules to avoid conflicts
  });

  it("renders the application without crashing", () => {
    expect(() => {
      require("./main"); // Dynamically require main.tsx to simulate execution
    }).not.toThrow();
  });
});