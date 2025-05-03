import { StatusCodes } from "http-status-codes";
import { challengeMission } from "../services/userMission.service.js";

export const handleChallengeMission = async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const missionId = parseInt(req.params.missionId, 10);

    const userMissionId = await challengeMission(userId, missionId);

    res.status(StatusCodes.CREATED).json({
      message: "미션 도전이 완료되었습니다.",
      userMissionId,
    });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: error.message || "미션 도전 중 오류가 발생했습니다.",
    });
  }
};
