<template>
  <pre class="home" style="padding-left: 30%">
台北總部： &#10;
10451 台北市中山區林森北路487號1樓209室7號桌 &#10;
Table. 7, Rm. 209, 1F., Ln. 487, Linsen N. Rd., Zhongshan Dist., Taipei City 104, Taiwan (R.O.C.)

Mail : ISuck59487@gmail.com
24小時不一定有接客服專線 : 897-7-55906978

高雄分部：
832 高雄市林園區安和街35號2樓
2F., No. 35, Anhe St., Linyuan Dist., Kaohsiung City 832, Taiwan (R.O.C.)

Mail : ImScatMan@gmail.com
TEL(付費電話) : (07)28545712
  </pre>
</template>

<style lang="sass" scoped>

</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import store from '../store/index'

@Component
export default class Contact extends Vue {
  @Prop() private msg!: string;
  func () {
  }
}
</script>
