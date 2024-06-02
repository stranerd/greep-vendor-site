<template>
  <section class="bg-[#F4F4F4] py-[40px] md:py-[83px]">
    <div
      class="container px-[20px] md:px-[2rem] flex flex-col w-full lg:flex-row gap-[50px] justify-between"
    >
      <div class="w-full max-w-[100%] lg:max-w-[681px]">
        <CursiveTitle> FAQs </CursiveTitle>
        <h2
          class="mb-[50px] font-semibold text-[24px] md:text-[32px] lg:text-[48px] max-w-[423px]"
        >
          Frequently Asked Questions
        </h2>
        <client-only>
          <Accordion type="multiple" collapsible className="w-full">
            <AccordionItem
              v-for="(item, i) in faqItems"
              :key="i"
              :value="`item-${i}`"
            >
              <AccordionTrigger class="text-left">{{
                item.question
              }}</AccordionTrigger>
              <AccordionContent>
                {{ item.answer }}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </client-only>
      </div>
      <div class="relative md:min-w-[550px] w-full lg:pl-[100px]">
        <div
          class="absolute py-[37px] md:py-[52px] left-0 px-[20px] md:px-[45px] bg-[#000E18] text-[#fff] w-full lg:max-w-[448px] rounded-[6px] bottom-0 lg:bottom-auto lg:top-[150px]"
        >
          <p
            class="text-[14px] md:text-[18px] lg:text-[20px] font-medium mb-[21px]"
          >
            You need any help? get free consultation
          </p>
          <div class="flex items-center mb-[21px]">
            <img
              src="/images/icons/call-icon.svg"
              alt="call"
              class="h-[40px] w-[40px] md:h-[63px] md:w-[63px] mr-[14px]"
            />
            <div>
              <p class="max-w-[166px] text-[14px] md:text-[16px]">
                Have Any Questions (00) 112 365 489
              </p>
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
          class="h-[539px] w-full rounded-[6px] block object-cover"
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

<style></style>
