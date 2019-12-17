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
  background-color: red;
  width: 100%;
  height: 500px;
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
    let w = 750
    let h = 450
    let r = 120

    let isXChecked = true
    let isYChecked = true

    let width = 300
    let height = 200
    let dragbarw = 20

    let drag = d3.behavior.drag()
      .origin(Object)
      .on('drag', dragmove)

    let dragright = d3.behavior.drag()
      .origin(Object)
      .on('drag', rdragresize)

    let dragleft = d3.behavior.drag()
      .origin(Object)
      .on('drag', ldragresize)

    let dragtop = d3.behavior.drag()
      .origin(Object)
      .on('drag', tdragresize)

    let dragbottom = d3.behavior.drag()
      .origin(Object)
      .on('drag', bdragresize)

    let svg = d3.select('.test-box').append('svg')
      .attr('width', w)
      .attr('height', h)

    let newg = svg.append('g')
      .data([{ x: width / 2, y: height / 2 }])

    let dragrect = newg.append('rect')
      .attr('id', 'active')
      .attr('x', function (d: any) { return d.x })
      .attr('y', function (d: any) { return d.y })
      .attr('height', height)
      .attr('width', width)
      .attr('fill-opacity', 0.5)
      .attr('cursor', 'move')
      .call(drag)

    let dragbarleft = newg.append('rect')
      .attr('x', function (d: any) { return d.x - (dragbarw / 2) })
      .attr('y', function (d: any) { return d.y + (dragbarw / 2) })
      .attr('height', height - dragbarw)
      .attr('id', 'dragleft')
      .attr('width', dragbarw)
      .attr('fill', 'lightblue')
      .attr('fill-opacity', 0.5)
      .attr('cursor', 'ew-resize')
      .call(dragleft)

    let dragbarright = newg.append('rect')
      .attr('x', function (d: any) { return d.x + width - (dragbarw / 2) })
      .attr('y', function (d: any) { return d.y + (dragbarw / 2) })
      .attr('id', 'dragright')
      .attr('height', height - dragbarw)
      .attr('width', dragbarw)
      .attr('fill', 'lightblue')
      .attr('fill-opacity', 0.5)
      .attr('cursor', 'ew-resize')
      .call(dragright)

    let dragbartop = newg.append('rect')
      .attr('x', function (d: any) { return d.x + (dragbarw / 2) })
      .attr('y', function (d: any) { return d.y - (dragbarw / 2) })
      .attr('height', dragbarw)
      .attr('id', 'dragleft')
      .attr('width', width - dragbarw)
      .attr('fill', 'lightgreen')
      .attr('fill-opacity', 0.5)
      .attr('cursor', 'ns-resize')
      .call(dragtop)

    let dragbarbottom = newg.append('rect')
      .attr('x', function (d: any) { return d.x + (dragbarw / 2) })
      .attr('y', function (d: any) { return d.y + height - (dragbarw / 2) })
      .attr('id', 'dragright')
      .attr('height', dragbarw)
      .attr('width', width - dragbarw)
      .attr('fill', 'lightgreen')
      .attr('fill-opacity', 0.5)
      .attr('cursor', 'ns-resize')
      .call(dragbottom)

    function dragmove (d: any) {
      if (isXChecked) {
        dragrect
          .attr('x', d.x = Math.max(0, Math.min(w - width, d3.event.x)))
        dragbarleft
          .attr('x', function (d: any) { return d.x - (dragbarw / 2) })
        dragbarright
          .attr('x', function (d: any) { return d.x + width - (dragbarw / 2) })
        dragbartop
          .attr('x', function (d: any) { return d.x + (dragbarw / 2) })
        dragbarbottom
          .attr('x', function (d: any) { return d.x + (dragbarw / 2) })
      }
      if (isYChecked) {
        dragrect
          .attr('y', d.y = Math.max(0, Math.min(h - height, d3.event.y)))
        dragbarleft
          .attr('y', function (d: any) { return d.y + (dragbarw / 2) })
        dragbarright
          .attr('y', function (d: any) { return d.y + (dragbarw / 2) })
        dragbartop
          .attr('y', function (d: any) { return d.y - (dragbarw / 2) })
        dragbarbottom
          .attr('y', function (d: any) { return d.y + height - (dragbarw / 2) })
      }
    }

    function ldragresize (d: any) {
      if (isXChecked) {
        let oldx = d.x
        // Max x on the right is x + width - dragbarw
        // Max x on the left is 0 - (dragbarw/2)
        d.x = Math.max(0, Math.min(d.x + width - (dragbarw / 2), d3.event.x))
        width = width + (oldx - d.x)
        dragbarleft
          .attr('x', function (d: any) { return d.x - (dragbarw / 2) })

        dragrect
          .attr('x', function (d: any) { return d.x })
          .attr('width', width)

        dragbartop
          .attr('x', function (d: any) { return d.x + (dragbarw / 2) })
          .attr('width', width - dragbarw)
        dragbarbottom
          .attr('x', function (d: any) { return d.x + (dragbarw / 2) })
          .attr('width', width - dragbarw)
      }
    }

    function rdragresize (d: any) {
      if (isXChecked) {
        // Max x on the left is x - width
        // Max x on the right is width of screen + (dragbarw/2)
        let dragx = Math.max(d.x + (dragbarw / 2), Math.min(w, d.x + width + d3.event.dx))

        // recalculate width
        width = dragx - d.x

        // move the right drag handle
        dragbarright
          .attr('x', function (d: any) { return dragx - (dragbarw / 2) })

        // resize the drag rectangle
        // as we are only resizing from the right, the x coordinate does not need to change
        dragrect
          .attr('width', width)
        dragbartop
          .attr('width', width - dragbarw)
        dragbarbottom
          .attr('width', width - dragbarw)
      }
    }

    function tdragresize (d: any) {
      if (isYChecked) {
        let oldy = d.y
        // Max x on the right is x + width - dragbarw
        // Max x on the left is 0 - (dragbarw/2)
        d.y = Math.max(0, Math.min(d.y + height - (dragbarw / 2), d3.event.y))
        height = height + (oldy - d.y)
        dragbartop
          .attr('y', function (d: any) { return d.y - (dragbarw / 2) })

        dragrect
          .attr('y', function (d: any) { return d.y })
          .attr('height', height)

        dragbarleft
          .attr('y', function (d: any) { return d.y + (dragbarw / 2) })
          .attr('height', height - dragbarw)
        dragbarright
          .attr('y', function (d: any) { return d.y + (dragbarw / 2) })
          .attr('height', height - dragbarw)
      }
    }

    function bdragresize (d: any, i: any) {
      console.log(i)
      if (isYChecked) {
        // Max x on the left is x - width
        // Max x on the right is width of screen + (dragbarw/2)
        let dragy = Math.max(d.y + (dragbarw / 2), Math.min(h, d.y + height + d3.event.dy))

        // recalculate width
        height = dragy - d.y

        // move the right drag handle
        dragbarbottom
          .attr('y', function (d: any) { return dragy - (dragbarw / 2) })

        // resize the drag rectangle
        // as we are only resizing from the right, the x coordinate does not need to change
        dragrect
          .attr('height', height)
        dragbarleft
          .attr('height', height - dragbarw)
        dragbarright
          .attr('height', height - dragbarw)
      }
    }
  }
}
</script>
