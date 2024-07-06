<template>
  <Dialog :open="isOpen" class="max-h-[78vh] overflow-y-auto">
    <DialogContent :hideClose="true">
      <DialogHeader>
        <DialogTitle>Checkout cart</DialogTitle>
        <X
          class="2-4 absolute right-4 top-4 h-4 cursor-pointer rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          @click="$emit('close')"
        />
      </DialogHeader>
      <DialogDescription>
        <CreateOrderLinkForm
          :cartLinkId="cartLinkId"
          @completed="$emit('completed')"
        />
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
  cartLinkId: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["close", "completed"]);
</script>

<style></style>
