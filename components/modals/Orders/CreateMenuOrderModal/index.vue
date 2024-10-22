<template>
  <CustomModal title="Create Order" @close="emit('completed')">
    <CreateMenuOrderForm @completed="$emit('completed')" />
  </CustomModal>
</template>

<script setup lang="ts">
import { Search, CirclePlus, X as CancelIcon } from "lucide-vue-next";

const isOpen = ref(false);

const emit = defineEmits(["close", "completed"]);
</script>

<style></style>
