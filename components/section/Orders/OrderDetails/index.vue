<template>
  <div v-if="marketplaceLoadingStates.singleOrder === API_STATES.LOADING">
    <Skeleton class="h-[340px] w-full mb-6" />
    <Skeleton class="h-[540px] w-full" />
  </div>
  <div v-else-if="marketplaceLoadingStates.singleOrder === API_STATES.SUCCESS">
    <Card class="w-full mb-6">
      <CardHeader
        class="flex flex-row items-center justify-between space-y-0 pb-[10px]"
      >
        <CardTitle class="text-[20px] flex text-[#111827] font-medium">
          Order #{{ route?.params?.id?.slice(0, 8) || "" }}
        </CardTitle>
        <div class="flex items-center gap-2">
          <Badge
            variant="outline"
            class="rounded-[8px] font-normal text-[12px] py-1"
          >
            <div
              class="bg-[#B91010] w-[9px] h-[9px] rounded-[3px] mr-2"
              :class="paymentStatus(singleOrder?.status).color"
            ></div>
            {{ paymentStatus(singleOrder?.status).text }}
          </Badge>
          <Badge
            variant="outline"
            class="rounded-[8px] font-normal text-[12px] py-1"
          >
            <div
              class="w-[9px] h-[9px] rounded-[3px] mr-2"
              :class="orderStatus(singleOrder?.status).color"
            ></div>
            {{ orderStatus(singleOrder?.status).text }}
          </Badge>
          <client-only>
            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <Button aria-haspopup="true" size="icon" variant="ghost">
                  <Ellipsis class="h-[20px] w-[20px]" />
                  <span class="sr-only">Toggle menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  v-if="canAcceptOrRejectOrder"
                  @click="
                    rejectOrAcceptOrder(singleOrder?.id || '', {
                      accepted: true,
                      message: 'Order accepted',
                    })
                  "
                  >Accept order</DropdownMenuItem
                >
                <DropdownMenuItem
                  v-if="canAcceptOrRejectOrder"
                  @click="openDialog = true"
                  >Reject order</DropdownMenuItem
                >
                <DropdownMenuItem
                  v-if="canAcceptOrRejectOrder"
                  @click="cancelOrder(singleOrder?.id || '')"
                  >Cancel order</DropdownMenuItem
                >
                <DropdownMenuItem
                  :disabled="canShipOrder"
                  @click="markOrderAsShipped(singleOrder?.id)"
                  >Mark order as shipped</DropdownMenuItem
                >
              </DropdownMenuContent>
            </DropdownMenu>
          </client-only>
        </div>
      </CardHeader>
      <Dialog
        :open="openDialog"
        @update:open="
          (open) => {
            openDialog = open;
          }
        "
      >
        <DialogContent class="max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Reject reason</DialogTitle>
            <DialogDescription>
              Why are you rejecting the order
            </DialogDescription>
          </DialogHeader>
          <div class="overflow-scroll -mx-6 px-6 flex-1 py-2">
            <form @submit="onSubmit">
              <FormField v-slot="{ componentField }" name="message">
                <FormItem>
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
            </form>
          </div>
          <DialogFooter class="bg-opacity-40">
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
            <Button
              @click="onSubmit"
              :loading="
                marketplaceLoadingStates.rejectOrAcceptOrder ===
                API_STATES.LOADING
              "
              >Submit</Button
            >
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <CardContent>
        <div class="text-[#6B7280] text-[14px]">
          {{
            $moment(singleOrder?.createdAt || "").format(
              "MMM DD, YYYY, hh:mm a",
            )
          }}
        </div>
        <div class="flex items-center gap-4 mt-6">
          <Avatar>
            <AvatarImage
              :src="singleOrder?.users?.[0]?.bio?.photo?.url"
              alt="Product"
            />
            <AvatarFallback>{{
              singleOrder?.users?.[0]?.bio?.username?.[0]
            }}</AvatarFallback>
          </Avatar>
          <div>
            <h6 class="text-[14px] leading-[28px] font-normal">
              {{ singleOrder?.users?.[0]?.publicName }}
            </h6>
            <p class="text-[#6B7280] text-[14px] leading-[20px]">
              @{{ singleOrder?.users?.[0]?.bio?.username }}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
    <Card class="w-full">
      <CardHeader
        class="flex flex-row items-center justify-between space-y-0 pb-[10px]"
      >
        <CardTitle class="text-[20px] flex text-[#111827] font-medium">
          Summary
        </CardTitle>
        <!-- <div class="flex items-center gap-2">
          <Button variant="outline" size="sm">Edit order</Button>
          <Button variant="outline" size="sm">Export PDF</Button>
          <Button variant="ghost" size="sm">
            <Ellipsis class="h-[20px] w-[20px]" />
          </Button>
        </div> -->
      </CardHeader>
      <CardContent>
        <div
          v-for="(product, i) in singleOrder?.data?.products || []"
          :key="i"
          class="flex items-center justify-between mb-2 py-2"
        >
          <div class="flex gap-4">
            <Avatar shape="square" class="h-[48px]">
              <AvatarImage :src="product?.banner?.link || ''" alt="Product" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <h6 class="text-[14px] leading-[24px]">
                {{ product?.title || "" }}
              </h6>
              <p class="text-[#6B7280] text-[14px]">
                {{ (product?.description || "").slice(0, 15) }}
              </p>
            </div>
          </div>
          <div class="flex gap-6">
            <!-- <p class="text-[#6B7280] text-[14px] text-right min-w-[104px]">
              1 kg
            </p> -->
            <p class="text-[#6B7280] text-[14px] text-right min-w-[40px]">
              {{ product.quantity }}x
            </p>
            <p class="text-[#111827] text-[14px] text-right min-w-[104px]">
              {{
                currencyConverter(
                  product?.currency || product?.price?.currency,
                  product.amount || product?.price?.amount,
                )
              }}
            </p>
          </div>
        </div>
        <div class="flex items-center justify-between mb-4 py-2">
          <p class="text-[14px] text-[#111827]">Subtotal</p>
          <p class="text-[#111827] text-[14px] text-right min-w-[104px]">
            {{
              currencyConverter(
                singleOrder?.fee?.currency || "NGN",
                singleOrder?.fee.subTotal || 0,
              )
            }}
          </p>
        </div>
        <div
          v-for="(item, i) in orderPaymentAddons"
          :key="i"
          class="flex items-center justify-between mb-2 py-2 border-b-[#E5E7EB] border-b-[1px]"
        >
          <p
            class="text-[14px] capitalize"
            :class="i === 0 ? 'text-[#111827]' : 'text-[#9CA3AF]'"
          >
            {{ item.title }}
          </p>
          <p class="text-[#111827] text-[14px] text-right min-w-[104px]">
            {{
              item.title !== "currency"
                ? currencyConverter(
                    singleOrder?.fee?.currency || "",
                    item.value,
                  )
                : item.value
            }}
          </p>
        </div>
        <div class="flex items-center justify-between mt-4 py-2">
          <p class="text-[14px] font-medium text-[#111827]">Total</p>
          <p class="text-[#111827] font-medium text-[20px] text-right">
            {{
              currencyConverter(
                singleOrder?.fee?.currency || "NGN",
                singleOrder?.fee?.total || 0,
              )
            }}
          </p>
        </div>
        <Button class="w-full mt-[36px]">Ship Order</Button>
      </CardContent>
    </Card>
  </div>
  <DisplayState
    v-else-if="marketplaceLoadingStates.singleOrder === API_STATES.ERROR"
    class="my-[80px]"
    message="Something went wrong"
    buttonText="Reload"
    @action="getSingleOrder(route?.params?.id || '')"
  />
