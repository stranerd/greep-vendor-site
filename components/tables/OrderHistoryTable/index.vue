<template>
  <div v-if="source === 'recent'"></div>
  <div class="max-w-full overflow-x-scroll">
    <Table class="min-w-[1000px]">
      <TableHeader>
        <TableRow>
          <TableHead>Order</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Customers</TableHead>
          <TableHead>Customer Address</TableHead>
          <TableHead>Payment status</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Total</TableHead>

          <!-- <TableHead>
            <span class="sr-only">Actions</span>
          </TableHead> -->
        </TableRow>
      </TableHeader>
      <TableBody v-for="(order, i) in orderHistory" :key="i">
        <TableRow>
          <TableCell class="text-[12px]">
            #{{ order?.id.slice(0, 9) }}
          </TableCell>
          <TableCell class="text-[12px]"
            >{{ $moment(order.createdAt).format("MMM DD, h:mm a") }}
          </TableCell>
          <TableCell class="text-[12px]">
            {{ order.users?.[order.userId]?.publicName }}
          </TableCell>
          <TableCell class="text-[12px]"> {{ order?.to?.location }} </TableCell>
          <TableCell>
            <Badge
              variant="outline"
              class="rounded-[8px] py-1 text-[12px] font-normal"
            >
              <div
                class="mr-2 h-[9px] w-[9px] rounded-[3px]"
                :style="paymentStatus(order.status).style"
              ></div>
              {{ paymentStatus(order.status).text }}
            </Badge>
          </TableCell>
          <TableCell>
            <Badge
              variant="outline"
              class="rounded-[8px] py-1 text-[12px] font-normal"
            >
              <div
                class="mr-2 h-[9px] w-[9px] rounded-[3px]"
                :style="orderStatus(order.status).style"
              ></div>
              {{ orderStatus(order.status).text }}
            </Badge>
          </TableCell>
          <TableCell class="text-[12px]">
            {{ gpNumbers.formatCurrency(order?.fee?.payable) }}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
    <DisplayState
      v-if="orderHistory.length === 0"
      :message="
        source === 'recent'
          ? 'No recent history to display. Come back soon and we`ll show you what you`ve been up to!'
          : 'You haven`t received any orders yet. Keep an eye on this space for new order'
      "
      hideButton
    />
  </div>
</template>

<script setup lang="ts">
import { MoreHorizontal } from "lucide-vue-next";
import { orderStatus, paymentStatus } from "~/lib/utils";

import { useMarketPlaceStore } from "@/store/useMarketplace";
import { GP_ROUTES } from "~/constants/route-names";
import type { IOrders } from "~/types/modules/marketPlaceModel";

const marketPlaceStore = useMarketPlaceStore();
const { marketplaceLoadingStates } = storeToRefs(marketPlaceStore);

const props = defineProps({
  orders: { type: Array as PropType<IOrders[]>, required: true },
  source: { type: String, default: "recent" },
  items: { type: Array, default: () => [] },
});

const { $moment } = useNuxtApp();

const orderHistory = computed(() => {
  return props.orders.filter((order) => order.activeStatus === null);
});

const router = useRouter();
</script>

<style></style>
