<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary justify-content-between">
        <a class="navbar-brand" href="#" :title="title" @click="clickTitle()">{{title}}</a>
        <ul class="navbar-nav float-right" >
            <li v-for="(option, index) in options" :key="index" class="nav-item" @click="option.method(index + 1)" :title="index + 1">
                <a class="nav-link" href="#">{{option.label}}</a>
            </li>
            <!-- <li v-for="(val, key, index) in me" :key="index">{{index}}. {{key}}: {{val}}</li> -->
        </ul>
    </nav>
</template>

<style lang="scss" scoped>
.navbar-nav .nav-item .nav-link {
  color: white;
}
</style>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from 'vue-property-decorator'

@Component
export default class Header extends Vue {
  @Prop(String)
  private msg!: string;

  @Prop(Number)
  private point!: number;

  @Emit('click_count')
  clickCountHandler (addVal: number) {
    return this.point + addVal
  }

  private title: string = 'Project Supervisor';
  private options: any[] = [
    { label: 'Login', url: '/', method: this.clickCountHandler },
    { label: 'Contact Information', url: '/', method: this.clickCountHandler },
    { label: 'Copyright/Laws', url: '/', method: this.clickCountHandler }
  ];
  private me: any = {
    name: 'Dale',
    age: 22,
    sex: 'male',
    height: 170
  }

  private clickTitle () {
    this.clickCountHandler(1)
  }

  @Watch('point')
  watchPoint (newVal: number, oldVal: number):void {
    console.log('oldVal: ' + oldVal + '\newVal: ' + newVal)
  }
}
</script>
