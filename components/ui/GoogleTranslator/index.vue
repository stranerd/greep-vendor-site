<template>
  <Button class="" variant="ghost">
    <GoogleTranslate
      class="!h-[42px]"
      default-language-code="en"
      default-page-language-code="en"
      :fetch-browser-language="false"
      trigger="click"
      @select="handleGoogleTranslateSelect"
      :languages="language"
    />
  </Button>
</template>
<script setup lang="ts">
import GoogleTranslate from "@google-translate-select/vue3";

const handleGoogleTranslateSelect = (language: any) => {
  console.log(language);
};

const language = ref([
  {
    code: "en",
    name: "English",
    cname: "英语",
    ename: "English",
  },
  {
    code: "tr",
    name: "Türkçe",
    cname: "Türkçe",
    ename: "Turkish",
  },
]);
</script>
