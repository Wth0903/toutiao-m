import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/styles/index.less";
//注册全局图标组件
import Toutiaoicon from "@/components/Toutiaoicon";
// 引用全局图标组件
Vue.component("Toutiaoicon", Toutiaoicon);

//引入vant  导入所有组件 按项目需求来
import Vant from "vant";
//引入Vant样式
import "vant/lib/index.less";
// 引入flexible
import "amfe-flexible";

import "./utils/dayjs";

//测试请求
// import request from "@/utils/request";
// request.get("v1_0/channels").then((res) => {
//   console.log(res.data.data.channels);
// });

Vue.use(Vant);
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
