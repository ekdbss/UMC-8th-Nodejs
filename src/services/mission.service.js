import { addMission } from "../repositories/mission.repository.js";

export const createMission = async (missionData) => {
  // 미션 추가
  const missionId = await addMission(missionData);
  return missionId;
};
