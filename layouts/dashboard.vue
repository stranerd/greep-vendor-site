<script setup lang="ts"></script>

<template>
  <div
    class="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]"
  >
    <Sidebar />
    <div class="max-h-[100vh] overflow-y-scroll">
      <div class="flex flex-col">
        <DashboardNav />
        <main class="flex flex-1 flex-col gap-4 py-6 lg:gap-6">
          <div class="container flex flex-1 flex-col gap-4 lg:gap-6">
            <slot />
          </div>
        </main>
      </div>
    </div>
  </div>
</template>
