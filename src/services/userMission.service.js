import { isUserChallengingMission, insertUserMission, getInProgressMissionsByUserId, updateUserMissionStatus } from "../repositories/userMission.repository.js";
import { BadRequestError, InternalServerError } from "../errors/customError.js";

export const challengeMission = async (userId, missionId) => {
  const alreadyChallenging = await isUserChallengingMission(userId, missionId);
  if (alreadyChallenging) {
    throw new BadRequestError("이미 도전 중인 미션입니다.");
  }

  try {
    return await insertUserMission(userId, missionId);
  } catch (error) {
    throw new InternalServerError("미션 도전 중 오류가 발생했습니다.");
  }
};

export const getUserInProgressMissions = async (userId) => {
  try {
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
  } catch (error) {
    throw new InternalServerError("진행 중인 미션 조회 중 오류가 발생했습니다.");
  }
};

export const completeUserMission = async (userId, missionId) => {
  const updated = await updateUserMissionStatus(userId, missionId, "진행 완료");
  if (!updated) {
    throw new BadRequestError("해당 미션이 존재하지 않거나, 이미 완료된 상태일 수 있습니다.");
  }
  return updated;
};
