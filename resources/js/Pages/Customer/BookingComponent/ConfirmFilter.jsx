import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Link, router, usePage } from "@inertiajs/react";

const ConfirmFilter = () => {
    const { car, pickup_location, return_location, payment_method } = usePage().props;

    const [driverOption, setDriverOption] = useState("with-driver");
    const [pickupOption, setPickupOption] = useState("owner");
    const [returnOption, setReturnOption] = useState("owner");
    const [loading, setLoading] = useState(false);
    
    return (
        <>
            <Card>
                <CardContent className="p-6 space-y-6">
                    <div>
                    <Label className="mb-2 block">Driver</Label>
                    <RadioGroup
                        value={driverOption}
                        onValueChange={setDriverOption}
                        className="flex gap-6"
                    >
                        <div className="flex items-center space-x-2">
                        <RadioGroupItem value="with-driver" id="with-driver" />
                        <Label htmlFor="with-driver">
                            With Driver{" "}
                            <span className="text-gray-500">
                            Rp {car.driver_fee.toLocaleString()}
                            </span>
                        </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                        <RadioGroupItem value="self-drive" id="self-drive" />
                        <Label htmlFor="self-drive">Self Drive</Label>
                        </div>
                    </RadioGroup>
                    </div>

                    {/* Pick-Up */}
                    <div>
                    <Label className="mb-2 block">Pick-Up Location</Label>
                    <RadioGroup
                        value={pickupOption}
                        onValueChange={setPickupOption}
                        className="flex gap-6"
                    >
                        <div className="flex items-center space-x-2">
                        <RadioGroupItem value="owner" id="pickup-owner" />
                        <Label htmlFor="pickup-owner">At Owner’s Location</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                        <RadioGroupItem value="other" id="pickup-other" />
                        <Label htmlFor="pickup-other">
                            At Other Location{" "}
                            <span className="text-gray-500">
                            Rp {car.pickup_fee.toLocaleString()}
                            </span>
                        </Label>
                        </div>
                    </RadioGroup>
                    <div className="mt-4 border p-4 rounded-lg">
                        <p className="font-semibold">Meeting Point Location</p>
                        <p className="text-sm text-gray-600">{pickup_location.name}</p>
                        <p className="text-sm">{pickup_location.address}</p>
                        <p className="text-sm">{pickup_location.phone}</p>
                    </div>
                    </div>

                    {/* Return */}
                    <div>
                    <Label className="mb-2 block">Return Location</Label>
                    <RadioGroup
                        value={returnOption}
                        onValueChange={setReturnOption}
                        className="flex gap-6"
                    >
                        <div className="flex items-center space-x-2">
                        <RadioGroupItem value="owner" id="return-owner" />
                        <Label htmlFor="return-owner">At Owner’s Location</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                        <RadioGroupItem value="other" id="return-other" />
                        <Label htmlFor="return-other">
                            At Other Location{" "}
                            <span className="text-gray-500">
                            Rp {car.return_fee.toLocaleString()}
                            </span>
                        </Label>
                        </div>
                    </RadioGroup>
                    <div className="mt-4 border p-4 rounded-lg">
                        <p className="font-semibold">Meeting Point Location</p>
                        <p className="text-sm text-gray-600">{return_location.name}</p>
                        <p className="text-sm">{return_location.address}</p>
                        <p className="text-sm">{return_location.phone}</p>
                    </div>
                    </div>
                </CardContent>
            </Card>
        </>
    );
}

export default ConfirmFilter;