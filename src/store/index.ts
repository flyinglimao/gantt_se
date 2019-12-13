import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pi: 3.1415926,
    taskList: [
      { state: 1, title: '捷哥是在哈搂???', type: 'Hello', start: '2019-12-06', end: '2019-12-12', progress: 0 },
      { state: 1, title: '世雄是在哈搂???', type: 'Hello', start: '2019-12-06', end: '2019-12-17', progress: 50 },
      { state: 1, title: '宇宸是在哈搂???', type: 'Hello', start: '2019-12-06', end: '2019-12-19', progress: 75 },
      { state: 1, title: '潘瑨是在哈搂???', type: 'Hello', start: '2019-12-06', end: '2019-12-26', progress: 89 }
    ]
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
