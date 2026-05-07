import mongoose from "mongoose";

const activityLogSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      required: true,
    },

    performedBy: {
      type: String,
      required: true,
    },

    targetUser: {
      type: String,
      default: "",
    },

    details: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "ActivityLog",
  activityLogSchema
);