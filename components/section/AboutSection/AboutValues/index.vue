<template>
  <section class="">
    <div class="container">
      <div class="bg-[#FCFCFD] py-[80px]">
        <div class="flex items-center w-full justify-center">
          <CursiveTitle> Values </CursiveTitle>
        </div>
        <h2
          class="text-[64px] text-center mb-[80px] font-semibold leading-[75px] mt-[10px]"
        >
          Our Values & Principles
        </h2>
        <div class="grid grid-cols-3 gap-[56px]">
          <div
            v-for="(item, i) in items"
            :key="i"
            class="bg-[#F4F5F6] rounded-[6px] p-[48px]"
          >
            <div>
              <img
                src="/images/icons/checkmark.svg"
                :alt="item.title"
                class="mb-[32px] h-[44px] w-[44px]"
              />
              <h6 class="text-[16px] leading-[24px] font-medium mb-2">
                {{ item.title }}
              </h6>
              <p class="text-[14px] text-[#777E90] leading-[24px]">
                {{ item.details }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="py-[45px]">
        <div class="flex items-center w-full justify-center">
          <CursiveTitle> Our Vison </CursiveTitle>
        </div>
        <h4
          class="text-[24px] font-bold leading-[33.6px] text-center mx-auto max-w-[768px] mt-4"
        >
          Describe what your company is building towards in the future. This
          vision statement should serve the purpose of selling the dream of the
          company to hiring talent, investors and partners.
        </h4>
      </div>
      <div class="bg-[#FCFCFD] py-[80px]">
        <div class="flex items-center w-full justify-center">
          <CursiveTitle> Map </CursiveTitle>
        </div>

        <h2
          class="text-[64px] text-center mb-[80px] font-semibold leading-[75px] mt-[10px]"
        >
          Our Values & Principles
        </h2>
        <div class="max-w-[800px] mx-auto">
          <div
            v-for="(mapval, i) in itemMap"
            :key="i"
            class="flex justify-between py-[32px]"
            :class="i > 1 ? '' : 'border-b-[1px] border-[#E6E8EC]'"
          >
            <h3
              class="max-w-[180px] text-[24px] leading-[32px] font-semibold text-[#333333]"
            >
              {{ mapval.title }}
            </h3>
            <div class="w-[360px]">
              <p class="text-[16px] font-light text-[#4C4C4D] leading-[24px]">
                {{ mapval.details }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
const items = [
  {
    title: "Trust",
    details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    title: "Approchable",
    details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    title: "Make it simple",
    details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    title: "Delightful experiences",
    details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    title: "Work together",
    details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    title: "Innovative mindset",
    details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];

const itemMap = [
  {
    title: "Phase One Planning",
    details:
      "Going above and beyond to serve our clients. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    title: "Phase Two Building",
    details:
      "Being good citizens in the communities in wich we live and work. Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
  },
  {
    title: "Phase Three Integration",
    details:
      "Going above and beyond to serve our clients. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];
</script>

<style></style>
