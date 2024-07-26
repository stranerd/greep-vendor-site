const resource = "/notifications";

export default () => {
  return {
    sendContactMessage(payload: any) {
      return useCustomFetch(`${resource}/contact`, {
        body: payload,
        method: "POST",
      });
    },
  };
};
