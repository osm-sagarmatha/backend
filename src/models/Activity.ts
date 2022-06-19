import mongoose from "mongoose";
import type { Document, Model } from "mongoose";

export interface IActivity extends Document {
  name: string;
  startDate: string;
  endDate: string;
  progress: string;
}

const activitySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
  },
  name: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  progress: {
    type: String,
    default: `Walked 0km`,
  },
  endDate: Date,
});

const Activity: Model<IActivity> = mongoose.model<IActivity>(
  "Activity",
  activitySchema
);

export default Activity;
