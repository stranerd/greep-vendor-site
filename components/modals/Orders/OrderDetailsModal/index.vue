<template>
  <Dialog :open="isOpenLocal">
    <DialogContent :hideClose="true">
      <DialogHeader>
        <DialogTitle>Order Details</DialogTitle>
        <X
          class="absolute right-4 top-4 rounded-sm opacity-70 cursor-pointer ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none h-4 2-4 data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          @click="$emit('close')"
        />
      </DialogHeader>

      <DialogDescription>
        <OrderDetails @completed="isOpenLocal = false" />
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

const isOpenLocal = ref(props.isOpen);

watch(
  props,
  () => {
    console.log({ isOpen: props.isOpen });

    isOpenLocal.value = props.isOpen;
  },
  { immediate: true },
);
const emit = defineEmits(["close", "completedCreation"]);
</script>

<style></style>
