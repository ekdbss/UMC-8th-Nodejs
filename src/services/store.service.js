import { getAllStoreReviews } from "../repositories/user.repository.js";
import { responseFromReviews } from "../dtos/store.dto.js";

export const listStoreReviews = async (storeId) => {
  try {
    const reviews = await getAllStoreReviews(storeId);
    return responseFromReviews(reviews);
  } catch (error) {
    throw new InternalServerError("가게 리뷰 조회 중 오류가 발생했습니다.");
  }
};
