<script setup>
import DataTable from "../components/DataTable.vue";
import { onMounted } from "vue";
import { useUserStore } from "../stores/user.store";
import NavBar from "../components/Navbar.vue";

const userStore = useUserStore();

onMounted(() => {
  userStore.getMe();
});
</script>

<template>
  <NavBar :username="userStore.username" />
  <DataTable />
</template>
