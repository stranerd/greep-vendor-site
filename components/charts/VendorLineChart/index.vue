<template>
  <Card class="xl:col-span-2 bg-[#FBFBFB] border-[0px]">
    <CardHeader class="flex flex-row items-center mb-[31px]">
      <div class="flex items-center gap-4">
        <CardTitle class="text-[14px]">Overview</CardTitle>
        <div
          class="flex border-s-[1px] border-s-[#E0E2E4] ps-4 items-center gap-[7px]"
        >
          <div class="bg-[#10BB76] h-[10px] w-[10px] rounded-full"></div>
          <p class="text-[12px]">Today</p>
        </div>
        <div class="flex items-center gap-[7px]">
          <div class="bg-[#616161] h-[10px] w-[10px] rounded-full"></div>
          <p class="text-[12px]">Yesterday</p>
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <Line :data="data" :options="options" class="h-[224.06px]" />
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
  Legend
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
            label: "Today",
            backgroundColor: "#10BB76",
            borderColor: "#10BB76",
            fill: true,
            data: [40, 39, 10, 400, 39, 80, 40, 150, 90, 450, 600],
            tension: 0.4,
          },
          {
            label: "Yesterday",
            backgroundColor: "#616161",
            borderColor: "#616161",
            fill: true,
            data: [4, 9, 18, 60, 43, 30, 50, 300, 340, 500, 700],
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
