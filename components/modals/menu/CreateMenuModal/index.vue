<template>
  <Dialog :open="isOpenLocal" class="">
    <DialogContent :hideClose="true">
      <DialogHeader>
        <DialogTitle>New Item </DialogTitle>
        <X
          class="2-4 absolute right-4 top-4 h-4 cursor-pointer rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
          @click="$emit('close')"
        />
      </DialogHeader>
      <DialogDescription class="mt-4 max-h-[80vh] w-full overflow-auto p-1">
        <CreateMenuForm
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
import { useMarketPlaceStore } from "@/store/useMarketplace";
import { Search, CirclePlus, X } from "lucide-vue-next";

const marketPlaceStore = useMarketPlaceStore();

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  mode: {
    type: String as PropType<"create" | "edit">,
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
</script>

<style></style>
