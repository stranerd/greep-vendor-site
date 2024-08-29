const resource = "/interactions";

export default () => {
  return {
    createProductCategoryTag(payload: {
      title: string;
      type: "productsFoods" | "productsItems";
      photo: any;
    }) {
      return useCustomFetch(`${resource}/tags`, {
        body: payload,
        method: "POST",
      });
    },
  };
};
