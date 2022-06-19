import { Router } from "express";

import authRoutes from "./auth";
import userRoutes from "./user";
import activityRoutes from "./activity";

import checkAuth from "~/middlewares/checkAuth";

const router = Router();

router.use("/auth", authRoutes);
router.use("/user", checkAuth, userRoutes);
router.use("/activity", checkAuth, activityRoutes);

router.use((_, res) =>
  res.status(404).json({ success: false, errors: [{ msg: "Not Found" }] })
);

export default router;
