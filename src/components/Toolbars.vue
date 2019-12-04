<template>
    <ul class="nav">
        <li class="nav-item">
            <a class="nav-link active" href="#">Task List</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#">Gantt Chart</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#">Save</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#">Export</a>
        </li>
    </ul>
</template>

<style lang="scss" scoped>
.nav {
    font-size: 0.8rem;
    background: rgba(192, 192, 192, .65);
    a {
        color: black;
        &:hover {
            background: rgba(192, 192, 192, .35);
        }
    }
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Toolbars extends Vue {
  @Prop() private msg!: string;
}
</script>
