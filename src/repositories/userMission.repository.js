import { prisma } from "../db.config.js";

// 사용자가 해당 미션을 이미 도전 중인지 확인
export const isUserChallengingMission = async (userId, missionId) => {
  const mission = await prisma.userMission.findFirst({
    where: {
      userId,
      missionId,
      status: "도전중",
    },
  });

  return !!mission;
};

// 도전 중인 미션 추가
export const insertUserMission = async (userId, missionId) => {
  const newUserMission = await prisma.userMission.create({
    data: {
      userId,
      missionId,
      status: "도전중",
    },
  });

  return newUserMission.id;
};

