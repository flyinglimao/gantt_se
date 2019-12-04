<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary justify-content-between">
        <a class="navbar-brand" href="#">Project Name</a>
        <ul class="navbar-nav float-right">
            <li class="nav-item">
                <a class="nav-link" href="#">Login</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Contact Information</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Copyright/Laws</a>
            </li>
        </ul>
    </nav>
</template>

<style lang="scss" scoped>
.navbar-nav .nav-item .nav-link {
  color: white;
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Header extends Vue {
  @Prop() private msg!: string;
}
</script>
