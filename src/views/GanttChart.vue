<template>
  <div class='container-fluid'>
    <div class='row'>
      <div class='col-9' id='chart'>
      </div>
      <div class='col-3 border-left pt-3'>
        <h5>{{ title }}</h5>
        <table class='table table-sm'>
          <tr>
            <td>Type</td>
            <td>{{ type }}</td>
          </tr>
          <tr>
            <td>Start</td>
            <td>{{ start }}</td>
          </tr>
          <tr>
            <td>End</td>
            <td>{{ end }}</td>
          </tr>
          <tr>
            <td>Manager</td>
            <td>{{ managers }}</td>
          </tr>
          <tr>
            <td>Progress</td>
            <td>{{ progress }}%</td>
          </tr>
        </table>
      </div>
    </div>
    <div class='bar' style='display: none'></div>
  </div>
</template>

<style lang='scss'>
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
  .resizer {
    cursor: ew-resize;
  }
}
button {
  font-size: 1.5em; float: left;
  margin-right: 10px;
}
</style>

<script lang='ts'>
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'
import { State } from 'vuex-class'

declare let d3: any

@Component
export default class GanttChart extends Vue {
  @State(state => state.projectInfo.taskList) taskList!: Array<any>
  @State('projectInfo') projectInfo!: any
  private searchString: string = ''
  private lock: boolean = false
  private type: string = ''
  private title: string = ''
  private start: string = ''
  private end: string = ''
  private managers: string = ''
  private progress: string = ''
  private xScale!: any

  @Watch('taskList', { deep: true })
  updateTaskList (value: any) {
    this.$store.dispatch('updateTaskList', value)
  }

  private firstDate!: Date
  private lastDate!: Date

  beforeRouteEnter (to: string, from: string, next: Function) {
    next((vm: any) => {
      vm.updateChart()
    })
  }

  @Watch('taskList')
  updateChart () {
    if (!this.taskList || this.lock) return
    let self = this
    function scrubTime (date: string) {
      let d = new Date(Date.parse(date))
      d.setHours(0)
      return d
    }

    function scrubTimeInvert (time: Date) {
      return time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate()
    }

    let margin = { top: 20, right: 20, bottom: 50, left: 20 }
    let width = parseInt(d3.select('#chart').style('width')) - margin.left - margin.right - 120
    let height = this.taskList.length * 30 + 80

    let xScale = this.xScale || d3.scaleTime()
      .domain([Date.now() - 8 * 86400 * 1000, Date.now() + 16 * 86400 * 1000])
      .range([0, width])

    let yScale = d3.scaleLinear()
      .domain([0, height])
      .range([0, height])

    let aAxis = d3.axisTop(xScale)
      .ticks(d3.timeDay.every(1))

    d3.select('#chart').select('svg').remove()

    let svg = d3.select('#chart').append('svg')
      .attr('width', width)
      .attr('height', height)

    let timeline = svg.append('g')
    let axis = timeline.append('g')
      .attr('transform', 'translate(120, 30)')
      .call(aAxis)

    timeline.append('g').selectAll('.line') // diviving line
      .data(this.taskList)
      .enter().append('line')
      .attr('x1', 120)
      .attr('y1', (d: any, i: number) => yScale(i * 30 + 40))
      .attr('x2', width)
      .attr('y2', (d: any, i: number) => yScale(i * 30 + 40))
      .attr('stroke', 'lightgray')

    let timelineRect = timeline.append('g').selectAll('rect') // timeline
      .data(this.taskList)
      .enter().append('rect')
      .attr('x', (d: any) => Math.max(xScale(scrubTime(d.start)) + 120, 120))
      .attr('y', (d: any, i: number) => yScale(i * 30) + 43)
      .attr('width', (d: any) => Math.max(0, xScale(scrubTime(d.end)) + 120 - Math.max(xScale(scrubTime(d.start)) + 120, 120)))
      .attr('height', (d: any) => 0.8 * yScale(30))
      .attr('style', 'fill:rgb(255, 153, 51)')

    timelineRect.each(function (this: HTMLElement, d: any) {
      let refer = d3.select(this)
      let parent = d3.select(this.parentElement)

      let left = parent.append('line')
        .attr('class', 'resizer')
        .attr('x1', refer.attr('x'))
        .attr('x2', refer.attr('x'))
        .attr('y1', refer.attr('y'))
        .attr('y2', +refer.attr('y') + 24)
        .attr('stroke', 'lightgray')
        .attr('stroke-width', 4)
        .call(d3.drag()
          .container(svg.node())
          .subject(function () {
            return { x: d3.event.x, y: d3.event.y }
          })
          .on('start', () => { self.lock = true })
          .on('drag', function (this: HTMLElement, d: any) {
            let x = Math.min(Math.max(d3.event.x, 120), +refer.attr('x') + +refer.attr('width'))
            refer.attr('width', +refer.attr('width') + +refer.attr('x') - x)
            refer.attr('x', x)
            d3.select(this).attr('x1', x)
            d3.select(this).attr('x2', x)
          })
          .on('end', () => {
            d.start = scrubTimeInvert(xScale.invert(+refer.attr('x') - 120))
            self.lock = false
            self.updateChart()
          })
        )

      parent.append('line')
        .attr('class', 'resizer')
        .attr('x1', +refer.attr('x') + +refer.attr('width'))
        .attr('x2', +refer.attr('x') + +refer.attr('width'))
        .attr('y1', refer.attr('y'))
        .attr('y2', +refer.attr('y') + 24)
        .attr('stroke', 'lightgray')
        .attr('stroke-width', 4)
        .call(d3.drag()
          .container(svg.node())
          .subject(function () {
            return { x: d3.event.x, y: d3.event.y }
          })
          .on('start', () => { self.lock = true })
          .on('drag', function (this: HTMLElement, d: any) {
            d3.event.stopPropagation()
            let x = Math.min(Math.max(d3.event.x, +refer.attr('x')), width)
            refer.attr('width', x - +refer.attr('x'))
            d3.select(this).attr('x1', x)
            d3.select(this).attr('x2', x)
          })
          .on('end', () => {
            d.end = scrubTimeInvert(xScale.invert(+refer.attr('x') + +refer.attr('width') - 120))
            self.lock = false
            self.updateChart()
          })
        )
    })

    let labels = svg.append('g')
    labels.selectAll('.title') // task label
      .data(this.taskList)
      .enter().append('foreignObject')
      .attr('x', 0)
      .attr('y', (d: any, i: number) => yScale(i * 30 + 40))
      .attr('width', 100)
      .attr('height', 30)
      .append('xhtml:span')
      .attr('class', 'label')
      .text((d: any) => d.title)
      .on('click', (d: any) => {
        self.title = d.title
        self.type = d.type
        self.start = d.start
        self.end = d.end
        self.managers = d.managers.join(',')
        self.progress = d.progress
      })

    labels.append('line')
      .attr('x1', 105)
      .attr('y1', 40)
      .attr('x2', 105)
      .attr('y2', height)
      .attr('stroke', 'lightgray')

    let x, y, s
    svg.call(d3.zoom()
      .scaleExtent([0.1, 10])
      .extent([[0, 0], [width, height]])
      .on('zoom', function () {
        self.xScale = d3.event.transform.rescaleX(xScale)
        self.updateChart()
      }))

    svg.call(d3.drag()
      .container(svg.node())
      .on('drag', function (this: HTMLElement, d: any) {
        console.log(d)
      })
    )
  }
}
</script>
