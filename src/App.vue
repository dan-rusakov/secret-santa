<template>
  <div id="app">
    <div class="main">
      <div class="main__left-tree">
        <img src="./assets/img/tree.svg" alt="Новогодняя елка" class="main__left-tree-img" width="580">
      </div>
      <div class="main__inner">
        <transition name="slide-up" mode="out-in">
          <component
              :is="currentPage"
              :current-page.sync="currentPage"
              :user-is-sign-in="userIsSignIn"
          ></component>
        </transition>
      </div>
      <div class="main__right-tree">
        <img src="./assets/img/tree.svg" alt="Новогодняя елка" class="main__left-tree-img" width="639">
      </div>
    </div>
  </div>
</template>

<script>
import MainPage from './components/MainPage';
import LoginPage from './components/LoginPage';
import RegistrationPage from './components/RegistrationPage';
import BecomePage from './components/BecomePage';
import firebase from 'firebase/app';

export default {
  name: 'App',
  components: {
    MainPage,
    LoginPage,
    RegistrationPage,
    BecomePage,
  },
  data() {
    return {
      currentPage: '',
      userIsSignIn: false,
    }
  },
  mounted() {
    setTimeout(() => {
      this.currentPage = 'MainPage';
    }, 350);
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      this.userIsSignIn = !!user;
    });
    firebase.auth();
  }
};
</script>
