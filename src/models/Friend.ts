import mongoose from "mongoose";
import type { Document, Model } from "mongoose";

export interface IFriend extends Document {
  from: string;
  to: string;
  accepted: boolean;
}

const friendSchema = new mongoose.Schema({
  from: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  accepted: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const Friend: Model<IFriend> = mongoose.model<IFriend>("Friend", friendSchema);

export default Friend;
