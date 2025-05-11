import { prisma } from "../db.config.js";

// 리뷰 작성
export const insertReview = async ({ userId, storeId, rating, content }) => {
  try {
    const review = await prisma.userStoreReview.create({
      data: {
        userId,
        storeId,
        rating,
        content,
      },
    });
    
    return review.id;
  } catch (error) {
    throw new Error(`리뷰 저장 중 오류 발생: ${error.message}`);
  }
};

// 가게 존재 확인 함수
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

//리뷰 조회
export const getReviewsByUserId = async (userId) => {
  const reviews = await prisma.userStoreReview.findMany({
    where: { userId },
    orderBy: { id: "desc" },
    select: {
      id: true,
      content: true,
      user: {
        select: { name: true },
      },
      store: {
        select: { name: true },
      },
    },
  });

  return reviews;
};
