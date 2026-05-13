"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhatIsSeraya from "@/components/WhatIsSeraya";
import SerayaStudio from "@/components/SerayaStudio";
import SocialProof from "@/components/SocialProof";
import HowItWorks from "@/components/HowItWorks";
import IncludedServices from "@/components/IncludedServices";
import GuestServices from "@/components/GuestServices";
import FeaturedResidences from "@/components/FeaturedResidences";
import Locations from "@/components/Locations";
import InquiryCTA from "@/components/InquiryCTA";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { InquiryBarStickyController } from "@/components/InquiryBar";
import InquiryModal from "@/components/InquiryModal";
import PortfolioInquiryModal from "@/components/PortfolioInquiryModal";
import ExitPopupModal from "@/components/ExitPopupModal";
import type { InquiryState } from "@/components/InquiryBar";
import { useExitIntent } from "@/lib/useExitIntent";

export default function Home() {
  const [inquiry, setInquiry] = useState<InquiryState>({ moveIn: "" });
  const [modalOpen, setModalOpen] = useState(false);
  const [portfolioModalOpen, setPortfolioModalOpen] = useState(false);

  const exitIntent = useExitIntent({ targetSelector: "[data-exit-target]" });

  const openMain = () => { exitIntent.markEngaged(); setModalOpen(true); };
  const openPortfolio = () => { exitIntent.markEngaged(); setPortfolioModalOpen(true); };

  return (
    <>
      <Navbar transparent />
      <Hero
        inquiryValues={inquiry}
        onInquiryChange={setInquiry}
        onInquiryCTA={openMain}
      />
      <WhatIsSeraya />
      <SocialProof />
      <HowItWorks />
      <FeaturedResidences onInquiryCTA={openPortfolio} />
      <IncludedServices />
      <GuestServices />
      <Locations />
      <SerayaStudio />
      <InquiryCTA onCTA={openMain} />
      <FAQ />
      <Footer />
      <WhatsAppButton />
      <InquiryBarStickyController
        values={inquiry}
        onChange={setInquiry}
        onCTA={openMain}
      />
      <InquiryModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        initialValues={inquiry}
      />
      <PortfolioInquiryModal
        open={portfolioModalOpen}
        onClose={() => setPortfolioModalOpen(false)}
      />
      <ExitPopupModal
        open={exitIntent.open}
        onClose={exitIntent.dismiss}
        onSubmitted={exitIntent.markSubmitted}
      />
    </>
  );
}
