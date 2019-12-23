// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { Row, Col, Menu, MenuItem, Icon, Button, Modal, Tabs, TabPane, Input, DatePicker, Message } from 'iview';

import 'iview/dist/styles/iview.css';
import "./assets/css/base.css"


Vue.component('Row', Row);
Vue.component('Col', Col);
Vue.component('Menu', Menu);
Vue.component('MenuItem', MenuItem);
Vue.component('Icon', Icon);
Vue.component('Button', Button);
Vue.component('Modal', Modal);
Vue.component('Tabs', Tabs);
Vue.component('TabPane', TabPane);
Vue.component('Input', Input);
Vue.component('DatePicker', DatePicker);


Vue.component('Message', Message);
Vue.prototype.$Message = Message

Vue.config.productionTip = false

import http from './service/http.js'
import ports from './service/ports_api.js'
Vue.prototype.http = http
Vue.prototype.ports = ports

import commonMeans from "./assets/js/common.js"
Vue.prototype.$commonMeans = commonMeans

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
