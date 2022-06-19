import User from "~/models/User";
import { asyncHandler, ErrorResponse, hash } from "~/utils";

const getUserInfo = asyncHandler(async (req, res) => {
  return res.json({ success: true, user: req.user });
});

const updateUser = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;

  const user = await User.findById(userId);

  if (!user) return next(new ErrorResponse("Something went wrong", 500));

  if (req.body.name) user.name = req.body.name;
  if (req.body.email) user.email = req.body.email;
  if (req.body.password) user.password = await hash.generate(req.body.password);
  if (req.body.points) user.points = req.body.points;
  if (req.body.age) user.age = req.body.age;
  if (req.body.weight) user.weight = req.body.weight;

  if (req.body.interestedActivities)
    user.interestedActivities = req.body.interestedActivities;

  if (req.body.medicalConditions)
    user.medicalConditions = req.body.medicalConditions;

  if (req.body.location?.lat && req.body.location?.long) {
    user.location = {
      type: "Point",
      coordinates: [req.body.location.long, req.body.location.lat],
    };
  }

  await user.save();

  return res.json({ success: true, user });
});

const getUsersAroundUser = asyncHandler(async (req, res, next) => {
  const users = await User.find({
    location: {
      $near: {
        $maxDistance: 1000,
        $geometry: req.user.location,
      },
    },
  });

  return res.json({ success: true, users });
});

const getUsersAround = asyncHandler(async (req, res, next) => {
  const lat = +req.params.lat;
  const long = +req.params.long;

  const users = await User.find({
    location: {
      $near: {
        $maxDistance: 1000,
        $geometry: {
          type: "Point",
          coordinates: [long, lat],
        },
      },
    },
  });

  return res.json({ success: true, users });
});

const getFriendsAroundUser = asyncHandler(async (req, res, next) => {
  const users = await User.find({
    id: {
      $in: req.user.friends,
    },
    location: {
      $near: {
        $maxDistance: 1000,
        $geometry: req.user.location,
      },
    },
  });

  return res.json({ success: true, users });
});

export default {
  getUserInfo,
  updateUser,
  getUsersAround,
  getUsersAroundUser,
  getFriendsAroundUser,
};
