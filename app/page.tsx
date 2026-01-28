import AboutUs from "@/components/aboutus";
import Hero from "@/components/hero";
import WhyChoose from "@/components/whychoose";
import Feedback from "@/components/feedback";
import Gallery from "@/components/gallery";

import AppointmentHero from "@/components/appoinment"; 
import ContactFaqMock from "@/components/contactfaqmock";

import Advertisement from "@/components/advertisement";
// import Offer from "@/components/offer";
import OurServices from "@/components/ourservices";
import Image from "next/image";
import Products from "@/components/product";

export default function Home() {
  return (
     <main className="min-h-screen  overflow-x-hidden">
      
      <Hero/>
      <AboutUs/>
      <OurServices/>
      <Products/>
      <Advertisement/>
      {/* <Offer/> */}
      <WhyChoose/>   
      <Feedback/>
      <Gallery/>
      <AppointmentHero/>
      <ContactFaqMock/>
      
      </main>
  );
}
