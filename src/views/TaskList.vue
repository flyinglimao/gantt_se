<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <template v-if="projectInfo !== null && projectInfo !== undefined &&
      taskList !== null && taskList !== undefined">
      <div class="col-10">
        <form onsubmit="false">
          <input type="text" class="form-control" placeholder="Search" v-model="searchString">
        </form>
        <table class="table table-striped table-responsive main-table">
          <thead>
            <th style="min-width: 2em"><input class="checkbox" type="radio" :value="'x'" name="select" checked></th>
            <th>#</th>
            <th style="min-width: 3em">State</th>
            <th class="col">Title</th>
            <th style="min-width: 5em">Manager</th>
            <th style="min-width: 5em">Type</th>
            <th style="min-width: 8em">Start</th>
            <th style="min-width: 8em">End</th>
            <th style="min-width: 8em">Time</th>
            <th style="min-width: 3em">Progress</th>
            <th>Delete</th>
          </thead>
          <tbody @dblclick="editingCallback($event)"
                 @focusout="finishCallback($event)">
            <template v-for="(item) in filteredTaskList">
            <tr :key="item.taskId" :id="item.taskId">
              <td style="min-width: 2em"><input class="checkbox" type="radio" :value="item.taskId" name="select"></td>
              <td class="col-dropdown" @click="toggleSubTable($event, item.taskId)"><span class="arrow active" :id="'span' + item.taskId" ><span></span><span></span></span></td>
              <td class="col-state noselect" @click="toggleState(item)"><span :class="'state-' + state[item.state - 1]" >●</span></td>
              <td class="col-title">
                <input class="form-control" style="text-align: center;width: 100%" v-model="item.title" type="text" :id="'title' + item.taskId">
                <label :for="'title' + item.taskId" style="text-align: center;width: 100%">{{item.title}}</label>
              </td>
              <td class="col-manager">
                <select class="selectpicker" :id="'selectpicker'+item.taskId" multiple data-live-search="true" @change="updateManagers($event, item.taskId)">
                  <option v-for="(member) in (projectInfo.teamMember)"
                  :value="member" :key="member"  :selected="item.managers.includes(member)">{{member}}</option>
                </select>
              </td>
              <td class="col-type">
                <input class="form-control"  v-model="item.type" type="text" :id="'type' + item.taskId">
                <label :for="'type' + item.taskId" >{{item.type}}</label>
              </td>
              <td class="col-start">
                <input class="form-control" v-model="item.start" type="date" :id="'start' + item.taskId" :max="item.end">
                <label :for="'start' + item.taskId">{{item.start}}</label>
              </td>
              <td class="col-end">
                <input class="form-control" v-model="item.end" type="date" :id="'end' + item.taskId" :min="item.start">
                <label :for="'end' + item.taskId">{{item.end}}</label>
              </td>
              <td class="col-day">
                {{ moment(item.end).fromNow() }}
              </td>
              <td class="col-progress">
                <input class="form-control" v-model="item.progress" type="text" :id="'progress' + item.taskId">
                <label :for="'progress' + item.taskId">{{item.progress}}%</label>
              </td>
              <td class="col-del">
                <button class="text-danger delete-btn" @click="deleteTaskCallback(item.taskId)">
                  <svg class="bi bi-trash-fill" width="1em" height="1em" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M15 6H5v8.5c0 .634.164 1.23.456 1.685.288.448.747.815 1.33.815h6.428c.583 0 1.042-.367 1.33-.815.292-.454.456-1.051.456-1.685V6zM8 7.5a.5.5 0 00-1 0v7a.5.5 0 001 0v-7zm2-.5a.5.5 0 01.5.5v7a.5.5 0 01-1 0v-7A.5.5 0 0110 7zm3 .5a.5.5 0 00-1 0v7a.5.5 0 001 0v-7z" clip-rule="evenodd"></path>
                    <path d="M3.5 4a1 1 0 011-1h11a1 1 0 011 1v1a1 1 0 01-1 1h-11a1 1 0 01-1-1V4z"></path>
                    <path d="M8 3a1 1 0 011-1h2a1 1 0 011 1v1H8V3z"></path>
                  </svg>
                </button>
              </td>
            </tr>

            <tr :key="'sub'+item.taskId" :id="'sub'+item.taskId">
              <td  colspan="11" class="sub-table">
                <table>
                  <template v-for="(subItem) in getSubTaskList(item)">
                  <tr  :key="subItem.taskId" :id="subItem.taskId">
                    <td><input class="checkbox" type="radio" name="select" :value="subItem.taskId"></td>
                    <td class="col-dropdown" @click="toggleSubSubTable($event, subItem.taskId)"><span class="arrow active"><span></span><span></span></span></td>
                    <td class="col-state noselect" @click="toggleState(subItem)"><span :class="'state-' + state[subItem.state - 1]" >●</span></td>
                    <td class="col-title">
                      <input class="form-control" style="text-align: center;width: 100%" v-model="subItem.title" type="text" :id="'title' + subItem.taskId">
                      <label :for="'title' + subItem.taskId" style="text-align: center;width: 100%">{{subItem.title}}</label>
                    </td>
                    <td class="col-manager">
                      <select class="selectpicker" :id="'selectpicker' + subItem.taskId" multiple data-live-search="true" @change="updateManagers($event, subItem.taskId)">
                        <option v-for="(member) in (projectInfo.teamMember)"
                        :value="member" :key="member"  :selected="subItem.managers.includes(member)">{{member}}</option>
                      </select>
                    </td>
                    <td class="col-type">
                      <input class="form-control"  v-model="subItem.type" type="text" :id="'type' + subItem.taskId">
                      <label :for="'type' + subItem.taskId" >{{subItem.type}}</label>
                    </td>
                    <td class="col-start">
                      <input class="form-control" v-model="subItem.start" type="date" :id="'start' + subItem.taskId" :max="subItem.end">
                      <label :for="'start' + subItem.taskId">{{subItem.start}}</label>
                    </td>
                    <td class="col-end">
                      <input class="form-control" v-model="subItem.end" type="date" :id="'end' + subItem.taskId" :min="subItem.start">
                      <label :for="'end' + subItem.taskId">{{subItem.end}}</label>
                    </td>
                    <td class="col-day">
                      {{ moment(item.end).fromNow() }}
                    </td>
                    <td class="col-progress">
                      <input class="form-control" v-model="subItem.progress" type="text" :id="'progress' + subItem.taskId">
                      <label :for="'progress' + subItem.taskId">{{subItem.progress}}%</label>
                    </td>
                    <td class="col-del">
                      <button class="text-danger delete-btn" @click="deleteTaskCallback(subItem.taskId)">
                        <svg class="bi bi-trash-fill" width="1em" height="1em" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" d="M15 6H5v8.5c0 .634.164 1.23.456 1.685.288.448.747.815 1.33.815h6.428c.583 0 1.042-.367 1.33-.815.292-.454.456-1.051.456-1.685V6zM8 7.5a.5.5 0 00-1 0v7a.5.5 0 001 0v-7zm2-.5a.5.5 0 01.5.5v7a.5.5 0 01-1 0v-7A.5.5 0 0110 7zm3 .5a.5.5 0 00-1 0v7a.5.5 0 001 0v-7z" clip-rule="evenodd"></path>
                          <path d="M3.5 4a1 1 0 011-1h11a1 1 0 011 1v1a1 1 0 01-1 1h-11a1 1 0 01-1-1V4z"></path>
                          <path d="M8 3a1 1 0 011-1h2a1 1 0 011 1v1H8V3z"></path>
                        </svg>
                      </button>
                    </td>
                  </tr>

                  <tr :key="'subsub'+subItem.taskId"  :id="'subsub'+subItem.taskId">
                    <td  colspan="11" class="subsub-table">
                      <table >
                        <tr v-for="(subsubitem) in getSubSubTaskList(subItem)" :key="subsubitem.taskId">
                          <td class="col-state noselect" @click="toggleState(subsubitem)"><span :class="'state-' + state[subsubitem.state - 1]" >●</span></td>
                          <td class="col-title">
                            <input class="form-control" style="text-align: center;width: 100%" v-model="subsubitem.title" type="text" :id="'title' + subsubitem.taskId">
                            <label :for="'title' + subsubitem.taskId" style="text-align: center;width: 100%">{{subsubitem.title}}</label>
                          </td>
                          <td class="col-manager">
                            <select class="selectpicker" :id="'selectpicker' + subsubitem.taskId" multiple data-live-search="true" @change="updateManagers($event, subsubitem.taskId)">
                              <option v-for="(member) in (projectInfo.teamMember)"
                              :value="member" :key="member"  :selected="subsubitem.managers.includes(member)">{{member}}</option>
                            </select>
                          </td>
                          <td class="col-type">
                            <input class="form-control"  v-model="subsubitem.type" type="text" :id="'type' + subsubitem.taskId">
                            <label :for="'type' + subsubitem.taskId" >{{subsubitem.type}}</label>
                          </td>
                          <td class="col-start">
                            <input class="form-control" v-model="subsubitem.start" type="date" :id="'start' + subsubitem.taskId" :max="subsubitem.end">
                            <label :for="'start' + subsubitem.taskId">{{subsubitem.start}}</label>
                          </td>
                          <td class="col-end">
                            <input class="form-control" v-model="subsubitem.end" type="date" :id="'end' + subsubitem.taskId" :min="subsubitem.start">
                            <label :for="'end' + subsubitem.taskId">{{subsubitem.end}}</label>
                          </td>
                          <td class="col-day">
                            {{ moment(item.end).fromNow() }}
                          </td>
                          <td class="col-progress">
                            <input class="form-control" v-model="subsubitem.progress" type="text" :id="'progress' + subsubitem.taskId">
                            <label :for="'progress' + subsubitem.taskId">{{subsubitem.progress}}%</label>
                          </td>
                          <td class="col-del">
                            <button class="text-danger delete-btn" @click="deleteTaskCallback(subsubitem.taskId)">
                              <svg class="bi bi-trash-fill" width="1em" height="1em" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M15 6H5v8.5c0 .634.164 1.23.456 1.685.288.448.747.815 1.33.815h6.428c.583 0 1.042-.367 1.33-.815.292-.454.456-1.051.456-1.685V6zM8 7.5a.5.5 0 00-1 0v7a.5.5 0 001 0v-7zm2-.5a.5.5 0 01.5.5v7a.5.5 0 01-1 0v-7A.5.5 0 0110 7zm3 .5a.5.5 0 00-1 0v7a.5.5 0 001 0v-7z" clip-rule="evenodd"></path>
                                <path d="M3.5 4a1 1 0 011-1h11a1 1 0 011 1v1a1 1 0 01-1 1h-11a1 1 0 01-1-1V4z"></path>
                                <path d="M8 3a1 1 0 011-1h2a1 1 0 011 1v1H8V3z"></path>
                              </svg>
                            </button>
                          </td>
                        </tr>
                      </table>
                    </td>

                  </tr>
                  </template>
                </table>
              </td>
            </tr>
            </template>
          </tbody>
        </table>
        <!-- Modal -->
        <div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Add Member</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div class="column">
                  <div class="row justify-content-center">
                    <label for="addmember" class="col-2" style="line-height: 2">Name: </label>
                    <input type="text" class="form-control col-5" id="addmember">
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" data-dismiss="modal" @click="addMemberCallback()">Add Member</button>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div class="col-2 border-left">
        <div class="btn-group-vertical w-100 mt-2">
          <button class="btn btn-outline-dark w-100" data-toggle="modal" data-target="#exampleModalLong">Add new member</button>
          <button class="btn btn-outline-dark w-100" @click="addMissionCallback">Add mission</button>
          <button class="btn btn-outline-dark w-100" @click="storeTaskCallback">Store mission</button>

        </div>
        <hr>
        <div class="card p-2">
          <div class="card-content">
            <p class="font-weight-bold mb-0">Project Information</p>
            <table class="table table-sm">
              <tr>
                <td>Total Members</td>
                <td>{{ numberOfMember }}</td>
              </tr>
              <tr>
                <td>Total Day Elapsed</td>
                <td>{{ numberOfDateElapse }}</td>
              </tr>
              <tr>
                <td>Total Day Remain</td>
                <td>{{ numberOfDateRemain }}</td>
              </tr>
              <tr>
                <td>Total Day Duration</td>
                <td>{{ numberOfTotalDay }}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
      </template>
      <div v-else class="row justify-content-center align-items-center">
        <h1 @click="test(taskList);test(projectInfo)">
          Login And Select A Project In Project Page
        </h1>
      </div>

    </div>
  </div>
