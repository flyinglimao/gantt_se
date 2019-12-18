<template>
  <div class="home">
    <h5 @click="func">Contact view</h5>
  </div>
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
