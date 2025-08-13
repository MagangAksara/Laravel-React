import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Link, router, usePage } from "@inertiajs/react";

const DateTime = () => {

    return (
        <>
            <Card>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                <div>
                    <Label>Rental Start Date & Time</Label>
                    <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Senin, 11 Agustus 2025 09:00" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="start1">Senin, 11 Agustus 2025 09:00</SelectItem>
                    </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label>Rental End Date & Time</Label>
                    <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Selasa, 12 Agustus 2025 15:00" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="end1">Selasa, 12 Agustus 2025 15:00</SelectItem>
                    </SelectContent>
                    </Select>
                </div>
                </CardContent>
            </Card>
        </>
    );
}

export default DateTime;