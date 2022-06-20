import { Router } from "express";

import authRoutes from "./auth";
import userRoutes from "./user";
import friendRoutes from "./friend";
import activityRoutes from "./activity";
import messageRoutes from "./message";

import checkAuth from "~/middlewares/checkAuth";

const router = Router();

router.use("/auth", authRoutes);
router.use("/user", checkAuth, userRoutes);
router.use("/activity", checkAuth, activityRoutes);
router.use("/message", checkAuth, messageRoutes);
router.use("/friend", checkAuth, friendRoutes);

router.use((_, res) =>
  res.status(404).json({ success: false, errors: [{ msg: "Not Found" }] })
);

export default router;
