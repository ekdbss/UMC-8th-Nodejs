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

/*
import { pool } from "../db.config.js";

export const isUserChallengingMission = async (userId, missionId) => {
  const [rows] = await pool.query(
    "SELECT * FROM user_mission WHERE user_id = ? AND mission_id = ?",
    [userId, missionId]
  );
  return rows.length > 0;
};

export const insertUserMission = async (userId, missionId) => {
  const [result] = await pool.query(
    "INSERT INTO user_mission (user_id, mission_id, status) VALUES (?, ?, ?)",
    [userId, missionId, "도전중"]
  );
  return result.insertId;
};
*/