<template>
  <div class="flex gap-x-2">
    <Select v-model="selectedHour">
      <SelectTrigger class="flex w-[60px] text-[#999999]">
        <span class="block">
          {{ selectedHour.toString().padStart(2, "0") }}
        </span>
      </SelectTrigger>
      <SelectContent>
        <SelectItem :value="hour" :key="index" v-for="(hour, index) in hours">
          {{ hour.toString().padStart(2, "0") }}
        </SelectItem>
      </SelectContent>
    </Select>

    <Select v-model="selectedMinute">
      <SelectTrigger class="flex w-[60px] text-[#999999]">
        <span class="block">
          {{ selectedMinute.toString().padStart(2, "0") }}
        </span>
      </SelectTrigger>
      <SelectContent>
        <SelectItem
          :value="minute"
          :key="index"
          v-for="(minute, index) in minutes"
        >
          {{ minute.toString().padStart(2, "0") }}
        </SelectItem>
      </SelectContent>
    </Select>

    <Select v-model="selectedPeriod">
      <SelectTrigger class="flex w-[60px] text-[#999999]">
        <span class="block">
          {{ selectedPeriod.label }}
        </span>
      </SelectTrigger>
      <SelectContent>
        <SelectItem
          :value="period"
          :key="index"
          v-for="(period, index) in periods"
        >
          {{ period.label }}
        </SelectItem>
      </SelectContent>
    </Select>
  </div>
</template>

<script setup lang="ts">
import { milliseconds } from "date-fns";

const model = defineModel({ default: 0 });
const hours = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
const minutes = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41,
  42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
];

const periods = ref([
  {
    label: "AM",
    value: 0,
  },
  {
    label: "PM",
    value: 12,
  },
]);

const selectedHour = ref<number>(12);
const selectedMinute = ref<number>(0);
const selectedPeriod = ref(periods.value[1]);

watchEffect(() => {
  model.value = milliseconds({
    hours: selectedHour.value + selectedPeriod.value.value,
    minutes: selectedMinute.value,
  });
});
</script>

<style scoped></style>
