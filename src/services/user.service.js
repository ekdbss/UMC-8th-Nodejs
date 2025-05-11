import { responseFromUser } from "../dtos/user.dto.js";
import {
  addUser,
  getUser,
  getUserPreferencesByUserId,
  setPreference,
} from "../repositories/user.repository.js";
import {
  ConflictError,
  InternalServerError,
} from "../errors/customError.js";

export const userSignUp = async (data) => {
  try {
    const joinUserId = await addUser({
      email: data.email,
      name: data.name,
      gender: data.gender,
      birth: data.birth,
      address: data.address,
      detailAddress: data.detailAddress,
      phoneNumber: data.phoneNumber,
      status: data.status,
    });

    if (joinUserId === null) {
      throw new ConflictError("이미 존재하는 이메일입니다.");
    }

    for (const preference of data.preferences) {
      await setPreference(joinUserId, preference);
    }

    const user = await getUser(joinUserId);
    const preferences = await getUserPreferencesByUserId(joinUserId);

    return responseFromUser({ user, preferences });
  } catch (error) {
    throw new InternalServerError("회원가입 처리 중 오류가 발생했습니다.");
  }
};
