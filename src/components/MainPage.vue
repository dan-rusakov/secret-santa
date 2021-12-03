<template>
  <div class="main-page">
    <h1 class="main-page__title">Secret Santa</h1>
    <button class="btn main-page__btn" type="button" @click="beginHandler">
      Начать
    </button>
  </div>
</template>

<script>
export default {
  name: 'MainPage',
  props: {
    currentPage: String,
    userIsSignIn: Boolean,
  },
  methods: {
    beginHandler() {
      this.userIsSignIn
        ? this.$emit('update:current-page', 'BecomePage')
        : this.$emit('update:current-page', 'RegistrationPage');
    },
  },
};
</script>
