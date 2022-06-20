import Friend from "~/models/Friend";
import { asyncHandler, ErrorResponse } from "~/utils";

const addFriend = asyncHandler(async (req, res, next) => {
  const from = req.user.id;
  const to = req.body.userId;
  const friend = await Friend.create({ from, to });

  return res.json({ success: true, friend });
});

// const removeFriend = asyncHandler(async (req, res, next) => {
//   await Friend.deleteOne({
//     $or: [
//       { from: req.body.userId, to: req.user.id },
//       {
//         to: req.user.id,
//         from: req.body.userId,
//       },
//     ],
//   });

//   return res.json({ success: true });
// });

const acceptFriend = asyncHandler(async (req, res, next) => {
  const friend = await Friend.findOne({
    from: req.body.userId,
    to: req.user.id,
  });

  if (!friend) return next(new ErrorResponse("Friend request not found", 404));

  friend.accepted = true;

  await friend.save();

  return res.json({ success: true, friend });
});

export default {
  addFriend,

  // removeFriend,

  acceptFriend,
};
