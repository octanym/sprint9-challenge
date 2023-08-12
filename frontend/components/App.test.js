import React from "react";
import * as rtl from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AppFunctional from "./AppFunctional";

// Using `codegrade_mvp.test.js` as inspiration, write 5 tests
// Test that the visible texts in headings, buttons, links... render on the screen.
// Test that typing on the input results in its value changing to the entered text.
// Write your tests here

test("AppFunctional renders without errors", () => {
  rtl.render(<AppFunctional />);
});

test("text content of all h3 tags render on the screen", () => {
  //Arrange
  rtl.render(<AppFunctional />);

  const h3Tags = rtl.screen.queryAllByRole("h3");

  //Assert
  h3Tags.forEach((h3) => {
    expect(h3).toBeInTheDocument();
    expect(h3.textContent).toBeTruthy();
  });
});

test("text content of the left button renders on the screen", () => {
  //Arrange
  rtl.render(<AppFunctional />);

  const leftButtonTag = rtl.screen.queryByText("LEFT");

  //Assert
  expect(leftButtonTag).toBeInTheDocument();
  expect(leftButtonTag.textContent).toBeTruthy();
});

test("text content of the up button renders on the screen", () => {
  //Arrange
  rtl.render(<AppFunctional />);

  const upButtonTag = rtl.screen.queryByText("UP");

  //Assert
  expect(upButtonTag).toBeInTheDocument();
  expect(upButtonTag.textContent).toBeTruthy();
});

test("text content of the right button renders on the screen", () => {
  //Arrange
  rtl.render(<AppFunctional />);

  const rightButtonTag = rtl.screen.queryByText("RIGHT");

  //Assert
  expect(rightButtonTag).toBeInTheDocument();
  expect(rightButtonTag.textContent).toBeTruthy();
});

test("text content of the down button renders on the screen", () => {
  //Arrange
  rtl.render(<AppFunctional />);

  const downButtonTag = rtl.screen.queryByText("DOWN");

  //Assert
  expect(downButtonTag).toBeInTheDocument();
  expect(downButtonTag.textContent).toBeTruthy();
});

test("typing on the input sets its value to the entered text", () => {
  //Arrange
  rtl.render(<AppFunctional />);

  const emailField = rtl.screen.getByPlaceholderText(/type email/i);

  //Act
  rtl.fireEvent.change(emailField, { target: { value: "cjmoore@email.com" } });

  //Assert
  rtl.waitFor(() => {
    const emailDisplay = screen.getByDisplayValue(/cjmoore@email.com/i);

    expect(emailDisplay).toBe(emailField);
  });
});
