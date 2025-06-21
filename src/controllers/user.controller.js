import { StatusCodes } from "http-status-codes";
import { bodyToUser } from "../dtos/user.dto.js";
import { userSignUp } from "../services/user.service.js";

export const handleUserSignUp = async (req, res, next) => {
    /*
    #swagger.summary = '회원 가입 API'
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["email", "name", "gender", "birth", "phoneNumber", "preferences", "status"],
            properties: {
              email: { type: "string", example: "user@example.com" },
              name: { type: "string", example: "홍길동" },
              gender: { type: "string", example: "남성" },
              birth: { type: "string", format: "date", example: "1990-01-01" },
              address: { type: "string", example: "서울시 강남구" },
              detailAddress: { type: "string", example: "302호" },
              phoneNumber: { type: "string", example: "010-1234-5678" },
              preferences: { type: "array", items: { type: "number" }, example: [1, 2] },
              status: { type: "string", example: "ACTIVE" }
            }
          }
        }
      }
    }
    #swagger.responses[200] = {
      description: "회원 가입 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              success: {
                type: "object",
                properties: {
                  email: { type: "string", example: "user@example.com" },
                  name: { type: "string", example: "홍길동" },
                  preferCategory: {
                    type: "array",
                    items: { type: "string" },
                    example: ["한식", "치킨"]
                  }
                }
              },
              error: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    }

  #swagger.responses[400] = {
    description: '요청 형식 오류 (필수 필드 누락 등)',
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            message: { type: "string", example: "요청 데이터가 유효하지 않습니다." }
          }
        }
      }
    }
  }

  #swagger.responses[500] = {
    description: '서버 내부 오류 (회원가입 실패)',
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            message: { type: "string", example: "회원가입 중 오류가 발생했습니다." }
          }
        }
      }
    }
  }
  */
 
  try {
    console.log("회원가입을 요청했습니다!");
    console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

    const user = await userSignUp(req.db, bodyToUser(req.body));

    res.status(StatusCodes.OK).success(user);
  } catch (err) {
    next(err); // 전역 에러 핸들러로 위임
  }
};

// 사용자 정보 수정
export const handleUpdateMe = async (req, res, next) => {
  /*
  #swagger.responses[401] = {
    description: '인증되지 않은 사용자',
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            message: { type: "string", example: "로그인 필요" }
          }
        }
      }
    }
  }

  #swagger.responses[500] = {
    description: '서버 내부 오류 (수정 실패)',
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            message: { type: "string", example: "회원 정보 수정 중 오류가 발생했습니다." }
          }
        }
      }
    }
  }
*/
  try {
    if (!req.user) {
      return res.status(401).json({ message: "로그인 필요" });
    }

    const userId = req.user.id;
    const updateData = req.body;

    const updatedUser = await req.db.user.update({
      where: { id: userId },
      data: updateData,
    });

    res.status(200).json({ message: "수정 완료", data: updatedUser });
  } catch (err) {
    next(err);
  }
};
