<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-9" id="chart">
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
    <div class="bar" style="display: none"></div>
  </div>
</template>

<style lang="scss">
.row {
  height: 100%;
}
#chart {
  width: 100%;
  height: 100%;
  padding: 20px 20px 50px 20px;
  .label {
    display: inline-block;
    max-width: 100px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}
button {
  font-size: 1.5em; float: left;
  margin-right: 10px;
}
</style>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'
import { State } from 'vuex-class'

declare let d3: any

@Component
export default class GanttChart extends Vue {
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

  private firstDate!: Date
  private lastDate!: Date

  @Watch('taskList')
  updateChart () {
    let margin = { top: 20, right: 20, bottom: 50, left: 20 }
    let width = parseInt(d3.select('#chart').style('width')) - margin.left - margin.right
    let height = parseInt(d3.select('#chart').style('height')) - margin.top - margin.bottom

    let xScale = d3.scaleTime()
      .domain([Date.now() - 15 * 8 * 60 * 60 * 1000, Date.now() + 15 * 16 * 60 * 60 * 1000])
      .range([0, width])

    let yScale = d3.scaleLinear()
      .domain([0, height])
      .range([0, height])

    let svg = d3.select('#chart').append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')

    svg.append('g').selectAll('.line')
      .data(this.taskList)
      .enter().append('line')
      .attr('x1', 120)
      .attr('y1', (d: any, i: number) => yScale(i * 30))
      .attr('x2', width - 180)
      .attr('y2', (d: any, i: number) => yScale(i * 30))
      .attr('stroke', 'lightgray')

    svg.append('g').selectAll('.title')
      .data(this.taskList)
      .enter().append('foreignObject')
      .attr('x', 0)
      .attr('y', (d: any, i: number) => yScale(i * 30))
      .attr('width', 100)
      .attr('height', 30)
      .append('xhtml:span')
      .attr('class', 'label')
      .text((d: any) => d.title)
  }
}
</script>
