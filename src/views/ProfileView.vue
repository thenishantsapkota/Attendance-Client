<script setup>
import axios from "axios";
import { onBeforeMount, reactive } from "vue";
import { useUserStore } from "../stores/user.store";
import NavBar from "../components/Navbar.vue";
import router from "../router";

const state = reactive({
  username: ""
});
const userStore = useUserStore();
const access_token = localStorage.getItem("access_token");

const token = userStore.access_token ?? access_token;

onBeforeMount(() => {
  axios
    .get("http://localhost:3000/users/me", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((res) => {
      state.username = res.data.username;
    }).catch(error =>{
      router.push("/login");
    });
});
</script>

<template>
  <NavBar :username="state.username" />
</template>
