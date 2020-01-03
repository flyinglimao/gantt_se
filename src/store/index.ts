import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import firebase from 'firebase'
import 'firebase/firestore'

const db = firebase.initializeApp({
  apiKey: 'AIzaSyCRyyDfTwdd16pucgPwNC32N8LeE5tTYjU',
  authDomain: 'gantt-se.firebaseapp.com',
  databaseURL: 'https://gantt-se.firebaseio.com',
  projectId: 'gantt-se',
  storageBucket: 'gantt-se.appspot.com',
  messagingSenderId: '924626475191',
  appId: '1:924626475191:web:baac0dea5bfd4977281532'
}).firestore()

Vue.use(Vuex)

export default new Vuex.Store<any>({
  state: {
    projectInfo: null,
    // projectInfo: {
    //   projectName: '我就爛',
    //   projectOwner: [
    //     '捷哥',
    //     '世雄',
    //     '宇宸',
    //     '潘瑨'
    //   ],
    //   teamMember: [ // will be changed to email
    //     '捷哥',
    //     '世雄',
    //     '宇宸',
    //     '潘瑨',
    //     '米卡狗'
    //   ],
    //   tasks: [
    //     { state: 1, taskId: '1', title: '捷哥是在哈搂???', managers: ['捷哥'], type: 'Hello', start: '2019-12-06', end: '2019-12-12', progress: 0 },
    //     { state: 1, taskId: '2', title: '世雄是在哈搂???', managers: ['世雄'], type: 'Hello', start: '2019-12-06', end: '2019-12-17', progress: 50 },
    //     { state: 1, taskId: '3', title: '宇宸是在哈搂???', managers: ['宇宸'], type: 'Hello', start: '2019-12-06', end: '2019-12-19', progress: 75 },
    //     { state: 1, taskId: '4', title: '潘瑨是在哈搂???', managers: ['潘瑨'], type: 'Hello', start: '2019-12-06', end: '2019-12-26', progress: 89 },
    //     { state: 1, taskId: '1-1', title: '-米卡狗是在哈搂???', managers: ['潘瑨'], type: 'Hello', start: '2019-12-06', end: '2019-12-26', progress: 89 },
    //     { state: 1, taskId: '1-2', title: '-米卡狗是在哈搂???', managers: ['潘瑨'], type: 'Hello', start: '2019-12-06', end: '2019-12-26', progress: 89 },
    //     { state: 1, taskId: '2-1', title: '-米卡狗是在哈搂???', managers: ['潘瑨'], type: 'Hello', start: '2019-12-06', end: '2019-12-26', progress: 89 },
    //     { state: 1, taskId: '2-2', title: '-米卡狗是在哈搂???', managers: ['潘瑨'], type: 'Hello', start: '2019-12-06', end: '2019-12-26', progress: 89 },
    //     { state: 1, taskId: '3-1', title: '-米卡狗是在哈搂???', managers: ['潘瑨'], type: 'Hello', start: '2019-12-06', end: '2019-12-26', progress: 89 },
    //     { state: 1, taskId: '1-1-1', title: '1--米卡狗是在哈搂???', managers: ['潘瑨'], type: 'Hello', start: '2019-12-06', end: '2019-12-26', progress: 89 },
    //     { state: 1, taskId: '1-2-1', title: '2--米卡狗是在哈搂???', managers: ['潘瑨'], type: 'Hello', start: '2019-12-06', end: '2019-12-26', progress: 89 },
    //     { state: 1, taskId: '2-1-1', title: '3--米卡狗是在哈搂???', managers: ['潘瑨'], type: 'Hello', start: '2019-12-06', end: '2019-12-26', progress: 89 },
    //     { state: 1, taskId: '2-2-1', title: '4--米卡狗是在哈搂???', managers: ['潘瑨'], type: 'Hello', start: '2019-12-06', end: '2019-12-26', progress: 89 },
    //     { state: 1, taskId: '3-1-1', title: '5--米卡狗是在哈搂???', managers: ['潘瑨'], type: 'Hello', start: '2019-12-06', end: '2019-12-26', progress: 89 }
    //   ],
    //   startDate: '2019-12-01',
    //   releaseDate: '2020-2-25'
    // },
    user: {
      id: null,
      name: null,
      email: null
    },
    projectList: []
  },
  mutations: {
    ...vuexfireMutations,
    updateUser (state, user) {
      state.user.id = user.uid
      state.user.name = user.displayName
      state.user.email = user.email
    }
  },
  actions: {
    bindProjectInfo: firestoreAction(async (context, id) => {
      let ref = db.collection('projectInfo').doc(id)

      ref.get().then(doc => {
        if (!doc.exists) {
          ref.set({
            projectName: '我就爛',
            projectOwner: [
              '捷哥',
              '世雄',
              '宇宸',
              '潘瑨'
            ],
            teamMember: [ // will be changed to email
              '捷哥',
              '世雄',
              '宇宸',
              '潘瑨',
              '米卡狗'
            ],
            tasks: [
              { state: 1, taskId: '1', title: '捷哥是在哈搂???', managers: ['捷哥'], type: 'Hello', start: '2019-12-06', end: '2019-12-12', progress: 0 },
              { state: 1, taskId: '2', title: '世雄是在哈搂???', managers: ['世雄'], type: 'Hello', start: '2019-12-06', end: '2019-12-17', progress: 50 },
              { state: 1, taskId: '3', title: '宇宸是在哈搂???', managers: ['宇宸'], type: 'Hello', start: '2019-12-06', end: '2019-12-19', progress: 75 },
              { state: 1, taskId: '4', title: '潘瑨是在哈搂???', managers: ['潘瑨'], type: 'Hello', start: '2019-12-06', end: '2019-12-26', progress: 89 },
              { state: 1, taskId: '1-1', title: '-米卡狗是在哈搂???', managers: ['潘瑨'], type: 'Hello', start: '2019-12-06', end: '2019-12-26', progress: 89 },
              { state: 1, taskId: '1-2', title: '-米卡狗是在哈搂???', managers: ['潘瑨'], type: 'Hello', start: '2019-12-06', end: '2019-12-26', progress: 89 },
              { state: 1, taskId: '2-1', title: '-米卡狗是在哈搂???', managers: ['潘瑨'], type: 'Hello', start: '2019-12-06', end: '2019-12-26', progress: 89 },
              { state: 1, taskId: '2-2', title: '-米卡狗是在哈搂???', managers: ['潘瑨'], type: 'Hello', start: '2019-12-06', end: '2019-12-26', progress: 89 },
              { state: 1, taskId: '3-1', title: '-米卡狗是在哈搂???', managers: ['潘瑨'], type: 'Hello', start: '2019-12-06', end: '2019-12-26', progress: 89 },
              { state: 1, taskId: '1-1-1', title: '1--米卡狗是在哈搂???', managers: ['潘瑨'], type: 'Hello', start: '2019-12-06', end: '2019-12-26', progress: 89 },
              { state: 1, taskId: '1-2-1', title: '2--米卡狗是在哈搂???', managers: ['潘瑨'], type: 'Hello', start: '2019-12-06', end: '2019-12-26', progress: 89 },
              { state: 1, taskId: '2-1-1', title: '3--米卡狗是在哈搂???', managers: ['潘瑨'], type: 'Hello', start: '2019-12-06', end: '2019-12-26', progress: 89 },
              { state: 1, taskId: '2-2-1', title: '4--米卡狗是在哈搂???', managers: ['潘瑨'], type: 'Hello', start: '2019-12-06', end: '2019-12-26', progress: 89 },
              { state: 1, taskId: '3-1-1', title: '5--米卡狗是在哈搂???', managers: ['潘瑨'], type: 'Hello', start: '2019-12-06', end: '2019-12-26', progress: 89 }
            ],
            startDate: '2019-12-1',
            releaseDate: '2020-2-25'
          })
        }
      })
      context.unbindFirestoreRef('projectInfo')
      return context.bindFirestoreRef('projectInfo', ref)
    }),
    unbindProjectInfo: firestoreAction(async (_) => {
      return _.unbindFirestoreRef('projectInfo')
    }),
    updateProjectInfo: (_, commit) => {
      let docId = commit.id
      return db
        .collection('projectInfo')
        .doc(docId)
        .set(commit)
    },
    updateProjectOwner: (_, commit) => {
      let docId = commit.id
      let insert = commit.insert
      let remove = commit.remove
      let refdoc = db.collection('projectInfo').doc(docId)

      insert.forEach((element: any) => {
        let userProjectList = db.collection('projectList')
          .doc(element)
          .set({ projectList: firebase.firestore.FieldValue.arrayUnion(refdoc) }, { merge: true })
      })
      remove.forEach((element: any) => {
        let userProjectList = db.collection('projectList')
          .doc(element)
          .set({ projectList: firebase.firestore.FieldValue.arrayRemove(refdoc) }, { merge: true })
      })

      // let ref = db.collection('projectList').doc('imbigking@gmail.com')
      // ref.get().then(res => {
      //   if (!res.exists) {
      //     ref.set({ projectList: [ref] })
      //   } else {
      //     let projectListData:any = res.data()
      //     projectListData.projectList.splice(0, 0, refdoc)

      //     ref.set(projectListData)
      //   }
      // })
    },
    updateTaskList: (_, commit) => {
      let docId = commit.id
      return db
        .collection('projectInfo')
        .doc(docId)
        .update({ taskList: commit.taskList })
    },

    bindProjectList: firestoreAction(async (_, email) => {
      let ref = db.collection('projectList').doc(email)
      ref.get().then(doc => {
        if (!doc.exists) {
          ref.set({ projectList: [] })
        }
      })
      // _.unbindFirestoreRef('projectList')
      return _.bindFirestoreRef('projectList', ref)
    }),
    unbindProjectList: firestoreAction(async (_) => {
      return _.unbindFirestoreRef('projectList')
    }),

    addProjectInfo: (_, commit) => {
      return db.collection('projectInfo').add(commit)
    },
    auth: (store, commit) => {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          store.commit('updateUser', {
            uid: user.uid,
            displayName: user.displayName,
            email: user.email
          })
          store.dispatch('bindProjectList', user.email)
        } else {
          store.commit('updateUser', {
            uid: null,
            displayName: null,
            email: null
          })
          store.dispatch('unbindProjectList')
          store.dispatch('unbindProjectInfo')
        }
      })
    }
  }
})
