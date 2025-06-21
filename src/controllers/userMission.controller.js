import { StatusCodes } from "http-status-codes";
import {
  challengeMission,
  getUserInProgressMissions,
  completeUserMission
} from "../services/userMission.service.js";
import { BadRequestError, InternalServerError } from "../errors/customError.js";


export const handleChallengeMission = async (req, res, next) => {
    /*
    #swagger.summary = '진행 중인 미션 목록 조회 API'
    #swagger.parameters['userId'] = {
      in: 'path',
      required: true,
      type: 'integer',
      description: '사용자 ID',
      example: 1
    }
    #swagger.responses[200] = {
      description: '진행 중인 미션 목록 조회 성공',
      content: {
        "application/json": {
          schema: {
            type: "array",
            items: {
              type: "object",
              properties: {
                userMissionId: { type: "number", example: 5 },
                status: { type: "string", example: "IN_PROGRESS" },
                startedAt: { type: "string", format: "date-time", example: "2025-06-10T09:30:00Z" },
                updatedAt: { type: "string", format: "date-time", example: "2025-06-15T14:45:00Z" },
                mission: {
                  type: "object",
                  properties: {
                    id: { type: "number", example: 10 },
                    name: { type: "string", example: "치킨 먹기" },
                    deadline: { type: "string", format: "date-time", example: "2025-06-30T23:59:59Z" },
                    reward: { type: "number", example: 1000 },
                    criterion: { type: "string", example: "영수증 업로드" }
                  }
                }
              }
            }
          }
        }
      }
    }
  */
  try {
    const userId = parseInt(req.params.userId, 10);
    const missionId = parseInt(req.params.missionId, 10);

    if (isNaN(userId) || isNaN(missionId)) {
      throw new BadRequestError("유효하지 않은 userId 또는 missionId입니다.");
    }

    const userMissionId = await challengeMission(userId, missionId);

    res.status(StatusCodes.CREATED).json({
      message: "미션 도전이 완료되었습니다.",
      userMissionId,
    });
  } catch (error) {
    next(error);
  }
};

export const handleGetInProgressMissions = async (req, res, next) => {
  /*
  #swagger.responses[500] = {
    description: '서버 내부 오류 (미션 완료 처리 실패)',
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            message: { type: "string", example: "미션 완료 처리 중 오류가 발생했습니다." }
          }
        }
      }
    }
  }
*/

  try {
    const userId = parseInt(req.params.userId);
    const result = await getUserInProgressMissions(userId);
    res.status(StatusCodes.OK).json(result);
  } catch (err) {
    next(err);
  }
};

export const completeUserMissionController = async (req, res, next) => {
  try {
    const { userId, missionId } = req.params;
    const result = await completeUserMission(Number(userId), Number(missionId));

    res.status(StatusCodes.OK).json({
      message: "미션 상태가 '진행 완료'로 변경되었습니다.",
    });
  } catch (err) {
    next(err);
  }
};
