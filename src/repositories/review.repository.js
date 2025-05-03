import { pool } from "../db.config.js";

export const insertReview = async ({ userId, storeId, rating, content }) => {
  const conn = await pool.getConnection();

  try {
    const [result] = await conn.query(
      `INSERT INTO user_review (user_id, store_id, rating, content) VALUES (?, ?, ?, ?)`,
      [userId, storeId, rating, content]
    );

    return result.insertId;
  } catch (error) {
    throw new Error(`리뷰 저장 중 오류 발생: ${error}`);
  } finally {
    conn.release();
  }
};

// 가게 존재 확인 함수
export const getStoreById = async (storeId) => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query("SELECT * FROM store WHERE id = ?", [storeId]);
    return rows[0]; // 존재하면 객체, 없으면 undefined
  } catch (err) {
    throw new Error(`가게 조회 중 오류 발생: ${err}`);
  } finally {
    conn.release();
  }
};