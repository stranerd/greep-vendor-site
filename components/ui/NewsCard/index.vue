<template>
  <div class="rounded-[6px] overflow-hidden bg-[#FCFCFD]">
    <img :src="cardData.img" alt="" class="h-[320px] w-full object-cover" />
    <div class="p-[32px]">
      <div class="flex items-center justify-between mb-6">
        <div
          class="rounded-[9999px] text-[12px] text-[#777E90] py-[6px] px-[12px] border-[#E6E8EC] border-[1px]"
        >
          {{ cardData.tag }}
        </div>
        <small class="text-[#777E90] text-[14px] leading-[24px]">
          {{ cardData.date }}
        </small>
      </div>
      <h3 class="text-[24px] font-semibold leading-[32px] mb-2">
        {{ cardData.title }}
      </h3>
      <p
        class="text-[20px] font-mullish font-light leading-[31px] text-[#808080] mb-6"
      >
        {{ cardData.details }}
      </p>

      <button
        class="py-[18px] flex items-center px-[24px] bg-[#FFFFFF] border-[1px] rounded-[100px]"
        @click="router.push('/news/curating-a-workspace')"
      >
        Read More
        <img
          src="/images/icons/arrow-up-right.svg"
          alt=""
          class="ml-[10px] h-[20px] w-[20px]"
        />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  cardData: { type: Object as () => {}, required: true },
});

const router = useRouter();
</script>

<style></style>
