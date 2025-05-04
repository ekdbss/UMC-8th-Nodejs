import { StatusCodes } from "http-status-codes";
import { bodyToMission } from "../dtos/mission.dto.js";
import { createMission } from "../services/mission.service.js";

export const handleAddMission = async (req, res, next) => {
  try {
    const storeId = parseInt(req.params.storeId, 10);
    const missionData = bodyToMission(req.body, storeId); // storeId와 함께 미션 데이터 변환

    const missionId = await createMission(missionData);

    res.status(StatusCodes.CREATED).json({
      message: "미션이 성공적으로 추가되었습니다.",
      missionId,
    });
  } catch (error) {
    next(error);
  }
};
