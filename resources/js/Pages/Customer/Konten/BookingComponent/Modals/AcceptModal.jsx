import React from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

const AcceptModal = ({ open, onClose, onConfirm, onPending }) => {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Konfirmasi Pembayaran</DialogTitle>
                </DialogHeader>
                <DialogDescription></DialogDescription>
                <p className="text-sm text-gray-600">
                    Apakah kamu yakin ingin melanjutkan ke proses pembayaran?
                </p>
                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={onClose}
                        className="w-full sm:w-auto"
                    >
                        Batal
                    </Button>
                    {/* Pending → tidak redirect ke Xendit */}
                    <Button
                        onClick={onPending}
                        className="w-full sm:w-auto bg-gray-500 hover:bg-gray-600"
                    >
                        Pending
                    </Button>
                    {/* Pay Now → langsung ke Xendit */}
                    <Button
                        onClick={onConfirm}
                        className="w-full sm:w-auto bg-[#1e6fa1] hover:bg-[#195b82]"
                    >
                        Pay Now
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default AcceptModal
