import { Request, Response } from "express";
import { getGrowdeversSync, saveGrowdeversSync } from "../db/growdevers";

export class GrowdeverSkillController {
  async deleteSkill(request: Request, response: Response) {
    const { id } = request.params;
    const { skill } = request.body;

    const growdeversDB = getGrowdeversSync();

    const growdever = growdeversDB.find((growdever) => growdever.id === id);

    if (!growdever) {
      return response.status(400).json({ error: "Growdever não encontrada" });
    }

    try {
      growdever.deleteSkill(skill);
      saveGrowdeversSync(growdeversDB);
    } catch (err: any) {
      return response.status(400).json({ error: err.message });
    }

    return response.status(200).json({ skills: growdever.skills });
  }

  async addSkills(request: Request, response: Response) {
    const { id } = request.params;
    const { skills } = request.body;

    const growdeversDB = getGrowdeversSync();

    const growdever = growdeversDB.find((grow) => grow.id === id);

    if (!growdever) {
      return response.status(404).json({ error: "Growdever não encontrado" });
    }

    try {
      growdever.updateSkills(skills);
      saveGrowdeversSync(growdeversDB);
    } catch (error: any) {
      return response.status(400).json({ error: error.message });
    }

    return response.json(growdever.skills);
  }
}
