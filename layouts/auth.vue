<template>
  <main>
    <div
      class="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[100vh]"
    >
      <div class="hidden bg-muted lg:block">
        <img
          src="/images/auth-bg.svg"
          alt="Image"
          width="1920"
          height="1080"
          class="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
      <div class="flex items-center justify-center py-12">
        <slot />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts"></script>

<style></style>
