import React, { memo } from "react";
import { Bar } from "react-chartjs-2";

const data = {
  labels: ["จันทร์", "อังคาร", "พุธ", "พฤหัส", "ศุกร์", "เสาร์", "อาทิตย์"],
  datasets: [
    {
      label: "เวลาโฟกัส",
      data: [
        { day: "จันทร์", seconds: 3600, hour: 1 },
        { day: "อังคาร", seconds: 52200, hour: 4.5 },
        { day: "พุธ", seconds: 3600, hour: 1 },
        { day: "พฤหัส", seconds: 1800, hour: 2 },
        { day: "ศุกร์", seconds: 978, hour: 2 },
        { day: "เสาร์", seconds: 654, hour: 1 },
        { day: "อาทิตย์", seconds: 6541, hour: 1.81 },
      ],

      backgroundColor: [
        "rgba(255, 196, 61, 0.7)",
        "rgba(239, 71, 111, 0.7)",
        "rgba(158, 228, 147,0.7)",
        "rgba(254, 93, 38,0.7)",
        "rgba(4, 57, 94,0.7)",
        "rgba(68, 3, 129, 0.7)",
        "rgba(235, 60, 39, 0.7)",
        // "rgba(153, 102, 255, 0.2)",
        // "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "white",
        // "rgba(255, 99, 132, 1)",
        // "rgba(54, 162, 235, 1)",
        // "rgba(255, 206, 86, 1)",
        // "rgba(75, 192, 192, 1)",
        // "rgba(153, 102, 255, 1)",
        // "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  parsing: {
    xAxisKey: "day",
    yAxisKey: "hour",
  },
  plugins: {
    title: {
      display: true,
      text: "เวลาโฟกัสทั้งหมด (สัปดาห์)",
      font: {
        size: 16,
        family: "Bai Jamjuree",
      },
    },

    tooltip: {
      callbacks: {
        label: (ctx) => {
          const focusTime = ctx.raw.seconds;
          const getFocusTime = () => {
            if (focusTime === undefined) return "error";
            const hour = Math.floor(focusTime / 3600);
            const minutes = Math.ceil((focusTime / 60) % 60);

            if (hour >= 1) {
              if (minutes > 0) {
                return `โฟกัส ${hour} ชม. ${minutes} นาที`;
              }
              return `โฟกัส ${hour} ชม.`;
            } else {
              return `โฟกัส ${minutes} นาที`;
            }
          };
          return getFocusTime();
        },
      },
    },

    legend: {
      display: false,
    },
  },

  scales: {
    title: {
      display: false,
    },
    x: {
      ticks: {
        callback: function (value, index, values) {
          const label = [
            "จันทร์",
            "อังคาร",
            "พุธ",
            "พฤหัส",
            "ศุกร์",
            "เสาร์",
            "อาทิตย์",
          ];

          return label[index];
        },
      },
    },
    y: {
      ticks: {
        callback: function (value, index, values) {
          if (Number.isInteger(value)) return value + "ชม.";
        },
      },
    },
  },
};
function ProgressHistory() {
  return <Bar width="100%" height="100%" data={data} options={options} />;
}

export default memo(ProgressHistory);
