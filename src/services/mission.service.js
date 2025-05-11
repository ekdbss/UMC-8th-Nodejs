import { addMission } from "../repositories/mission.repository.js";
import { InternalServerError } from "../errors/customError.js";

export const createMission = async (missionData) => {
  try {
    const missionId = await addMission(missionData);
    return missionId;
  } catch (error) {
    throw new InternalServerError("미션 추가 중 오류가 발생했습니다.");
  }
};
