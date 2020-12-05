<template>
  <div class="main-page">
    <h1 class="main-page__title">Secret Santa</h1>
    <h2 class="main-page__description">
      Ощути радость подготовки сюрприза и незабываемые эмоции человека, получившего свой подарок
    </h2>
    <button class="btn main-page__btn" type="button" @click="goToLoginPage">
      Войти
    </button>
  </div>
</template>

<script>
export default {
  name: 'MainPage',
  props: {
    currentPage: String,
  },
  methods: {
    goToLoginPage() {
      this.$emit('update:current-page', 'LoginPage');
    },
  },
};
</script>
