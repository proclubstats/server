import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { IFixtureController, IFixtureService } from "../interfaces/fixture";

@injectable()
export default class FixtureController implements IFixtureController {
  private fixtureService: IFixtureService;

  constructor(@inject("IFixtureService") fixtureService: IFixtureService) {
    this.fixtureService = fixtureService;
  }

  async getFixtureById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    try {
      const fixture = await this.fixtureService.getFixtureById(id);
      res.json(fixture);
    } catch (error: any) {
      next(error);
    }
  }

  async getPaginatedLeagueFixturesGames(req: Request, res: Response, next: NextFunction) {
    const { leagueId } = req.params;
    const { page = 1, pageSize = 1 } = req.query;

    console.log(req.query, pageSize);

    try {
      const games = await this.fixtureService.getPaginatedLeagueFixturesGames(leagueId, +page, +pageSize);
      res.json(games); // TODO: change to specific type of
    } catch (error: any) {
      next(error);
    }
  }

  async getLeagueFixtureGames(req: Request, res: Response, next: NextFunction) {
    const { leagueId, round } = req.params;

    if (!leagueId || !round) {
      res.status(400).send({ message: "No leagueId or round provided" });
      return;
    }

    try {
      const fixtureGames = await this.fixtureService.getLeagueFixtureGames(leagueId, +round);
      res.json(fixtureGames);
    } catch (error: any) {
      next(error);
    }
  }

  async deleteAllLeagueFixtures(req: Request, res: Response, next: NextFunction) {}
}
