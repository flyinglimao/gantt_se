<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-10">
        <form onsubmit="false">
          <input type="text" class="form-control" placeholder="Search" v-model="searchString">
          </form>
        <table class="table table-hover table-striped table-responsive">
          <thead>
            <th>#</th>
            <th>State</th>
            <th class="col">Title</th>
            <th style="min-width: 5em">Manager</th>
            <th style="min-width: 5em">Type</th>
            <th style="min-width: 8em">Start</th>
            <th style="min-width: 8em">End</th>
            <th style="min-width: 7em">Time</th>
            <th style="min-width: 3em">Progress</th>
            <th>Delete</th>
          </thead>
          <tbody @dblclick="editingCallback($event)"
                 @focusout="finishCallback($event)">
            <tr v-for="(item,index) in filteredTaskList" :key="index">
              <td class="col-dropdown"><span class="arrow"><span></span><span></span></span></td>
              <td class="col-state" @click="toggleState(item)"><span :class="'state-' + state[item.state - 1]">●</span></td>
              <td class="col-title">
                <input class="form-control" style="text-align: center;width: 100%" v-model="item.title" type="text" :id="'title' + index">
                <label :for="'title' + index" style="text-align: center;width: 100%">{{item.title}}</label>
              </td>
              <td class="col-manager">
                <select class="selectpicker" :id="'selectpicker'+index" multiple data-live-search="true" @change="updateManagers($event, index)">
                  <option v-for="(member ,index) in (projectInfo.teamMember)"
                  :value="member" :key="index"  :selected="item.managers.includes(member)">{{member}}</option>
                </select>
              </td>
              <td class="col-type">
                <input class="form-control"  v-model="item.type" type="text" :id="'type' + index">
                <label :for="'type' + index" >{{item.type}}</label>
              </td>
              <td class="col-start">
                <input class="form-control" v-model="item.start" type="date" :id="'start' + index" :max="item.end">
                <label :for="'start' + index">{{item.start}}</label>
              </td>
              <td class="col-end">
                <input class="form-control" v-model="item.end" type="date" :id="'end' + index" :min="item.start">
                <label :for="'end' + index">{{item.end}}</label>
              </td>
              <td class="col-day">
                {{ moment(item.start).to(item.end) }}
              </td>
              <td class="col-progress">
                <input class="form-control" v-model="item.progress" type="text" :id="'progress' + index">
                <label :for="'progress' + index">{{item.progress}}%</label>
              </td>
              <td class="col-del">
                <button class="text-danger delete-btn" @click="deleteTaskCallback(index)">
                  <svg class="bi bi-trash-fill" width="1em" height="1em" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M15 6H5v8.5c0 .634.164 1.23.456 1.685.288.448.747.815 1.33.815h6.428c.583 0 1.042-.367 1.33-.815.292-.454.456-1.051.456-1.685V6zM8 7.5a.5.5 0 00-1 0v7a.5.5 0 001 0v-7zm2-.5a.5.5 0 01.5.5v7a.5.5 0 01-1 0v-7A.5.5 0 0110 7zm3 .5a.5.5 0 00-1 0v7a.5.5 0 001 0v-7z" clip-rule="evenodd"></path>
                    <path d="M3.5 4a1 1 0 011-1h11a1 1 0 011 1v1a1 1 0 01-1 1h-11a1 1 0 01-1-1V4z"></path>
                    <path d="M8 3a1 1 0 011-1h2a1 1 0 011 1v1H8V3z"></path>
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <button @click="createTaskCallback()" class="btn btn-light">+ Add new task/milestone</button>
      </div>
      <div class="col-2 border-left">
        <div class="btn-group-vertical w-100 mt-2">
          <button class="btn btn-outline-dark w-100">Add new member</button>
          <button class="btn btn-outline-dark w-100">Add comment</button>
          <button class="btn btn-outline-dark w-100">Add submission</button>
        </div>
        <hr>
        <div class="card p-2">
          <div class="card-content">
            <p class="font-weight-bold mb-0">Mission Content</p>
            <table class="table table-sm">
              <tr>
                <td>Total Members</td>
                <td>9</td>
              </tr>
              <tr>
                <td>Total Day Remain</td>
                <td>99</td>
              </tr>
              <tr>
                <td>Total Day Duration</td>
                <td>123</td>
              </tr>
            </table>
          </div>
        </div>
        <hr>
        <div class="card p-2">
          <div class="card-content">
            <p class="font-weight-bold mb-0">Project Information</p>
            <table class="table table-sm">
              <tr>
                <td>Total Day Elapsed</td>
                <td>9</td>
              </tr>
              <tr>
                <td>Total Day Remain</td>
                <td>99</td>
              </tr>
              <tr>
                <td>Total Day Duration</td>
                <td>123</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.row {
  height: 100%;
}
.row > div {
  padding-top: 8px;
}
.arrow {
  width: .75rem;
  height: .75rem;
  display: inline-block;
  position: relative;
  margin: 0 .25rem;
  span {
    top: .25rem;
    position: absolute;
    width: .45rem;
    height: .06rem;
    background-color: black;
    display: inline-block;
    transition: all .2s ease;
    &:first-of-type {
      left: 0;
      transform: rotate(45deg);
    }
    &:last-of-type {
      right: 0;
      transform: rotate(-45deg);
    }
  }
  &.active{
    span{
      &:first-of-type{
        transform: rotate(-45deg);
      }
      &:last-of-type{
        transform: rotate(45deg);
      }
    }
  }
}
.delete-btn {
  border: none;
  background: none;
}
td:not(:nth-child(3)), th {
  text-align: center;
}
.table-sm {
  font-size: 0.7rem;
  td:nth-child(1) {
    text-align: right;
    width: 10rem;
  }
  td:nth-child(2) {
    text-align: left;
  }
}
.state-good {
  color: lightgreen;
}
.state-warn {
  color: lightsalmon;
}
.state-bad {
  color: red;
}
input {
  height: 100%;
  width: 100%;
}
td input {
  display: none;
}
td.editing  {
  input {
    display: inline;
  }
  label {
    display: none;
  }
}

