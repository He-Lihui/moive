import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
import VueLazyLoda from 'vue-lazyload';
Vue.use(VueLazyLoda,{
  loading: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2446154838,619139325&fm=26&gp=0.jpg",
})

//  定义时间总线
Vue.prototype.eventBus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