</template>

<script lang="ts" setup>
import { Ellipsis } from "lucide-vue-next";
import { API_STATES } from "~/services/constants";
import { useMarketPlaceStore } from "@/store/useMarketplace";
import * as z from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";

const marketPlaceStore = useMarketPlaceStore();
const { marketplaceLoadingStates, singleOrder } = storeToRefs(marketPlaceStore);
const {
  getSingleOrder,
  cancelOrder,
  rejectOrAcceptOrder,
  dispatchOrder,
  markOrderAsShipped,
} = marketPlaceStore;
import { currencyConverter, orderStatus, paymentStatus } from "@/lib/utils";

const route = useRoute();
const { $moment } = useNuxtApp();
const openDialog = ref(false);
const orderPaymentAddons = computed(
  () => [
    ...Object.keys(singleOrder.value?.fee)
      .filter((item) => item !== "total" && item !== "vatPercentage")
      .map((feeItem: string) => {
        return {
          title: feeItem,
          value: singleOrder.value?.fee?.[feeItem],
        };
      }),
  ],
  // [
  //   {
  //     title: "Shipping",
  //     value: "100.00 TRY",
  //   },
  //   {
  //     title: "Payment",
  //     value: "Wallet",
  //   },
  //   {
  //     title: "VAT(%)",
  //     value: "₺ 0.67",
  //   },
  //   {
  //     title: "Shipping Date",
  //     value: `24 Dec, 2024  - 10 AM`,
  //   },
  // ]
);

const canAcceptOrRejectOrder = computed(() => {
  return orderStatus(singleOrder.value?.status).text === "Pending";
});

const canShipOrder = computed(() => {
  return paymentStatus(singleOrder.value?.status).text === "Paid";
});

const formSchema = toTypedSchema(
  z.object({
    message: z.string({
      required_error: "Description cannot be empty",
    }),
  }),
);

const { handleSubmit, resetForm } = useForm({
  validationSchema: formSchema,
});

const onSubmit = handleSubmit(async (values: any) => {
  await rejectOrAcceptOrder(singleOrder.value?.id || "", {
    accepted: false,
    ...values,
  });
  openDialog.value = false;
});
</script>

<style></style>
