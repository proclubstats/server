import { Types, ClientSession } from "mongoose";
import { IPlayerService } from "../../interfaces/player";
import { IPlayerGamePerformance } from "../../models/game";
import { IPlayer } from "../../models/player";
import { PlayerDTO, CreatePlayerDataRequest } from "@pro-clubs-manager/shared-dtos";

export class MockPlayerService implements IPlayerService {
  getFreeAgents(session?: ClientSession): Promise<PlayerDTO[]> {
    throw new Error("Method not implemented.");
  }
  startNewSeason(teamId: Types.ObjectId, leagueId: Types.ObjectId, seasonNumber: number, session: ClientSession): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getPlayerById(id: string | Types.ObjectId, session?: ClientSession): Promise<PlayerDTO> {
    throw new Error("Not implemented");
  }

  createPlayer(playerData: CreatePlayerDataRequest): Promise<PlayerDTO> {
    throw new Error("Not implemented");
  }
  deletePlayer(player: IPlayer, session: ClientSession): Promise<void> {
    throw new Error("Not implemented");
  }

  renamePlayer(id: string, newName: string): Promise<void> {
    throw new Error("Not implemented");
  }
  setPlayerImage(playerId: string, file: Express.Multer.File): Promise<string> {
    throw new Error("Not implemented");
  }

  removePlayersFromTeam(playersIds: Types.ObjectId[], session: ClientSession): Promise<void> {
    throw new Error("Not implemented");
  }

  updatePlayersGamePerformance(playersStats: IPlayerGamePerformance[], session: ClientSession): Promise<void> {
    throw new Error("Not implemented");
  }
  revertPlayersGamePerformance(playersStats: IPlayerGamePerformance[], session: ClientSession): Promise<void> {
    throw new Error("Not implemented");
  }
}
