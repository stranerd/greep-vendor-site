<template>
  <div v-if="source === 'recent'">
    <h4 class="text-[24px] font-semibold leading-[38.5px]">Recent History</h4>
  </div>
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
      <TableBody v-for="(order, i) in items" :key="i">
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
          <TableCell v-if="userType === 'items'">
            <client-only>
              <DropdownMenu>
                <DropdownMenuTrigger as-child>
                  <Button aria-haspopup="true" size="icon" variant="ghost">
                    <MoreHorizontal class="h-4 w-4" />
                    <span class="sr-only">Toggle menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem
                    @click="
                      router.push({
                        name: GP_ROUTES.VENDOR.ITEMS.ORDER_DETAILS,
                        params: { id: order.id },
                      })
                    "
                    >View</DropdownMenuItem
                  >
                  <DropdownMenuItem>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </client-only>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
    <DisplayState
      v-if="items.length === 0"
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
import { GP_ROUTES } from "~/constants/route-names";
import { GP_CONSTANTS } from "~/constants";
import type { IOrders } from "~/types/modules/marketPlaceModel";

const { $moment } = useNuxtApp();
const userType = computed(() =>
  JSON.parse(localStorage.getItem(GP_CONSTANTS.USER_TYPE) as string),
);
const props = defineProps({
  source: {
    type: String,
    default: "recent",
  },
  items: {
    type: Array as PropType<IOrders[]>,
    default: () => [],
  },
});

const router = useRouter();
</script>

<style></style>
