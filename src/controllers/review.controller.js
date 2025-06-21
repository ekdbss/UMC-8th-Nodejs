import { StatusCodes } from "http-status-codes";
import { bodyToReview } from "../dtos/review.dto.js";
import { createReview, getUserReviews } from "../services/review.service.js";
import { BadRequestError, InternalServerError } from "../errors/customError.js";

export const handleAddReview = async (req, res, next) => {
    /*
    #swagger.summary = '리뷰 작성 API'
    #swagger.parameters['storeId'] = {
      in: 'path',
      required: true,
      type: 'integer',
      description: '리뷰를 작성할 가게 ID'
    }
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["userId", "rating", "content"],
            properties: {
              userId: { type: "number", example: 1 },
              rating: { type: "number", example: 4.5 },
              content: { type: "string", example: "맛있고 친절했어요!" }
            }
          }
        }
      }
    }
    #swagger.responses[201] = {
      description: "리뷰 작성 성공",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: { type: "string", example: "리뷰가 성공적으로 등록되었습니다." },
              reviewId: { type: "number", example: 5 }
            }
          }
        }
      }
    }

  #swagger.responses[400] = {
    description: '잘못된 요청 (유효하지 않은 사용자 또는 가게 ID)',
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            message: { type: "string", example: "유효하지 않은 사용자 또는 가게 ID입니다." }
          }
        }
      }
    }
  }

  #swagger.responses[500] = {
    description: '서버 내부 오류 (리뷰 등록 실패)',
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            message: { type: "string", example: "리뷰 등록 중 오류가 발생했습니다." }
          }
        }
      }
    }
  }
  */
 
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
  /*
  #swagger.responses[500] = {
    description: '리뷰 조회 중 서버 오류',
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            message: { type: "string", example: "리뷰 조회 중 오류가 발생했습니다." }
          }
        }
      }
    }
  }
*/
  try {
    const userId = Number(req.params.userId);
    const reviews = await getUserReviews(userId);
    res.status(StatusCodes.OK).json({ reviews });
  } catch (error) {
    next(new InternalServerError("리뷰 조회 중 오류가 발생했습니다."));
  }
};
