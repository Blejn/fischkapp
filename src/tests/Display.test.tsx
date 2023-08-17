import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import App from "../App";

const server = setupServer(
  rest.get(
    "https://training.nerdbord.io/api/v1/fischkapp/flashcards",
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json([
          { _id: "1234", front: "front", back: "back" },
          { _id: "1435", front: "front", back: "back" },
          { _id: "1455", front: "front", back: "back" },
        ])
      );
    }
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Flahcards displaying in the list properly", () => {
  test("displaying flashcards in list", async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.queryAllByTestId("card")).toHaveLength(3);
    });
  });
});
