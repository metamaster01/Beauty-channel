import AppointmentHero from "@/components/appoinment";
import ContactFAQMock from "@/components/contactfaqmock";

import Feedback from "@/components/feedback";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Offer from "@/components/offer";
import ExploreProducts from "@/components/ProductPage/ExploreProduct";

export default function ProductsPage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      
      <ExploreProducts />
      <Offer />
      <Feedback />
      <AppointmentHero />
      <ContactFAQMock />
      <Footer />
    </div>
  );
}