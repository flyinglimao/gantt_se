<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="top-15 col-10">
      <form role="form" class="col-8 justify-content-center" id="projectForm" >
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
    </div>

    <div class="col-2 border-left">
        <div class="btn-group-vertical w-100 mt-2">
          <button class="btn btn-outline-dark w-100" data-toggle="modal" data-target="#addNewOwnerModal">Add new owner</button>
          <button class="btn btn-outline-dark w-100" data-toggle="modal" data-target="#createProjectModal">Create new project</button>
        </div>
        <hr>
        <div class="card p-2">
          <div class="card-content">
            <p class="font-weight-bold mb-0">Project List</p>
            <table class="table table-sm">
              <tr v-for="project in projectList.projectList" :key="project.id">
                <td>{{ project.projectName }}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>

    </div>

    <div class="modal fade" id="addNewOwnerModal" tabindex="-1" role="dialog" aria-labelledby="addNewOwnerModalLongTitle" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addNewOwnerModalTitle">Create Project</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="column">
              <div class="row justify-content-center">
                <label for="addOwner" class="col-2" style="line-height: 2">Email: </label>
                <input type="email" class="form-control col-5" id="addOwner">
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" data-dismiss="modal" @click="addOwnerCallback()">Add Owner</button>
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
declare let $: any

@Component
export default class Project extends Vue {
  private updatedProjectInfo: any
  private initialProjectInfo: any
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
  watchProjectInfo (value: any) {
    this.updatedProjectInfo = value
  }

  mounted () {
    this.initialProjectInfo = this.projectInfo
    $('.selectpicker').selectpicker('refresh')
    this.createdProject.projectName = ''
    this.createdProject.projectOwner = [ this.userInfo ? this.userInfo.email : null ]
    this.createdProject.startDate = this.currentDate.toJSON().substr(0, 10)
    this.createdProject.releaseDate = this.currentDate.toJSON().substr(0, 10)
  }

  created () {
    console.log('create')
  }

  destry () {
    console.log('destroy')
  }

  updateProjectInfo () {
    if (this.updatedProjectInfo !== null) {
      this.$store.dispatch('updateProjectInfo', this.updatedProjectInfo)
      this.initialProjectInfo = this.updatedProjectInfo
      this.updatedProjectInfo = null
      console.log('update project info')
      alert('successfully update')
    }
  }

  resetProjectInfo () {
    this.$store.dispatch('updateProjectInfo', this.initialProjectInfo)
    this.updatedProjectInfo = null
    console.log('reset project info')
    alert('successfully reset')
  }

  createProjectCallback () {
    console.log(this.createdProject)
    this.$store.dispatch('addProjectInfo', this.createdProject).then(docRef => {
      console.log('docRef.id,', docRef.id, '\nprojectName: ', docRef.projectName)

      this.createdProject.projectName = ''
      this.createdProject.projectOwner = [ this.userInfo ? this.userInfo.email : null ]
      this.createdProject.startDate = this.currentDate.toJSON().substr(0, 10)
      this.createdProject.releaseDate = this.currentDate.toJSON().substr(0, 10)
    }).catch(err => {
      console.log(err)
    })

    $('#createProjectModal').modal('hide')
  }

  test () {
    console.log(this.projectList)
  }
}

</script>
