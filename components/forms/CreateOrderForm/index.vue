<template>
  <div class="relative mt-4 grid max-h-[78vh] gap-4 overflow-y-scroll">
    <form class="space-y-8" @submit="onSubmit">
      <div class="grid gap-4">
        <!-- <div class="grid gap-2">
          <FormField v-slot="{ componentField }" name="to">
            <FormItem>
              <FormLabel
                >Customer Address
                <span class="text-[#FF5656]">Required</span></FormLabel
              >
              <FormControl>
                <Input
                  type="text"
                  placeholder="Lagos"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div> -->
        <div class="grid gap-2">
          <Label
            >Select Items <span class="text-[#FF5656]">Required</span></Label
          >
          <div
            v-for="(cartItem, i) in productsArray"
            :key="i"
            class="mb-3 flex items-center gap-[20px]"
          >
            <div>
              <div class="min-h-1 min-w-1 rounded-full bg-[#000]"></div>
            </div>
            <Popover v-model:open="cartItem.open">
              <PopoverTrigger as-child>
                <Button
                  variant="outline"
                  role="combobox"
                  :aria-expanded="cartItem.open"
                  class="w-full justify-between"
                >
                  {{
                    cartItem.productId
                      ? formattedProducts.find(
                          (product) => product.value === cartItem.productId,
                        )?.label
                      : "Select product..."
                  }}
                  <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent class="w-[200px] p-0">
                <Command
                  resetSearchTermOnBlur
                  :filterFunction="filterFunction"
                  v-model:searchTerm="searchTerm"
                  @update:search-term="searchProducts"
                >
                  <CommandInput class="h-9" placeholder="Search products..." />
                  <CommandEmpty>No product found.</CommandEmpty>
                  <CommandList>
                    <CommandGroup>
                      <CommandItem
                        v-for="product in formattedProducts"
                        :key="product.value"
                        :value="product.value"
                        @select="
                          (ev) => {
                            if (typeof ev.detail.value === 'string') {
                              cartItem.productId = ev.detail.value;
                            }
                            cartItem.open = false;
                          }
                        "
                      >
                        {{ product.label }}
                        <Check
                          :class="
                            cn(
                              'ml-auto h-4 w-4',
                              cartItem.productId === product.value
                                ? 'opacity-100'
                                : 'opacity-0',
                            )
                          "
                        />
                      </CommandItem>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <div class="flex items-center">
              <Label class="mr-2">Qty </Label>
              <Input
                type="number"
                placeholder="00"
                :disabled="!cartItem.productId"
                v-model="cartItem.quantity"
                class="w-full min-w-[70px] max-w-[75px]"
              />
            </div>
            <!-- <div
              v-if="cartItem.quantity && cartItem.productId"
              class="cursor-pointer flex bg-[#E0E2E4] text-[#000] py-[10px] px-3 rounded-[6px]"
              @click="addItemToCart(i)"
            >
              <LoaderCircle
                v-if="
                  marketplaceLoadingStates.addToCart === API_STATES.LOADING &&
                  savedIndex === i
                "
                class="mr-2 h-4 w-4 animate-spin"
              />
              Save
            </div> -->
          </div>
        </div>
        <div
          @click="addNewProduct"
          class="flex max-w-[190px] cursor-pointer items-center rounded-[6px]"
        >
          <CirclePlus class="mr-[6px] h-[20px] w-[20px]" /> Add another item
        </div>
        <!-- 
        <div class="flex gap-[20px]">
          <FormField v-slot="{ field, value }" name="time">
            <FormItem class="flex grow flex-col">
              <FormLabel class="mb-[10px]">Delivery date</FormLabel>
              <Popover>
                <PopoverTrigger as-child>
                  <FormControl>
                    <Button
                      variant="outline"
                      :class="
                        cn(
                          'w-full grow justify-start text-left font-normal',
                          !value && 'text-muted-foreground',
                        )
                      "
                    >
                      <CalendarIcon class="mr-2 h-4 w-4 opacity-50" />
                      <span>{{
                        value
                          ? $moment(dateValue).format("MMMM Do, YYYY")
                          : "Pick a date"
                      }}</span>
                    </Button>
                  </FormControl>
                </PopoverTrigger>

                <PopoverContent class="p-0">
                  <Calendar
                    v-model:placeholder="placeholder"
                    v-model="dateValue"
                    calendar-label="Delivery Date"
                    initial-focus
                    :min-value="today(getLocalTimeZone())"
                    @update:model-value="
                      (v) => {
                        if (v) {
                          dateValue = v;
                          setFieldValue('time', toDate(v).toISOString());
                        } else {
                          dateValue = undefined;
                          setFieldValue('time', undefined);
                        }
                      }
                    "
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
            <input type="hidden" v-bind="field" />
          </FormField>

          <FormField v-slot="{ componentField }" name="deliveryTime">
            <FormItem class="grow">
              <FormLabel>Time </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="12:00"
                  class="w-full"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>

        <FormField v-slot="{ componentField }" name="discount">
          <FormItem class="grow">
            <FormLabel>Discount </FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="10"
                class="w-full"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="dropoffNote">
          <FormItem>
            <FormLabel>Drop off note </FormLabel>
            <FormControl>
              <Textarea placeholder="Type note" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField> -->

        <DialogFooter class="mt-4 flex items-center justify-end">
          <Button
            variant="ghost"
            type="button"
            class="mr-3 rounded-[12px]"
            @click="$emit('completed')"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            class="rounded-[12px]"
            :loading="
              marketplaceLoadingStates.createCartLink === API_STATES.LOADING
            "
            @click="onSubmit"
          >
            Submit Item
          </Button>
        </DialogFooter>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import * as z from "zod";
