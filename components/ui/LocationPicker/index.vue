<template>
  <GoogleAutocomplete
    v-model="value"
    class="google-location"
    :api-key="GoogleMapApiKey"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { GoogleAutocomplete } from "vue3-google-autocomplete";
const config = useRuntimeConfig();
const GoogleMapApiKey = config.public.googleMapApiKey;

const value = ref();
</script>
