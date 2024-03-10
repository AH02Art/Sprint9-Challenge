import React from "react";
import AppFunctional from "./AppFunctional.js";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe(`Sanity`, function() {
  beforeEach(function() { return render(<AppFunctional />) });
  test(`Test #1: "left" button is rendered onto the screen`, function() {
    expect(screen.getByText("LEFT")).toBeVisible();
  });
  test(`Test #2: "up" button is rendered onto the screen`, function() {
    expect(screen.getByText("UP")).toBeVisible();
  });
  test(`Test #3: "down" button is rendered onto the screen`, function() {
    expect(screen.getByText("DOWN")).toBeVisible();
  });
  test(`Test #4: "right" button is rendered onto the screen`, function() {
    expect(screen.getByText("RIGHT")).toBeVisible();
  });
  test(`Test #5: "reset" button is rendered onto the screen`, function() {
    expect(screen.getByText("reset")).toBeVisible();
  });
  test(`Test #6: "type email" placeholder text is rendered onto the screen`, function() {
    expect(screen.getByPlaceholderText("type email")).toBeVisible();
  });
});

