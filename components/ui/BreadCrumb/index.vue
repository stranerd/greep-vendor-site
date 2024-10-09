<template>
  <div
    class="flex"
    :class="
      small ? 'text-base font-normal' : 'text-lg font-semibold md:text-2xl'
    "
  >
    <Skeleton class="h-12 w-[420px]" v-if="loading" />
    <template v-else
      ><nuxt-link :to="route.route" v-for="(route, i) in routes"
        >{{ route.title }}
        <span class="mx-2" v-if="i !== routes.length - 1">></span></nuxt-link
      >
    </template>
  </div>
</template>

<script setup lang="ts">
import type { RouteLocationNamedRaw, RouteLocationPathRaw } from "vue-router";

interface Routes {
  route: RouteLocationPathRaw | RouteLocationNamedRaw;
  title: string;
}

defineProps({
  routes: { type: Array as PropType<Routes[]>, required: true },
  loading: Boolean,
  small: Boolean,
});
</script>

<style scoped></style>