</style>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'
import { State } from 'vuex-class'
import moment from 'moment'

declare let $: any

@Component({
})
export default class TaskList extends Vue {
  private state = ['good', 'warn', 'bad']

  @State(state => state.projectInfo.tasks) taskList!: Array<any>
  @State('projectInfo') projectInfo!: any
  private searchString: string = ''

  @Watch('taskList', { deep: true })
  updateTaskList (value: any) {
    this.$store.dispatch('updateTaskList', value)
  }

  @Watch('projectInfo', { deep: true })
  updateProjectInfo (value: any) {
    this.$store.dispatch('updateProjectInfo', value)
  }

  created () {
    // moment.locale('zh-tw')
  }

  updated () {
    $('.selectpicker').selectpicker('refresh')
  }

  get filteredTaskList () {
    if (this.searchString) {
      return this.taskList.filter(x => x.title.indexOf(this.searchString) !== -1)
    } else {
      return this.taskList
    }
  }

  moment (source: string) {
    return moment(source)
  }

  toggleState (item: any) {
    item.state = (item.state) % 3 + 1
  }

  editingCallback (e: Event) {
    let ref = e.target as HTMLElement
    if (ref.classList.contains('col-day')) return
    if (ref.nodeName === 'TD') {
      ref.classList.add('editing')
      try {
        let inputElement = ref.querySelector('input') as HTMLElement
        inputElement.focus()
      } catch (_) {}
    } else if (ref.nodeName === 'LABEL') {
      let parent = ref.parentElement as HTMLElement
      parent.classList.add('editing')

      let inputElement = parent.querySelector('input') as HTMLElement
      inputElement.focus()
    }
  }

  updateManagers (e: Event, index: number) {
    let newMembers = $(('#selectpicker' + index)).val()
    this.taskList[index].managers = newMembers
  }

  finishCallback (e: Event) {
    let target = e.target as HTMLElement
    let parent = target.parentElement as HTMLElement
    parent.classList.remove('editing')
  }

  deleteTaskCallback (index: number) {
    this.taskList.splice(index, 1)
  }

  createTaskCallback () {
    let today = new Date()
    let daystring = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`
    let task = {
      state: 1,
      title: 'new title',
      type: 'Hello',
      start: daystring,
      end: daystring,
      time: 0,
      managers: [],
      progress: 0
    }
    this.taskList.push(task)
  }
}
</script>
