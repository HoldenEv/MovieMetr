import express, { Request, Response, Router } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript Express!");
});

export default router;
