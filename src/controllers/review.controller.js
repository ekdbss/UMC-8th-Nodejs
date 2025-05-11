import { StatusCodes } from "http-status-codes";
import { bodyToReview } from "../dtos/review.dto.js";
import { createReview, getUserReviews } from "../services/review.service.js";
import { BadRequestError, InternalServerError } from "../errors/customError.js";

export const handleAddReview = async (req, res, next) => {
  try {
    const storeId = parseInt(req.params.storeId, 10);
    const userId = req.body.userId;

    if (!userId || isNaN(storeId)) {
      throw new BadRequestError("유효하지 않은 사용자 또는 가게 ID입니다.");
    }

    const reviewData = bodyToReview(req.body, storeId);
    const reviewId = await createReview(userId, storeId, reviewData);

    res.status(StatusCodes.CREATED).json({
      message: "리뷰가 성공적으로 등록되었습니다.",
      reviewId,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserReviewsController = async (req, res, next) => {
  try {
    const userId = Number(req.params.userId);
    const reviews = await getUserReviews(userId);
    res.status(StatusCodes.OK).json({ reviews });
  } catch (error) {
    next(new InternalServerError("리뷰 조회 중 오류가 발생했습니다."));
  }
};
