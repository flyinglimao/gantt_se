<template>
  <div class="container">
    <div class="top-15 col justify-content-center">
      <h2 style="text-align: center">Project Information</h2>
      <form role="form"  style="padding-top: 30px">
        <div class="form-group col justify-content-cneter">
          <div class="row justify-content-center">
            <label for="projectname" class="col-3 right-align">ProjectName</label>
            <input type="text" class="form-control col" id="projectname" placeholder="Project Name" v-model="projectInfo.projectName">
          </div>
        </div>
        <div class="form-group">
          <div class="row justify-content-center">
            <label for="start" class="col-3 right-align">Start Date</label>
            <input type="date" class="form-control col" id="start" v-model="projectInfo.startDate">
          </div>
        </div>
        <div class="form-group">
          <div class="row justify-content-center">
            <label for="end" class="col-3 right-align">End Date</label>
            <input type="date" class="form-control col" id="end" v-model="projectInfo.releaseDate">
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.top-15 {
  position: relative;
  top: 15%;
}

.right-align {
  text-align: right;
  padding: 0px;
  line-height: 100%;
  margin: 10px;
}

</style>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'
import { State } from 'vuex-class'

@Component
export default class Project extends Vue {
  @State(state => state.projectInfo) projectInfo: any

  @Watch('projectInfo', { deep: true })
  updateProjectInfo (value: any) {
    this.$store.dispatch('updateProjectInfo', value)
  }
}

</script>
