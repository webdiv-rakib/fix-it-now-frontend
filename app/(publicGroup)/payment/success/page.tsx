import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { confirmPaymentAction } from "../../_actions/confirmPayment";


export default async function PaymentSuccessPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const resolvedParams = await searchParams;

    const sessionId =
        (resolvedParams.session_id as string) ||
        (resolvedParams.sessionId as string);

    const bookingId = resolvedParams.bookingId as string | undefined;

    // Attempt confirmation if sessionId is present
    if (sessionId) {
        await confirmPaymentAction(sessionId);
    }

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4">
            <Card className="max-w-md w-full border-border/70 bg-card/60 backdrop-blur text-center p-6 shadow-xl">
                <CardContent className="space-y-4 pt-4">
                    <div className="mx-auto h-14 w-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                        <CheckCircle2 className="h-8 w-8 text-emerald-400" />
                    </div>

                    <h1 className="text-2xl font-black text-foreground">Payment Received!</h1>

                    <p className="text-xs text-muted-foreground leading-relaxed">
                        Your booking {bookingId ? `(#${bookingId.slice(0, 8)})` : ""} is confirmed and in progress. The assigned technician has been notified.
                    </p>

                    <div className="pt-4">
                        <Link href="/dashboard">
                            <Button className="w-full gap-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs h-10 shadow-md shadow-amber-400/20">
                                <span>View in Dashboard</span>
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}