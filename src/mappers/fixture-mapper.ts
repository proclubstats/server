import { FixtureDTO, GameFixtureData } from "../../types-changeToNPM/shared-DTOs";
import { IFixture } from "../models/fixture";

export class FixtureMapper {
  static async mapToDto(fixture: IFixture): Promise<FixtureDTO> {
    if (!fixture) {
      throw new Error("fixture object is null or undefined");
    }

    const { games } = await fixture.populate<{ games: GameFixtureData[] }>({
      path: "games",
      select: "homeTeam awayTeam result status date",
      populate: [
        {
          path: "homeTeam",
          select: "id name imgUrl",
        },
        {
          path: "awayTeam",
          select: "id name imgUrl",
        },
      ],
    });

    return {
      id: fixture.id,
      round: fixture.round,
      leagueId: fixture.league._id.toString(),
      startDate: fixture.startDate,
      endDate: fixture.endDate,
      games: games.map((game) => {
        return {
          homeTeam: {
            id: game.homeTeam.id,
            name: game.homeTeam.name,
            imgUrl: game.homeTeam.imgUrl,
          },
          awayTeam: {
            id: game.awayTeam.id,
            name: game.awayTeam.name,
            imgUrl: game.awayTeam.imgUrl,
          },
          result: game.result,
          status: game.status,
          date: game.date,
        };
      }),
    };
  }

  static async mapToDtos(fixtures: IFixture[]): Promise<FixtureDTO[]> {
    return await Promise.all(fixtures.map((fixture) => this.mapToDto(fixture)));
  }
}
