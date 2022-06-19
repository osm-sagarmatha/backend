import mongoose from "mongoose";
import type { Document, Model } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  location: any;

  points: number;
  age: number;
  weight: number;

  medicalConditions: string[];
  interestedActivities: string[];
  friends: string[] | IUser[];
}

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        default: [0, 0],
      },
    },

    points: {
      type: Number,
      default: 0,
    },
    age: {
      type: Number,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },

    medicalConditions: {
      type: [String],
      default: [],
    },
    interestedActivities: {
      type: [String],
      default: [],
    },
    friends: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.index({ location: "2dsphere" });

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;
