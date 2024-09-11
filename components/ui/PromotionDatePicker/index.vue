<script setup lang="ts">
import { type Ref, ref, watch } from "vue";

import {
  Calendar2Icon,
  ArrowLeftIcon,
  ArrowLeft3Icon,
  ArrowRight2Icon,
  ArrowRight1Icon,
  //   ChevronLeftIcon,
  //   ChevronRightIcon,
} from "@placetopay/iconsax-vue/outline";
import {
  CalendarDate,
  type DateValue,
  isEqualMonth,
} from "@internationalized/date";

import { type DateRange, RangeCalendarRoot, useDateFormatter } from "radix-vue";
import { type Grid, createMonth, toDate } from "radix-vue/date";
// import {
//   RangeCalendarCell,
//   RangeCalendarCellTrigger,
//   RangeCalendarGrid,
//   RangeCalendarGridBody,
//   RangeCalendarGridHead,
//   RangeCalendarGridRow,
//   RangeCalendarHeadCell,
// } from "@/components/ui/range-calendar";
import { Button, buttonVariants } from "@/components/library/button";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const currentDate = ref(new Date(Date.now()));

const value = ref({
  start: new CalendarDate(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() + 1,
    currentDate.value.getDate(),
  ),
  end: new CalendarDate(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() + 1,
    currentDate.value.getDate(),
  ).add({ days: 1 }),
}) as Ref<DateRange>;

const modelValue = defineModel();

const locale = ref("en-US");
const formatter = useDateFormatter(locale.value);

const placeholder = ref(value.value.start) as Ref<DateValue>;
const secondMonthPlaceholder = ref(value.value.end) as Ref<DateValue>;

const firstMonth = ref(
  createMonth({
    dateObj: placeholder.value,
    locale: locale.value,
    fixedWeeks: true,
    weekStartsOn: 0,
  }),
) as Ref<Grid<DateValue>>;
const secondMonth = ref(
  createMonth({
    dateObj: secondMonthPlaceholder.value,
    locale: locale.value,
    fixedWeeks: true,
    weekStartsOn: 0,
  }),
) as Ref<Grid<DateValue>>;

function updateMonth(reference: "first" | "second", months: number) {
  if (reference === "first") {
    placeholder.value = placeholder.value.add({ months });
  } else {
    secondMonthPlaceholder.value = secondMonthPlaceholder.value.add({
      months,
    });
  }
}

watch(placeholder, (_placeholder) => {
  firstMonth.value = createMonth({
    dateObj: _placeholder,
    weekStartsOn: 0,
    fixedWeeks: false,
    locale: locale.value,
  });
  if (isEqualMonth(secondMonthPlaceholder.value, _placeholder)) {
    secondMonthPlaceholder.value = secondMonthPlaceholder.value.add({
      months: 1,
    });
  }
});

watch(secondMonthPlaceholder, (_secondMonthPlaceholder) => {
  secondMonth.value = createMonth({
    dateObj: _secondMonthPlaceholder,
    weekStartsOn: 0,
    fixedWeeks: false,
    locale: locale.value,
  });
  if (isEqualMonth(_secondMonthPlaceholder, placeholder.value))
    placeholder.value = placeholder.value.subtract({ months: 1 });
});

