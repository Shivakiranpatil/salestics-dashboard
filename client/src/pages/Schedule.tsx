import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus, Clock, MapPin, X, Save, Users } from "lucide-react";

interface CalendarEvent {
  id: number;
  title: string;
  date: number;
  month: number;
  year: number;
  time: string;
  duration: string;
  location: string;
  attendees: number;
  color: string;
  bg: string;
}

const CURRENT_YEAR = 2028;
const CURRENT_MONTH = 3; // April (0-indexed)

const EVENTS: CalendarEvent[] = [
  { id: 1,  title: "Spring Product Launch Meeting", date: 1,  month: 3, year: 2028, time: "09:00 AM", duration: "1h 30m", location: "Conference Room A", attendees: 8,  color: "#ff683a", bg: "#fff0eb" },
  { id: 2,  title: "Marketing Strategy Review",     date: 3,  month: 3, year: 2028, time: "02:00 PM", duration: "1h",     location: "Zoom Call",          attendees: 5,  color: "#7c3aed", bg: "#f3f0fe" },
  { id: 3,  title: "Q2 Sales Briefing",             date: 7,  month: 3, year: 2028, time: "10:00 AM", duration: "2h",     location: "Board Room",         attendees: 12, color: "#0ea5e9", bg: "#e8f5ff" },
  { id: 4,  title: "Influencer Campaign Kickoff",   date: 10, month: 3, year: 2028, time: "11:00 AM", duration: "45m",    location: "Studio B",           attendees: 6,  color: "#10b981", bg: "#e8faf4" },
  { id: 5,  title: "Team Weekly Standup",           date: 14, month: 3, year: 2028, time: "09:30 AM", duration: "30m",    location: "Slack Huddle",       attendees: 10, color: "#f59e0b", bg: "#fff8e8" },
  { id: 6,  title: "New Arrivals Photo Shoot",      date: 15, month: 3, year: 2028, time: "08:00 AM", duration: "4h",     location: "Studio A",           attendees: 4,  color: "#ff683a", bg: "#fff0eb" },
  { id: 7,  title: "Flash Sale Planning",           date: 18, month: 3, year: 2028, time: "03:00 PM", duration: "1h",     location: "Room 204",           attendees: 7,  color: "#7c3aed", bg: "#f3f0fe" },
  { id: 8,  title: "Inventory Audit",               date: 20, month: 3, year: 2028, time: "10:00 AM", duration: "3h",     location: "Warehouse",          attendees: 3,  color: "#0ea5e9", bg: "#e8f5ff" },
  { id: 9,  title: "Customer Feedback Session",     date: 22, month: 3, year: 2028, time: "01:00 PM", duration: "2h",     location: "Meeting Room 3",     attendees: 9,  color: "#10b981", bg: "#e8faf4" },
  { id: 10, title: "End of Month Review",           date: 30, month: 3, year: 2028, time: "04:00 PM", duration: "1h 30m", location: "Executive Suite",    attendees: 6,  color: "#ef4444", bg: "#ffe5e5" },
  { id: 11, title: "Summer Launch Prep",            date: 5,  month: 4, year: 2028, time: "10:00 AM", duration: "2h",     location: "Conference Room B",  attendees: 8,  color: "#ff683a", bg: "#fff0eb" },
  { id: 12, title: "Social Media Strategy",         date: 12, month: 4, year: 2028, time: "02:30 PM", duration: "1h",     location: "Creative Studio",    attendees: 5,  color: "#7c3aed", bg: "#f3f0fe" },
];

const MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAY_NAMES = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

function getDaysInMonth(month: number, year: number) { return new Date(year, month + 1, 0).getDate(); }
function getFirstDayOfMonth(month: number, year: number) { return new Date(year, month, 1).getDay(); }

function AddEventModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
      <div className="w-full max-w-[460px] bg-white rounded-[12px] shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#f0f0f0]">
          <div><h2 className="text-[16px] font-bold text-[#2a2b2a]">Add Event</h2><p className="text-[12px] text-[#8c8d8c] mt-0.5">Schedule a new event</p></div>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-[#f3f3f3]"><X size={16} className="text-[#8c8d8c]" /></button>
        </div>
        <div className="flex flex-col gap-4 p-6">
          <label className="flex flex-col gap-1.5">
            <span className="text-[12px] font-medium text-[#2a2b2a]">Event Title <span className="text-[#ff683a]">*</span></span>
            <input placeholder="e.g. Product Launch Meeting" className="rounded-[7px] border border-[#e8e8e8] px-3 py-2.5 text-[13px] outline-none focus:border-[#ff683a]" />
          </label>
          <div className="flex gap-3">
            <label className="flex flex-1 flex-col gap-1.5">
              <span className="text-[12px] font-medium text-[#2a2b2a]">Date</span>
              <input type="date" className="rounded-[7px] border border-[#e8e8e8] px-3 py-2.5 text-[13px] outline-none focus:border-[#ff683a]" />
            </label>
            <label className="flex flex-1 flex-col gap-1.5">
              <span className="text-[12px] font-medium text-[#2a2b2a]">Time</span>
              <input type="time" className="rounded-[7px] border border-[#e8e8e8] px-3 py-2.5 text-[13px] outline-none focus:border-[#ff683a]" />
            </label>
          </div>
          <label className="flex flex-col gap-1.5">
            <span className="text-[12px] font-medium text-[#2a2b2a]">Location</span>
            <input placeholder="e.g. Conference Room A" className="rounded-[7px] border border-[#e8e8e8] px-3 py-2.5 text-[13px] outline-none focus:border-[#ff683a]" />
          </label>
          <div className="flex gap-3">
            <label className="flex flex-1 flex-col gap-1.5">
              <span className="text-[12px] font-medium text-[#2a2b2a]">Duration</span>
              <input placeholder="e.g. 1h 30m" className="rounded-[7px] border border-[#e8e8e8] px-3 py-2.5 text-[13px] outline-none focus:border-[#ff683a]" />
            </label>
            <label className="flex flex-1 flex-col gap-1.5">
              <span className="text-[12px] font-medium text-[#2a2b2a]">Attendees</span>
              <input type="number" placeholder="0" className="rounded-[7px] border border-[#e8e8e8] px-3 py-2.5 text-[13px] outline-none focus:border-[#ff683a]" />
            </label>
          </div>
        </div>
        <div className="flex gap-3 border-t border-[#f0f0f0] px-6 py-4">
          <button onClick={onClose} className="flex flex-1 items-center justify-center gap-1.5 rounded-[7px] bg-[#ff683a] py-2.5 text-[13px] font-semibold text-white hover:bg-[#e85a2e]"><Save size={14} /> Save Event</button>
          <button onClick={onClose} className="flex flex-1 items-center justify-center rounded-[7px] border border-[#e8e8e8] py-2.5 text-[13px] font-medium text-[#555] hover:bg-[#f3f3f3]">Cancel</button>
        </div>
      </div>
    </div>
  );
}

