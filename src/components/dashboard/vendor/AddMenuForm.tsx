"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createMenuItemAction } from "@/lib/actions/vendor/menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PIZZA_CATEGORIES } from "@/types/CategoryType";

const AddMenuForm = ({ vendorId }: { vendorId: string }) => {
    const router = useRouter();

    const handleFormAction = async (formData: FormData) => {
        const res = await createMenuItemAction(formData);

        if (res?.error) {
            toast.error(res.error, { position: "bottom-right" });
            return;
        }

        if (res?.success) {
            toast.success(res.message || "Menu item added successfully!", {
                position: "bottom-right",
            });
            router.push(res.redirectTo || "/dashboard/vendor/menu");
            router.refresh();
        }
    };

    return (
        <form action={handleFormAction} className="space-y-4">
            <input type="hidden" name="vendorId" value={vendorId} />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                    <Label htmlFor="itemName">Item Name</Label>
                    <Input id="itemName" name="itemName" placeholder="Margherita Classic" required />
                </div>

                <div className="space-y-1.5">
                    <Label htmlFor="category">Category</Label>
                    <select
                        id="category"
                        name="category"
                        required
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                        {PIZZA_CATEGORIES.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                    <Label htmlFor="price">Price (BDT)</Label>
                    <Input id="price" name="price" type="number" min="1" placeholder="600" required />
                </div>

                <div className="space-y-1.5">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" name="location" placeholder="Mirpur 2, Dhaka" required />
                </div>
            </div>

            <div className="space-y-1.5">
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input
                    id="imageUrl"
                    name="imageUrl"
                    type="url"
                    placeholder="https://example.com/pizza.jpg"
                    required
                />
            </div>

            <div className="space-y-1.5">
                <Label htmlFor="description">Description</Label>
                <Textarea
                    id="description"
                    name="description"
                    placeholder="Fresh tomato sauce, mozzarella, and basil..."
                    rows={3}
                    required
                />
            </div>

            <Button type="submit" className="w-full cursor-pointer bg-red-600 text-white hover:bg-red-700">
                Add Menu Item
            </Button>
        </form>
    );
};

export default AddMenuForm;