watch(
  value,
  (newValue) => {
    const { start, end } = newValue;
    if (start && end) {
      const startDate = new Date(start.year, start.month - 1, start.day);
      const endDate = new Date(end.year, end.month - 1, end.day);
      const startISO = startDate.getTime();
      const endISO = endDate.getTime();
      modelValue.value = { from: startISO, to: endISO };
    }
  },
  { deep: true, immediate: true },
);
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        :class="
          cn(
            'w-full justify-start border border-black/40 text-left font-normal',
            !value && 'text-muted-foreground',
          )
        "
      >
        <Calendar2Icon class="mr-2 h-5 w-5" />
        <template v-if="value.start">
          <template v-if="value.end">
            {{
              formatter.custom(toDate(value.start), {
                dateStyle: "medium",
              })
            }}
            -
            {{
              formatter.custom(toDate(value.end), {
                dateStyle: "medium",
              })
            }}
          </template>

          <template v-else>
            {{
              formatter.custom(toDate(value.start), {
                dateStyle: "medium",
              })
            }}
          </template>
        </template>
        <template v-else> Pick a date </template>
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <RangeCalendarRoot
        v-slot="{ weekDays }"
        v-model="value"
        v-model:placeholder="placeholder"
        class="p-3"
        color="black"
      >
        <div
          class="mt-4 flex flex-col gap-y-4 sm:flex-row sm:gap-x-4 sm:gap-y-0"
        >
          <div class="flex flex-col gap-4">
            <div class="flex items-center justify-between">
              <button
                variant="outline"
                :class="
                  cn(
                    buttonVariants({ variant: 'outline' }),
                    'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
                  )
                "
                @click="updateMonth('first', -1)"
              >
                <ArrowLeftIcon class="h-4 w-4" />
              </button>
              <div :class="cn('text-sm font-medium')">
                {{ formatter.fullMonthAndYear(toDate(firstMonth.value)) }}
              </div>
              <button
                :class="
                  cn(
                    buttonVariants({ variant: 'outline' }),
                    'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
                  )
                "
                @click="updateMonth('first', 1)"
              >
                <ArrowRight1Icon class="h-4 w-4" />
              </button>
            </div>
            <RangeCalendarGrid>
              <RangeCalendarGridHead>
                <RangeCalendarGridRow>
                  <RangeCalendarHeadCell
                    v-for="day in weekDays"
                    :key="day"
                    class="w-full"
                  >
                    {{ day }}
                  </RangeCalendarHeadCell>
                </RangeCalendarGridRow>
              </RangeCalendarGridHead>
              <RangeCalendarGridBody>
                <RangeCalendarGridRow
                  v-for="(weekDates, index) in firstMonth.rows"
                  :key="`weekDate-${index}`"
                  class="mt-2 w-full"
                >
                  <RangeCalendarCell
                    v-for="weekDate in weekDates"
                    :key="weekDate.toString()"
                    :date="weekDate"
                  >
                    <RangeCalendarCellTrigger
                      :day="weekDate"
                      :month="firstMonth.value"
                    />
                  </RangeCalendarCell>
                </RangeCalendarGridRow>
              </RangeCalendarGridBody>
            </RangeCalendarGrid>
          </div>
          <div class="flex flex-col gap-4">
            <div class="flex items-center justify-between">
              <button
                variant="outline"
                :class="
                  cn('h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100')
                "
                @click="updateMonth('second', -1)"
              >
                <ArrowLeftIcon class="h-4 w-4" />
              </button>
              <div :class="cn('text-sm font-medium')">
                {{ formatter.fullMonthAndYear(toDate(secondMonth.value)) }}
              </div>

              <button
                :class="
                  cn(
                    buttonVariants({ variant: 'outline' }),
                    'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
                  )
                "
                @click="updateMonth('second', 1)"
              >
                <ArrowRight1Icon class="h-4 w-4" />
              </button>
            </div>
            <RangeCalendarGrid>
              <RangeCalendarGridHead>
                <RangeCalendarGridRow>
                  <RangeCalendarHeadCell
                    v-for="day in weekDays"
                    :key="day"
                    class="w-full"
                  >
                    {{ day }}
                  </RangeCalendarHeadCell>
                </RangeCalendarGridRow>
              </RangeCalendarGridHead>
              <RangeCalendarGridBody>
                <RangeCalendarGridRow
                  v-for="(weekDates, index) in secondMonth.rows"
                  :key="`weekDate-${index}`"
                  class="mt-2 w-full"
                >
                  <RangeCalendarCell
                    v-for="weekDate in weekDates"
                    :key="weekDate.toString()"
                    :date="weekDate"
                  >
                    <RangeCalendarCellTrigger
                      :day="weekDate"
                      :month="secondMonth.value"
                    />
                  </RangeCalendarCell>
                </RangeCalendarGridRow>
              </RangeCalendarGridBody>
            </RangeCalendarGrid>
          </div>
        </div>
      </RangeCalendarRoot>
    </PopoverContent>
  </Popover>
</template>