export function Schedule() {
  const [month, setMonth] = useState(CURRENT_MONTH);
  const [year, setYear] = useState(CURRENT_YEAR);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  const daysInMonth = getDaysInMonth(month, year);
  const firstDay = getFirstDayOfMonth(month, year);
  const monthEvents = EVENTS.filter(e => e.month === month && e.year === year);

  function getEventsForDay(d: number) { return monthEvents.filter(e => e.date === d); }

  function prevMonth() {
    if (month === 0) { setMonth(11); setYear(y => y - 1); } else setMonth(m => m - 1);
    setSelectedDate(null);
  }
  function nextMonth() {
    if (month === 11) { setMonth(0); setYear(y => y + 1); } else setMonth(m => m + 1);
    setSelectedDate(null);
  }

  const selectedEvents = selectedDate ? getEventsForDay(selectedDate) : [];
  const upcomingEvents = [...monthEvents].sort((a, b) => a.date - b.date).slice(0, 5);

  return (
    <div className="flex flex-col gap-5 min-h-full">
      {showModal && <AddEventModal onClose={() => setShowModal(false)} />}
      <div className="flex items-center justify-between">
        <h1 className="text-[22px] font-bold text-[#2a2b2a]">Schedule</h1>
        <button onClick={() => setShowModal(true)} className="flex items-center gap-1.5 rounded-[8px] bg-[#ff683a] px-4 py-2 text-[12px] font-semibold text-white hover:bg-[#e85a2e] transition-colors" data-testid="button-add-event">
          <Plus size={14} /> Add Event
        </button>
      </div>

      <div className="flex gap-5 items-start">
        {/* Calendar */}
        <div className="flex-1 rounded-[10px] border border-[#f0f0f0] bg-[#fdfcff] p-5">
          {/* Month nav */}
          <div className="flex items-center justify-between mb-5">
            <button onClick={prevMonth} className="flex h-8 w-8 items-center justify-center rounded-[7px] border border-[#e8e8e8] hover:bg-[#f3f3f3] transition-colors" data-testid="button-prev-month"><ChevronLeft size={15} className="text-[#555]" /></button>
            <h2 className="text-[16px] font-bold text-[#2a2b2a]">{MONTH_NAMES[month]} {year}</h2>
            <button onClick={nextMonth} className="flex h-8 w-8 items-center justify-center rounded-[7px] border border-[#e8e8e8] hover:bg-[#f3f3f3] transition-colors" data-testid="button-next-month"><ChevronRight size={15} className="text-[#555]" /></button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 mb-2">
            {DAY_NAMES.map(d => (
              <div key={d} className="text-center text-[11px] font-medium text-[#8c8d8c] py-1">{d}</div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* empty leading cells */}
            {Array.from({ length: firstDay }).map((_, i) => <div key={`e-${i}`} />)}
            {/* day cells */}
            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
              const dayEvents = getEventsForDay(day);
              const isSelected = selectedDate === day;
              const hasEvent = dayEvents.length > 0;
              return (
                <button key={day} onClick={() => setSelectedDate(isSelected ? null : day)}
                  className={`relative flex flex-col items-center gap-0.5 rounded-[8px] py-1.5 transition-colors min-h-[44px] ${isSelected ? "bg-[#ff683a]" : hasEvent ? "hover:bg-[#fff5f2]" : "hover:bg-[#f3f3f3]"}`}
                  data-testid={`calendar-day-${day}`}>
                  <span className={`text-[13px] font-medium ${isSelected ? "text-white" : "text-[#2a2b2a]"}`}>{day}</span>
                  {hasEvent && (
                    <div className="flex gap-0.5">
                      {dayEvents.slice(0, 3).map(e => (
                        <div key={e.id} className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: isSelected ? "white" : e.color }} />
                      ))}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Selected day events */}
          {selectedDate && (
            <div className="mt-5 border-t border-[#f0f0f0] pt-4">
              <h3 className="text-[13px] font-semibold text-[#2a2b2a] mb-3">
                {MONTH_NAMES[month]} {selectedDate} — {selectedEvents.length} Event{selectedEvents.length !== 1 ? "s" : ""}
              </h3>
              {selectedEvents.length === 0 ? (
                <p className="text-[12px] text-[#8c8d8c]">No events scheduled for this day.</p>
              ) : (
                <div className="flex flex-col gap-2.5">
                  {selectedEvents.map(e => (
                    <div key={e.id} className="flex items-start gap-3 rounded-[8px] p-3" style={{ backgroundColor: e.bg }}>
                      <div className="mt-0.5 h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: e.color }} />
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-semibold text-[#2a2b2a] leading-snug">{e.title}</p>
                        <div className="flex items-center gap-3 mt-1 flex-wrap">
                          <span className="flex items-center gap-1 text-[11px] text-[#8c8d8c]"><Clock size={10} />{e.time} · {e.duration}</span>
                          <span className="flex items-center gap-1 text-[11px] text-[#8c8d8c]"><MapPin size={10} />{e.location}</span>
                          <span className="flex items-center gap-1 text-[11px] text-[#8c8d8c]"><Users size={10} />{e.attendees} attendees</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Upcoming Events panel */}
        <div className="w-[300px] shrink-0 flex flex-col gap-4">
          <div className="rounded-[10px] border border-[#f0f0f0] bg-[#fdfcff] p-4">
            <h3 className="text-[14px] font-semibold text-[#2a2b2a] mb-4">Upcoming Events</h3>
            <div className="flex flex-col gap-3">
              {upcomingEvents.map(e => (
                <div key={e.id} className="flex items-start gap-3" data-testid={`upcoming-event-${e.id}`}>
                  <div className="flex h-10 w-10 shrink-0 flex-col items-center justify-center rounded-[8px] text-center" style={{ backgroundColor: e.bg }}>
                    <span className="text-[11px] font-bold leading-none" style={{ color: e.color }}>{String(e.date).padStart(2, "0")}</span>
                    <span className="text-[9px] font-medium mt-0.5" style={{ color: e.color }}>{MONTH_NAMES[e.month].slice(0, 3)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-semibold text-[#2a2b2a] leading-snug truncate">{e.title}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="flex items-center gap-1 text-[10px] text-[#8c8d8c]"><Clock size={9} />{e.time}</span>
                      <span className="flex items-center gap-1 text-[10px] text-[#8c8d8c]"><Users size={9} />{e.attendees}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly summary */}
          <div className="rounded-[10px] border border-[#f0f0f0] bg-[#fdfcff] p-4">
            <h3 className="text-[14px] font-semibold text-[#2a2b2a] mb-3">This Month</h3>
            <div className="flex flex-col gap-2.5">
              {[
                { label: "Total Events",    value: monthEvents.length, color: "#ff683a", bg: "#fff0eb" },
                { label: "Total Attendees", value: monthEvents.reduce((s, e) => s + e.attendees, 0), color: "#7c3aed", bg: "#f3f0fe" },
                { label: "Meetings",        value: monthEvents.filter(e => e.location.includes("Room") || e.location.includes("Suite")).length, color: "#0ea5e9", bg: "#e8f5ff" },
                { label: "Remote / Virtual",value: monthEvents.filter(e => e.location.includes("Zoom") || e.location.includes("Slack")).length, color: "#10b981", bg: "#e8faf4" },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between rounded-[7px] px-3 py-2" style={{ backgroundColor: item.bg }}>
                  <span className="text-[12px] text-[#555]">{item.label}</span>
                  <span className="text-[14px] font-bold" style={{ color: item.color }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-5 pb-2 text-[12px]">
        <span className="font-semibold text-[#555]">Copyright © 2024 Peterdraw</span>
        {["Privacy Policy","Term and conditions","Contact"].map(t => <span key={t} className="cursor-pointer text-[#8c8d8c] hover:text-[#2a2b2a]">{t}</span>)}
      </div>
    </div>
  );
}
