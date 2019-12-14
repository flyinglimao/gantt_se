import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pi: 3.1415926,
    taskList: [
      { state: 1, title: '捷哥是在哈搂???', managers: ['捷哥'], type: 'Hello', start: '2019-12-06', end: '2019-12-12', progress: 0 },
      { state: 1, title: '世雄是在哈搂???', managers: ['世雄'], type: 'Hello', start: '2019-12-06', end: '2019-12-17', progress: 50 },
      { state: 1, title: '宇宸是在哈搂???', managers: ['宇宸'], type: 'Hello', start: '2019-12-06', end: '2019-12-19', progress: 75 },
      { state: 1, title: '潘瑨是在哈搂???', managers: ['潘瑨'], type: 'Hello', start: '2019-12-06', end: '2019-12-26', progress: 89 }
    ],
    projectInfo: {
      projectName: '我就爛',
      projectId: '1234567',
      projectOwner: [
        '捷哥',
        '世雄',
        '宇宸',
        '潘瑨'
      ],
      teamMember: [
        '捷哥',
        '世雄',
        '宇宸',
        '潘瑨',
        '米卡狗'
      ],
      startDate: (new Date('2019-12-1')),
      releaseDate: (new Date('2020-2-25'))

    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
