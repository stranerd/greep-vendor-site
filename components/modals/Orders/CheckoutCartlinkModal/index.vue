<template>
  <CustomModal title="Checkout Cart" @close="emit('completed')">
    <CreateOrderLinkForm
      :cartLinkId="cartLinkId"
      @completed="$emit('completed')"
    />
  </CustomModal>
</template>

<script setup lang="ts">
import { Search, CirclePlus, X } from "lucide-vue-next";

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  cartLinkId: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["close", "completed"]);
</script>

<style></style>
