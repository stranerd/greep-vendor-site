<template>
  <div class="overflow-hidden rounded-[8px] border-[1.5px] border-[#EBEBEB]">
    <img
      :src="cardData?.banner?.link || '/images/bg-placeholder.avif'"
      :alt="cardData?.title || ''"
      class="mb-[10px] h-[146px] w-full object-cover"
    />
    <div class="flex flex-col gap-2 p-[10px]">
      <h4 class="text-[14px] font-semibold leading-[21px]">
        {{ cardData?.title || "" }}
      </h4>
      <Separator />

      <p class="flex text-[12px] leading-[18px]">
        Price:
        <span class="ml-1 font-semibold">
          {{
            gpNumbers.formatCurrency(
              cardData?.price?.amount ?? 0,
              cardData?.price?.currency ?? "TRY",
            )
          }}
        </span>
      </p>

      <p class="flex text-[12px] leading-[18px]">
        {{ cardData?.description }}
      </p>

      <div class="flex items-center justify-between">
        <Button
          variant="ghost"
          size="dense"
          @click.self="editProduct"
          class="p-1"
        >
          Edit <img src="/images/icons/edit.svg" alt="Edit" class="ml-2" />
        </Button>
        <client-only>
          <div class="flex items-center space-x-2">
            <Label
              for="availablity"
              class="text-[12px] font-normal leading-[20px]"
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
