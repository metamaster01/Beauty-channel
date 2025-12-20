import AboutUs from "@/components/aboutus";
import Hero from "@/components/hero";
import WhyChoose from "@/components/whychoose";
import Feedback from "@/components/feedback";
import Gallery from "@/components/gallery";
import OurServices from "@/components/ourservices";
import Offer from "@/components/offer";
import AppointmentHero from "@/components/appoinment"; 
import ContactFaqMock from "@/components/contactfaqmock";

export default function Home() {
  return (
     <main className="min-h-screen bg-white overflow-x-hidden">
      <Hero/>
      <AboutUs/>
      <OurServices/>
      <Offer/>
      <WhyChoose/>   
      <Feedback/>
      <Gallery/>
      <AppointmentHero/>
      <ContactFaqMock/>
      </main>
  );
}
