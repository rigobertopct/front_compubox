import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "./assets/css/nucleo-icons.css";
import "./assets/css/nucleo-svg.css";
import VueSweetalert2 from "vue-sweetalert2";
import MaterialDashboard from "./material-dashboard";
import * as apolloProvider from "./apollo.provider";
router.beforeEach((to, from, next) => {
  if(to.meta.requiresAuth){

    if (!store.state.isAuth) {
      return {
        path: '/',
        // save the location we were at to come back later
        query: { redirect: to.fullPath }
      }
    } else {
      next();
    }

  } else {
    next();
  }
});
const appInstance = createApp(App);
appInstance.use(apolloProvider.provider);
appInstance.use(store);
appInstance.use(router);
appInstance.use(VueSweetalert2);
appInstance.use(MaterialDashboard);
appInstance.mount("#app");
