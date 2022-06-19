import { Router } from "express";

import authRoutes from "./auth";
import userRoutes from "./user";

const router = Router();

router.use("/auth", authRoutes);
router.use("/user", userRoutes);

router.use((req, res) => res.status(404).json({ success: false }));

export default router;
