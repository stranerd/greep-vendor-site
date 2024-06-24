const resource = "/messaging";

export default () => {
  return {
    getSupportList() {
      return useCustomFetch(`${resource}/support`, {
        method: "GET",
      });
    },
    getSingleSupportChat(id: string) {
      return useCustomFetch(`${resource}/support/${id}`, {
        method: "GET",
      });
    },
    assignSupport(id: string) {
      return useCustomFetch(`${resource}/support/${id}/assign`, {
        method: "POST",
      });
    },
    createSupport() {
      return useCustomFetch(`${resource}/support`, {
        method: "POST",
      });
    },
    getChatMetas() {
      return useCustomFetch(`${resource}/chatMetas`, {
        method: "GET",
      });
    },
    getSingleChatMetas(id: string) {
      return useCustomFetch(`${resource}/chatmetas/${id}`, {
        method: "GET",
      });
    },
    sendChat(payload: any) {
      return useCustomFetch(`${resource}/chats`, {
        method: "POST",
        body: payload,
      });
    },
    getChats(query: any) {
      return useCustomFetch(`${resource}/chats`, {
        method: "GET",
        query,
      });
    },
    getSingleChat(id: string) {
      return useCustomFetch(`${resource}/chats/${id}`, {
        method: "GET",
      });
    },
    markChatsRead(payload: any) {
      return useCustomFetch(`${resource}/chats/read`, {
        method: "PUT",
        body: payload,
      });
    },
  };
};
