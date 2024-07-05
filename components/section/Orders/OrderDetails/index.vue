<template>
  <Card class="mb-6 w-full">
    <CardHeader
      class="flex flex-row items-center justify-between space-y-0 pb-[10px]"
    >
      <CardTitle class="flex text-[20px] font-medium text-[#111827]">
        Order #670944
      </CardTitle>
      <div class="flex items-center gap-2">
        <Badge
          variant="outline"
          class="rounded-[8px] py-1 text-[12px] font-normal"
        >
          <div class="mr-2 h-[9px] w-[9px] rounded-[3px] bg-[#B91010]"></div>
          Await Cash
        </Badge>
        <Badge
          variant="outline"
          class="rounded-[8px] py-1 text-[12px] font-normal"
        >
          <div class="mr-2 h-[9px] w-[9px] rounded-[3px] bg-[#B91010]"></div>
          Pending
        </Badge>
        <Button variant="ghost" size="sm">
          <Ellipsis class="h-[20px] w-[20px]" />
        </Button>
      </div>
    </CardHeader>
    <CardContent>
      <div class="text-[14px] text-[#6B7280]">Dec 24, 2022, 2:56:31 PM</div>
      <div class="mt-6 flex items-center gap-4">
        <Avatar>
          <AvatarImage src="/images/avatar/article-writer.png" alt="Product" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <h6 class="text-[14px] font-normal leading-[28px]">Robert Sanchez</h6>
          <p class="text-[14px] leading-[20px] text-[#6B7280]">@robert</p>
        </div>
      </div>
    </CardContent>
  </Card>
  <Card class="w-full">
    <CardHeader
      class="flex flex-row items-center justify-between space-y-0 pb-[10px]"
    >
      <CardTitle class="flex text-[20px] font-medium text-[#111827]">
        Summary
      </CardTitle>
      <div class="flex items-center gap-2">
        <Button variant="outline" size="sm">Edit order</Button>
        <Button variant="outline" size="sm">Export PDF</Button>
        <Button variant="ghost" size="sm">
          <Ellipsis class="h-[20px] w-[20px]" />
        </Button>
      </div>
    </CardHeader>
    <CardContent>
      <div
        v-for="(_, i) in 3"
        :key="i"
        class="mb-2 flex items-center justify-between py-2"
      >
        <div class="flex gap-4">
          <Avatar shape="square" class="h-[48px]">
            <AvatarImage
              src="/images/avatar/article-writer.png"
              alt="Product"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div>
            <h6 class="text-[14px] leading-[24px]">Maggi</h6>
            <p class="text-[14px] text-[#6B7280]">Tubers - Large</p>
          </div>
        </div>
        <div class="flex gap-6">
          <p class="min-w-[104px] text-right text-[14px] text-[#6B7280]">
            1 kg
          </p>
          <p class="min-w-[40px] text-right text-[14px] text-[#6B7280]">1x</p>
          <p class="min-w-[104px] text-right text-[14px] text-[#111827]">
            100.00 TRY
          </p>
        </div>
      </div>
      <div class="mb-4 flex items-center justify-between py-2">
        <p class="text-[14px] text-[#111827]">Subtotal</p>
        <p class="min-w-[104px] text-right text-[14px] text-[#111827]">
          1000.00 TRY
        </p>
      </div>
      <div
        v-for="(item, i) in orderPaymentAddons"
        :key="i"
        class="mb-2 flex items-center justify-between border-b-[1px] border-b-[#E5E7EB] py-2"
      >
        <p
          class="text-[14px]"
          :class="i === 0 ? 'text-[#111827]' : 'text-[#9CA3AF]'"
        >
          {{ item.title }}
        </p>
        <p class="min-w-[104px] text-right text-[14px] text-[#111827]">
          {{ item.value }}
        </p>
      </div>
      <div class="mt-4 flex items-center justify-between py-2">
        <p class="text-[14px] font-medium text-[#111827]">Total</p>
        <p class="text-right text-[20px] font-medium text-[#111827]">
          3,424.50 TRY
        </p>
      </div>
      <Button class="mt-[36px] w-full">Ship Order</Button>
    </CardContent>
  </Card>
</template>

<script lang="ts" setup>
import { Ellipsis } from "lucide-vue-next";

const orderPaymentAddons = ref([
  {
    title: "Shipping",
    value: "100.00 TRY",
  },
  {
    title: "Payment",
    value: "Wallet",
  },
  {
    title: "VAT(%)",
    value: "₺ 0.67",
  },
  {
    title: "Shipping Date",
    value: `24 Dec, 2024  - 10 AM`,
  },
]);
</script>

<style></style>
