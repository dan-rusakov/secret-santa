<template>
  <div class="become-page">
    <transition-group name="fade">
      <div
          v-if="showSelectedGuy"
          key="results-box"
          class="become-page__results-box"
      >
        <p class="become-page__selected-guy-name">{{ selectedGuy || defaultSelectedGuy }}</p>
        <img src="../assets/img/gift-box.svg" alt="" class="become-page__gift-box">
      </div>
      <div
          v-else
          key="content"
          class="become-page"
      >
        <h2 class="become-page__title">Наши Санты</h2>
        <ul class="become-page__santa-list" v-if="santa.length">
          <li
              class="become-page__santa-item"
              v-for="(user, index) in santa"
              :key="index"
          >
          <template v-if="user.isSanta">
            <svg class="become-page__santa-item-icon" width="34" height="34">
              <use xlink:href="#icon-check"></use>
            </svg>
            <p class="become-page__santa-name">
              {{ user.name }}
            </p>
          </template>
          <template v-else>
            <svg class="become-page__not-santa-item-icon" width="34" height="34">
              <use xlink:href="#icon-cross"></use>
            </svg>
            <p class="become-page__not-santa-name">
              {{ user.name }}
            </p>
          </template>
          </li>
        </ul>
        <button
            v-if="!isSanta"
            class="btn become-page__btn"
            type="button"
            :disabled="btnDisabled"
            @click="becomeSanta"
        >
          Стать Сантой
        </button>
        <button
            v-else
            class="btn become-page__btn"
            type="button"
            @click="showSelectedGuy = true"
        >
          Посмотреть результат
        </button>
      </div>
    </transition-group>
  </div>
</template>

<script>
import firebase from 'firebase/app';

export default {
  name: 'BecomePage',
  props: {
    userId: String,
    isSanta: Boolean,
    defaultSelectedGuy: String,
    santa: Array,
  },
  data() {
    return {
      selectedGuy: this.defaultSelectedGuy,
      btnDisabled: false,
      showSelectedGuy: false,
    };
  },
  watch: {
    showSelectedGuy(value) {
      if (value) {
        setTimeout(() => {
          this.showSelectedGuy = false;
        }, 5000);
      }
    },
  },
  methods: {
    becomeSanta() {
      this.btnDisabled = true;

      firebase.database().ref('people/').once('value').then((snapshot) => {
        let people = snapshot.val();
        people = people.filter(guy => guy.mail !== this.userId);
        let freePeople = people.filter(guy => !guy.selected);

        if (!freePeople.length) {
          freePeople = people;
        }

        const selectedGuyData = freePeople[Math.floor(Math.random() * freePeople.length)];
        this.selectedGuy = selectedGuyData.name;
        this.showSelectedGuy = true;

        firebase.database().ref('people/' + selectedGuyData.id).update({selected: true});
        firebase.database().ref('users/' + this.userId).update({
          isSanta: true,
          selectedGuy: selectedGuyData.name,
        });

        this.$emit('update:is-santa', true);
        this.btnDisabled = false;
      });
    },
  },
}
</script>
