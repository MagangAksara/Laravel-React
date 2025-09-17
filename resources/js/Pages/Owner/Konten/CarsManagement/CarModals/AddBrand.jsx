import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { router } from "@inertiajs/react";

const AddBrand = ({ isOpen, onClose }) => {
  const [brandName, setBrandName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!brandName.trim()) return alert('Brand name cannot be empty');

    router.post('/brands', { name: brandName }, {
      onSuccess: () => {
        alert('Brand added successfully');
        setBrandName('');
        onClose();
      },
      onError: (errors) => {
        console.error(errors);
        alert('Failed to add brand');
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogTitle>Add Brand Car</DialogTitle>
        <DialogDescription>
          Please enter the brand car details below.
        </DialogDescription>

        <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="brandName">Name Brand</Label>
            <Input
              id="brandName"
              placeholder="Enter brand name"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" type="button" onClick={onClose} className="border border-red-500 text-red-500 bg-transparent">
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-500 text-white">
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddBrand;
