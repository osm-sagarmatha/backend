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

    notEmpty("sex", "Sex cannot be empty"),

    shouldBeArray("interestedActivities"),
    shouldBeArray("medicalConditions"),

    shouldBeNumber("points"),
    shouldBeNumber("age"),
    shouldBeNumber("weight"),
  ],
  userControllers.updateUser
);

router.get("/around", userControllers.getUsersAroundUser);
router.get("/around/:lat/:long", userControllers.getUsersAround);
router.get("/around/friends", userControllers.getFriendsAroundUser);

function notEmpty(name: string, message: string) {
  return check(name).optional().trim().notEmpty().withMessage(message);
}

function shouldBeNumber(name: string) {
  return check(name)
    .optional()
    .isNumeric()
    .withMessage(`${name} should be a number`);
}

function shouldBeArray(name: string) {
  return check(name)
    .optional()
    .isArray()
    .withMessage(`${name} should be array`);
}

export default router;
