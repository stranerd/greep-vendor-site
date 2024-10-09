import { defineStore } from "pinia";
import { API_STATES } from "~/services/constants";
import { useToast } from "@/components/library/toast/use-toast";
import { useAuthStore } from "@/store/useAuthStore";
import type { IOrders, IProduct } from "~/types/modules/marketPlaceModel";

export const useMarketPlaceStore = defineStore(
  "marketplace",
  () => {
    // state variables
    const orders = ref<Array<IOrders>>([]);
    const orderMeta = ref({});
    const recentOrders = ref<Array<IOrders>>([]);
    const recentOrderMeta = ref({});
    const menuOrders = ref([]);
    const singleMenuOrder = ref();
    const singleOrder = ref<IOrders>();
    const products = ref<Array<IProduct>>([]);
    const productsMeta = ref({});
    const vendorProductTags = ref<any[]>([]);
    const singleProduct = ref<IProduct>();
    const promotions = ref([]);
    const productFoodsTags = ref<{ id: string; title: string }[]>([]);
    const productItemsTags = ref<{ id: string; title: string }[]>([]);

    const recommendedTags = ref<any[]>([]);
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
      getRecommendedProductsTags: API_STATES.IDLE,
      getRecommendedFoodsTags: API_STATES.IDLE,
      getVendorProductTags: API_STATES.IDLE,
      createProductCategory: API_STATES.IDLE,
      createPromotion: API_STATES.IDLE,
      getAllPromotions: API_STATES.IDLE,
    });

    const currentCart = ref({});

    const productFoodTagItems = computed(() => productFoodsTags.value);

    const getVendorOrders = async (payload?: any) => {
      const { $api } = useNuxtApp();
      const { toast } = useToast();

      const authStore = useAuthStore();
      marketplaceLoadingStates.value.allOrders = API_STATES.LOADING;

      const { data, error } = await $api.marketplace.getOrders({
        where: JSON.stringify([
          { field: "data.vendorId", value: authStore.user.id },
        ]),
        sort: JSON.stringify([{ field: "createdAt", desc: true }]),
        ...payload,
        limit: 20,
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
        orderMeta.value = { ...data.value.pages, ...data.value.docs };
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
        await getAllProducts();
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
        await getVendorProductTags();
        marketplaceLoadingStates.value.getProducts = API_STATES.SUCCESS;
        products.value = data.value.results;
        productsMeta.value = { ...data.value.pages, ...data.value.docs };
      }
    };

    const getRecommendedProductsTags = async () => {
      const { $api } = useNuxtApp();
      const { toast } = useToast();

      marketplaceLoadingStates.value.getRecommendedProductsTags =
        API_STATES.LOADING;
      const { data, error } = await $api.marketplace.getRecommendedTags({
        limit: 100,
      });

      if (error.value) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.value?.data?.[0]?.message || "",
        });
        marketplaceLoadingStates.value.getRecommendedProductsTags =
          API_STATES.ERROR;
        return { error: error.value };
      }
      if (data.value) {
        marketplaceLoadingStates.value.getRecommendedProductsTags =
          API_STATES.SUCCESS;
        recommendedTags.value = data.value.results;
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
        marketplaceLoadingStates.value.searchVendorProducts =
          API_STATES.SUCCESS;
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
        currentCart.value?.id,
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
        await getAllProducts();
        // products.value = data.value.results;
        // productsMeta.value = data.value.pages;
      }
    };

    const getDashboardData = async (timeRange: any) => {
      const { $api } = useNuxtApp();
      const { toast } = useToast();
      const authStore = useAuthStore();
      marketplaceLoadingStates.value.dashBoardData = API_STATES.LOADING;

      const [productsRes, statsRes] = await Promise.allSettled([
        await $api.marketplace.getProducts({
          where: JSON.stringify([
            { field: "user.id", value: authStore.user.id },
          ]),
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
        ...payload,
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
        const productIds = data.value?.data?.products?.reduce(
          (acc: any, post: any) => {
            return { ...acc, [post.id]: post };
          },
          {},
        );

        console.log({ productIds, products: data.value.products });
        const productRes = await $api.marketplace.getProducts({
          where: JSON.stringify([
            {
              field: "id",
              condition: "in",
              value: Object.keys(data.value.products),
            },
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
                quantity: productIds?.[product.id]?.quantity || 1,
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
        await getVendorOrders();
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

      const { data, error } =
        await $api.marketplace.markOrderAsShipped(payload);

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
      const router = useRouter();
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
          description: "Public cart created successfully",
        });
        marketplaceLoadingStates.value.createCartLink = API_STATES.SUCCESS;
        router.push(`/payment?id=${data.value.id}`);
        // return data.value;
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
        const productIds = data.value?.packs?.[0]?.reduce(
          (acc: any, product: any) => {
            return { ...acc, [product.id]: product };
          },
          {},
        );
        const productRes = await $api.marketplace.getProducts({
          where: JSON.stringify([
            { field: "id", condition: "in", value: Object.keys(productIds) },
          ]),
        });
        response = {
          ...data.value,
          packs: [
            [
              ...(
                productRes?.data?.value?.results || data.value?.packs?.[0]
              ).map((product: any) => {
                return {
                  ...product,
                  quantity: productIds?.[product.id]?.quantity || 1,
                };
              }),
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

    const createProductCategoryTag = async (payload: {
      title: string;
      type: "productsFoods" | "productsItems";
      photo: any;
    }) => {
      marketplaceLoadingStates.value.createProductCategory = API_STATES.LOADING;
      const { $api } = useNuxtApp();
      const { toast } = useToast();

      const { data, error } =
        await $api.interactions.createProductCategoryTag(payload);
      if (data) {
        await getProductFoodsTags();
        await getProductItemsTags();
        marketplaceLoadingStates.value.createProductCategory =
          API_STATES.SUCCESS;
        toast({
          title: "success",
          description: "Category created successfully",
        });
      }
    };

    const getProductFoodsTags = async () => {
      const { $api } = useNuxtApp();
      const { toast } = useToast();

      const { data } =
        await $api.interactions.getProductCategoryTag("productsFoods");
      marketplaceLoadingStates.value.getRecommendedFoodsTags =
        API_STATES.LOADING;
      if (data.value) {
        marketplaceLoadingStates.value.getRecommendedFoodsTags =
          API_STATES.SUCCESS;
        productFoodsTags.value = data.value?.results;
      }
    };

    const getProductItemsTags = async () => {
      const { $api } = useNuxtApp();
      const { toast } = useToast();
      const { data, error } =
        $api.interactions.getProductCategoryTag("productsItems");
      console.log({ data });
    };

    const getVendorProductTags = async () => {
      const { $api } = useNuxtApp();
      const { toast } = useToast();

      const { userProfile } = storeToRefs(useAuthStore());

      marketplaceLoadingStates.value.getVendorProductTags = API_STATES.LOADING;

      const { data, error } = await $api.interactions.getVendorProductTags(
        Object.keys(Object(userProfile.value.vendor?.tags)),
      );

      if (error.value) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.value?.data?.[0]?.message || "",
        });
        marketplaceLoadingStates.value.getVendorProductTags = API_STATES.ERROR;
        return { error: error.value };
      }
      if (data?.value?.results) {
        marketplaceLoadingStates.value.getVendorProductTags =
          API_STATES.SUCCESS;
        vendorProductTags.value = data.value?.results;
      }
    };

    const getAllPromotions = async () => {
      marketplaceLoadingStates.value.getAllPromotions = API_STATES.LOADING;
      const { $api } = useNuxtApp();
      const { toast } = useToast();
      const authStore = useAuthStore();
      marketplaceLoadingStates.value.allOrders = API_STATES.LOADING;

      // const { data, error } = await $api.marketplace.getOrders({

      // });
      const params = {
        where: JSON.stringify([
          { field: "createdBy", value: authStore.user.id },
        ]),
        sort: JSON.stringify([{ field: "createdAt", desc: true }]),
        limit: 20,
        lazy: false,
      };
      const { data, error } = await $api.marketplace.getAllPromotions(params);
      if (data && data.value?.results) {
        marketplaceLoadingStates.value.getAllPromotions = API_STATES.SUCCESS;
        promotions.value = data.value?.results;
        // toast({
        //   title: "success",
        //   description: "Promotions retrieved successfully",
        // });
      }
    };

    const createPromotion = async (payload: any) => {
      marketplaceLoadingStates.value.createPromotion = API_STATES.LOADING;
      const { $api } = useNuxtApp();
      const { toast } = useToast();

      const { data, error } = $api.marketplace.createPromotion(payload);
      if (data) {
        marketplaceLoadingStates.value.createPromotion = API_STATES.SUCCESS;
        await getAllPromotions();
        toast({
          title: "success",
          description: "Promotion created successfully",
        });
      }
    };

    const updatePromotion = async (payload: any, id: any) => {
      marketplaceLoadingStates.value.createPromotion = API_STATES.LOADING;
      const { $api } = useNuxtApp();
      const { toast } = useToast();

      const { data, error } = await $api.marketplace.updatePromotion(
        payload,
        id,
      );
      if (data) {
        marketplaceLoadingStates.value.createPromotion = API_STATES.SUCCESS;
        await getAllPromotions();
        toast({
          title: "success",
          description: "Promotion created successfully",
        });
      }
    };

    const getSinglePromotion = async (id: any) => {
      marketplaceLoadingStates.value.createPromotion = API_STATES.LOADING;
      const { $api } = useNuxtApp();
      const { toast } = useToast();

      const { data, error } = $api.marketplace.getSinglePromotion(id);
      if (data) {
        marketplaceLoadingStates.value.createPromotion = API_STATES.SUCCESS;
        toast({
          title: "success",
          description: "Promotion created successfully",
        });
      }
    };

    return {
      marketplaceLoadingStates,

      dashBoardData,
      getDashboardData,

      products,
      singleProduct,
      productsMeta,
      createProduct,
      getAllProducts,
      getSingleProduct,
      updateProduct,
      searchVendorProducts,

      orders,
      orderMeta,
      singleOrder,
      recentOrders,
      recentOrderMeta,
      getSingleOrder,
      getRecentOrders,
      getVendorOrders,
      cancelOrder,
      rejectOrAcceptOrder,
      dispatchOrder,
      markOrderAsShipped,

      currentCart,
      addToCart,
      createOrder,
      clearCart,
      createCartLink,
      getCartLinkDetails,
      checkoutCartLink,

      productFoodsTags,
      productFoodTagItems,
      recommendedTags,
      vendorProductTags,
      getVendorProductTags,
      getProductFoodsTags,
      getProductItemsTags,
      createProductCategoryTag,
      getRecommendedProductsTags,

      promotions,
      createPromotion,
      getAllPromotions,
      updatePromotion,
      getSinglePromotion,
    };
  },
  { persist: true },
);
