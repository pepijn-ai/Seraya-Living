"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhatIsSeraya from "@/components/WhatIsSeraya";
import SerayaStudio from "@/components/SerayaStudio";
import SocialProof from "@/components/SocialProof";
import HowItWorks from "@/components/HowItWorks";
import IncludedServices from "@/components/IncludedServices";
import FeaturedResidences from "@/components/FeaturedResidences";
import Locations from "@/components/Locations";
import InquiryCTA from "@/components/InquiryCTA";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { InquiryBarStickyController } from "@/components/InquiryBar";
import InquiryModal from "@/components/InquiryModal";
import type { InquiryState } from "@/components/InquiryBar";

export default function Home() {
  const [inquiry, setInquiry] = useState<InquiryState>({ moveIn: "" });
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Navbar transparent />
      <Hero
        inquiryValues={inquiry}
        onInquiryChange={setInquiry}
        onInquiryCTA={() => setModalOpen(true)}
      />
      <WhatIsSeraya />
      <SocialProof />
      <HowItWorks />
      <IncludedServices />
      <FeaturedResidences onInquiryCTA={() => setModalOpen(true)} />
      <SerayaStudio />
      <Locations />
      <InquiryCTA onCTA={() => setModalOpen(true)} />
      <FAQ />
      <Footer />
      <WhatsAppButton />
      <InquiryBarStickyController
        values={inquiry}
        onChange={setInquiry}
        onCTA={() => setModalOpen(true)}
      />
      <InquiryModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        initialValues={inquiry}
      />
    </>
  );
}
