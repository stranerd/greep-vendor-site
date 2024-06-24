export default defineNuxtRouteMiddleware(async (to, from) => {
  if (import.meta.env.DEV === true) {
    return true;
  } else return abortNavigation("Not allowed in production");
});
