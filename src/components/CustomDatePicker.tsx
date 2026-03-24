"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CustomDatePickerProps {
  value: string; // YYYY-MM-DD
  onChange: (value: string) => void;
  placeholder?: string;
  inline?: boolean;
  fullWidth?: boolean;
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

function buildCells(year: number, month: number): (number | null)[] {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startOffset = (firstDay.getDay() + 6) % 7;
  const totalCells = Math.ceil((startOffset + lastDay.getDate()) / 7) * 7;
  const cells: (number | null)[] = [];
  for (let i = 0; i < totalCells; i++) {
    const dayNum = i - startOffset + 1;
    cells.push(dayNum >= 1 && dayNum <= lastDay.getDate() ? dayNum : null);
  }
  return cells;
}

function getNextMonth(year: number, month: number) {
  return month === 11 ? { year: year + 1, month: 0 } : { year, month: month + 1 };
}

export default function CustomDatePicker({
  value,
  onChange,
  placeholder = "Select date",
  inline = false,
  fullWidth = false,
}: CustomDatePickerProps) {
  const today = new Date();
  const [open, setOpen] = useState(false);
  const [openUpward, setOpenUpward] = useState(false);
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const ref = useRef<HTMLDivElement>(null);

  const next = getNextMonth(viewYear, viewMonth);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(viewYear - 1); }
    else setViewMonth(viewMonth - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(viewYear + 1); }
    else setViewMonth(viewMonth + 1);
  };

  const selectDay = (day: number, year: number, month: number) => {
    const m = String(month + 1).padStart(2, "0");
    const d = String(day).padStart(2, "0");
    onChange(`${year}-${m}-${d}`);
    if (!inline) setOpen(false);
  };

  const isSelected = (day: number, year: number, month: number) => {
    if (!value) return false;
    const [y, m, d] = value.split("-");
    return parseInt(y) === year && parseInt(m) - 1 === month && parseInt(d) === day;
  };

  const isToday = (day: number, year: number, month: number) =>
    today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;

  const isPast = (day: number, year: number, month: number) => {
    const d = new Date(year, month, day);
    d.setHours(0, 0, 0, 0);
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return d < t;
  };

  const renderMonthGrid = (
    year: number,
    month: number,
    showPrev: boolean,
    showNext: boolean,
  ) => {
    const cells = buildCells(year, month);
    return (
      <div>
        <div className="flex items-center justify-between mb-5">
          {showPrev ? (
            <button
              type="button"
              onClick={prevMonth}
              className="w-7 h-7 flex items-center justify-center hover:bg-brand-bg-alt transition-colors"
            >
              <ChevronLeft size={15} strokeWidth={1.5} className="text-brand-heading" />
            </button>
          ) : <div className="w-7" />}
          <span className="font-serif text-base font-medium text-brand-heading">
            {MONTHS[month]} {year}
          </span>
          {showNext ? (
            <button
              type="button"
              onClick={nextMonth}
              className="w-7 h-7 flex items-center justify-center hover:bg-brand-bg-alt transition-colors"
            >
              <ChevronRight size={15} strokeWidth={1.5} className="text-brand-heading" />
            </button>
          ) : <div className="w-7" />}
        </div>

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

        <div className="grid grid-cols-7 gap-y-1" style={{ gridTemplateRows: "repeat(6, 2rem)" }}>
          {cells.map((day, i) => {
            if (!day) return <div key={i} />;
            const selected = isSelected(day, year, month);
            const todayDay = isToday(day, year, month);
            const past = isPast(day, year, month);
            return (
              <button
                key={i}
                type="button"
                disabled={past}
                onClick={() => selectDay(day, year, month)}
                className={`
                  h-8 w-8 mx-auto flex items-center justify-center font-sans text-sm transition-colors duration-150
                  ${selected
                    ? "bg-brand-body text-white"
                    : past
                    ? "text-brand-body/20 cursor-not-allowed"
                    : todayDay
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
      </div>
    );
  };

  const todayShortcut = (
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
  );

  if (inline) {
    return (
      <div
        className="bg-brand-bg p-5 w-full"
        style={{ border: "1px solid rgba(199, 117, 87, 0.3)" }}
      >
        {renderMonthGrid(viewYear, viewMonth, true, true)}
        {todayShortcut}
      </div>
    );
  }

  return (
    <div ref={ref} className={`${fullWidth ? "" : "relative "}w-full`}>
      <button
        type="button"
        onClick={() => {
          if (!open && ref.current) {
            const rect = ref.current.getBoundingClientRect();
            setOpenUpward(window.innerHeight - rect.bottom < 420);
          }
          setOpen(!open);
        }}
        className="w-full flex items-center justify-between bg-white px-4 py-3 font-sans text-sm text-left outline-none"
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
          className={`absolute ${openUpward ? "bottom-full mb-1" : "top-full mt-1"} left-0 ${fullWidth ? "right-0" : ""} bg-brand-bg z-50`}
          style={{
            border: "1px solid rgba(199, 117, 87, 0.3)",
            boxShadow: "0 8px 32px rgba(45, 23, 15, 0.12)",
          }}
        >
          {/* Mobile: single month */}
          <div className="md:hidden p-5 w-72">
            {renderMonthGrid(viewYear, viewMonth, true, true)}
            {todayShortcut}
          </div>

          {/* Desktop: two months side by side */}
          <div className="hidden md:block p-6">
            <div className="flex gap-8">
              <div className="flex-1 min-w-0">
                {renderMonthGrid(viewYear, viewMonth, true, false)}
              </div>
              <div className="w-px bg-brand-body/10 self-stretch" />
              <div className="flex-1 min-w-0">
                {renderMonthGrid(next.year, next.month, false, true)}
              </div>
            </div>
            {todayShortcut}
          </div>
        </div>
      )}
    </div>
  );
}
