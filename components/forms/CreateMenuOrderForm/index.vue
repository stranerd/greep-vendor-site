<template>
  <div
    class="relative z-50 mt-4 grid max-h-[78vh] w-[80vw] gap-4 overflow-y-scroll text-gray-600 md:w-full"
  >
    <form class="space-y-8" @submit="onSubmit">
      <div class="grid gap-4">
        <div class="grid gap-2">
          <FormField v-slot="{ componentField }" name="to">
            <FormItem>
              <FormLabel
                >Customer Address
                <span class="text-[#FF5656]">Required</span></FormLabel
              >
              <FormControl>
                <LocationPicker
                  type="text"
                  placeholder="Lagos"
                  class="focus:ring-none text-sm"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>

        <div class="grid gap-2">
          <Label
            >Select Items <span class="text-[#FF5656]">Required</span></Label
          >
          <div
            v-for="(cartItem, index) in productsArray"
            :key="index"
            class="mb-3"
          >
            <div class="mb-3 flex items-center gap-[20px]">
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
                <PopoverContent class="z-[9999] w-[200px] !bg-primary p-0">
                  <Command
                    resetSearchTermOnBlur
                    v-model:searchTerm="searchTerm"
                  >
                    <!-- ! :filterFunction="filterFunction" -->
                    <!--NOTE @update:search-term="searchProducts" -->

                    <CommandInput
                      class="h-9"
                      placeholder="Search products..."
                    />
                    <CommandEmpty>No product found.</CommandEmpty>
                    <CommandList>
                      <CommandGroup>
                        <CommandItem
                          v-for="product in filteredProducts"
                          :key="product.value"
                          :value="product"
                          @select="
                            (ev) => {
                              if (
                                typeof ev.detail.value === 'object' &&
                                ev.detail.value !== null
                              ) {
                                cartItem.productId = ev.detail.value.value;
                              }
                              cartItem.open = false;
                            }
                          "
                        >
                          <h2
                            class="mb-2 flex w-full items-center justify-between border-b"
                          >
                            <span class="block">{{ product.label }} </span>
                            <span
                              class="block text-xs font-medium text-primary"
                            >
                              {{
                                gpNumbers.formatCurrency(
                                  product.price.amount,
                                  product.price.currency,
                                )
                              }}</span
                            >
                          </h2>
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

              <TrashIcon
                :class="
                  cartItem.productId && productsArray.length > 1
                    ? 'visible'
                    : 'invisible'
                "
                class="mr-4 h-8 w-8 text-primary"
                @click="productsArray.splice(index, 1)"
              />
            </div>

            <!-- AddOns List -->

            <div class="ml-10">
              <div
                class="mb-3 flex items-center gap-[20px]"
                v-for="(addOnItem, index) in cartItem.addOns"
              >
                <div>
                  <div class="min-h-1 min-w-1 rounded-full bg-[#000]"></div>
                </div>
                <Popover v-model:open="addOnItem.openAddOns">
                  <PopoverTrigger as-child>
                    <Button
                      variant="outline"
                      role="combobox"
                      class="w-full justify-between"
                    >
                      {{
                        addOnItem.itemName !== ""
                          ? cartItem.addOns.find(
                              (addOn) => addOn.itemName === addOnItem.itemName,
                            )?.itemName
                          : "Select add on..."
                      }}
                      <ChevronsUpDown
                        class="ml-2 h-4 w-4 shrink-0 opacity-50"
                      />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent class="z-[9999] w-[200px] !bg-primary p-0">
                    <Command resetSearchTermOnBlur>
                      <CommandInput
                        class="h-9"
                        placeholder="Search addOns..."
                      />
                      <CommandEmpty>No add on found.</CommandEmpty>
                      <CommandList>
                        <CommandGroup>
                          <CommandItem
                            v-for="(addOn, index) in formattedProducts
                              .find(
                                (product) =>
                                  cartItem.productId === product.value,
                              )
                              ?.addOns.filter(
                                (addOn) =>
                                  !cartItem.addOns.some(
                                    (item) =>
                                      item.itemName === addOn.itemName &&
                                      item.itemName !== '',
                                  ),
                              )"
                            :key="index"
                            :value="addOn"
                            @select="
                              (ev) => {
                                if (
                                  typeof ev.detail.value === 'object' &&
                                  ev.detail.value !== null
                                ) {
                                  selectAddOn(
                                    cartItem.productId,
                                    ev.detail.value as AddOn,
                                  );
                                }
                                addOnItem.openAddOns = false;
                              }
                            "
                          >
                            <h2
                              class="mb-2 flex w-full items-center justify-between border-b"
                            >
                              <span class="block">{{ addOn.itemName }} </span>
                              <span
                                class="block text-xs font-medium text-primary"
                              >
                                {{
                                  gpNumbers.formatCurrency(
                                    addOn.price.amount,
                                    addOn.price.currency,
                                  )
                                }}</span
                              >
                            </h2>
                            <!-- <Check
                              :class="
                                cn(
                                  'ml-auto h-4 w-4',
                                   cartItem.productId === product.value 
                            ? 'opacity-100' : 'opacity-0', ) " /> -->
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
                    :disabled="!addOnItem.itemName"
                    v-model="addOnItem.quantity"
                    class="w-full min-w-[70px] max-w-[75px]"
                  />
                </div>
                <TrashIcon
                  :class="
                    addOnItem.itemName && cartItem.addOns.length > 1
                      ? 'visible'
                      : 'invisible'
                  "
                  class="mr-4 h-8 w-8 text-destructive"
                  @click="cartItem.addOns.splice(index, 1)"
                />
              </div>

              <div
                @click="addNewAddOn(cartItem.productId)"
                class="flex max-w-[190px] cursor-pointer items-center rounded-[6px] text-sm text-blue-800"
              >
                <CirclePlus class="mr-[6px] h-[20px] w-[20px]" /> Add another
                add On
              </div>
            </div>
          </div>
        </div>
        <div
          @click="addNewProduct"
          class="flex max-w-[190px] cursor-pointer items-center rounded-[6px]"
        >
          <CirclePlus class="mr-[6px] h-[20px] w-[20px]" /> Add another item
        </div>

        <div class="mt-4 flex items-center justify-end">
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
            Submit Itemnddn
          </Button>
        </div>
      </div>
    </form>

    <client-only>
      <CopyOrderCartLink
        :link="link"
        @completed="closeModal"
        :isOpen="isDialogOpen"
        @close="closeModal"
      />
    </client-only>
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
const { marketplaceLoadingStates, products, currentCart } =
  storeToRefs(marketPlaceStore);
