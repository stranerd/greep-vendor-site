<template>
  <div>
    <h2 class="text-2xl font-semibold">Orders > History</h2>
    <div class="mt-[25px] flex items-center justify-between">
      <form class="w-full max-w-[570px]">
        <div class="relative flex w-full">
          <Search
            class="absolute left-4 top-[50%] h-[24px] w-[24px] translate-y-[-50%] text-muted-foreground"
          />
          <Separator orientation="vertical" />
          <Input
            type="search"
            placeholder="Search "
            class="h-[48px] w-full appearance-none rounded-[99px] bg-background px-[48px] shadow-none lg:w-full"
          />
          <Separator orientation="vertical" />
          <img
            class="absolute right-4 top-[50%] h-[24px] w-[24px] translate-y-[-50%] text-muted-foreground"
            src="/images/icons/arrangevertical.svg"
            alt="Arrange"
          />
        </div>
      </form>
    </div>
    <div class="my-5 flex w-full items-center justify-center gap-4">
      <router-link to="/vendor/orders/active" class="router-link"
        >Active</router-link
      >
      <router-link to="/vendor/orders/history" class="router-link"
        >History</router-link
      >
    </div>
    <OrderHistoryTable />
  </div>
</template>

<script setup lang="ts">
import { Search } from "lucide-vue-next";
definePageMeta({
  layout: "dashboard",
  middleware: ["authenticated"],
  name: "/vendor/orders",
});
</script>

<style scoped>
.router-link {
  @apply flex w-40 justify-center border-b-2 border-transparent p-2 text-black;
}
.router-link-exact-active {
  @apply border-b-2 border-black font-medium text-black;
}
</style>
