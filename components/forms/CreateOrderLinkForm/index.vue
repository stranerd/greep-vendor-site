<template>
  <div class="grid gap-4 mt-4">
    <form class="space-y-8" @submit="onSubmit">
      <div class="grid gap-4">
        <div class="grid gap-2">
          <FormField v-slot="{ componentField }" name="to">
            <FormItem>
              <FormLabel
                >Address <span class="text-[#FF5656]">Required</span></FormLabel
              >
              <FormControl>
                <Input
                  type="text"
                  placeholder="Lagos"
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

        <div class="flex gap-[20px]">
          <FormField v-slot="{ field, value }" name="time">
            <FormItem class="flex flex-col grow">
              <FormLabel class="mb-[10px]">Delivery date</FormLabel>
              <Popover>
                <PopoverTrigger as-child>
                  <FormControl>
                    <Button
                      variant="outline"
                      :class="
                        cn(
                          'w-full grow justify-start text-left font-normal',
                          !value && 'text-muted-foreground'
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
            <!-- <FormDescription>
                      This is your public display name.
                    </FormDescription> -->
            <FormMessage />
          </FormItem>
        </FormField>
        <div class="flex items-center justify-end mt-4">
          <Button variant="ghost" class="rounded-[12px] mr-3"> Cancel </Button>

          <Button
            type="submit"
            class="rounded-[12px]"
            :loading="
              marketplaceLoadingStates.checkoutCartLink === API_STATES.LOADING
            "
            @click="onSubmit"
          >
            Submit Item
          </Button>
        </div>
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

const props = defineProps({
  cartLinkId: {
    type: String,
    default: "",
  },
});

const marketPlaceStore = useMarketPlaceStore();
const { marketplaceLoadingStates } = storeToRefs(marketPlaceStore);
import { cn, debounce } from "~/lib/utils";
import type { IProduct } from "~/types/modules/marketPlaceModel";
const { $moment } = useNuxtApp();

const { checkoutCartLink } = marketPlaceStore;

const df = new DateFormatter("en-US", {
  dateStyle: "long",
});

const placeholder = ref();
const dateValue = ref();

const formSchema = toTypedSchema(
  z.object({
    to: z.string({
      required_error: "Address cannot be empty",
    }),
    discount: z.number({
      required_error: "Discount cannot be empty",
    }),
    dropoffNote: z.string().optional(),
    deliveryTime: z.string({
      required_error: "Delivey time is required",
    }),
    time: z
      .string()
      .datetime()
      .optional()
      .refine((date: any) => date !== undefined, "Please select a valid date."),
  })
);

const { handleSubmit, setFieldValue, resetForm } = useForm({
  validationSchema: formSchema,
  initialValues: {
    to: "",
  },
});

const emits = defineEmits(["completed"]);

const onSubmit = handleSubmit(async (values: any) => {
  console.log("Form submitted!", values);

  const payload = {
    ...values,
    to: {
      coords: [2, 4],
      location: values.to,
      description: "Location",
    },
    cartLinkId: props.cartLinkId,
    payment: "cash",
    time: {
      date: new Date(values.time).getTime(),
      time: values.deliveryTime,
    },
  };
  delete payload.deliveryTime;
  await checkoutCartLink(payload);
  emits("completed");
});
</script>

<style></style>
