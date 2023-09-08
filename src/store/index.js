import { createStore } from "vuex";
import bootstrap from "bootstrap/dist/js/bootstrap.min.js";

export default createStore({
  state: {
    hideConfigButton: false,
    isPinned: true,
    showConfig: false,
    sidebarType: "bg-gradient-dark",
    isRTL: false,
    color: "success",
    isNavFixed: false,
    isAbsolute: false,
    showNavs: true,
    showSidenav: true,
    showNavbar: true,
    showFooter: true,
    showMain: true,
    isDarkMode: false,
    autorizado: false,
    user: null,
    navbarFixed:
      "position-sticky blur shadow-blur left-auto top-1 z-index-sticky px-0 mx-4",
    absolute: "position-absolute px-4 mx-0 w-100 z-index-2",
    bootstrap,
    userid: null,
    username: null,
    isAuth: false,
    jwt: "",
    isAdmin: false,
    combate: null,
    url: "http://localhost:3000"
    // url:"https://compubox.xutil.cu/api/",

  },
  mutations: {
    storeId(state, id) {
      state.userid = id;
    },
    doLogin(state, username) {
      state.isAuth = true;
      state.username = username;
    },
    doLogout(state) {
      state.isAuth = false;
      state.username = null;
      state.jwt = "";
      state.isAdmin = false;
    },
    setToken(state, token) {
      state.jwt = token;
    },
    isAdmin(state) {
      state.isAdmin = true;
    },
    toggleConfigurator(state) {
      state.showConfig = !state.showConfig;
    },
    toggleEveryDisplay(state) {
      state.showNavbar = !state.showNavbar;
      state.showSidenav = !state.showSidenav;
      state.showFooter = !state.showFooter;
    },
    toggleHideConfig(state) {
      state.hideConfigButton = !state.hideConfigButton;
    },
    setIsPinned(state, payload) {
      state.isPinned = payload;
    },
    color(state, payload) {
      state.color = payload;
    },
    navbarMinimize(state) {
      const sidenavShow = document.getElementsByClassName("g-sidenav-show")[0];

      if (sidenavShow.classList.contains("g-sidenav-pinned")) {
        sidenavShow.classList.remove("g-sidenav-pinned");
        sidenavShow.classList.add("g-sidenav-hidden");
        state.isPinned = true;
      } else {
        sidenavShow.classList.remove("g-sidenav-hidden");
        sidenavShow.classList.add("g-sidenav-pinned");
        state.isPinned = false;
      }
    },
    navbarFixed(state) {
      if (state.isNavFixed === false) {
        state.isNavFixed = true;
      } else {
        state.isNavFixed = false;
      }
    }
  },
  actions: {
    setColor({ commit }, payload) {
      commit("color", payload);
    },
    storeId({ commit }, id) {
      commit("storeId", id);
    },
    doLogin({ commit }, username) {
      commit("doLogin", username);
    },
    doLogout({ commit }) {
      commit("doLogout");
    },
    setToken({ commit }, token) {
      commit("setToken", token);
    },
    isAdmin({ commit }) {
      commit("isAdmin");
    }
  },
  getters: {}
});
