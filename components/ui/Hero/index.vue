<template>
  <header class="container px-[20px] md:px-[2rem]">
    <h1
      class="mx-auto mb-[14px] mt-[100px] text-center text-[32px] font-semibold capitalize leading-[48px] md:text-[48px] md:leading-[60px] lg:max-w-[80%] lg:text-[68px] lg:leading-[81.6px]"
    >
      Everything you need is now in one
      <span class="text-[#009260]">Place</span>
    </h1>
    <p
      class="mx-auto mb-[50px] text-center text-[16px] font-medium text-[#4C4C4D] lg:max-w-[80%] lg:text-[18px]"
    >
      <span class="notranslate" translate="no">Greep</span> is your island
      companion. we bridge the gap by connecting students, tourist and locals in
      TRNC to the services and products they need.
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
