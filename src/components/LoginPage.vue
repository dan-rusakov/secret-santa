<template>
  <div class="login-page">
    <h2 class="login-page__title">Вход</h2>
    <form action="" method="post" class="login-page__form" novalidate>
      <input
          aria-label="Email"
          type="email"
          name="email"
          class="text-input login-page__input"
          placeholder="Email"
          autocomplete="username"
      >
      <input
          aria-label="Пароль"
          type="password"
          name="password"
          class="text-input login-page__input"
          placeholder="Пароль"
          autocomplete="current-password"
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
        >Зарегистрироваться</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
};
</script>
