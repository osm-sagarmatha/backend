import mongoose from "mongoose";
import type { Document, Model } from "mongoose";

export interface IMessage extends Document {
  from: string;
  to: string;
  message: string;

  //   TODO: seen feature if (fontend completed)
  //   seen: boolean;
}

const messageSchema = new mongoose.Schema(
  {
    from: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Message: Model<IMessage> = mongoose.model<IMessage>(
  "Message",
  messageSchema
);

export default Message;
