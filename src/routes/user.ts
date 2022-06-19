import { Router } from "express";
import { check } from "express-validator";

import userControllers from "~/controllers/user";

const router = Router();

router.get("/", userControllers.getUserInfo);

router.patch(
  "/",
  [
    notEmpty("password", "Password cannot be empty")
      .isLength({ min: 4 })
      .withMessage("Password should be of more than 4 characters"),
    notEmpty("name", "Name cannot be empty"),
    notEmpty("email", "Email cannot be empty")
      .isEmail()
      .withMessage("Provided email is not a valid email"),
    check("activities")
      .optional()
      .isArray()
      .withMessage("Activities should be array"),
    check("medicalConditions")
      .optional()
      .isArray()
      .withMessage("Medical Conditions should be array"),
  ],
  userControllers.updateUser
);

router.get("/around", userControllers.getUsersAroundUser);
router.get("/around/:lat/:long", userControllers.getUsersAround);
router.get("/around/friends", userControllers.getFriendsAroundUser);

function notEmpty(name: string, message: string) {
  return check(name).optional().trim().notEmpty().withMessage(message);
}

export default router;
