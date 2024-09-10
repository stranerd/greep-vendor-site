// const hours = {
//   mon: { from: { hr: 8, min: 0 }, to: { hr: 22, min: 0 } },
//   tue: null,
//   wed: { from: { hr: 8, min: 0 }, to: { hr: 22, min: 0 } },
//   thu: { from: { hr: 8, min: 0 }, to: { hr: 22, min: 0 } },
//   fri: { from: { hr: 8, min: 0 }, to: { hr: 22, min: 0 } },
//   sat: { from: { hr: 8, min: 0 }, to: { hr: 22, min: 0 } },
//   sun: { from: { hr: 8, min: 0 }, to: { hr: 23, min: 30 } },
// };

// // Helper function to convert 24-hour time to 12-hour format with AM/PM

// const activeBusinessHours = Object.keys(hours).reduce((acc, day) => {
//   const schedule = hours[day];
//   const fullDayName = dayMap[day];

//   acc[fullDayName] = {
//     active: schedule !== null,
//     from: schedule ? convertTime(schedule.from) : "8:00AM",
//     to: schedule ? convertTime(schedule.to) : "6:00PM",
//   };

//   return acc;
// }, {});

// console.log(activeBusinessHours);
