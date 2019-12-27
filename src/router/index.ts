import Vue from 'vue'
import VueRouter from 'vue-router'
import TaskList from '../views/TaskList.vue'
import GanttChart from '../views/GanttChart.vue'
import Copyright from '../views/Copyright.vue'
import Contact from '../views/Contact.vue'
import Login from '../views/Login.vue'
import Project from '../views/Project.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/task',
    name: 'task',
    component: TaskList
  },
  {
    path: '/project',
    name: 'project',
    component: Project
  },
  {
    path: '/gantt',
    name: 'gantt',
    component: GanttChart
  },
  {
    path: '/copyright',
    name: 'copyright',
    component: Copyright
  },
  {
    path: '/contact',
    name: 'contact',
    component: Contact
  },
  {
    path: '/login',
    name: 'login',
    component: Login
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
