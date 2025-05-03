import { pool } from "../db.config.js";

// 가게에 미션 추가
export const addMission = async (missionData) => {
  const conn = await pool.getConnection();

  try {
    const [result] = await conn.query(
      `INSERT INTO mission (store_id, name, deadline, criterion, reward) 
       VALUES (?, ?, ?, ?, ?)`,
      [
        missionData.storeId,
        missionData.name,
        missionData.deadline,
        missionData.criterion,
        missionData.reward,
      ]
    );

    return result.insertId; // 미션 ID 반환
  } catch (err) {
    throw new Error(`미션 추가 중 오류 발생: ${err.message}`);
  } finally {
    conn.release();
  }
};
