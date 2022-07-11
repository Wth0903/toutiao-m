import Vue from "vue";
import Vuex from "vuex";
import { getLocal, setLocal } from "@/utils/storage";
const tonenKey = "toutiao_token";
Vue.use(Vuex);
//用于存储全局状态数据
export default new Vuex.Store({
  state: {
    user: getLocal(tonenKey), //存储token数据的
    // const: 1,
    // userinfo: {
    //   name: "嗨嗨",
    // },
  },
  getters: {},
  // 修改状态的唯一入口
  //只允许有同步状态
  mutations: {
    // 修改state数据的方法 将获取的token存到vuex和本地里
    setUser(state, user) {
      state.user = user;
      // console.log(user);
      setLocal(tonenKey, user); //将获取的token值存入到本地
    },
    // // 第一个参数就是仓库中的状态(state)
    // changeCount(state) {
    //   state.const++;
    // },
    // changeName(state) {
    //   state.userinfo.name = "传智";
    // },
    // changeCount2(state, num) {
    //   state.const += num;
    // },
  },
  actions: {},
  modules: {},
});
