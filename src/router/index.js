import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import DeclareInfo from '@/views/declare/DeclareInfo'
import DeclareParam from '@/views/declare/DeclareParam'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/declareInfo',
      name: 'DeclareInfo',
      component: DeclareInfo
    },
    {
      path: '/declareParam',
      name: 'DeclareParam',
      component: DeclareParam
    }
  ]
})