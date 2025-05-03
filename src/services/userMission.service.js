import { isUserChallengingMission, insertUserMission } from "../repositories/userMission.repository.js";

export const challengeMission = async (userId, missionId) => {
  const alreadyChallenging = await isUserChallengingMission(userId, missionId);
  if (alreadyChallenging) {
    throw new Error("이미 도전 중인 미션입니다.");
  }
  return await insertUserMission(userId, missionId);
};
