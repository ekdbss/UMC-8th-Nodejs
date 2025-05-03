import { pool } from "../db.config.js";

export const getStoreById = async (storeId) => {
  const [rows] = await pool.query(
    "SELECT * FROM store WHERE id = ?",
    [storeId]
  );
  return rows[0];
};
