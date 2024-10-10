<template>
  <div>
    <form class="space-y-8" @submit="onSubmit" v-if="openMainModal">
      <div class="grid gap-4">
        <div class="grid gap-2">
          <FormField v-slot="{ componentField }" name="title">
            <FormItem>
              <FormLabel
                >Item name
                <span class="text-[#FF5656]">Required</span></FormLabel
              >
              <FormControl>
                <Input type="text" placeholder="Rice" v-bind="componentField" />
              </FormControl>
              <!-- <FormDescription>
                    This is your public display name.
                  </FormDescription> -->
              <FormMessage />
            </FormItem>
          </FormField>
        </div>
        <div class="grid gap-2">
          <FormField v-slot="{ componentField }" name="description">
            <FormItem>
              <FormLabel
                >Item description
                <span class="text-[#FF5656]">Required</span></FormLabel
              >
              <FormControl>
                <Textarea
                  placeholder="Type description"
                  v-bind="componentField"
                />
              </FormControl>
              <!-- <FormDescription>
                    This is your public display name.
                  </FormDescription> -->
              <FormMessage />
            </FormItem>
          </FormField>
        </div>
        <div>
          <Label>Set Category </Label>
          <div class="relative mt-3 h-auto overflow-y-auto">
            <Badge
              v-for="framework in selectedValues"
              :key="framework.value"
              variant="outline"
              class="mb-2 mr-2 px-3 py-2"
            >
              {{ framework.title }}
              <X class="ml-3 h-[16px] w-[16px]" />
            </Badge>
          </div>
          <Popover v-model:open="openCombobox">
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
                      ? "Select categories"
                      : selectedValues.length === 1
                        ? selectedValues[0].title
                        : selectedValues.length === 2
                          ? selectedValues.map(({ title }) => title).join(", ")
                          : `${selectedValues.length} tags selected`
                  }}
                </span>
                <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent class="w-[350px] p-0">
              <Command loop>
                <CommandInput
                  placeholder="Search tag..."
                  v-model="inputValue"
                />
                <CommandGroup class="max-h-[145px] overflow-auto">
                  <CommandItem
                    v-for="tag in productItemsTags"
                    :key="tag.id"
                    :value="tag.id"
                    @select="toggleTags(tag)"
                  >
                    <TicketDiscountIcon
                      class="mr-2 h-4 w-4"
                      :class="{
                        'text-primary opacity-100':
                          selectedValues.includes(tag),
                        'opacity-20': !selectedValues.includes(tag),
                      }"
                    />
                    <div
                      class="flex-1 capitalize"
                      :class="{
                        'font-semibold text-primary opacity-100':
                          selectedValues.includes(tag),
                        'opacity-20': !selectedValues.includes(tag),
                      }"
                    >
                      {{ tag.title }}
                    </div>
                  </CommandItem>
                </CommandGroup>
                <CommandSeparator alwaysRender />
                <CommandGroup>
                  <CommandItem
                    value="createCategory"
                    class="text-xs text-muted-foreground"
                    @select="openCategoryModal"
                  >
                    <div class="mr-2 h-4 w-4"></div>
                    <CirclePlus class="mr-2 h-4 w-4" />
                    Create a new category
                  </CommandItem>
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <div class="grid grid-cols-3 gap-2">
          <FormField name="currency" class="col-span-1">
            <FormItem class="col-span-1 flex flex-col">
              <FormLabel class="mb-[6px] block"
                >Currency <span class="text-[#FF5656]">*</span></FormLabel
              >
              <Popover>
                <PopoverTrigger as-child>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      :class="
                        cn(
                          'w-full justify-between',
                          !values.currency && 'text-muted-foreground',
                        )
                      "
                    >
                      {{
                        values.currency
                          ? currencies.find(
                              (currency) => currency.value === values.currency,
                            )?.label
                          : "Select currency..."
                      }}
                      <ChevronsUpDown
                        class="ml-2 h-4 w-4 shrink-0 opacity-50"
                      />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent class="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Search language..." />
                    <CommandEmpty>Nothing found.</CommandEmpty>
                    <CommandList>
                      <CommandGroup>
                        <CommandItem
                          v-for="currency in currencies"
                          :key="currency.value"
                          :value="currency.label"
                          @select="
                            () => {
                              setFieldValue('currency', currency.value);
                            }
                          "
                        >
                          <Check
                            :class="
                              cn(
                                'mr-2 h-4 w-4',
                                currency.value === values.currency
                                  ? 'opacity-100'
                                  : 'opacity-0',
                              )
                            "
                          />
                          {{ currency.label }}
                        </CommandItem>
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField
            v-slot="{ componentField }"
            name="price"
            class="col-span-2"
          >
            <FormItem class="col-span-2">
              <FormLabel
                >Price <span class="text-[#FF5656]">Required</span></FormLabel
              >
              <FormControl>
                <Input
                  type="number"
                  placeholder="Price"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>
        <div class="grid gap-2">
          <FormField name="banner" v-slot="{ handleChange }">
            <FormItem>
              <FormLabel
                >Item Image
                <span class="text-[#FF5656]">Required</span></FormLabel
              >
              <FormControl>
                <Input
                  type="file"
                  placeholder="File"
                  @change="handleChange"
                  accept="image/*"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>
        <div class="grid gap-2">
          <FormField v-slot="{ value, handleChange }" name="inStock">
            <FormItem>
              <FormControl>
                <div class="flex items-center gap-[8px]">
                  <Switch
                    id="inStock"
                    :checked="value"
                    class="data-[state=checked]:bg-[#10BB76]"
                    aria-readonly
                    @update:checked="handleChange"
                  />
                  <FormLabel for="inStock">Availability</FormLabel>
                </div>
              </FormControl>
            </FormItem>
          </FormField>
        </div>
        <div class="mt-4 flex items-center justify-end">
          <Button variant="ghost" class="mr-3 rounded-[12px]"> Cancel </Button>

          <Button
            type="submit"
            class="rounded-[12px]"
            :loading="
              marketplaceLoadingStates.createProduct === API_STATES.LOADING
            "
            @click="onSubmit"
          >
            Submit Item
          </Button>
        </div>
      </div>
    </form>

    <client-only>
      <CreateProductTags
        type="productsItems"
        @close="closeCategoryModal"
        v-if="openCreateCategoryModal"
      />
    </client-only>
  </div>
