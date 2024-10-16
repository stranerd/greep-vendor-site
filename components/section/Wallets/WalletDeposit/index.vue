<template>
  <div class="w-full">
    <Card class="mx-auto lg:w-2/5">
      <CardHeader>
        <CardTitle>Add Details</CardTitle>
      </CardHeader>
      <CardContent class="grid items-center justify-center gap-5">
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
        <div class="">
          <h2 class="">Receieve</h2>
          <Input
            class="flex-1"
            type="number"
            placeholder="Amount you will receieve"
          />
        </div>

        <div class="mt-10">
          <h2 class="">Payment method</h2>
          <Button
            class="flex w-full items-center justify-start gap-x-4 font-normal"
            variant="outline"
          >
            <CardIcon
              class="h-7 w-7 rounded-full border border-[#009DE3] p-1 text-[#009DE3]"
            />
            <h2 class="">Card (VISA/MASTER)</h2>
            <ArrowRight3Icon class="ml-auto h-8 w-8 text-[#999999]" />
          </Button>
        </div>

        <Button>Deposit</Button>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { CardIcon } from "@placetopay/iconsax-vue/bulk";
import { ArrowRight3Icon } from "@placetopay/iconsax-vue/outline";

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
</script>

<style scoped></style>
