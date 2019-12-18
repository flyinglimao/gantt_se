<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-9">
        <div class="test-box" >

        </div>
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

<style lang="scss" >
.wrap{
  position: relative;
  overflow: hidden;
  margin-bottom: 1em;
}
.bar {
  background-color: navy;
  width: 2rem;
  height: auto;
  margin-right: 5px;
  float: left;
  position: relative;
  color: #fff;
  text-align: center;
  padding-top: 5px;
}
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
.test-box {
  width: 100%;
  height: 100%;
}
button {
  font-size: 1.5em; float: left;
  margin-right: 10px;
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import store from '../store/index'
declare let d3: any

@Component
export default class GanttChart extends Vue {
  @Prop() private msg!: string;
  private taskList: any[] = store.state.taskList
  firstDate!: Date
  lastDate!: Date
  mounted () {
    this.initialData()
    this.exampleChart()

    let w = 750
    let h = 750

    let svg = d3.select('.test-box').append('svg')
      .attr('width', w)
      .attr('height', h)
      .style('border', 'solid 1px black')

    let newg = svg.append('g')
    let a = (new BarChart(newg, 150, 30)).setRectProp('fill', 'green')
    let b = (new BarChart(newg, 150, 60)).setRectProp('fill', 'blue')
    let c = (new BarChart(newg, 150, 90)).setRectProp('fill', 'blown')
    let d = (new BarChart(newg, 150, 120)).setRectProp('fill', 'red')
  }

  initialData () {
    this.firstDate = new Date(this.taskList[0].start)
    this.lastDate = new Date(this.taskList[0].start)

    this.taskList.forEach((e: any) => {
      let start = new Date(e.start)
      let end = new Date(e.end)
      if (start < this.firstDate) {
        this.firstDate = start
      }

      if (end > this.lastDate) {
        this.lastDate = end
      }
    })
    console.log(this.firstDate)
    console.log(this.lastDate)
  }

  testChart () {
    let data = [1, 2, 3, 4, 5]
    let height = 250

    // nbody 與 容器
    let nbody = d3.select('div.test-box').style('width', '100%')
    let wrap = nbody.append('div')
      .classed('wrap', true)
      .style('height', height + 'px')
      .style('width', '100%')
    // render, & update
    let render = () => {
      wrap.selectAll('.bar')
        .data(data)
        .enter()
        .append('div')
        .classed('bar', true)
        .text((d: number) => {
          return d
        })
        .style(
          'top', (d: number) => {
            return (height - d * 25) + 'px'
          }
        )
        .transition()
        .style('height', (d: number) => {
          return d * 25 + 'px'
        })
    }
    // remove
    let remove = () => {
      wrap.selectAll('.bar')
        .data(data)
        .exit()
        .remove()
        .text((d: any) => {
          return d
        })
        .style({
          'height': (d: any) => {
            return d * 25 + 'px'
          },
          'top': (d: any) => {
            return (height - d * 25) + 'px'
          }
        })
    }
    // 繪製原始資料
    render()
    // 兩顆按鈕
    nbody.append('button')
      .classed('add', true)
      .text('add')
    nbody.append('button')
      .classed('remove', true)
      .text('remove')
    d3.select('.add').on('click', function () {
      data.push(Math.floor(Math.random() * 10 + 1))
      render()
    })
    d3.select('.remove').on('click', function () {
      data.pop()
      remove()
    })
  }

  exampleChart () {

  }
}

class BarChart {
  // container 高度寬度 用於邊界檢測
  w!: number
  h!: number
  // 不重要
  isXChecked!: boolean
  isYChecked!: boolean
  // Bar主體 高度寬度
  width!: number
  height!: number
  // 輔助Bar 高度
  dragbarw!: number

  // Bar主體
  dragrect!: any
  // 輔助Bar 灰色區塊
  dragbarleft!: any
  dragbarright!: any

  constructor (container: any, argX: number = -1, argY: number = -1) {
    // container 高度寬度 用於邊界檢測
    this.w = 750
    this.h = 750
    // 不重要
    this.isXChecked = true
    this.isYChecked = true
    // Bar主體 高度寬度
    this.width = 300
    this.height = 30
    // 輔助Bar 高度
    this.dragbarw = 20
    // 將Bar 放在哪一個container
    container.data([{
      x: argX === -1 ? this.width / 2 : argX,
      y: argY === -1 ? this.height / 2 : argY
    }])

    let drag = d3.behavior.drag()
      .origin(Object)
      .on('drag', this.dragmove.bind(this))

    let dragright = d3.behavior.drag()
      .origin(Object)
      .on('drag', this.rdragresize.bind(this))

    let dragleft = d3.behavior.drag()
      .origin(Object)
      .on('drag', this.ldragresize.bind(this))

    // Bar主體
    this.dragrect = container.append('rect')
      .attr('id', 'active')
      .attr('x', function (d: any) { return d.x })
      .attr('y', function (d: any) { return d.y })
      .attr('height', this.height)
      .attr('width', this.width)
      .attr('fill-opacity', 0.5)
      .attr('cursor', 'move')
      .call(drag)
    // Bar左邊灰色區塊
    this.dragbarleft = container.append('rect')
      .attr('x', (d: any) => { console.log(d); return d.x - (this.dragbarw / 2) })
      .attr('y', (d: any) => { return d.y })
      .attr('height', this.height)
      .attr('id', 'dragleft')
      .attr('width', this.dragbarw)
      .attr('fill', 'lightblue')
      .attr('fill-opacity', 0.5)
      .attr('cursor', 'ew-resize')
      .call(dragleft)
    // Bar右邊灰色區塊
    this.dragbarright = container.append('rect')
      .attr('x', (d: any) => { return d.x + this.width - (this.dragbarw / 2) })
      .attr('y', (d: any) => { return d.y })
      .attr('id', 'dragright')
      .attr('height', this.height)
      .attr('width', this.dragbarw)
      .attr('fill', 'lightblue')
      .attr('fill-opacity', 0.5)
      .attr('cursor', 'ew-resize')
      .call(dragright)
  }

  // 移動Bar callback
  private dragmove (d: any) {
    if (this.isXChecked) {
      this.dragrect
        .attr('x', d.x = Math.max(0, Math.min(this.w - this.width, d3.event.x)))
      this.dragbarleft
        .attr('x', (d: any) => { return d.x - (this.dragbarw / 2) })
      this.dragbarright
        .attr('x', (d: any) => { return d.x + this.width - (this.dragbarw / 2) })
        // dragbartop
        //   .attr('x', (d: any) => { return d.x + (this.dragbarw / 2) })
        // dragbarbottom
        //   .attr('x', (d: any) => { return d.x + (this.dragbarw / 2) })
    }
    console.log(this.h, this.height)
    if (this.isYChecked) {
      this.dragrect
        .attr('y', d.y = Math.max(0, Math.min(this.h - this.height, d3.event.y)))
      this.dragbarleft
        .attr('y', (d: any) => { return d.y })
      this.dragbarright
        .attr('y', (d: any) => { return d.y })
        // dragbartop
        //   .attr('y', (d: any) => { return d.y - (this.dragbarw / 2) })
        // dragbarbottom
        //   .attr('y', (d: any) => { return d.y + this.height - (this.dragbarw / 2) })
    }
  }

  // 伸縮Bar callback(左)
  private ldragresize (d: any) {
    if (this.isXChecked) {
      let oldx = d.x
      // Max x on the right is x + width - dragbarw
      // Max x on the left is 0 - (dragbarw/2)
      d.x = Math.max(0, Math.min(d.x + this.width - (this.dragbarw / 2), d3.event.x))
      this.width = this.width + (oldx - d.x)
      this.dragbarleft
        .attr('x', (d: any) => { return d.x - (this.dragbarw / 2) })

      this.dragrect
        .attr('x', (d: any) => { return d.x })
        .attr('width', this.width)

      // dragbartop
      //   .attr('x', (d: any) => { return d.x + (this.dragbarw / 2) })
      //   .attr('width', this.width - this.dragbarw)
      // dragbarbottom
      //   .attr('x', (d: any) => { return d.x + (this.dragbarw / 2) })
      //   .attr('width', this.width - this.dragbarw)
    }
  }

  // 伸縮Bar callback(右)
  private rdragresize (d: any) {
    if (this.isXChecked) {
      // Max x on the left is x - width
      // Max x on the right is width of screen + (dragbarw/2)
      let dragx = Math.max(d.x + (this.dragbarw / 2), Math.min(this.w, d.x + this.width + d3.event.dx))

      // recalculate width
      this.width = dragx - d.x

      // move the right drag handle
      this.dragbarright
        .attr('x', (d: any) => { return dragx - (this.dragbarw / 2) })

      // resize the drag rectangle
      // as we are only resizing from the right, the x coordinate does not need to change
      this.dragrect
        .attr('width', this.width)
        // dragbartop
        //   .attr('width', this.width - this.dragbarw)
        // dragbarbottom
        //   .attr('width', this.width - this.dragbarw)
    }
  }

  public setRectProp (prop: string, val: any) {
    this.dragrect.attr(prop, val)
    return this
  }

  // 設定Bar高度
  public setHeight (val: number) {
    this.height = val
    this.dragrect.attr('height', this.height)
    this.dragbarright.attr('height', this.height)
    this.dragbarleft.attr('height', this.height)
    return this
  }

  // 設定Bar寬度
  public setBarWidth (val: number) {
    this.height = val
    this.dragrect.attr('width', this.height)
    this.dragbarright.attr('width', this.height)
    this.dragbarleft.attr('width', this.height)
    return this
  }

  // 設定
}
</script>
