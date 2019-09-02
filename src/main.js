import Vue from "vue";
import App from "./App.vue";
Vue.config.productionTip = false;

//导入axios
import axios from "axios";
Vue.prototype.$axios = axios; //添加原型

//导入全局默认css样式
import "./assets/css/base.css";

//导入饿了么ui
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
//调用饿了么ui
Vue.use(ElementUI);

import router from "./router";

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
