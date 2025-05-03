import { insertReview } from "../repositories/review.repository.js";
import { getStoreById } from "../repositories/store.repository.js";

// 가게 존재 여부 체크
export const createReview = async (userId, storeId, data) => {
  const store = await getStoreById(storeId);
  if (!store) {
    throw new Error("존재하지 않는 가게입니다.");
  }

  const reviewId = await insertReview(userId, storeId, data);
  return reviewId;
};
