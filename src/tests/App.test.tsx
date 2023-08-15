import { rest } from "msw";
import { setupServer } from "msw/node";
import { addFishCard } from "../services/ApiService";

const server = setupServer(
  rest.post(
    "https://training.nerdbord.io/api/v1/fischkapp/flashcards",
    (req, res, ctx) => {
      const { front, back } = req.body as { front: string; back: string };
      if (front && back) {
        return res(
          ctx.status(201),
          ctx.json({ message: "Card added successfully" })
        );
      } else {
        return res(
          ctx.status(400),
          ctx.json({ error: "Front and back are required" })
        );
      }
    }
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("addFishCard", () => {
  it("adds a fish card to the server", async () => {
    const front = "Test Front";
    const back = "Test Back";

    const response = await addFishCard(front, back);

    await expect(response).toEqual({ message: "Card added successfully" });
  });

  it("handles missing front and back", async () => {
    const front = "";
    const back = "";

    await expect(addFishCard(front, back)).rejects.toThrow(
      "Front and back are required"
    );
  });

  it("handles missing front", async () => {
    const front = "";
    const back = "back";
    await expect(addFishCard(front, back)).rejects.toThrow("Front is required");
  });
  it("handles missing front", async () => {
    const front = "front";
    const back = "";
    await expect(addFishCard(front, back)).rejects.toThrow("Back is required");
  });
});
