export const bodyToUser = (body) => {
    const birth = new Date(body.birth);
  
    return {
      email: body.email,
      name: body.name,
      gender: body.gender,
      birth,
      address: body.address || "",
      detailAddress: body.detailAddress || "",
      phoneNumber: body.phoneNumber,
      preferences: body.preferences,
      status : body.status
    };
  };


// 사용자 정보를 포맷하여 응답을 반환
export const responseFromUser = ({ user, preferences }) => {
    // user 객체가 비어있는지 확인
    if (!user || user.length === 0) {
      return {
        status: 404,
        message: '사용자를 찾을 수 없습니다.',
      };
    }
  
    // 사용자 정보 포맷팅 (user 객체에서 필요한 데이터만 추출)
    const userInfo = {
      id: user[0].id,
      email: user[0].email,
      name: user[0].name,
      gender: user[0].gender,
      birth: user[0].birth,
      address: user[0].address,
      detailAddress: user[0].detailAddress,
      phoneNumber: user[0].phoneNumber,
      status : user[0].status
    };
  
    // 선호 음식 카테고리 포맷팅
    const userPreferences = preferences.map(pref => ({
      id: pref.id,
      foodCategoryId: pref.food_category_id,
      foodCategoryName: pref.name,
    }));
  
    // 최종 응답 객체 반환
    return {
      status: 200,
      message: '회원가입 성공!',
      data: {
        user: userInfo,
        preferences: userPreferences,
      },
    };
  };