<template>
    <nav class="navbar navbar-expand-lg justify-content-between">
        <a class="navbar-brand text-dark" href="#">
            <img src="../assets/logo.png" width="30" height="30">
            <span>{{ projectName }}</span>
            <span>我就爛阿</span>
        </a>
        <ul class="navbar-nav float-right">
            <li class="nav-item">
              <a class="nav-link" @click="login" href="#" v-if="!displayName">Login</a>
              <a class="nav-link" href="#" v-if="displayName">{{ displayName }}</a>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="'contact'">Contact Information</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" :to="'copyright'">Copyright/Laws</router-link>
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
import firebase from 'firebase'
import { State } from 'vuex-class'
import store from '../store/index'

@Component
export default class Header extends Vue {
  @State(state => state.projectInfo.projectName) projectName: any
  @State(state => state.user.name) displayName: any

  login () {
    let fbProvider = new firebase.auth.FacebookAuthProvider()
    fbProvider.setCustomParameters({
      'display': 'popup'
    })

    firebase.auth().signInWithPopup(fbProvider).then(res => {
      window.console.log(res.user)
    })
  }
}
</script>
