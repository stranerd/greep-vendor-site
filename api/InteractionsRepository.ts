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

    getProductCategoryTag(type: "productsFoods" | "productsItems") {
      return useCustomFetch(`${resource}/tags`, {
        method: "GET",
        query: {
          where: JSON.stringify([{ field: "type", value: type }]),
          sort: JSON.stringify([{ field: `meta.${type}`, desc: true }]),
        },
      });
    },

    getVendorProductTags(tags: string[]) {
      return useCustomFetch(`${resource}/tags`, {
        method: "GET",
        query: {
          where: JSON.stringify([
            {
              field: "id",
              condition: "in",
              value: tags,
            },
          ]),
        },
      });
    },
  };
};
