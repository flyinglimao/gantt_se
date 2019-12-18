<template>
  <div class="home">
    <h5>Login view</h5>
  </div>
</template>

<style lang="sass" scoped>

</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Login extends Vue {
  @Prop() private msg!: string;
}
</script>
