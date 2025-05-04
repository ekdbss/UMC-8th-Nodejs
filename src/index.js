import cors from "cors";
import dotenv from "dotenv";
import express from "express"; // -> ES Module
// const express = require('express')  // -> CommonJS

import { handleUserSignUp } from "./controllers/user.controller.js";
import { handleAddReview, getUserReviewsController } from "./controllers/review.controller.js";
import { handleAddMission } from "./controllers/mission.controller.js";
import { handleChallengeMission, handleGetInProgressMissions, completeUserMissionController } from "./controllers/userMission.controller.js";
import { handleListStoreReviews } from "./controllers/store.controller.js";


dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());                            // cors 방식 허용
app.use(express.static('public'));          // 정적 파일 접근
app.use(express.json());                    // request의 본문을 json으로 해석할 수 있도록 함 (JSON 형태의 요청 body를 파싱하기 위함)
app.use(express.urlencoded({ extended: false })); // 단순 객체 문자열 형태로 본문 데이터 해석


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post("/users/signup", handleUserSignUp);

app.post("/users/reviews/:storeId", handleAddReview);

app.post("/stores/:storeId/missions", handleAddMission);

app.post("/users/:userId/missions/:missionId/challenge", handleChallengeMission);

app.get("/stores/:storeId/reviews", handleListStoreReviews);

// 내가 작성한 리뷰 목록 조회
app.get("/reviews/:userId", getUserReviewsController);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})