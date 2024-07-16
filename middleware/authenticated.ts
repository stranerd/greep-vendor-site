import { useAuthStore } from "@/store/useAuthStore";
import { GP_CONSTANTS } from "~/constants";
import { GP_ROUTES } from "~/constants/route-names";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore();
  const authToken = useCookie("authToken");
  const refreshToken = useCookie("refreshToken");
  const userType = JSON.parse(
    localStorage.getItem(GP_CONSTANTS.USER_TYPE) as string,
  );

  const { getUser, exchangeToken } = authStore;

  const route = useRoute();

  if (!authStore.isLoggedIn && !authToken.value && !refreshToken.value) {
    return navigateTo({ name: GP_ROUTES.LOGIN });
  } else if (authToken.value && !authStore.isLoggedIn) {
    await getUser();
  } else if (!authToken.value && refreshToken.value) {
    await exchangeToken();
  } else if (userType === null && to.name !== GP_ROUTES.VENDOR.USER_TYPE) {
    return navigateTo({ name: GP_ROUTES.VENDOR.USER_TYPE });
  }

  // In a real app you would probably not redirect every route to `/`
  // however it is important to check `to.path` before redirecting or you
  // might get an infinite redirect loop
  //   if (to.path !== "/") {
  //     return navigateTo("/");
  //   }

  return;
});
