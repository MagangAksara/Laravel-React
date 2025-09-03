import { useState } from "react"
import React, { memo } from "react";
import { ResponsiveContainer, Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"

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
        <ChartContainer config={chartConfig} className="h-full">
            {/* <ResponsiveContainer width="100%" height="100%"> */}
                <BarChart
                    accessibilityLayer
                    data={chartData}
                    margin={{ top: 30, right: 20, left: 0, bottom: 10 }}
                >
                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                    <XAxis
                        dataKey="month"
                        tickLine={false}
                        tickMargin={18}
                        axisLine={false}
                        tickFormatter={(value) =>
                            period === "year"
                                ? String(value).slice(0, 4)
                                : String(value).slice(0, 3)
                        }
                        style={{ fontSize: "12px", fill: "#6b7280" }}
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
            {/* </ResponsiveContainer> */}
        </ChartContainer>
    );
}

export default memo(BarCharts);