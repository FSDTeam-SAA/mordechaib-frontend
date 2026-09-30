"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { CalendarBoard } from "./_components/CalendarBoard";
import { CalendarDashboardSkeleton } from "./_components/CalendarDashboardSkeleton";
import { CalendarSidebar } from "./_components/CalendarSidebar";
import { CalendarStats } from "./_components/CalendarStats";
import { ConflictIntegration } from "./_components/ConflictIntegration";
import { MeetingsTable } from "./_components/MeetingsTable";
import { PriorityAutomation } from "./_components/PriorityAutomation";
import type { CalendarDashboard, CalendarFilters } from "./_components/types";

type DashboardResponse = { success?: boolean; data?: CalendarDashboard; message?: string | string[] };

function monthRange(date: Date) {
  return {
    from: new Date(Date.UTC(date.getFullYear(), date.getMonth(), 1)).toISOString(),
    to: new Date(Date.UTC(date.getFullYear(), date.getMonth() + 1, 1)).toISOString(),
  };
}

function messageOf(result: DashboardResponse) {
  return Array.isArray(result.message) ? result.message.join(", ") : result.message || "Unable to load calendar dashboard.";
}

export default function CalendarPage() {
  const { data: session, status } = useSession();
  const accessToken = session?.user.accessToken;
  const [filters, setFilters] = useState<CalendarFilters>(() => ({ date: new Date(), timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC", bufferMinutes: 15, upcomingLimit: 8, conflictLimit: 20 }));
  const range = monthRange(filters.date);

  const dashboardQuery = useQuery({
    queryKey: ["calendar-dashboard", range.from, range.to, filters.timezone, filters.bufferMinutes, filters.upcomingLimit, filters.conflictLimit],
    enabled: status === "authenticated" && Boolean(accessToken),
    queryFn: async () => {
      if (!accessToken) throw new Error("Your session is missing. Please sign in again.");
      const params = new URLSearchParams({ from: range.from, to: range.to, timezone: filters.timezone, bufferMinutes: String(filters.bufferMinutes), upcomingLimit: String(filters.upcomingLimit), conflictLimit: String(filters.conflictLimit) });
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/calendar/dashboard?${params}`, { headers: { Authorization: `Bearer ${accessToken}` } });
      const result = (await response.json().catch(() => ({}))) as DashboardResponse;
      if (!response.ok || !result.success || !result.data) throw new Error(messageOf(result));
      return result.data;
    },
  });

  if (status === "loading" || dashboardQuery.isPending) return <div className="p-4 pb-10"><CalendarDashboardSkeleton /></div>;

  if (dashboardQuery.isError || !dashboardQuery.data) return <div className="p-4 pb-10"><div className="flex min-h-[360px] flex-col items-center justify-center rounded-[12px] bg-white p-6 text-center"><AlertCircle className="size-10 text-[#EF4444]" /><h2 className="mt-3 text-lg font-semibold">Calendar could not be loaded</h2><p className="mt-1 max-w-md text-sm text-[#8B93B8]">{dashboardQuery.error instanceof Error ? dashboardQuery.error.message : "Please try again."}</p><button type="button" onClick={() => void dashboardQuery.refetch()} className="mt-5 flex h-10 items-center gap-2 rounded-[8px] bg-[#5B7FF0] px-5 text-sm text-white"><RefreshCw className="size-4" />Try again</button></div></div>;

  const dashboard = dashboardQuery.data;
  return <div className="space-y-4 p-4 pb-10">
    <CalendarStats summary={dashboard.summary} />
    <section className="grid grid-cols-12 items-start gap-4"><div className="col-span-12 xl:col-span-9"><CalendarBoard meetings={dashboard.items} filters={filters} onFiltersChange={setFilters} /></div><div className="col-span-12 xl:col-span-3"><CalendarSidebar meetings={dashboard.items} upcoming={dashboard.upcoming} selectedDate={filters.date} timezone={dashboard.timezone} onRefresh={() => void dashboardQuery.refetch()} isRefreshing={dashboardQuery.isFetching} /></div></section>
    <ConflictIntegration conflicts={dashboard.conflicts} taskAndCalls={dashboard.taskAndCalls} timezone={dashboard.timezone} />
    <PriorityAutomation priority={dashboard.priority} automation={dashboard.automation} />
    <MeetingsTable meetings={dashboard.items} timezone={dashboard.timezone} />
  </div>;
}
