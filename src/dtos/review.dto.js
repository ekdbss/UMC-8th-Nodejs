export const bodyToReview = (body, storeId) => {
  console.log("Body in bodyToReview:", body);

  return {
    userId: body.userId,
    //storeId: storeId
    rating: parseFloat(body.rating),
    content: body.content
  };
};
