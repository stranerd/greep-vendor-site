const hours = {
  mon: { from: { hr: 8, min: 0 }, to: { hr: 22, min: 0 }, active: true },
  tue: null,
  wed: { from: { hr: 8, min: 0 }, to: { hr: 22, min: 0 }, active: true },
  thu: { from: { hr: 8, min: 0 }, to: { hr: 22, min: 0 }, active: false },
  fri: { from: { hr: 8, min: 0 }, to: { hr: 22, min: 0 }, active: true },
  sat: { from: { hr: 8, min: 0 }, to: { hr: 22, min: 0 }, active: true },
  sun: { from: { hr: 8, min: 0 }, to: { hr: 23, min: 30 }, active: true },
};

function timeStringToObject(timeStr: string) {
  const [hour, mins, period] = timeStr?.match(/(\d+):(\d+)(AM|PM)/).slice(1);
  let hr = parseInt(hour);
  const min = parseInt(mins, 10);
  if (period === "PM" && hr !== 12) hr += 12;
  if (period === "AM" && hr === 12) hr = 0;
  console.log(hr);
  return { hr, min };
}

const dayMap = {
  mon: "monday",
  tue: "tuesday",
  wed: "wednesday",
  thu: "thursday",
  fri: "friday",
  sat: "saturday",
  sun: "sunday",
};

function convertTime({ hr, min }: { hr: number; min: number }) {
  const period = hr >= 12 ? "PM" : "AM";
  const hour = hr % 12 === 0 ? 12 : hr % 12; // Convert 0/24 to 12, and other values to 12-hour format
  const minute = min?.toString().padStart(2, "0");
  return `${hour}:${minute}${period}`;
}
// Helper function to convert 24-hour time to 12-hour format with AM/PM

// const activeBusinessHours = Object.keys(hours).reduce((acc, day) => {
//   const schedule = hours[day];
//   const fullDayName = dayMap[day];
//   console.log({ fullDayName, day });

//   acc[fullDayName] = {
//     active: schedule !== null,
//     from: schedule ? convertTime(schedule.from) : "8:00AM",
//     to: schedule ? convertTime(schedule.to) : "6:00PM",
//   };

//   return acc;
// }, {});

const convertedDays = Object.keys(hours).reduce((acc: any, day) => {
  const shortDay = day; // Convert full day names to abbreviations
  const { active, from, to } = hours.mon;
  acc[shortDay] =
    active === true
      ? {
          from: "8:00",
          to: "9:00",
        }
      : null;

  return acc;
}, {});

console.log(convertedDays);
// console.log(activeBusinessHours);
