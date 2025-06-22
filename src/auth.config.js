import dotenv from "dotenv";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as KakaoStrategy } from "passport-kakao";
import { prisma } from "./db.config.js";

dotenv.config();

// Google
export const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.PASSPORT_GOOGLE_CLIENT_ID,
    clientSecret: process.env.PASSPORT_GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/oauth2/callback/google",
    scope: ["email", "profile"],
    state: true,
  },
  (accessToken, refreshToken, profile, cb) => {
    return googleVerify(profile)
      .then((user) => cb(null, user))
      .catch((err) => cb(err));
  }
);

const googleVerify = async (profile) => {
  const email = profile.emails?.[0]?.value;
  if (!email) {
    throw new Error(`profile.email was not found: ${profile}`);
  }

  const user = await prisma.user.findFirst({ where: { email } });
  if (user !== null) {
    return { id: user.id, email: user.email, name: user.name };
  }

  const created = await prisma.user.create({
    data: {
      email,
      name: profile.displayName,
      gender: "추후 수정",
      birth: new Date(1970, 0, 1),
      address: "추후 수정",
      detailAddress: "추후 수정",
      phoneNumber: "추후 수정",
      status: "추후 수정",
    },
  });

  return { id: created.id, email: created.email, name: created.name };
};

// Kakao
export const kakaoStrategy = new KakaoStrategy(
  {
    clientID: process.env.PASSPORT_KAKAO_CLIENT_ID,
    clientSecret: process.env.PASSPORT_KAKAO_CLIENT_SECRET, // 선택 사항
    callbackURL: "http://localhost:3000/oauth2/callback/kakao",
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile._json?.kakao_account?.email;
      if (!email) return done(new Error("이메일 정보 없음"));

      let user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        user = await prisma.user.create({
          data: {
            email,
            name: profile.displayName || "카카오 유저",
            gender: "추후 수정",
            birth: new Date(1970, 0, 1),
            address: "추후 수정",
            detailAddress: "추후 수정",
            phoneNumber: "추후 수정",
            status: "카카오 로그인",
          },
        });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
);

