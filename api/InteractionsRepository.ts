const resource = "/interactions";

export default () => {
  return {
    createProductCategoryTag(payload: {
      title: string;
      type: "productFoods" | "productsItems";
    }) {
      return useCustomFetch(`${resource}/tags`, {
        body: payload,
        method: "POST",
      });
    },
  };
};
