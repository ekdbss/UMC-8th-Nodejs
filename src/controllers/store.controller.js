import { StatusCodes } from "http-status-codes";
import { listStoreReviews } from "../services/store.service.js";
import { BadRequestError } from "../errors/customError.js";

export const handleListStoreReviews = async (req, res, next) => {
  try {
    const storeId = parseInt(req.params.storeId);
    const cursor = typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0;

    if (isNaN(storeId)) {
      throw new BadRequestError("유효하지 않은 가게 Id입니다.");
    }

    const reviews = await listStoreReviews(storeId, cursor);
    res.status(StatusCodes.OK).json(reviews);
  } catch (error) {
    next(error);
  }
};
