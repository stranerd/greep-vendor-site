<template>
  <PageHeader :isInnerPage="true"> Orders > Order #670944 </PageHeader>
  <div class="max-w-[848px] w-full mx-auto">
    <OrderDetails />
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "dashboard",
  middleware: ["authenticated"],
});
</script>

<style></style>
