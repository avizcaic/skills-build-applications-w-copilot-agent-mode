import { Schema, model } from 'mongoose';

const activitySchema = new Schema(
  {
    username: { type: String, required: true },
    team: { type: String, required: true },
    activityType: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    completedAt: { type: Date, required: true },
  },
  { timestamps: true },
);

export default model('Activity', activitySchema);