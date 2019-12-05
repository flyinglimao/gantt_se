<template>
  <div id="app" class="contain-fluid">
    <Header :point="headerClickCount" :msg="'abcdefg'" @click_count="clickCountHandler" />
    <Toolbars/>
    <router-view/>
    <h2> Header Click Count: {{headerClickCount}} </h2>
  </div>
</template>

<style lang="scss">
#app {
  font-family: '微軟正黑體', 'Microsoft JhengHei', '微軟雅黑體', 'Microsoft JhengHei', '思源黑體', 'Noto Sans TC', 'NotoSans', '黑體-繁', 'Heiti TC', Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background: rgba(216, 216, 216, .35);
  height: 100vh;
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Header from '@/components/Header.vue'
import Toolbars from '@/components/Toolbars.vue'

@Component({
  components: {
    Header,
    Toolbars
  }
})
export default class App extends Vue {
  private headerClickCount: number = 0;
  public clickCountHandler (val: number) {
    this.headerClickCount = val
    console.log('the emitted value is: ' + val)
  }
}
</script>
