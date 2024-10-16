<template>
  <Card class="my-4 max-w-full overflow-x-scroll">
    <div class="flex items-center justify-between p-6">
      <h2 class="font-semibold">Recent Transactions</h2>
      <h2 class="font-semibold text-primary underline">See all</h2>
    </div>
    <Table class="min-w-[800px] rounded-lg border">
      <TableHeader class="h-16">
        <TableRow>
          <TableHead class="font-normal text-black">Trans ID</TableHead>
          <TableHead class="font-normal text-black">Date</TableHead>
          <TableHead class="font-normal text-black">Customer</TableHead>
          <TableHead class="font-normal text-black">Payment Type</TableHead>
          <TableHead class="font-normal text-black">Status</TableHead>
          <TableHead class="font-normal text-black">Amount</TableHead>
          <TableHead class="font-normal text-black"> Actions </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody v-for="(wallet, i) in walletHistory" :key="i">
        <TableRow>
          <TableCell class="text-[12px]">
            #{{ wallet?.id.slice(0, 9) }}
          </TableCell>
          <TableCell class="text-[12px]"
            >{{ $moment(wallet?.date).format("MMM DD, h:mm a") }}
          </TableCell>
          <TableCell class="flex items-center justify-start gap-2 text-[12px]">
            <ArrowUp3Icon
              class="h-8 w-8 rounded-full bg-green-300 p-1 text-primary"
              v-if="wallet.type === 'deposit'"
            />
            <ArrowDownIcon
              class="h-8 w-8 rounded-full bg-red-300 p-1 text-destructive"
              v-if="wallet.type === 'withdraw'"
            />
            <ArrowRight1Icon
              class="h-8 w-8 rounded-full bg-violet-300 p-1 text-violet-600"
              v-if="wallet.type === 'transfer'"
            />
            <span class=""> {{ wallet?.customer }}</span>
          </TableCell>
          <TableCell class="text-[12px] capitalize">
            {{ wallet?.paymentType }}
          </TableCell>
          <TableCell>
            <Badge
              variant="outline"
              class="rounded-[8px] py-1 text-[12px] font-normal"
            >
              <div
                class="mr-2 h-[9px] w-[9px] rounded-[3px] bg-primary"
                :style="{}"
              ></div>
              {{ wallet.status }}
            </Badge>
          </TableCell>
          <TableCell class="text-[12px] capitalize">
            {{
              gpNumbers.formatCurrency(
                wallet.amount.price,
                wallet.amount.currency,
              )
            }}
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
                  <DropdownMenuItem @click="">View</DropdownMenuItem>
                  <DropdownMenuItem>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </client-only>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </Card>
</template>

<script setup lang="ts">
import { GP_ROUTES } from "~/constants/route-names";
import { MoreHorizontal } from "lucide-vue-next";
import { GP_CONSTANTS } from "~/constants";
import {
  ArrowDownIcon,
  ArrowRight1Icon,
  ArrowSwapHorizontalIcon,
  ArrowUp3Icon,
} from "@placetopay/iconsax-vue/outline";

// defineProps({
//   promotions: {
//     type: Array as PropType<any[]>,
//     required: true,
//   },
// });

const { $moment } = useNuxtApp();

const userType = computed(() =>
  JSON.parse(localStorage.getItem(GP_CONSTANTS.USER_TYPE) as string),
);

const router = useRouter();

const walletHistory = ref([
  {
    id: "6ab738sdunbdsjnds4u38j",
    date: new Date(),
    customer: "Adija Billard",
    paymentType: "Cash",
    type: "deposit",
    status: "Completed",
    amount: {
      price: 843493893,
      currency: "TRY",
    },
  },
  {
    id: "6a843738sdunbdsjnds4u38j",
    date: new Date(),
    customer: "Kingsley Billard",
    paymentType: "transfer",
    type: "withdraw",
    status: "Pending",
    amount: {
      price: 93893,
      currency: "NGN",
    },
  },
  {
    id: "6a843738sdunbdsjnds4u38j",
    date: new Date(),
    customer: "Kingsley Billard",
    paymentType: "transfer",
    type: "transfer",
    status: "Pending",
    amount: {
      price: 93893,
      currency: "NGN",
    },
  },
]);
</script>

<style></style>
