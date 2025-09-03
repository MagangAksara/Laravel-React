import { useState } from "react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"

import { Card, CardContent } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"


const chartConfig = {
    desktop: {
        label: "Total Earning",
        color: "skyblue",
    },
}

const BarCharts = ({ chartData, period }) => {
    return (
        <Card>
            <CardContent className="pt-6">
                <ChartContainer config={chartConfig}>
                    <BarChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            top: 20,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) =>
                                period === "year"
                                    ? String(value).slice(0, 4)
                                    : String(value).slice(0, 3)
                            }
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar
                            dataKey="total"
                            fill="var(--color-desktop)"
                            radius={[20, 20, 0, 0]}
                        >
                            <LabelList
                                dataKey="total_formatted"
                                position="top"
                                offset={12}
                                className="fill-foreground"
                                fontSize={12}
                            />
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}

export default BarCharts;