</template>

<style lang="scss" scoped>
.checkbox {
  display: inline !important;
  width: auto;
  height: auto;
}

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
  vertical-align: middle;
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
.main-table {
  tr:nth-child(2n-1) {
    background-color: rgba(0,0,0,.05);
  }
  tr:nth-child(4n-1) {
    background-color: rgba(0,0,0,0);
    & :hover {
      background-color: rgba(0,0,0,0);
    }
  }
  height: 80%;
  min-height: 700px;
  overflow-y: scroll;

}
.sub-table {
  table {
    float: right;
    width: 97%;
  }
  tr:nth-child(2n-1) {
    background-color: rgba(0,0,0,.05);
  }
  tr:nth-child(4n-1) {
    background-color: rgba(0,0,0,0);
  }
}

.subsub-table {
  table {
    float: right;
    width: 97%;
  }
  tr {
     background-color: rgba(0,0,0,0);
  }
  tr:nth-child(2n-1) {
    background-color: rgba(0,0,0,.05);
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
.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Opera and Firefox */
}

</style>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'
import { State } from 'vuex-class'
import moment from 'moment'
import store from '../store'

declare let $: any

@Component({
})
export default class TaskList extends Vue {
  private state = ['good', 'warn', 'bad']

  @State(state => state.projectInfo) projectInfo!: any
  @State(state => state.projectInfo.taskList) taskList!: Array<any>
  private searchString: string = ''
  private updatedProject: any = null
  private currentDate: Date = new Date()
  @Watch('projectInfo', { deep: true })
  updateProjectInfo (newVal: any) {
    this.updatedProject = newVal
  }

  // @Watch('projectInfo', { deep: true })
  // test2 (newVal: any, oldVal: any) {
  //   console.log(newVal, oldVal)
  // }

  // life hook
  updated () {
    $('.selectpicker').selectpicker('refresh')
  }

  mounted () {
    $('.selectpicker').selectpicker('refresh')
  }

  test (a: any) {
    console.log(a)
  }

  get filteredTaskList () {
    if (this.searchString) {
      return this.taskList.filter(x => x.title.indexOf(this.searchString) !== -1 && x.taskId.split('-').length === 1)
    } else {
      return this.taskList.filter(x => {
        return x.taskId.split('-').length === 1
      })
    }
  }

  get numberOfMember () {
    return this.projectInfo.teamMember.length
  }

  get numberOfDateElapse () {
    let start = new Date(this.projectInfo.startDate)
    let end = new Date()
    let result = (end.getTime() - start.getTime()) / 86400000
    return result.toFixed(0)
  }

  get numberOfDateRemain () {
    let start = new Date()
    let end = new Date(this.projectInfo.releaseDate)
    let result = (end.getTime() - start.getTime()) / 86400000
    return result.toFixed(0)
  }

  get numberOfTotalDay () {
    let start = new Date(this.projectInfo.startDate)
    let end = new Date(this.projectInfo.releaseDate)
    let result = (end.getTime() - start.getTime()) / 86400000
    return result.toFixed(0)
  }

  getSubTaskList (parentItem: any) {
    let parentId = parentItem.taskId
    return this.taskList.filter(x => {
      let arr = x.taskId.split('-')
      if (arr.length === 2 && arr[0] === parentId.toString()) {
        return true
      } else {
        return false
      }
    })
  }

  getSubSubTaskList (parentItem: any) {
    let parentId = parentItem.taskId
    return this.taskList.filter(x => {
      let arr = x.taskId.split('-')
      if (arr.length !== 3) {
        return false
      }

      let targetId = arr[0] + '-' + arr[1]
      if (arr.length === 3 && targetId === parentId.toString()) {
        return true
      }
    })
  }

  moment (source: string) {
    return moment(source)
  }

  toggleState (item: any) {
    item.state = (item.state) % 3 + 1
  }

  toggleSubTable (e: Event, taskId: string) {
    let currentTarget = e.currentTarget as HTMLElement
    let subTable = currentTarget.parentElement as HTMLElement
    subTable = subTable.parentElement as HTMLElement
    subTable = subTable.querySelector('#sub' + taskId) as HTMLElement

    if (currentTarget.nodeName === 'TD') {
      currentTarget = currentTarget.querySelector('span') as HTMLElement
    }
    currentTarget.classList.toggle('active')

    if (subTable !== null) {
      if (currentTarget.classList.contains('active') === true) {
        subTable.hidden = false
      } else {
        subTable.hidden = true
      }
    }
  }

  toggleSubSubTable (e: Event, taskId: string) {
    let currentTarget = e.currentTarget as HTMLElement
    let subTable = currentTarget.parentElement as HTMLElement
    subTable = subTable.parentElement as HTMLElement
    subTable = subTable.querySelector('#subsub' + taskId) as HTMLElement

    if (currentTarget.nodeName === 'TD') {
      currentTarget = currentTarget.querySelector('span') as HTMLElement
    }
    currentTarget.classList.toggle('active')

    if (subTable !== null) {
      if (currentTarget.classList.contains('active') === true) {
        subTable.hidden = false
      } else {
        subTable.hidden = true
      }
    }
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

  updateManagers (e: Event, taskId: number) {
    let newMembers = $(('#selectpicker' + taskId)).val()
    this.taskList.forEach(item => {
      if (item.taskId === taskId) {
        item.managers = newMembers
      }
    })
  }

  finishCallback (e: Event) {
    let target = e.target as HTMLElement
    let parent = target.parentElement as HTMLElement
    parent.classList.remove('editing')
  }

  deleteTaskCallback (taskId: string) {
    let destroyIndex = this.taskList.findIndex(item => {
      return item.taskId === taskId
    })
    this.taskList.splice(destroyIndex, 1)
  }

  addMissionCallback () {
    let input = document.querySelector('input[name="select"]:checked') as HTMLInputElement
    let parentTaskId = input.value

    let today = new Date()
    let startstring = today.toJSON().substr(0, 10)
    today.setDate(today.getDate() + 2)
    let endstring = today.toJSON().substr(0, 10)

    let newTaskId: string = ''
    let parentIdArray = parentTaskId.split('-')

    if (parentTaskId === 'x') {
      let size = this.taskList.filter((element) => {
        return element.taskId.split('-').length === 1
      }).length + 1
      newTaskId = size.toString()
    } else if (parentIdArray.length === 1) {
      let size = this.taskList.filter((element) => {
        let tmp = element.taskId.split('-')
        return tmp.length === 2 && `${tmp[0]}` === parentTaskId
      }).length + 1
      newTaskId = parentTaskId + '-' + size
    } else if (parentIdArray.length === 2) {
      let size = this.taskList.filter((element) => {
        let tmp = element.taskId.split('-')
        return tmp.length === 3 && `${tmp[0]}-${tmp[1]}` === parentTaskId
      }).length + 1
      newTaskId = parentTaskId + '-' + size
    }

    let task = {
      state: 1,
      taskId: newTaskId,
      title: 'new title',
      type: 'Hello',
      start: startstring,
      end: endstring,
      time: 0,
      managers: [],
      progress: 0
    }
    console.log(task)
    this.taskList.push(task)
  }

  addMemberCallback () {
    let input = document.querySelector('#addmember') as HTMLInputElement
    let member = input.value
    this.projectInfo.teamMember.push(member)
    input.value = ''
  }

  storeTaskCallback () {
    if (this.updatedProject !== null) {
      this.$store.dispatch('updateProjectInfo', this.updatedProject)
    }
  }
}
</script>
