import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import DeclareInfo from '@/views/declare/DeclareInfo'
import DeclareParam from '@/views/declare/DeclareParam'
import TradeTerms from '@/views/terms/TradeTerms'
import MainTradeTerms from '@/views/mainPage/MainTradeTerms'
import MainDeclare from '@/views/mainPage/MainDeclare'
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
    },
    {
      path: '/tradeTerms',
      name: 'TradeTerms',
      component: TradeTerms
    },
    {
      path: '/terms',
      name: 'MainTradeTerms',
      component: MainTradeTerms
    },
    {
      path: '/declare',
      name: 'MainDeclare',
      component: MainDeclare
    }
  ]
})
