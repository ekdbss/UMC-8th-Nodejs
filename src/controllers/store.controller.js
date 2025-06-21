import { StatusCodes } from "http-status-codes";
import { listStoreReviews } from "../services/store.service.js";
import { BadRequestError } from "../errors/customError.js";

export const handleListStoreReviews = async (req, res, next) => {
    /*
    #swagger.summary = '가게 리뷰 목록 조회 API'
    #swagger.parameters['storeId'] = {
      in: 'path',
      required: true,
      type: 'integer',
      description: '리뷰를 조회할 가게 ID',
      example: 3
    }
    #swagger.parameters['cursor'] = {
      in: 'query',
      required: false,
      type: 'integer',
      description: '페이징 처리를 위한 커서 (기본값: 0)',
      example: 0
    }
    #swagger.responses[200] = {
      description: '가게 리뷰 목록 조회 성공',
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              data: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: { type: "number", example: 12 },
                    userId: { type: "number", example: 1 },
                    storeId: { type: "number", example: 3 },
                    rating: { type: "number", example: 4.5 },
                    content: { type: "string", example: "맛있어요!" },
                    createdAt: { type: "string", format: "date-time", example: "2025-06-21T12:34:56Z" }
                  }
                }
              },
              pagination: {
                type: "object",
                properties: {
                  cursor: {
                    type: "number",
                    nullable: true,
                    example: 12,
                    description: "다음 페이지를 위한 커서. 더 이상 데이터가 없으면 null"
                  }
                }
              }
            }
          }
        }
      }
    }

  #swagger.responses[400] = {
    description: '잘못된 요청 (유효하지 않은 가게 ID)',
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            message: { type: "string", example: "유효하지 않은 가게 Id입니다." }
          }
        }
      }
    }
  }

  #swagger.responses[500] = {
    description: '서버 내부 오류',
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            message: { type: "string", example: "가게 리뷰 조회 중 오류가 발생했습니다." }
          }
        }
      }
    }
  }
  */
  try {
    const storeId = parseInt(req.params.storeId);
    const cursor = typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0;

    if (isNaN(storeId)) {
      throw new BadRequestError("유효하지 않은 가게 Id입니다.");
    }

    const reviews = await listStoreReviews(storeId, cursor);
    res.status(StatusCodes.OK).json(reviews);
  } catch (error) {
    next(error);
  }
};
