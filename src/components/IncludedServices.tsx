import {
  Zap,
  Wifi,
  Sparkles,
  Wrench,
  Headphones,
  Armchair,
  CookingPot,
  Bed,
  MessageCircle,
} from "lucide-react";
import FadeIn from "./FadeIn";

const services = [
  { icon: <Zap size={20} strokeWidth={1.5} />, label: "Utilities" },
  { icon: <Wifi size={20} strokeWidth={1.5} />, label: "High-speed WiFi" },
  { icon: <Sparkles size={20} strokeWidth={1.5} />, label: "Weekly housekeeping" },
  { icon: <Wrench size={20} strokeWidth={1.5} />, label: "Maintenance" },
  { icon: <Headphones size={20} strokeWidth={1.5} />, label: "Concierge support" },
  { icon: <Armchair size={20} strokeWidth={1.5} />, label: "Premium furnishings" },
  { icon: <CookingPot size={20} strokeWidth={1.5} />, label: "Kitchen equipment" },
  { icon: <Bed size={20} strokeWidth={1.5} />, label: "Linens & towels" },
  {
    icon: <MessageCircle size={20} strokeWidth={1.5} />,
    label: "Guest app & WhatsApp support",
  },
];

export default function IncludedServices() {
  return (
    <section className="bg-brand-bg py-20 md:py-28">
      <div className="max-w-[1400px] mx-auto px-3 md:px-6">
        <FadeIn>
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-brand-heading mb-12">
            Included in every stay
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <FadeIn key={i} delay={i * 60}>
              <div className="flex items-center gap-4">
                <span className="text-brand-heading flex-none">{service.icon}</span>
                <span className="font-sans text-sm text-brand-body">
                  {service.label}
                </span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
