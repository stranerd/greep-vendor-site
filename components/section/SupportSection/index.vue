<template>
  <div
    v-if="supportApiStates.getChatList === API_STATES.LOADING"
    class="grid grid-cols-5 gap-[30px] h-[85vh] w-full"
  >
    <Skeleton class="h-full col-span-2 w-full" />
    <Skeleton class="h-full col-span-3 w-full" />
  </div>
  <div
    v-else-if="supportApiStates.getChatList === API_STATES.SUCCESS"
    class="grid grid-cols-5 gap-[30px] h-[85vh] w-full"
  >
    <div
      class="bg-[#FBFBFB] rounded-[12px] h-full col-span-2 py-[31px] px-[10px]"
    >
      <div class="px-[10px]">
        <h1 class="text-[18px] mb-8 font-semibold leading-[27px]">Messages</h1>
        <div class="relative mb-6">
          <Input class="bg-[transparent]" />
        </div>
      </div>

      <div v-if="chatList?.length">
        <UserChatCard
          v-for="(chat, i) in chatList"
          :key="i"
          :chatData="chat"
          :selected="selectedChatId === chat.id"
          class="mb-2"
          @click="selectChat(chat)"
        />
      </div>
      <DisplayState v-else message="An messages" hideButton />
    </div>
    <div class="col-span-3 bg-[#FBFBFB] h-full rounded-[12px] py-5 px-4">
      <MessagesContainer :activeChat="selectedChat" />
    </div>
  </div>
  <DisplayState
    v-else-if="supportApiStates.getChatList === API_STATES.ERROR"
    message="An error occured"
    buttonText="Refresh"
    @action="getChatList()"
  />
</template>

<script lang="ts" setup>
import { API_STATES } from "~/services/constants";
import { useSupportStore } from "@/store/useSupport";
import type { IChatMetaEntity } from "~/types/modules/supportModel";

const supportStore = useSupportStore();
const { supportApiStates, chatList, chatListPagination } =
  storeToRefs(supportStore);
const { getChatList, getSupportChats } = supportStore;

const selectedChatId = ref("");
const selectedChat = ref<IChatMetaEntity>({});

const selectChat = (chat: IChatMetaEntity) => {
  selectedChat.value = chat;
  selectedChatId.value = chat.id;
};

onMounted(() => {
  getChatList();
});

watch(selectedChatId, () => {
  getSupportChats(selectedChatId.value);
});
</script>

<style></style>
