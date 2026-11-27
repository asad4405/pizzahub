"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { PIZZA_CATEGORIES, type MenuItemType } from "@/types/CategoryType";
import { updateMenuItemAction } from "@/lib/actions/vendor/menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const EditMenuForm = ({ item }: { item: MenuItemType }) => {
    const router = useRouter();

    const handleFormAction = async (formData: FormData) => {
        const res = await updateMenuItemAction(formData);

        if (res?.error) {
            toast.error(res.error, { position: "bottom-right" });
            return;
        }

        if (res?.success) {
            toast.success(res.message || "Menu item updated successfully!", {
                position: "bottom-right",
            });
            router.push(res.redirectTo || "/dashboard/vendor/menu");
            router.refresh();
        }
    };

    return (
        <form action={handleFormAction} className="space-y-4">
            <input type="hidden" name="id" value={item._id} />
            <input type="hidden" name="vendorId" value={item.vendorId} />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                    <Label htmlFor="itemName">Item Name</Label>
                    <Input id="itemName" name="itemName" defaultValue={item.itemName} required />
                </div>

                <div className="space-y-1.5">
                    <Label htmlFor="category">Category</Label>
                    <select
                        id="category"
                        name="category"
                        defaultValue={item.category}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                        {PIZZA_CATEGORIES.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                    <Label htmlFor="price">Price (BDT)</Label>
                    <Input
                        id="price"
                        name="price"
                        type="number"
                        min="1"
                        defaultValue={item.price}
                        required
                    />
                </div>

                <div className="space-y-1.5">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" name="location" defaultValue={item.location} required />
                </div>
            </div>

            <div className="space-y-1.5">
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input
                    id="imageUrl"
                    name="imageUrl"
                    type="url"
                    defaultValue={item.image || ""}
                    placeholder="https://example.com/pizza.jpg"
                />
            </div>

            <div className="space-y-1.5">
                <Label htmlFor="description">Description</Label>
                <Textarea
                    id="description"
                    name="description"
                    defaultValue={item.description}
                    rows={3}
                    required
                />
            </div>

            <Button type="submit" className="cursor-pointer bg-red-600 text-white hover:bg-red-700">
                Save Changes
            </Button>
        </form>
    );
};

export default EditMenuForm;