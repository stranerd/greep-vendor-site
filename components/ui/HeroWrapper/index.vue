<template>
  <section>
    <div class="container px-[20px] md:px-[2rem]">
      <div
        style="
          background-image: url(&quot;/images/hero-wrapper-bg.svg&quot;);
          background-size: cover;
          background-position: center center;
          background-repeat: no-repeat;
        "
        class="rounder-[20px] flex min-h-[166px] flex-col items-center justify-center rounded-[20px] border-[1px] border-[#F1F1F3] p-4 md:min-h-[256px]"
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
