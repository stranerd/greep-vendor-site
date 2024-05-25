const resource = "/users/users";

export default () => {
  return {
    getUsers() {
      return useCustomFetch(`${resource}`, {
        method: "GET",
      });
    },
    getSingleUser(id: string) {
      return useCustomFetch(`${resource}/${id}`, {
        method: "GET",
      });
    },
    updateVendorDetails(payload: any) {
      return useCustomFetch(`${resource}/products`, {
        body: payload,
        method: "POST",
      });
    },
  };
};
