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
              <SelectTrigger
                class="border border-[#999]"
                :disabled="!editBusinessHours"
              >
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
            <div class="flex w-40 gap-x-3 lg:w-48">
              <Switch
                class="data-[state=checked]:bg-[#10BB76]"
                id="availablity"
                :disabled="!editBusinessHours"
                v-model:checked="activity.active"
              />
              <span class="text-sm capitalize lg:text-base">{{
                dayMap[days]
              }}</span>
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
                    <SelectTrigger
                      class="border border-[#999]"
                      :disabled="!editBusinessHours"
                    >
                      <span class="">From</span>

                      <span class="ml-auto block text-black">
                        {{ convertTo12HourFormat(activity.from) }}</span
                      >
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Available Hours</SelectLabel>
                        <SelectItem
                          :value="time"
                          :key="index"
                          v-for="(time, index) in availableHours"
                        >
                          {{ convertTo12HourFormat(time) }}
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div
                  class="flex h-10 w-full items-center justify-between rounded-lg text-[#999999]"
                >
                  <Select v-model="activity.to">
                    <SelectTrigger
                      class="border border-[#999]"
                      :disabled="!editBusinessHours"
                    >
                      <span class="">To</span>

                      <span class="ml-auto block text-black">
                        {{ convertTo12HourFormat(activity.to) }}</span
                      >
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Available Hours</SelectLabel>
                        <SelectItem
                          :value="time"
                          :key="index"
                          v-for="(time, index) in filteredHours(activity.from)"
                        >
                          {{ convertTo12HourFormat(time) }}
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

        <Button
          v-if="editBusinessHours"
          class="ml-auto mt-5 flex w-full !bg-primary duration-500"
          @click="updateVendorSchedule"
        >
          Save</Button
        >
        <Button
          v-else
          class="ml-auto mt-5 flex w-full duration-500"
          @click="editBusinessHours = true"
          >{{ editBusinessHours ? "Save" : "Edit" }}</Button
        >
      </div>
    </transition>
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

const editBusinessHours = ref(false);
const availability = ref(true);

const timezone = ref(
  userProfile.value?.vendor?.schedule?.timezone ??
    supportedTimezones?.value[3].id,
);

interface ScheduleTime {
  hr: number;
  min: number;
}

interface ScheduleBlock {
  active: boolean;
  from: ScheduleTime;
  to: ScheduleTime;
}
interface ISchedule {
  mon: ScheduleBlock;
  tue: ScheduleBlock;
  wed: ScheduleBlock;
  thu: ScheduleBlock;
  fri: ScheduleBlock;
  sat: ScheduleBlock;
  sun: ScheduleBlock;
}

const dayMap = ref<any>({
  mon: "monday",
  tue: "tuesday",
  wed: "wednesday",
  thu: "thursday",
  fri: "friday",
  sat: "saturday",
  sun: "sunday",
});

const vendorSchedule = computed(() => userProfile.value.vendor?.schedule);

const convertTo12HourFormat = (time: ScheduleTime) => {
  let { hr, min } = time;
  const period = hr >= 12 ? "PM" : "AM";
  let hour = hr % 12 || 12; // Converts hour to 12-hour format, if 0 make it 12
  let minutes = min.toString().padStart(2, "0"); // Ensure minutes are always two digits

  return `${hour}:${minutes} ${period}`;
};

