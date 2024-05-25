<template>
  <Card class="w-full mb-6">
    <CardHeader
      class="flex flex-row items-center justify-between space-y-0 pb-[10px]"
    >
      <CardTitle class="text-[20px] flex text-[#111827] font-medium">
        Order #670944
      </CardTitle>
      <div class="flex items-center gap-2">
        <Badge
          variant="outline"
          class="rounded-[8px] font-normal text-[12px] py-1"
        >
          <div class="bg-[#B91010] w-[9px] h-[9px] rounded-[3px] mr-2"></div>
          Await Cash
        </Badge>
        <Badge
          variant="outline"
          class="rounded-[8px] font-normal text-[12px] py-1"
        >
          <div class="bg-[#B91010] w-[9px] h-[9px] rounded-[3px] mr-2"></div>
          Pending
        </Badge>
        <Button variant="ghost" size="sm">
          <Ellipsis class="h-[20px] w-[20px]" />
        </Button>
      </div>
    </CardHeader>
    <CardContent>
      <div class="text-[#6B7280] text-[14px]">Dec 24, 2022, 2:56:31 PM</div>
      <div class="flex items-center gap-4 mt-6">
        <Avatar>
          <AvatarImage src="/images/avatar/article-writer.png" alt="Product" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <h6 class="text-[14px] leading-[28px] font-normal">Robert Sanchez</h6>
          <p class="text-[#6B7280] text-[14px] leading-[20px]">@robert</p>
        </div>
      </div>
    </CardContent>
  </Card>
  <Card class="w-full">
    <CardHeader
      class="flex flex-row items-center justify-between space-y-0 pb-[10px]"
    >
      <CardTitle class="text-[20px] flex text-[#111827] font-medium">
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
        class="flex items-center justify-between mb-2 py-2"
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
            <p class="text-[#6B7280] text-[14px]">Tubers - Large</p>
          </div>
        </div>
        <div class="flex gap-6">
          <p class="text-[#6B7280] text-[14px] text-right min-w-[104px]">
            1 kg
          </p>
          <p class="text-[#6B7280] text-[14px] text-right min-w-[40px]">1x</p>
          <p class="text-[#111827] text-[14px] text-right min-w-[104px]">
            100.00 TRY
          </p>
        </div>
      </div>
      <div class="flex items-center justify-between mb-4 py-2">
        <p class="text-[14px] text-[#111827]">Subtotal</p>
        <p class="text-[#111827] text-[14px] text-right min-w-[104px]">
          1000.00 TRY
        </p>
      </div>
      <div
        v-for="(item, i) in orderPaymentAddons"
        :key="i"
        class="flex items-center justify-between mb-2 py-2 border-b-[#E5E7EB] border-b-[1px]"
      >
        <p
          class="text-[14px]"
          :class="i === 0 ? 'text-[#111827]' : 'text-[#9CA3AF]'"
        >
          {{ item.title }}
        </p>
        <p class="text-[#111827] text-[14px] text-right min-w-[104px]">
          {{ item.value }}
        </p>
      </div>
      <div class="flex items-center justify-between mt-4 py-2">
        <p class="text-[14px] font-medium text-[#111827]">Total</p>
        <p class="text-[#111827] font-medium text-[20px] text-right">
          3,424.50 TRY
        </p>
      </div>
      <Button class="w-full mt-[36px]">Ship Order</Button>
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
