<template>
  <div class="w-full">
    <Card class="mx-auto lg:w-2/5">
      <CardHeader />

      <CardContent class="grid items-center justify-center gap-5">
        <div class="flex flex-col items-center">
          <TickCircleIcon class="h-10 w-10 text-primary" />
          <h2 class="font-medium">Transfer successful</h2>
        </div>

        <div class="text-center">
          <h2 class="text-3xl font-semibold">
            {{ gpNumbers.formatCurrency(292378, "TRY") }}
          </h2>
        </div>

        <div class="w-full rounded-lg border p-4">
          <div
            class="grid text-xs"
            v-for="(value, key, index) in recepientDetails"
          >
            <Separator v-if="index !== 0" class="my-2" />
            <div class="flex justify-between gap-4">
              <h2 class="mr-10 capitalize text-[#999999]">{{ key }}</h2>
              <h2 class="" v-if="key === 'time'">
                {{ gpDates.getFormattedDate(value) }} •
                {{ gpDates.getTimeAgo(value) }}
              </h2>
              <h2 class="" v-else>{{ value }}</h2>
            </div>
          </div>
        </div>

        <Button>Done</Button>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { Wallet2Icon } from "@placetopay/iconsax-vue/bulk";
import { TickCircleIcon } from "@placetopay/iconsax-vue/bold";

const recepientDetails = ref({
  "Recepient Username": "Kingsley",
  note: "Have fun",
  "Transaction ID": "642hdjjne627sbdsj",
  time: new Date("07/12/2024"),
});
</script>

<style scoped></style>
