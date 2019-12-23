import Vue from 'vue'
import Router from 'vue-router'
import LocationTracking from '@/components/location_tracking'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LocationTracking',
      component: LocationTracking
    }
  ]
})