const activeBusinessHours = ref<ISchedule>({
  mon: {
    active:
      Boolean(vendorSchedule.value?.schedule) &&
      vendorSchedule.value?.schedule?.mon !== null,
    from: vendorSchedule.value?.schedule?.mon?.from || { hr: 6, min: 0 },
    to: vendorSchedule.value?.schedule?.mon?.to || { hr: 22, min: 0 },
  },
  tue: {
    active:
      Boolean(vendorSchedule.value?.schedule) &&
      vendorSchedule.value?.schedule?.tue !== null,
    from: vendorSchedule.value?.schedule?.tue?.from || { hr: 6, min: 0 },
    to: vendorSchedule.value?.schedule?.tue?.to || { hr: 22, min: 0 },
  },
  wed: {
    active:
      Boolean(vendorSchedule.value?.schedule) &&
      vendorSchedule.value?.schedule?.wed !== null,
    from: vendorSchedule.value?.schedule?.wed?.from || { hr: 6, min: 0 },
    to: vendorSchedule.value?.schedule?.wed?.to || { hr: 22, min: 0 },
  },
  thu: {
    active:
      Boolean(vendorSchedule.value?.schedule) &&
      vendorSchedule.value?.schedule?.thu !== null,
    from: vendorSchedule.value?.schedule?.thu?.from || { hr: 6, min: 0 },
    to: vendorSchedule.value?.schedule?.thu?.to || { hr: 22, min: 0 },
  },
  fri: {
    active:
      Boolean(vendorSchedule.value?.schedule) &&
      vendorSchedule.value?.schedule?.fri !== null,
    from: vendorSchedule.value?.schedule?.fri?.from || { hr: 6, min: 0 },
    to: vendorSchedule.value?.schedule?.fri?.to || { hr: 22, min: 0 },
  },
  sat: {
    active:
      Boolean(vendorSchedule.value?.schedule) &&
      vendorSchedule.value?.schedule?.sat !== null,
    from: vendorSchedule.value?.schedule?.sat?.from || { hr: 6, min: 0 },
    to: vendorSchedule.value?.schedule?.sat?.to || { hr: 22, min: 0 },
  },
  sun: {
    active:
      Boolean(vendorSchedule.value?.schedule) &&
      vendorSchedule.value?.schedule?.sun !== null,
    from: vendorSchedule.value?.schedule?.sun?.from || { hr: 6, min: 0 },
    to: vendorSchedule.value?.schedule?.sun?.to || { hr: 22, min: 0 },
  },
});

const availableHours = ref(<ScheduleTime[]>[
  { hr: 0, min: 0 },
  { hr: 0, min: 30 },
  { hr: 1, min: 0 },
  { hr: 1, min: 30 },
  { hr: 2, min: 0 },
  { hr: 2, min: 30 },
  { hr: 3, min: 0 },
  { hr: 3, min: 30 },
  { hr: 4, min: 0 },
  { hr: 4, min: 30 },
  { hr: 6, min: 0 },
  { hr: 6, min: 30 },
  { hr: 6, min: 0 },
  { hr: 6, min: 30 },
  { hr: 7, min: 0 },
  { hr: 7, min: 30 },
  { hr: 8, min: 0 },
  { hr: 8, min: 30 },
  { hr: 9, min: 0 },
  { hr: 9, min: 30 },
  { hr: 10, min: 0 },
  { hr: 10, min: 30 },
  { hr: 11, min: 0 },
  { hr: 11, min: 30 },
  { hr: 12, min: 0 },
  { hr: 12, min: 30 },
  { hr: 13, min: 0 },
  { hr: 13, min: 30 },
  { hr: 14, min: 0 },
  { hr: 14, min: 30 },
  { hr: 15, min: 0 },
  { hr: 15, min: 30 },
  { hr: 16, min: 0 },
  { hr: 16, min: 30 },
  { hr: 17, min: 0 },
  { hr: 17, min: 30 },
  { hr: 18, min: 0 },
  { hr: 18, min: 30 },
  { hr: 19, min: 0 },
  { hr: 19, min: 30 },
  { hr: 20, min: 0 },
  { hr: 20, min: 30 },
  { hr: 21, min: 0 },
  { hr: 21, min: 30 },
  { hr: 22, min: 0 },
  { hr: 22, min: 30 },
  { hr: 23, min: 0 },
  { hr: 23, min: 30 },
]);

const filteredHours = (selectedTime: ScheduleTime) => {
  const startIndex = availableHours.value.indexOf(selectedTime);
  return availableHours.value.slice(startIndex + 1);
};

onBeforeMount(async () => {
  await getSupportedTimezones();
});

const updateVendorSchedule = async () => {
  const data = {
    schedule: {},
    timezone: timezone.value,
  };
  Object.keys(activeBusinessHours.value).map((day: any) => {
    const time = activeBusinessHours.value[day];
    data.schedule[day] =
      time.active === true ? { from: time.from, to: time.to } : null;
  });
  data.timezone = timezone.value;
  await authStore.updateVendorSchedule({
    schedule: data,
  });
  editBusinessHours.value = false;
};
</script>

<style scoped></style>
