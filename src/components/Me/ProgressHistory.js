import React, { memo } from "react";
import { Bar } from "react-chartjs-2";

function ProgressHistory({ progress }) {
  const data = {
    labels: ["จันทร์", "อังคาร", "พุธ", "พฤหัส", "ศุกร์", "เสาร์", "อาทิตย์"],
    datasets: [
      {
        label: "เวลาโฟกัส",
        data: progress,

        backgroundColor: [
          "rgba(255, 196, 61, 0.7)",
          "rgba(239, 71, 111, 0.7)",
          "rgba(158, 228, 147,0.7)",
          "rgba(254, 93, 38,0.7)",
          "rgba(4, 57, 94,0.7)",
          "rgba(68, 3, 129, 0.7)",
          "rgba(235, 60, 39, 0.7)",
        ],
        borderColor: ["white"],
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

  return <Bar width="100%" height="100%" data={data} options={options} />;
}

export default memo(ProgressHistory);