import { cn, debounce } from "~/lib/utils";
import type { AddOnMapItem, IProduct } from "~/types/modules/marketPlaceModel";
import { TrashIcon } from "@placetopay/iconsax-vue/outline";
const { $moment } = useNuxtApp();

const {
  createProduct,
  clearCart,
  createOrder,
  createCartLink,
  searchVendorProducts,
  addToCart,
} = marketPlaceStore;

const emits = defineEmits(["completed", "close"]);

type AddOn = {
  groupName: string;
  itemName: string;
  quantity: number;
  openAddOns: boolean;
  price: {
    amount: number;
    currency: string;
  };
};

const link = ref("");
const searchTerm = ref("");
const savedIndex = ref(-1);

const df = new DateFormatter("en-US", {
  dateStyle: "long",
});

const isDialogOpen = ref(false);

const closeModal = () => emits("completed");
const openCopyOrderModal = () => {
  isDialogOpen.value = true;
};

const formattedProducts = computed(() => {
  return products.value.map((product: IProduct) => {
    return {
      value: product.id,
      label: product.title,
      price: product.price,
      addOns: Object.values(product.addOnsMap).map(
        ({ groupName, itemName, price }) => ({
          groupName,
          itemName,
          price,
          quantity: 1,
          openAddOns: false,
        }),
      ),
    };
  });
});

const productsArray = ref([
  {
    productId: "",
    quantity: 1,
    open: false,
    openAddOns: false,
    addOns: [
      {
        groupName: "",
        itemName: "",
        quantity: 1,
        price: { amount: 10, currency: "TRY" },
        openAddOns: false,
      },
    ] as AddOn[],
  },
]);

const filteredProducts = computed(() =>
  formattedProducts.value.filter(
    (product) =>
      !productsArray.value.some((item) => product.value === item.productId),
  ),
);

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
}, 1500);

const addNewProduct = () => {
  const index = productsArray.value.length;
  const lastItem = productsArray.value[index - 1];
  if (lastItem?.productId && lastItem?.quantity) {
    productsArray.value = [
      ...productsArray.value,
      {
        productId: "",
        quantity: 1,
        open: false,
        openAddOns: false,
        addOns: [
          {
            groupName: "",
            itemName: "",
            price: { amount: 10, currency: "NGN" },
            quantity: 1,
            openAddOns: false,
          },
        ],
      },
    ];
  }
};

const addNewAddOn = (productId: string) => {
  const product = productsArray.value.find(
    (product) => product.productId === productId,
  );

  if (product) {
    const index = product.addOns.length;
    const lastItem = product.addOns[index - 1];
    if (lastItem?.itemName && lastItem?.quantity) {
      product.addOns = [
        ...product.addOns,
        {
          groupName: "",
          itemName: "",
          price: { amount: 10, currency: "NGN" },
          quantity: 1,
          openAddOns: false,
        },
      ];
    }
  }
};

const selectAddOn = (productId: string, addOn: AddOn) => {
  const product = productsArray.value.find(
    (product) => product.productId === productId,
  );

  if (product) {
    if (
      product.addOns.some((addOnItem) => addOnItem.itemName === addOn.itemName)
    ) {
    } else {
      product.addOns = product.addOns.filter(
        (addItem: AddOn) => addItem.itemName,
      );
      product.addOns.push(addOn);
    }
  }
};

const addItemToCart = (index: number) => {
  savedIndex.value = index;
  const item = productsArray.value[index];
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

const onSubmit = handleSubmit(async (values: any) => {
  const payload = {
    ...values,
    packs: [
      productsArray.value.map((product) => {
        return {
          id: product.productId,
          quantity: product.quantity,
          addOns: product.addOns
            .filter((item) => item.itemName)
            .map(({ groupName, itemName, quantity }) => ({
              groupName,
              itemName,
              quantity,
            })),
        };
      }),
    ],
  };

  const paymentLink = await createCartLink(payload);

  if (
    marketPlaceStore.marketplaceLoadingStates.createCartLink ===
    API_STATES.SUCCESS
  ) {
    if (typeof paymentLink === "string") link.value = paymentLink;
    openCopyOrderModal();
  }
});

// onMounted(async () => {
//   const productsResults = await searchVendorProducts({
//     search: { value: "", fields: ["title", "description"] },
//   });
//   products.value = productsResults;
// });

onBeforeUnmount(() => {
  // clearCart();
});
</script>

<style></style>
