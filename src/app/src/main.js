// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import Vue from 'vue';
import Vuex from 'vuex';
import YZMonitor from 'yunzhen'; // 监控sdk
import store from './store';
import App from './App';
import router from './router';

Vue.use(iView);
Vue.use(Vuex);

Vue.config.productionTip = false;
YZMonitor.config = {
  disable: process.env == 'production' ? 1 : 0,
  appkey: 'bf85ca2541ab7ea8fe584f98c787250f',
  uploadUrl: 'http://172.23.7.73/sdk/commit',
};

Vue.config.errorHandler = (err) => {
  YZMonitor.notify(err);
};

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0);
  iView.LoadingBar.start();
  next();
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || '云诊';
  next();
});

router.afterEach(() => {
  iView.LoadingBar.finish();
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
