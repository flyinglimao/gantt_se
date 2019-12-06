<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-9">
      </div>
      <div class="col-3 border-left pt-3">
        <h5>Mission Title</h5>
        <table class="table table-sm">
          <tr>
            <td>Type</td>
            <td>Some</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.row {
  height: 100%;
}
.table-sm {
  td:nth-child(1) {
    text-align: right;
    width: 20%;
  }
  td:nth-child(2) {
    text-align: left;
  }
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class TaskList extends Vue {
  @Prop() private msg!: string;
}
</script>
