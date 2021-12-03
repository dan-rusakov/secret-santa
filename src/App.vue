<template>
  <div id="app">
    <div class="main">
      <div class="main__left-decor">
        <img src="./assets/img/decorations.svg" alt="Новогодний декор" class="main__left-decor-img" width="900">
      </div>
      <div class="main__inner">
        <transition name="slide-up" mode="out-in">
          <component
              :is="currentPage"
              :current-page.sync="currentPage"
              :user-is-sign-in="userIsSignIn"
              :user-id="userId"
              :is-santa.sync="isSanta"
              :default-selected-guy.sync="selectedGuy"
              :santa="santa"
          ></component>
        </transition>
      </div>
      <div class="main__right-decor">
        <img src="./assets/img/decorations.svg" alt="Новогодний декор" class="main__left-decor-img" width="900">
      </div>
      <canvas class="show-flakes" ref="showFlakes" />
    </div>
  </div>
</template>

<script>
import MainPage from './components/MainPage';
import LoginPage from './components/LoginPage';
import RegistrationPage from './components/RegistrationPage';
import BecomePage from './components/BecomePage';
import firebase from 'firebase/app';
import snowflakes from './snowflakes';

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
      userId: null,
      isSanta: false,
      selectedGuy: null,
      santa: [],
    }
  },
  mounted() {
    snowflakes({
      canvas: this.$refs.showFlakes,
    });

    setTimeout(() => {
      this.currentPage = 'MainPage';
    }, 350);
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        this.userIsSignIn = true;
        this.userId = user.email.split('@')[0].replace(/[.]/g, '');

        firebase.database().ref('users/' + this.userId).once('value').then((snapshot) => {
          const user = snapshot.val();
          this.isSanta = user.isSanta;
          this.selectedGuy = user.selectedGuy;
        });
      }
    });
    firebase.auth();

    firebase.database().ref('users/').on('value', (snapshot) => {
      const users = snapshot.val();
      this.santa = Object.values(users);
    });
  }
};
</script>
