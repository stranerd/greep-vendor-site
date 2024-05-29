<template>
  <Dialog :open="isOpen">
    <DialogContent :hideClose="true">
      <DialogHeader>
        <DialogTitle>New Item</DialogTitle>
        <X
          class="absolute right-4 top-4 rounded-sm opacity-70 cursor-pointer ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none h-4 2-4 data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          @click="$emit('close')"
        />
      </DialogHeader>
      <DialogDescription>
        <CreateProductForm @completed="$emit('completed')" />
      </DialogDescription>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { Search, CirclePlus, X } from "lucide-vue-next";

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close", "completed"]);
</script>

<style></style>
