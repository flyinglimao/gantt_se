import Vue from 'vue'
import VueRouter from 'vue-router'
import TaskList from '../views/TaskList.vue'
import GanttChart from '../views/GanttChart.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/task',
    name: 'task',
    component: TaskList
  },
  {
    path: '/gantt',
    name: 'gantt',
    component: GanttChart
  },
  {
    path: '/',
    redirect: '/task'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
