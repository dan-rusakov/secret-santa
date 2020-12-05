<template>
  <div id="app">
    <div class="main">
      <div class="main__left-tree">
        <img src="./assets/img/tree.svg" alt="Новогодняя елка" class="main__left-tree-img" width="580">
      </div>
      <div class="main__inner">
        <MainPage />
      </div>
      <div class="main__right-tree">
        <img src="./assets/img/tree.svg" alt="Новогодняя елка" class="main__left-tree-img" width="639">
      </div>
    </div>
  </div>
</template>

<script>
import MainPage from './components/MainPage';

export default {
  name: 'App',
  components: {
    MainPage,
  },
};
</script>
