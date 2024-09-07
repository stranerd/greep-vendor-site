<template>
  <div
    class="relative overflow-hidden rounded-[8px] border-[1.5px] border-[#EBEBEB]"
  >
    <img
      @click="emits('view')"
      :src="cardData?.banner?.link || '/images/bg-placeholder.avif'"
      :alt="cardData?.title || ''"
      class="mb-[10px] h-[146px] w-full object-cover"
    />
    <EditIcon
      @click="updateCoverImage"
      class="absolute right-4 top-4 h-8 w-8 rounded-full bg-white p-1.5"
    />
    <div
      class="flex h-40 cursor-pointer flex-col justify-between gap-2 p-[10px] pt-0"
    >
      <div @click="emits('view')" class="flex flex-col gap-2">
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
          {{ gpHelpers.sliceWords(cardData?.description, 60) }}
        </p>
      </div>

      <div class="flex items-center justify-between">
        <Button variant="ghost" size="dense" @click="editProduct" class="p-1">
          Edit <img src="/images/icons/edit.svg" alt="Edit" class="ml-2" />
        </Button>
        <client-only>
          <div class="flex items-center space-x-2">
            <Label
              for="availablity"
              class="text-[12px] font-normal leading-[20px]"
              >Availability {{ localData.inStock }}</Label
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
import { useMarketPlaceStore } from "@/store/useMarketplace";
import { useUploadStore } from "~/store/useUploadStore";
import { API_STATES } from "~/services/constants";
import {
  CameraIcon,
  EditIcon,
  GalleryEditIcon,
} from "@placetopay/iconsax-vue/outline";

const props = defineProps({
  cardData: { type: Object as () => {}, required: true },
});

const marketPlaceStore = useMarketPlaceStore();
const { marketplaceLoadingStates } = storeToRefs(marketPlaceStore);

const { updateProduct } = marketPlaceStore;
const uploadStore = useUploadStore();

const localData = ref();

const emits = defineEmits(["triggerEdit", "view"]);

const editProduct = () => {
  emits("triggerEdit", localData.value);
};

const handleChange = async (e: any) => {
  localData.value.inStock = e;
  const { banner, ...payload } = localData.value;
  console.log(e);
  const data = { ...payload, inStock: e };
  const form = new FormData();

  Object.keys(data).forEach((item, key) => {
    form.append(item, JSON.stringify(data[item]));
  });

  await updateProduct(localData.value.id, form);
};

onMounted(() => (localData.value = props.cardData));

const updateCoverImage = async () => {
  try {
    const result = await uploadStore.openModal({
     
    });
    if (result) {
      const { banner, ...data } = localData.value;

      const form = new FormData();
      Object.keys(data).forEach((item, key) => {
        form.append(item, JSON.stringify(data[item]));
      });
      form.append("banner", result[0]);
      await updateProduct(localData.value.id, form);

      const res = true;
      if (res) {
        uploadStore.uploadComplete();
      } else {
        uploadStore.uploadFailed();
        updateCoverImage();
      }
    }
  } catch (error) {}
};
</script>

<style></style>
