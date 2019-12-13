<template>
  <div class="home">
    <h5>Copyright view</h5>
  </div>
</template>

<style lang="sass" scoped>

</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Copyright extends Vue {
  @Prop() private msg!: string;
}
</script>
