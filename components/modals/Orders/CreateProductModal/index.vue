<template>
  <Dialog :open="isOpenLocal">
    <DialogContent :hideClose="true">
      <DialogHeader>
        <DialogTitle>
          {{
            mode === "edit" ? `Edit ${selectedProduct.title}` : "New Item"
          }}</DialogTitle
        >
        <X
          class="2-4 absolute right-4 top-4 h-4 cursor-pointer rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          @click="$emit('close')"
        />
      </DialogHeader>
      <DialogDescription class="mt-4 max-h-[80vh] w-full overflow-auto p-1">
        <CreateProductForm
          :mode="mode"
          :selectedProduct="selectedProduct"
          @completed="
            isOpenLocal = false;
            $emit('completedCreation');
          "
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
  mode: {
    type: String,
    default: "create",
  },
  selectedProduct: {
    type: Object,
    default: () => {},
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

onMounted(() => {
  console.log("stufff", props.selectedProduct);
});
</script>

<style></style>
