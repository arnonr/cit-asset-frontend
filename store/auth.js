import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    authenticated: false,
    loading: false,
  }),
  actions: {
    async authenticateUser({ email, password }) {
      try {
        // useFetch from nuxt 3
        const runtimeConfig = useRuntimeConfig();

        const { data, pending, error } = await useFetch(
          `${runtimeConfig.public.apiBase}/user/login`,
          {
            method: "post",
            headers: {
              "Content-Type": "application/json",
              Authorization: useCookie("token").value
                ? `Bearer ${useCookie("token").value}`
                : "",
            },
            body: {
              username: email,
              password,
            },
          }
        );

        if (error.value) {
          throw new Error(error.value.data.msg);
        }

        this.loading = pending;

        if (data.value.is_active == 0) {
          throw new Error("User is not active");
        }

        if (data.value) {
          const token = useCookie("token"); // useCookie new hook in nuxt 3
          token.value = data?.value?.token; // set token to cookie
          const user = useCookie("user");

          user.value = {
            id: data?.value?.id,
            username: data?.value?.username,
            firstname: data?.value?.name,
            surname: "", //data?.value?.profile.surname,
            //   group_id: data?.value?.profile.group_id,
            department_id: data?.value?.department_id,
            level: data?.value?.level,
            token: token,
            is_active: data?.value?.is_active,
          };

          this.authenticated = true; // set authenticated  state value to true

          return "success";
        }
      } catch (error) {
        return error;
      }
    },
    logUserOut() {
      const token = useCookie("token"); // useCookie new hook in nuxt 3
      const user = useCookie("user"); // useCookie new hook in nuxt 3
      this.authenticated = false; // set authenticated  state value to false
      token.value = null; // clear the token cookie
      user.value = null; // clear the token cookie
      console.log("Logout Success");
    },
  },
});
