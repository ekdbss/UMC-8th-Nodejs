import { StatusCodes } from "http-status-codes";
import { bodyToReview } from "../dtos/review.dto.js";
import { createReview } from "../services/review.service.js";

export const handleAddReview = async (req, res, next) => {
  try {
    const storeId = parseInt(req.params.storeId, 10);
    const userId = req.body.userId; // userId도 body에서 받아온다고 가정
    const reviewData = bodyToReview(req.body, storeId);

    const reviewId = await createReview (userId, storeId, reviewData);

    res.status(StatusCodes.CREATED).json({
      message: "리뷰가 성공적으로 등록되었습니다.",
      reviewId
    });
  } catch (error) {
    // 가게 없음 등의 오류 처리
    res.status(StatusCodes.BAD_REQUEST).json({
      message: error.message || "리뷰 등록 중 오류가 발생했습니다.",
    });
  }
};
