<template>
  <main class="">
    <div
      class="relative h-screen w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[700px]"
    >
      <div
        style="
          background-image: url(&quot;/images/sign-up-bg.svg&quot;);
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
        "
        class="cover sticky bottom-0 top-0 hidden h-screen max-w-[100%] lg:block"
      >
        <nuxt-link to="/" class="absolute left-[59px] top-[47px]">
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
      <div class="flex items-center justify-center overflow-auto pb-6 pt-12">
        <slot />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts"></script>

<style></style>
