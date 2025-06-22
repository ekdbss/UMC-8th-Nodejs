import cors from "cors";
import dotenv from "dotenv";
import express from "express"; // -> ES Module
// const express = require('express')  // -> CommonJS
import swaggerAutogen from "swagger-autogen";
import swaggerUiExpress from "swagger-ui-express";

import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import session from "express-session";
import passport from "passport";
import { googleStrategy, kakaoStrategy } from "./auth.config.js";
import { prisma } from "./db.config.js";

import { handleUserSignUp, handleUpdateMe } from "./controllers/user.controller.js";
import { handleAddReview, getUserReviewsController } from "./controllers/review.controller.js";
import { handleAddMission } from "./controllers/mission.controller.js";
import { handleChallengeMission, handleGetInProgressMissions, completeUserMissionController } from "./controllers/userMission.controller.js";
import { handleListStoreReviews } from "./controllers/store.controller.js";
import { errorHandler } from "./middlewares/errorHandler.js";


dotenv.config();

// Passport 사용 - 미들웨어
passport.use(googleStrategy); // passport 라이브러리에 정의한 로그인 방식 등록하는 코드
passport.use(kakaoStrategy);
passport.serializeUser((user, done) => done(null, user)); // 사용자 정보를 세션에 저장하는 방법 정의
passport.deserializeUser((user, done) => done(null, user)); // 세션에서 사용자 정보를 복원하는 방법 정의

const app = express();
const port = process.env.PORT;

// 세션 관련 미들웨어 등록 — 반드시 router 정의 전에!
app.use(cors());                            // cors 방식 허용
app.use(express.static('public'));          // 정적 파일 접근
app.use(express.json());                    // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석
app.use((req, res, next) => {
  req.db = prisma;
  next();
});

app.use(errorHandler); //  마지막에 실행되는 미들웨어, 라우터 정의 아래에 위치

// Passport 사용 - 세션(Session)
app.use(
  session({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7일
    },
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET,
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000, // ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);

// Passport 초기화 + 세션 연결
app.use(passport.initialize());
app.use(passport.session());


app.get('/', (req, res) => {
  // #swagger.ignore = true
  console.log(req.user);
  res.send('Hello World!')
})

// API
app.post("/users/signup", handleUserSignUp);
app.post("/users/reviews/:storeId", handleAddReview);
app.post("/stores/:storeId/missions", handleAddMission);
app.post("/users/:userId/missions/:missionId/challenge", handleChallengeMission);
app.get("/stores/:storeId/reviews", handleListStoreReviews);
// 내가 작성한 리뷰 목록 조회
app.get("/reviews/:userId", getUserReviewsController);
// 내가 진행 중인 미션 목록 조회
app.get("/users/:userId/missions/in-progress", handleGetInProgressMissions);
// 내가 진행 중인 미션을 진행 완료로 바꾸기
app.patch("/users/:userId/missions/:missionId/complete", completeUserMissionController);
// 사용자 정보 수정
app.patch("/users/me", handleUpdateMe);


// Passport 사용 - 로그인 경로(Route)
app.get("/oauth2/login/google", passport.authenticate("google"));
app.get(
  "/oauth2/callback/google",
  passport.authenticate("google", {
    failureRedirect: "/oauth2/login/google",
    failureMessage: true,
  }),
  (req, res) => res.redirect("/")
);

app.get("/oauth2/login/kakao", passport.authenticate("kakao"));
app.get(
  "/oauth2/callback/kakao",
  passport.authenticate("kakao", {
    failureRedirect: "/oauth2/login/kakao",
  }),
  (req, res) => res.redirect("/")
);


// Swagger JSON 라우트 (swagger-ui보다 먼저 정의되어야 함)
app.get("/openapi.json", async (req, res, next) => {
  // #swagger.ignore = true
  const options = {
    openapi: "3.0.0",
    disableLogs: true,
    writeOutputFile: false,
  };
  const outputFile = "/dev/null"; // 파일 출력 생략
  const routes = ["./src/index.js"]; // 실제 라우터 경로
  const doc = {
    info: {
      title: "UMC 8th",
      description: "UMC 8th Node.js 테스트 프로젝트입니다.",
    },
    host: "localhost:3000",
  };

  const result = await swaggerAutogen(options)(outputFile, routes, doc);
  res.json(result ? result.data : null);
});

// Swagger UI 연결 - docs
app.use(
  "/docs",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup({}, {
    swaggerOptions: {
      url: "/openapi.json",
    },
  })
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})