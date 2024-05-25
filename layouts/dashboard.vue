<script setup lang="ts"></script>

<template>
  <div
    class="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]"
  >
    <NuxtLoadingIndicator color="#009260" :throttle="100" />
    <Sidebar />
    <div class="max-h-[100vh] overflow-y-scroll">
      <div class="flex flex-col">
        <DashboardNav />
        <div
          class="py-3 bg-[#009260] sticky top-[75px] z-[10] text-[#fff] flex justify-center text-[14px]"
        >
          ⚠️ Please verify your email and upload your documents
          <nuxt-link class="ml-2 underline" to="/vendors/settings">
            Here
          </nuxt-link>
        </div>
        <main class="flex flex-1 flex-col gap-4 py-6 lg:gap-6">
          <div class="container flex flex-1 flex-col gap-4 lg:gap-6">
            <slot />
          </div>
        </main>
      </div>
    </div>
  </div>
</template>