import {
  Check,
  ChevronsUpDown,
  CirclePlus,
  X,
  LoaderCircle,
  Calendar as CalendarIcon,
} from "lucide-vue-next";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { API_STATES } from "~/services/constants";
import { useMarketPlaceStore } from "@/store/useMarketplace";
import {
  CalendarDate,
  DateFormatter,
  getLocalTimeZone,
  parseDate,
  today,
} from "@internationalized/date";
import { toDate } from "radix-vue/date";

const marketPlaceStore = useMarketPlaceStore();
const { marketplaceLoadingStates, currentCart } = storeToRefs(marketPlaceStore);
import { cn, debounce } from "~/lib/utils";
import type { IProduct } from "~/types/modules/marketPlaceModel";
const { $moment } = useNuxtApp();

const {
  createProduct,
  searchVendorProducts,
  addToCart,
  clearCart,
  createOrder,
  createCartLink,
} = marketPlaceStore;

const df = new DateFormatter("en-US", {
  dateStyle: "long",
});

const products = ref<Array<IProduct>>([]);
const formattedProducts = computed(() => {
  return products.value.map((product: IProduct) => {
    return {
      value: product.id,
      label: product.title,
    };
  });
});

const searchTerm = ref("");
const savedIndex = ref(-1);
const placeholder = ref();
const dateValue = ref();

const productsArray = ref([
  {
    productId: "",
    quantity: 1,
    open: false,
  },
]);

const formSchema = toTypedSchema(
  z.object({
    // to: z.string({
    //   required_error: "Address cannot be empty",
    // }),
    // discount: z.number({
    //   required_error: "Discount cannot be empty",
    // }),
    // dropoffNote: z.string().optional(),
    // deliveryTime: z.string({
    //   required_error: "Delivey time is required",
    // }),
    // time: z
    //   .string()
    //   .datetime()
    //   .optional()
    //   .refine((date: any) => date !== undefined, "Please select a valid date."),
  }),
);

const { handleSubmit, setFieldValue, resetForm, isSubmitting } = useForm({
  validationSchema: formSchema,
  initialValues: {
    to: "",
  },
});

const searchProducts = debounce(async (value: any) => {
  const productsResponse = await searchVendorProducts({
    search: { value, fields: ["title", "description"] },
  });
  products.value = productsResponse;
  console.log(value, { productsResponse });
}, 1500);

const addNewProduct = () => {
  const index = productsArray.value.length;
  const lastItem = productsArray.value[index - 1];
  if (lastItem?.productId && lastItem?.quantity) {
    productsArray.value = [
      ...productsArray.value,
      { productId: "", quantity: 1, open: false },
    ];
  }
};

const addItemToCart = (index: number) => {
  savedIndex.value = index;
  const item = productsArray.value[index];
  delete item?.open;
  console.log(item);

  addToCart({ ...item, add: true });
};

const filterFunction = (
  val: string[] | number[] | false[] | true[] | Record<string, any>[],
  term: string,
) => val;

type SelectItems = {
  value: string;
  label: string;
};

const emits = defineEmits(["completed"]);

const onSubmit = handleSubmit(async (values: any) => {
  const payload = {
    ...values,
    packs: [
      productsArray.value.map((product: any) => {
        return {
          id: product.productId,
          quantity: product.quantity,
          addOns: [],
        };
      }),
    ],
    // to: {
    //   coords: [2, 4],
    //   location: values.to,
    //   description: "Location",
    // },
    // // cartId: currentCart.value.id,
    // payment: "wallet",
    // time: {
    //   date: new Date(values.time).getTime(),
    //   time: values.deliveryTime,
    // },
  };
  // delete payload.deliveryTime;

  await createCartLink(payload);
  emits("completed");
});

onMounted(async () => {
  const productsResults = await searchVendorProducts({
    search: { value: "", fields: ["title", "description"] },
  });
  products.value = productsResults;
});

onBeforeUnmount(() => {
  // clearCart();
});
</script>

<style></style>
