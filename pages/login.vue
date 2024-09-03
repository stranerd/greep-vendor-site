<template>
  <LoginForm />
</template>

<script setup lang="ts">
import { GP_ROUTES } from "~/constants/route-names";

definePageMeta({
  layout: "auth",
  name: GP_ROUTES.LOGIN,
});

useHead({
  title: "Greep - Login",
});
</script>

<style></style>
