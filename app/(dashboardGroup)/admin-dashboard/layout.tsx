import AdminSidebar from "./_components/AdminSidebar";

export default function AdminDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="mx-auto max-w-7xl px-4 py-8">
            <div className="flex flex-col md:flex-row gap-8 items-start">
                <AdminSidebar />
                <main className="flex-1 w-full min-w-0">{children}</main>
            </div>
        </div>
    );
}