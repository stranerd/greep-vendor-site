<template>
  <Card class="border-[0px] bg-[#FBFBFB] xl:col-span-2">
    <CardHeader class="mb-[31px] flex flex-row items-center">
      <div class="flex items-center gap-4">
        <CardTitle class="text-[14px]">Overview</CardTitle>
        <div
          class="flex items-center gap-[7px] border-s-[1px] border-s-[#E0E2E4] ps-4"
        >
          <div class="h-[10px] w-[10px] rounded-full bg-[#10BB76]"></div>
          <p class="text-[12px]">Today</p>
        </div>
        <div class="flex items-center gap-[7px]">
          <div class="h-[10px] w-[10px] rounded-full bg-[#616161]"></div>
          <p class="text-[12px]">Yesterday</p>
        </div>
      </div>
    </CardHeader>
    <CardContent class="max-w-screen">
      <Line :data="data" :options="options" class="lg:h-[224.06px]" />
    </CardContent>
  </Card>
</template>

<script>
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "vue-chartjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);
export default {
  components: {
    Line,
  },
  data() {
    return {
      data: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sept",
          "Oct",
          "Nov",
        ],
        datasets: [
          {
            label: "This month",
            backgroundColor: "#10BB76",
            borderColor: "#10BB76",
            fill: true,
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            tension: 0.4,
          },
          {
            label: "Last Month",
            backgroundColor: "#616161",
            borderColor: "#616161",
            fill: true,
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scaleShowVerticalLines: false,
        plugins: {
          title: {
            display: false,
          },
          legend: false,
        },
        scales: {
          y: {
            grid: {
              display: false,
              drawBorder: false,
            },
            border: {
              display: false,
            },
            ticks: {
              font: {
                size: 8,
                color: "#999999",
              },
            },
          },
          x: {
            grid: {
              display: true,
              drawBorder: false,
            },
            border: {
              display: false,
            },
            ticks: {
              font: {
                size: 8,
                color: "#999999",
              },
            },
          },
        },
      },
    };
  },
};
</script>

<style></style>
