<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-10">
        <form onsubmit="false"><input type="text" class="form-control" placeholder="Search"></form>
        <table class="table table-hover table-striped table-responsive">
          <thead>
            <th>#</th>
            <th>State</th>
            <th class="col">Title</th>
            <th>Type</th>
            <th style="min-width: 6em">Start</th>
            <th style="min-width: 6em">End</th>
            <th style="min-width: 6em">Time</th>
            <th>Progress</th>
            <th>Delete</th>
          </thead>
          <tbody>
            <tr>
              <td><span class="arrow"><span></span><span></span></span></td>
              <td><span class="state-good">●</span></td>
              <td>傑哥是在哈囉？？？</td>
              <td>Hello</td>
              <td>Dec 6</td>
              <td>Dec 12</td>
              <td>7 days</td>
              <td>87%</td>
              <td>
                <button class="text-danger delete-btn">
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
        <button class="btn btn-light">+ Add new task/milestone</button>
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
</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class TaskList extends Vue {
  @Prop() private msg!: string;
}
</script>
