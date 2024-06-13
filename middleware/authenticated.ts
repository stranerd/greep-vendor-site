import { useAuthStore } from '@/store/useAuthStore';

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore();
  const authToken = useCookie('authToken');
  const refreshToken = useCookie('refreshToken');
  const { getUser, exchangeToken } = authStore;

  if (!authStore.isLoggedIn && !authToken.value && !refreshToken.value) {
    return navigateTo('/login');
  } else if (authToken.value && !authStore.isLoggedIn) {
    await getUser();
  } else if (!authToken.value && refreshToken.value) {
    await exchangeToken();
  }

  // In a real app you would probably not redirect every route to `/`
  // however it is important to check `to.path` before redirecting or you
  // might get an infinite redirect loop
  //   if (to.path !== "/") {
  //     return navigateTo("/");
  //   }

  return;
});
