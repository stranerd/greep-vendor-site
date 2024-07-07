<template>
  <div class="rounded-[8px] overflow-hidden border-[#EBEBEB] border-[1.5px]">
    <img
      :src="cardData?.banner?.link || '/images/bg-placeholder.avif'"
      :alt="cardData?.title || ''"
      class="h-[146px] w-full object-cover mb-[10px]"
    />
    <div class="p-[10px] flex flex-col gap-2">
      <h4 class="text-[14px] leading-[21px] font-semibold">
        {{ cardData?.title || "" }}
      </h4>
      <Separator />

      <p class="text-[12px] flex leading-[18px]">
        Price:
        <span class="font-semibold ml-1">
          {{ cardData?.price?.currency }}
          {{ cardData?.price?.amount || "-" }}</span
        >
      </p>

      <p class="text-[12px] flex leading-[18px]">
        {{ cardData?.description }}
      </p>

      <div class="flex items-center justify-between">
        <Button variant="ghost" size="dense" @click="editProduct">
          Edit <img src="/images/icons/edit.svg" alt="Edit" class="ml-2" />
        </Button>
        <client-only>
          <div class="flex items-center space-x-2">
            <Label
              for="availablity"
              class="text-[12px] leading-[20px] font-normal"
              >Availability</Label
            >
            <Switch
              class="data-[state=checked]:bg-[#10BB76]"
              id="availablity"
              :checked="localData.inStock"
              :disabled="
                marketplaceLoadingStates.updateProduct === API_STATES.LOADING
              "
              @update:checked="handleChange"
            />
          </div>
        </client-only>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  cardData: { type: Object as () => {}, required: true },
});
import { useMarketPlaceStore } from "@/store/useMarketplace";
import { API_STATES } from "~/services/constants";

const marketPlaceStore = useMarketPlaceStore();
const { marketplaceLoadingStates } = storeToRefs(marketPlaceStore);
const { updateProduct } = marketPlaceStore;

const localData = ref();

const emits = defineEmits(["triggerEdit"]);

const editProduct = () => {
  emits("triggerEdit", localData.value);
};

const handleChange = async (e: any) => {
  localData.value.inStock = e;
  const payload = localData.value;
  await updateProduct(localData.value.id, { ...localData.value, inStock: e });
};

onMounted(() => (localData.value = props.cardData));
</script>

<style></style>
