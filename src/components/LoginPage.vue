<template>
  <div class="login-page">
    <h2 class="login-page__title">Вход</h2>
    <form
      action="#!"
      method="post"
      class="login-page__form"
      novalidate
      @submit.prevent="submitForm"
    >
      <input
        v-model="fields.email"
        aria-label="Email"
        type="email"
        name="email"
        :class="[
          'text-input',
          'login-page__input',
          {'login-page__input--error': fields.email},
          {'shaking': fieldsErrors.email && isAnimationRunning},
        ]"
        placeholder="Email"
        autocomplete="username"
        @change="validateEmail"
      >
      <input
        v-model="fields.password"
        aria-label="Пароль"
        type="password"
        name="password"
        :class="[
          'text-input',
          'login-page__input',
          {'login-page__input--error': fields.password},
          {'shaking': fieldsErrors.password && isAnimationRunning},
        ]"
        placeholder="Пароль"
        autocomplete="current-password"
        @change="validatePassword"
      >
      <div class="login-page__action-box">
        <button
          class="btn login-page__login-btn"
          type="submit"
        >Войти</button>
        <mark class="login-page__action-mark">или</mark>
        <button
          class="btn-secondary login-page__registration-page-btn"
          type="button"
          @click="goToRegistrationPage"
        >Зарегистрироваться</button>
      </div>
    </form>
  </div>
</template>

<script>
import firebase from 'firebase/app';

export default {
  name: 'LoginPage',
  props: {
    currentPage: String,
  },
  data() {
    return {
      fields: {
        email: '',
        password: '',
      },
      fieldsErrors: {
        email: '',
        password: '',
      },
      isAnimationRunning: false,
    };
  },
  methods: {
    goToRegistrationPage() {
      this.$emit('update:current-page', 'RegistrationPage');
    },
    submitForm() {
      if (!this.validateForm()) {
        return false;
      }

      firebase.auth().signInWithEmailAndPassword(this.fields.email, this.fields.password)
        .then(() => {
          this.$emit('update:current-page', 'BecomePage');
        })
        .catch((error) => {
          alert(error.message);
        });
    },
    validateForm() {
      this.validateEmail();
      this.validatePassword();

      return !Object.values(this.fieldsErrors).some(field => field);
    },
    validateEmail() {
      if (!this.fields.email) {
        this.fieldsErrors.email = 'Поле обязательно для заполнения';
        this.isAnimationRunning = true;
      } else {
        this.fieldsErrors.email = '';
      }
    },
    validatePassword() {
      if (!this.fields.password) {
        this.fieldsErrors.password = 'Поле обязательно для заполнения';
        this.isAnimationRunning = true;
      } else {
        this.fieldsErrors.password = '';
      }
    },
  },
};
</script>
