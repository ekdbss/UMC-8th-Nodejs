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

// 진행 중인 나의 미션 조회
export const getInProgressMissionsByUserId = async (userId) => {
  return await prisma.userMission.findMany({
    where: {
      userId: Number(userId),
      status: "진행 중",
    },
    select: {
      id: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      mission: {
        select: {
          id: true,
          name: true,
          deadline: true,
          reward: true,
          criterion: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

// 내가 진행 중인 미션을 진행 완료로 변경
export const updateUserMissionStatus = async (userId, missionId, newStatus) => {
  const result = await prisma.userMission.updateMany({
    where: {
      userId,
      missionId,
      status: "진행 중",
    },
    data: {
      status: newStatus,
    },
  });

  return result.count > 0;
};