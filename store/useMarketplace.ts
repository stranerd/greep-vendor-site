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
  const singleOrder = ref<IOrders>();
  const products = ref<Array<IProduct>>([]);
  const profuctsMeta = ref({});
  const singleProduct = ref<any>({});
  const dashBoardData = ref<{ products: Array<IProduct>; stats: any }>({
    products: [],
    stats: [],
  });
  const marketplaceLoadingStates = ref({
    allOrders: API_STATES.IDLE,
    createProduct: API_STATES.IDLE,
    getProducts: API_STATES.IDLE,
    getSingleProduct: API_STATES.IDLE,
    updateProduct: API_STATES.IDLE,
    recentOrders: API_STATES.IDLE,
    dashBoardData: API_STATES.IDLE,
    searchVendorProducts: API_STATES.IDLE,
    addToCart: API_STATES.IDLE,
    clearCart: API_STATES.IDLE,
    createOrder: API_STATES.IDLE,
    singleOrder: API_STATES.IDLE,
    cancelOrder: API_STATES.IDLE,
    dispatchOrder: API_STATES.IDLE,
    rejectOrAcceptOrder: API_STATES.IDLE,
    markShipped: API_STATES.IDLE,
    createCartLink: API_STATES.IDLE,
    getCartLinkDetails: API_STATES.IDLE,
    checkoutCartLink: API_STATES.IDLE,
  });

  const currentCart = ref({});

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

  const getSingleProduct = async (id: string) => {
    const { $api } = useNuxtApp();
    const { toast } = useToast();
    const authStore = useAuthStore();

    marketplaceLoadingStates.value.getSingleProduct = API_STATES.LOADING;

    const { data, error } = await $api.marketplace.getSingleProduct(id);

    if (error.value) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.value?.data?.[0]?.message || "",
      });
      marketplaceLoadingStates.value.getSingleProduct = API_STATES.ERROR;
      return { error: error.value };
    }
    if (data.value) {
      marketplaceLoadingStates.value.getSingleProduct = API_STATES.SUCCESS;
      console.log({ singleproduct: data.value });
      singleProduct.value = data.value;
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

  const searchVendorProducts = async (payload: any = {}) => {
    const { $api } = useNuxtApp();
    const { toast } = useToast();
    const authStore = useAuthStore();

    marketplaceLoadingStates.value.searchVendorProducts = API_STATES.LOADING;

    const { data, error } = await $api.marketplace.getProducts({
      ...payload,
      where: JSON.stringify([{ field: "user.id", value: authStore.user.id }]),
    });

    if (error.value) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.value?.data?.[0]?.message || "",
      });
      marketplaceLoadingStates.value.searchVendorProducts = API_STATES.ERROR;
      return { error: error.value };
    }
    if (data.value) {
      marketplaceLoadingStates.value.searchVendorProducts = API_STATES.SUCCESS;
      console.log(data.value);
      return data.value.results;
    }
  };

  const addToCart = async (payload: any) => {
    const { $api } = useNuxtApp();
    const { toast } = useToast();

    marketplaceLoadingStates.value.addToCart = API_STATES.LOADING;

    console.log({ payload });

    const { data, error } = await $api.marketplace.addItemToCart(payload);

    if (error.value) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.value?.data?.[0]?.message || "",
      });
      marketplaceLoadingStates.value.addToCart = API_STATES.ERROR;
      return { error: error.value };
    }
    if (data.value) {
      marketplaceLoadingStates.value.addToCart = API_STATES.SUCCESS;
      console.log(data.value);

      currentCart.value = data.value;
    }
  };

  const createOrder = async (payload?: any) => {
    const { $api } = useNuxtApp();
    const { toast } = useToast();
    marketplaceLoadingStates.value.createOrder = API_STATES.LOADING;

    const { data, error } = await $api.marketplace.checkoutCart(payload);

    if (error.value) {
      console.log(error.value?.data);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.value?.data?.[0]?.message || "",
      });
      marketplaceLoadingStates.value.createOrder = API_STATES.ERROR;
      return { error: error.value };
    }
    if (data.value) {
      marketplaceLoadingStates.value.createOrder = API_STATES.SUCCESS;
      console.log(data.value);
    }
  };

  const clearCart = async () => {
    const { $api } = useNuxtApp();
    const { toast } = useToast();

    marketplaceLoadingStates.value.clearCart = API_STATES.LOADING;
    const { data, error } = await $api.marketplace.clearCart(
      currentCart.value.id,
    );

    if (error.value) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.value?.data?.[0]?.message || "",
      });
      marketplaceLoadingStates.value.clearCart = API_STATES.ERROR;
      return { error: error.value };
    }
    if (data.value) {
      marketplaceLoadingStates.value.clearCart = API_STATES.SUCCESS;
      console.log(data.value);
      currentCart.value = data.value;
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
          {
            field: "createdAt",
            condition: "gte",
            value: timeRange.start.getTime(),
          },
          {
            field: "createdAt",
            condition: "lt",
            value: timeRange.end.getTime(),
          },
        ]),
        lazy: false,
      }),
    ]);
    console.log({ productsRes, statsRes });
    if (productsRes?.value?.data?.value?.results) {
      dashBoardData.value.products = productsRes?.value?.data?.value?.results;
    }
    console.log(statsRes.value.data, "stat res");

    if (statsRes?.value?.data?.value) {
      console.log(statsRes?.value?.data?.value);
      dashBoardData.value.stats = statsRes?.value?.data?.value?.results;
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
        title: "Error",
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

  const getSingleOrder = async (id: string) => {
    const { $api } = useNuxtApp();
    const { toast } = useToast();
    marketplaceLoadingStates.value.singleOrder = API_STATES.LOADING;

    const { data, error } = await $api.marketplace.getSingleOrder(id);

    if (error.value) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.value?.data?.[0]?.message || "",
      });
      marketplaceLoadingStates.value.singleOrder = API_STATES.ERROR;
      return { error: error.value };
    }
    if (data.value) {
      const producytIds = data.value?.data?.products?.reduce(
        (acc: any, post: any) => {
          return { ...acc, [post.id]: post };
        },
        {},
      );

      const productRes = await $api.marketplace.getProducts({
        where: JSON.stringify([
          { field: "id", condition: "in", value: Object.keys(producytIds) },
        ]),
      });
      singleOrder.value = {
        ...data.value,
        data: {
          ...data.value.data,
          products: (
            productRes?.data?.value?.results || data?.value?.data?.products
          ).map((product: any) => {
            return {
              ...product,
              quantity: producytIds?.[product.id]?.quantity || 1,
            };
          }),
        },
      };

      marketplaceLoadingStates.value.singleOrder = API_STATES.SUCCESS;
    }
  };

  const cancelOrder = async (id: string) => {
    const { $api } = useNuxtApp();
    const { toast } = useToast();
    marketplaceLoadingStates.value.cancelOrder = API_STATES.LOADING;

    const { data, error } = await $api.marketplace.cancelOrder(id);

    if (error.value) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.value?.data?.[0]?.message || "",
      });
      marketplaceLoadingStates.value.cancelOrder = API_STATES.ERROR;
      return { error: error.value };
    }
    if (data.value) {
      console.log(data.value);
      toast({
        title: "Success",
        description: "Order cancelled successfully",
      });
      singleOrder.value = data.value;
      marketplaceLoadingStates.value.cancelOrder = API_STATES.SUCCESS;
      return data.value;
    }
  };

  const rejectOrAcceptOrder = async (id: string, payload: any) => {
    const { $api } = useNuxtApp();
    const { toast } = useToast();
    marketplaceLoadingStates.value.rejectOrAcceptOrder = API_STATES.LOADING;

    const { data, error } = await $api.marketplace.acceptOrRejectOrder(
      id,
      payload,
    );

    if (error.value) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.value?.data?.[0]?.message || "",
      });
      marketplaceLoadingStates.value.rejectOrAcceptOrder = API_STATES.ERROR;
      return { error: error.value };
    }
    if (data.value) {
      console.log(data.value);
      toast({
        title: "Success",
        description: "Order updated successfully",
      });
      singleOrder.value = data.value;
      marketplaceLoadingStates.value.rejectOrAcceptOrder = API_STATES.SUCCESS;
      return data.value;
    }
  };

  const dispatchOrder = async (payload: any) => {
    const { $api } = useNuxtApp();
    const { toast } = useToast();
    marketplaceLoadingStates.value.dispatchOrder = API_STATES.LOADING;

    const { data, error } = await $api.marketplace.dispatchOrder(payload);

    if (error.value) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.value?.data?.[0]?.message || "",
      });
      marketplaceLoadingStates.value.dispatchOrder = API_STATES.ERROR;
      return { error: error.value };
    }
    if (data.value) {
      console.log(data.value);
      toast({
        title: "Success",
        description: "Order updated successfully",
      });
      // singleOrder.value = data.value
      marketplaceLoadingStates.value.dispatchOrder = API_STATES.SUCCESS;
      return data.value;
    }
  };

  const markOrderAsShipped = async (payload: any) => {
    const { $api } = useNuxtApp();
    const { toast } = useToast();
    marketplaceLoadingStates.value.markShipped = API_STATES.LOADING;

    const { data, error } = await $api.marketplace.markOrderAsShipped(payload);

    if (error.value) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.value?.data?.[0]?.message || "",
      });
      marketplaceLoadingStates.value.markShipped = API_STATES.ERROR;
      return { error: error.value };
    }
    if (data.value) {
      console.log(data.value);
      toast({
        title: "Success",
        description: "Order updated successfully",
      });
      marketplaceLoadingStates.value.markShipped = API_STATES.SUCCESS;
      return data.value;
    }
  };

  const createCartLink = async (payload: any) => {
    const { $api } = useNuxtApp();
    const { toast } = useToast();
    marketplaceLoadingStates.value.createCartLink = API_STATES.LOADING;

    const { data, error } = await $api.marketplace.createCartLink(payload);

    if (error.value) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.value?.data?.[0]?.message || "",
      });
      marketplaceLoadingStates.value.createCartLink = API_STATES.ERROR;
      return { error: error.value };
    }
    if (data.value) {
      console.log(data.value);
      toast({
        title: "Success",
        description: "Order updated successfully",
      });
      marketplaceLoadingStates.value.createCartLink = API_STATES.SUCCESS;
      return data.value;
    }
  };

  const getCartLinkDetails = async (id: string) => {
    const { $api } = useNuxtApp();
    const { toast } = useToast();
    marketplaceLoadingStates.value.getCartLinkDetails = API_STATES.LOADING;

    const { data, error } = await $api.marketplace.getCartLink(id);

    if (error.value) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.value?.data?.[0]?.message || "",
      });
      marketplaceLoadingStates.value.getCartLinkDetails = API_STATES.ERROR;
      return { error: error.value };
    }
    if (data.value) {
      let response = {} as any;
      const producytIds = data.value?.packs?.[0]?.reduce(
        (acc: any, product: any) => {
          return { ...acc, [product.id]: product };
        },
        {}
      );
      const productRes = await $api.marketplace.getProducts({
        where: JSON.stringify([
          { field: "id", condition: "in", value: Object.keys(producytIds) },
        ]),
      });
      response = {
        ...data.value,
        packs: [
          [
            ...(productRes?.data?.value?.results || data.value?.packs?.[0]).map(
              (product: any) => {
                return {
                  ...product,
                  quantity: producytIds?.[product.id]?.quantity || 1,
                };
              }
            ),
          ],
        ],
      };
      toast({
        description: "Cart fetched successfully",
      });
      marketplaceLoadingStates.value.getCartLinkDetails = API_STATES.SUCCESS;
      return response;
    }
  };

  const checkoutCartLink = async (payload?: any) => {
    const { $api } = useNuxtApp();
    const { toast } = useToast();
    marketplaceLoadingStates.value.checkoutCartLink = API_STATES.LOADING;

    const { data, error } = await $api.marketplace.checkoutCartLink(payload);

    if (error.value) {
      console.log(error.value?.data);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.value?.data?.[0]?.message || "",
      });
      marketplaceLoadingStates.value.checkoutCartLink = API_STATES.ERROR;
      return { error: error.value };
    }
    if (data.value) {
      marketplaceLoadingStates.value.checkoutCartLink = API_STATES.SUCCESS;
      console.log(data.value);
    }
  };

  return {
    marketplaceLoadingStates,
    orders,
    getVendorOrders,
    createProduct,
    getAllProducts,
    getSingleProduct,
    singleProduct,
    products,
    updateProduct,
    getRecentOrders,
    getDashboardData,
    recentOrders,
    recentOrderMeta,
    dashBoardData,
    searchVendorProducts,
    addToCart,
    currentCart,
    clearCart,
    createOrder,
    getSingleOrder,
    singleOrder,
    cancelOrder,
    rejectOrAcceptOrder,
    dispatchOrder,
    markOrderAsShipped,
    createCartLink,
    getCartLinkDetails,
    checkoutCartLink,
  };
});
