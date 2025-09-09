import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/Components/ui/button";

const FinishNowModal = ({ open, onClose, order, onConfirm }) => {

    if (!order) return null;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-lg p-6 rounded-lg shadow-lg">

                <DialogDescription className="flex flex-row justify-between font-medium">
                    <span className=" text-gray-500 mr-2">Booking ID</span>
                    <span>{order.booking_id}</span>
                </DialogDescription>
                <DialogTitle className="flex flex-col justify-center items-center font-bold text-2xl">
                    <img src="/mini-icon/car-clock.png" alt="x" className="w-15" />
                    <span>Are you sure want to end the rental now?</span>
                </DialogTitle>

                <div className="mt-2 text-sm space-y-1">

                    <div className="flex flex-col">
                        <div className="flex justify-end w-full px-4">
                            <Button
                                className="mt-2 w-[25%] bg-blue-500 hover:bg-blue-700 text-white"
                                // variant="outline"
                                onClick={onConfirm}
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

export default FinishNowModal;
