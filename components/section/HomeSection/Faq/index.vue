<template>
  <section class="bg-[#F4F4F4] py-[83px]">
    <div class="container flex gap-[50px] justify-between">
      <div class="w-full max-w-[681px]">
        <CursiveTitle> FAQs </CursiveTitle>
        <h2 class="mb-[50px] font-semibold text-[48px] max-w-[423px]">
          Frequently Asked Questions
        </h2>
        <client-only>
          <Accordion type="multiple" collapsible className="w-full">
            <AccordionItem
              v-for="(item, i) in faqItems"
              :key="i"
              :value="`item-${i}`"
            >
              <AccordionTrigger>{{ item.question }}</AccordionTrigger>
              <AccordionContent>
                {{ item.answer }}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </client-only>
      </div>
      <div class="relative">
        <div
          class="absolute py-[52px] px-[45px] bg-[#000E18] text-[#fff] max-w-[448px] rounded-[6px] top-[150px]"
        >
          <p class="text-[20px] font-medium mb-[21px]">
            You need any help? get free consultation
          </p>
          <div class="flex items-center mb-[21px]">
            <img
              src="/images/icons/call-icon.svg"
              alt="call"
              class="h-[63px] w-[63px] mr-[14px]"
            />
            <div>
              <p class="max-w-[166px]">Have Any Questions (00) 112 365 489</p>
            </div>
          </div>
          <Button variant="withIcon" size="lg" rounded="lg"
            >Contact Us
            <div
              class="bg-[#000E18] rounded-full p-[14px] ml-[10px] mr-[-20px]"
            >
              <MoveUpRight :size="20" />
            </div>
          </Button>
        </div>
        <img
          src="/images/faq-image.jpg"
          alt="Frequently asked questions"
          class="h-[539px] ml-[100px] block"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { MoveUpRight } from "lucide-vue-next";

const faqItems = [
  {
    question: "How can I pay for your logistics services?",
    answer:
      "Leverage agile frameworks to provide a robust synopsis for strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive.",
  },
  {
    question: "What payment methods are supported?",
    answer:
      "Leverage agile frameworks to provide a robust synopsis for strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive.",
  },
  {
    question: "What options for logistics plans are available?",
    answer:
      "Leverage agile frameworks to provide a robust synopsis for strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive.",
  },
  {
    question: "Can i specify a delivery date when ordering?",
    answer:
      "Leverage agile frameworks to provide a robust synopsis for strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive.",
  },
];
</script>

<style>
.element {
  clip-path: url(#svgPath);
  width: 100%;
  background-position: center;
  min-height: 841px;
}
</style>
