import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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