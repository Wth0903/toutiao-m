import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

//路由加载
// 第一种 直接引入登录组件 使用同步加载路由（按需），只要页面一刷新，所有的页面数据都会一次性全部加载，如果有1000个页面，客户只想进入一个界面，这时用到同步加载的话会将所有文件一起加载，会导致加载很慢

// 第二种 直接() => import("@/views/Login") 路由懒加载，访问到某一个路由的时候再去加载当前的路由文件。
const routes = [
  {
    path: "/login",
    component: () => import("@/views/Login"),
    name: "Login",
  },
  {
    path: "/demo",
    component: () => import("@/views/demo.vue"),
  },
  {
    path: "/",
    component: () => import("@/views/layout"),
    children: [
      {
        path: "home",
        component: () => import("@/views/home"),
      },
      {
        path: "qa",
        component: () => import("@/views/qa"),
      },
      {
        path: "video",
        component: () => import("@/views/video"),
      },
      {
        path: "my",
        component: () => import("@/views/my"),
      },
    ],
  },
  {
    path: "/search",
    component: () => import("@/views/search"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
