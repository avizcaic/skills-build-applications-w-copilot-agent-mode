import { Schema, model } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    team: { type: String, required: true },
    rank: { type: Number, required: true },
    points: { type: Number, required: true },
    activeMinutes: { type: Number, required: true },
  },
  { timestamps: true },
);

export default model('Leaderboard', leaderboardSchema);