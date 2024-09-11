<template>
  <div class="">
    <div>
      <form class="grid gap-6 lg:max-w-[60%]" @submit="createPromotion">
        <FormField v-slot="{ componentField, handleChange }" name="title">
          <FormItem>
            <FormLabel>
              Promo Title
              <span class="font-normal text-destructive">Required</span>
            </FormLabel>
            <FormControl>
              <Input
                v-bind="componentField"
                class=""
                v-model="promotion.title"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField, handleChange }" name="promoType">
          <FormItem>
            <FormLabel>
              Promo Type
              <span class="font-normal text-destructive">Required</span>
            </FormLabel>
            <FormControl>
              <Select
                v-bind="componentField"
                class=""
                v-model="selectedPromoType"
              >
                <SelectTrigger class="border border-[#999]">
                  <SelectValue
                    placeholder="Select an option"
                    class="ml-2 mr-auto block text-black"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem
                      :value="type.id"
                      v-for="(type, index) in promoTypes"
                    >
                      <div class="flex gap-x-2">
                        <TicketDiscountIcon class="block h-5 w-5" />
                        <span class="">{{ type.label }}</span>
                      </div>
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField
          v-slot="{ componentField, handleChange }"
          name="promoDuration"
        >
          <FormItem>
            <FormLabel>
              Promo Duration
              <span class="font-normal text-destructive">Required</span>
            </FormLabel>
            <PromotionDatePicker v-model="promotion.validity" />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField, handleChange }" name="banner">
          <FormItem>
            <FormLabel>
              Promo Cover
              <span class="font-normal text-destructive">Required</span>
            </FormLabel>
            <FormControl>
              <Input
                type="file"
                placeholder="select cover"
                v-bind="componentField"
                accept="image/*"
                v-model="promotion.banner"
                @change="handleChange"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField, handleChange }" name="settings">
          <FormItem>
            <FormLabel>
              Products Availability
              <span class="font-normal text-destructive">Required</span>
            </FormLabel>
            <PromotionProductPicker v-model="promotion.productIds" />
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField, handleChange }" name="description">
          <FormItem>
            <FormLabel
              >Description
              <span class="font-normal text-destructive">Required</span>
            </FormLabel>
            <FormControl>
              <Textarea
                v-bind="componentField"
                class="h-40"
                v-model="promotion.description"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <transition mode="out-in" name="fade" class="" appear>
          <div v-if="selectedPromoType === 'itemsDiscount'" class="grid gap-5">
            <FormField
              v-slot="{ componentField, handleChange }"
              name="settings"
            >
              <div class="">
                <h2 class="mt-5 text-lg font-bold">Settings</h2>
                <h2 class="text-sm font-light">
                  Select discount settings for food items
                </h2>
              </div>
              <FormItem>
                <FormLabel>Items discount type</FormLabel>
                <FormControl>
                  <Select
                    v-bind="componentField"
                    class=""
                    v-model="selectedDiscountType"
                  >
                    <SelectTrigger class="border border-[#999]">
                      <SelectValue
                        placeholder="Select an option"
                        class="ml-2 mr-auto block text-black"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem
                          :value="type.id"
                          v-for="(type, index) in discountTypes"
                        >
                          <div class="flex items-center gap-x-2">
                            <ReserveIcon class="h-5 w-5" />
                            {{ type.label }}
                          </div>
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField
              v-slot="{ componentField, handleChange }"
              name="percentage"
              v-if="selectedDiscountType === 'fixedAmountDiscount'"
            >
              <FormItem class="flex items-center gap-x-5">
                <FormLabel class="w-max whitespace-nowrap">Amount</FormLabel>
                <FormControl>
                  <Select
                    v-bind="componentField"
                    class=""
                    v-model="selectedCurrency"
                  >
                    <SelectTrigger class="max-w-40">
                      <SelectValue
                        placeholder="Select an option"
                        class="ml-2 mr-auto block text-black"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem
                          :value="currency"
                          v-for="(currency, index) in currencyTypes"
                        >
                          <div class="flex items-center gap-x-2">
                            {{ currency }}
                          </div>
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <Input
                    v-bind="componentField"
                    class="max-w-40"
                    v-model="amount"
                    type="number"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <FormField
              v-slot="{ componentField, handleChange }"
              name="percentage"
              v-if="selectedDiscountType === 'percentageAmountDiscount'"
            >
              <FormItem class="flex items-center gap-x-5">
                <FormLabel class="w-max whitespace-nowrap"
                  >Percentage %</FormLabel
                >
                <FormControl>
                  <Select
                    v-bind="componentField"
                    class=""
                    v-model="selectedCurrency"
                  >
                    <SelectTrigger class="max-w-40">
                      <SelectValue
                        placeholder="Select an option"
                        class="ml-2 mr-auto block text-black"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem
                          :value="currency"
                          v-for="(currency, index) in currencyTypes"
                        >
                          <div class="flex items-center gap-x-2">
                            {{ currency }}
                          </div>
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormControl>
                  <Input
                    v-model="percentage"
                    v-bind="componentField"
                    class="max-w-40"
                    type="number"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>
        </transition>
        <div class="my-10 flex items-center justify-center gap-x-5">
          <Button variant="ghost" type="button">Cancel</Button>
          <Button type="submit">Run Promo</Button>
        </div>
      </form>
    </div>

    <div class="mt-20 grid gap-10 lg:grid-cols-2">
      <Card class="">
        <CardHeader>
          <CardTitle class="space-x-5 text-lg"
            ><span class="mr-2">●</span> Item Discount</CardTitle
          >
        </CardHeader>
        <CardContent class="grid gap-4 text-sm">
          <p>
            There are two types of item discount that is available currently. It
            allows you to offer a fixed amount discount or a percentage to your
            users.
          </p>

          <h2 class="font-semibold">
            Create a Fixed Amount Discount for Your Items
          </h2>

          <p class="">
            Drive sales and incentivize customers to buy with a fixed amount
            discount on specific items!
          </p>
          <h2 class="font-semibold">Why create a fixed amount discount?</h2>

          <ul>
            <li>- Encourage customers to purchase specific items</li>
            <li>- Clear out inventory and make room for new products</li>
            <li>- Create a sense of urgency and drive sales</li>
          </ul>

          <h2 class="font-semibold">
            Create a Percentage Discount for Your Items
          </h2>

          <p class="">
            Boost sales and attract customers with a percentage discount on
            specific items!
          </p>
          <h2 class="font-semibold">Why create a percentage discount?</h2>
          <ul>
            <li>- Offer customers a percentage off their favorite items</li>
            <li>- Drive sales and increase average order value</li>
            <li>- Create a sense of value and encourage customer loyalty</li>
          </ul>
        </CardContent>
      </Card>
      <Card class="h-fit">
        <CardHeader>
          <CardTitle class="text-lg"
            ><span class="mr-2">●</span> Free Delivery</CardTitle
          >
        </CardHeader>
        <CardContent class="flex flex-col gap-4 text-sm">
          <h2 class="font-semibold">
            Activate Free Delivery Promotion for Your Store
          </h2>

          <p class="">
            Boost sales, enhance customer experience, and stay ahead of the
            competition by offering free delivery on all purchases!
          </p>
          <h2 class="font-semibold">Why activate free delivery?</h2>

          <ul>
            <li>- Increase average order value and drive sales</li>
            <li>- Enhance customer satisfaction and loyalty</li>
            <li>- Differentiate your store from competitors</li>
            <li>- Attract new customers and encourage repeat business</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as z from "zod";
