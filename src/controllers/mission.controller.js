import { StatusCodes } from "http-status-codes";
import { bodyToMission } from "../dtos/mission.dto.js";
import { createMission } from "../services/mission.service.js";
import { BadRequestError } from "../errors/customError.js";

export const handleAddMission = async (req, res, next) => {
  try {
    const storeId = parseInt(req.params.storeId, 10);
    if (isNaN(storeId)) {
      throw new BadRequestError("유효하지 않은 가게 Id입니다.");
    }

    const missionData = bodyToMission(req.body, storeId);
    const missionId = await createMission(missionData);

    res.status(StatusCodes.CREATED).json({
      message: "미션이 성공적으로 추가되었습니다.",
      missionId,
    });
  } catch (error) {
    next(error);
  }
};
