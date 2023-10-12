<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="header">
      <!-- <nav>
        <RouterLink class="RouterLink" to="/">Home</RouterLink>
        <RouterLink class="RouterLink" to="/login">Login</RouterLink>
      </nav> -->
  </header>
  <router-view/>
</template>

<style scoped>
.header {
  margin-bottom: 40px;
    width: 100%;
    height: 155px;
    background-image: url('./assets/bg-header-mobile.svg');
    background-size: cover;
    background-position: center;
    background-color: var(--highlight-color);
}
nav {
  width: 100%;
  font-size: 12px;
  display: flex;
  justify-content: center;
  padding-top:40px ;
  align-items: end;

}

.RouterLink {
  color: #fff;
  margin: 10px;
  padding: 10px;
  border-radius: 5px;
  text-decoration: none;
}
.RouterLink:hover{
  background-color:lightgray ;
  color: #000;
}

  /* nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;  
    padding: 1rem 0;
    margin-top: 1rem;
  } */

</style>
