<script setup lang="ts">
import { useAuthStore } from "@/store/useAuthStore";

const authStore = useAuthStore();
const { hasCompletedVendorProfile, hasCompletedProfile, hasVerifiedEmail } =
  storeToRefs(authStore);

const route = useRoute();
console.log({ route });
</script>

<template>
  <div
    class="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]"
  >
    <Sidebar />
    <div class="max-h-[100vh] overflow-y-scroll">
      <div class="flex flex-col">
        <DashboardNav />

        <div
          v-if="!hasVerifiedEmail"
          class="py-3 bg-[#009260] sticky top-[75px] z-[10] text-[#fff] flex justify-center text-[14px]"
        >
          ⚠️ Please verify your email address to continue
          <nuxt-link class="ml-2 underline" to="/vendor/settings">
            Here
          </nuxt-link>
        </div>
        <div
          v-else-if="!hasCompletedVendorProfile || !hasCompletedProfile"
          class="py-3 bg-[#009260] sticky top-[75px] z-[10] text-[#fff] flex justify-center text-[14px]"
        >
          ⚠️ Please update your profile
          <nuxt-link
            v-if="route.path !== '/vendor/settings'"
            class="ml-2 underline"
            to="/vendor/settings"
          >
            Here
          </nuxt-link>
        </div>
        <main class="flex flex-1 flex-col gap-4 py-6 lg:gap-6 relative">
          <div
            v-if="
              (!hasCompletedVendorProfile || !hasCompletedProfile) &&
              route.path !== '/vendor/settings'
            "
            class="absolute top-0 left-0 z-[5] h-full w-full"
            style="
              /* From https://css.glass */
              background: rgba(255, 255, 255, 0.34);
              border-radius: 16px;
              box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
              backdrop-filter: blur(6.4px);
              -webkit-backdrop-filter: blur(6.4px);
            "
          ></div>

          <div class="container flex flex-1 flex-col gap-4 lg:gap-6">
            <slot />
          </div>
        </main>
      </div>
    </div>
  </div>
</template>
