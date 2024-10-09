export const useCustomFetch = (request: any, opts?: any) => {
  const config = useRuntimeConfig();
  const authToken = useCookie("authToken");

  return useFetch(request, {
    baseURL: config.public.baseURL,

    onRequestError({ request, options, error }) {
      console.log({ error });
    },
    // immediate: true,
    // watch: true,
    ...opts,
    headers: {
      "Access-Token": authToken.value ? `${authToken.value}` : "",
      ...opts?.headers,
    },
  });
};

export const useCustomAsyncFetch = (request: any, opts?: any) => {
  const config = useRuntimeConfig();
  const authToken = useCookie("authToken");

  return $fetch(request, {
    baseURL: config.public.baseURL,
    ...opts,
    headers: {
      "Access-Token": authToken.value ? `${authToken.value}` : "",
      ...opts?.headers,
    },
  });
};
