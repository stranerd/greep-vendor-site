<template>
  <div class="grid w-full gap-8 p-10">
    <section class="w-3/5">
      <CursiveTitle>Greep Services</CursiveTitle>
      <h2 class="my-5 w-3/5 text-5xl font-semibold">
        How to Use Any of Our Services
      </h2>
      <p class="text-lg">
        Browse, customize, and order your favorite meals with ease on the Greep
        app. Track your delivery in real-time and enjoy delicious food delivered
        right to your doorstep.
      </p>
    </section>

    <section class="hide-scrollbar flex w-full gap-4 overflow-scroll">
      <Card
        v-for="item in steps"
        class="flex h-[298px] w-[310px] flex-col justify-between bg-black p-6 text-white"
      >
        <h2 class="">Step {{ item.step }}</h2>
        <h2 class="text-3xl font-semibold">{{ item.title }}</h2>
        <p class="">{{ item.description }}</p>
      </Card>
    </section>
  </div>
</template>

<script setup lang="ts">
const steps = ref([
  {
    step: 1,
    title: "Download Greep App",
    description:
      "Sign up and create your partner account on the Greep platform.",
  },
  {
    step: 2,
    title: "Create Your Account",
    description:
      "Add your products or services to the platform with detailed descriptions and images.",
  },
  {
    step: 3,
    title: "Pick Service Needed",
    description:
      "Receive and manage orders conveniently through the Greep dashboard.",
  },
  {
    step: 4,
    title: "Follow Instructions",
    description:
      "Prepare and fulfill orders promptly to ensure customer satisfaction.",
  },
  {
    step: 5,
    title: "Download Greep Pay",
    description:
      "Prepare and fulfill orders promptly to ensure customer satisfaction.",
  },
]);
</script>

<style scoped></style>
