<template>
  <div class="login-page">
    <h2 class="login-page__title">Регистрация</h2>
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
          'registration-page__input',
          {'registration-page__input--error': fieldsErrors.email},
          {'shaking': fieldsErrors.email && isAnimationRunning},
        ]"
        placeholder="Рабочая почта (@flagstudio)"
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
          'registration-page__input',
          {'registration-page__input--error': fieldsErrors.password},
          {'shaking': fieldsErrors.password && isAnimationRunning},
        ]"
        placeholder="Пароль"
        autocomplete="new-password"
        @change="validatePassword"
      >
      <label
          :class="['registration-page__label', {'shaking': fieldsErrors.confirmation && isAnimationRunning}]"
      >
        <input
          v-model="fields.confirmation"
          type="checkbox"
          :class="[
            'visually-hidden',
            'registration-page__checkbox-input',
          ]"
          @change="validateConfirmation"
        >
        <span class="registration-page__checkbox"></span>
        <span class="registration-page__checkbox-text">
          Я согласен подарить только хороший и красиво упакованный подарок
        </span>
      </label>
      <div class="login-page__action-box">
        <button
            class="btn registration-page__registration-btn"
            type="submit"
        >Зарегистрироваться</button>
        <mark class="login-page__action-mark">или</mark>
        <button
            class="btn-secondary login-page__registration-page-btn"
            type="button"
            @click="goToLoginPage"
        >Войти</button>
      </div>
    </form>
  </div>
</template>

<script>
import firebase from 'firebase/app'

export default {
  name: 'RegistrationPage',
  props: {
    currentPage: String,
  },
  data() {
    return {
      fields: {
        email: '',
        password: '',
        confirmation: false,
      },
      fieldsErrors: {
        email: '',
        password: '',
        confirmation: '',
      },
      isAnimationRunning: false,
    };
  },
  watch: {
    isAnimationRunning(value) {
      if (value) {
        setTimeout(() => {
          this.isAnimationRunning = false;
        }, 350);
      }
    },
  },
  methods: {
    goToLoginPage() {
      this.$emit('update:current-page', 'LoginPage');
    },
    submitForm() {
      if (!this.validateForm()) {
        return false;
      }

      firebase.database().ref('emails/').once('value')
        .then((snapshot) => {
          const emails = snapshot.val();
          
          if (!Object.values(emails).includes(this.fields.email)) {
            this.fieldsErrors.email = 'Неправильный формат';
            this.isAnimationRunning = true;

            return;
          }

          firebase.auth().createUserWithEmailAndPassword(this.fields.email, this.fields.password)
            .then(() => {
              this.$emit('update:current-page', 'BecomePage');
            })
            .catch((error) => {
              alert(error.message);
            })
        })
        .catch((error) => {
          alert(error.message);
        });

      
    },
    validateForm() {
      this.validateEmail();
      this.validatePassword();
      this.validateConfirmation();

      return !Object.values(this.fieldsErrors).some(field => field);
    },
    validateEmail() {
      if (!this.fields.email) {
        this.fieldsErrors.email = 'Поле обязательно для заполнения';
        this.isAnimationRunning = true;
      } else if (!/(@flagstudio\.ru)/.test(this.fields.email)) {
        this.fieldsErrors.email = 'Неправильный формат';
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
    validateConfirmation() {
      if (!this.fields.confirmation) {
        this.fieldsErrors.confirmation = 'Поле обязательно для заполнения';
        this.isAnimationRunning = true;
      } else {
        this.fieldsErrors.confirmation = '';
      }
    },
  },
}
</script>
