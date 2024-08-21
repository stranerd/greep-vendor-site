<template>
  <section class="">
    <div class="container px-[20px] md:px-[2rem]">
      <div class="bg-[#FCFCFD] py-[40px] md:py-[80px]">
        <div class="flex w-full items-center justify-center">
          <CursiveTitle> Values </CursiveTitle>
        </div>
        <h2
          class="mb-[30px] mt-[10px] text-center text-[32px] font-semibold leading-[48px] md:mb-[50px] md:text-[48px] md:leading-[60px] lg:mb-[80px] lg:text-[64px] lg:leading-[75px]"
        >
          Our Values & Principles
        </h2>
        <div
          class="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[36px] lg:grid-cols-3 lg:gap-[56px]"
        >
          <div
            v-for="(item, i) in items"
            :key="i"
            class="rounded-[6px] bg-[#F4F5F6] px-[24px] py-[48px] md:p-[48px]"
          >
            <div>
              <img
                src="/images/icons/checkmark.svg"
                :alt="item.title"
                class="mb-[32px] h-[44px] w-[44px]"
              />
              <h6 class="mb-2 text-[16px] font-medium leading-[24px]">
                {{ item.title }}
              </h6>
              <p class="text-[14px] leading-[24px] text-[#777E90]">
                {{ item.details }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="py-[45px]">
        <div class="flex w-full items-center justify-center">
          <CursiveTitle> Our Vison </CursiveTitle>
        </div>
        <h4
          class="mx-auto mt-4 max-w-[768px] text-center text-[20px] font-bold leading-[33.6px] md:text-[24px]"
        >
          Describe what your company is building towards in the future. This
          vision statement should serve the purpose of selling the dream of the
          company to hiring talent, investors and partners.
        </h4>
      </div>
      <div class="hidden bg-[#FCFCFD] py-[40px] md:py-[80px]">
        <div class="flex w-full items-center justify-center">
          <CursiveTitle> Map </CursiveTitle>
        </div>

        <h2
          class="mb-[30px] mt-[10px] text-center text-[32px] font-semibold leading-[48px] md:mb-[50px] md:text-[48px] md:leading-[60px] lg:mb-[80px] lg:text-[64px] lg:leading-[75px]"
        >
          Our Values & Principles
        </h2>
        <div class="mx-auto max-w-[800px]">
          <div
            v-for="(mapval, i) in itemMap"
            :key="i"
            class="flex flex-col justify-between py-[24px] md:flex-row md:py-[32px]"
            :class="i > 1 ? '' : 'border-b-[1px] border-[#E6E8EC]'"
          >
            <h3
              class="max-w-[100%] text-[18px] font-semibold leading-[32px] text-[#333333] md:max-w-[180px] md:text-[24px]"
            >
              {{ mapval.title }}
            </h3>
            <div class="w-full md:w-[360px]">
              <p
                class="text-[14px] font-light leading-[24px] text-[#4C4C4D] md:text-[16px]"
              >
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
