<template>
    <nav class="navbar navbar-expand-lg justify-content-between">
        <a class="navbar-brand text-dark" href="#">
            <img src="../assets/logo.png" width="30" height="30">
            <span>Project Name</span>
            <span>我就爛阿</span>
        </a>
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
    color: black;
}
.navbar-brand img {
    margin-right: 4px;
}
.navbar-brand:not(:hover) span:nth-child(3) {
    display: none;
}
.navbar-brand:hover span:nth-child(2) {
    display: none;
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Header extends Vue {
  @Prop() private msg!: string;
}
</script>
