import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/Components/ui/textarea";
import { Button } from "@/Components/ui/button";

const CancelledModal = ({ open, onClose, order, onConfirm }) => {
    const [reason, setReason] = useState("");

    if (!order) return null;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-lg p-6 rounded-lg shadow-lg">

                <DialogDescription className="flex flex-row justify-between font-medium p-6">
                    <span className=" text-gray-500 mr-2">Booking ID</span>
                    <span>{order.booking_id}</span>
                </DialogDescription>
                <DialogTitle className="flex flex-col items-center font-bold text-2xl">
                    {/* <div className="flex flex-col items-center font-bold text-2xl"> */}
                    <img src="/mini-icon/x-moji.png" alt="x" className="w-15" />
                    <span>Are you sure you want to cancel this</span>
                    <span>order?</span>
                    {/* </div> */}
                </DialogTitle>

                <div className="mt-2 text-sm space-y-1">
                    <div className="flex justify-center text-gray-400 px-4 py-2 rounded mb-4 text-lg">
                        Your payment will not be refunded once cancelled
                    </div>

                    {/* give reason section */}
                    <div className="flex flex-col">
                        <div className="py-3">
                            <span className="px-4 py-2 text-gray-400 font-medium">Give your reason</span>
                        </div>
                        <div className="flex flex-row px-4">
                            <Textarea
                                type="text"
                                className="w-full border rounded p-2"
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                placeholder="Type your reason here..."
                            />
                        </div>
                        <div className="flex justify-end w-full px-4">
                            <Button
                                className="mt-2 w-[25%] border border-gray-600 text-white font-medium"
                                variant="destructive"
                                onClick={() => onConfirm(reason)}
                            >
                                Yes
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog >
    );
};

export default CancelledModal;
