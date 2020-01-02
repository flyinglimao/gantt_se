<template>
    <ul class="nav border-top border-bottom">
        <li class="nav-item">
            <router-link class="nav-link" to="project" active-class="active">Project</router-link>
        </li>
        <li class="nav-item">
            <router-link class="nav-link" to="task" active-class="active">Task List</router-link>
        </li>
        <li class="nav-item">
            <router-link class="nav-link" to="gantt" active-class="active">Gantt Chart</router-link>
        </li>
        <li class="nav-item">
            <a class="nav-link" @click="exportProject()">Export</a>
        </li>
    </ul>
</template>

<style lang="scss" scoped>
.nav {
    font-size: 0.8rem;
    a {
        color: black;
        &:hover {
            background: rgba(192, 192, 192, .35);
        }
        &.active {
            background: rgba(192, 192, 192, .15);
        }
    }
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { State } from 'vuex-class'

@Component
export default class Toolbars extends Vue {
  @State('projectInfo') projectInfo!: any

  exportProject () {
    let a = document.createElement('a')
    let blob = new Blob([JSON.stringify(this.projectInfo)], { type: 'application/json' })
    a.download = 'project.json'
    a.href = window.URL.createObjectURL(blob)
    a.hidden = true
    document.body.appendChild(a)
    a.click()
    a.remove()
  }
}
</script>
