import { defineStore } from "pinia";
import { API_STATES } from "~/services/constants";
import { useToast } from "@/components/library/toast/use-toast";
import type {
  IChatMessage,
  IChatMetaEntity,
} from "~/types/modules/supportModel";

export const useSupportStore = defineStore("support", () => {
  // state variables

  const supportList = ref<Array<IChatMetaEntity>>();
  const supportListMeta = ref();
  const chatList = ref([]);
  const chatListPagination = ref<any>();
  const supportApiStates = ref({
    supportList: API_STATES.IDLE,
    singleSupport: API_STATES.IDLE,
    getChatList: API_STATES.IDLE,
    getSingleChat: API_STATES.IDLE,
    sendMessage: API_STATES.IDLE,
  });

  const singleSupportChats = ref<Array<IChatMessage>>([]);
  const singleSupportMeta = ref({});

  const getChatList = async () => {
    const { $api } = useNuxtApp();
    const { toast } = useToast();
    supportApiStates.value.getChatList = API_STATES.LOADING;

    const { data, error } = await $api.messaging.getChatMetas();
    if (error.value) {
      console.log(error.value?.data);
      toast({
        variant: "destructive",
        description: error.value?.data?.[0]?.message || "",
      });
      supportApiStates.value.getChatList = API_STATES.ERROR;
      return { error: error.value };
    }
    if (data.value) {
      console.log({ data }, data.value.results);

      chatList.value = data.value.results;
      chatListPagination.value = data.value.pages;
      supportApiStates.value.getChatList = API_STATES.SUCCESS;
    }
  };

  const getSupportChats = async (id: string) => {
    const { $api } = useNuxtApp();
    const { toast } = useToast();
    supportApiStates.value.singleSupport = API_STATES.LOADING;

    const { data, error } = await $api.messaging.getChats({
      where: [
        { field: "to", value: id },
        { field: "data.type", value: "support" },
      ],
    });
    if (error.value) {
      console.log(error.value?.data);
      toast({
        variant: "destructive",
        description: error.value?.data?.[0]?.message || "",
      });
      supportApiStates.value.singleSupport = API_STATES.ERROR;
      return { error: error.value };
    }
    if (data.value) {
      console.log({ data }, data.value.results);
      singleSupportChats.value = data.value.results;
      singleSupportMeta.value = data.value.pages;
      supportApiStates.value.singleSupport = API_STATES.SUCCESS;
    }
  };

  const getSupportlist = async () => {
    const { $api } = useNuxtApp();
    const { toast } = useToast();
    supportApiStates.value.supportList = API_STATES.LOADING;

    const { data, error } = await $api.messaging.getSupportList();
    if (error.value) {
      console.log(error.value?.data);
      toast({
        variant: "destructive",
        description: error.value?.data?.[0]?.message || "",
      });
      supportApiStates.value.supportList = API_STATES.ERROR;
      return { error: error.value };
    }
    if (data.value) {
      console.log({ data }, data.value);

      supportList.value = data.value;
      supportApiStates.value.supportList = API_STATES.SUCCESS;
    }
  };

  const sendMessage = async (payload: any) => {
    const { $api } = useNuxtApp();
    const { toast } = useToast();
    supportApiStates.value.sendMessage = API_STATES.LOADING;

    const { data, error } = await $api.messaging.sendChat(payload);
    if (error.value) {
      console.log(error.value?.data);
      toast({
        variant: "destructive",
        description: error.value?.data?.[0]?.message || "",
      });
      supportApiStates.value.sendMessage = API_STATES.ERROR;
      return { error: error.value };
    }
    if (data.value) {
      console.log({ data }, data.value);
      supportList.value = data.value;
      supportApiStates.value.sendMessage = API_STATES.SUCCESS;
    }
  };

  return {
    supportList,
    supportApiStates,
    getChatList,
    getSupportlist,
    chatList,
    chatListPagination,
    getSupportChats,
    singleSupportChats,
    singleSupportMeta,
    sendMessage,
  };
});