</template>

<script setup lang="ts">
import * as z from "zod";
import { Check, ChevronsUpDown, CirclePlus, X } from "lucide-vue-next";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { API_STATES } from "~/services/constants";
import { useMarketPlaceStore } from "@/store/useMarketplace";
import { TicketIcon, TicketDiscountIcon } from "@placetopay/iconsax-vue/bold";
import { cn } from "@/lib/utils";

const marketPlaceStore = useMarketPlaceStore();
const { marketplaceLoadingStates, productItemsTags } =
  storeToRefs(marketPlaceStore);

const { createProduct, getProductItemsTags } = marketPlaceStore;

const openCombobox = ref<boolean>(false);
const openDialog = ref<boolean>(false);
const openMainModal = ref<boolean>(true);
const openCreateCategoryModal = ref<boolean>(false);
const inputValue = ref<string>("");
const selectedValues = ref<any[]>([]);

const closeCategoryModal = () => {
  openCreateCategoryModal.value = false;
  openMainModal.value = true;
};

const openCategoryModal = () => {
  openCreateCategoryModal.value = true;
  openMainModal.value = false;
};

const formSchema = toTypedSchema(
  z.object({
    title: z.string().min(3, {
      message: "Title cannot be less than 3 characters",
    }),
    description: z.string({
      required_error: "Description cannot be empty",
    }),
    price: z.number({
      required_error: "Price cannot be empty",
    }),
    banner: z.any({
      required_error: "Image is required",
    }),
    inStock: z.boolean(),
    currency: z.string({
      required_error: "Required",
    }),
  }),
);

const props = defineProps({
  mode: {
    type: String,
    default: "create",
  },
  selectedProduct: {
    type: Object,
    default: () => {},
  },
});

const { handleSubmit, resetForm, setFieldValue, values } = useForm({
  validationSchema: formSchema,
  initialValues: {
    inStock: true,
    currency: "TRY",
  },
});

const currencies = [
  { label: "NGN", value: "NGN" },
  { label: "TRY", value: "TRY" },
];

const file = ref(null);
const categories = ref([
  {
    title: "Stuff",
    value: "stuff",
  },
]);

const toggleTags = (tag: any) => {
  if (!selectedValues.value.some((i) => i.id === tag.id)) {
    selectedValues.value = [...selectedValues.value, tag];
  } else {
    selectedValues.value = selectedValues.value.filter(
      (item: any) => item.id !== tag.id,
    );
  }
};

const emits = defineEmits(["completed"]);

const onSubmit = handleSubmit(async (values: any) => {
  console.log("Form submitted!", values);
  const form = new FormData();
  Object.keys({ ...values, tagIds: [""] }).forEach((item) => {
    if (item === "price") {
      form.append(
        item,
        JSON.stringify({ amount: values[item], currency: values.currency }),
      );
    } else if (item === "tagIds") {
      form.append(item, JSON.stringify([]));
    } else {
      form.append(item, values[item]);
    }
  });
  await createProduct(form);
  emits("completed");
});

onMounted(async () => {
  if (props.mode === "edit") {
    const { inStock, title, description, tagIds, price, banner } =
      props.selectedProduct;
    (selectedValues.value = productItemsTags.value.filter((tag) =>
      tagIds.includes(tag.id),
    )),
      resetForm({
        values: {
          inStock,
          title,
          description,
          price: price.amount,
          currency: price.currency,
          banner,
        },
      });
  }
  getProductItemsTags();
});
</script>

<style></style>
