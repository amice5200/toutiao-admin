import Vue from "vue";
//导入路由
import VueRouter from "vue-router";
Vue.use(VueRouter);

// 导入组件
// 它会默认找你文件夹的index.js，没有再找index.vue
import login from "../views/login";
import home from "../views/home";

// 准备路由规则
const routes = [
  { path: "/login", component: login },
  { path: "/home", component: home },
  { path: "/", redirect: "/login" }
];
// 创建路由对象
const router = new VueRouter({
  routes
});
// 默认暴露（默认导出）
// 把router这个对象暴露出去
export default router;
