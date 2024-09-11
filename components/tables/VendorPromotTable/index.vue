<template>
  <div class="my-4 max-w-full overflow-x-scroll">
    <Table class="min-w-[1000px] rounded-lg border">
      <TableHeader class="h-16">
        <TableRow>
          <TableHead class="font-normal text-black">Order</TableHead>
          <TableHead class="font-normal text-black">Date</TableHead>
          <TableHead class="font-normal text-black">Promo Type</TableHead>
          <TableHead class="font-normal text-black">Duration</TableHead>
          <TableHead class="font-normal text-black">Description</TableHead>
          <TableHead class="font-normal text-black">Status</TableHead>
          <TableHead class="font-normal text-black">Setting</TableHead>
          <TableHead class="font-normal text-black"> Actions </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody v-for="(promo, i) in promotions" :key="i">
        <TableRow>
          <TableCell class="text-[12px]">
            #{{ promo?.id.slice(0, 9) }}
          </TableCell>
          <TableCell class="text-[12px]"
            >{{ $moment(promo?.createdAt).format("MMM DD, h:mm a") }}
          </TableCell>
          <TableCell class="text-[12px] capitalize"
            >{{ promo.data?.type.split(/(?=[A-Z])/).join(" ") }}
          </TableCell>
          <TableCell class="text-[12px]"
            >{{ $moment(promo.validity?.to).format("MMM DD, h:mm a") }}
          </TableCell>
          <TableCell class="max-w-[400px] whitespace-normal text-[12px]">
            {{
              promo.description
                ? gpHelpers.sliceWords(promo.description, 50)
                : "NIL"
            }}
          </TableCell>
          <TableCell>
            <Badge
              variant="outline"
              class="rounded-[8px] py-1 text-[12px] font-normal"
            >
              <div
                class="mr-2 h-[9px] w-[9px] rounded-[3px]"
                :style="promotionStatus(promo.active).style"
              ></div>
              {{ promotionStatus(promo.active).text }}
            </Badge>
          </TableCell>
          <TableCell class="text-[12px]">
            {{ getPromoSettings(promo.data) }}
          </TableCell>
          <TableCell class="flex gap-x-2">
            <CloseSquareIcon class="h-5 w-5" />
            <Setting2Icon class="h-5 w-5" />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>

<script setup lang="ts">
import { orderStatus, paymentStatus, promotionStatus } from "~/lib/utils";
import { GP_ROUTES } from "~/constants/route-names";
import { GP_CONSTANTS } from "~/constants";
import { CloseSquareIcon, Setting2Icon } from "@placetopay/iconsax-vue/outline";

defineProps({
  promotions: {
    type: Array as PropType<any[]>,
    required: true,
  },
});

const { $moment } = useNuxtApp();

const userType = computed(() =>
  JSON.parse(localStorage.getItem(GP_CONSTANTS.USER_TYPE) as string),
);

const router = useRouter();

const getPromoSettings = (data: any) => {
  if (data.type === "freeDelivery") {
    return "Free Delivery";
  }
  if (data.type === "fixedAmountDiscount") {
    return gpNumbers.formatCurrency(data.amount, data.currency) + " OFF";
  }
  if (data.type === "percentageAmountDiscount") {
    return data.percentage + "% OFF";
  }
};
</script>

<style></style>
