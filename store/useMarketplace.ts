import { defineStore } from "pinia";
import { API_STATES } from "~/services/constants";
import { useToast } from "@/components/library/toast/use-toast";
import { useAuthStore } from "@/store/useAuthStore";
import type { IOrders, IProduct } from "~/types/modules/marketPlaceModel";

export const useMarketPlaceStore = defineStore("marketplace", () => {
  // state variables
  const orders = ref<Array<IOrders>>([]);
  const orderMeta = ref({});
  const recentOrders = ref<Array<IOrders>>([]);
  const recentOrderMeta = ref({});
  const products = ref<Array<IProduct>>([]);
  const profuctsMeta = ref({});
  const dashBoardData = ref<{ products: Array<IProduct>; stats: any }>({
    products: [],
    stats: {},
  });
  const marketplaceLoadingStates = ref({
    allOrders: API_STATES.IDLE,
    createProduct: API_STATES.IDLE,
    getProducts: API_STATES.IDLE,
    updateProduct: API_STATES.IDLE,
    recentOrders: API_STATES.IDLE,
    dashBoardData: API_STATES.IDLE,
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
        title: "Error",
        description: error.value?.data?.[0]?.message || "",
      });
      marketplaceLoadingStates.value.allOrders = API_STATES.ERROR;
      return { error: error.value };
    }
    if (data.value) {
      orders.value = data.value.results;
      orderMeta.value = data.value.pages;
      marketplaceLoadingStates.value.allOrders = API_STATES.SUCCESS;
    }
  };

  const createProduct = async (payload?: any) => {
    const { $api } = useNuxtApp();
    const { toast } = useToast();
    marketplaceLoadingStates.value.createProduct = API_STATES.LOADING;

    const { data, error } = await $api.marketplace.createProduct(payload);

    if (error.value) {
      console.log(error.value?.data);
      toast({
        variant: "destructive",
        title: "Error",
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

  const getAllProducts = async (payload: any = {}) => {
    const { $api } = useNuxtApp();
    const { toast } = useToast();
    const authStore = useAuthStore();

    marketplaceLoadingStates.value.getProducts = API_STATES.LOADING;

    const { data, error } = await $api.marketplace.getProducts({
      ...payload,
      where: JSON.stringify([{ field: "user.id", value: authStore.user.id }]),
      lazy: false,
    });

    if (error.value) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.value?.data?.[0]?.message || "",
      });
      marketplaceLoadingStates.value.getProducts = API_STATES.ERROR;
      return { error: error.value };
    }
    if (data.value) {
      marketplaceLoadingStates.value.getProducts = API_STATES.SUCCESS;
      console.log(data.value);
      products.value = data.value.results;
      profuctsMeta.value = data.value.pages;
    }
  };

  const updateProduct = async (id: any, payload: any) => {
    const { $api } = useNuxtApp();
    const { toast } = useToast();
    marketplaceLoadingStates.value.updateProduct = API_STATES.LOADING;
    const { data, error } = await $api.marketplace.updateProduct(id, payload);

    if (error.value) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.value?.data?.[0]?.message || "",
      });
      marketplaceLoadingStates.value.updateProduct = API_STATES.ERROR;
      return { error: error.value };
    }
    if (data.value) {
      marketplaceLoadingStates.value.updateProduct = API_STATES.SUCCESS;
      console.log(data.value);
      // products.value = data.value.results;
      // profuctsMeta.value = data.value.pages;
    }
  };

  const getDashboardData = async (timeRange: any) => {
    const { $api } = useNuxtApp();
    const { toast } = useToast();
    const authStore = useAuthStore();
    marketplaceLoadingStates.value.dashBoardData = API_STATES.LOADING;

    const [productsRes, statsRes] = await Promise.allSettled([
      await $api.marketplace.getProducts({
        where: JSON.stringify([{ field: "user.id", value: authStore.user.id }]),
        sort: JSON.stringify([{ field: "meta.orders", desc: true }]),
        lazy: false,
      }),
      await $api.marketplace.getOrders({
        where: JSON.stringify([
          { field: "data.vendorId", value: authStore.user.id },
          { field: "createdAt", condition: "gte", value: timeRange.start },
          { field: "createdAt", condition: "lt", value: timeRange.end },
        ]),
        lazy: false,
      }),
    ]);
    console.log({ productsRes, statsRes });
    if (productsRes?.value?.data?.value?.results) {
      dashBoardData.value.products = productsRes?.value?.data?.value?.results;
    }
    if (statsRes?.value?.data?.value) {
      console.log(statsRes?.value?.data?.value);
    }
    marketplaceLoadingStates.value.dashBoardData = API_STATES.SUCCESS;
  };

  const getRecentOrders = async (payload?: any) => {
    const { $api } = useNuxtApp();
    const { toast } = useToast();
    const authStore = useAuthStore();
    marketplaceLoadingStates.value.recentOrders = API_STATES.LOADING;

    const { data, error } = await $api.marketplace.getOrders({
      where: JSON.stringify([
        { field: "data.vendorId", value: authStore.user.id },
      ]),
      sort: JSON.stringify([{ field: "createdAt", desc: true }]),
      lazy: false,
    });

    if (error.value) {
      toast({
        variant: "destructive",
        title: "Authorization Error",
        description: error.value?.data?.[0]?.message || "",
      });
      marketplaceLoadingStates.value.recentOrders = API_STATES.ERROR;
      return { error: error.value };
    }
    if (data.value) {
      recentOrders.value = data.value.results;
      recentOrderMeta.value = data.value.pages;
      marketplaceLoadingStates.value.recentOrders = API_STATES.SUCCESS;
    }
  };

  return {
    marketplaceLoadingStates,
    orders,
    getVendorOrders,
    createProduct,
    getAllProducts,
    products,
    updateProduct,
    getRecentOrders,
    getDashboardData,
    recentOrders,
    recentOrderMeta,
    dashBoardData,
  };
});
