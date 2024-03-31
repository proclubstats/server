export interface PlayerDTO {
  id: string;
  team: {
    id: string;
    name: string;
    imgUrl: string;
  };
  name: string;
  age: number;
  imgUrl?: string;
  position: string;
  phone?: string;
  email?: string;
  playablePositions: string[];
  stats: {
    games: number;
    goals: number;
    cleanSheets: number;
    assists: number;
    playerOfTheMatch: number;
  };
}

export interface TeamDTO {
  id: string;
  name: string;
  leagueId: string;
  imgUrl?: string;
  captain: {
    id: string;
    name: string;
  } | null;
  players: {
    id: string;
    name: string;
    imgUrl?: string;
    position: string;
  }[];
  stats: {
    games: number;
    wins: number;
    losses: number;
    draws: number;
    goalsScored: number;
    goalsConceded: number;
  };
}

export interface LeagueTableRow {
  teamId: string;
  teamName: string;
  gamesPlayed: number;
  gamesWon: number;
  gamesLost: number;
  draws: number;
  goalDifference: number;
  points: number;
  goalsConceded: number;
  goalsScored: number;
  cleanSheets: number;
}

export type AddPlayerDataRequest = {
  name: string;
  phone?: string;
  imgUrl?: string;
  age: number;
  teamId: string;
  position: string;
  playablePositions: string[];
};