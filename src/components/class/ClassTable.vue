<script setup>
import axios from "axios";
import { reactive, onBeforeMount, onMounted } from "vue";
import router from "../../router";
import { useUserStore } from "../../stores/user.store";
import UpdateModal from "./ClassModal.vue";

const userStore = useUserStore();

const state = reactive({
  classes: null,
  targetEl: null,
  modal: null
});

onMounted(() => {
  state.targetEl = document.getElementById("authentication-modal");
  state.modal = new Modal(state.targetEl);
});

onBeforeMount(() => {
  axios
    .get("/class", {
      headers: {
        Authorization: `Bearer ${userStore.access_token}`
      }
    })
    .then((res) => {
      state.classes = res.data.classes;
    })
    .catch((_) => {
      router.push("/login");
    });
});
function showModal() {
  state.modal.show();
}

async function deleteClass(id) {
  await axios
    .delete(`/class/${id}/`, {
      headers: {
        Authorization: `Bearer ${userStore.access_token}`
      }
    })
    .then((res) => {
      location.reload();
    });
}
</script>

<template>
  <h4 class="text-center mt-3 text-xl text-gray-900 dark:text-white">
    Classes:
  </h4>
  <div class="flex justify-center mt-2">
    <button
      type="button"
      @click="showModal"
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >Create Class</button>
    <UpdateModal type="Create" />
  </div>
  <div class="flex justify-center mt-3">
    <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="py-3 px-6">#</th>
            <th scope="col" class="py-3 px-6">Class Name</th>
            <th scope="col" class="py-3 px-6">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            v-for="_class in state.classes"
          >
            <th
              scope="row"
              class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {{ _class.id }}
            </th>
            <td class="py-4 px-6">
              <a href="#">{{ _class.name }}</a>
            </td>
            <td class="py-4 px-6 text-right">
              <a
                href="#"
                class="font-medium text-red-600 dark:text-red-500 hover:underline"
                @click="deleteClass(_class.id)"
                >Delete</a
              >
              <!-- <a
                type="button"
                href="#"
                class="ml-2 font-medium text-blue-600 dark:text-blue-500 hover:underline"
                @click="showModal"
                data-modal-toggle="authentication-modal"
                >Edit</a
              > -->
            </td>
          </tr>
        </tbody>
      </table>
      <p
        class="text-sm text-center text-red-700 dark:text-red-500"
        v-if="state.classes.length == 0"
      >
        No Classes Found
      </p>
    </div>
  </div>
</template>
