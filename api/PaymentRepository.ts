const resource = "/payment";

export default () => {
  return {
    getUserWallet() {
      return useCustomFetch(`${resource}/wallets`, {
        method: "GET",
      });
    },
  };
};
