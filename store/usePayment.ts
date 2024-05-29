import { defineStore } from "pinia";
import { API_STATES } from "~/services/constants";
import { useToast } from "@/components/library/toast/use-toast";
import { useAuthStore } from "@/store/useAuthStore";
import type { Wallet } from "~/types/modules/walletModel";

export const usePaymentStore = defineStore("payment", () => {
  // state variables
  const wallet = ref<Wallet>();
  const paymentLoadingStates = ref({
    userWallet: API_STATES.IDLE,
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

  return {
    paymentLoadingStates,
    wallet,
    getUserWallet,
  };
});
