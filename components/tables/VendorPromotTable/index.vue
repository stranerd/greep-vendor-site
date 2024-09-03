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
            #{{ promo?.order.slice(0, 9) }}
          </TableCell>
          <TableCell class="text-[12px]"
            >{{ $moment(promo.date).format("MMM DD, h:mm a") }}
          </TableCell>
          <TableCell class="text-[12px]">{{ promo.promotType }} </TableCell>
          <TableCell class="text-[12px]">{{ promo.duration }} </TableCell>
          <TableCell class="text-[12px]">
            {{ promo.description ?? "NIL" }}
          </TableCell>
          <TableCell>
            <Badge
              variant="outline"
              class="rounded-[8px] py-1 text-[12px] font-normal"
            >
              <div class="mr-2 h-[9px] w-[9px] rounded-[3px]"></div>
              {{ promo.status }}
            </Badge>
          </TableCell>
          <TableCell class="text-[12px]"> {{ promo.setting }} </TableCell>
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
import { MoreHorizontal } from "lucide-vue-next";
import { orderStatus, paymentStatus } from "~/lib/utils";
import { GP_ROUTES } from "~/constants/route-names";
import { GP_CONSTANTS } from "~/constants";
import { CloseSquareIcon, Setting2Icon } from "@placetopay/iconsax-vue/outline";
import type { IOrders } from "~/types/modules/marketPlaceModel";

const { $moment } = useNuxtApp();
const userType = computed(() =>
  JSON.parse(localStorage.getItem(GP_CONSTANTS.USER_TYPE) as string),
);

const router = useRouter();

const promotions = ref([
  {
    order: "84938zhdu8429h382h832b9",
    date: new Date(),
    promotType: "Free Delivery",
    duration: "24 Hours",
    description: "No Delivery fee",
    status: "active",
    setting: "20% Off",
  },
  {
    order: "84938zhdu8429h382h832b9",
    date: new Date(),
    promotType: "Free Delivery",
    duration: "24 Hours",
    description: "No Delivery fee",
    status: "active",
    setting: "free",
  },
  {
    order: "84938zhdu8429h382h832b9",
    date: new Date(),
    promotType: "Item Discount",
    duration: "48 Hours",
    description: null,
    status: "completed",
    setting: "20% off",
  },
]);
</script>

<style></style>
