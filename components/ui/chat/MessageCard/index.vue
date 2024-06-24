<template>
  <div class="w-full">
    <div
      class="rounded-[16px] px-4 py-[5.5px] bg-[#E0E2E4] max-w-[248px] mb-2 rounded-tl-[0px]"
    >
      <p class="text-[12px] leading-[18px] text-[#001726]">
        {{ messageData.body }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from "~/store/useAuthStore";
const props = defineProps({
  messageData: {
    type: Object,
    default: () => {},
  },
  currentUser: {
    type: String,
  },
});

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
</script>

<style></style>
