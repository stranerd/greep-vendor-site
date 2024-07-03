<template>
  <Dialog :open="isOpenLocal" class="max-h-[78vh] overflow-y-auto">
    <DialogContent :hideClose="true" class="">
      <DialogHeader>
        <DialogTitle>Order Details</DialogTitle>
        <X
          class="2-4 absolute right-4 top-4 h-4 cursor-pointer rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          @click="$emit('close')"
        />
      </DialogHeader>

      <DialogDescription>
        <OrderDetails @completed="isOpenLocal = false" />
        <div class="flex items-end justify-end">
          <Button
            class="bg-transparent font-medium text-[#FF5656] hover:bg-transparent"
            >Reject Order</Button
          >
          <Button>Send to Kitchen</Button>
        </div>
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
