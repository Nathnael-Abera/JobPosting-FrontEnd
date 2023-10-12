<template>
  <main>
    <button class="tag tagb " @click="logout">logout</button>
    <Jobs />
  </main>
</template>

<script>
import Jobs from '../components/Jobs.vue';

export default {
  name: 'HomeView',
  methods: {
    navigateToLogin() {
      this.$router.push('/login');
    },
    logout() {
      localStorage.setItem('token', '');
      this.navigateToLogin();
    },
  },
  components: {
    Jobs,
  },
};
</script>
<style scoped>
.tagb{
  position: absolute;
  top: 10px;
  left: inherit;
  width: 100px;
  right: 20px;
  border: none;
}
.tagb:hover{
  background-color: black;
}
</style>