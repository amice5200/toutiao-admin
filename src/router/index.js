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

// 导航守卫
// to： 去哪
// from：从哪来
// next：放行的方法，只有调用这个方法，才让你去接下来的地方
router.beforeEach((to, from, next) => {
  // 如果你去的路径不是登录页
  if (to.path != "/login") {
    //登录判断
    let res = window.sessionStorage.getItem("user-Info");
    if (res) {
      next(); //有值,代表登录了
    } else {
      Vue.prototype.$message.error("请先登录!");
      next("/login"); //没登录，打回登录页,放行到login页面
    }
  } else {
    //是登录页，直接放行，让你访问
    next();
  }
});

// 默认暴露（默认导出）
// 把router这个对象暴露出去
export default router;
