import { StatusCodes } from "http-status-codes";
import { bodyToMission } from "../dtos/mission.dto.js";
import { createMission } from "../services/mission.service.js";
import { BadRequestError } from "../errors/customError.js";

export const handleAddMission = async (req, res, next) => {
    /*
    #swagger.summary = '미션 등록 API'
    #swagger.parameters['storeId'] = {
      in: 'path',
      required: true,
      type: 'integer',
      description: '미션을 등록할 가게 ID'
    }
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["name", "deadline", "criterion", "reward"],
            properties: {
              name: { type: "string", example: "치킨 먹기 미션" },
              deadline: { type: "string", format: "date-time", example: "2025-07-01T23:59:59Z" },
              criterion: { type: "string", example: "영수증 업로드" },
              reward: { type: "number", example: 1000 }
            }
          }
        }
      }
    }
    #swagger.responses[201] = {
      description: "미션 등록 성공",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              message: { type: "string", example: "미션이 성공적으로 추가되었습니다." },
              missionId: { type: "number", example: 12 }
            }
          }
        }
      }
    }

  #swagger.responses[400] = {
    description: '잘못된 요청 (유효하지 않은 가게 ID 또는 필드 누락)',
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
            message: { type: "string", example: "서버 내부 오류가 발생했습니다." }
          }
        }
      }
    }
  }
  */
 
  try {
    const storeId = parseInt(req.params.storeId, 10);
    if (isNaN(storeId)) {
      throw new BadRequestError("유효하지 않은 가게 Id입니다.");
    }

    const missionData = bodyToMission(req.body, storeId);
    const missionId = await createMission(missionData);

    res.status(StatusCodes.CREATED).json({
      message: "미션이 성공적으로 추가되었습니다.",
      missionId,
    });
  } catch (error) {
    next(error);
  }
};
