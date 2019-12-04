<template>
  <div class="home">
  </div>
</template>

<style lang="sass" scoped>

</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class TaskList extends Vue {
  @Prop() private msg!: string;
}
</script>
