<template>
  <section class="bg-[#F4F4F4] py-[40px] md:py-[83px]">
    <div
      class="container flex w-full flex-col justify-between gap-[50px] px-[20px] md:px-[2rem] lg:flex-row"
    >
      <div class="w-full max-w-[100%] lg:max-w-[681px]">
        <CursiveTitle> FAQs </CursiveTitle>
        <h2
          class="mb-[50px] max-w-[423px] text-[24px] font-semibold md:text-[32px] lg:text-[48px]"
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
      <div class="relative w-full md:min-w-[550px] lg:pl-[100px]">
        <div
          class="absolute bottom-0 left-0 w-full rounded-[6px] bg-[#000E18] px-[20px] py-[37px] text-[#fff] md:px-[45px] md:py-[52px] lg:bottom-auto lg:top-[150px] lg:max-w-[448px]"
        >
          <p
            class="mb-[21px] text-[14px] font-medium md:text-[18px] lg:text-[20px]"
          >
            You need any help? get free consultation
          </p>
          <div class="mb-[21px] flex items-center">
            <img
              src="/images/icons/call-icon.svg"
              alt="call"
              class="mr-[14px] h-[40px] w-[40px] md:h-[63px] md:w-[63px]"
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
              class="ml-[10px] mr-[-20px] rounded-full bg-[#000E18] p-[14px]"
            >
              <MoveUpRight :size="20" />
            </div>
          </Button>
        </div>
        <img
          src="/images/faq-image.jpg"
          alt="Frequently asked questions"
          class="block h-[539px] w-full rounded-[6px] object-cover"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { MoveUpRight } from "lucide-vue-next";

const faqItems = [
  {
    question: "What is Greep?",
    answer:
      "Greep is an innovative online and onsite marketplace designed to connect businesses and customers. Our platform off ers a wide range of products and services, including African food items, hair products, logistics solutions, and more. Greep also empowers businesses with delivery and subscription-based solutions to help them grow.",
  },
  {
    question: "What does Greep Market offer?",
    answer:
      "Greep Market specializes in African food items, hair products, and various consumer goods. We continuously expand our catalog to include more products based on customer feedback and market demand.",
  },
  {
    question: "Does Greep offer delivery services?",
    answer:
      "Yes, Greep off ers fast, reliable, and aff ordable delivery services to customers and vendors. Our services are operational across all cities in TRNC, and we use dedicated delivery bikes to ensure your items reach you promptly",
  },
  {
    question: "What payment methods does Greep accept?",
    answer:
      "Greep supports a variety of payment methods, including cash on delivery, bank transfers, and digital payments through Greep Pay, our secure and user-friendly payment platform.",
  },
  {
    question:
      "How can I stay updated about Greep’s latest products and services?",
    answer:
      "Stay connected by following us on our social media platforms, joining our WhatsApp group, and subscribing to our newsletter for updates on new products, services, and promotions.",
  },
];
</script>

<style></style>
