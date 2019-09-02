import Vue from "vue";
import VueResource from "vue-resource";
import App from "./App.vue";
import router from "./router";
import Auth from "./plugins/Auth.js";

Vue.config.productionTip = false;

Vue.use(VueResource);
Vue.use(Auth);

//configure alertify defaults
alertify.defaults.notifier.position = "top-right";

Vue.http.interceptors.push(function(request, next) {
  if (request.url[0] === "/") {
    request.url = process.env.VUE_APP_API + request.url;

    var token = Vue.auth.getToken();
    if (token) request.headers.set("Authorization", "Bearer " + token);
  }
  next(function(response) {
    if (response.status == 422) {
      response.body.errors.forEach(function(e) {
        alertify.error(e);
      });
    }
  });
});

//configure route guards
router.beforeEach(function(to, from, next) {
  //prevent access to 'requiresGuest' routes;
  if (
    to.matched.some(function(record) {
      return record.meta.requiresGuest;
    }) &&
    Vue.auth.loggedIn()
  ) {
    next({
      path: "/newsfeed"
    });
  } else if (
    to.matched.some(function(record) {
      return record.meta.requiresAuth;
    }) &&
    !Vue.auth.loggedIn()
  ) {
    next({
      path: "/auth/login",
      query: { redirect: to.fullPath }
    });
  } else {
    next(); // make sure to always call next()!
  }
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
