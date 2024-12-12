<template>
  <div class="min-h-[80vh]">
    <div
      class="mt-[25px] flex flex-col items-center justify-between gap-4 lg:flex-row"
    >
      <form class="w-full max-w-[570px]">
        <div class="relative flex w-full">
          <Search
            class="absolute left-4 top-[50%] h-[24px] w-[24px] translate-y-[-50%] text-muted-foreground"
          />
          <Separator orientation="vertical" />
          <Input
            type="search"
            v-model="searchTerm"
            placeholder="Search by category, menu title, etc. "
            class="h-[48px] w-full appearance-none rounded-[99px] bg-background px-[48px] shadow-none lg:w-full"
          />
          <Separator orientation="vertical" />
          <img
            class="absolute right-4 top-[50%] h-[24px] w-[24px] translate-y-[-50%] text-muted-foreground"
            src="/images/icons/arrangevertical.svg"
            alt="Arrange "
          />
        </div>
      </form>
      <div class="grid w-full grid-cols-2 justify-between gap-3 lg:w-fit">
        <div class="flex items-center gap-[10px] text-[14px] leading-[21px]">
          <client-only>
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <Button class="flex w-full justify-start gap-x-2 lg:w-44">
                  <Arrow3Icon class="h-5 w-5 text-white" />
                  <span class="flex-1 text-sm">{{
                    selectedSortOption.label
                  }}</span></Button
                >
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <!-- <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator /> -->
                <DropdownMenuItem
                  v-for="option in sortOptions"
                  @click="
                    getAllProducts({ sort: JSON.stringify(option.sortQuery) });
                    selectedSortOption = option;
                  "
                >
                  {{ option.label }}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </client-only>
        </div>

        <Button
          variant="primary"
          class="lg:w-44"
          rounded="md"
          @click="isDialogOpen = true"
          ><CirclePlus class="mr-[10px] h-5 w-5" /> Create Menu</Button
        >
      </div>
    </div>
    <div class="mt-6">
      {{ vendorProductTags.map((x) => x.id) }}
      <div
        v-if="
          marketplaceLoadingStates.getProducts === API_STATES.LOADING ||
          marketplaceLoadingStates.getVendorProductTags === API_STATES.LOADING
        "
        class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4"
      >
        <div
          v-for="(_, i) in 12"
          :key="i"
          class="min-h-[280px] overflow-hidden rounded-[8px] border-[0px] border-[#EBEBEB]"
        >
          <Skeleton class="h-[140px]" />
          <div class="px-4">
            <Skeleton class="mt-4 h-[20px] w-[50%]" />
            <Skeleton class="mt-3 h-[15px] w-[60%]" />
            <Skeleton class="mt-3 h-[15px] w-[80%]" />
            <div class="flex justify-between">
              <Skeleton class="mt-4 h-[25px] w-[25%]" />
              <Skeleton class="mt-4 h-[25px] w-[25%]" />
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <DisplayState
          v-if="marketplaceLoadingStates.getProducts === API_STATES.ERROR"
          class="my-[80px]"
          message="Something went wrong, Please refresh"
          buttonText="Refresh"
          @action="getAllProducts()"
        />
        <div v-else>
          <div v-if="VendorProducts?.length > 0">
            <div class="hide-scrollbar grid w-full gap-5">
              <div
                :value="tag.id"
                v-for="tag in VendorProducts"
                class="hide-scrollbar max-w-full gap-5 overflow-scroll"
              >
                <h2
                  class="mb-1 flex cursor-pointer items-end gap-2 text-lg font-medium capitalize"
                  @click="tag.isOpen = !tag.isOpen"
                >
                  <ArrowUp2Icon
                    class="h-6 w-6 stroke-1 duration-500"
                    :class="{ 'rotate-180': tag.isOpen }"
                  />
                  <span class="text-sm font-bold"> {{ tag.title }}</span>
                  <span class="text-sm lowercase text-[#999999]"
                    >{{ tag.products.length }} item<span
                      v-if="tag.products.length > 1"
                      >s</span
                    ></span
                  >
                </h2>

                <transition name="fade" mode="out-in">
                  <div
                    v-if="tag.isOpen"
                    class="hide-scrollbar w-full overflow-scroll"
                  >
                    <div class="hide-scrollbar flex gap-4">
                      <ItemCard
                        v-for="(item, i) in tag.products"
                        :cardData="item"
                        class="min-w-60 max-w-60"
                        @view="
                          getSingleProduct(item.id);
                          router.push({
                            name: GP_ROUTES.VENDOR.FOOD.MENU_DETAILS,
                            params: { id: item.id },
                          });
                        "
                        @trigger-edit="triggerEdit"
                      />
                    </div>
                  </div>
                </transition>
              </div>
            </div>
          </div>
          <DisplayState
            v-else
            class="my-[80px]"
            message="No items to display. Start creating or uploading items to manage them here!"
            hideButton
          />
        </div>
      </div>
    </div>
    <client-only>
      <CreateMenuModal
        :isOpen="isDialogOpen"
        :mode="mode"
        :selectedProduct="selectedProduct"
        @close="closeModal"
        @completedCreation="completeProductCreation"
      />
    </client-only>
  </div>
