import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";

const DeletePopUp = ({ isOpen, onClose, children, car, onDelete }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent
                className="max-w-lg p-6 rounded-lg shadow-lg overflow-y-auto"
                style={{ scrollbarWidth: "none" }}
            >
                <DialogTitle className="flex justify-center  font-bold text-2xl">
                    <h3 className="text-lg font-semibold">Delete Car</h3>
                </DialogTitle>
                <DialogDescription className="flex flex-col justify-between font-medium">
                    <p className="text-lg text-black py-2">
                        Apakah kamu yakin ingin menghapus mobil{" "}
                        <span className="font-semibold">{car?.brand}</span>?
                    </p>
                    <Button
                        onClick={onDelete}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                    >
                        Hapus
                    </Button>
                </DialogDescription>
            </DialogContent>
        </Dialog>
    );
};

export default DeletePopUp;
