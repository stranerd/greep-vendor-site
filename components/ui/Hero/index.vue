<template>
  <header class="container px-[20px] md:px-[2rem]">
    <h1
      class="mx-auto mb-[14px] mt-[100px] max-w-[80%] text-center text-[32px] font-semibold leading-[48px] md:text-[48px] md:leading-[60px] lg:text-[68px] lg:leading-[81.6px]"
    >
      Empowering the African diaspora
      <span class="text-[#009260]">Economy</span>
    </h1>
    <p
      class="mx-auto mb-[50px] max-w-[80%] text-center text-[16px] font-medium text-[#4C4C4D] lg:text-[18px]"
    >
      Greep bridges the gap by connecting Africans in the diaspora with African
      products & businesses, empowering the diaspora economy one transaction at
      a time.
    </p>
    <div class="align-center flex justify-center">
      <Button variant="withIcon" size="lg" rounded="lg"
        >Explore More
        <div class="ml-[10px] mr-[-20px] rounded-full bg-[#000E18] p-[14px]">
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
