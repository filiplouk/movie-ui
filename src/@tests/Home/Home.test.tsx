import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "@/app/Home/Home";

describe("Testing Home Page", () => {
  let container: any;
  container = beforeEach(() => {
    render(<Home />).container;
  });

  test("Test movies loading", () => {
    const moviesList = container.getElementById("movies-list");
  });

  test("Test movies load more", () => {});

  test("Test movies searching", () => {});
});
