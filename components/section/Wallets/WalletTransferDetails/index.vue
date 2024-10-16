<template>
  <div class="w-full">
    <Card class="mx-auto lg:w-2/5">
      <CardHeader>
        <CardTitle>Add Details</CardTitle>
      </CardHeader>
      <CardContent class="grid items-center justify-center gap-5">
        <div class="flex flex-col items-center">
          <img src="" alt="" class="mx-auto my-4 h-16 w-16 rounded-full" />
          <h2 class="font-semibold">Lisa Salvador</h2>
          <h2 class="text-xs text-[#999999]">@lisasalvador</h2>
        </div>

        <div class="text-center">
          <h2 class="text-lg font-medium">Balance</h2>
          <h2 class="text-5xl font-semibold">
            {{ gpNumbers.formatCurrency(292378, "TRY") }}
          </h2>
        </div>

        <div class="">
          <h2 class="">Amount</h2>
          <div class="flex gap-x-4">
            <Select v-model="selectedCurrency">
              <SelectTrigger class="w-[120px]">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectLabel>Currencies</SelectLabel>
                <SelectItem
                  :value="currency.currency"
                  v-for="currency in supportCurrencies"
                  >{{ currency.currency }}</SelectItem
                >
              </SelectContent>
            </Select>

            <Input class="flex-1" type="number" placeholder="Enter amount" />
          </div>
        </div>
        <div class="grid gap-5 text-sm">
          <div class="flex gap-x-4" v-for="transaction in recentTransactions">
            <Wallet2Icon
              class="h-8 w-8 rounded-full border-2 border-green-500/40 p-1 text-primary"
            />
            <div class="">
              <h2 class="">Send to {{ transaction.username }}</h2>
              <h2 class="text-xs text-[#999999]">
                {{ gpDates.getTimeAgo(transaction.timeStamp) }} •
                {{ gpDates.getFormattedDate(transaction.timeStamp) }}
              </h2>
            </div>

            <div class="ml-auto">
              <h2
                class="flex"
                :class="{
                  'text-primary': transaction.type === 'RECEIVED',
                  'text-destructive': transaction.type === 'SEND',
                }"
              >
                <span class="" v-if="transaction.amount.amount > 1">+</span>
                {{
                  gpNumbers.formatCurrency(
                    transaction.amount.amount,
                    transaction.amount.currency,
                  )
                }}
              </h2>
            </div>
          </div>
        </div>

        <Button>Send Money</Button>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { Wallet2Icon } from "@placetopay/iconsax-vue/bulk";

const supportCurrencies = ref([
  {
    currency: "TRY",
    name: "Turkish Yen",
    flag: "",
  },
  {
    currency: "USD",
    name: "Dollar",
    flag: "",
  },
  {
    currency: "GPB",
    name: "Pounds",
    flag: "",
  },
  {
    currency: "EUR",
    name: "Euro",
    flag: "",
  },
  {
    currency: "NGN",
    name: "Naira",
    flag: "",
  },
]);

const selectedCurrency = ref(supportCurrencies.value[0].currency);

const recentTransactions = ref([
  {
    username: "Jerry",
    type: "SEND",
    amount: {
      currency: "TRY",
      amount: -49239,
    },
    timeStamp: new Date(),
  },
  {
    username: "Lisa",
    type: "RECEIVED",
    amount: {
      currency: "NGN",
      amount: 49239,
    },
    timeStamp: new Date(),
  },
]);
</script>

<style scoped></style>
