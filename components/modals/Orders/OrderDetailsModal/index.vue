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
        <OrderFoodDetails @completed="isOpenLocal = false" />
        <div
          class="flex items-end justify-end"
          v-if="
            status === 'created' &&
            marketplaceLoadingStates.singleOrder === API_STATES.SUCCESS
          "
        >
          <Button
            @click="rejectOrder"
            class="bg-transparent font-medium text-[#FF5656] hover:bg-transparent"
            >Reject Order</Button
          >
          <Button @click="acceptOrder">Send to Kitchen</Button>
        </div>
      </DialogDescription>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { Search, CirclePlus, X } from "lucide-vue-next";
import { API_STATES } from "~/services/constants";
import { useMarketPlaceStore } from "@/store/useMarketplace";
const marketPlaceStore = useMarketPlaceStore();
const { marketplaceLoadingStates, singleOrder } = storeToRefs(marketPlaceStore);
const { getSingleOrder, rejectOrAcceptOrder } = marketPlaceStore;

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String as PropType<"created" | "accepted" | "shipped">,
    required: true,
  },
});

const isOpenLocal = ref(props.isOpen);

const acceptOrder = async () => {
  if (singleOrder.value?.id) {
    isOpenLocal.value = false;
    rejectOrAcceptOrder(singleOrder.value.id, {
      accepted: true,
      message: "Order Accepted",
    });
  }
};
const rejectOrder = async () => {
  if (singleOrder.value?.id) {
    isOpenLocal.value = false;
    rejectOrAcceptOrder(singleOrder.value.id, {
      accepted: false,
      message: "Order Rejected",
    });
  }
};

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
