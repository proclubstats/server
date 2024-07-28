import { ClientSession, Types } from "mongoose";
import { IFixtureService } from "../../interfaces/fixture";
import { AddFixtureData, IFixture } from "../../models/fixture";
import { FixtureDTO, GameDTO, PaginatedFixtureDTO } from "@pro-clubs-manager/shared-dtos";

export class MockFixtureService implements IFixtureService {
  getFixtureById(id: string): Promise<FixtureDTO> {
    throw new Error("Method not implemented.");
  }
  getPaginatedLeagueFixturesGames(leagueId: string, page: number, pageSize: number): Promise<PaginatedFixtureDTO> {
    throw new Error("Method not implemented.");
  }
  generateFixture(fixtureData: AddFixtureData, session: ClientSession): Promise<IFixture> {
    throw new Error("Method not implemented.");
  }
  getLeagueFixtureGames(leagueId: string, round: number): Promise<GameDTO[]> {
    throw new Error("Method not implemented.");
  }
  deleteFixtures(fixturesIds: Types.ObjectId[], session: ClientSession): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