import { ShopIcon, WindIcon } from "@placetopay/iconsax-vue/outline";
import { API_STATES } from "~/services/constants";
import { useMarketPlaceStore } from "@/store/useMarketplace";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { GP_ROUTES } from "~/constants/route-names";

import {
  TicketDiscountIcon,
  // ClockIcon,
  ReserveIcon,
} from "@placetopay/iconsax-vue/outline";

const router = useRouter();
const marketPlaceStore = useMarketPlaceStore();

const promoTypes = ref([
  { id: "itemsDiscount", label: "Items Discount" },
  { id: "freeDelivery", label: "Free Delivery" },
]);

const discountTypes = ref([
  { id: "fixedAmountDiscount", label: "Fixed Amount Discount" },
  { id: "percentageAmountDiscount", label: "Percentage Discount" },
]);

const selectedPromoType = ref<"itemsDiscount" | "freeDelivery">();

const selectedDiscountType = ref<
  "percentageAmountDiscount" | "fixedAmountDiscount"
>();

const currencyTypes = ref(["TRY", "NGN"]);
const selectedCurrency = ref<"TRY" | "NGN">("TRY");
const amount = ref(10);
const percentage = ref(0);

const data = () => {
  let value = { data: {} };

  if (selectedPromoType.value === "freeDelivery") {
    value = { data: { type: "freeDelivery" } };
    return value.data;
  }

  if (
    selectedPromoType.value === "itemsDiscount" &&
    selectedDiscountType.value === "percentageAmountDiscount"
  ) {
    value = {
      data: {
        type: "percentageAmountDiscount",
        percentage: percentage.value,
        amount: amount.value,
        currency: selectedCurrency.value,
      },
    };
    return value.data;
  }
  if (
    selectedPromoType.value === "itemsDiscount" &&
    selectedDiscountType.value === "fixedAmountDiscount"
  ) {
    value = {
      data: {
        type: "fixedAmountDiscount",
        amount: amount.value,
        currency: selectedCurrency.value,
        lowerLimit: amount.value + 200 * 0.5,
      },
    };
    return value.data;
  }
};

const promotion = ref({
  title: "",
  description: "",
  validity: {},
  productIds: [],
  banner: "",
});

const formSchema = toTypedSchema(
  z.object({
    title: z.string().min(3, {
      message: "Title cannot be less than 3 characters",
    }),
    description: z.string({
      required_error: "Description cannot be empty",
    }),
    banner: z.any({
      required_error: "Image is required",
    }),
  }),
);

const { handleSubmit, resetForm, setFieldValue, values, errors } = useForm({
  validationSchema: formSchema,
  initialValues: {},
});

const createPromotion = handleSubmit(async (values: any) => {
  const payload: any = { ...promotion.value, ...values, data: data() };
  const formData = new FormData();
  Object.keys(payload).map((i) => {
    if (i !== "banner") formData.append(i, JSON.stringify(payload[i]));
    else formData.append(i, payload[i]);
  });
  await marketPlaceStore.createPromotion(formData);
  router.push({ name: GP_ROUTES.VENDOR.PROMOTIONS });
});

onMounted(async () => {
  await marketPlaceStore.getAllProducts();
});
</script>

<style scoped></style>
