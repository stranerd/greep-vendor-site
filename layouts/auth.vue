<template>
  <main>
    <div
      class="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[700px] h-[100vh]"
    >
      <NuxtLoadingIndicator color="#009260" :throttle="100" />
      <div
        style="
          background-image: url('/images/sign-up-bg.svg');
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
        "
        class="hidden relative cover lg:block max-w-[100%]"
      >
        <nuxt-link to="/" class="absolute top-[47px] left-[59px]">
          <img src="/images/logos/greep-green.svg" alt="Logo" />
        </nuxt-link>

        <!-- <img
          src="/images/auth-bg.svg"
          alt="Image"
          width="100%"
          height="100%"
          class="h-full w-full object-cover"
        /> -->
      </div>
      <div class="flex items-center justify-center py-12">
        <slot />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts"></script>

<style></style>
