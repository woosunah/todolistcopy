import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
  beforeCreate() {
    this.$store.commit('initaliseStore');
    // 새로운 페이지 생성전에 , ('')실행
    // vue제일 최상단이 main.js라서 beforeCreate를 main.js에 작성해줌
  },
}).$mount('#app');
