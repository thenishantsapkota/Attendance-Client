<script setup>
import { onMounted } from "vue";
import { useUserStore } from "../stores/user.store";
import NavBar from "../components/Navbar.vue";
import ProfileCard from "../components/ProfileCard.vue";

const userStore = useUserStore();

onMounted(() => {
  userStore.getMe();
});
</script>

<template>
  <NavBar />
  <ProfileCard :username="userStore.username" />
</template>
