import { startOfDay, endOfDay } from "date-fns";

import Activity from "~/models/Activity";
import { asyncHandler, ErrorResponse } from "~/utils";

const createActivity = asyncHandler(async (req, res) => {
  const { name, startDate } = req.body;

  const activity = await Activity.create({
    name,
    startDate,
    user: req.user.id,
  });

  return res.status(201).json({ success: true, activity });
});

const updateActivity = asyncHandler(async (req, res, next) => {
  const activity = await Activity.findById(req.params.id);

  if (!activity)
    return next(
      new ErrorResponse(`Activity id ${req.params.id} not found`, 404)
    );

  if (req.body.name) activity.name = req.body.name;
  if (req.body.endDate) activity.endDate = req.body.endDate;
  if (req.body.progress) activity.progress = req.body.progress;

  await activity.save();

  return res.json({ success: true, activity });
});

const getActivitiesByUser = asyncHandler(async (req, res, next) => {
  let userId = req.user.id;

  if (typeof req.query.userId === "string") userId = req.query.userId;

  const activity = await Activity.find({ user: userId });

  return res.json({ success: true, activity });
});

const getActivitiesByUserOnDate = asyncHandler(async (req, res, next) => {
  const date = +req.params.date;

  let userId = req.user.id;

  if (typeof req.query.userId === "string") userId = req.query.userId;

  const activity = await Activity.find({
    user: userId,
    $or: [
      {
        startDate: {
          $gt: startOfDay(new Date(date)),
          $lt: endOfDay(new Date(date)),
        },
      },
      {
        endDate: {
          $gt: startOfDay(new Date(date)),
          $lt: endOfDay(new Date(date)),
        },
      },
    ],
  });

  return res.json({ success: true, activity });
});

export default {
  createActivity,
  updateActivity,
  getActivitiesByUser,
  getActivitiesByUserOnDate,
};
