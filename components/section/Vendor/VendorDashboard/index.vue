<template>
  <div class="max-w-[155px]">
    <Select v-model="date">
      <SelectTrigger>
        <SelectValue placeholder="Select time range" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Date Range</SelectLabel>
          <SelectItem value="today"> Today </SelectItem>
          <SelectItem value="month"> This Month </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>
  <div class="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
    <Card v-for="(card, i) in overview" :key="i">
      <CardHeader
        class="flex flex-row items-center justify-between space-y-0 pb-[10px]"
      >
        <CardTitle
          class="text-[14px] text-[#6F727A] font-medium"
          :class="card.titleColor"
        >
          {{ card.title }}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div class="text-[#000000] text-[32px] font-semibold">
          {{ card.value }}
        </div>
        <!-- <p class="text-xs text-muted-foreground">+20.1% from last month</p> -->
      </CardContent>
    </Card>
  </div>
  <div class="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
    <VendorLineChart />
    <Card class="bg-[#FBFBFB] border-[0px]">
      <CardHeader>
        <CardTitle class="text-[14px]">Most sold</CardTitle>
      </CardHeader>
      <CardContent class="grid gap-3 max-h-[280px] overflow-y-scroll">
        <div
          v-for="(_, i) in 7"
          :key="i"
          class="border-[#F1F3F7] rounded-[12px] flex items-center justify-between border-[2px] py-3 px-4"
        >
          <div class="flex items-center">
            <h6 class="text-[16px] mr-3 font-semibold">{{ i + 1 }}</h6>
            <Avatar class="mr-3">
              <AvatarImage
                src="/images/avatar/article-writer.png"
                alt="Product"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div>
              <h6 class="text-[14px] font-semibold leading-[21px]">Yam</h6>
              <p class="text-[#999999] leading-[21px] font-light">Tuber</p>
            </div>
          </div>

          <div>
            <p class="text-right text-[#001726] leading-[21px] text-[14px]">
              30 items
            </p>
            <img src="/images/icons/arrow-up.svg" alt="Arrow" class="ml-auto" />
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
  <VendorHistoryTable />

  <!-- <div
      class="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
    >
      <div class="flex flex-col items-center gap-1 text-center">
        <h3 class="text-2xl font-bold tracking-tight">You have no products</h3>
        <p class="text-sm text-muted-foreground">
          You can start selling as soon as you add a product.
        </p>
        <Button class="mt-4"> Add Product </Button>
      </div>
    </div> -->
</template>

<script setup lang="ts">
const date = ref("today");

const overview = computed(() => [
  {
    title: "Total Sales",
    value: "₺ 15,456.78",
  },
  {
    title: "Total Orders > 80%",
    value: "785",
    titleColor: "text-[#249F5D]",
  },
  {
    title: "Total Visits > 60%",
    value: "1,442",
    titleColor: "text-[#FFB545]",
  },
  {
    title: "Total Canceled > 60%",
    value: "542",
  },
]);
</script>

<style></style>
