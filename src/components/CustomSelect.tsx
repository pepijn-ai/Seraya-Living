"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
  placeholder?: string;
  className?: string;
}

export default function CustomSelect({
  value,
  onChange,
  options,
  placeholder = "Select",
  className = "",
}: CustomSelectProps) {
  const [open, setOpen] = useState(false);
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

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={ref} className={`relative w-full ${className}`}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between bg-white rounded-none px-4 py-3 font-sans text-sm text-left outline-none"
        style={{ border: "1px solid rgba(199, 117, 87, 0.5)" }}
      >
        <span className={selected ? "text-brand-body" : "text-brand-body/40"}>
          {selected ? selected.label : placeholder}
        </span>
        <ChevronDown
          size={15}
          strokeWidth={1.5}
          className={`text-brand-heading transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          className="absolute top-full left-0 right-0 mt-1 bg-brand-bg rounded-none overflow-hidden z-50"
          style={{
            border: "1px solid rgba(199, 117, 87, 0.3)",
            boxShadow: "0 8px 32px rgba(45, 23, 15, 0.12)",
          }}
        >
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              className={`w-full text-left px-5 py-3 font-sans text-sm transition-colors duration-150 flex items-center justify-between ${
                option.value === value
                  ? "bg-brand-bg-alt text-brand-heading font-medium"
                  : "text-brand-body hover:bg-brand-bg-alt/60"
              }`}
            >
              {option.label}
              {option.value === value && (
                <span className="text-brand-heading text-xs">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
