import { Card, CardContent } from "@/components/ui/card";
import { Settings2, Sparkles } from "lucide-react";

export default function SettingsPage() {
    return (
        <section className="mx-auto max-w-5xl space-y-7 py-2 sm:py-5">
            <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-emerald-100/10 bg-emerald-200/[0.07] text-emerald-100"><Settings2 className="h-5 w-5" /></div>
                <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-200/75">Workspace</p>
                    <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">Settings</h1>
                    <p className="mt-2 text-sm leading-6 text-slate-400">Manage your PeerForge preferences.</p>
                </div>
            </div>
            <Card className="relative overflow-hidden border-0 bg-[radial-gradient(ellipse_at_95%_0%,rgba(55,211,157,0.10),transparent_38%),#0e171c] text-white ring-1 ring-inset ring-white/[0.08]">
                <CardContent className="flex items-start gap-4 p-6 sm:p-7">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] text-emerald-100"><Sparkles className="h-5 w-5" /></div>
                    <div>
                        <h2 className="font-semibold">Your workspace, your way</h2>
                        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">Account preferences will appear here as they become available. You can update your profile details from My Profile.</p>
                    </div>
                </CardContent>
            </Card>
        </section>
    );
}
