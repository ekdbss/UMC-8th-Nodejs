export const bodyToReview = (body, storeId) => {
  return {
    userId: body.userId,
    storeId: storeId,
    rating: parseFloat(body.rating),
    content: body.content
  };
};
