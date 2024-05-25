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
      <TableBody v-for="(_, i) in 10" :key="i">
        <TableRow>
          <TableCell class="text-[12px]"> #670944 </TableCell>
          <TableCell class="text-[12px]"> Jan 18, 1:30 PM </TableCell>
          <TableCell class="text-[12px]"> Albert Wilson </TableCell>
          <TableCell class="text-[12px]"> 11 Orkun Tibsoba, Lefkosa </TableCell>
          <TableCell>
            <Badge
              variant="outline"
              class="rounded-[8px] font-normal text-[12px] py-1"
            >
              <div
                class="bg-[#B91010] w-[9px] h-[9px] rounded-[3px] mr-2"
              ></div>
              Await Cash
            </Badge>
          </TableCell>
          <TableCell>
            <Badge
              variant="outline"
              class="rounded-[8px] font-normal text-[12px] py-1"
            >
              <div
                class="bg-[#B91010] w-[9px] h-[9px] rounded-[3px] mr-2"
              ></div>
              Pending
            </Badge>
          </TableCell>
          <TableCell class="text-[12px]"> ₺150 </TableCell>
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
                  <DropdownMenuItem @click="router.push(`/vendor/orders/${i}`)"
                    >Edit</DropdownMenuItem
                  >
                  <DropdownMenuItem>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </client-only>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>

<script setup lang="ts">
import { MoreHorizontal } from "lucide-vue-next";

const props = defineProps({
  source: {
    type: String,
    default: "recent",
  },
});

const router = useRouter();
</script>

<style></style>
