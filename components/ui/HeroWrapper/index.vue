<template>
  <section>
    <div class="container">
      <div
        style="
          background-image: url('/images/hero-wrapper-bg.svg');
          background-size: cover;
          background-position: center center;
          background-repeat: no-repeat;
        "
        class="flex items-center flex-col p-4 border-[1px] border-[#F1F1F3] rounded-[20px] justify-center rounder-[20px] min-h-[266px] md:min-h-[366px]"
      >
        <slot />
      </div>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style></style>
