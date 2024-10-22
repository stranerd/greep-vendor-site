<template>
  <div class="grid gap-10">
    <div>
      <Card class="w-3/5">
        <CardHeader>
          <CardDescription class="flex justify-between">
            <h2 class="flex">Total Balance</h2>

            <Select v-model="selectedCurrency">
              <SelectTrigger class="w-[120px]">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectLabel>Currencies</SelectLabel>
                <SelectItem :value="currency" v-for="currency in currencies">{{
                  currency.currency
                }}</SelectItem>
              </SelectContent>
            </Select>
          </CardDescription>
        </CardHeader>

        <CardContent>
          <h2 class="text-5xl font-semibold">
            {{
              gpNumbers.formatCurrency(
                3862.83 * selectedCurrency.value,
                selectedCurrency.currency,
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
} from "@placetopay/iconsax-vue/outline";

import { GP_ROUTES } from "~/constants/route-names";
import { usePaymentStore } from "~/store/usePayment";

const { wallet, transactionHistory } = storeToRefs(usePaymentStore());
const router = useRouter();

const currencies = ref([
  { currency: "TRY", value: 1 },
  { currency: "NGN", value: 0.03636363636363636 },
]);

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
