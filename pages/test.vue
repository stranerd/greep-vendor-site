<template>
  <div>
    <ClientOnly>
      <TimePicker />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "dashboard",
});
</script>

<style scoped></style>
