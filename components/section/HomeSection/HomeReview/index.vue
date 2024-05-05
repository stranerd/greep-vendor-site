<template>
  <section class="relative py-[80px]">
    <div class="container">
      <CursiveTitle> Our Reviews </CursiveTitle>
      <h2 class="mb-[50px] text-[48px] font-bold">What Our Customer Say</h2>
      <Carousel
        class="relative w-full"
        :opts="{
          align: 'center',
          loop: true,
          active: true,
        }"
        :plugins="[]"
      >
        <CarouselContent class="-ml-[24px]">
          <CarouselItem
            v-for="(_, index) in 5"
            :key="index"
            class="pl-[24px] w-[600px] max-w-[600px]"
          >
            <div class="rounded-[6px] p-[48px] bg-[#F4F6F4]">
              <div class="flex items-center">
                <img
                  src="/images/avatar/01.jpg"
                  alt="Awatar"
                  class="rounded-full w-[60px] h-[60px] mr-4"
                />
                <div>
                  <h6 class="text-[16px] font-semibold leading-[24px]">
                    Angel Uriostegui
                  </h6>
                  <p class="text-[14px]">Powerkit</p>
                </div>
              </div>
              <hr class="my-[32px]" />
              <p class="text-[14px] italic mb-[32px]">
                “Leverage agile frameworks to provide a robust synopsis for
                strategy foster collaborative thinking to further the overall
                value proposition. Organically grow the holistic world view of
                disruptive innovation via workplace diversity and empowerment."
              </p>
              <div class="flex">
                <img
                  v-for="i in 4"
                  :key="i"
                  src="/images/icons/star.svg"
                  alt="Star"
                  class="w-[16px] h-[16px]"
                />
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  </section>
</template>

<script setup lang="ts"></script>

<style></style>
