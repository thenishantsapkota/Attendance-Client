import { defineStore } from "pinia";
import router from "../router";
import axios from "axios";

export const useUserStore = defineStore(
  "user",
  {
    state: () => ({
      access_token: null
    }),
    actions: {
      async logIn(username, password) {
        await axios
          .post("http://localhost:3000/auth/login/", {
            username: username,
            password: password
          })
          .then((res) => {
            this.access_token = res.data.access_token;

            localStorage.setItem("access_token", this.access_token);

            router.push("/me");
          });
      },
      logout() {
        localStorage.removeItem("access_token");
        this.access_token = null;
      }
    }
  },
  {
    persist: true
  }
);
