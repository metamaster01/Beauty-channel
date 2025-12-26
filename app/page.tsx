import AboutUs from "@/components/aboutus";
import Hero from "@/components/hero";
import WhyChoose from "@/components/whychoose";
import Feedback from "@/components/feedback";
import Gallery from "@/components/gallery";

import AppointmentHero from "@/components/appoinment"; 
import ContactFaqMock from "@/components/contactfaqmock";
import BeautyMarquee from "@/components/beautymarquee";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Advertisement from "@/components/advertisement";
import Offer from "@/components/offer";
import OurServices from "@/components/ourservices";
import Image from "next/image";

export default function Home() {
  return (
     <main className="min-h-screen bg-white overflow-x-hidden">
      <Navbar/>
      <Hero/>
      <AboutUs/>
      <OurServices/>
      <Advertisement/>
      <Offer/>
      <WhyChoose/>   
      <Feedback/>
      <Gallery/>
      <AppointmentHero/>
      <ContactFaqMock/>
    <BeautyMarquee/>
      <Footer/>
      
      </main>
  );
}
