import { prisma } from "../db.config.js";

// 가게에 미션 추가
export const addMission = async (missionData) => {
  try {
    // storeId가 store 테이블에 존재하는지 확인
    const storeExists = await prisma.store.findUnique({
      where: { id: missionData.storeId },
    });

    if (!storeExists) {
      throw new Error(`storeId ${missionData.storeId}가 존재하지 않습니다.`);
    }

    // 미션 추가
    const mission = await prisma.mission.create({
      data: {
        storeId: missionData.storeId,
        name: missionData.name,
        deadline: missionData.deadline,
        criterion: missionData.criterion,
        reward: missionData.reward,
      },
    });

    return mission.id; // 생성된 미션 ID 반환
  } catch (err) {
    throw new Error(`미션 추가 중 오류 발생: ${err.message}`);
  }
};