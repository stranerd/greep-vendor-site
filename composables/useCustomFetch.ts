export const useCustomFetch = (request: any, opts?: any) => {
  const config = useRuntimeConfig();
  const authToken = useCookie("authToken");

  return useFetch(request, {
    baseURL: config.public.baseURL,
    // onRequest({ request, options }) {
    //     // Set the request headers
    // },
    // onRequestError({ request, options, error }) {
    //     // Handle the request errors
    // },
    // onResponse({ request, response, options }) {
    //     // Process the response data
    //     return response._data
    // },
    // onResponseError({ request, response, options }) {
    //     // Handle the response errors
    // },

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
