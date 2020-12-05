<template>
  <div class="become-page">
    <h2 class="become-page__title">Наши Санты</h2>
    <ul class="become-page__santa-list" v-if="santa.length">
      <li
          class="become-page__santa-item"
          v-for="(user, index) in santa"
          :key="index"
      >
        <svg class="become-page__santa-item-icon" width="34" height="34">
          <use xlink:href="#icon-check"></use>
        </svg>
        <p class="become-page__santa-name">
          {{ user.name }}
        </p>
      </li>
    </ul>
    <button
        class="btn become-page__btn"
        type="button"
        :disabled="btnDisabled"
        @click="becomeSanta"
    >
      Стать Сантой
    </button>

  </div>
</template>

<script>
import firebase from 'firebase/app';

export default {
  name: 'BecomePage',
  props: {
    userId: String,
  },
  data() {
    return {
      selectedGuy: null,
      btnDisabled: false,
      santa: [],
    };
  },
  methods: {
    becomeSanta() {
      this.btnDisabled = true;

      firebase.database().ref('people/').once('value').then((snapshot) => {
        const people = snapshot.val();
        const freePeople = people.filter(guy => !guy.selected);

        this.selectedGuy = freePeople[Math.floor(Math.random() * freePeople.length)];

        firebase.database().ref('people/' + this.selectedGuy.id).update({selected: true});
        firebase.database().ref('users/' + this.userId).update({isSanta: true});
      });
    },
  },
  created() {
    firebase.database().ref('users/').on('value', (snapshot) => {
      const users = snapshot.val();
      this.santa = Object.values(users).filter(user => user.isSanta);
    });
  }
}
</script>
