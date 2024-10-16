<template>
  <div>
    <Card>
      <CardHeader></CardHeader>
      <CardContent class="grid gap-10">
        <form class="w-full max-w-full lg:max-w-[576px]">
          <div class="relative flex w-full">
            <Search
              class="absolute left-4 top-[50%] h-[24px] w-[24px] translate-y-[-50%] text-muted-foreground"
            />
            <Separator orientation="vertical" />
            <Input
              type="search"
              placeholder="Search by name "
              v-model="searchTerm"
              class="h-[48px] w-full appearance-none rounded-[16px] bg-background px-[48px] shadow-none lg:w-full"
            />
            <Separator orientation="vertical" />
            <!-- <LoaderCircle
            class="absolute right-4 top-[12px] h-[24px] w-[24px] animate-spin"
          /> -->
          </div>
        </form>

        <div class="">
          <h2 class="my-4 flex w-full justify-between font-semibold">
            <span class="block">Quick Send</span>
            <span class="block">view all</span>
          </h2>
          <div class="flex gap-x-5">
            <Plus class="h-9 w-9 rounded-full border-2 border-black p-2" />
            <div class="grid" v-for="user in quickSendList">
              <Avatar>
                <AvatarImage
                  :src="user.picture"
                  alt="Product"
                  class="h-12 w-12"
                />
                <AvatarFallback
                  class="flex h-12 w-12 items-center justify-center font-semibold uppercase"
                  >{{ user.username.slice(0, 2) }}</AvatarFallback
                >
              </Avatar>
              <h2 class="text-xs font-semibold">{{ user.username }}</h2>
            </div>
          </div>
        </div>

        <div class="">
          <h2 class="my-4 flex w-full justify-between font-semibold">
            <span class="block">Recently Sent</span>
            <span class="">view all</span>
          </h2>
          <div class="grid gap-5 text-sm">
            <div class="flex gap-x-4" v-for="user in recentSendList">
              <Wallet2Icon class="h-8 w-8 text-primary" />
              <div class="">
                <h2 class="">Send to {{ user.username }}</h2>
                <h2 class="text-xs text-[#999999]">
                  {{ gpDates.getTimeAgo(user.timeStamp) }} •
                  {{ gpDates.getFormattedDate(user.timeStamp) }}
                </h2>
              </div>

              <div class="ml-auto">
                <h2 class="">
                  {{
                    gpNumbers.formatCurrency(
                      user.amount.amount,
                      user.amount.currency,
                    )
                  }}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { LoaderCircle } from "lucide-vue-next";
import { Search, Plus } from "lucide-vue-next";
import { Wallet2Icon } from "@placetopay/iconsax-vue/bulk";

const searchTerm = ref("");

const quickSendList = ref([
  { username: "Jerry", picture: "" },
  { username: "Samson", picture: "" },
  { username: "Caleb", picture: "" },
  { username: "Anson", picture: "" },
  { username: "Lookman", picture: "" },
]);

const recentSendList = ref([
  {
    username: "Jerry",
    amount: {
      currency: "TRY",
      amount: -49239,
    },
    timeStamp: new Date(),
  },
  {
    username: "Lisa",
    amount: {
      currency: "NGN",
      amount: -49239,
    },
    timeStamp: new Date(),
  },
  {
    username: "Jerry",
    amount: {
      currency: "TRY",
      amount: 49239,
    },
    timeStamp: new Date(),
  },
  {
    username: "Jerry",
    amount: {
      currency: "TRY",
      amount: 49239,
    },
    timeStamp: new Date("10/16/2024"),
  },
  {
    username: "Jerry",
    amount: {
      currency: "TRY",
      amount: 49239,
    },
    timeStamp: new Date(),
  },
  {
    username: "Jerry",
    amount: {
      currency: "TRY",
      amount: 49239,
    },
    timeStamp: new Date(),
  },
  {
    username: "Jerry",
    amount: {
      currency: "TRY",
      amount: 49239,
    },
    timeStamp: new Date("02/10/2022"),
  },
]);
</script>

<style scoped></style>
