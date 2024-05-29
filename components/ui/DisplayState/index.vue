<template>
  <div class="w-full max-w-[310px] mx-auto py-[80px]">
    <img
      src="/images/empty-state.png"
      class="h-[64px] w-[64px] mb-3 mx-auto"
      alt="Empty State"
    />
    <p class="text-[12px] text-center">{{ message }}</p>
    <Button v-if="!hideButton" @click="$emit('action')">
      {{ buttonText }}
    </Button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  message: {
    type: String,
    default: "",
  },
  buttonText: {
    type: String,
    default: "",
  },
  hideButton: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["action"]);
</script>

<style></style>
