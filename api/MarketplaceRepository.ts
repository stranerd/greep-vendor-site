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
        body: payload,
        method: "POST",
      });
    },
    getSingleProduct(query: any) {
      return useCustomFetch(`${resource}/products`, {
        body: payload,
        method: "POST",
      });
    },
    deleteProduct(id: string) {
      return useCustomFetch(`${resource}/products/${id}`, {
        body: payload,
        method: "POST",
      });
    },
    // ORDERS
    getOrders(params: any) {
      return useCustomFetch(`${resource}/orders`, {
        method: "GET",
        params,
      });
    },
  };
};
