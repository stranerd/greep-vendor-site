<template>
  <div class="">
    <div class="grid max-w-[60%] gap-4">
      <FormField v-slot="{ componentField, handleChange }" name="promoType">
        <FormItem>
          <FormLabel>Promo Type</FormLabel>
          <FormControl>
            <Select v-bind="componentField" class="">
              <SelectTrigger class="border border-[#999]">
                <SelectValue
                  placeholder="Select an option"
                  class="ml-2 mr-auto block text-black"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem :value="type" v-for="(type, index) in promoTypes">
                    <div class="flex gap-x-2">
                      <TicketDiscountIcon class="block h-5 w-5" />
                      <span class="">{{ type }}</span>
                    </div>
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField, handleChange }" name="promoDuration">
        <FormItem>
          <FormLabel>Promo Duration</FormLabel>
          <FormControl>
            <Select v-bind="componentField" class="">
              <SelectTrigger class="border border-[#999]">
                <SelectValue
                  placeholder="Select an option"
                  class="ml-2 mr-auto block text-black"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem
                    :value="type"
                    v-for="(type, index) in promoDurations"
                  >
                    <div class="flex items-center gap-x-2">
                      <ClockIcon class="h-5 w-5" />
                      {{ type }}
                    </div>
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField, handleChange }" name="description">
        <FormItem>
          <FormLabel>Description</FormLabel>
          <FormControl>
            <Textarea v-bind="componentField" class="h-40" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField, handleChange }" name="settings">
        <FormItem>
          <FormLabel>Settings</FormLabel>
          <FormControl>
            <Select v-bind="componentField" class="">
              <SelectTrigger class="border border-[#999]">
                <SelectValue
                  placeholder="Select an option"
                  class="ml-2 mr-auto block text-black"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem
                    :value="type"
                    v-for="(type, index) in discountTypes"
                  >
                    <div class="flex items-center gap-x-2">
                      <ReserveIcon class="h-5 w-5" />
                      {{ type }}
                    </div>
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
    </div>
    <div class="mt-20 grid grid-cols-2 gap-10">
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
import { useAuthStore } from "@/store/useAuthStore";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { GP_ROUTES } from "~/constants/route-names";

import {
  TicketDiscountIcon,
  ClockIcon,
  ReserveIcon,
} from "@placetopay/iconsax-vue/outline";

const promoTypes = ref(["Items Discount", "Free Delivery"]);
const discountTypes = ref(["Percentage discount", "Fixed Amount discount"]);
const promoDurations = ref([
  "12 Hours",
  "24 Hours",
  "48 Hours",
  "72 Hours",
  "5 Days",
  "1 Week",
  "2 Weeks",
  "3 Weeks",
  "1 Month",
  "2 Months",
  "3 Months",
  "6 Months",
]);

const vendorTypeSchema = toTypedSchema(
  z.object({
    name: z.string({ message: "store name is required" }).min(3, {
      message: "store name cannot be less than 3 characters",
    }),
    email: z
      .string({
        message: "Store email is required",
      })
      .email({ message: "please enter a valid email address" }),

    banner: z.any({
      required_error: "Image is required",
    }),

    website: z
      .string({ message: "store website is required" })
      .url({ message: "please enter a valid URL" }),
  }),
);
</script>

<style scoped></style>
