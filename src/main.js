// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import iView from 'iview';
// import Icon from './components/Icon';
import PlantImage from './components/PlantImage';
import 'iview/dist/styles/iview.css'; // 使用 CSS
import { formatMoney } from '@/util'

Vue.filter('money', (money = 0) => formatMoney(money));
Vue.filter('seasonCName', (season) => {
  let seasonMap = {
    'spring': '春天',
    'summer': '夏天',
    'autumn': '秋天',
    'winter': '冬天'
  }
  return seasonMap[season];
})

// import './iconfont';

Vue.use(iView);

Vue.config.productionTip = false;

// Vue.component(Icon.name, Icon);
Vue.component(PlantImage.name, PlantImage);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})