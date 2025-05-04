import { insertReview, getReviewsByUserId } from "../repositories/review.repository.js";
import { getStoreById } from "../repositories/store.repository.js";

// 가게 존재 여부 체크
export const createReview = async (userId, storeId, data) => {
  const store = await getStoreById(storeId);
  if (!store) {
    throw new Error("존재하지 않는 가게입니다.");
  }

  const reviewId = await insertReview(userId, storeId, data);
  if (!reviewId) {
    throw new Error("리뷰 등록 중 오류가 발생했습니다.");
  }

  return reviewId;
};

export const getUserReviews = async (userId) => {
  const reviews = await getReviewsByUserId(userId);
  return reviews.map((review) => ({
    id: review.id,
    nickname: review.user.nickname,
    rating: review.rating,
    content: review.content,
    createdAt: review.createdAt,
    storeName: review.store.name,
  }));
};