import { defineStore } from "pinia";
import { API_STATES } from "~/services/constants";
import type {
  IUser,
  LoginPayload,
  SignUpPayload,
} from "~/types/modules/authModel";
import { useToast } from "@/components/library/toast/use-toast";
import { useAuthStore } from "@/store/useAuthStore";

export const useMarketPlaceStore = defineStore("marketplace", () => {
  // state variables
  const orders = [] as any[];
  const marketplaceLoadingStates = ref({
    allOrders: API_STATES.IDLE,
    createProduct: API_STATES.IDLE,
  });

  const getVendorOrders = async (payload?: any) => {
    const { $api } = useNuxtApp();
    const { toast } = useToast();

    const authStore = useAuthStore();
    marketplaceLoadingStates.value.allOrders = API_STATES.LOADING;

    const { data, error } = await $api.marketplace.getOrders({
      where: JSON.stringify([
        { field: "data.vendorId", value: authStore.user.id },
      ]),
      lazy: false,
    });

    if (error.value) {
      console.log(error.value?.data);
      toast({
        variant: "destructive",
        title: "Authorization Error",
        description: error.value?.data?.[0]?.message || "",
      });
      marketplaceLoadingStates.value.allOrders = API_STATES.ERROR;
      return { error: error.value };
    }
    if (data.value) {
      marketplaceLoadingStates.value.allOrders = API_STATES.SUCCESS;
    }
  };

  const createProduct = async (payload?: any) => {
    const { $api } = useNuxtApp();
    const { toast } = useToast();

    const authStore = useAuthStore();
    marketplaceLoadingStates.value.createProduct = API_STATES.LOADING;

    const { data, error } = await $api.marketplace.createProduct(payload);

    if (error.value) {
      console.log(error.value?.data);
      toast({
        variant: "destructive",
        title: "Authorization Error",
        description: error.value?.data?.[0]?.message || "",
      });
      marketplaceLoadingStates.value.createProduct = API_STATES.ERROR;
      return { error: error.value };
    }
    if (data.value) {
      marketplaceLoadingStates.value.createProduct = API_STATES.SUCCESS;
      console.log(data.value);
    }
  };

  return {
    marketplaceLoadingStates,
    orders,
    getVendorOrders,
    createProduct,
  };
});
