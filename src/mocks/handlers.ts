import { rest } from "msw";

export const handlers = [
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
  ),
];
