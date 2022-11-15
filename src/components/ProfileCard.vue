<script setup>
const props = defineProps({
  username: {
    type: String,
    required: false
  }
});
</script>
<template>
  <div class="flex flex-col items-center pb-10 mt-3">
    <img
      class="mb-3 w-24 h-24 rounded-full shadow-lg"
      src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
      alt="Bonnie image"
    />
    <h6 class="text-xs text-gray-900 dark:text-white">
      You are currently logged in as:
    </h6>
    <h5 class="mb-1 text-xl font-medium text-gray-900 dark:text-white">
      {{ props.username }}
    </h5>
  </div>
</template>
