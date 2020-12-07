import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.config.productionTip = false;

new Vue({   // 새로고침했을 때 로그인 정보 null으로 초기화되는 현상 막기위함
  router,
  store,
  async beforeCreate() {
    let token = localStorage.getItem("access-token");
    if (store.state.userInfo == null && token) {
      await store.dispatch("GET_MEMBER_INFO", token);
    }
  },
  render: (h) => h(App)
}).$mount("#app");
