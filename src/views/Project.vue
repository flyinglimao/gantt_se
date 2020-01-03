<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="top-15 col-10">
      <form role="form" class="col-8 justify-content-center" id="projectForm" v-if="projectInfo !== null">
        <h2 style="text-align: center" @click="test">Project Information</h2>
        <div class="form-group">
          <div class="row justify-content-center">
            <label for="projectname" class="col-3 right-align">ProjectName</label>
            <input type="text" class="form-control col-5" id="projectname" v-model="projectInfo.projectName" placeholder="Project Name" >
          </div>
        </div>
        <div class="form-group">
          <div class="row justify-content-center">
            <label for="start" class="col-3 right-align">Start Date</label>
            <input type="date" class="form-control col-5" id="start" v-model="projectInfo.startDate">
          </div>
        </div>
        <div class="form-group">
          <div class="row justify-content-center">
            <label for="end" class="col-3 right-align">End Date</label>
            <input type="date" class="form-control col-5" id="end" v-model="projectInfo.releaseDate">
          </div>
        </div>
        <div class="form-group">
          <div class="row justify-content-center">
            <label for="owner" class="col-3 right-align">Owner</label>
            <select class="selectpicker form-control col-5"  multiple>
              <option v-for="(member) in (projectInfo.projectOwner)" disabled id="owner" selected
              :value="member" :key="member">{{member}}</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <div class="row justify-content-center">
            <button type="button" class="btn btn-danger col-1" @click="resetProjectInfo">Cancel</button>
            <button type="button" class="btn btn-primary col-1" @click="updateProjectInfo">Save</button>
          </div>
        </div>
      </form>
      <h1 v-else-if="userInfo === null" style="text-align: center">
        Login and select a project in project list
      </h1>
      <h1 v-else style="text-align: center">
        Select a project in project list or create new project
      </h1>
    </div>

    <div class="col-2 border-left">
        <div class="btn-group-vertical w-100 mt-2">
          <button class="btn btn-outline-dark w-100" data-toggle="modal" data-target="#addNewOwnerModal" :disabled="userInfo === null || projectInfo === null">Add new owner</button>
          <button class="btn btn-outline-dark w-100" data-toggle="modal" data-target="#removeOwnerModal" :disabled="userInfo === null || projectInfo === null">Remove old owner</button>
          <button class="btn btn-outline-dark w-100" data-toggle="modal" data-target="#createProjectModal" :disabled="userInfo === null">Create new project</button>
        </div>
        <hr>
        <div class="card p-2">
          <div class="card-content" >
            <template v-if="projectList !== null && projectList !== undefined">
              <p class="font-weight-bold mb-0">Project List</p>
              <select class="selectpicker" @change="getProjectInfo($event)">
                <option style="display:none"></option>
                <option v-for="project in projectList.projectList" :selected="projectInfo !== null && projectInfo.id === project.id"
                :key="project.id" :value="project.id">
                  {{ project.projectName }}
                </option>
              </select>
            </template>
            <template v-else>
              <p class="font-weight-bold mb-0">Login to get your project list</p>
            </template>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="addNewOwnerModal" tabindex="-1" role="dialog" aria-labelledby="addNewOwnerModalLongTitle" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addNewOwnerModalTitle">Add Project Owner</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="column">
              <div class="row justify-content-center">
                <label for="addOwner" class="col-2" style="line-height: 2">Email: </label>
                <input type="email" class="form-control col-5" id="addOwner" v-model="addedOwner">
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" data-dismiss="modal" @click="addOwnerCallback">Add Owner</button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="removeOwnerModal" tabindex="-1" role="dialog" aria-labelledby="removeOwnerModalLongTitle" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="removeOwnerModalTitle">Remove Project Owner</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="column">
              <div class="row justify-content-center">
                <label for="removeOwner" class="col-2" style="line-height: 2">Email: </label>
                <input type="email" class="form-control col-5" id="removeOwner" v-model="removeOwner">
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" data-dismiss="modal" @click="removeOwnerCallback">Remove Owner</button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="createProjectModal" tabindex="-1" role="dialog" aria-labelledby="createProjectModalLongTitle" aria-hidden="true">
      <div class="modal-dialog custom-modal-body" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="createProjectModalTitle">Create Project</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="column">
              <div class="row justify-content-center">
                <label for="projectName" class="col-2" style="line-height: 2">Project Name</label>
                <input type="text" class="form-control col-5" id="projectName" v-model="createdProject.projectName" placeholder="Project Name">
              </div>
              <div class="row justify-content-center">
                <label for="startDate" class="col-2" style="line-height: 2">Start Date</label>
                <input type="date" class="form-control col-5" id="startDate" v-model="createdProject.startDate">
              </div>
              <div class="row justify-content-center">
                <label for="releaseDate" class="col-2" style="line-height: 2">Release Date</label>
                <input type="date" class="form-control col-5" id="releaseDate" v-model="createdProject.releaseDate">
              </div>

            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" data-dismiss="modal" @click="createProjectCallback()">Create</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#projectForm {
  padding-top: 1%;
  border: black solid 1px;
  margin: auto;
  height: 80%;
}
.top-15 {
  position: relative;
  top: 10%;
}

.right-align {
  text-align: right;
  padding: 0px;
  line-height: 100%;
  margin: 10px;
}

#createProjectModal {
  .custom-modal-body {
    width: 70%;
    margin: auto;
    margin-top: 5%;
    max-width: 2000px
  }
}

