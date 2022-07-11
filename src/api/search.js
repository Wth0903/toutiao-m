// 引入request
import request from "@/utils/request";
// import store from "@/store";
//登录接口
export const getSearchSuggestions = (q) => {
  return request({
    method: "GET",
    url: "/v1_0/suggestion",
    params: {
      q,
    },
  });
};
