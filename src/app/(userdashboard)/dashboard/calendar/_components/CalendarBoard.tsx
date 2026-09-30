"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight, Play, Plus, Video } from "lucide-react";
import { cn } from "@/lib/utils";
import { NewMeetingModal } from "./NewMeetingModal";
import type { CalendarFilters, CalendarMeeting } from "./types";

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const years = Array.from({ length: 21 }, (_, index) => 2020 + index);
const eventColor: Record<string, string> = { SCHEDULED: "border-[#5B9CD5] bg-[#5B9CD5]/10", FAILED: "border-[#D24FC7] bg-[#D24FC7]/10", COMPLETED: "border-[#10B981] bg-[#10B981]/10", CANCELLED: "border-[#F59E0B] bg-[#F59E0B]/10" };

function sameDay(a: Date, b: Date) { return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate(); }
function monthCells(date: Date) { const first = new Date(date.getFullYear(), date.getMonth(), 1); const start = new Date(first); start.setDate(1 - first.getDay()); return Array.from({ length: 42 }, (_, index) => new Date(start.getFullYear(), start.getMonth(), start.getDate() + index)); }
function weekCells(date: Date) { const start = new Date(date); start.setDate(date.getDate() - date.getDay()); return Array.from({ length: 7 }, (_, index) => new Date(start.getFullYear(), start.getMonth(), start.getDate() + index)); }
function hourLabel(hour: number) { return new Date(2000, 0, 1, hour).toLocaleTimeString("en-US", { hour: "numeric" }); }

function CalendarEventCard({ meeting, startsAt, compact }: { meeting: CalendarMeeting; startsAt: Date; compact: boolean }) {
  const completed = meeting.status === "COMPLETED";
  const canStart = Boolean(meeting.joinUrl) && !completed;
  const openCalendarEvent = () => meeting.eventUrl && window.open(meeting.eventUrl, "_blank", "noopener,noreferrer");

  return <div role={meeting.eventUrl ? "link" : undefined} tabIndex={meeting.eventUrl ? 0 : undefined} onClick={openCalendarEvent} onKeyDown={(event) => { if (meeting.eventUrl && (event.key === "Enter" || event.key === " ")) { event.preventDefault(); openCalendarEvent(); } }} title={`${meeting.title} · ${startsAt.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}`} className={cn("group relative min-w-0 overflow-hidden rounded-r-[5px] border-l-[3px] px-1.5 py-1 text-[9px] shadow-[0_1px_3px_rgba(14,18,36,0.08)] transition-shadow hover:z-20 hover:shadow-md", compact ? "h-[25px]" : "h-[52px]", meeting.eventUrl && "cursor-pointer", eventColor[meeting.status] || eventColor.SCHEDULED)}>
    <p className={cn("flex items-center gap-1 truncate font-semibold", canStart && "group-hover:opacity-20")}><span>{startsAt.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}</span><Video className="size-2.5 shrink-0" />{compact && <span className="truncate font-normal">{meeting.title}</span>}</p>
    {!compact && <p className={cn("mt-1 truncate", completed ? "pr-[66px]" : "pr-7", canStart && "group-hover:opacity-20")}>{meeting.title}</p>}
    {completed ? <span className={cn("absolute right-1 flex items-center gap-0.5 rounded-full bg-[#10B981] font-semibold text-white", compact ? "top-1 px-1 py-0.5 text-[7px]" : "bottom-1 px-1.5 py-0.5 text-[8px]")}><CheckCircle2 className="size-2.5" />{!compact && "Completed"}</span> : canStart ? <button type="button" onClick={(event) => { event.stopPropagation(); window.open(meeting.joinUrl, "_blank", "noopener,noreferrer"); }} className="absolute right-1 top-1/2 hidden -translate-y-1/2 items-center gap-1 rounded-[6px] bg-gradient-to-r from-[#5B7FF0] to-[#745BEE] px-2 py-1 text-[9px] font-semibold text-white shadow-[0_4px_12px_rgba(91,127,240,0.45)] ring-1 ring-white/50 transition-all hover:scale-105 group-hover:flex group-focus-within:flex"><Play className="size-2.5 fill-current" />Start</button> : null}
  </div>;
}

