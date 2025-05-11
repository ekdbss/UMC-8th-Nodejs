import { prisma } from "../db.config.js";

export const getStoreById = async (storeId) => {
  try {
    const store = await prisma.store.findUnique({
      where: { id: storeId },
    });

    return store; // 없으면 null
  } catch (err) {
    throw new Error(`가게 조회 중 오류 발생: ${err.message}`);
  }
};
