import { defineStore } from "pinia";
import router from "../router";
import axios from "axios";

export const useUserStore = defineStore(
  "user",
  {
    state: () => ({
      access_token: localStorage.getItem("access_token"),
      username: localStorage.getItem("username")
    }),
    actions: {
      async logIn(username, password) {
        await axios
          .post("/auth/login/", {
            username: username,
            password: password
          })
          .then((res) => {
            this.access_token = res.data.access_token;

            localStorage.setItem("access_token", this.access_token);

            router.push("/profile");
          });
      },
      logout() {
        localStorage.removeItem("access_token");
        this.access_token = null;
        location.replace("/login");
      },
      getMe() {
        axios
          .get("/users/me", {
            headers: {
              Authorization: `Bearer ${this.access_token}`
            }
          })
          .then((res) => {
            this.username = res.data.username;
            localStorage.setItem("username", this.username);
          })
          .catch((_) => {
            router.push("/login");
          });
      }
    }
  },
  {
    persist: true
  }
);
