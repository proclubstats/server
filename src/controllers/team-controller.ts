import { NextFunction, Request, Response } from "express";
import TeamService from "../services/team-service";

class TeamController {
  private teamService: TeamService;
  private static instance: TeamController;

  private constructor() {
    this.teamService = TeamService.getInstance();
  }

  static getInstance(): TeamController {
    if (!this.instance) {
      this.instance = new TeamController();
    }
    return this.instance;
  }

  async createAndAddTeamToLeague(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { name, logoUrl, leagueId } = req.body;

    try {
      const team = await this.teamService.createAndAddTeamToLeague(name, leagueId, logoUrl);
      res.json(team);
    } catch (error: any) {
      next(error);
    }
  }
  async deleteTeam(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id: teamId } = req.params;
    try {
      await this.teamService.deleteTeam(teamId);
      res.sendStatus(204);
    } catch (error: any) {
      next(error);
    }
  }

  async getTeamPlayers(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id: teamId } = req.params;

    if (!teamId) {
      res.status(400).send({ message: "No teamId provided" });
      return;
    }

    try {
      const team = await this.teamService.getTeamPlayers(teamId);
      res.json(team);
    } catch (error: any) {
      next(error);
    }
  }

  async getTeamById(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id: teamId } = req.params;

    if (!teamId) {
      res.status(400).send({ message: "No teamId provided" });
      return;
    }

    try {
      const team = await this.teamService.getTeamById(teamId);
      res.json(team);
    } catch (error: any) {
      next(error);
    }
  }

  async setTeamCaptain(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id: teamId } = req.params;
    const { captainId } = req.body;

    try {
      await this.teamService.setTeamCaptain(teamId, captainId);
      res.sendStatus(204);
    } catch (error: any) {
      next(error);
    }
  }
}

export default TeamController;