export function CalendarBoard({ meetings, filters, onFiltersChange }: { meetings: CalendarMeeting[]; filters: CalendarFilters; onFiltersChange: (value: CalendarFilters) => void }) {
  const [view, setView] = useState("Week");
  const selectedDate = filters.date;
  const setSelectedDate = (date: Date) => onFiltersChange({ ...filters, date });
  const miniDays = useMemo(() => monthCells(selectedDate), [selectedDate]);
  const week = useMemo(() => weekCells(selectedDate), [selectedDate]);

  const movePeriod = (direction: number) => { const next = new Date(selectedDate); if (view === "Day") next.setDate(next.getDate() + direction); else if (view === "Week") next.setDate(next.getDate() + direction * 7); else if (view === "Month") next.setMonth(next.getMonth() + direction); else next.setFullYear(next.getFullYear() + direction); setSelectedDate(next); };
  const changeMonth = (month: number) => setSelectedDate(new Date(selectedDate.getFullYear(), month, Math.min(selectedDate.getDate(), 28)));
  const changeYear = (year: number) => setSelectedDate(new Date(year, selectedDate.getMonth(), Math.min(selectedDate.getDate(), 28)));
  const calendarEvents = meetings.map((meeting) => { const startsAt = new Date(meeting.startsAt); return { meeting, startsAt, col: week.findIndex((day) => sameDay(day, startsAt)) }; }).filter((event) => event.col >= 0);
  const eventHours = calendarEvents.map((event) => event.startsAt.getHours());
  const firstHour = eventHours.length ? Math.min(9, ...eventHours) : 9;
  const lastHour = eventHours.length ? Math.max(17, ...eventHours) : 17;
  const displayedHours = Array.from({ length: lastHour - firstHour + 1 }, (_, index) => firstHour + index);

  return <section className="w-full min-w-0 overflow-hidden rounded-[8px] bg-white p-4">
    <header className="flex flex-col gap-3 border-b border-[#E4EAF8] pb-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-wrap items-center gap-2"><button type="button" onClick={() => movePeriod(-1)} aria-label="Previous period" className="flex size-8 items-center justify-center rounded-[8px] bg-[#F5F7FF]"><ChevronLeft className="size-4" /></button><button type="button" onClick={() => setSelectedDate(new Date())} className="rounded-[8px] bg-[#F5F7FF] px-2 py-1 text-xs">Today</button><button type="button" onClick={() => movePeriod(1)} aria-label="Next period" className="flex size-8 items-center justify-center rounded-[8px] bg-[#F5F7FF]"><ChevronRight className="size-4" /></button><select aria-label="Month" value={selectedDate.getMonth()} onChange={(event) => changeMonth(Number(event.target.value))} className="ml-2 rounded-[8px] bg-[#F5F7FF] px-2 py-1.5 text-sm outline-none focus:ring-1 focus:ring-[#5B7FF0]">{months.map((month,index) => <option key={month} value={index}>{month}</option>)}</select><select aria-label="Year" value={selectedDate.getFullYear()} onChange={(event) => changeYear(Number(event.target.value))} className="rounded-[8px] bg-[#F5F7FF] px-2 py-1.5 text-sm outline-none focus:ring-1 focus:ring-[#5B7FF0]">{years.map(year => <option key={year}>{year}</option>)}</select></div>
      <div className="flex flex-wrap items-center gap-2"><div className="flex rounded-[8px] bg-[#F5F7FF] p-1">{["Day","Week","Month","Year"].map(item => <button type="button" key={item} onClick={() => setView(item)} className={cn("rounded-[6px] px-2 py-1 text-sm", view === item ? "bg-[#5B7FF0] text-white" : "text-[#8B93B8]")}>{item}</button>)}</div><NewMeetingModal><button className="flex h-11 items-center gap-2 rounded-[8px] bg-[#5B7FF0] px-6 text-sm text-white"><Plus className="size-5" />New Meeting</button></NewMeetingModal></div>
    </header>
    <div className="mt-4 grid gap-4 lg:grid-cols-[234px_minmax(550px,1fr)]">
      <aside className="border-b border-[#E4EAF8] pb-4 lg:border-b-0 lg:border-r lg:pr-4"><div className="flex items-center justify-between text-sm font-medium"><button type="button" onClick={() => movePeriod(-1)}><ChevronLeft className="size-4" /></button><span>{months[selectedDate.getMonth()]} {selectedDate.getFullYear()}</span><button type="button" onClick={() => movePeriod(1)}><ChevronRight className="size-4" /></button></div><div className="mt-4 grid grid-cols-7 text-center text-[10px] text-[#8B93B8]">{["S","M","T","W","T","F","S"].map((day,index) => <span key={`${day}-${index}`}>{day}</span>)}</div><div className="mt-2 grid grid-cols-7 gap-y-2 text-center text-xs">{miniDays.map(day => <button type="button" key={day.toISOString()} onClick={() => setSelectedDate(day)} className={cn("mx-auto flex size-6 items-center justify-center rounded-[6px]", sameDay(day,selectedDate) ? "bg-[#5B7FF0] text-white" : day.getMonth() !== selectedDate.getMonth() ? "text-[#C6CCE2]" : "text-[#0E1224]")}>{day.getDate()}</button>)}</div><div className="mt-6 space-y-3 border-t border-[#E4EAF8] pt-4 text-sm">{[["#5B9CD5","Scheduled"],["#D24FC7","Failed"],["#10B981","Completed"]].map(([color,label]) => <p key={label} className="flex items-center gap-2"><span className="size-2 rounded-[4px]" style={{backgroundColor:color}} />{label}</p>)}</div></aside>
      <div className="min-w-0 overflow-x-auto"><div className="min-w-[550px]"><div className="ml-12 grid grid-cols-7 border-b border-[#E4EAF8] pb-3 text-center text-xs text-[#8B93B8]">{week.map(day => <button type="button" onClick={() => setSelectedDate(day)} key={day.toISOString()} className={sameDay(day,selectedDate) ? "font-medium text-[#5B7FF0]" : ""}><span className="block text-[10px] font-medium text-[#0E1224]">{day.toLocaleDateString("en-US",{weekday:"short"}).toUpperCase()}</span>{months[day.getMonth()].slice(0,3)} {day.getDate()}</button>)}</div><div className="mt-2 grid grid-cols-[48px_repeat(7,minmax(68px,1fr))]">{displayedHours.map((hour) => <div key={hour} className="contents"><span className="min-h-[64px] border-b border-r border-[#E4EAF8] pr-2 pt-1 text-[10px] text-[#8B93B8]">{hourLabel(hour)}</span>{week.map((day, dayIndex) => { const cellEvents = calendarEvents.filter((event) => event.col === dayIndex && event.startsAt.getHours() === hour).sort((a,b) => a.startsAt.getTime() - b.startsAt.getTime()); return <div key={`${hour}-${day.toISOString()}`} className={cn("border-b border-r border-[#E4EAF8] p-1", cellEvents.length > 2 ? "min-h-[88px]" : "min-h-[64px]")}><div className="space-y-1">{cellEvents.map(({ meeting, startsAt }) => <CalendarEventCard key={meeting.id} meeting={meeting} startsAt={startsAt} compact={cellEvents.length > 1} />)}</div></div>; })}</div>)}</div></div></div>
    </div>
  </section>;
}
