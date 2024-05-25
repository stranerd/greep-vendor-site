<template>
  <div class="flex items-center gap-[10px]">
    <Button v-if="isInnerPage" variant="ghost" @click="router.go(-1)">
      <ChevronLeft /> Back
    </Button>
    <h1 v-if="title" class="text-lg font-semibold md:text-2xl">{{ title }}</h1>
    <span class="text-[#616161] text-[16px] leading-[28px]">
      <slot />
    </span>
  </div>
</template>

<script setup lang="ts">
import { ChevronLeft } from "lucide-vue-next";

const router = useRouter();

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  isInnerPage: {
    type: Boolean,
    default: false,
  },
});
</script>

<style></style>
