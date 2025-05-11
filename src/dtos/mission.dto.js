export const bodyToMission = (body, storeId) => {
    return {
      storeId,
      name: body.name,
      deadline: new Date(body.deadline),
      criterion: body.criterion,
      reward: body.reward,
    };
  };
  