</style>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'
import { State } from 'vuex-class'
import store from '../store'
declare let $: any

@Component
export default class Project extends Vue {
  private initialProjectInfo: any
  private firstInit = false
  private hasUpdateOwner = false
  addedOwner = ''
  removeOwner = ''
  @State(state => state.projectInfo) projectInfo: any

  @State(state => state.user) userInfo: any
  @State(state => state.projectList) projectList: any
  currentDate:Date = new Date()
  createdProject: any = {
    projectName: '',
    projectOwner: [],
    startDate: '',
    releaseDate: '',
    taskList: [],
    teamMember: []
  }

  @Watch('projectInfo', { deep: true })
  watchProjectInfo (newVal: any, oldVal: any) {
    if (!this.firstInit) {
      this.initialProjectInfo = JSON.parse(JSON.stringify(this.projectInfo))
      this.firstInit = true
    }
  }

  @Watch('projectList', { deep: true })
  watchProjectList (value: any) {
    $('.selectpicker').selectpicker('refresh')
    let tmpEle = document.querySelectorAll('div.bootstrap-select')
    console.log(tmpEle)
    if (tmpEle.length !== 1) {
      for (let i = 0; i < tmpEle.length; i++) {
        let targetSelect = tmpEle[i].firstElementChild as HTMLElement
        if (targetSelect !== null && targetSelect.nodeName !== 'SELECT') {
          tmpEle[0].remove()
        }
      }
    }
    console.log('project.watchProjectList: ', this.projectList)
  }

  mounted () {
    $('.selectpicker').selectpicker('refresh')
    this.createdProject.projectName = ''
    this.createdProject.projectOwner = [ this.userInfo ? this.userInfo.email : null ]
    this.createdProject.startDate = this.currentDate.toJSON().substr(0, 10)
    this.createdProject.releaseDate = this.currentDate.toJSON().substr(0, 10)
  }

  updated () {
    console.log('project.updated')
    $('.selectpicker').selectpicker('refresh')
  }

  updateProjectInfo () {
    if (this.initialProjectInfo !== null) {
      this.$store.dispatch('updateProjectInfo', this.projectInfo)
      if (this.hasUpdateOwner === true) {
        let insertList: Array<string> = []
        let removeList: Array<string> = []
        console.log(this.initialProjectInfo.projectOwner, this.projectInfo.projectOwner)
        this.projectInfo.projectOwner.forEach((element: any) => {
          console.log('1', element, this.initialProjectInfo.projectOwner.indexOf(element))
          if (this.initialProjectInfo.projectOwner.indexOf(element) === -1) {
            insertList.splice(0, 0, element)
          }
        })
        this.initialProjectInfo.projectOwner.forEach((element: any) => {
          console.log('2', element, this.projectInfo.projectOwner.indexOf(element))
          if (this.projectInfo.projectOwner.indexOf(element) === -1) {
            removeList.splice(0, 0, element)
          }
        })
        console.log(insertList, removeList)
        this.$store.dispatch('updateProjectOwner', {
          id: this.projectInfo.id,
          insert: insertList,
          remove: removeList
        })

        this.hasUpdateOwner = false
      }

      this.initialProjectInfo = JSON.parse(JSON.stringify(this.projectInfo))
      alert('successfully update')
    }
  }

  resetProjectInfo () {
    this.projectInfo.startDate = this.initialProjectInfo.startDate
    this.projectInfo.releaseDate = this.initialProjectInfo.releaseDate
    this.projectInfo.projectOwner = this.initialProjectInfo.projectOwner
    this.projectInfo.projectName = this.initialProjectInfo.projectName

    console.log('project.resetProjectInfo')
    alert('successfully reset')
  }

  createProjectCallback () {
    console.log(this.createdProject)

    this.createdProject.projectOwner = [ this.userInfo ? this.userInfo.email : null ]

    this.$store.dispatch('addProjectInfo', this.createdProject).then(docRef => {
      console.log('docRef', docRef, '; created poj', this.createdProject)
      this.$store.dispatch('updateProjectOwner', {
        id: docRef.id,
        insert: [this.userInfo.email],
        remove: []
      })
      this.$store.dispatch('bindProjectList', this.userInfo.email).then(res => {

      })
    }).catch(err => {
      console.log(err)
    })

    $('#createProjectModal').modal('hide')
  }

  test () {
    console.log('project.test: ', this.initialProjectInfo)
  }

  addOwnerCallback () {
    if (this.hasUpdateOwner === false) {
      this.hasUpdateOwner = true
    }
    if (!this.projectInfo.projectOwner.includes(this.addedOwner)) {
      this.projectInfo.projectOwner.splice(this.projectInfo.projectOwner.length, 0, this.addedOwner)
    } else {
      console.log('project.addOwnerCallback: owner already exist')
    }
  }

  removeOwnerCallback () {
    if (this.hasUpdateOwner === false) {
      this.hasUpdateOwner = true
    }
    if (!this.projectInfo.projectOwner.includes(this.removeOwner)) {
      console.log('project.removeOwnerCallback: owner doesn\'t exist')
    } else {
      let index = this.projectInfo.projectOwner.indexOf(this.removeOwner)
      this.projectInfo.projectOwner.splice(index, 1)
    }
  }

  getProjectInfo (e: Event) {
    let select = e.currentTarget as HTMLSelectElement
    let projectId = select.value
    this.$store.dispatch('bindProjectInfo', projectId)
  }
}

</script>
