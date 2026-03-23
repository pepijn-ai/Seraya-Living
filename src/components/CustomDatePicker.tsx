"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CustomDatePickerProps {
  value: string; // YYYY-MM-DD
  onChange: (value: string) => void;
  placeholder?: string;
  inline?: boolean;
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const DAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

function formatDisplay(value: string): string {
  if (!value) return "";
  const [y, m, d] = value.split("-");
  return `${d} ${MONTHS[parseInt(m) - 1]} ${y}`;
}

export default function CustomDatePicker({
  value,
  onChange,
  placeholder = "Select date",
  inline = false,
}: CustomDatePickerProps) {
  const today = new Date();
  const [open, setOpen] = useState(false);
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Build calendar grid (Mon-start)
  const firstDay = new Date(viewYear, viewMonth, 1);
  const lastDay = new Date(viewYear, viewMonth + 1, 0);
  // Monday = 0 offset
  const startOffset = (firstDay.getDay() + 6) % 7;
  const totalCells = Math.ceil((startOffset + lastDay.getDate()) / 7) * 7;

  const cells: (number | null)[] = [];
  for (let i = 0; i < totalCells; i++) {
    const dayNum = i - startOffset + 1;
    cells.push(dayNum >= 1 && dayNum <= lastDay.getDate() ? dayNum : null);
  }

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(viewYear - 1); }
    else setViewMonth(viewMonth - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(viewYear + 1); }
    else setViewMonth(viewMonth + 1);
  };

  const selectDay = (day: number) => {
    const m = String(viewMonth + 1).padStart(2, "0");
    const d = String(day).padStart(2, "0");
    onChange(`${viewYear}-${m}-${d}`);
    if (!inline) setOpen(false);
  };

  const isSelected = (day: number) => {
    if (!value) return false;
    const [y, m, d] = value.split("-");
    return parseInt(y) === viewYear && parseInt(m) - 1 === viewMonth && parseInt(d) === day;
  };

  const isToday = (day: number) =>
    today.getFullYear() === viewYear &&
    today.getMonth() === viewMonth &&
    today.getDate() === day;

  const isPast = (day: number) => {
    const d = new Date(viewYear, viewMonth, day);
    d.setHours(0, 0, 0, 0);
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return d < t;
  };

  const calendarGrid = (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <button
          type="button"
          onClick={prevMonth}
          className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-brand-bg-alt transition-colors"
        >
          <ChevronLeft size={15} strokeWidth={1.5} className="text-brand-heading" />
        </button>
        <span className="font-serif text-base font-medium text-brand-heading">
          {MONTHS[viewMonth]} {viewYear}
        </span>
        <button
          type="button"
          onClick={nextMonth}
          className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-brand-bg-alt transition-colors"
        >
          <ChevronRight size={15} strokeWidth={1.5} className="text-brand-heading" />
        </button>
      </div>

      {/* Day names */}
      <div className="grid grid-cols-7 mb-2">
        {DAYS.map((d) => (
          <span
            key={d}
            className="text-center font-sans text-[10px] uppercase tracking-wider text-brand-body/40 pb-2"
          >
            {d}
          </span>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-y-1">
        {cells.map((day, i) => {
          if (!day) return <div key={i} />;
          const selected = isSelected(day);
          const today_ = isToday(day);
          const past = isPast(day);

          return (
            <button
              key={i}
              type="button"
              disabled={past}
              onClick={() => selectDay(day)}
              className={`
                h-8 w-8 mx-auto flex items-center justify-center rounded-md font-sans text-sm transition-colors duration-150
                ${selected
                  ? "bg-brand-body text-white"
                  : past
                  ? "text-brand-body/20 cursor-not-allowed"
                  : today_
                  ? "text-brand-heading font-medium hover:bg-brand-bg-alt"
                  : "text-brand-body hover:bg-brand-bg-alt"
                }
              `}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* Today shortcut */}
      <div className="mt-4 pt-4 border-t border-brand-body/10 flex justify-end">
        <button
          type="button"
          onClick={() => {
            const t = new Date();
            const y = t.getFullYear();
            const m = String(t.getMonth() + 1).padStart(2, "0");
            const d = String(t.getDate()).padStart(2, "0");
            onChange(`${y}-${m}-${d}`);
            if (!inline) setOpen(false);
          }}
          className="font-sans text-xs text-brand-heading hover:text-brand-accent transition-colors"
        >
          Today
        </button>
      </div>
    </>
  );

  if (inline) {
    return (
      <div
        className="bg-brand-bg rounded-none p-5 w-full"
        style={{ border: "1px solid rgba(199, 117, 87, 0.3)" }}
      >
        {calendarGrid}
      </div>
    );
  }

  return (
    <div ref={ref} className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between bg-white rounded-none px-4 py-3 font-sans text-sm text-left outline-none"
        style={{ border: "1px solid rgba(199, 117, 87, 0.5)" }}
      >
        <span className={value ? "text-brand-body" : "text-brand-body/40"}>
          {value ? formatDisplay(value) : placeholder}
        </span>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-brand-heading">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
      </button>

      {open && (
        <div
          className="absolute top-full left-0 mt-1 bg-brand-bg rounded-none p-5 z-50 w-72"
          style={{
            border: "1px solid rgba(199, 117, 87, 0.3)",
            boxShadow: "0 8px 32px rgba(45, 23, 15, 0.12)",
          }}
        >
          {calendarGrid}
        </div>
      )}
    </div>
  );
}
