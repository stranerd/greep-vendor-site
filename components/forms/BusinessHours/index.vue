<template>
  <card class="my-8 grid gap-2 duration-500">
    <div class="flex items-center justify-between gap-x-4 bg-[#F1F3F76B] p-4">
      <div class="flex gap-x-4">
        <ClockIcon class="block h-6 w-6 text-primary" />
        <div class="">
          <h2 class="font-medium">Business Hours</h2>
          <p class="text-sm text-[#999999]">
            Control how customers get to reach you at different times of the day
          </p>
        </div>
      </div>
      <Switch
        class="self-center data-[state=checked]:bg-[#10BB76]"
        id="availablity"
        v-model:checked="availability"
      />
    </div>
    <transition
      mode="out-in"
      enter-active-class="animate__animated animate__fadeInUp"
      leave-active-class="animate__animated animate__fadeOutDown"
      move-active-class="animate__animated animate__fadeInUp"
    >
      <div class="p-4" v-if="availability">
        <div class="my-5 items-center justify-between gap-x-60 lg:flex">
          <div class="min-w-max text-sm">
            <h2 class="font-medium">Timezone</h2>
            <p class="text-[#999999]">Set your timezone</p>
          </div>
          <div
            class="flex h-10 items-center justify-between rounded-lg text-[#999999] lg:w-full"
          >
            <Select v-model="timezone" class="">
              <SelectTrigger class="border border-[#999]">
                <SelectValue
                  placeholder="Select time range"
                  class="ml-auto mr-2 block text-black"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Timezones</SelectLabel>
                  <SelectItem
                    :value="time.id"
                    v-for="(time, index) in supportedTimezones"
                  >
                    {{ time.id.replaceAll("_", " ") }} — {{ time.offset }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div class="grid gap-5 lg:gap-2.5">
          <div
            class="flex lg:items-center"
            v-for="(activity, days) in activeBusinessHours"
          >
            <div class="flex w-48 gap-x-3">
              <Switch
                class="data-[state=checked]:bg-[#10BB76]"
                id="availablity"
                v-model:checked="activity.active"
              />
              <span class="capitalize">{{ days }}</span>
            </div>

            <transition mode="out-in" name="fade" class="">
              <div
                v-if="activity.active === true"
                class="grid flex-1 gap-x-4 gap-y-2 text-xs lg:flex"
              >
                <div
                  class="flex h-10 w-full items-center justify-between rounded-lg text-[#999999]"
                >
                  <Select v-model="activity.from">
                    <SelectTrigger class="border border-[#999]">
                      <span class="">From</span>
                      <SelectValue
                        placeholder="Select time range"
                        class="ml-auto mr-2 block text-black"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Available Hours</SelectLabel>
                        <SelectItem
                          :value="time"
                          v-for="(time, index) in availableHours"
                        >
                          {{ time }}
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div
                  class="flex h-10 w-full items-center justify-between rounded-lg text-[#999999]"
                >
                  <Select v-model="activity.to">
                    <SelectTrigger class="border border-[#999]">
                      <span class="">To</span>

                      <SelectValue
                        placeholder="Select time range"
                        class="ml-auto mr-2 block text-black"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Available Hours</SelectLabel>
                        <SelectItem
                          :value="time"
                          v-for="(time, index) in filteredHours(activity.from)"
                        >
                          {{ time }}
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div
                class="flex h-10 w-full flex-1 items-center gap-x-2 rounded-lg bg-[#F0F3F6] px-4 text-xs"
                v-else
              >
                <MoonIcon class="h-6 w-6 text-[#999999]" />
                <span class="text-[#999999]">Closed</span>
              </div>
            </transition>
          </div>
        </div>
      </div></transition
    >
  </card>
</template>

<script setup lang="ts">
import { MoonIcon, ClockIcon } from "@placetopay/iconsax-vue/outline";
import * as z from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { API_STATES } from "~/services/constants";
import { useAuthStore } from "@/store/useAuthStore";
import { useToast } from "@/components/library/toast/use-toast";

const authStore = useAuthStore();
const { apiLoadingStates, userProfile, user, supportedTimezones } =
  storeToRefs(authStore);
const { getUserProfile, getSupportedTimezones } = authStore;

const availability = ref(true);

const timezone = ref(supportedTimezones.value[3].id);
const activeBusinessHours = ref({
  monday: {
    active: true,
    from: "8:00AM",
    to: "10:00PM",
  },
  tuesday: {
    active: false,
    from: "8:00AM",
    to: "10:00PM",
  },
  wednesday: {
    active: true,
    from: "8:00AM",
    to: "10:00PM",
  },
  thursday: {
    active: true,
    from: "8:00AM",
    to: "10:00PM",
  },
  friday: {
    active: true,
    from: "8:00AM",
    to: "10:00PM",
  },
  saturday: {
    active: true,
    from: "8:00AM",
    to: "10:00PM",
  },
  sunday: {
    active: true,
    from: "8:00AM",
    to: "10:00PM",
  },
});

const availableHours = ref([
  "12:00 AM",
  "12:30 AM",
  "01:00 AM",
  "01:30 AM",
  "02:00 AM",
  "02:30 AM",
  "03:00 AM",
  "03:30 AM",
  "04:00 AM",
  "04:30 AM",
  "05:00 AM",
  "05:30 AM",
  "06:00 AM",
  "06:30 AM",
  "07:00 AM",
  "07:30 AM",
  "08:00 AM",
  "08:30 AM",
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "01:00 PM",
  "01:30 PM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
  "05:00 PM",
  "05:30 PM",
  "06:00 PM",
  "06:30 PM",
  "07:00 PM",
  "07:30 PM",
  "08:00 PM",
  "08:30 PM",
  "09:00 PM",
  "09:30 PM",
  "10:00 PM",
  "10:30 PM",
  "11:00 PM",
  "11:30 PM",
]);

const filteredHours = (selectedTime: string) => {
  const startIndex = availableHours.value.indexOf(selectedTime);
  return availableHours.value.slice(startIndex + 1);
};

function timeStringToObject(timeStr: string) {
  const [hour, mins, period] = timeStr.match(/(\d+):(\d+)(AM|PM)/).slice(1);
  let hr = parseInt(hour);
  const min = parseInt(mins, 10);
  if (period === "PM" && hr !== 12) hr += 12;
  if (period === "AM" && hr === 12) hr = 0;
  console.log(hr);
  return { hr, min };
}

watch(activeBusinessHours, (schedule) => {
  function convertTime({ hr, min }: { hr: number; min: number }) {
    const period = hr >= 12 ? "PM" : "AM";
    const hour = hr % 12 === 0 ? 12 : hr % 12; // Convert 0/24 to 12, and other values to 12-hour format
    const minute = min.toString().padStart(2, "0");
    return `${hour}:${minute}${period}`;
  }

  // Mapping from short day names to full day names
  const dayMap = {
    mon: "monday",
    tue: "tuesday",
    wed: "wednesday",
    thu: "thursday",
    fri: "friday",
    sat: "saturday",
    sun: "sunday",
  };

  const convertedDays = Object.keys(schedule).reduce((acc: any, day: any) => {
    const shortDay = day.slice(0, 3); // Convert full day names to abbreviations
    const { active, from, to } = schedule[day];

    acc[shortDay] =
      active === true
        ? {
            from: timeStringToObject(from),
            to: timeStringToObject(to),
          }
        : null;

    return acc;
  }, {});

  const activeBusinessPeriods = Object.keys(hours).reduce(
    (acc: any, day: any) => {
      const schedule = hours[day];
      const fullDayName = dayMap[day];

      acc[fullDayName] = {
        active: schedule !== null,
        from: schedule ? convertTime(schedule.from) : "8:00AM",
        to: schedule ? convertTime(schedule.to) : "6:00PM",
      };

      return acc;
    },
    {},
  );

  console.log({ activeBusinessPeriods, convertedDays });
});
onBeforeMount(async () => {
  await getSupportedTimezones();
});
</script>

<style scoped></style>
