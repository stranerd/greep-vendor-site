<template>
  <div class="">
    <Transition mode="out-in" name="fade">
      <div class="w-full" v-if="!selectAllProducts">
        <div class="relative mt-3 h-auto overflow-y-auto">
          <Badge
            v-for="(item, index) in selectedValues"
            :key="item.id"
            variant="outline"
            class="mb-2 mr-2 px-3 py-2 capitalize"
          >
            {{ item.title }}
            <X class="ml-3 h-[16px] w-[16px]" @click="toggleCategory(item)" />
          </Badge>
        </div>
        <Popover v-model:open="openCombobox" class="">
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              :aria-expanded="openCombobox"
              class="w-full justify-between text-foreground"
            >
              <span class="truncate capitalize text-[#64748B]">
                {{
                  selectedValues.length === 0
                    ? "Select products"
                    : selectedValues.length === 1
                      ? selectedValues[0].title
                      : selectedValues.length === 2
                        ? selectedValues.map(({ title }) => title).join(", ")
                        : `${selectedValues.length} products selected`
                }}
              </span>
              <!-- <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" /> -->
            </Button>
          </PopoverTrigger>
          <PopoverContent class="w-[350px ] ml-auto p-0 lg:w-[480px]">
            <Command loop>
              <CommandInput placeholder="Search product..." />
              <CommandList>
                <CommandGroup class="max-h-[145px] overflow-auto">
                  <CommandItem
                    v-for="product in filteredProducts"
                    :key="product.id"
                    :value="product.id"
                    @select="toggleCategory(product)"
                  >
                    <BoxIcon
                      class="mr-2 h-4 w-4 text-black"
                      :class="{
                        'stroke-primary stroke-1 text-primary opacity-100':
                          selectedValues.some((i) => i.id === product.id),
                        'opacity-100': !selectedValues.some(
                          (i) => i.id === product.id,
                        ),
                      }"
                    />
                    <div
                      class="flex-1 capitalize"
                      :class="{
                        'font-semibold text-primary opacity-100':
                          selectedValues.some((i) => i.id === product.id),
                      }"
                    >
                      {{ product.title }}
                    </div>
                  </CommandItem>
                </CommandGroup>
              </CommandList>
              <CommandEmpty>
                <div class="">
                  <h2 class="my-2">No Product found.</h2>
                </div>
              </CommandEmpty>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <div
        class="mb-2 flex w-full items-center gap-x-4 rounded-lg border p-2.5 text-black/30"
        v-else
      >
        <BoxIcon class="h-7 w-7" />
        <h2 class="font-medium">All Products</h2>
      </div>
    </Transition>
    <div class="mt-1 flex items-center gap-x-2">
      <Switch
        class="self-center data-[state=checked]:bg-[#10BB76]"
        id="availablity"
        v-model:checked="selectAllProducts"
      />
      <h2
        :class="{
          'font-medium opacity-100': selectAllProducts,
          'font-medium opacity-40': !selectAllProducts,
        }"
      >
        All Products
      </h2>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as z from "zod";
import { X } from "lucide-vue-next";
import { useMarketPlaceStore } from "@/store/useMarketplace";
import { BoxIcon } from "@placetopay/iconsax-vue/outline";

const marketPlaceStore = useMarketPlaceStore();
const { products } = storeToRefs(useMarketPlaceStore());
const { getAllProducts } = marketPlaceStore;

const emits = defineEmits(["completed"]);
const openCombobox = ref<boolean>(false);
const selectedValues = ref<any[]>([]);
const modelValue = defineModel<string[]>({ default: [] });
const selectAllProducts = ref(false);

const toggleCategory = (tag: any) => {
  if (!selectedValues.value.some((i) => i.id === tag.id)) {
    selectedValues.value = [...selectedValues.value, tag];
  } else {
    selectedValues.value = selectedValues.value.filter(
      (item: any) => item.id !== tag.id,
    );
  }
  modelValue.value = selectedValues.value.map((val) => val.id);
};

const filteredProducts = computed(() =>
  products.value.filter(
    (product) =>
      !selectedValues.value.some((selected) => selected.id === product.id),
  ),
);

watch(selectAllProducts, (checked) => {
  if (checked === true) {
    modelValue.value = products.value.map((val) => val.id);
  } else {
    modelValue.value = selectedValues.value.map((val) => val.id);
  }
});

const allProducts = computed(() => products.value.map(({ id }) => id));

onMounted(async () => {
  await getAllProducts();
});
</script>

<style scoped></style>
