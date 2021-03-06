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
  sex: string;

  medicalConditions: string[];
  interestedActivities: string[];
  achievements: string[];
  friends: string[];
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
    sex: {
      type: String,
      required: true,
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
    achievements: {
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
