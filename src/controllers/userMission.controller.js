import { StatusCodes } from "http-status-codes";
import {
  challengeMission,
  getUserInProgressMissions,
  completeUserMission
} from "../services/userMission.service.js";
import { BadRequestError, InternalServerError } from "../errors/customError.js";

export const handleChallengeMission = async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const missionId = parseInt(req.params.missionId, 10);

    if (isNaN(userId) || isNaN(missionId)) {
      throw new BadRequestError("유효하지 않은 userId 또는 missionId입니다.");
    }

    const userMissionId = await challengeMission(userId, missionId);

    res.status(StatusCodes.CREATED).json({
      message: "미션 도전이 완료되었습니다.",
      userMissionId,
    });
  } catch (error) {
    next(error);
  }
};

export const handleGetInProgressMissions = async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId);
    const result = await getUserInProgressMissions(userId);
    res.status(StatusCodes.OK).json(result);
  } catch (err) {
    next(err);
  }
};

export const completeUserMissionController = async (req, res, next) => {
  try {
    const { userId, missionId } = req.params;
    const result = await completeUserMission(Number(userId), Number(missionId));

    res.status(StatusCodes.OK).json({
      message: "미션 상태가 '진행 완료'로 변경되었습니다.",
    });
  } catch (err) {
    next(err);
  }
};
