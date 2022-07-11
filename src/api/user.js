// 引入request
import request from "@/utils/request";
// import store from "@/store";
//登录接口
export const login = (data) => {
  return request({
    method: "POST",
    url: "/v1_0/authorizations",
    data,
  });
};

//发送验证码接
export const getSmsCode = (mobile) => {
  return request({
    method: "GET",
    url: `/v1_0/sms/codes/${mobile}`,
  });
};

//个人中心 获取用户资料接口
export const fetchUserInfo = () => {
  return request({
    method: "GET",
    url: "/v1_0/user",
    // headers: {
    //   //vuex里的token
    //   Authorization: `Bearer ${store?.state?.user?.token}`,
    // },
  });
};
