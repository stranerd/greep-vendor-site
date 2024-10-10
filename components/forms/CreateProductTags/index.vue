<template>
  <div>
    <form class="p-4 text-black" v-if="!confirmCreateCategoryTag">
      <h2>
        <h2 class="text-lg font-semibold">Create New Category</h2>
        <X
          @click="emit('close')"
          class="2-4 absolute right-4 top-4 h-4 cursor-pointer rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        />
      </h2>
      <div class="grid gap-2">
        <FormField v-slot="{ componentField }" name="description">
          <FormItem>
            <FormLabel class="text-black/60">
              Title
              <span class="font-normal text-red-400">required</span>
            </FormLabel>
            <FormControl>
              <Input
                placeholder="Enter Text Here..."
                v-bind="componentField"
                v-model="newCategoryTitle"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
      </div>
      <div class="mt-4 flex items-center justify-end">
        <Button
          type="submit"
          class="rounded-[12px]"
          :disabled="!newCategoryTitle"
          @click="openConfirmCreateCategoryModal"
        >
          Create Category
        </Button>
      </div>
    </form>
    <div v-if="confirmCreateCategoryTag" class="text-[#000]">
      <h2 class="text-lg font-semibold">Create New Item</h2>
      <p class="text-[#999999]">You want to create a new item</p>

      <div class="flex w-full items-center justify-end gap-x-4">
        <Button variant="outline" @click="emit('close')">Cancel</Button>
        <Button
          @click="createFoodCategoryTag"
          :loading="
            marketplaceLoadingStates.createProductCategory ===
            API_STATES.LOADING
          "
          >Continue
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as z from "zod";
import { Check, ChevronsUpDown, CirclePlus, X } from "lucide-vue-next";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { API_STATES } from "~/services/constants";
import { useMarketPlaceStore } from "@/store/useMarketplace";
import { ReserveIcon } from "@placetopay/iconsax-vue/outline";
import { useToast } from "@/components/library/toast/use-toast";

const props = defineProps({
  type: {
    type: String as PropType<"productsFoods" | "productsItems">,
    required: true,
  },
});

const emit = defineEmits(["close"]);

const marketPlaceStore = useMarketPlaceStore();
const { marketplaceLoadingStates, productFoodsTags } = storeToRefs(
  useMarketPlaceStore(),
);
const { getProductFoodsTags, getProductItemsTags, createProductCategoryTag } =
  marketPlaceStore;

const openCreateCategoryModal = ref<boolean>(false);
const confirmCreateCategoryTag = ref<boolean>(false);
const newCategoryTitle = ref<string>("");
const openConfirmDialog = ref(false);

const openCreateProductModal = () => {
  openConfirmDialog.value = true;
};

const openConfirmCreateCategoryModal = () => {
  if (newCategoryTitle.value) {
    openCreateCategoryModal.value = false;
    confirmCreateCategoryTag.value = true;
  }
};

const categorySchema = toTypedSchema(
  z.object({
    title: z.string({ message: "Title is required" }).min(3, {
      message: "Title cannot be less than 3 characters",
    }),
  }),
);

const createFoodCategoryTag = async () => {
  await createProductCategoryTag({
    title: newCategoryTitle.value,
    type: props.type,
    photo: null,
  });

  newCategoryTitle.value = "";
  await getProductFoodsTags();
  await getProductItemsTags();
  emit("close");
};
</script>

<style scoped></style>
