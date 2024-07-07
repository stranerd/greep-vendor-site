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
      return useCustomFetch(`${resource}/vendor`, {
        body: payload,
        method: "POST",
      });
    },

    updateVendorType(payload: any) {
      return useCustomFetch(`${resource}/type`, {
        body: payload,
        method: "POST",
      });
    },
  };
};
