import { StatusCodes } from "http-status-codes";
import { bodyToReview } from "../dtos/review.dto.js";
import { createReview, getUserReviews } from "../services/review.service.js";

export const handleAddReview = async (req, res, next) => {
  try {
    console.log('Request Body:', req.body);

    const storeId = parseInt(req.params.storeId, 10);
    const userId = req.body.userId; // userId도 body에서 받아온다고 가정
    const reviewData = bodyToReview(req.body, storeId);

    console.log('User ID:', userId);
    console.log('Store ID:', storeId);
    console.log('Review Data:', reviewData);
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


export const getUserReviewsController = async (req, res) => {
  const userId = Number(req.params.userId); // URL 경로에서 userId를 파라미터로 받아오기
  try {
    const reviews = await getUserReviews(userId); // 서비스에서 데이터 가져오기
    res.status(200).json({ reviews });  // JSON 형식으로 리뷰 반환
  } catch (error) {
    // 오류 처리
    res.status(500).json({ message: "리뷰 조회 중 오류 발생", error: error.message });
  }
};

