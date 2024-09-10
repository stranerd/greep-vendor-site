<template>
  <GoogleAutocomplete
    v-model:model-value="initialValue"
    :value="initialValue?.name ?? initialValue?.location"
    v-bind="$attrs"
    placeholder="select your location"
    class="google-location z-[100000]"
    :api-key="GoogleMapApiKey"
    @set="getPayload"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { GoogleAutocomplete } from "vue3-google-autocomplete";
const config = useRuntimeConfig();
const GoogleMapApiKey = config.public.googleMapApiKey;
const props = defineProps(["value"]);
const initialValue = ref(props.value);
const modelValue = defineModel();
const getPayload = (e: any) => {
  modelValue.value = e;
  initialValue.value = e;
};
</script>
