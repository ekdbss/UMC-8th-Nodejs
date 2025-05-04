import { isUserChallengingMission, insertUserMission, getInProgressMissionsByUserId, updateUserMissionStatus } from "../repositories/userMission.repository.js";

export const challengeMission = async (userId, missionId) => {
  const alreadyChallenging = await isUserChallengingMission(userId, missionId);
  if (alreadyChallenging) {
    throw new Error("이미 도전 중인 미션입니다.");
  }
  return await insertUserMission(userId, missionId);
};

export const getUserInProgressMissions = async (userId) => {
  const missions = await getInProgressMissionsByUserId(userId);

  return missions.map((m) => ({
    userMissionId: m.id,
    status: m.status,
    startedAt: m.createdAt,
    updatedAt: m.updatedAt,
    mission: {
      id: m.mission.id,
      name: m.mission.name,
      deadline: m.mission.deadline,
      reward: m.mission.reward,
      criterion: m.mission.criterion,
    },
  }));
};


export const completeUserMission = async (userId, missionId) => {
  const updated = await updateUserMissionStatus(userId, missionId, "진행 완료");
  if (!updated) {
    throw new Error("해당 미션이 존재하지 않거나, 이미 완료된 상태일 수 있습니다.");
  }
  return updated;
};
