import Vue from "vue";
import App from "./App.vue";
Vue.config.productionTip = false;

//导入axios
import axios from "axios";
axios.defaults.baseURL = "http://ttapi.research.itcast.cn/";
Vue.prototype.$axios = axios; //添加原型

//导入全局默认css样式
import "./assets/css/base.css";

import JSONbig from "json-bigint";
// `transformResponse` 在传递给 then/catch 前，允许修改响应数据
axios.defaults.transformResponse = [
  function(data) {
    // 对 data 进行任意转换处理
    // 作用1:把JSON字符串转成JS对象
    // 作用2:会判断字符串里面有没有大数字,有的话,会把大数字做精度处理

    try {
      let obj = JSONbig.parse(data);
      return obj;
    } catch (error) {
      return data;
    }
  }
];

//导入饿了么ui
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
//调用饿了么ui
Vue.use(ElementUI);

import router from "./router";

// 添加请求拦截器
axios.interceptors.request.use(
  function(config) {
    let user = JSON.parse(window.sessionStorage.getItem("user-Info"));

    if (user) config.headers.Authorization = `Bearer ${user.token}`;
    // 在发送请求之前做些什么
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    // 正常响应调用这里
    // window.console.log('正确响应')
    return response;
  },
  function(error) {
    // console.dir(error);

    if (error.response.status == 401) {
      // 提示请先登录
      Vue.prototype.$message.error("请先登录");
      // 打回登录页
      router.push("/login");
    }

    // window.console.log('错误响应')
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
