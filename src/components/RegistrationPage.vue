<template>
  <div class="login-page">
    <h2 class="login-page__title">Регистрация</h2>
    <form action="" method="post" class="login-page__form" novalidate>
      <input
          aria-label="Имя и фамилия"
          type="text"
          name="name"
          class="text-input registration-page__input"
          placeholder="Имя и фамилия"
          autocomplete="name"
      >
      <input
          aria-label="Email"
          type="email"
          name="email"
          class="text-input registration-page__input"
          placeholder="Email"
          autocomplete="username"
      >
      <input
          aria-label="Пароль"
          type="password"
          name="password"
          class="text-input registration-page__input"
          placeholder="Пароль"
          autocomplete="new-password"
      >
      <label class="registration-page__label">
        <input type="checkbox" class="visually-hidden registration-page__checkbox-input">
        <span class="registration-page__checkbox"></span>
        <p class="registration-page__checkbox-text">
          Я согласен подарить только хороший подарок и красиво его упаковать
        </p>
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
        >Войти</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'RegistrationPage',
}
</script>
