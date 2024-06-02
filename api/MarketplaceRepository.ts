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
    getSingleProduct(query: any) {
      return useCustomFetch(`${resource}/products`, {
        query,
        method: "POST",
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

    checkoutCart(payload: any) {
      return useCustomFetch(`${resource}/orders/checkout`, {
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
  };
};
