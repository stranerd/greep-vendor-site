import createApiRepo from "../api";

export default defineNuxtPlugin((nuxtApp) => {
  const api = createApiRepo;

  return {
    provide: {
      api,
    },
  };
});
