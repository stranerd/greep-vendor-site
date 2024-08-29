<template>
  <div
    v-if="supportApiStates.getChatList === API_STATES.LOADING"
    class="grid h-[85vh] w-full gap-[30px] lg:grid-cols-5"
  >
    <Skeleton class="col-span-2 h-full w-full" />
    <Skeleton class="col-span-3 hidden h-full w-full lg:block" />
  </div>
  <div
    v-else-if="supportApiStates.getChatList === API_STATES.SUCCESS"
    class="grid h-[85vh] w-full gap-[30px] lg:grid-cols-[2fr,3fr]"
  >
    <div class="h-full rounded-[12px] bg-[#FBFBFB] px-[10px] py-[31px]">
      <div class="px-[10px]">
        <h1 class="mb-8 text-[18px] font-semibold leading-[27px]">Messages</h1>
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
      <DisplayState v-else message="No messages" hideButton />
    </div>
    <div class="hidden h-full rounded-[12px] bg-[#FBFBFB] px-4 py-5 lg:block">
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
