<template>
  <div class="head">
    <nav>
      <router-link exact-active-class="active-link" to="/home">Dash Board</router-link>
      <router-link exact-active-class="active-link" to="/home/manager-user">Manager User</router-link>
      <router-link exact-active-class="active-link" to="/home/manager-product">Manager Product</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script setup></script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
nav {
  display: flex;
  gap: 20px;
  background-color: black;
  align-items: center;
  height: 60px;
}

a {
  text-decoration: none;
  color: white;
  margin-left: 20px;
}

router-link {
  display: flex;              /* Use flexbox */
  align-items: center;         /* Vertically center content */
  justify-content: center;     /* Horizontally center content */
  background-color: black;
  color: white;
  height: 40px;
  padding: 0 15px;
  border-radius: 5px;
  text-decoration: none;
}

.active-link {
  margin-left: 20px;
  background-color: grey;
  border-radius: 10px;
  color: black;
  width: 160px;
  height: 40px;
  text-decoration: none;
  display: flex;              /* Keep the flexbox centering for active state */
  align-items: center;
  justify-content: center;
  color: white;
}
</style>
