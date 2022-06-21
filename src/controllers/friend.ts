import User from "~/models/User";
import Friend from "~/models/Friend";
import { asyncHandler, ErrorResponse } from "~/utils";

const addFriend = asyncHandler(async (req, res, next) => {
  const from = req.user.id;
  const to = req.body.userId;

  if (!(await User.findById(to)))
    return next(new ErrorResponse(`User Id not found`, 404));

  const exists = await Friend.findOne({
    $or: [
      {
        from: req.body.userId,
        to: req.user.id,
      },
      {
        to: req.body.userId,
        from: req.user.id,
      },
    ],
  });

  if (exists) {
    if (!exists.accepted) {
      return next(new ErrorResponse("Friend request already exists", 409));
    }

    return next(new ErrorResponse("Friend already exists", 409));
  }

  const friend = await Friend.create({ from, to });

  return res.json({ success: true, friend });
});

const acceptFriend = asyncHandler(async (req, res, next) => {
  const friend = await Friend.findById(req.body.friendId);

  if (!friend) return next(new ErrorResponse("Friend request not found", 404));

  if (friend.to.toString() !== req.user.id)
    return next(new ErrorResponse("Not authorized to do this", 401));

  const from = await User.findById(friend.from);
  const to = await User.findById(friend.to);

  if (!from || !to)
    return next(new ErrorResponse("Friend request not found", 404));

  from.friends.push(to.id);
  to.friends.push(from.id);

  friend.accepted = true;

  await from.save();
  await to.save();
  await friend.save();

  return res.json({ success: true, friend });
});

export default {
  addFriend,

  // removeFriend,

  acceptFriend,
};

/*






*/

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
