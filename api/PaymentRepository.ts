const resource = "/payment";

export default () => {
  return {
    getUserWallet() {
      return useCustomFetch(`${resource}/wallets`, {
        method: "GET",
      });
    },

    getUserTransactions() {
      return useCustomFetch(`${resource}/transactions/`, {
        method: "GET",
        // query: {
        //   where: JSON.stringify([{ field: "type", value: type }]),
        //   sort: JSON.stringify([{ field: `meta.${type}`, desc: true }]),
        // },
      });
    },

    getExchangeRates() {
      return useCustomFetch(`${resource}/transactions/rates`, {
        method: "GET",
      });
    },
  };
};