</template>

<script lang="ts" setup>
import { Search, CirclePlus } from "lucide-vue-next";
import { API_STATES } from "~/services/constants";
import { useMarketPlaceStore } from "@/store/useMarketplace";
import { GP_ROUTES } from "~/constants/route-names";
import { ArrowUp2Icon, Arrow3Icon } from "@placetopay/iconsax-vue/outline";
import type { IProduct } from "~/types/modules/marketPlaceModel";

const { products, marketplaceLoadingStates, vendorProductTags } = storeToRefs(
  useMarketPlaceStore(),
);

const { getAllProducts, getSingleProduct } = useMarketPlaceStore();

const router = useRouter();
const isDialogOpen = ref(false);

const mode = ref<"create" | "edit">("create");
const selectedProduct = ref({});
const searchTerm = ref("");

/* Latest item -> key=createdAt, desc = true
Most sold -> key=meta.orders, desc = true
Highest in price -> key=price.amount, desc = true
Lowest in price -> key=price.amount, desc = false
*/
const sortOptions = ref([
  {
    label: "Latest Item",
    sortQuery: [{ field: "createdAt", desc: true }],
  },
  {
    label: "Most Sold",

    sortQuery: [{ field: "meta.orders", desc: true }],
  },
  {
    label: "Highest In Price",
    sortQuery: [{ field: "price.amount", desc: true }],
  },
  {
    label: "Lowest In Price",
    sortQuery: [{ field: "price.amount", desc: false }],
  },
]);

const selectedSortOption = ref(sortOptions.value[0]);

interface VendorProduct {
  id: string;
  title: string;
  keyWords: string[];
  products: IProduct[];
  isOpen?: boolean;
}

const VendorProductsInit = computed(() => {
  const regex = new RegExp(searchTerm.value, "i");
  const VendorProductsList = vendorProductTags.value
    .map(({ id, title }) => ({
      id,
      title,
      isOpen: true,
      keyWords: products?.value
        .filter((item) => item.tagIds.includes(id))
        .map((i) => i.title),
      products: products.value?.filter((item) => item.tagIds.includes(id)),
    }))
    .filter((item: VendorProduct) => item.products.length > 0);

  return VendorProductsList.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      item.keyWords.some((key) =>
        key.toLowerCase().includes(searchTerm.value.toLowerCase()),
      ),
  );
});

const VendorProducts = ref(VendorProductsInit.value);

watch(
  VendorProductsInit,
  (newItems, oldItems) => {
    if (newItems !== oldItems) {
      VendorProducts.value = newItems;
    } else VendorProducts.value = oldItems;
  },
  { deep: true, immediate: true },
);

const closeModal = () => {
  isDialogOpen.value = false;
  mode.value = "create";
  selectedProduct.value = {};
};

const completeProductCreation = () => {
  closeModal();
  getAllProducts({});
};

const triggerEdit = (product: any) => {
  mode.value = "edit";
  selectedProduct.value = product;
  isDialogOpen.value = true;
};
</script>

<style></style>
