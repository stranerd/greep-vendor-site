<template>
  <Skeleton
    v-if="supportApiStates.singleSupport === API_STATES.LOADING"
    class="h-full col-span-3 w-full"
  />
  <div v-else class="h-full relative flex flex-col justify-between">
    <div v-if="!activeChat.id" class="h-full flex items-center justify-center">
      <p class="text-center text-[14px]">Select a conversation to continue</p>
    </div>
    <div v-else class="h-full relative flex flex-col justify-between">
      <div class="flex gap-3">
        <Button size="icon" variant="ghost">
          <ChevronLeft class="h-[24px] w-[24px]" />
        </Button>
        <Avatar class="mr-3">
          <AvatarImage :src="activeChat?.banner?.link || ''" alt="Product" />
          <AvatarFallback>AX</AvatarFallback>
        </Avatar>
        <div>
          <h5 class="text-[14px] leading-[21px] font-semibold">Alex</h5>
          <p class="text-[12px] leading-[18px] text-[#999999]">
            Last seen 12:11
          </p>
        </div>
      </div>
      <div class="grow-1 h-full py-6">
        <MessageCard
          v-for="(message, i) in singleSupportChats"
          :key="i"
          :messageData="message"
        />
      </div>
      <div class="relative">
        <Input
          v-model="newMessage"
          placeholder="Enter message"
          class="rounded-[99px] bg-[transparent] text-[14px] leading-[21px] py-[13px] px-[24px] h-[auto]"
        />
        <Send
          v-if="newMessage"
          class="h-[24px] w-[24px] cursor-pointer absolute right-[24px] pointer z-[2] text-[#999999] top-[50%] translate-y-[-50%]"
          @click="triggerMessageSend()"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { API_STATES } from "~/services/constants";
import { Send, ChevronLeft } from "lucide-vue-next";
import { useSupportStore } from "@/store/useSupport";

const props = defineProps({
  activeChat: {
    type: Object,
    default: () => {},
  },
});

const supportStore = useSupportStore();
const { supportApiStates, singleSupportChats } = storeToRefs(supportStore);
const { getChatList, sendMessage } = supportStore;

const newMessage = ref("");

const triggerMessageSend = async () => {
  console.log("called", props.activeChat.id);

  const res = await sendMessage({
    body: newMessage.value,
    to: props.activeChat.id,
    type: "support",
  });
  if (res) {
    newMessage.value = "";
  }
};
</script>

<style></style>
