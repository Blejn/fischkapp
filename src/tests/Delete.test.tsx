import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
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
  ),
  rest.delete(
    "https://training.nerdbord.io/api/v1/fischkapp/flashcards/:id",
    (req, res, ctx) => {
      const mockCards = [
        { _id: "1234", front: "front", back: "back" },
        { _id: "1435", front: "front", back: "back" },
        { _id: "1455", front: "front", back: "back" },
      ];
      const { id } = req.params;
      const filteredCards = mockCards.filter(card => card._id !== id);

      return res(ctx.status(200), ctx.json(filteredCards));
    }
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Card integration tests", () => {
  test("deleting card from list", async () => {
    render(<App />);

    await waitFor(() => {
      const editButton = screen.getAllByTestId("edit-button")[0];
      fireEvent.click(editButton);
    });

    await waitFor(() => {
      const deleteButton = screen.getAllByTestId("delete-button")[0];

      fireEvent.click(deleteButton);
    });

    await waitFor(() => {
      expect(screen.queryAllByTestId("card")).toHaveLength(2);
    });
  });
});
