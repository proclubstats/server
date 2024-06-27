import mongoose, { Schema, Document } from "mongoose";
import { IPlayer } from "./player";

export type TeamWithPlayers = {
  id: string;
  name: string;
  league: mongoose.Types.ObjectId;
  imgUrl?: string;
  players: IPlayer[];
  captain: mongoose.Types.ObjectId;
};

export interface ITeamStats {
  wins: number;
  losses: number;
  draws: number;
  goalsScored: number;
  goalsConceded: number;
  cleanSheets: number;
}

export interface ITeamSeason {
  seasonNumber: number;
  league: mongoose.Types.ObjectId;
  stats: ITeamStats;
}

export interface ITeam extends Document {
  id: string;
  name: string;
  imgUrl?: string;
  league?: mongoose.Types.ObjectId;
  players: mongoose.Types.ObjectId[];
  captain: mongoose.Types.ObjectId;
  seasons: ITeamSeason[];
  stats: ITeamStats | undefined;
}

const teamStatsSchema = new Schema<ITeamStats>({
  wins: { type: Number, default: 0 },
  losses: { type: Number, default: 0 },
  draws: { type: Number, default: 0 },
  goalsScored: { type: Number, default: 0 },
  goalsConceded: { type: Number, default: 0 },
  cleanSheets: { type: Number, default: 0 },
});

const teamSeasonSchema = new Schema<ITeamSeason>({
  seasonNumber: { type: Number, required: true },
  league: { type: mongoose.Schema.Types.ObjectId, ref: "League" },
  stats: teamStatsSchema,
});

const teamSchema: Schema<ITeam> = new Schema<ITeam>(
  {
    name: { type: String, required: true, unique: true },
    imgUrl: { type: String },
    league: { type: mongoose.Schema.Types.ObjectId, ref: "League" },
    players: [{ type: mongoose.Schema.Types.ObjectId, ref: "Player" }],
    captain: { type: mongoose.Schema.Types.ObjectId, ref: "Player" },
    seasons: [teamSeasonSchema],
  },
  {
    toJSON: { virtuals: true },
    id: true, // Use 'id' instead of '_id'
  }
);

const Team = mongoose.model<ITeam>("Team", teamSchema);

export default Team;
