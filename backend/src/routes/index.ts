import { Router } from "express";

const router = Router();

router.get(
  "/",
  async (req, res, next) => {
    res.send("Success!").status(200);
  }
);

export default router;
