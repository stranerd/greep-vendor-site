import type { LoginPayload, SignUpPayload } from "~/types/modules/authModel";

const resource = "/marketplace";

export default () => {
  return {
    createProduct(payload: any) {
      return useCustomFetch(`${resource}/products`, {
        body: payload,
        method: "POST",
      });
    },

    updateProduct(id: string, payload: any) {
      return useCustomFetch(`${resource}/products/${id}`, {
        body: payload,
        method: "PUT",
      });
    },

    getProducts(query: any) {
      return useCustomFetch(`${resource}/products`, {
        query,
        method: "GET",
      });
    },

    getSingleProduct(id: string) {
      return useCustomFetch(`${resource}/products/${id}`, {
        method: "GET",
      });
    },

    deleteProduct(id: string) {
      return useCustomFetch(`${resource}/products/${id}`, {
        method: "DELETE",
      });
    },

    // ORDERS
    getOrders(params: any) {
      return useCustomFetch(`${resource}/orders`, {
        method: "GET",
        params,
      });
    },

    getSingleOrder(id: string) {
      return useCustomFetch(`${resource}/orders/${id}`, {
        method: "GET",
      });
    },

    acceptOrRejectOrder(id: string, payload: any) {
      return useCustomFetch(`${resource}/orders/${id}/accept`, {
        method: "POST",
        body: payload,
      });
    },

    cancelOrder(id: string) {
      return useCustomFetch(`${resource}/orders/${id}/cancel`, {
        method: "POST",
      });
    },

    markOrderAsShipped(id: string) {
      return useCustomFetch(`${resource}/orders/${id}/markShipped`, {
        method: "POST",
      });
    },

    dispatchOrder(payload: any) {
      return useCustomFetch(`${resource}/orders/dispatch`, {
        method: "POST",
        body: payload,
      });
    },
    checkoutCart(payload: any) {
      return useCustomFetch(`${resource}/orders/checkout`, {
        method: "POST",
        body: payload,
      });
    },

    checkoutCartLink(payload: any) {
      return useCustomFetch(`${resource}/orders/checkout/links`, {
        method: "POST",
        body: payload,
      });
    },

    // CARTS
    addItemToCart(payload: any) {
      return useCustomFetch(`${resource}/carts`, {
        body: payload,
        method: "POST",
      });
    },
    clearCart(id: string) {
      return useCustomFetch(`${resource}/carts/${id}/clear`, {
        method: "POST",
      });
    },
    createCartLink(payload: any) {
      return useCustomFetch(`${resource}/cartLinks`, {
        body: payload,
        method: "POST",
      });
    },
    getCartLink(id: string) {
      return useCustomFetch(`${resource}/cartLinks/${id}`, {
        method: "GET",
      });
    },
  };
};
