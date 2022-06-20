import Message from "~/models/Message";
import { asyncHandler, socketio } from "~/utils";

const createMessage = asyncHandler(async (req, res, next) => {
  const from = req.user.id;
  const to = req.body.to;
  const message = req.body.message;

  const msg = await Message.create({ from, to, message });

  socketio.getIo().to(to).emit("new-message", { from, to, message });

  return res.json({ success: true, message: msg });
});

const getMessagesFromToUser = asyncHandler(async (req, res, next) => {
  const messages = await Message.find({
    $or: [
      {
        from: req.user.id,
      },
      {
        to: req.user.id,
      },
    ],
  });

  return res.json({ success: true, messages });
});

export default { createMessage, getMessagesFromToUser };
