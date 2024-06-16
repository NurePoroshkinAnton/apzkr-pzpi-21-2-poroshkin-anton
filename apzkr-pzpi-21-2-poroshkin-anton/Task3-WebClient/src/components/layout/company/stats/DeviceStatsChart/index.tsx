import { Pie } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"

ChartJS.register(ArcElement, Tooltip, Legend)

import { CliamteDeviceStatsDto } from "@/types/stats/dto/ClimateDeviceStatsDto"

type DeviceStatsChartProps = {
    deviceStats: CliamteDeviceStatsDto
}

export default function DeviceStatsChart({
    deviceStats,
}: DeviceStatsChartProps) {
    const data = {
        labels: deviceStats.groups.map((group) => group.status),
        datasets: [
            {
                data: deviceStats.groups.map((group) => group.count),
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                ],
                borderWidth: 1,
            },
        ],
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    label: (tooltipItem: any) => {
                        const index = tooltipItem.dataIndex
                        const percentage = deviceStats.groups[index].percentage
                        return `${tooltipItem.label}: ${tooltipItem.raw} (${percentage}%)`
                    },
                },
            },
        },
    }

    return <Pie data={data} options={options} />
}

