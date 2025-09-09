import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/Components/ui/textarea";
import { Button } from "@/Components/ui/button";

const CancelledModal = ({ open, onClose, order }) => {

    if (!order) return null;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-lg p-6 rounded-lg shadow-lg">

                <DialogDescription className="flex flex-row justify-between font-medium p-6">
                    <span className=" text-gray-500 mr-2">Booking ID</span>
                    <span>{order.booking_id}</span>
                </DialogDescription>
                <DialogTitle className="flex flex-col justify-center items-center font-bold text-2xl px-8 pb-10">
                    {/* <img src="/mini-icon/x-moji.png" alt="x" className="w-15" /> */}
                    <span>This Function Is Not Yet Available</span>
                </DialogTitle>

                {/* <div className="mt-2 text-sm space-y-1">
                    <div className="flex justify-center text-gray-400 px-4 py-2 rounded mb-4 text-lg">
                        Your payment will not be refunded once cancelled
                    </div> */}

                {/* give reason section */}
                {/* <div className="flex flex-col">
                        <div className="py-3">
                            <span className="px-4 py-2 text-gray-400 font-medium">Give your reason</span>
                        </div>
                        <div className="flex flex-row px-4">
                            <Textarea
                                type="text"
                                className="w-full border rounded p-2"
                            />
                        </div>
                        <div className="flex justify-end w-full px-4">
                            <Button
                                className="mt-2 w-[25%] border border-gray-600 text-gray-600"
                                variant="outline"
                            >
                                Yes
                            </Button>
                        </div>
                    </div>
                </div> */}
            </DialogContent>
        </Dialog >
    );
};

export default CancelledModal;
