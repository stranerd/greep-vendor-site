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
              class="rounded-[8px] font-normal text-[12px] py-1"
            >
              <div
                class="w-[9px] h-[9px] rounded-[3px] mr-2"
                :class="paymentStatus(order.status).color"
              ></div>
              {{ paymentStatus(order.status).text }}
            </Badge>
          </TableCell>
          <TableCell>
            <Badge
              variant="outline"
              class="rounded-[8px] font-normal text-[12px] py-1"
            >
              <div
                class="w-[9px] h-[9px] rounded-[3px] mr-2"
                :class="orderStatus(order.status).color"
              ></div>
              {{ orderStatus(order.status).text }}
            </Badge>
          </TableCell>
          <TableCell class="text-[12px]">
            {{ order?.fee?.currency }} {{ order?.fee?.payable?.toFixed(3) }}
          </TableCell>
          <TableCell>
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
                    @click="router.push(`/vendor/orders/${order.id}`)"
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
const { $moment } = useNuxtApp();

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
