<template>
  <main>
    <NavBar />
    <div class="relative h-[450px] overflow-hidden bg-white lg:h-[600px]">
      <img
        class="absolute left-0 hidden h-auto w-full md:block"
        src="/images/hero-illustration.svg"
        alt="Background"
      />
      <img
        class="absolute left-0 h-auto w-full md:hidden"
        src="/images/mobile-hero-bg.png"
        alt="Background"
      />

      <div
        class="absolute z-50 flex h-full w-full flex-col items-center justify-start"
      >
        <template v-if="NotFoundError">
          <h2
            class="font-rubik text-[150px] font-semibold text-primary lg:text-[200px]"
          >
            4<span class="text-black">0</span>4
          </h2>

          <h2 class="font-rubik text-3xl font-semibold lg:text-4xl">
            Oops! Page not found.
          </h2>
          <p class="my-4 text-gray-500">
            Let’s get you to where you need to be.
          </p>
        </template>

        <template v-else>
          <h2
            v-if="statusCode"
            class="font-rubik text-[150px] font-semibold text-primary lg:text-[200px]"
          >
            {{ statusCode[0]
            }}<span class="text-black">{{ statusCode[1] }}</span
            >{{ statusCode[2] }}
          </h2>

          <h2 class="font-rubik text-3xl font-semibold lg:text-4xl">
            Oops! An error occured!
          </h2>
          <p class="my-4 text-gray-500">
            Let’s get you to where you need to be.
          </p>
        </template>
        <Button
          class="flex h-14 justify-between gap-x-4 bg-primary pb-3 pr-2 pt-3 hover:bg-primary"
          rounded="lg"
          ><span class="font-normal">Go back to home</span>
          <div class="rounded-full bg-[#000E18] p-[14px]">
            <MoveUpRight :size="20" />
          </div>
        </Button>
      </div>
    </div>
    <Faq />
    <Footer />
  </main>
</template>

<script setup lang="ts">
import { MoveUpRight } from "lucide-vue-next";
const error = useError();
const NotFoundError = computed(() => error.value?.statusCode === 404);

const statusCode = error.value?.statusCode.toString().split("");
onMounted(() => console.log({ error }));
</script>
