import { defineStore } from "pinia";
import { API_STATES } from "~/services/constants";
import { useToast } from "@/components/library/toast/use-toast";
import { useAuthStore } from "@/store/useAuthStore";
import type { Wallet } from "~/types/modules/walletModel";

export const usePaymentStore = defineStore("payment", () => {
  // state variables

  interface ExchangeRate {
    [key: string]: number;
  }

  const wallet = ref<Wallet>();
  const transactionHistory = ref([]);
  const exchangeRates = ref<ExchangeRate>({});

  const paymentLoadingStates = ref({
    userWallet: API_STATES.IDLE,
    userTransactionsHistory: API_STATES.IDLE,
    getExchangeRates: API_STATES.IDLE,
  });

  const getUserWallet = async () => {
    const { $api } = useNuxtApp();
    const { toast } = useToast();
    paymentLoadingStates.value.userWallet = API_STATES.LOADING;

    const { data, error } = await $api.payment.getUserWallet();
    if (error.value) {
      console.log(error.value?.data);
      toast({
        variant: "destructive",
        title: "Authorization Error",
        description: error.value?.data?.[0]?.message || "",
      });
      paymentLoadingStates.value.userWallet = API_STATES.ERROR;
      return { error: error.value };
    }
    if (data.value) {
      wallet.value = data.value;
      paymentLoadingStates.value.userWallet = API_STATES.SUCCESS;
    }
  };

  const getExchangeRates = async () => {
    const { $api } = useNuxtApp();

    const { data, error } = await $api.payment.getExchangeRates();
    if (error.value) {
      console.log(error.value?.data);

      paymentLoadingStates.value.getExchangeRates = API_STATES.ERROR;
      return { error: error.value };
    }
    if (data.value) {
      exchangeRates.value = data.value;
      paymentLoadingStates.value.getExchangeRates = API_STATES.SUCCESS;
    }
  };
  const getUserTransactionHistory = async () => {
    const { user } = storeToRefs(useAuthStore());
    const { $api } = useNuxtApp();

    const { data, error } = await $api.payment.getUserTransactions();
    if (error.value) {
      console.log(error.value?.data);

      paymentLoadingStates.value.userTransactionsHistory = API_STATES.ERROR;
      return { error: error.value };
    }
    if (data.value) {
      transactionHistory.value = data.value.results;
      paymentLoadingStates.value.userTransactionsHistory = API_STATES.SUCCESS;
    }
  };

  return {
    paymentLoadingStates,

    wallet,
    getUserWallet,

    transactionHistory,
    getUserTransactionHistory,

    exchangeRates,
    getExchangeRates,
  };
});
