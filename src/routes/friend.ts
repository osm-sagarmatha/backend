import friendControllers from "~/controllers/friend";

import { Router } from "express";
import { check } from "express-validator";

const router = Router();

router.post(
  "/",
  [check("userId").notEmpty().withMessage("User id cannot be empty")],
  friendControllers.addFriend
);

router.post(
  "/accept",
  [check("friendId").notEmpty().withMessage("Friend id cannot be empty")],
  friendControllers.acceptFriend
);

// router.delete("/", friendControllers.removeFriend);

export default router;
