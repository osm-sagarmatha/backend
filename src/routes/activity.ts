import { Router } from "express";
import { check } from "express-validator";

import activityControllers from "~/controllers/activity";

const router = Router();

router.post(
  "/",
  [notEmpty("name"), notEmpty("startDate")],
  activityControllers.createActivity
);

router.patch(
  "/:id",
  [
    notEmpty("name", true),
    notEmpty("endDate", true),
    notEmpty("progress", true),
  ],
  activityControllers.updateActivity
);

router.get("/user", activityControllers.getActivitiesByUser);
router.get("/:date/user", activityControllers.getActivitiesByUserOnDate);

function notEmpty(name: string, optional = false) {
  let mw = check(name);

  if (optional) mw = mw.optional();

  return mw.trim().notEmpty().withMessage(`${name} cannot be empty`);
}

export default router;
