import { useAuthStore } from "~/store/auth"; // import the auth store we just created
import { storeToRefs } from "pinia"; // import storeToRefs helper hook from pinia

export default defineNuxtRouteMiddleware((to, from) => {
  const { authenticated } = storeToRefs(useAuthStore()); // make authenticated state reactive
  const token = useCookie("token"); // get token from cookies

  if (token.value) {
    // check if value exists
    authenticated.value = true; // update the state to authenticated
  }

  // if token exists and url is /login redirect to homepage
  if (token.value && to?.name === "login") {
    return navigateTo("/");
  }

  if (!token.value && to?.name === "index") {
    return navigateTo("/login");
  }

  if (
    (!token.value && to?.name === "asset") ||
    (!token.value && to?.name === "asset-edit-id") ||
    (!token.value && to?.name === "asset-type") ||
    (!token.value && to?.name === "budget-type") ||
    (!token.value && to?.name === "department-type") ||
    (!token.value && to?.name === "user")
    // ||
    // (!token.value && to?.name === "dashboard")
  ) {
    return navigateTo("/login");
  }
});
