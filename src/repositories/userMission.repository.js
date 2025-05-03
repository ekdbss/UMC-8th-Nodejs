import { pool } from "../db.config.js";

export const isUserChallengingMission = async (userId, missionId) => {
  const [rows] = await pool.query(
    "SELECT * FROM user_mission WHERE user_id = ? AND mission_id = ?",
    [userId, missionId]
  );
  return rows.length > 0;
};

export const insertUserMission = async (userId, missionId) => {
  const [result] = await pool.query(
    "INSERT INTO user_mission (user_id, mission_id, status) VALUES (?, ?, ?)",
    [userId, missionId, "도전중"]
  );
  return result.insertId;
};
