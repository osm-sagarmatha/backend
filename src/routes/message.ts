import { Router } from "express";
import { check } from "express-validator";

import messageControllers from "~/controllers/message";

const router = Router();

router.post(
  "/",
  [
    check("message").notEmpty().withMessage("Message cannot be empty"),
    check("to").notEmpty().withMessage("To user cannot be empty"),
  ],
  messageControllers.createMessage
);

router.get("/", messageControllers.getMessagesFromToUser);

export default router;
