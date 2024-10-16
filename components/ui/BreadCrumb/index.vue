<template>
  <div>
    <Skeleton class="h-12 w-[420px]" v-if="loading" />
    <template v-else-if="backType">
      <div class="flex items-center">
        <Button variant="ghost" @click="router.go(-1)" class="mr-2 font-medium"
          ><ArrowLeft2Icon class="h-5 w-5" />
          <span class="block">Back</span></Button
        >
        <nuxt-link
          :to="route.route"
          v-for="(route, i) in routes"
          class="flex text-xs text-[#999999]"
        >
          {{ route.title }}
          <span class="" v-if="i !== routes.length - 1">/</span>
        </nuxt-link>
      </div>
    </template>
    <template v-else>
      <div class="flex">
        <nuxt-link
          :to="route.route"
          v-for="(route, i) in routes"
          :class="
            small ? 'text-base font-normal' : 'text font-semibold md:text-2xl'
          "
          >{{ route.title }}
          <span class="mx-1 lg:mx-2" v-if="i !== routes.length - 1"
            >></span
          ></nuxt-link
        >
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { RouteLocationNamedRaw, RouteLocationPathRaw } from "vue-router";
import { ArrowLeft2Icon } from "@placetopay/iconsax-vue/outline";
const router = useRouter();

interface Routes {
  route: RouteLocationPathRaw | RouteLocationNamedRaw;
  title: string;
}

defineProps({
  routes: { type: Array as PropType<Routes[]>, required: true },
  loading: Boolean,
  small: Boolean,
  backType: Boolean,
});
</script>

<style scoped></style>
