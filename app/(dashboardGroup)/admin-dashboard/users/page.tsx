/* eslint-disable @typescript-eslint/no-explicit-any */
// export const dynamic = "force-dynamic";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getAdminUsersAction } from "../../_actions/adminActions";
import UserStatusToggle from "../_components/UserStatusToggle";


export default async function AdminUsersPage() {
    const res = await getAdminUsersAction();
    const users = Array.isArray(res?.data) ? res.data : [];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-black text-foreground">User Management</h1>
                    <p className="text-xs text-muted-foreground mt-1">
                        Monitor all registered accounts and enforce active or banned restrictions.
                    </p>
                </div>
                <Badge variant="outline" className="border-border/70 text-xs">
                    Total: {users.length}
                </Badge>
            </div>

            <Card className="border-border/70 bg-card/60 backdrop-blur overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                        <thead className="bg-muted/40 border-b border-border/60 text-muted-foreground font-semibold">
                            <tr>
                                <th className="py-3 px-4">User</th>
                                <th className="py-3 px-4">Role</th>
                                <th className="py-3 px-4">Phone</th>
                                <th className="py-3 px-4">Current Status</th>
                                <th className="py-3 px-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border/40 text-foreground">
                            {users.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="py-8 text-center text-muted-foreground">
                                        No users found.
                                    </td>
                                </tr>
                            ) : (
                                users.map((u: any) => {
                                    const id = u.userId || u.id;
                                    const isBanned = (u.status || "").toUpperCase() === "BANNED";

                                    return (
                                        <tr key={id} className="hover:bg-muted/20 transition-colors">
                                            <td className="py-3 px-4">
                                                <div className="font-bold text-foreground">{u.name}</div>
                                                <div className="text-[11px] text-muted-foreground">{u.email}</div>
                                            </td>
                                            <td className="py-3 px-4">
                                                <Badge variant="outline" className="text-[10px] font-mono">
                                                    {u.role}
                                                </Badge>
                                            </td>
                                            <td className="py-3 px-4 text-muted-foreground">{u.phone || "—"}</td>
                                            <td className="py-3 px-4">
                                                <Badge
                                                    className={`text-[10px] font-bold ${isBanned
                                                            ? "bg-rose-500/10 text-rose-400 border border-rose-500/30"
                                                            : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                                                        }`}
                                                >
                                                    {u.status || "ACTIVE"}
                                                </Badge>
                                            </td>
                                            <td className="py-3 px-4 text-right">
                                                <UserStatusToggle userId={id} currentStatus={u.status || "ACTIVE"} />
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}