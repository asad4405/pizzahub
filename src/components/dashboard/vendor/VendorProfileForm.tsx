"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
    Store,
    User,
    Mail,
    Phone,
    MapPin,
    FileText,
    Image as ImageIcon,
    Save,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateVendorProfileAction } from "@/lib/actions/vendor/profile";

const VendorProfileForm = ({
    profile,
}: {
    profile: {
        id?: string;
        name?: string;
        email?: string;
        image?: string;
        businessName?: string;
        vendorName?: string;
        phone?: string;
        address?: string;
        description?: string;
    };
}) => {
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const payload = {
            userId: profile.id,
            email: profile.email,
            name: String(formData.get("name") || "").trim(),
            businessName: String(formData.get("businessName") || "").trim(),
            phone: String(formData.get("phone") || "").trim(),
            address: String(formData.get("address") || "").trim(),
            description: String(formData.get("description") || "").trim(),
            image: String(formData.get("image") || "").trim(),
        };

        const result = await updateVendorProfileAction(payload);

        if (!result.success) {
            toast.error(result.message || "Could not update profile.");
            return;
        }

        toast.success(result.message || "Profile updated!");
        router.refresh();
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full space-y-4 rounded-2xl border border-orange-200/90 bg-white p-6 shadow-xs"
        >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                    <label
                        htmlFor="name"
                        className="mb-1.5 flex items-center gap-1.5 text-xs font-bold text-stone-700"
                    >
                        <User className="h-3.5 w-3.5 text-red-600" />
                        Owner Name
                    </label>
                    <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        defaultValue={profile.name || ""}
                        placeholder="Your full name"
                        className="h-10 rounded-xl border-orange-200 bg-white text-sm text-stone-900"
                    />
                </div>

                <div>
                    <label
                        htmlFor="businessName"
                        className="mb-1.5 flex items-center gap-1.5 text-xs font-bold text-stone-700"
                    >
                        <Store className="h-3.5 w-3.5 text-red-600" />
                        Kitchen / Business Name
                    </label>
                    <Input
                        id="businessName"
                        name="businessName"
                        type="text"
                        defaultValue={profile.businessName || profile.vendorName || ""}
                        placeholder="e.g., PizzaHub Kitchen"
                        className="h-10 rounded-xl border-orange-200 bg-white text-sm text-stone-900"
                    />
                </div>

                <div>
                    <label
                        htmlFor="email"
                        className="mb-1.5 flex items-center gap-1.5 text-xs font-bold text-stone-700"
                    >
                        <Mail className="h-3.5 w-3.5 text-red-600" />
                        Email Address
                    </label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        disabled
                        defaultValue={profile.email || ""}
                        className="h-10 rounded-xl border-orange-200 bg-stone-50 text-sm text-stone-500"
                    />
                </div>

                <div>
                    <label
                        htmlFor="phone"
                        className="mb-1.5 flex items-center gap-1.5 text-xs font-bold text-stone-700"
                    >
                        <Phone className="h-3.5 w-3.5 text-red-600" />
                        Phone Number
                    </label>
                    <Input
                        id="phone"
                        name="phone"
                        type="text"
                        defaultValue={profile.phone || ""}
                        placeholder="01XXXXXXXXX"
                        className="h-10 rounded-xl border-orange-200 bg-white text-sm text-stone-900"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                    <label
                        htmlFor="address"
                        className="mb-1.5 flex items-center gap-1.5 text-xs font-bold text-stone-700"
                    >
                        <MapPin className="h-3.5 w-3.5 text-red-600" />
                        Kitchen / Pickup Address
                    </label>
                    <Input
                        id="address"
                        name="address"
                        type="text"
                        defaultValue={profile.address || ""}
                        placeholder="Road, area, city..."
                        className="h-10 rounded-xl border-orange-200 bg-white text-sm text-stone-900"
                    />
                </div>

                <div>
                    <label
                        htmlFor="image"
                        className="mb-1.5 flex items-center gap-1.5 text-xs font-bold text-stone-700"
                    >
                        <ImageIcon className="h-3.5 w-3.5 text-red-600" />
                        Profile / Logo Image URL
                    </label>
                    <Input
                        id="image"
                        name="image"
                        type="text"
                        defaultValue={profile.image || ""}
                        placeholder="https://i.ibb.co/..."
                        className="h-10 rounded-xl border-orange-200 bg-white text-sm text-stone-900"
                    />
                </div>
            </div>

            <div>
                <label
                    htmlFor="description"
                    className="mb-1.5 flex items-center gap-1.5 text-xs font-bold text-stone-700"
                >
                    <FileText className="h-3.5 w-3.5 text-red-600" />
                    About Kitchen / Bio
                </label>
                <textarea
                    id="description"
                    name="description"
                    rows={3}
                    defaultValue={profile.description || ""}
                    placeholder="Short description about your pizza kitchen or specialties..."
                    className="w-full rounded-xl border border-orange-200 bg-white px-3 py-2 text-sm text-stone-900 outline-none focus:border-red-500"
                />
            </div>

            <div className="flex justify-end pt-2">
                <Button
                    type="submit"
                    className="h-10 rounded-xl bg-red-600 px-5 text-sm font-bold text-white hover:bg-red-700"
                >
                    <Save className="mr-1.5 h-4 w-4" />
                    Save Changes
                </Button>
            </div>
        </form>
    );
};

export default VendorProfileForm;