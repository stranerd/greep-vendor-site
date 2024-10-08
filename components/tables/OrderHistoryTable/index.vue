<template>
  <div v-if="source === 'recent'"></div>
  <div class="max-w-full overflow-x-scroll">
    <Table class="min-w-[1000px]">
      <TableHeader>
        <TableRow>
          <TableHead>Order</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Customer Address</TableHead>
          <TableHead>Payment status</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Total</TableHead>

          <TableHead>
            <span class="sr-only">Actions</span>
          </TableHead>
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
            {{ order.users?.[0]?.publicName }}
          </TableCell>
          <TableCell class="text-[12px]"> {{ order?.to?.location }} </TableCell>
          <TableCell>
            <Badge
              variant="outline"
              class="rounded-[8px] py-1 text-[12px] font-normal"
            >
              <div
                class="mr-2 h-[9px] w-[9px] rounded-[3px]"
                :class="paymentStatus(order.status).color"
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
                :class="orderStatus(order.status).color"
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

const marketPlaceStore = useMarketPlaceStore();
const { marketplaceLoadingStates, orders } = storeToRefs(marketPlaceStore);

const { $moment } = useNuxtApp();

const orderHistory = computed(() => {
  return orders.value.filter((order) => order.activeStatus === null);
});

const props = defineProps({
  source: {
    type: String,
    default: "recent",
  },
  items: {
    type: Array,
    default: () => [],
  },
});

const router = useRouter();
</script>

<style></style>
