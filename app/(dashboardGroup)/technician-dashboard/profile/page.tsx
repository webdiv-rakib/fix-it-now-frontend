import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import TechnicianProfileAndServiceForms from "../_components/TechnicianProfileAndServiceForms";
import { getCategoriesForService, getTechnicianProfileData } from "../_actions/profileAndServiceAction";

export default async function TechnicianProfilePage() {
    const [profileRes, categoriesRes] = await Promise.all([
        getTechnicianProfileData(),
        getCategoriesForService(),
    ]);

    const profileData = profileRes?.data || null;
    const categories = Array.isArray(categoriesRes?.data) ? categoriesRes.data : [];

    return (
        <div className="mx-auto max-w-4xl px-4 py-8 space-y-6">
            {/* Back to Bookings link */}
            <div>
                <Link
                    href="/technician-dashboard"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-amber-400 transition-colors"
                >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    <span>Back to Assigned Bookings</span>
                </Link>
            </div>

            <TechnicianProfileAndServiceForms
                initialProfile={profileData}
                categories={categories}
            />
        </div>
    );
}