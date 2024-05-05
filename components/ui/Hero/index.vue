<template>
  <header class="container">
    <h1
      class="text-[68px] max-w-[956px] mx-auto text-center mb-[14px] font-semibold leading-[81.6px] mt-[100px]"
    >
      Connecting Africans in the Diaspora to
      <span class="text-[#009260]">Home</span>
    </h1>
    <p
      class="text-[18px] text-[#4C4C4D] mb-[50px] text-center max-w-[1307px] mx-auto font-medium"
    >
      Greep is your go-to platform for ordering affordable and authentic African
      food items, designed specifically for Africans living in the diaspora. We
      bring the taste of home right to your doorstep, with a mission to make
      your favorite African meals accessible, no matter where you are in the
      world..
    </p>
    <div class="flex align-center justify-center">
      <Button variant="withIcon" size="lg" rounded="lg"
        >Get Started
        <div class="bg-[#000E18] rounded-full p-[14px] ml-[10px] mr-[-20px]">
          <MoveUpRight :size="20" />
        </div>
      </Button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { MoveUpRight } from "lucide-vue-next";
</script>

<style></style>
