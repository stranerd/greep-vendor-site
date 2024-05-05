<template>
  <section class="bg-[#000E18] py-[108px]">
    <div class="container">
      <div class="mx-auto max-w-[1201.24px] text-[white]">
        <div class="flex items-center w-full justify-center">
          <CursiveTitle> Features </CursiveTitle>
        </div>
        <h2
          class="text-[64px] text-center max-w-[534px] mx-auto mb-[55px] font-semibold leading-[75px] mt-[15px]"
        >
          Our Logistics Services
        </h2>
        <div class="grid grid-cols-3 gap-x-[130px] gap-y-[53px]">
          <div v-for="(item, i) in items" :key="i">
            <img
              :src="item.icon"
              :alt="item.title"
              class="mb-[22px] h-[56px] w-auto"
            />
            <h6 class="text-[25px] leading-[29px] mb-[13px]">
              {{ item.title }}
            </h6>
            <p class="text-[16px] leading-24 max-w-[270px]">
              {{ item.details }}
            </p>
          </div>
        </div>
        <div class="flex justify-center mt-[55px]">
          <Button variant="withIcon" size="lg" rounded="lg"
            >Get Started
            <div
              class="bg-[#000E18] rounded-full p-[14px] ml-[10px] mr-[-20px]"
            >
              <MoveUpRight :size="20" />
            </div>
          </Button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { MoveUpRight } from "lucide-vue-next";
const items = [
  {
    icon: "/images/llustrations/sea.svg",
    title: "Sea Transport Services",
    details:
      "Following the quality of our service thus having gained trust of our many clients.",
  },
  {
    icon: "/images/llustrations/warehouse.svg",
    title: "Warehousing Services",
    details:
      "Following the quality of our service thus having gained trust of our many clients.",
  },
  {
    icon: "/images/llustrations/airflight.svg",
    title: "Air Fright Services",
    details:
      "Following the quality of our service thus having gained trust of our many clients.",
  },
  {
    icon: "/images/llustrations/project.svg",
    title: "Project & Exhibition",
    details:
      "Following the quality of our service thus having gained trust of our many clients.",
  },
  {
    icon: "/images/llustrations/local-shipping.svg",
    title: "Local Shipping Services",
    details:
      "Following the quality of our service thus having gained trust of our many clients.",
  },
  {
    icon: "/images/llustrations/customer-clearance.svg",
    title: "Customer Clearance",
    details:
      "Following the quality of our service thus having gained trust of our many clients.",
  },
];
</script>

<style></style>
