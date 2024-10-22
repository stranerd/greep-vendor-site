<template>
  <div class="grid gap-10">
    <div>
      <Card class="w-3/5">
        <CardHeader>
          <CardDescription class="flex justify-between">
            <h2 class="flex">Total Balance</h2>

            <client-only>
              <DropdownMenu>
                <DropdownMenuTrigger as-child>
                  <Button
                    variant="outline"
                    class="flex w-32 justify-start gap-x-2"
                  >
                    <ArrowDown1Icon class="h-5 w-5 text-[#999]" />
                    <span class="flex-1 text-sm">{{
                      selectedCurrency?.currency ?? "TRY"
                    }}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Currencies</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    :value="currency"
                    v-for="currency in currencies"
                    @click="selectedCurrency = currency"
                  >
                    {{ currency?.currency }}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </client-only>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <h2 class="text-5xl font-semibold">
            {{
              gpNumbers.formatCurrency(
                38562.83 / (selectedCurrency?.rate ?? 1),
                selectedCurrency?.currency ?? "TRY",
              )
            }}
          </h2></CardContent
        >
      </Card>
    </div>

    <div class="flex gap-4">
      <Button
        v-for="btnAction in walletActionButtons"
        variant="outline"
        rounded="lg"
        class="flex gap-4"
        @click="router.push({ name: btnAction.route })"
      >
        <span class="blcok"> {{ btnAction.title }}</span>

        <component :is="btnAction.icon" class="h-6 w-6" />
      </Button>
    </div>
    <VendorWalletTable />
  </div>
</template>

<script setup lang="ts">
import {
  ArrowRight1Icon,
  AddIcon,
  MinusIcon,
  ArrowDown1Icon,
} from "@placetopay/iconsax-vue/outline";

import { GP_ROUTES } from "~/constants/route-names";
import { usePaymentStore } from "~/store/usePayment";

const { wallet, exchangeRates } = storeToRefs(usePaymentStore());
const router = useRouter();

const currencies = computed(() =>
  Object.entries(exchangeRates.value).map(([currency, rate]) => ({
    currency,
    rate,
  })),
);

const selectedCurrency = ref(currencies.value[0]);

const walletActionButtons = ref([
  { title: "Deposit", icon: AddIcon, route: GP_ROUTES.VENDOR.WALLETS.DEPOSIT },
  {
    title: "Withdraw",
    icon: MinusIcon,
    route: GP_ROUTES.VENDOR.WALLETS.WITHDRAW,
  },
  {
    title: "Transfer",
    icon: ArrowRight1Icon,
    route: GP_ROUTES.VENDOR.WALLETS.TRANSFER,
  },
]);
</script>

<style scoped></style>
+
