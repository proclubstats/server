import { PlayerDTO } from "../../types-changeToNPM/shared-DTOs";
import { IPlayer } from "../models/player";
import { ITeam } from "../models/team";

export class PlayerMapper {
  static async mapToDto(player: IPlayer): Promise<PlayerDTO> {
    if (!player) {
      throw new Error("Player object is null or undefined");
    }

    console.log(`Map to ${player.name}`);

    const { team } = await player.populate<{ team: ITeam }>({ path: "team", select: "id name imgUrl" });

    return {
      id: player.id,
      name: player.name,
      age: player.age,
      position: player.position,
      playablePositions: player.playablePositions,
      stats: {
        games: player.stats.games,
        goals: player.stats.goals,
        cleanSheets: player.stats.cleanSheets,
        assists: player.stats.assists,
        playerOfTheMatch: player.stats.playerOfTheMatch,
      },
      team: {
        id: team.id,
        name: team.name,
        imgUrl: team.imgUrl,
      },
    };
  }

  static async mapToDtos(players: IPlayer[]): Promise<PlayerDTO[]> {
    console.log("mapp");

    if (!players) {
      throw new Error("Players object is null or undefined");
    }
    return await Promise.all(players.map((player) => this.mapToDto(player)));
  }
}